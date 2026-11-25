# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Lernende von etwa 15 bis 20 Jahren. Sie öffnen die Seite zuerst an der
Präsentation der Vertiefungsarbeit oder am Plakat über einen QR-Code am Handy
und probieren den Check aus. Danach nutzen sie sie im Alltag als Werkzeug,
wenn ihnen ein verdächtiger Post begegnet. Eine Lehrperson oder Jury bewertet
die Arbeit und schaut sich die Seite dabei ebenfalls an.

## Product Purpose

Man prüft einen Social-Media-Post (Bild und Headline) in 12 Prüfpunkten auf
Warnzeichen für einen Fake und erhält am Schluss ein Ergebnis mit Tipps.
Erfolg heisst: Die Bewertenden erkennen an der Seite die Sorgfalt und Qualität
der Vertiefungsarbeit.

## Positioning

Der Check sagt nie, ein Post sei echt. Er zeigt nur Warnzeichen und das, was
offen bleibt (Zweifel), gestützt auf benannte Quellen (SRF, Interview mit
Stefan Trachsel, Tages-Anzeiger).

## Operating Context

- Am Handy, geöffnet per QR-Code, oft stehend und nebenbei, an der Präsentation
  vielleicht auch im Gespräch mit anderen.
- Ein Check: Startseite, 12 Prüfpunkte in Teil A «Absender und Kontext» (1–7)
  und Teil B «Bild» (8–12), Ergebnisseite mit Tacho.
- Begriffe nach `GLOSSARY.md`, Entscheide nach `docs/ENTSCHEIDE.md`, Wortlaut
  nach `docs/INHALT.md`.

## Capabilities and Constraints

- Reines HTML, CSS und JS ohne Framework und ohne Build-Schritt; läuft auf
  GitHub Pages (`isnteer/post-check`, öffentlich).
- Jede Datei kommt aus dem Repo, auch Schriften. Strenge
  Content-Security-Policy, ohne Tracking und ohne Cookies.
- Deutsch mit Schweizer Rechtschreibung, Anrede «du».
- Ergebnis lautet nur «Keine Warnzeichen gefunden …» oder «Vorsicht …», nie
  «echt». Der Tacho zeigt kein Grün und hat kein Ende «echt».
- Hell und dunkel folgen dem Systemmodus.
- Playwright-Tests in `tests/` prüfen Inhalt, Ablauf, Barrierefreiheit (axe),
  375 px ohne seitliches Scrollen, 200 % Schriftgrösse, Fokus, 44-px-Flächen
  und reduzierte Bewegung.

## Brand Commitments

- Name: «Echt oder Fake? – Der Post-Check».
- Schrift: gut lesbar und selbst gehostet. Atkinson Hyperlegible Next ist die
  bisherige Wahl; eine andere selbst gehostete, gut lesbare Schrift ist
  erlaubt, wenn `docs/ENTSCHEIDE.md` angepasst wird.
- Die bestehenden Animationen (Druckeffekt bei Knöpfen und Antworten,
  Einblenden von Tipp und Fehlermeldung, gestaffelte Ergebnisseite,
  Nadelausschlag des Tachos) bleiben unverändert.

## Evidence on Hand

- Alle Texte: `docs/INHALT.md`.
- Quellen: SRF News (19.09.2025), Interview mit Stefan Trachsel, CH Media
  (11.11.2026), Tages-Anzeiger (25.05.2026).
- Keine Fotos, keine Beispiel-Posts, kein Logo. Nichts davon erfinden.

## Product Principles

1. Ehrlich vor beruhigend: Kein Ergebnis darf wie «echt» wirken.
2. Ein Prüfpunkt nach dem anderen, ohne Ablenkung.
3. Lesbar für alle, auch mit grosser Schrift, Tastatur oder Screenreader.
4. Die Sorgfalt der Arbeit zeigt sich im Detail und in den Quellen.

## Accessibility & Inclusion

Barrierearm als Pflicht: WCAG-AA-Kontraste in hell und dunkel, voll per
Tastatur bedienbar, sichtbarer Fokus, Flächen mindestens 44 px, keine Bewegung
bei «reduzierte Bewegung», Tacho für Screenreader ausgeblendet, Textmeldung
massgebend.
