import { el } from './dom.js';
import * as inhalt from './inhalt.js';

export function startansicht({ starten }) {
  return el('section', {},
    el('h1', { tabindex: '-1' }, inhalt.titel),
    el('p', {}, inhalt.startseite),
    el('button', { type: 'button', onclick: starten }, 'Check starten'),
  );
}

export function pruefpunktansicht({ index, antwort, waehlen, weiter }) {
  const punkt = inhalt.pruefpunkte[index];
  const radios = inhalt.antworten.map(({ wert, beschriftung }) => {
    const eingabe = el('input', { type: 'radio', name: 'antwort', value: wert });
    eingabe.checked = antwort === wert;
    eingabe.addEventListener('change', () => waehlen(wert));
    return el('label', { class: 'antwort' }, eingabe, beschriftung);
  });
  return el('section', {},
    el('h2', { tabindex: '-1' }, `Prüfpunkt ${index + 1} von ${inhalt.pruefpunkte.length}`),
    el('p', {}, `Teil ${punkt.teil}: ${inhalt.teile[punkt.teil]}`),
    el('fieldset', {},
      el('legend', {}, punkt.frage),
      ...radios,
    ),
    el('p', { class: 'quelle' }, `Quelle: ${punkt.quelle}`),
    el('button', { type: 'button', onclick: weiter }, 'Weiter'),
  );
}

export function ergebnisansicht({ auswertung, aendern, neu }) {
  const meldung =
    auswertung.ergebnis === 'vorsicht' ? inhalt.meldungVorsicht : inhalt.meldungKeineWarnzeichen;
  const warnzeichen = auswertung.warnzeichen.map((index) => {
    const punkt = inhalt.pruefpunkte[index];
    return el('li', {}, el('p', {}, punkt.frage), el('p', {}, punkt.tipp));
  });
  const nichtPruefbar = auswertung.nichtPruefbar.map((index) =>
    el('li', {}, inhalt.pruefpunkte[index].frage),
  );
  return el('section', {},
    el('h2', { tabindex: '-1' }, meldung),
    ...liste('warnzeichen-titel', inhalt.ergebnisseite.warnzeichenTitel, warnzeichen),
    ...liste('nicht-pruefbar-titel', inhalt.ergebnisseite.nichtPruefbarTitel, nichtPruefbar),
    el('p', {}, inhalt.ergebnisseite.merksatz),
    el('button', { type: 'button', onclick: aendern }, inhalt.ergebnisseite.aendern),
    el('button', { type: 'button', onclick: neu }, inhalt.ergebnisseite.neu),
  );
}

function liste(kennung, titel, eintraege) {
  if (eintraege.length === 0) return [];
  return [
    el('section', { 'aria-labelledby': kennung },
      el('h3', { id: kennung }, titel),
      el('ul', {}, ...eintraege),
    ),
  ];
}

export function fussansicht() {
  return [
    el('p', {}, inhalt.fuss.arbeit),
    el('p', {}, inhalt.fuss.quellenTitel),
    el('ul', {}, ...inhalt.fuss.quellen.map((quelle) => el('li', {}, quelle))),
  ];
}
