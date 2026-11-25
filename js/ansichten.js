import { el } from './dom.js';
import * as inhalt from './inhalt.js';
import { tacho } from './tacho.js';
import { ANTWORT, ERGEBNIS, KEINE_ANTWORT } from './werte.js';

const OFFEN = 'offen';

function segmentklasse(antwort, aktuell) {
  return [antwort ?? OFFEN, ...(aktuell ? ['aktuell'] : [])].join(' ');
}

function segmente(antworten, aktuell = -1, { beschriftet = false } = {}) {
  const gruppe = (teil) => el('span', { class: 'gruppe' },
    el('span', { class: 'spur' },
      ...inhalt.pruefpunkte.flatMap((punkt, index) =>
        punkt.teil === teil ? [el('span', { class: segmentklasse(antworten[index], index === aktuell) })] : []),
    ),
    ...(beschriftet ? [el('span', { class: 'gruppenname' }, teilname(teil))] : []),
  );
  return el('div', { class: 'segmente', 'aria-hidden': 'true' }, ...Object.keys(inhalt.teile).map(gruppe));
}

function teilname(teil) {
  return inhalt.fuelle(inhalt.bedienung.teil, { teil, name: inhalt.teile[teil] });
}

function setzeSegment(balken, index, antwort) {
  balken.querySelectorAll('.spur > span')[index].className = segmentklasse(antwort, true);
}

function pruefpunktueberschrift(nummer) {
  const [vor, nach] = inhalt.bedienung.pruefpunkt.split('{nummer}');
  return el('h2', { tabindex: '-1' },
    el('span', { class: 'vor' }, vor),
    el('span', { class: 'nummer' }, String(nummer)),
    el('span', { class: 'nach' }, inhalt.fuelle(nach, { anzahl: inhalt.pruefpunkte.length })),
  );
}

export function startansicht({ starten }) {
  return el('section', { class: 'start' },
    segmente(inhalt.pruefpunkte.map(() => KEINE_ANTWORT), -1, { beschriftet: true }),
    el('p', {}, inhalt.startseite),
    el('button', { type: 'button', onclick: starten }, inhalt.bedienung.starten),
  );
}

export function pruefpunktansicht({ index, antworten, waehlen, weiter, zurueck }) {
  const punkt = inhalt.pruefpunkte[index];
  const antwort = antworten[index];
  const balken = segmente(antworten, index);
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
      setzeSegment(balken, index, wert);
      zeigeTipp(wert);
      fehlerBereich.replaceChildren();
    });
    return el('label', { class: 'antwort' }, eingabe, beschriftung);
  });
  return el('section', { class: `pruefpunkt teil-${punkt.teil}` },
    el('progress', { max: String(inhalt.pruefpunkte.length), value: String(index + 1), 'aria-label': inhalt.bedienung.fortschritt }),
    balken,
    pruefpunktueberschrift(index + 1),
    el('p', { class: 'teil' }, teilname(punkt.teil)),
    el('fieldset', {},
      el('legend', {}, punkt.frage),
      ...radios,
    ),
    tippBereich,
    ...(punkt.zusatz ? [zusatzansicht(punkt.zusatz)] : []),
    el('p', { class: 'quelle' }, inhalt.fuelle(inhalt.bedienung.quelle, { quelle: punkt.quelle })),
    fehlerBereich,
    el('div', { class: 'knoepfe' },
      el('button', { type: 'button', onclick: () => {
        if (gewaehlt === KEINE_ANTWORT) fehlerBereich.replaceChildren(el('p', { role: 'alert', class: 'fehler' }, inhalt.fehlerKeineAntwort));
        else weiter();
      } }, inhalt.bedienung.weiter),
      el('button', { type: 'button', class: 'zweitrangig', onclick: zurueck }, inhalt.bedienung.zurueck),
    ),
  );
}

function zusatzansicht({ link, hinweis }) {
  return el('div', { class: 'zusatz' },
    el('p', {}, el('a', { href: link, target: '_blank', rel: 'noopener noreferrer' }, link)),
    el('p', {}, hinweis),
  );
}

export function ergebnisansicht({ auswertung, antworten, aendern, neu }) {
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
    el('div', { class: 'ergebnis-karte' },
      segmente(antworten),
      el('h2', { tabindex: '-1' }, meldung),
      tacho(auswertung.zweifel),
    ),
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
