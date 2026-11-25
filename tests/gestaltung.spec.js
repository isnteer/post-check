const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const { UNAUFFAELLIG, AUFFAELLIG, NICHT_PRUEFBAR, pruefeDurch, zumPruefpunkt } = require('./helfer');

const SCHRIFT = 'Atkinson Hyperlegible Next';

const vorsichtMitBeidenListen = [
  AUFFAELLIG, UNAUFFAELLIG, NICHT_PRUEFBAR, UNAUFFAELLIG, AUFFAELLIG, UNAUFFAELLIG,
  UNAUFFAELLIG, UNAUFFAELLIG, UNAUFFAELLIG, UNAUFFAELLIG, UNAUFFAELLIG, NICHT_PRUEFBAR,
];

async function seitlichesScrollen(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
}

const ansichten = {
  Start: (page) => page.goto('/'),
  Prüfpunkt: (page) => zumPruefpunkt(page, 12),
  Ergebnis: (page) => pruefeDurch(page, vorsichtMitBeidenListen),
};

for (const [name, oeffne] of Object.entries(ansichten)) {
  test(`${name}: bei 375 px kein seitliches Scrollen`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await oeffne(page);
    expect(await seitlichesScrollen(page)).toBe(false);
  });

  test(`${name}: bei grosser Systemschrift kein seitliches Scrollen und nichts abgeschnitten`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await oeffne(page);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    expect(await seitlichesScrollen(page)).toBe(false);
    const abgeschnitten = await page.evaluate(() =>
      [...document.querySelectorAll('main *, footer *')].filter((knoten) => {
        if (knoten.closest('svg')) return false;
        const rahmen = knoten.getBoundingClientRect();
        return rahmen.right > document.documentElement.clientWidth + 1 || rahmen.left < -1;
      }).length,
    );
    expect(abgeschnitten).toBe(0);
  });
}

test('der ganze Check lässt sich nur mit der Tastatur bis zum Ergebnis durchspielen', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Check starten' })).toBeFocused();
  await page.keyboard.press('Enter');
  for (let nummer = 1; nummer <= 12; nummer++) {
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(`Prüfpunkt ${nummer} von 12`);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('radio').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('radio', { name: NICHT_PRUEFBAR, exact: true })).toBeChecked();
    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('radio', { name: AUFFAELLIG, exact: true })).toBeChecked();
    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('radio', { name: UNAUFFAELLIG, exact: true })).toBeChecked();
    if (nummer === 12) await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Weiter' })).toBeFocused();
    await page.keyboard.press('Enter');
  }
  await expect(page.getByRole('heading', { level: 2 })).toContainText('Keine Warnzeichen gefunden');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Antworten ändern' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Neuen Post prüfen' })).toBeFocused();
});

test('alle bedienbaren Elemente zeigen per Tastatur einen deutlichen Fokus', async ({ page }) => {
  await zumPruefpunkt(page, 12);
  const gesehen = [];
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    gesehen.push(await page.evaluate(() => {
      const knoten = document.activeElement;
      const stil = getComputedStyle(knoten);
      const ziel = knoten.matches('input') ? getComputedStyle(knoten.closest('label')) : stil;
      return {
        tag: knoten.tagName,
        umriss: parseFloat(stil.outlineWidth) >= 2 && stil.outlineStyle !== 'none',
        umrissLabel: parseFloat(ziel.outlineWidth) >= 2 && ziel.outlineStyle !== 'none',
        sichtbar: knoten.matches(':focus-visible'),
      };
    }));
  }
  const bedienbar = gesehen.filter((eintrag) => ['INPUT', 'BUTTON', 'A'].includes(eintrag.tag));
  expect(bedienbar.length).toBeGreaterThanOrEqual(4);
  for (const eintrag of bedienbar) {
    expect(eintrag.sichtbar).toBe(true);
    expect(eintrag.umriss || eintrag.umrissLabel).toBe(true);
  }
});

test('Antwortflächen und Knöpfe sind mindestens 44 px hoch und breit', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await zumPruefpunkt(page, 1);
  const flaechen = page.locator('label.antwort, button');
  const anzahl = await flaechen.count();
  expect(anzahl).toBe(5);
  for (let i = 0; i < anzahl; i++) {
    const rahmen = await flaechen.nth(i).boundingBox();
    expect(rahmen.height).toBeGreaterThanOrEqual(44);
    expect(rahmen.width).toBeGreaterThanOrEqual(44);
  }
});

test('die Schrift Atkinson Hyperlegible Next kommt vom eigenen Ursprung, die Lizenz liegt daneben', async ({ page, baseURL }) => {
  const anfragen = [];
  page.on('request', (anfrage) => anfragen.push(anfrage.url()));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const geladen = await page.evaluate((schrift) => [
    document.fonts.check(`1rem "${schrift}"`),
    document.fonts.check(`bold 1rem "${schrift}"`),
    [...document.fonts].filter((f) => f.family.replaceAll('"', '') === schrift && f.status === 'loaded').length,
  ], SCHRIFT);
  expect(geladen[0]).toBe(true);
  expect(geladen[1]).toBe(true);
  expect(geladen[2]).toBeGreaterThanOrEqual(2);
  const schriftanfragen = anfragen.filter((url) => url.endsWith('.woff2'));
  expect(schriftanfragen.length).toBeGreaterThanOrEqual(2);
  for (const url of schriftanfragen) expect(new URL(url).origin).toBe(new URL(baseURL).origin);
  const familie = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(familie.startsWith(`"${SCHRIFT}"`)).toBe(true);
  expect(familie).toMatch(/system-ui|sans-serif/);
  const lizenz = await page.request.get('fonts/OFL.txt');
  expect(lizenz.status()).toBe(200);
  expect(await lizenz.text()).toContain('SIL OPEN FONT LICENSE');
});

test('die Schrift lädt mit font-display swap', async ({ page }) => {
  await page.goto('/');
  const anzeige = await page.evaluate(() => [...document.fonts].map((f) => f.display));
  expect(anzeige.length).toBeGreaterThanOrEqual(2);
  for (const wert of anzeige) expect(wert).toBe('swap');
});

test('die Content-Security-Policy erlaubt keine fremden Ursprünge', async ({ page }) => {
  await page.goto('/');
  const richtlinie = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
  expect(richtlinie).not.toMatch(/https?:|\*|unsafe/);
  expect(richtlinie).toContain("font-src 'self'");
});

for (const modus of ['light', 'dark']) {
  test(`Darstellung folgt dem Systemmodus ${modus}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: modus });
    await page.goto('/');
    const hintergrund = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const [r, g, b] = hintergrund.match(/\d+/g).map(Number);
    const helligkeit = (r + g + b) / 3;
    if (modus === 'dark') expect(helligkeit).toBeLessThan(60);
    else expect(helligkeit).toBeGreaterThan(200);
  });

  for (const [name, oeffne] of Object.entries(ansichten)) {
    test(`axe findet auf ${name} im Modus ${modus} keine Verstösse`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: modus, reducedMotion: 'reduce' });
      await oeffne(page);
      if (name === 'Prüfpunkt') {
        await page.getByRole('radio', { name: AUFFAELLIG, exact: true }).check();
        await expect(page.locator('.tipp')).toBeVisible();
      }
      if (name === 'Ergebnis') {
        await expect(page.getByRole('region', { name: 'Warnzeichen' })).toBeVisible();
        await expect(page.getByRole('region', { name: 'Konntest du nicht prüfen' })).toBeVisible();
      }
      const ergebnis = await new AxeBuilder({ page }).analyze();
      expect(ergebnis.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
    });
  }
}

test('bei reduzierter Bewegung läuft nirgends eine Animation oder ein Übergang', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await pruefeDurch(page, vorsichtMitBeidenListen);
  const bewegt = await page.evaluate(() =>
    [...document.querySelectorAll('*')].filter((knoten) => {
      const stil = getComputedStyle(knoten);
      return stil.transitionDuration.split(',').some((d) => parseFloat(d) > 0)
        || stil.animationDuration.split(',').some((d) => parseFloat(d) > 0)
        || stil.scrollBehavior === 'smooth';
    }).length,
  );
  expect(bewegt).toBe(0);
});
