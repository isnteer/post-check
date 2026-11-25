const { test, expect } = require('@playwright/test');
const dokument = require('./inhalt-dokument');

const { UNAUFFAELLIG, AUFFAELLIG, NICHT_PRUEFBAR, startePruefung, waehle, weiter } = require('./helfer');

test('«auffällig» zeigt bei jedem der 12 Prüfpunkte den Tipp im Wortlaut in einer live region', async ({ page }) => {
  await startePruefung(page);
  for (const [i, tipp] of dokument.tipps().entries()) {
    const nummer = i + 1;
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(`Prüfpunkt ${nummer} von 12`);
    await expect(page.getByText(tipp, { exact: true })).toHaveCount(0);
    await waehle(page, AUFFAELLIG);
    const hinweis = page.getByText(tipp, { exact: true });
    await expect(hinweis).toBeVisible();
    await expect(page.locator('[aria-live]').filter({ has: hinweis })).toHaveCount(1);
    await weiter(page);
  }
});

test('der Tipp verschwindet, sobald die Antwort wechselt', async ({ page }) => {
  await startePruefung(page);
  const [tipp] = dokument.tipps();
  await waehle(page, AUFFAELLIG);
  await expect(page.getByText(tipp, { exact: true })).toBeVisible();
  await waehle(page, UNAUFFAELLIG);
  await expect(page.getByText(tipp, { exact: true })).toHaveCount(0);
  await waehle(page, AUFFAELLIG);
  await expect(page.getByText(tipp, { exact: true })).toBeVisible();
  await waehle(page, NICHT_PRUEFBAR);
  await expect(page.getByText(tipp, { exact: true })).toHaveCount(0);
});

test('«Weiter» ohne Antwort bleibt auf dem Prüfpunkt und zeigt eine Fehlermeldung', async ({ page }) => {
  await startePruefung(page);
  await weiter(page);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 1 von 12');
  await expect(page.getByRole('alert')).toHaveText('Wähle eine Antwort, bevor du weitergehst.');
  await waehle(page, UNAUFFAELLIG);
  await expect(page.getByRole('alert')).toHaveCount(0);
  await weiter(page);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 2 von 12');
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('«Zurück» zeigt den vorherigen Prüfpunkt mit Antwort und Tipp', async ({ page }) => {
  await startePruefung(page);
  const tipps = dokument.tipps();
  await waehle(page, AUFFAELLIG);
  await weiter(page);
  await waehle(page, NICHT_PRUEFBAR);
  await weiter(page);
  await waehle(page, UNAUFFAELLIG);
  await page.getByRole('button', { name: 'Zurück' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 2 von 12');
  await expect(page.getByRole('heading', { level: 2 })).toBeFocused();
  await expect(page.getByRole('radio', { name: NICHT_PRUEFBAR, exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'Zurück' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 1 von 12');
  await expect(page.getByRole('radio', { name: AUFFAELLIG, exact: true })).toBeChecked();
  await expect(page.getByText(tipps[0], { exact: true })).toBeVisible();
  await weiter(page);
  await weiter(page);
  await expect(page.getByRole('radio', { name: UNAUFFAELLIG, exact: true })).toBeChecked();
});

test('«Zurück» auf Prüfpunkt 1 führt zur Startseite', async ({ page }) => {
  await startePruefung(page);
  await page.getByRole('button', { name: 'Zurück' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Echt oder Fake? – Der Post-Check');
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Check starten' })).toBeVisible();
});

test('Fortschritt zeigt Teil, «n von 12» und einen Balken; bei 7 zu 8 wechselt der Teil', async ({ page }) => {
  await startePruefung(page);
  const balken = page.getByRole('progressbar', { name: 'Fortschritt' });
  for (let n = 1; n <= 12; n++) {
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(`Prüfpunkt ${n} von 12`);
    await expect(balken).toHaveJSProperty('value', n);
    await expect(balken).toHaveJSProperty('max', 12);
    await expect(balken).toBeVisible();
    const teil = n <= 7 ? 'Teil A: Absender und Kontext' : 'Teil B: Bild';
    const anderer = n <= 7 ? 'Teil B: Bild' : 'Teil A: Absender und Kontext';
    await expect(page.getByText(teil, { exact: true })).toBeVisible();
    await expect(page.getByText(anderer, { exact: true })).toHaveCount(0);
    await waehle(page, UNAUFFAELLIG);
    await weiter(page);
  }
});

test('Prüfpunkt 12 zeigt den SynthID-Link und den Hinweis, andere Prüfpunkte nicht', async ({ page }) => {
  await startePruefung(page);
  const zusatz = dokument.zusatz();
  for (let n = 1; n <= 11; n++) {
    await expect(page.getByRole('link')).toHaveCount(0);
    await expect(page.getByText(zusatz.hinweis, { exact: true })).toHaveCount(0);
    await waehle(page, UNAUFFAELLIG);
    await weiter(page);
  }
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 12 von 12');
  const link = page.getByRole('link', { name: zusatz.link });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', 'https://synthid.com/');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noreferrer/);
  await expect(link).toHaveAttribute('rel', /noopener/);
  await expect(page.getByText(zusatz.hinweis, { exact: true })).toBeVisible();
});
