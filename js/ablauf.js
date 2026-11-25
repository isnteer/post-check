import * as ansichten from './ansichten.js';
import { wertAus } from './auswertung.js';
import { pruefpunkte } from './inhalt.js';

export function starteAblauf({ ansicht, fuss }) {
  const antworten = new Array(pruefpunkte.length).fill(null);

  function zeige(inhalt) {
    ansicht.replaceChildren(inhalt);
    ansicht.querySelector('[tabindex="-1"]').focus();
  }

  function zeigeStart() {
    zeige(ansichten.startansicht({ starten: () => zeigePruefpunkt(0) }));
  }

  function zeigePruefpunkt(index) {
    zeige(ansichten.pruefpunktansicht({
      index,
      antwort: antworten[index],
      waehlen: (wert) => { antworten[index] = wert; },
      weiter: () => (index + 1 < pruefpunkte.length ? zeigePruefpunkt(index + 1) : zeigeErgebnis()),
    }));
  }

  function zeigeErgebnis() {
    zeige(ansichten.ergebnisansicht({
      auswertung: wertAus(antworten),
      aendern: () => zeigePruefpunkt(0),
      neu: () => {
        antworten.fill(null);
        zeigeStart();
      },
    }));
  }

  fuss.replaceChildren(...ansichten.fussansicht());
  zeigeStart();
}
