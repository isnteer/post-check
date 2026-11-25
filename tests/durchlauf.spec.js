const { test, expect } = require('@playwright/test');
const dokument = require('./inhalt-dokument');
const { UNAUFFAELLIG, AUFFAELLIG, NICHT_PRUEFBAR, startePruefung, beantworte } = require('./helfer');

test('12× «unauffällig» endet bei der Meldung ohne Warnzeichen', async ({ page }) => {
  await startePruefung(page);
  for (let i = 0; i < 12; i++) await beantworte(page, UNAUFFAELLIG);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(
    'Keine Warnzeichen gefunden – aber auch ein Post ohne Warnzeichen kann ein Fake sein',
  );
  expect(dokument.ergebnismeldungen()[0]).toBe(
    'Keine Warnzeichen gefunden – aber auch ein Post ohne Warnzeichen kann ein Fake sein',
  );
  await expect(page.getByRole('radio')).toHaveCount(0);
});

test('jeder Prüfpunkt erscheint einzeln mit Teil, Wortlaut, Quelle und drei Antworten', async ({ page }) => {
  await startePruefung(page);
  const teile = { A: 'Teil A: Absender und Kontext', B: 'Teil B: Bild' };
  for (const punkt of dokument.pruefpunkte()) {
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(`Prüfpunkt ${punkt.nummer} von 12`);
    await expect(page.getByText(teile[punkt.teil], { exact: true })).toBeVisible();
    const gruppe = page.getByRole('group', { name: punkt.frage, exact: true });
    await expect(gruppe).toBeVisible();
    await expect(page.getByText(`Quelle: ${punkt.quelle}`, { exact: true })).toBeVisible();
    await expect(gruppe.getByRole('radio')).toHaveCount(3);
    await expect(gruppe.getByRole('radio', { name: UNAUFFAELLIG, exact: true })).toBeVisible();
    await expect(gruppe.getByRole('radio', { name: AUFFAELLIG, exact: true })).toBeVisible();
    await expect(gruppe.getByRole('radio', { name: NICHT_PRUEFBAR, exact: true })).toBeVisible();
    await expect(page.getByRole('group')).toHaveCount(1);
    await beantworte(page, UNAUFFAELLIG);
  }
});

test('der Fuss nennt die Arbeit und die drei Quellen wie im Inhaltsdokument', async ({ page }) => {
  const fuss = dokument.fuss();
  expect(fuss.quellen).toHaveLength(3);
  await page.goto('/');
  const bereich = page.getByRole('contentinfo');
  await expect(bereich.getByText(fuss.arbeit, { exact: true })).toBeVisible();
  for (const quelle of fuss.quellen) {
    await expect(bereich.getByRole('listitem').filter({ hasText: quelle })).toHaveText(quelle);
  }
  await startePruefung(page);
  await expect(bereich.getByText(fuss.arbeit, { exact: true })).toBeVisible();
});

test('Neuladen beginnt wieder bei der Startseite', async ({ page }) => {
  await startePruefung(page);
  await page.getByRole('radio', { name: AUFFAELLIG, exact: true }).check();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Check starten' })).toBeVisible();
  await page.getByRole('button', { name: 'Check starten' }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
});

test('Fokus liegt nach jedem Ansichtswechsel auf der Überschrift', async ({ page }) => {
  await startePruefung(page);
  await expect(page.getByRole('heading', { level: 2 })).toBeFocused();
  await beantworte(page, UNAUFFAELLIG);
  await expect(page.getByRole('heading', { level: 2 })).toBeFocused();
});

test('ohne fremde Anfragen, Cookies und Browser-Speicher', async ({ page, context, baseURL }) => {
  const ursprung = new URL(baseURL).origin;
  const fremd = [];
  page.on('request', (anfrage) => {
    const url = new URL(anfrage.url());
    if (url.protocol.startsWith('http') && url.origin !== ursprung) fremd.push(anfrage.url());
  });
  await startePruefung(page);
  for (let i = 0; i < 12; i++) await beantworte(page, AUFFAELLIG);
  await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
  expect(fremd).toEqual([]);
  expect(await context.cookies()).toEqual([]);
  const speicher = await page.evaluate(() => ({
    lokal: localStorage.length,
    sitzung: sessionStorage.length,
    url: location.href,
  }));
  expect(speicher.lokal).toBe(0);
  expect(speicher.sitzung).toBe(0);
  expect(speicher.url).toBe(`${ursprung}/`);
});

test('kein seitliches Scrollen', async ({ page }) => {
  await startePruefung(page);
  const breiter = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(breiter).toBe(false);
});
