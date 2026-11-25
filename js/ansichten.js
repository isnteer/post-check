import { el } from './dom.js';
import * as inhalt from './inhalt.js';

export function startansicht({ starten }) {
  return el('section', {},
    el('h1', { tabindex: '-1' }, inhalt.titel),
    el('p', {}, inhalt.startseite),
    el('button', { type: 'button', onclick: starten }, 'Check starten'),
  );
}

export function pruefpunktansicht({ index, antwort, waehlen, weiter, zurueck }) {
  const punkt = inhalt.pruefpunkte[index];
  const tippBereich = el('div', { 'aria-live': 'polite', class: 'tipp-bereich' });
  const zeigeTipp = (wert) => {
    tippBereich.replaceChildren(...(wert === 'auffaellig' ? [el('p', { class: 'tipp' }, punkt.tipp)] : []));
  };
  zeigeTipp(antwort);
  let gewaehlt = antwort;
  const fehlerBereich = el('div', { class: 'fehler-bereich' });
  const radios = inhalt.antworten.map(({ wert, beschriftung }) => {
    const eingabe = el('input', { type: 'radio', name: 'antwort', value: wert });
    eingabe.checked = antwort === wert;
    eingabe.addEventListener('change', () => {
      gewaehlt = wert;
      waehlen(wert);
      zeigeTipp(wert);
      fehlerBereich.replaceChildren();
    });
    return el('label', { class: 'antwort' }, eingabe, beschriftung);
  });
  return el('section', {},
    el('h2', { tabindex: '-1' }, `Prüfpunkt ${index + 1} von ${inhalt.pruefpunkte.length}`),
    el('p', {}, `Teil ${punkt.teil}: ${inhalt.teile[punkt.teil]}`),
    el('fieldset', {},
      el('legend', {}, punkt.frage),
      ...radios,
    ),
    tippBereich,
    el('p', { class: 'quelle' }, `Quelle: ${punkt.quelle}`),
    fehlerBereich,
    el('button', { type: 'button', onclick: () => {
      if (gewaehlt === null) fehlerBereich.replaceChildren(el('p', { role: 'alert', class: 'fehler' }, inhalt.fehlerKeineAntwort));
      else weiter();
    } }, 'Weiter'),
    el('button', { type: 'button', onclick: zurueck }, 'Zurück'),
  );
}

export function ergebnisansicht() {
  return el('section', {},
    el('h2', { tabindex: '-1' }, inhalt.meldungKeineWarnzeichen),
  );
}

export function fussansicht() {
  return [
    el('p', {}, inhalt.fuss.arbeit),
    el('p', {}, inhalt.fuss.quellenTitel),
    el('ul', {}, ...inhalt.fuss.quellen.map((quelle) => el('li', {}, quelle))),
  ];
}
