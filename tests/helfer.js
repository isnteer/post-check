const UNAUFFAELLIG = 'unauffällig';
const AUFFAELLIG = 'auffällig';
const NICHT_PRUEFBAR = 'kann ich nicht prüfen';

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

async function beantworte(page, antwort) {
  await waehle(page, antwort);
  await weiter(page);
}

async function pruefeDurch(page, antworten) {
  await startePruefung(page);
  for (const antwort of antworten) await beantworte(page, antwort);
}

async function zumPruefpunkt(page, nummer) {
  await pruefeDurch(page, new Array(nummer - 1).fill(UNAUFFAELLIG));
}

module.exports = {
  UNAUFFAELLIG,
  AUFFAELLIG,
  NICHT_PRUEFBAR,
  startePruefung,
  waehle,
  weiter,
  beantworte,
  pruefeDurch,
  zumPruefpunkt,
};
