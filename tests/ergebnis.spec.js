const { test, expect } = require('@playwright/test');
const dokument = require('./inhalt-dokument');

const [keineWarnzeichen, vorsicht] = dokument.ergebnismeldungen();

const UNAUFFAELLIG = 'unauffällig';
const AUFFAELLIG = 'auffällig';
const NICHT_PRUEFBAR = 'kann ich nicht prüfen';

function antwortenMit(ersetzungen, grundantwort = UNAUFFAELLIG) {
  const antworten = new Array(12).fill(grundantwort);
  for (const [nummer, antwort] of Object.entries(ersetzungen)) antworten[nummer - 1] = antwort;
  return antworten;
}

async function pruefeDurch(page, antworten) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Check starten' }).click();
  for (const antwort of antworten) {
    await page.getByRole('radio', { name: antwort, exact: true }).check();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
}

test('12× «unauffällig» ergibt «Keine Warnzeichen gefunden» ohne Listen', async ({ page }) => {
  await pruefeDurch(page, antwortenMit({}));
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(keineWarnzeichen);
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(0);
  await expect(page.getByRole('main').getByRole('list')).toHaveCount(0);
});

test('genau 1 Warnzeichen ergibt «Vorsicht» mit diesem Prüfpunkt und seinem Tipp', async ({ page }) => {
  const punkt = dokument.pruefpunkte()[4];
  const tipp = dokument.tipps()[4];
  await pruefeDurch(page, antwortenMit({ 5: AUFFAELLIG }));
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(vorsicht);
  const liste = page.getByRole('region', { name: 'Warnzeichen' });
  await expect(liste.getByRole('listitem')).toHaveCount(1);
  await expect(liste.getByRole('listitem')).toContainText(punkt.frage);
  await expect(liste.getByRole('listitem')).toContainText(tipp);
  await expect(page.getByRole('region', { name: 'Konntest du nicht prüfen' })).toHaveCount(0);
});

test('3× «kann ich nicht prüfen» bleibt bei «Keine Warnzeichen gefunden» mit Liste der 3 Prüfpunkte', async ({ page }) => {
  const punkte = dokument.pruefpunkte();
  await pruefeDurch(page, antwortenMit({ 2: NICHT_PRUEFBAR, 7: NICHT_PRUEFBAR, 12: NICHT_PRUEFBAR }));
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(keineWarnzeichen);
  const liste = page.getByRole('region', { name: 'Konntest du nicht prüfen' });
  await expect(liste.getByRole('listitem')).toHaveCount(3);
  for (const nummer of [2, 7, 12]) {
    await expect(liste.getByRole('listitem').filter({ hasText: punkte[nummer - 1].frage })).toHaveCount(1);
  }
  await expect(page.getByRole('region', { name: 'Warnzeichen' })).toHaveCount(0);
});

test('4× «kann ich nicht prüfen» ergibt «Vorsicht»', async ({ page }) => {
  await pruefeDurch(page, antwortenMit({ 1: NICHT_PRUEFBAR, 4: NICHT_PRUEFBAR, 8: NICHT_PRUEFBAR, 11: NICHT_PRUEFBAR }));
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(vorsicht);
  await expect(page.getByRole('region', { name: 'Konntest du nicht prüfen' }).getByRole('listitem')).toHaveCount(4);
});

test('12× «kann ich nicht prüfen» ergibt «Vorsicht» ohne Tipps, mit allen 12 in der Liste', async ({ page }) => {
  await pruefeDurch(page, antwortenMit({}, NICHT_PRUEFBAR));
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(vorsicht);
  await expect(page.getByRole('region', { name: 'Warnzeichen' })).toHaveCount(0);
  const liste = page.getByRole('region', { name: 'Konntest du nicht prüfen' });
  await expect(liste.getByRole('listitem')).toHaveCount(12);
  const text = await page.getByRole('main').innerText();
  for (const tipp of dokument.tipps()) expect(text).not.toContain(tipp);
});

test('Warnzeichen stehen vor der Liste «Konntest du nicht prüfen»', async ({ page }) => {
  await pruefeDurch(page, antwortenMit({ 3: AUFFAELLIG, 9: NICHT_PRUEFBAR }));
  const ueberschriften = await page.getByRole('heading', { level: 3 }).allInnerTexts();
  expect(ueberschriften).toEqual(['Warnzeichen', 'Konntest du nicht prüfen']);
});

test('das Ergebnis nennt einen Post nie «echt» und hat einen Merksatz', async ({ page }) => {
  for (const antworten of [antwortenMit({}), antwortenMit({ 1: AUFFAELLIG }), antwortenMit({}, NICHT_PRUEFBAR)]) {
    await pruefeDurch(page, antworten);
    const merksatz = page.getByText('Diese Seite sagt nie, ein Post sei echt.');
    await expect(merksatz).toBeVisible();
    const text = (await page.getByRole('main').innerText()).replace(/Diese Seite sagt nie, ein Post sei echt\./, '');
    expect(text).not.toMatch(/\bechte?[nmrs]?\b/i);
  }
});

test('«Antworten ändern» führt zu Prüfpunkt 1 mit allen Antworten', async ({ page }) => {
  const antworten = antwortenMit({ 1: AUFFAELLIG, 2: NICHT_PRUEFBAR, 12: AUFFAELLIG });
  await pruefeDurch(page, antworten);
  await page.getByRole('button', { name: 'Antworten ändern' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 1 von 12');
  for (const antwort of antworten) {
    await expect(page.getByRole('radio', { name: antwort, exact: true })).toBeChecked();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(vorsicht);
});

test('geänderte Antworten ändern das Ergebnis', async ({ page }) => {
  await pruefeDurch(page, antwortenMit({ 6: AUFFAELLIG }));
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(vorsicht);
  await page.getByRole('button', { name: 'Antworten ändern' }).click();
  for (let nummer = 1; nummer <= 12; nummer++) {
    if (nummer === 6) await page.getByRole('radio', { name: UNAUFFAELLIG, exact: true }).check();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(keineWarnzeichen);
  await expect(page.getByRole('region', { name: 'Warnzeichen' })).toHaveCount(0);
});

test('«Neuen Post prüfen» setzt alles zurück und zeigt die Startseite', async ({ page }) => {
  await pruefeDurch(page, antwortenMit({ 1: AUFFAELLIG }));
  await page.getByRole('button', { name: 'Neuen Post prüfen' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Check starten' })).toBeVisible();
  await page.getByRole('button', { name: 'Check starten' }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  for (let nummer = 1; nummer <= 12; nummer++) {
    await page.getByRole('radio', { name: UNAUFFAELLIG, exact: true }).check();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(keineWarnzeichen);
});
