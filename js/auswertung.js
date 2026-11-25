const NICHT_PRUEFBAR_PRO_ZWEIFEL = 4;
const SCHWELLE_VORSICHT = 1;

export function wertAus(antworten) {
  const positionen = (wert) =>
    antworten.flatMap((antwort, index) => (antwort === wert ? [index] : []));
  const warnzeichen = positionen('auffaellig');
  const nichtPruefbar = positionen('nicht-pruefbar');
  const zweifel = warnzeichen.length + nichtPruefbar.length / NICHT_PRUEFBAR_PRO_ZWEIFEL;
  return {
    ergebnis: zweifel >= SCHWELLE_VORSICHT ? 'vorsicht' : 'keine-warnzeichen',
    zweifel,
    warnzeichen,
    nichtPruefbar,
  };
}
