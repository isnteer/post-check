# Echt oder Fake? – Der Post-Check

Statische Webseite, mit der man einen Social-Media-Post in 12 Schritten auf
Warnzeichen für einen Fake prüft. Vertiefungsarbeit von Jérôme Golaz und Nils
Steiner, BBZW Sursee, 2026.

Live: https://isnteer.github.io/post-check/

- Inhalt: [docs/INHALT.md](docs/INHALT.md)
- Entscheide: [docs/ENTSCHEIDE.md](docs/ENTSCHEIDE.md)
- Begriffe: [GLOSSARY.md](GLOSSARY.md)

## Tests

Einmalig `npm install` und `npx playwright install chromium`, danach:

```
npm test
```

Playwright startet einen lokalen Static-Server und spielt den Check auf einem
Handy-Profil (375 px) und einem Desktop-Profil durch.
