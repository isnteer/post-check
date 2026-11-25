const { test, expect } = require('@playwright/test');

test('Startseite erklärt den Check und führt mit «Check starten» zu Prüfpunkt 1', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Echt oder Fake? – Der Post-Check');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Echt oder Fake? – Der Post-Check');
  await expect(page.getByText('Man prüft einen Social-Media-Post (Bild und Headline) Schritt für Schritt: zuerst Teil A «Absender und Kontext» (1–7), dann Teil B «Bild» (8–12). Bei jedem Prüfpunkt wählt man «unauffällig», «auffällig» oder «kann ich nicht prüfen».')).toBeVisible();
  await page.getByRole('button', { name: 'Check starten' }).click();
  await expect(page.getByRole('group', { name: /^Wer hat den Post veröffentlicht\?/ })).toBeVisible();
});

test('der Referrer wird nicht weitergegeben', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute('content', 'no-referrer');
});
