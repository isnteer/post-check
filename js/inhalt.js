export const titel = 'Echt oder Fake? – Der Post-Check';

export const startseite =
  'Man prüft einen Social-Media-Post (Bild und Headline) Schritt für Schritt: ' +
  'zuerst Teil A «Absender und Kontext» (1–7), dann Teil B «Bild» (8–12). ' +
  'Bei jedem Prüfpunkt wählt man «unauffällig», «auffällig» oder «kann ich nicht prüfen».';

export const antworten = [
  { wert: 'unauffaellig', beschriftung: 'unauffällig' },
  { wert: 'auffaellig', beschriftung: 'auffällig' },
  { wert: 'nicht-pruefbar', beschriftung: 'kann ich nicht prüfen' },
];

export const teile = {
  A: 'Absender und Kontext',
  B: 'Bild',
};

export const pruefpunkte = [
  { teil: 'A', frage: 'Wer hat den Post veröffentlicht? Ist es ein bekanntes Medium, eine Behörde oder eine Privatperson?', quelle: 'SRF 2025' },
  { teil: 'A', frage: 'Kennt sich der Absender im Thema aus? Woher könnte er das wissen?', quelle: 'Trachsel 2026' },
  { teil: 'A', frage: 'Wie sieht das Profil aus? Ist es schon lange aktiv, oder wurde es erst vor kurzem erstellt?', quelle: 'Trachsel 2026' },
  { teil: 'A', frage: 'Berichten andere, unabhängige Quellen darüber, oder gibt es schon einen Faktencheck?', quelle: 'SRF 2025; Trachsel 2026' },
  { teil: 'A', frage: 'Wo und wann soll es passiert sein? Passen Ort und Zeit zusammen?', quelle: 'SRF 2025' },
  { teil: 'A', frage: 'Klingt es zu gut, um wahr zu sein? Spielt es mit starken Gefühlen oder Superlativen?', quelle: 'Tages-Anzeiger 2026; Trachsel 2026' },
  { teil: 'A', frage: 'Passt der Inhalt zum Absender?', quelle: 'Trachsel 2026' },
  { teil: 'B', frage: 'Sehen Hände, Gesichter und Körper natürlich aus?', quelle: 'SRF 2025' },
  { teil: 'B', frage: 'Ist die Schrift im Bild korrekt und lesbar?', quelle: 'SRF 2025' },
  { teil: 'B', frage: 'Sehen bekannte Orte und Gebäude so aus wie in Wirklichkeit?', quelle: 'SRF 2025' },
  { teil: 'B', frage: 'Stimmen Schatten, Licht und Perspektive? Gibt es Fehler im Hintergrund, während ein Blickfang ablenkt?', quelle: 'SRF 2025' },
  { teil: 'B', frage: 'Findet der SynthID Detector ein KI-Wasserzeichen?', quelle: 'Trachsel 2026' },
];

export const meldungKeineWarnzeichen =
  'Keine Warnzeichen gefunden – aber auch ein Post ohne Warnzeichen kann ein Fake sein';

export const fuss = {
  arbeit: 'Vertiefungsarbeit von Jérôme Golaz und Nils Steiner, BBZW Sursee, 2026',
  quellenTitel: 'Quellen:',
  quellen: [
    'SRF News (19.09.2025): «KI-Videos erkennen»',
    'Interview mit Stefan Trachsel, CH Media (11.11.2026)',
    'Tages-Anzeiger (25.05.2026)',
  ],
};
