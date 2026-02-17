# Fundacja im. Jana Czochralskiego — serwis (React) pod GitHub Pages

Statyczna strona WWW zrobiona w **React (Create React App)** z trasami przez **HashRouter** (przyjazne dla GitHub Pages).

Sekcje:
- O nas
- Wydarzenia
- Publikacje (filtrowanie po tagach i latach + podgląd PDF)
- Koło Naukowe Prawa Energetycznego WPiA

## Uruchomienie lokalnie

```bash
npm install
npm start
```

## Build statyczny

```bash
npm run build
```

Wynik trafia do `build/` (gotowe do hostowania jako statyczne pliki).

## GitHub Pages (najprościej)

W repo jest workflow `.github/workflows/pages.yml`, który:
- buduje aplikację po pushu na `main`
- publikuje `build/` jako GitHub Pages

W GitHub ustaw:
- **Settings → Pages → Build and deployment → Source: GitHub Actions**

## Repozytorium publikacji (PDF)

Dane publikacji:
- `public/assets/data/publikacje.json`

Wydarzenia:
- `public/assets/data/wydarzenia.json`

PDF-y publikacji:
- wrzuć pliki do `public/assets/publikacje/`
- w JSON ustaw `pdfUrl`, np. `"/assets/publikacje/raport-2025-rynek-energii.pdf"`


