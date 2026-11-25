const { test, expect } = require('@playwright/test');
const dokument = require('./inhalt-dokument');

const UNAUFFAELLIG = 'unauffällig';
const AUFFAELLIG = 'auffällig';
const NICHT_PRUEFBAR = 'kann ich nicht prüfen';

const GRAU_BIS_GRAD = 60;
const VOLL_GRAD = 180;

function antwortenMit(anzahl, antwort, grundantwort = UNAUFFAELLIG) {
  return [...new Array(anzahl).fill(antwort), ...new Array(12 - anzahl).fill(grundantwort)];
}

async function pruefeDurch(page, antworten) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Check starten' }).click();
  for (const antwort of antworten) {
    await page.getByRole('radio', { name: antwort, exact: true }).check();
    await page.getByRole('button', { name: 'Weiter' }).click();
  }
}

async function nadelwinkel(page) {
  return page.locator('main svg .nadel').evaluate((nadel) => {
    const matrix = new DOMMatrix(getComputedStyle(nadel).transform);
    return (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
  });
}

const faelle = [
  { name: 'Zweifel 0', antworten: antwortenMit(0, AUFFAELLIG), zone: 'grau' },
  { name: 'Zweifel 0,75', antworten: antwortenMit(3, NICHT_PRUEFBAR), zone: 'grau' },
  { name: 'Zweifel 1', antworten: antwortenMit(1, AUFFAELLIG), zone: 'farbig' },
  { name: 'Zweifel 1 durch 4× nicht prüfbar', antworten: antwortenMit(4, NICHT_PRUEFBAR), zone: 'farbig' },
  { name: 'Zweifel 3', antworten: antwortenMit(12, NICHT_PRUEFBAR), zone: 'farbig' },
  { name: 'Zweifel 6', antworten: antwortenMit(6, AUFFAELLIG), zone: 'voll' },
  { name: 'Zweifel 12', antworten: antwortenMit(12, AUFFAELLIG), zone: 'voll' },
];

test('der Tacho ist sichtbar, beschriftet und für Screenreader ausgeblendet', async ({ page }) => {
  const beschriftung = dokument.tacho();
  await pruefeDurch(page, antwortenMit(1, AUFFAELLIG));
  const tacho = page.locator('main svg');
  await expect(tacho).toBeVisible();
  await expect(tacho).toHaveAttribute('aria-hidden', 'true');
  await expect(tacho).toContainText(beschriftung.links);
  await expect(tacho).toContainText(beschriftung.rechts);
  await expect(tacho).toContainText(beschriftung.grauZone);
  await expect(page.getByRole('img')).toHaveCount(0);
});

test('der Tacho zeigt kein Grün und nicht das Wort «echt»', async ({ page }) => {
  for (const { antworten } of [faelle[0], faelle[2], faelle[6]]) {
    await pruefeDurch(page, antworten);
    const text = await page.locator('main svg').textContent();
    expect(text).not.toMatch(/echt/i);
    const farben = await page.locator('main svg *').evaluateAll((knoten) =>
      knoten.flatMap((k) => {
        const stil = getComputedStyle(k);
        return [stil.fill, stil.stroke];
      }),
    );
    for (const farbe of farben) {
      const treffer = farbe.match(/^rgba?\((\d+), (\d+), (\d+)/);
      if (!treffer) continue;
      const [r, g, b] = treffer.slice(1).map(Number);
      expect(g > r + 20 && g > b + 20, `grünlich: ${farbe}`).toBe(false);
    }
  }
});

for (const { name, antworten, zone } of faelle) {
  test(`die Nadel steht bei ${name} in der Zone «${zone}»`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await pruefeDurch(page, antworten);
    if (zone === 'grau') await expect.poll(() => nadelwinkel(page)).toBeLessThan(GRAU_BIS_GRAD);
    if (zone === 'farbig') {
      await expect.poll(() => nadelwinkel(page)).toBeGreaterThan(GRAU_BIS_GRAD);
      expect(await nadelwinkel(page)).toBeLessThan(VOLL_GRAD);
    }
    if (zone === 'voll') await expect.poll(() => nadelwinkel(page)).toBeCloseTo(VOLL_GRAD, 1);
  });
}

test('bei reduzierter Bewegung hat die Nadel keine Animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await pruefeDurch(page, antwortenMit(1, AUFFAELLIG));
  const dauer = await page.locator('main svg .nadel').evaluate((nadel) => getComputedStyle(nadel).transitionDuration);
  expect(dauer).toBe('0s');
});

test('ohne Einstellung zur Bewegung schlägt die Nadel animiert aus', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await pruefeDurch(page, antwortenMit(1, AUFFAELLIG));
  const dauer = await page.locator('main svg .nadel').evaluate((nadel) => getComputedStyle(nadel).transitionDuration);
  expect(dauer).not.toBe('0s');
});

test('der Tacho passt bei 375 px ohne seitliches Scrollen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await pruefeDurch(page, antwortenMit(12, AUFFAELLIG));
  const ueberlauf = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(ueberlauf).toBe(false);
});
