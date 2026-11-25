import { ANTWORT, ERGEBNIS } from './werte.js';

const NICHT_PRUEFBAR_PRO_ZWEIFEL = 4;
export const SCHWELLE_VORSICHT = 1;

export function wertAus(antworten) {
  const positionen = (wert) =>
    antworten.flatMap((antwort, index) => (antwort === wert ? [index] : []));
  const warnzeichen = positionen(ANTWORT.AUFFAELLIG);
  const nichtPruefbar = positionen(ANTWORT.NICHT_PRUEFBAR);
  const zweifel = warnzeichen.length + nichtPruefbar.length / NICHT_PRUEFBAR_PRO_ZWEIFEL;
  return {
    ergebnis: zweifel >= SCHWELLE_VORSICHT ? ERGEBNIS.VORSICHT : ERGEBNIS.KEINE_WARNZEICHEN,
    zweifel,
    warnzeichen,
    nichtPruefbar,
  };
}
