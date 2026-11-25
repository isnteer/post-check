import * as ansichten from './ansichten.js';
import { wertAus } from './auswertung.js';
import { pruefpunkte, titel as titeltext } from './inhalt.js';
import { KEINE_ANTWORT } from './werte.js';

export function starteAblauf({ titel, ansicht, fuss }) {
  const antworten = new Array(pruefpunkte.length).fill(KEINE_ANTWORT);

  function zeige(inhalt) {
    ansicht.replaceChildren(inhalt);
    (ansicht.querySelector('[tabindex="-1"]') ?? titel).focus();
  }

  function zeigeStart() {
    zeige(ansichten.startansicht({ starten: () => zeigePruefpunkt(0) }));
  }

  function zeigePruefpunkt(index) {
    zeige(ansichten.pruefpunktansicht({
      index,
      antwort: antworten[index],
      waehlen: (wert) => { antworten[index] = wert; },
      zurueck: () => (index > 0 ? zeigePruefpunkt(index - 1) : zeigeStart()),
      weiter: () => (index + 1 < pruefpunkte.length ? zeigePruefpunkt(index + 1) : zeigeErgebnis()),
    }));
  }

  function zeigeErgebnis() {
    zeige(ansichten.ergebnisansicht({
      auswertung: wertAus(antworten),
      aendern: () => zeigePruefpunkt(0),
      neu: () => {
        antworten.fill(KEINE_ANTWORT);
        zeigeStart();
      },
    }));
  }

  titel.textContent = titeltext;
  fuss.replaceChildren(...ansichten.fussansicht());
  zeigeStart();
}
