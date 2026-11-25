const fs = require('node:fs');
const path = require('node:path');

const text = fs.readFileSync(path.join(__dirname, '..', 'docs', 'INHALT.md'), 'utf8');

function abschnitt(titel) {
  const zeilen = text.split('\n');
  const start = zeilen.findIndex((zeile) => zeile === `## ${titel}`);
  const ende = zeilen.findIndex((zeile, i) => i > start && zeile.startsWith('## '));
  return zeilen.slice(start + 1, ende === -1 ? undefined : ende);
}

function pruefpunkte() {
  const punkte = [];
  let aktuell = null;
  for (const zeile of abschnitt('Prüfpunkte und Tipps')) {
    const kopf = zeile.match(/^(\d+)\. (.*)$/);
    if (kopf) {
      aktuell = { nummer: Number(kopf[1]), zeilen: [kopf[2]] };
      punkte.push(aktuell);
    } else if (aktuell && zeile.trim() !== '' && !/^\s+(Tipp|Zusatz)/.test(zeile) && !aktuell.beendet) {
      aktuell.zeilen.push(zeile.trim());
    } else if (aktuell && /^\s+(Tipp|Zusatz)/.test(zeile)) {
      aktuell.beendet = true;
    }
  }
  return punkte.map(({ nummer, zeilen }) => {
    const [, frage, quelle] = zeilen.join(' ').match(/^(.*) \(([^()]*)\)$/);
    return { nummer, frage, quelle, teil: nummer <= 7 ? 'A' : 'B' };
  });
}

function tipps() {
  const ergebnis = [];
  let aktuell = null;
  let imTipp = false;
  for (const zeile of abschnitt('Prüfpunkte und Tipps')) {
    if (/^\d+\. /.test(zeile)) {
      aktuell = [];
      ergebnis.push(aktuell);
      imTipp = false;
    } else if (/^\s+Tipp: /.test(zeile)) {
      aktuell.push(zeile.trim().slice('Tipp: '.length));
      imTipp = true;
    } else if (/^\s+Zusatz/.test(zeile) || zeile.trim() === '') {
      imTipp = false;
    } else if (imTipp) {
      aktuell.push(zeile.trim());
    }
  }
  return ergebnis.map((zeilen) => zeilen.join(' '));
}

function zusatz() {
  const zeilen = abschnitt('Prüfpunkte und Tipps');
  const start = zeilen.findIndex((zeile) => /^\s+Zusatz/.test(zeile));
  const text = zeilen
    .slice(start)
    .filter((zeile) => !zeile.startsWith('#'))
    .map((zeile) => zeile.trim())
    .join(' ')
    .trim();
  const [, link, hinweis] = text.match(/Link auf (\S+) und der Hinweis: (.*)$/);
  return { link, hinweis };
}

function fuss() {
  const zeilen = abschnitt('Fuss');
  const arbeit = zeilen.find((zeile) => zeile.startsWith('Vertiefungsarbeit'));
  const quellen = zeilen.filter((zeile) => zeile.startsWith('- ')).map((zeile) => zeile.slice(2));
  return { arbeit, quellen };
}

function ergebnismeldungen() {
  return abschnitt('Ergebnis')
    .join('\n')
    .split(/^- /m)
    .slice(1)
    .map((eintrag) => eintrag.replace(/\s*\n\s*/g, ' ').trim());
}

function tacho() {
  const zeilen = abschnitt('Tacho');
  const wert = (name) => zeilen.find((zeile) => zeile.startsWith(`${name}: `)).slice(name.length + 2);
  return {
    links: wert('Skala links'),
    rechts: wert('Skala rechts'),
    grauZone: wert('Graue Zone'),
  };
}

function bedienung() {
  const zeilen = abschnitt('Bedienung');
  const wert = (name) => zeilen.find((zeile) => zeile.startsWith(`- ${name}: `)).slice(name.length + 4);
  const [starten, weiter, zurueck] = wert('Knöpfe').split(', ');
  return {
    starten,
    weiter,
    zurueck,
    fortschritt: wert('Beschriftung des Fortschrittsbalkens'),
    pruefpunkt: (nummer) => wert('Überschrift des Prüfpunkts').replace('n von 12', `${nummer} von 12`),
    teil: { A: wert('Zeile für Teil A'), B: wert('Zeile für Teil B') },
    quelle: (quelle) => `${wert('Quellenzeile').match(/«(.*)»/)[1]}${quelle}`,
    fehler: wert('Fehlermeldung ohne Antwort'),
  };
}

module.exports = { bedienung, pruefpunkte, tipps, zusatz, fuss, ergebnismeldungen, tacho };
