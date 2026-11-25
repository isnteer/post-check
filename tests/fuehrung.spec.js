const { test, expect } = require('@playwright/test');
const dokument = require('./inhalt-dokument');

async function startePruefung(page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Check starten' }).click();
}

async function waehle(page, antwort) {
  await page.getByRole('radio', { name: antwort, exact: true }).check();
}

async function weiter(page) {
  await page.getByRole('button', { name: 'Weiter' }).click();
}

test('«auffällig» zeigt bei jedem der 12 Prüfpunkte den Tipp im Wortlaut in einer live region', async ({ page }) => {
  await startePruefung(page);
  for (const { nummer, tipp } of dokument.tipps()) {
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(`Prüfpunkt ${nummer} von 12`);
    await expect(page.getByText(tipp, { exact: true })).toHaveCount(0);
    await waehle(page, 'auffällig');
    const hinweis = page.getByText(tipp, { exact: true });
    await expect(hinweis).toBeVisible();
    await expect(page.locator('[aria-live]').filter({ has: hinweis })).toHaveCount(1);
    await weiter(page);
  }
});

test('der Tipp verschwindet, sobald die Antwort wechselt', async ({ page }) => {
  await startePruefung(page);
  const [{ tipp }] = dokument.tipps();
  await waehle(page, 'auffällig');
  await expect(page.getByText(tipp, { exact: true })).toBeVisible();
  await waehle(page, 'unauffällig');
  await expect(page.getByText(tipp, { exact: true })).toHaveCount(0);
  await waehle(page, 'auffällig');
  await expect(page.getByText(tipp, { exact: true })).toBeVisible();
  await waehle(page, 'kann ich nicht prüfen');
  await expect(page.getByText(tipp, { exact: true })).toHaveCount(0);
});

test('«Weiter» ohne Antwort bleibt auf dem Prüfpunkt und zeigt eine Fehlermeldung', async ({ page }) => {
  await startePruefung(page);
  await weiter(page);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 1 von 12');
  await expect(page.getByRole('alert')).toHaveText('Wähle eine Antwort, bevor du weitergehst.');
  await waehle(page, 'unauffällig');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await weiter(page);
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 2 von 12');
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('«Zurück» zeigt den vorherigen Prüfpunkt mit Antwort und Tipp', async ({ page }) => {
  await startePruefung(page);
  const tipps = dokument.tipps();
  await waehle(page, 'auffällig');
  await weiter(page);
  await waehle(page, 'kann ich nicht prüfen');
  await weiter(page);
  await waehle(page, 'unauffällig');
  await page.getByRole('button', { name: 'Zurück' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 2 von 12');
  await expect(page.getByRole('heading', { level: 2 })).toBeFocused();
  await expect(page.getByRole('radio', { name: 'kann ich nicht prüfen', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'Zurück' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Prüfpunkt 1 von 12');
  await expect(page.getByRole('radio', { name: 'auffällig', exact: true })).toBeChecked();
  await expect(page.getByText(tipps[0].tipp, { exact: true })).toBeVisible();
  await weiter(page);
  await weiter(page);
  await expect(page.getByRole('radio', { name: 'unauffällig', exact: true })).toBeChecked();
});

test('«Zurück» auf Prüfpunkt 1 führt zur Startseite', async ({ page }) => {
  await startePruefung(page);
  await page.getByRole('button', { name: 'Zurück' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Echt oder Fake? – Der Post-Check');
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Check starten' })).toBeVisible();
});
