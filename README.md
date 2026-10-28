# Portfolio — Carlotta Ghinassi

Sito statico (HTML/CSS/JS, nessuna dipendenza) con la struttura di angelospng.com:
nav fissa a sinistra, lista "Selected works" con anteprime al passaggio del mouse,
slideshow in home, pagine progetto a 3 colonne + gallerie, overlay About/CV, modulo Email, menu mobile.

## Modificare i contenuti

1. Testi, ordine dei progetti, immagini e CV: `content/site.mjs`
2. Rigenera le pagine: `npm run build`
3. Anteprima locale: `npm run dev` → http://localhost:4321

Le immagini sono in `assets/media/<progetto>/`. Per aggiungerne una, mettere il file lì,
aggiungere la voce (nome, `type`, larghezza `w`, altezza `h`) in `assets/media/media.json`
e usare il nome nel progetto dentro `content/site.mjs`.

## Lingue (ITA / ENG)

Italiano in `/`, inglese in `/en/`. I testi italiani sono in `content/site.mjs`,
quelli inglesi in `content/en.mjs` (stesso ordine di progetti e sezioni).
Il selettore ITA / ENG porta alla stessa pagina nell'altra lingua.

## Immagini della home

Ogni progetto usa `assets/media/home/<slug>.png` (es. `ovora.png`) se il file esiste,
altrimenti l'immagine indicata in `home` dentro `content/site.mjs`.
Per cambiarle basta sostituire il PNG con lo stesso nome e rilanciare `npm run build`.

## Struttura

- `index.html` — home (generata)
- `progetti/<slug>/index.html` — pagine progetto (generate)
- `archivio/index.html` — archivio (generato)
- `info/` — reindirizza alla home con About/CV aperto
- `assets/css/style.css`, `assets/js/main.js`

## Pubblicazione

Caricare l'intera cartella su qualsiasi hosting statico (Netlify, Vercel, GitHub Pages).
