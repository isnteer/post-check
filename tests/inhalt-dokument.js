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

module.exports = { pruefpunkte, fuss, ergebnismeldungen };
