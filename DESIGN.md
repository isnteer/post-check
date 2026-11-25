---
name: "Echt oder Fake? – Der Post-Check"
description: "Ein Check als Story aus zwölf Farbkarten: Text auf Vollfarbe, gelbe Sticker, ein Story-Balken als Protokoll."
colors:
  violett: "#3a1fd1"
  magenta: "#b0136a"
  tinte: "#17151f"
  tinte-dunkel: "#221f30"
  gelb: "#ffd84a"
  auf-gelb: "#1c1600"
  weiss: "#ffffff"
  weiss-leise: "rgb(255 255 255 / 0.86)"
  weiss-flaeche: "rgb(255 255 255 / 0.13)"
  weiss-flaeche-hover: "rgb(255 255 255 / 0.22)"
  weiss-spur: "rgb(255 255 255 / 0.3)"
  knopf-dunkel: "#4b33e6"
  fehlerrot: "#a3140b"
  grund: "#f3f1fb"
  grund-dunkel: "#0f0d17"
  text: "#17151f"
  text-dunkel: "#ecebf3"
  text-leise: "#4d4a5c"
  text-leise-dunkel: "#b6b3c6"
  rand: "rgb(23 21 31 / 0.14)"
  rand-stark: "rgb(23 21 31 / 0.28)"
  tacho-grau: "#8f8ca0"
  tacho-orange: "#f2a03d"
  tacho-rot: "#ff6b5e"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 13vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  nummer:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "min(4.5rem, 20vw)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.5
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.25
  small:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  rund: "1rem"
  karte: "1.5rem"
  pille: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.75rem"
  xxl: "2.25rem"
components:
  karte-teil-a:
    backgroundColor: "{colors.violett}"
    textColor: "{colors.weiss}"
    rounded: "{rounded.karte}"
    padding: "1rem 1.25rem 1.25rem"
  karte-teil-b:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.weiss}"
    rounded: "{rounded.karte}"
    padding: "1rem 1.25rem 1.25rem"
  karte-ergebnis:
    backgroundColor: "{colors.tinte}"
    textColor: "{colors.weiss}"
    rounded: "{rounded.karte}"
    padding: "1rem 1.25rem 1.25rem"
  knopf-auf-karte:
    backgroundColor: "{colors.weiss}"
    textColor: "{colors.violett}"
    typography: "{typography.action}"
    rounded: "{rounded.pille}"
    padding: "0.75rem 1.25rem"
    height: "3.5rem"
  knopf-auf-karte-zweitrangig:
    backgroundColor: "transparent"
    textColor: "{colors.weiss}"
    typography: "{typography.action}"
    rounded: "{rounded.pille}"
    padding: "0.75rem 1.25rem"
    height: "3.5rem"
  knopf-auf-grund:
    backgroundColor: "{colors.violett}"
    textColor: "{colors.weiss}"
    typography: "{typography.action}"
    rounded: "{rounded.pille}"
    padding: "0.75rem 1.25rem"
    height: "3.5rem"
  antwort:
    backgroundColor: "{colors.weiss-flaeche}"
    textColor: "{colors.weiss}"
    rounded: "{rounded.rund}"
    padding: "0.75rem 1rem"
    height: "3.5rem"
  antwort-gewaehlt:
    backgroundColor: "{colors.weiss}"
    textColor: "{colors.violett}"
    rounded: "{rounded.rund}"
    padding: "0.75rem 1rem"
    height: "3.5rem"
  sticker-tipp:
    backgroundColor: "{colors.gelb}"
    textColor: "{colors.auf-gelb}"
    rounded: "{rounded.rund}"
    padding: "0.875rem 1rem"
  sticker-fehler:
    backgroundColor: "{colors.weiss}"
    textColor: "{colors.fehlerrot}"
    rounded: "{rounded.rund}"
    padding: "0.875rem 1rem"
---

# Design System: Echt oder Fake? – Der Post-Check

## Overview

**Creative North Star: "Die Story, die sich selbst prüft"**

Der Check spricht die Sprache der Posts, die er prüft. Er ist eine Story aus zwölf Karten: Teil A (Prüfpunkte 1–7) auf tiefem Violett, Teil B (8–12) auf Magenta, das Ergebnis auf Tinte. Text steht weiss und fett auf Vollfarbe, wie im Story-Modus «Text auf Farbe». Was der Mensch wissen muss, kommt als gelber Sticker darauf geklebt. Die weisse Quiz-Karte mit blauem Akzent, die diese Welt ersetzt hat, kommt nicht zurück.

Die Seite ist eine Spalte von höchstens 30rem, am Handy randnah. Jede Karte füllt fast den Schirm; die Frage steht gross oben, Antworten und Knöpfe liegen unten im Daumenbereich. Die Dichte ist niedrig, die Schrift gross, die Flächen satt. Über allem steht der segmentierte Story-Balken: Er zeigt zwölf Segmente in zwei Gruppen (7 + 5), färbt sich mit jeder Antwort und kehrt auf dem Ergebnis vollständig wieder.

Bewegung ist knapp und taktil: Druck beim Tippen, kurzes Einblenden von Stickern, gestaffeltes Erscheinen des Ergebnisses, ein Nadelausschlag des Tachos. Diese Animationen sind eine Markenzusage und bleiben unverändert.

**Key Characteristics:**
- Vollfarbkarten pro Teil: Violett, Magenta, Tinte.
- Weisser, fetter Text auf Farbe; gelbe Sticker mit Tintentext für Tipps und Warnzeichen.
- Segmentierter Story-Balken als Protokoll der Antworten.
- Pillenknöpfe, Antworten als weiche Flächen, Auswahl kippt auf Weiss.
- Eine Schrift: Atkinson Hyperlegible Next, Regular und Bold, selbst gehostet.
- Hell und dunkel folgen dem Systemmodus; die Farbkarten bleiben in beiden gleich.

## Colors

Drei satte Kartenfarben, ein Signalgelb und ein blasses Lila als Grund; Weiss ist auf den Karten die Textfarbe, nicht der Hintergrund.

### Primary
- **Story-Violett** (violett): Feld von Startkarte und Teil A, Knopffarbe auf dem Grund, Linkfarbe auf dem Grund, Fokusfarbe im Hellmodus. Im Dunkelmodus hebt sich der Knopf auf dem Grund zu **Leuchtviolett** (knopf-dunkel).

### Secondary
- **Story-Magenta** (magenta): Feld von Teil B. Wechselt Teil A zu Teil B, wechselt die ganze Karte die Farbe; alle Elemente darauf erben sie über das Kartenfeld.

### Tertiary
- **Stickergelb** (gelb) mit **Tintenbraun** (auf-gelb): Tipps, Warnzeichen-Liste, auffällige Segmente im Story-Balken, Textauswahl, Fokusring auf Farbkarten und im Dunkelmodus, Überschrift des Ergebnisses bei «Vorsicht».

### Neutral
- **Tinte** (tinte; im Dunkelmodus tinte-dunkel): Feld der Ergebniskarte und Grundtextfarbe im Hellmodus.
- **Blasses Lila** (grund) / **Nachtviolett** (grund-dunkel): Seitengrund; auch `theme-color` der Browserleiste.
- **Text** und **Text leise** (text, text-leise; dunkle Varianten): Fliesstext, Kontozeile, Fuss, Liste «nicht prüfbar».
- **Weiss-Stufen** auf Farbe: weiss-leise für Nebentext auf Karten, weiss-flaeche für Antwortflächen und Zusatzkasten, weiss-flaeche-hover für Hover, weiss-spur für leere Segmente und den Rand zweitrangiger Knöpfe.
- **Ränder** (rand, rand-stark): Haarlinien im Fuss und in Listen; der Merksatz trägt rand-stark.
- **Fehlerrot** (fehlerrot): nur als Text auf dem weissen Fehler-Sticker.

### Named Rules
**The Kein-Grün-Regel.** Der Tacho zeigt nie Grün und hat kein Ende «echt». Er läuft von Grau (tacho-grau, «keine Warnzeichen») über zehn Segmente von Orange (tacho-orange) zu Rot (tacho-rot). Kein Element der Seite darf Entwarnung in Grün ausdrücken.

**The Feld-erbt-Regel.** Eine Prüfpunktkarte setzt ihre Farbe einmal als Feld; gewählte Antwort, Radiopunkt und Hauptknopf übernehmen genau diese Farbe als Text auf Weiss. Teil B wird nie violett gemischt.

**The Gelb-heisst-Achtung-Regel.** Gelb ist reserviert für Warnzeichen, Tipps und Fokus. Es dekoriert nichts.

## Typography

**Display Font:** Atkinson Hyperlegible Next (mit system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible Next (mit system-ui, sans-serif)

**Character:** Eine einzige, auf Lesbarkeit gebaute Grotesk in zwei Schnitten. Grösse und Gewicht tragen die Hierarchie; enge Laufweite nur bei den grossen Graden.

### Hierarchy
- **Display** (700, clamp 2.75–3.75rem, 0.98): Titel auf der Startkarte, das Cover.
- **Nummer** (700, bis 4.5rem bzw. 20vw, 0.9, Tabellenziffern): die riesige Prüfpunktnummer, flankiert von «Prüfpunkt» und «von 12» in 1.125rem weiss-leise.
- **Headline** (700, 1.75rem): Ergebnismeldung auf der Ergebniskarte.
- **Title** (700, 1.625rem, 1.18): die Frage jedes Prüfpunkts, ausgeglichen umbrochen.
- **Subtitle** (700, 1.25rem): Abschnittstitel auf der Ergebnisseite.
- **Lead** (400, 1.1875rem, 1.45): Einleitung auf der Startkarte.
- **Body** (400, 1rem, 1.5): Fliesstext; Antworten in 1.0625rem fett, Sticker fett.
- **Action** (700, 1.125rem): alle Knöpfe.
- **Label** (700, 0.9375rem): Gruppennamen und Teilzeile am Story-Balken; die Kontozeile (Seitentitel über den Prüfpunktkarten) in derselben Grösse, Farbe text-leise.
- **Small** (400, 0.875rem): Quelle unter dem Prüfpunkt, Fuss.

### Named Rules
**The Eine-Schrift-Regel.** Nur Atkinson Hyperlegible Next, nur Regular (400) und Bold (700), aus `fonts/` im Repo. Keine zweite Familie, keine Zwischenschnitte.

## Layout

Eine Spalte, höchstens 30rem breit und zentriert. Am Handy liegt sie fast am Rand: Seitenabstand mindestens 0.5rem bzw. Safe-Area. Karten haben innen 1.25rem seitlich, die Startkarte 1.75rem oben. Die Prüfpunktkarte ist eine Flex-Spalte mit mindestens `min(100svh − 3.75rem, 54rem)` Höhe: Story-Balken, Teilzeile, Nummer und Frage oben; die erste Antwort schiebt sich mit `margin-top: auto` nach unten, sodass Antworten und Knöpfe im Daumenbereich stehen. Die Startkarte füllt ebenso den Schirm und setzt «Check starten» an den unteren Rand.

Rhythmus: 0.5rem zwischen Antworten und Segmentgruppen, 0.75rem für Nebenabstände, 1–1.25rem zwischen Blöcken, 2–2.25rem vor Abschnitten der Ergebnisseite, 3rem vor dem Fuss. Weiter und Zurück stehen nebeneinander im Verhältnis 2 : 1 und umbrechen, wenn der Platz fehlt. Alle Zielflächen sind mindestens 3.5rem hoch.

Der Story-Balken teilt sich in Gruppen 7 : 5 mit 0.5rem Fuge; Segmente stehen mit 0.1875rem Abstand. Auf Teil B rückt die Teilzeile unter die zweite Gruppe.

## Elevation & Depth

Die Welt ist flach in Farbe und hebt nur zwei Dinge leicht ab: die Karte vom Grund und den Sticker von der Karte. Beide Schatten sind weich, nach unten versetzt und mit negativem Spread, nie hart.

### Shadow Vocabulary
- **Kartenschatten** (`box-shadow: 0 0.75rem 2rem -1rem rgb(30 16 110 / 0.45)`, dunkel `rgb(0 0 0 / 0.7)`): Prüfpunkt- und Ergebniskarte.
- **Stickerschatten** (`box-shadow: 0 0.375rem 1rem -0.5rem rgb(10 6 30 / 0.45)`): Tipp, Fehler, gewählte Antwort, Warnzeichen-Einträge.

### Named Rules
**The Sticker-klebt-Regel.** Nur was auf der Karte «klebt» (Sticker, gewählte Antwort) trägt den Stickerschatten. Ruhende Flächen auf der Karte bleiben flach.

## Shapes

Weiche, grosszügige Rundungen ohne Ecken: Karten 1.5rem (karte), Antworten, Sticker, Zusatzkasten und Merksatz 1rem (rund), Knöpfe und Segmente als Pillen (999px). Die Startkarte teilt ihre Rundung mit dem Kopf darüber, sodass Titel und Karte eine Fläche bilden. Radiopunkte sind Kreise mit 2px weissem Ring; gewählt füllt sie Weiss mit einem dicken Ring in der Kartenfarbe. «Nicht prüfbar» ist überall dieselbe Form: diagonale Streifen in 2px-Teilung.

## Components

### Buttons
Satte Pillen, die beim Druck nachgeben.
- **Shape:** Pille (999px), volle Breite, mindestens 3.5rem hoch, 2px Rand in Feldfarbe.
- **Auf Farbkarten:** Weiss mit Text in der Kartenfarbe; zweitrangig transparent mit weissem Text und Rand weiss-spur.
- **Auf dem Grund:** Violett (dunkel Leuchtviolett) mit weissem Text; zweitrangig transparent mit violettem bzw. hellem Text.
- **Hover (nur Maus):** Fläche mischt 14 % Gegenfarbe ein; zweitrangig erhält eine leichte Tönung.
- **Druck:** `scale(0.97)` über 160ms mit ease-out `cubic-bezier(0.23, 1, 0.32, 1)`. Unverändert.
- **Fokus:** 3px Ring in Fokusfarbe, 3px Abstand; auf Farbkarten Gelb.

### Antworten
- **Ruhe:** Fläche weiss-flaeche, 1rem Rundung, weisser fetter Text, Kreis links.
- **Gewählt:** Fläche kippt auf Weiss, Text in Kartenfarbe, Stickerschatten.
- **Druck:** `scale(0.98)` über 160ms. Unverändert.
- **Fokus:** Ring um die ganze Antwort, nicht um den Kreis.

### Sticker (Tipp, Fehler)
- **Tipp:** Gelb mit Tintentext, fett, Stickerschatten; erscheint, sobald «auffällig» gewählt ist.
- **Fehler:** Weiss mit Fehlerrot.
- **Einblenden:** per `@starting-style` aus Deckkraft 0 und −0.25rem über 200ms. Unverändert.

### Karten
- **Startkarte:** Violett, Cover mit Titel, beschriftetem Story-Balken, Einleitung, Knopf unten.
- **Prüfpunktkarte:** Violett (Teil A) oder Magenta (Teil B), Kartenschatten, 1.5rem Rundung. Bleibt im Dunkelmodus gleich.
- **Ergebniskarte:** Tinte mit Story-Balken, Meldung und Tacho. Darunter auf dem Grund gestaffelt: Warnzeichen als gelbe Sticker, «nicht prüfbar» als Liste mit Streifenmarke, Merksatz im Rahmen. Abschnitte blenden mit 300ms und 120ms Verzögerung von +0.5rem ein. Unverändert.

### Story-Balken (Signatur)
Zwölf Pillensegmente in zwei Gruppen (7 + 5), für Screenreader ausgeblendet; ein verstecktes `progress` trägt den Fortschritt. Offen: weiss-spur; aktuell: Weiss und höher (0.5rem statt 0.3125rem); unauffällig: weiss-leise; auffällig: Gelb; nicht prüfbar: weiss gestreift. Jede Antwort färbt ihr Segment sofort. Auf der Startkarte beschriftet und etwas dicker, auf dem Ergebnis vollständig wiederholt.

### Tacho
Halbkreis-SVG, für Screenreader ausgeblendet; die Textmeldung ist massgebend. Erstes Drittel Grau, dann zehn Segmente Orange bis Rot. Die Nadel schlägt über 900ms mit ease-out aus. Unverändert.

## Do's and Don'ts

### Do:
- **Do** setze jede Prüfpunktkarte als Vollfarbe: Teil A Violett, Teil B Magenta, Ergebnis Tinte; Text darauf Weiss.
- **Do** nutze Gelb mit Tintentext für alles, was Achtung heisst: Tipps, Warnzeichen, auffällige Segmente.
- **Do** halte jede Zielfläche mindestens 3.5rem hoch und Antworten und Knöpfe im unteren Kartendrittel.
- **Do** lass jede Antwort ihr Segment im Story-Balken sofort färben und wiederhole den Balken auf dem Ergebnis.
- **Do** behalte die Animationen exakt: Druck 0.97/0.98 über 160ms, Sticker 200ms, Ergebnis 300ms mit 120ms Verzögerung, Nadel 900ms, alles mit `cubic-bezier(0.23, 1, 0.32, 1)`; bei «reduzierte Bewegung» keine Übergänge und keine Animationen.
- **Do** prüfe Kontraste hell und dunkel auf WCAG AA und zeige Fokus als 3px-Ring, auf Farbe in Gelb.

### Don't:
- **Don't** verwende Grün oder ein Ende «echt» im Tacho oder anderswo als Entwarnung.
- **Don't** kehre zur weissen Quiz-Karte mit blauem Akzent zurück.
- **Don't** lade Schriften oder andere Dateien von aussen oder füge eine zweite Schriftfamilie hinzu.
- **Don't** färbe Elemente auf Teil B violett; alles erbt das Kartenfeld.
- **Don't** verwende harte, unverwischte Schatten; Tiefe ist nur der weiche Karten- und Stickerschatten.
- **Don't** nutze Gelb als Dekoration.
