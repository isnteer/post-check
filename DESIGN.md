---
name: "Echt oder Fake? – Der Post-Check"
description: "Ein Check als Story auf randloser Vollfarbe: Text auf Farbe, gelbe Sticker, ein Story-Balken als Protokoll."
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
  fehlerrot: "#a3140b"
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
  display-weit:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 7vw, 6rem)"
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
  nummer-weit:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "6rem"
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
  headline-weit:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  title-weit:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.12
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
  pille: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.75rem"
  xxl: "2.25rem"
  xxxl: "3rem"
  spaltenfuge: "5rem"
components:
  feld-teil-a:
    backgroundColor: "{colors.violett}"
    textColor: "{colors.weiss}"
    padding: "1rem 1.25rem 1.5rem"
  feld-teil-b:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.weiss}"
    padding: "1rem 1.25rem 1.5rem"
  feld-ergebnis:
    backgroundColor: "{colors.tinte}"
    textColor: "{colors.weiss}"
    padding: "1rem 1.25rem 1.5rem"
  knopf:
    backgroundColor: "{colors.weiss}"
    textColor: "{colors.violett}"
    typography: "{typography.action}"
    rounded: "{rounded.pille}"
    padding: "0.75rem 1.25rem"
    height: "3.5rem"
  knopf-zweitrangig:
    backgroundColor: "transparent"
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
  sticker-warnzeichen:
    backgroundColor: "{colors.gelb}"
    textColor: "{colors.auf-gelb}"
    rounded: "{rounded.rund}"
    padding: "1rem 1.125rem"
  sticker-fehler:
    backgroundColor: "{colors.weiss}"
    textColor: "{colors.fehlerrot}"
    rounded: "{rounded.rund}"
    padding: "0.875rem 1rem"
---

# Design System: Echt oder Fake? – Der Post-Check

## Overview

**Creative North Star: "Die Story, die sich selbst prüft"**

Der Check spricht die Sprache der Posts, die er prüft. Er ist eine Story aus zwölf Ansichten auf randloser Vollfarbe: Start und Teil A (Prüfpunkte 1–7) auf tiefem Violett, Teil B (8–12) auf Magenta, das Ergebnis auf Tinte. Es gibt keine Karten und keinen Grund dahinter: Die Seite selbst ist die Farbfläche, von Rand zu Rand, auf jedem Gerät. Text steht weiss und fett auf Vollfarbe, wie im Story-Modus «Text auf Farbe». Was der Mensch wissen muss, kommt als gelber Sticker darauf geklebt. Die weisse Quiz-Karte mit blauem Akzent, die diese Welt ersetzt hat, kommt nicht zurück.

Am Handy füllt jede Ansicht den Schirm; die Frage steht gross oben, Antworten und Knöpfe liegen unten im Daumenbereich. Ab 56rem wird die Fläche nicht zum verkleinerten Handy: Der Inhalt teilt sich in zwei Spalten von zusammen höchstens 72rem, die Farbe läuft weiter bis an den Rand. Die Dichte ist niedrig, die Schrift gross, die Flächen satt. Über allem steht der segmentierte Story-Balken: Er zeigt zwölf Segmente in zwei Gruppen (7 + 5), färbt sich mit jeder Antwort und kehrt auf dem Ergebnis vollständig wieder.

Bewegung ist knapp und taktil: Druck beim Tippen, kurzes Einblenden von Stickern, gestaffeltes Erscheinen des Ergebnisses, ein Nadelausschlag des Tachos. Diese Animationen sind eine Markenzusage und bleiben unverändert.

**Key Characteristics:**
- Die ganze Seite ist das Farbfeld: Violett, Magenta, Tinte, randlos.
- Weisser, fetter Text auf Farbe; gelbe Sticker mit Tintentext für Tipps und Warnzeichen.
- Segmentierter Story-Balken als Protokoll der Antworten.
- Weisse Pillenknöpfe mit Text in der Feldfarbe, Antworten als weiche Flächen, Auswahl kippt auf Weiss.
- Eine Schrift: Atkinson Hyperlegible Next, Regular und Bold, selbst gehostet.
- Kein Hell und Dunkel: Die Felder sehen in beiden Modi gleich aus, nur die Tinte wird im Dunkelmodus etwas heller.

## Colors

Drei satte Feldfarben und ein Signalgelb; Weiss ist überall Text- und Knopffarbe, nie Hintergrund der Seite.

### Primary
- **Story-Violett** (violett): Feld von Start und Teil A, Text der weissen Knöpfe und der gewählten Antwort auf diesem Feld, Standardwert von `theme-color`.

### Secondary
- **Story-Magenta** (magenta): Feld von Teil B. Wechselt Teil A zu Teil B, wechselt die ganze Seite die Farbe; alle Elemente darauf erben sie über `--feld`.

### Tertiary
- **Stickergelb** (gelb) mit **Tintenbraun** (auf-gelb): Tipps, Warnzeichen-Liste, auffällige Segmente im Story-Balken, Textauswahl, Fokusring überall, Überschrift des Ergebnisses bei «Vorsicht».

### Neutral
- **Tinte** (tinte; im Dunkelmodus tinte-dunkel): Feld des Ergebnisses. Die einzige Farbe, die der Systemmodus verändert.
- **Weiss-Stufen** auf Farbe: weiss für Text, Knöpfe und gewählte Antworten; weiss-leise für Nebentext, Kontozeile, Teilzeile, Quelle und Fuss; weiss-flaeche für Antwortflächen, Zusatzkasten und Hover zweitrangiger Knöpfe; weiss-flaeche-hover für Hover der Antworten; weiss-spur für leere Segmente, den Rand zweitrangiger Knöpfe, den Rahmen des Merksatzes und die Haarlinien in Liste und Fuss.
- **Fehlerrot** (fehlerrot): nur als Text auf dem weissen Fehler-Sticker.
- **Tachofarben** (tacho-grau, tacho-orange, tacho-rot): nur im Tacho; die Segmente dazwischen mischt `color-mix` aus Orange und Rot.

### Named Rules
**The Kein-Grün-Regel.** Der Tacho zeigt nie Grün und hat kein Ende «echt». Er läuft von Grau (tacho-grau, «keine Warnzeichen») über zehn Segmente von Orange (tacho-orange) zu Rot (tacho-rot). Kein Element der Seite darf Entwarnung in Grün ausdrücken.

**The Feld-erbt-Regel.** Jede Ansicht setzt ihre Farbe einmal als Feld (`--feld` auf `body`, gewählt über `body:has(...)`); Seitengrund, `theme-color`, Knopftext, gewählte Antwort und Radiopunkt übernehmen genau diese Farbe. Teil B wird nie violett gemischt.

**The Gelb-heisst-Achtung-Regel.** Gelb ist reserviert für Warnzeichen, Tipps und Fokus. Es dekoriert nichts.

## Typography

**Display Font:** Atkinson Hyperlegible Next (mit system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible Next (mit system-ui, sans-serif)

**Character:** Eine einzige, auf Lesbarkeit gebaute Grotesk in zwei Schnitten. Grösse und Gewicht tragen die Hierarchie; enge Laufweite nur bei den grossen Graden.

### Hierarchy
- **Display** (700, clamp 2.75–3.75rem, ab 56rem clamp 3.75–6rem, 0.98): Titel auf der Startansicht, das Cover.
- **Nummer** (700, bis 4.5rem bzw. 20vw, ab 56rem 6rem, 0.9, Tabellenziffern): die riesige Prüfpunktnummer, flankiert von «Prüfpunkt» und «von 12» in 1.125rem weiss-leise.
- **Headline** (700, 1.75rem, ab 56rem 2.5rem): Ergebnismeldung.
- **Title** (700, 1.625rem / 1.18, ab 56rem 2.25rem / 1.12): die Frage jedes Prüfpunkts, ausgeglichen umbrochen.
- **Subtitle** (700, 1.25rem): Abschnittstitel auf der Ergebnisseite.
- **Lead** (400, 1.1875rem, 1.45): Einleitung auf der Startansicht.
- **Body** (400, 1rem, 1.5): Fliesstext; Antworten in 1.0625rem fett, Sticker fett.
- **Action** (700, 1.125rem): alle Knöpfe.
- **Label** (700, 0.9375rem): Gruppennamen und Teilzeile am Story-Balken; die Kontozeile (Seitentitel über Prüfpunkt und Ergebnis) in derselben Grösse, Farbe weiss-leise.
- **Small** (400, 0.875rem): Quelle unter dem Prüfpunkt, Fuss.

### Named Rules
**The Eine-Schrift-Regel.** Nur Atkinson Hyperlegible Next, nur Regular (400) und Bold (700), aus `fonts/` im Repo. Keine zweite Familie, keine Zwischenschnitte.

## Layout

Die Farbe füllt immer das ganze Fenster (`body` mit `min-height: 100svh`); nur der Inhalt hat Ränder. Am Handy liegt er 1.25rem bzw. Safe-Area vom Rand, oben mindestens 1rem, unten 1.5rem plus Safe-Area. Ab 56rem wächst der Seitenrand auf `max(3rem, (100vw − 72rem) / 2)`: Der Inhalt ist höchstens 72rem breit, die Farbe läuft bis an den Rand.

**Handy (eine Spalte).** Über Prüfpunkt und Ergebnis steht die Kontozeile. Die Startansicht füllt den Schirm: Titel, beschrifteter Story-Balken 1.75rem darunter, Einleitung, «Check starten» per `margin-top: auto` am unteren Rand. Der Prüfpunkt ist eine Flex-Spalte mit mindestens `100svh − Rand oben − 3rem` Höhe: Story-Balken, Teilzeile, Nummer und Frage oben; die erste Antwort schiebt sich mit `margin-top: auto` nach unten, sodass Antworten, Tipp, Quelle und Knöpfe im Daumenbereich stehen. Das Ergebnis folgt der Reihe Story-Balken, Meldung, Tacho (höchstens 22rem, zentriert), Listen, Merksatz, Knöpfe.

**Ab 56rem (zwei Spalten, 5rem Fuge).** Der Rand oben ist 2rem, die Kontozeile rechnet mit 4rem.
- Start: links der Titel, rechts Story-Balken, Einleitung und Knopf; beide Blöcke vertikal zentriert in einer Zeile von Fensterhöhe, der Fuss darunter über die volle Breite.
- Prüfpunkt: Story-Balken und Teilzeile über die volle Breite. Darunter eine freie Zeile `minmax(0, 0.5fr)`, an deren Unterkante die Nummer steht; so rücken Nummer und Frage ins optische Zentrum. Links Nummer und Frage (2.25rem), rechts Antworten, Tipp, Quelle und Knöpfe.
- Ergebnis: links ein mitlaufender Block (`position: sticky`, 2rem von oben) mit Story-Balken, Meldung (2.5rem) und Tacho, linksbündig; rechts Warnzeichen, «nicht prüfbar», Merksatz und Knöpfe.

Rhythmus: 0.5rem zwischen Antworten und Segmentgruppen, 0.75rem für Nebenabstände, 1–1.25rem zwischen Blöcken, 2–2.25rem vor Abschnitten der Ergebnisseite, 3rem vor dem Fuss und über Nummer und Meldung am Desktop. Weiter und Zurück stehen nebeneinander im Verhältnis 2 : 1 und umbrechen, wenn der Platz fehlt. Alle Zielflächen sind mindestens 3.5rem hoch.

Der Story-Balken teilt sich in Gruppen 7 : 5 mit 0.5rem Fuge; Segmente stehen mit 0.1875rem Abstand. Auf Teil B rückt die Teilzeile unter die zweite Gruppe.

## Elevation & Depth

Die Welt ist flach in Farbe. Es gibt keine Flächen, die sich vom Grund abheben, weil es keinen Grund gibt; nur was auf der Farbe klebt, hebt sich leicht ab. Der einzige Schatten ist weich, nach unten versetzt und mit negativem Spread, nie hart.

### Shadow Vocabulary
- **Stickerschatten** (`box-shadow: 0 0.375rem 1rem -0.5rem rgb(10 6 30 / 0.45)`): Tipp, Fehler, gewählte Antwort, Warnzeichen-Einträge.

### Named Rules
**The Sticker-klebt-Regel.** Nur was auf der Farbe «klebt» (Sticker, gewählte Antwort) trägt den Stickerschatten. Ruhende Flächen bleiben flach.

## Shapes

Weiche, grosszügige Rundungen ohne Ecken, aber keine gerundete Hülle: Das Feld selbst ist rechteckig und randlos. Antworten, Sticker, Zusatzkasten und Merksatz 1rem (rund), Knöpfe und Segmente als Pillen (999px). Radiopunkte sind Kreise mit 2px weissem Ring; gewählt füllt sie Weiss mit einem dicken Ring in der Feldfarbe. «Nicht prüfbar» ist überall dieselbe Form: diagonale Streifen in 2px-Teilung.

## Components

### Buttons
Weisse Pillen, die beim Druck nachgeben. Es gibt nur noch eine Sorte, weil es nur noch Farbe als Grund gibt.
- **Shape:** Pille (999px), volle Breite, mindestens 3.5rem hoch, 2px Rand.
- **Hauptknopf:** Weiss mit Text in der Feldfarbe (Violett, Magenta oder Tinte), Rand Weiss.
- **Zweitrangig:** transparent mit weissem Text und Rand weiss-spur.
- **Hover (nur Maus):** Hauptknopf mischt 14 % Feldfarbe ins Weiss; zweitrangig erhält Fläche weiss-flaeche und weissen Rand.
- **Druck:** `scale(0.97)` über 160ms mit ease-out `cubic-bezier(0.23, 1, 0.32, 1)`. Unverändert.
- **Fokus:** 3px Ring in Gelb, 3px Abstand.

### Antworten
- **Ruhe:** Fläche weiss-flaeche, 1rem Rundung, weisser fetter Text, Kreis links.
- **Gewählt:** Fläche kippt auf Weiss, Text in Feldfarbe, Stickerschatten.
- **Druck:** `scale(0.98)` über 160ms. Unverändert.
- **Fokus:** Ring um die ganze Antwort, nicht um den Kreis.

### Sticker (Tipp, Fehler)
- **Tipp:** Gelb mit Tintentext, fett, Stickerschatten; erscheint, sobald «auffällig» gewählt ist.
- **Fehler:** Weiss mit Fehlerrot.
- **Einblenden:** per `@starting-style` aus Deckkraft 0 und −0.25rem über 200ms. Unverändert.

### Ansichten
- **Start:** Violett, Cover mit Titel, beschriftetem Story-Balken, Einleitung, Knopf.
- **Prüfpunkt:** Violett (Teil A) oder Magenta (Teil B), randlos. Sieht in beiden Systemmodi gleich aus.
- **Ergebnis:** Tinte mit Story-Balken, Meldung und Tacho. Danach gestaffelt: Warnzeichen als gelbe Sticker, «nicht prüfbar» als Liste mit Streifenmarke und Haarlinien, Merksatz im Rahmen weiss-spur. Abschnitte blenden mit 300ms und 120ms Verzögerung von +0.5rem ein. Unverändert.
- **Browserleiste:** `theme-color` folgt bei jedem Ansichtswechsel der berechneten Hintergrundfarbe von `body` (`zeige()` in `js/ablauf.js`), sodass Leiste und Feld eine Fläche bilden.

### Story-Balken (Signatur)
Zwölf Pillensegmente in zwei Gruppen (7 + 5), für Screenreader ausgeblendet; ein verstecktes `progress` trägt den Fortschritt. Offen: weiss-spur; aktuell: Weiss und höher (0.5rem statt 0.3125rem); unauffällig: weiss-leise; auffällig: Gelb; nicht prüfbar: weiss gestreift. Jede Antwort färbt ihr Segment sofort. Auf der Startansicht beschriftet und etwas dicker (0.625rem), auf dem Ergebnis vollständig wiederholt.

### Tacho
Halbkreis-SVG, für Screenreader ausgeblendet; die Textmeldung ist massgebend. Erstes Drittel Grau, dann zehn Segmente Orange bis Rot. Die Nadel schlägt über 900ms mit ease-out aus. Unverändert.

## Do's and Don'ts

### Do:
- **Do** setze jede Ansicht randlos als Vollfarbe: Start und Teil A Violett, Teil B Magenta, Ergebnis Tinte; Text darauf Weiss.
- **Do** nutze Gelb mit Tintentext für alles, was Achtung heisst: Tipps, Warnzeichen, auffällige Segmente.
- **Do** halte jede Zielfläche mindestens 3.5rem hoch und am Handy Antworten und Knöpfe im unteren Schirmdrittel.
- **Do** teile ab 56rem in zwei Spalten mit 5rem Fuge und höchstens 72rem Inhaltsbreite; die Farbe läuft bis an den Rand.
- **Do** lass jede Antwort ihr Segment im Story-Balken sofort färben und wiederhole den Balken auf dem Ergebnis.
- **Do** behalte die Animationen exakt: Druck 0.97/0.98 über 160ms, Sticker 200ms, Ergebnis 300ms mit 120ms Verzögerung, Nadel 900ms, alles mit `cubic-bezier(0.23, 1, 0.32, 1)`; bei «reduzierte Bewegung» keine Übergänge und keine Animationen.
- **Do** prüfe Kontraste in beiden Systemmodi auf WCAG AA und zeige Fokus als 3px-Ring in Gelb.

### Don't:
- **Don't** verwende Grün oder ein Ende «echt» im Tacho oder anderswo als Entwarnung.
- **Don't** kehre zur weissen Quiz-Karte mit blauem Akzent zurück.
- **Don't** setze die Farbe als Karte auf einen hellen oder dunklen Grund; die Seite ist das Feld.
- **Don't** lade Schriften oder andere Dateien von aussen oder füge eine zweite Schriftfamilie hinzu.
- **Don't** färbe Elemente auf Teil B violett; alles erbt das Feld.
- **Don't** verwende harte, unverwischte Schatten; Tiefe ist nur der weiche Stickerschatten.
- **Don't** nutze Gelb als Dekoration.
