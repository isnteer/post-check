# Entscheide

## Das Ergebnis sagt nie «echt»

Ein Post ohne Warnzeichen kann trotzdem ein Fake sein. Das Ergebnis lautet
deshalb nur «Keine Warnzeichen gefunden» oder «Vorsicht»; den Wortlaut gibt
`docs/INHALT.md` vor.

## Schwelle für «Vorsicht»

«Vorsicht» erscheint, sobald mindestens 1 Warnzeichen vorliegt oder mindestens
4 von 12 Prüfpunkten «kann ich nicht prüfen» sind. Wer ein Drittel nicht prüfen
kann, weiss zu wenig, um den Post bedenkenlos zu teilen.

## Zweifel und Tacho

Zweifel = Anzahl Warnzeichen + Anzahl «kann ich nicht prüfen» ÷ 4. Ab einem
Zweifel von 1 lautet das Ergebnis «Vorsicht»; so widersprechen sich Tacho und
Meldung nie.

- Der Tacho reicht von «wenig Zweifel» bis «viel Zweifel». Ein Ende «echt»
  gibt es nicht.
- Das erste Drittel des Bogens (Zweifel unter 1) ist grau und heisst «keine
  Warnzeichen». Danach geht er von Orange zu Rot und ist ab Zweifel 6 voll
  ausgeschlagen. Kein Grün, weil Grün wie «echt» wirkt.
- Massgebend ist die Textmeldung. Der Tacho ergänzt sie; Screenreader lesen
  den Text.

Beispiele: 0 Warnzeichen und 3× nicht prüfbar ergibt Zweifel 0,75, also «Keine
Warnzeichen gefunden» mit der Liste der 3 Punkte. 0 Warnzeichen und 12× nicht
prüfbar ergibt Zweifel 3, also «Vorsicht» ohne Tipps, nur mit der Liste der
nicht prüfbaren Punkte.

## Ergebnisseite

Zuerst die Warnzeichen mit ihren Tipps, danach die Liste «Konntest du nicht
prüfen». Leere Listen fallen weg.

## Schrift im Repo statt von Google

Schrift ist Atkinson Hyperlegible Next, gemacht für gute Lesbarkeit. Die
Dateien liegen im Repo. Über Googles Server würde jeder Besuch die IP-Adresse
an Google schicken; das widerspricht «ohne Tracking».

## Öffentliches Repo

GitHub Pages ist mit einem Gratis-Konto nur für öffentliche Repos möglich. Die
Seite soll nichts kosten, also ist `isnteer/post-check` öffentlich.

## Farbe statt hell und dunkel

Die Seite ist randlos eine Farbfläche: Violett für Start und Teil A, Magenta
für Teil B, Tinte für das Ergebnis. So wirkt sie am Handy wie eine Story und
am Desktop nicht wie ein verkleinertes Handy. Die Flächen sehen im hellen und
im dunklen Modus gleich aus; nur die Tinte des Ergebnisses wird im dunklen
Modus etwas heller. Kontraste erfüllen in beiden Modi WCAG AA.
