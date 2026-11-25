import { el } from './dom.js';
import * as inhalt from './inhalt.js';
import { tacho } from './tacho.js';
import { ANTWORT, ERGEBNIS, KEINE_ANTWORT } from './werte.js';

export function startansicht({ starten }) {
  return el('section', { class: 'start' },
    el('p', {}, inhalt.startseite),
    el('button', { type: 'button', onclick: starten }, inhalt.bedienung.starten),
  );
}

export function pruefpunktansicht({ index, antwort, waehlen, weiter, zurueck }) {
  const punkt = inhalt.pruefpunkte[index];
  const tippBereich = el('div', { 'aria-live': 'polite', class: 'tipp-bereich' });
  const zeigeTipp = (wert) => {
    tippBereich.replaceChildren(...(wert === ANTWORT.AUFFAELLIG ? [el('p', { class: 'tipp' }, punkt.tipp)] : []));
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
  return el('section', { class: 'pruefpunkt' },
    el('h2', { tabindex: '-1' }, inhalt.fuelle(inhalt.bedienung.pruefpunkt, { nummer: index + 1, anzahl: inhalt.pruefpunkte.length })),
    el('progress', { max: String(inhalt.pruefpunkte.length), value: String(index + 1), 'aria-label': inhalt.bedienung.fortschritt }),
    el('p', { class: 'teil' }, inhalt.fuelle(inhalt.bedienung.teil, { teil: punkt.teil, name: inhalt.teile[punkt.teil] })),
    el('fieldset', {},
      el('legend', {}, punkt.frage),
      ...radios,
    ),
    tippBereich,
    ...(punkt.zusatz ? [zusatzansicht(punkt.zusatz)] : []),
    el('p', { class: 'quelle' }, inhalt.fuelle(inhalt.bedienung.quelle, { quelle: punkt.quelle })),
    fehlerBereich,
    el('button', { type: 'button', onclick: () => {
      if (gewaehlt === KEINE_ANTWORT) fehlerBereich.replaceChildren(el('p', { role: 'alert', class: 'fehler' }, inhalt.fehlerKeineAntwort));
      else weiter();
    } }, inhalt.bedienung.weiter),
    el('button', { type: 'button', class: 'zweitrangig', onclick: zurueck }, inhalt.bedienung.zurueck),
  );
}

function zusatzansicht({ link, hinweis }) {
  return el('div', { class: 'zusatz' },
    el('p', {}, el('a', { href: link, target: '_blank', rel: 'noopener noreferrer' }, link)),
    el('p', {}, hinweis),
  );
}

export function ergebnisansicht({ auswertung, aendern, neu }) {
  const meldung =
    auswertung.ergebnis === ERGEBNIS.VORSICHT ? inhalt.meldungVorsicht : inhalt.meldungKeineWarnzeichen;
  const warnzeichen = auswertung.warnzeichen.map((index) => {
    const punkt = inhalt.pruefpunkte[index];
    return el('li', {}, el('p', { class: 'frage' }, `${index + 1}. ${punkt.frage}`), el('p', {}, punkt.tipp));
  });
  const nichtPruefbar = auswertung.nichtPruefbar.map((index) =>
    el('li', {}, inhalt.pruefpunkte[index].frage),
  );
  return el('section', { class: `ergebnis ergebnis-${auswertung.ergebnis}` },
    el('h2', { tabindex: '-1' }, meldung),
    tacho(auswertung.zweifel),
    ...liste('warnzeichen-titel', inhalt.ergebnisseite.warnzeichenTitel, warnzeichen),
    ...liste('nicht-pruefbar-titel', inhalt.ergebnisseite.nichtPruefbarTitel, nichtPruefbar),
    el('p', { class: 'merksatz' }, inhalt.ergebnisseite.merksatz),
    el('button', { type: 'button', onclick: aendern }, inhalt.ergebnisseite.aendern),
    el('button', { type: 'button', class: 'zweitrangig', onclick: neu }, inhalt.ergebnisseite.neu),
  );
}

function liste(kennung, titel, eintraege) {
  if (eintraege.length === 0) return [];
  return [
    el('section', { 'aria-labelledby': kennung, class: kennung },
      el('h3', { id: kennung }, titel),
      el('ul', { role: 'list' }, ...eintraege),
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
