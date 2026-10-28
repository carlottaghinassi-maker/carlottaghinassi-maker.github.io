// Contenuti del sito. Modifica qui testi, ordine dei progetti e immagini,
// poi lancia `npm run build` per rigenerare le pagine HTML.
// Le chiavi media (es. 'borsa-blu') sono i nomi dei file in assets/media/<slug>/.

const range = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}-${String(i + 1).padStart(2, '0')}`);

const BOOKLETS = [
  ['cappelletti-marilena', 'Cappelletti — Nonna Marilena'],
  ['cappelletti-luciana', 'Cappelletti — Nonna Luciana'],
  ['garganelli-marilena', 'Garganelli — Nonna Marilena'],
  ['lasagne-luciana', 'Lasagne — Nonna Luciana'],
  ['pollo-arrosto-luciana', 'Pollo arrosto — Nonna Luciana'],
  ['coniglio-marilena', 'Coniglio al sugo — Nonna Marilena'],
  ['cotolette-luciana', 'Cotolette — Nonna Luciana'],
  ['rane-marilena', 'Rane — Nonna Marilena'],
  ['torta-di-mele-luciana', 'Torta di mele — Nonna Luciana'],
  ['crostata-luciana', 'Crostata di ciliegie — Nonna Luciana'],
  ['latte-broulet-marilena', 'Latte brûlé — Nonna Marilena'],
  ['crema-marilena', 'La crema — Nonna Marilena'],
];

export const site = {
  brand: 'nodesign',
  name: 'Carlotta Ghinassi',
  description: 'Carlotta Ghinassi — graphic designer. Editoria, packaging, brand identity, lettering.',
  email: 'carlottaghinassi@yahoo.it',
  instagram: 'https://www.instagram.com/carlottaghinassii/',
  instagramBrand: 'https://www.instagram.com/nodesignnn/',
  year: 2026,
  archiveMarquee: 'presentazioni, brief, tavole, ',
  // Crediti del sito, in fondo a ogni pagina.
  credit: { text: 'Made with love — Mik3', handle: '@_mike_elo', url: 'https://www.instagram.com/_mike_elo/' },
};

export const about = {
  // Figura scontornata (PNG trasparente) al centro della schermata About.
  photo: 'figura-3',
  cv: [['cv-ita', 'CV ITA'], ['cv-english', 'CV English']],
  bio: [
    'Carlotta è una graphic designer di Lugo (RA) che lavora tra editoria, packaging, brand identity, lettering e fotografia analogica.',
    'Dopo una laurea in Sociologia all’Università di Bologna si è formata in Graphic Design al NID – Nuovo Istituto Design di Perugia. Parte dalle persone e dalle loro storie per costruire sistemi visivi chiari, riconoscibili e con un tono personale.',
    'Per collaborazioni o richieste scrivi via mail.',
  ],
  sections: [
    {
      label: 'Formazione',
      html: `2024-2026<br>Triennale in Graphic Design<br>NID – Nuovo Istituto Design, Perugia<br><br>
2020-2024<br>Triennale in Sociologia<br>Università di Bologna – Alma Mater Studiorum<br><br>
2015-2020<br>Diploma in Scienze Umane<br>Liceo G. Ricci Curbastro, Lugo`,
    },
    {
      label: 'Esperienze',
      html: `2023<br>She_is_a_scientist, Bologna<br>Internship, 6 mesi – contenuti Instagram<br><br>
Bar Farcito, Cittadella (PD)<br>Linea di t-shirt: 20 illustrazioni e un font<br><br>
RDL – Romagnolo Don’t Lie<br>Locandine, post Instagram e video<br><br>
Rometti Ceramiche<br>Libro del centenario`,
    },
    {
      label: 'Mostre',
      html: `2025<br><i>The Holy Art Gallery,</i> Tokyo`,
    },
    {
      label: 'Corsi',
      html: `Glyphs con Marco Goran Romano<br>Creazione di un font da zero – basi di calligrafia`,
    },
    {
      label: 'Software',
      html: `InDesign<br>Illustrator<br>Photoshop<br>After Effects<br>Figma<br>Glyphs<br>Lightroom<br>Canva<br>CapCut`,
    },
    {
      label: 'Lingue',
      html: `Italiano<br>Inglese B2`,
    },
    {
      label: 'Contatti',
      html: `<a href="mailto:carlottaghinassi@yahoo.it">carlottaghinassi@yahoo.it</a><br>
<a href="https://www.instagram.com/carlottaghinassii/" target="_blank" rel="noopener">@carlottaghinassii</a><br>
<a href="https://www.instagram.com/nodesignnn/" target="_blank" rel="noopener">@nodesignnn</a>`,
    },
  ],
};

// Ogni progetto: introduzione (titolo, testo, copertina) e poi `sections` nell'ordine
// Brief → progetto (PNG) → moodboard → foto/processo. Ogni sezione ha un titolo,
// un testo di spiegazione e le sue gallerie (`cols` = colonne).
// Un elemento 'archivio:tesi-10' prende l'immagine da un'altra cartella.
// `home`: media della slideshow in homepage (se manca assets/media/home/<slug>.png).
// `homeFocus`: punto dell'immagine da tenere al centro nel riquadro della home (object-position).
export const projects = [
  {
    slug: 'te-fini-hai-finito',
    title: 'Te Fini, Tesi',
    category: 'Editoria',
    tags: 'Editoria, Fotografia analogica, Illustrazione',
    year: 2026,
    home: 'booklet-ventaglio',
    cover: '3d-cappelletti-rosa',
    text: [
      '<i>Te Fini Hai Finito</i> è il progetto di tesi al NID: dodici ricette delle nonne, sei di Nonna Marilena e sei di Nonna Luciana, raccolte in una collana di 12 booklet indipendenti divisi tra primi, secondi e dolci, come la scansione di un pranzo tradizionale.',
      'Il lavoro unisce fotografia analogica, editoria e cinema: la cucina diventa un set e i gesti un copione.',
    ],
    sections: [
      {
        label: 'Brief',
        text: [
          'Il punto di partenza è una ricerca fotografica nata al primo anno del NID: una documentazione spontanea della quotidianità delle nonne, nata per avere un loro ricordo su pellicola. Ogni scatto ha poi preso forma in un racconto visivo, in un archivio fotografico analogico e infine in un progetto editoriale strutturato.',
          'Invece di un unico volume, una collana di 12 fascicoli indipendenti: un formato agile e contemporaneo che reinterpreta il classico ricettario. Il linguaggio cinematografico entra nel layout — la preparazione del piatto non è una sequenza tecnica ma una sceneggiatura scritta nel tempo, divisa in V atti visivi e testuali.',
        ],
      },
      {
        label: 'Moodboard',
        text: ['Riferimenti tra editoria indipendente, fanzine, carta colorata e still life domestici: la cucina come set, la carta come superficie da toccare.'],
        galleries: [
          { cols: 2, items: ['moodboard', 'archivio:tesi-10'] },
        ],
      },
      {
        label: 'I 12 booklet',
        text: [
          'Ogni fascicolo si apre con la copertina disegnata al tratto e il titolo in dialetto, prosegue con gli ingredienti, una citazione e i cinque atti della preparazione, e si chiude con «Bôn Aptit / Buon Appetito» e «Te Fini / Hai Finito».',
          'Composti in CairoliClassic; fondi pastello rosa e verde, uno per nonna.',
        ],
        galleries: [
          ...BOOKLETS.map(([key, label]) => ({ label, cols: 6, justify: 15, items: range(`booklet-${key}`, 11) })),
        ],
      },
      {
        label: 'Resa finale',
        text: [
          'Dopo i primi mock-up in A5 e in formati ibridi, il confronto con lo stampatore su costi e limiti di stampa e legatoria ha portato all’A4 slim, l’unico formato in grado di mantenere la verticalità cinematografica, e al punto metallico, ideale per la foliazione ridotta dei singoli volumi.',
          'Gli interni sono su carta avorio uso mano ad alta resa, con i fondi pastello stampati in retinatura.',
        ],
        galleries: [
          { cols: 1, items: ['booklet-ventaglio'] },
          { cols: 2, items: ['spread-cotolette', 'spread-cappelletti-2', 'spread-lasagne', 'spread-crostata', 'spread-cappelletti-1', 'spread-garganelli', 'spread-arrosto', 'spread-coniglio', 'spread-rane', 'spread-latte-broulet', 'spread-crema', 'spread-torta-di-mele'] },
          { cols: 4, items: ['3d-cappelletti-rosa', '3d-cappelletti-verdi', '3d-garganelli', '3d-lasagne', '3d-pollo-arrosto', '3d-coniglio', '3d-cotolette', '3d-rane', '3d-latte-broulet', '3d-crema', '3d-crostata', '3d-torta-di-mele'] },
          { cols: 1, items: ['booklet-serie'] },
          { cols: 1, items: ['covers'] },
        ],
      },
      {
        label: 'Processo',
        text: ['La ricerca fotografica analogica, i disegni al tratto per le copertine — primi, secondi e dolci — e lo studio del carattere tipografico.'],
        galleries: [
          { cols: 1, items: ['ricerca-fotografica-1', 'ricerca-fotografica-2'] },
          { cols: 2, items: ['disegni-copertina', 'tipografia'] },
          { cols: 1, items: ['grazie'] },
        ],
      },
    ],
  },
  {
    slug: 'soglie-thresholds',
    title: 'Soglie / Thresholds',
    category: 'Exhibition',
    tags: 'Exhibition Design, Leporello, Segnaletica',
    year: 2026,
    home: 'allestimento-1',
    cover: 'icona',
    text: [
      '<i>Soglie / Thresholds</i> è un progetto collettivo del corso di Grafica del NID esposto nelle vetrine della Biblioteca degli Arconi: un’indagine sulla soglia come luogo di relazione tra individuo e comunità, tra privato e pubblico, tra interno ed esterno. Sviluppato con Sofia Massetti.',
    ],
    sections: [
      {
        label: 'Brief',
        text: [
          'Gli studenti esplorano la tensione tra spazio personale e spazio condiviso attraverso segni, tracciati e superfici che rendono visibile il passaggio dall’uno all’altro.',
          'La Biblioteca degli Arconi è, per sua natura, una soglia: l’esperienza individuale della lettura convive con una dimensione collettiva di conoscenza, scambio e incontro. Ogni lettore entra come individuo ma partecipa, spesso senza accorgersene, a una comunità temporanea fatta di presenze silenziose, gesti ripetuti, attenzione. La soglia reale delle sue vetrine diventa la metafora visiva e concettuale del progetto.',
        ],
      },
      {
        label: 'Progetto',
        text: [
          'Stabilità / cambiamento — ciò che resta e ciò che si trasforma. La soglia individuata è la resistenza: un corpo non si oppone al cambiamento ma lo attraversa, si piega, si modifica, si rafforza o si deforma, continuando a esistere. E il deperimento, in cui trasformazione e resistenza convivono.',
          'Due alimenti sono stati lasciati all’esterno fino al deperimento totale: una fragola, facile da reperire e veloce a deperire, e un pollo, dal deperimento lento. Il leporello finale traduce il processo in bitmap: i pixel si disgregano fino all’alimento ammuffito.',
        ],
        galleries: [
          { cols: 1, items: ['leporello-fragola'] },
          { cols: 1, items: ['leporello-pollo'] },
          { cols: 2, items: ['fragola-giorni', 'pollo-giorni'] },
          { cols: 2, items: ['icona'] },
        ],
      },
      {
        label: 'Allestimento',
        text: ['Le vetrine della biblioteca, i leporelli e i materiali in consultazione sul tavolo.'],
        galleries: [
          { cols: 2, items: ['vetrina', 'vetrina-esterno'] },
          { cols: 2, items: ['leporello-mano', 'cartello'] },
          { cols: 3, items: ['allestimento-1', 'allestimento-2', 'allestimento-3', 'allestimento-4', 'allestimento-5', 'allestimento-6'] },
        ],
      },
    ],
  },
  {
    slug: 'ovora',
    title: 'OVORA',
    category: 'Packaging',
    tags: 'Brand Identity, Packaging',
    year: 2026,
    home: 'foto-2',
    cover: 'borsa-blu',
    text: [
      'OVORA è un brand di uova pensato per scardinare la percezione tradizionale, spesso istituzionale, del settore avicolo: un’identità fresca, pop e memorabile, con un tono di voce accessibile, genuino e giocoso. Progetto d’esame di Grafica III, sviluppato con Sofia Massetti.',
    ],
    sections: [
      {
        label: 'Brief',
        text: [
          'Scegliere una tipologia di prodotto tra cosmetica, moda, alimentare o oggettistica e analizzarla a partire da almeno due formati fisici differenti: dimensioni, peso, caratteristiche formali e funzionali, brand, posizionamento, target e tono di voce. Poi una brand identity completa e un packaging in almeno due varianti, fino al prototipo e alla sua documentazione fotografica.',
          'Target: consumatori tra i 25 e i 45 anni attenti alla qualità del cibo, alla sostenibilità e all’origine dei prodotti. Posizionamento: un brand premium di uova allevate all’aperto che unisce autenticità e design contemporaneo.',
        ],
      },
      {
        label: 'Moodboard',
        text: ['Mercati, colori pieni e packaging alimentari pop: i riferimenti per un uovo lontano dall’immaginario industriale.'],
        galleries: [
          { cols: 6, items: range('moodboard', 12) },
          { cols: 4, items: range('moodboard', 20).slice(12) },
        ],
      },
      {
        label: 'Identità',
        text: [
          'Il logotipo è composto in Grobold: caratteri spessi e leggermente asimmetrici che trasmettono solidità e nutrimento, curve morbide che lo rendono amichevole e umano. Il contrasto tra il bianco del lettering e il giallo centrale richiama il tuorlo, cuore dell’uovo; l’ovale inclinato ne richiama la silhouette.',
          'Palette blu, giallo, marrone e bianco; Grobold per i titoli, Helvetica Neue per i testi.',
        ],
        galleries: [
          { cols: 2, items: ['logo', 'logo-marrone'] },
          { cols: 3, items: ['simbolo', 'palette', 'font'] },
        ],
      },
      {
        label: 'Packaging',
        text: ['Due linee — uova da allevamento all’aperto (blu) e a terra (marrone) — su confezioni da 6 e da 10 uova e bottiglie di albume da 500 g, con cartellini a forma di uovo e sticker.'],
        galleries: [
          { cols: 4, items: ['fascia-blu', 'fascia-marrone', 'etichetta-6-uova-blu', 'etichetta-6-uova-marrone'] },
          { cols: 2, items: ['etichetta-albume-blu', 'etichetta-albume-marrone'] },
          { cols: 2, items: ['tag-blu', 'tag-marrone'] },
          { cols: 1, items: ['sticker'] },
        ],
      },
      {
        label: 'Prototipo',
        text: ['Il prototipo fotografato: confezioni, bottiglie di albume e borsa porta-uova.'],
        galleries: [
          { cols: 1, items: ['foto-1'] },
          { cols: 2, items: ['foto-2', 'foto-3'] },
          { cols: 2, items: ['borsa-blu', 'borsa-marrone'] },
          { cols: 2, items: ['packaging-aperto', 'packaging-terra'] },
          { cols: 1, items: ['foto-4'] },
        ],
      },
    ],
  },
  {
    slug: 'dolly-noire-stamp',
    title: 'Dolly Noire Stamp',
    category: 'Lettering',
    tags: 'Lettering, Illustrazione, Apparel',
    year: 2026,
    home: 'pattern-2',
    cover: 'stamp-animato',
    text: [
      'Artwork per la linea LOGO PLUS di Dolly Noire: il monogramma DLYNR diventa un conio, ispirato alle monete antiche e ai sigilli di Milano.',
    ],
    sections: [
      {
        label: 'Brief',
        text: [
          'Realizzare un artwork, in tecnica a piacimento, per la linea LOGO PLUS: rielaborazione del logo e creazione di illustrazioni e/o lettering, anche integrati tra loro. Palette ridotta, sintesi grafica e illustrativa; il Duomo di Milano come soggetto principale, panchina e caprone come secondari; le tagline del brand: DLYNR, STAY BRAVE, PARTY HARD, EST. 2013, BORN IN MILANO, SINCE 2004.',
          'Dopo una ricerca su tutti i brand vicini a Dolly Noire, per capire cosa esistesse già sul mercato e come unire il proprio stile a quello del brand, la ricerca su Milano — cosa rappresenta la città, quali sono i suoi simboli storici — ha portato alle monete e ai sigilli usati in passato.',
        ],
      },
      {
        label: 'Moodboard',
        text: ['Monete antiche, sigilli e stemmi: profili, scritte circolari e bordi irregolari da cui nasce la forma del conio.'],
        galleries: [
          { cols: 4, justify: 16, items: ['moodboard-1', 'moodboard-2', 'moodboard-3', 'moodboard-4', 'moodboard-5', 'moodboard-6', 'moodboard-7', 'moodboard-8'] },
        ],
      },
      {
        label: 'Progetto',
        text: ['Circa trenta bozzetti intermedi e diverse revisioni con il professore, sul lettering e sull’impostazione della moneta, fino a un prototipo definitivo in cui tutti i lettering — anche quelli dei numeri — sono coerenti tra loro.'],
        galleries: [
          { cols: 2, items: ['stamp', 'stamp-animato'] },
          { cols: 2, items: ['pattern-1', 'pattern-2'] },
          { cols: 1, items: ['pattern-foto'] },
        ],
      },
      {
        label: 'Apparel',
        text: ['Il conio applicato su t-shirt nere e bianche, fronte e retro.'],
        galleries: [
          { cols: 2, items: ['tee-nera-retro', 'tee-bianca-retro', 'tee-nera-fronte', 'tee-bianca-fronte'] },
        ],
      },
    ],
  },
  {
    slug: 'dolly-noire-pack',
    title: 'Dolly Noire Pack',
    category: 'Illustrazione',
    tags: 'Illustrazione, Lettering, Apparel',
    year: 2026,
    home: 'pack',
    cover: 'pack',
    text: [
      'Seconda proposta per Dolly Noire: una grafica per t-shirt che prende la forma di una scatola fustellata aperta.',
    ],
    sections: [
      {
        label: 'Moodboard',
        text: ['Confezioni d’epoca — bubble gum cigarettes, lamette, aghi, shampoo — con il loro lettering ornato, le alette aperte e i fianchi pieni di testo.'],
        galleries: [
          { cols: 3, justify: 18, items: ['moodboard-1', 'moodboard-2', 'moodboard-3', 'moodboard-4', 'moodboard-5', 'moodboard-6'] },
        ],
      },
      {
        label: 'Prima prova',
        text: ['Il primo bozzetto al tratto della scatola fustellata: lettering, Duomo e tagline già al loro posto, prima di colore e rifinitura.'],
        galleries: [
          { cols: 1, items: ['prova-iniziale'] },
        ],
      },
      {
        label: 'Progetto',
        text: ['Sul pack convivono il Duomo di Milano, il logo DOLLY NOIRE e le tagline del brand, in una palette ridotta di blu, crema e rosso.'],
        galleries: [
          { cols: 1, items: ['pack'] },
        ],
      },
      {
        label: 'Apparel',
        text: ['La scatola stampata su t-shirt blu e bianca.'],
        galleries: [
          { cols: 2, items: ['tee-blu', 'tee-bianca'] },
        ],
      },
    ],
  },
  {
    slug: 'lisola-doro',
    title: 'L’Isola d’Oro',
    category: 'Packaging',
    tags: 'Packaging, Redesign, Illustrazione',
    year: 2025,
    home: 'foto-1',
    cover: 'barattolo',
    text: [
      'L’Isola d’Oro è una storica azienda di Parma che dal 1958 produce conserve ittiche. Il progetto ripensa le etichette della linea di sughi per renderle più contemporanee e far spiccare il prodotto sullo scaffale. Grafica III — Design dell’imballaggio.',
    ],
    sections: [
      {
        label: 'Brief',
        text: [
          'Le etichette di partenza usano un linguaggio visivo superato, in stile cartoon anni ’90, che svaluta la qualità del prodotto. Le fotografie sono piatte e i collage di ingredienti artificiali; l’eccesso di font, bollini e claim crea rumore visivo e impedisce di trovare subito le informazioni importanti. Colori saturi, finiture lucide e grafiche ingenue posizionano il prodotto in una fascia low-cost.',
        ],
        galleries: [
          { cols: 3, items: ['prima-aliciotte', 'prima-seppia', 'prima-vongolotte'] },
        ],
      },
      {
        label: 'Etichette',
        text: [
          'La fotografia lascia il posto all’illustrazione degli ingredienti. Il lettering è semplificato con il FREITAG, che restituisce un’idea di onda e di mare, e il pesce del logo diventa una piccola illustrazione. L’obiettivo non era rendere il prodotto esclusivo, ma ripulirne l’immagine e semplificarne la lettura.',
          'Barattolo alto circa 9,5–10 cm con diametro di 6,5 cm, tappo twist-off da 63 mm, etichetta di 16 × 6 cm. Palette principale blu #1B75BB, bianco e nero; palette secondaria che cambia con gli ingredienti.',
        ],
        galleries: [
          { cols: 1, items: ['etichetta-seppia'] },
          { cols: 1, items: ['etichetta-vongolotte'] },
          { cols: 1, items: ['etichetta-aliciotte'] },
          { cols: 2, items: ['etichetta-vongolotte-piatta', 'etichetta-aliciotte-piatta'] },
          { cols: 3, items: ['logotipo', 'marchio', 'barattolo'] },
        ],
      },
      {
        label: 'Comunicazione',
        text: ['Il lancio del nuovo sugo al nero di seppia sul sito e i biglietti da visita.'],
        galleries: [
          { cols: 1, items: ['computer'] },
          { cols: 3, items: ['biglietti-tavolo', 'biglietto-fronte', 'biglietto-retro'] },
        ],
      },
      {
        label: 'Prototipo',
        text: ['Il barattolo stampato e fotografato.'],
        galleries: [
          { cols: 2, items: ['foto-1', 'foto-2', 'foto-3', 'foto-4'] },
          { cols: 3, items: ['foto-5', 'foto-6', 'tappo'] },
        ],
      },
    ],
  },
  {
    slug: 'farcito',
    title: 'Farcito',
    category: 'Illustrazione',
    tags: 'Illustrazione, Lettering, Apparel',
    year: 2024,
    home: 'foto-1',
    cover: 'tee-01',
    text: [
      'Una linea di 20 t-shirt per il Bar Farcito di Cittadella (PD), promozionali e in vendita al pubblico: un mashup visivo tra il rito della colazione e quello dell’aperitivo, le due anime del locale.',
    ],
    sections: [
      {
        label: 'Brief',
        text: [
          'Raccontare la doppia anima del bar con un linguaggio illustrato contemporaneo, ironico e informale. Illustrazione a mano libera con tratto sketch bianco su fondo nero; campiture piatte e ombreggiature a due toni per la massima resa in stampa.',
          'Supporto t-shirt nera, stampa centrale in serigrafia tessile, monocromatica bianca o bicromatica bianco/grigio. Tiratura limitata: 20 pezzi unici con la stessa grafica e un claim diverso per ognuno.',
        ],
      },
      {
        label: 'Illustrazione',
        text: ['Una fusione surreale degli oggetti iconici dei due momenti: il cornetto servito nella coppa da cocktail, il caffè da asporto, la bottiglia di gin e la sigaretta accesa sul bancone. Dalla bozza ai singoli elementi.'],
        galleries: [
          { cols: 3, items: ['illustrazione', 'cornetto', 'caffe'] },
        ],
      },
      {
        label: 'Le 20 t-shirt',
        text: ['Ogni maglia ha un claim scritto in lettering a mano, tra ironia da bancone, battute sul risveglio, citazioni riadattate e giochi di parole — da «Espresso Yourself» a «Dammi il tempooooo» e «I drink to make other people more interesting» — così ogni pezzo diventa da collezione.'],
        galleries: [
          { cols: 5, items: range('tee', 20) },
        ],
      },
      {
        label: 'Al bar',
        text: ['Le t-shirt indossate dallo staff del Farcito.'],
        galleries: [
          { cols: 3, items: ['foto-1', 'foto-2', 'foto-3'] },
        ],
      },
    ],
  },
  {
    slug: 'fotografia-analogica',
    title: 'Fotografia analogica',
    category: 'Fotografia',
    tags: 'Fotografia analogica',
    home: 'mostra-foto',
    homeFocus: '50% 75%',
    cover: 'mostra-foto',
    text: [
      'Raccolte di fotografie su pellicola: il viaggio in Giappone, la quotidianità delle nonne da cui è nata la tesi, una sperimentazione notturna sull’orto. Uno scatto è stato selezionato ed esposto a Tokyo alla The Holy Art Gallery.',
    ],
    sections: [
      {
        label: 'The Holy Art Gallery, Tokyo',
        year: 2025,
        text: ['Nel 2025 la fotografia dei panni stesi al sole, tra prato e montagne, è stata selezionata per la mostra collettiva della The Holy Art Gallery a Tokyo.'],
        galleries: [
          { cols: 2, items: ['mostra-foto', 'mostra-locandina'] },
          { cols: 2, items: ['mostra-sala', 'mostra-artista'] },
        ],
      },
      {
        label: 'Giappone',
        year: 2025,
        text: ['Strade, mercati, cucine e vagoni della metropolitana: un diario su pellicola, quasi tutto in bianco e nero.'],
        galleries: [
          { cols: 3, ratio: '2/3', items: range('giappone', 15) },
        ],
      },
      {
        label: 'Tesi',
        year: 2025,
        text: ['Le foto usate per <i>Te Fini, Tesi</i>: una documentazione spontanea delle nonne in cucina, nata per avere un loro ricordo su pellicola e diventata poi il cuore del progetto editoriale.'],
        galleries: [
          { cols: 3, justify: 22, items: range('tesi', 17) },
        ],
      },
      {
        label: 'Sperimentazione',
        year: 2025,
        text: ['Le piante di pomodoro di notte, tra flash, cielo al tramonto e sovrapposizioni di colore.'],
        galleries: [
          { cols: 1, items: ['sperimentazione-1'] },
          { cols: 3, items: ['sperimentazione-2', 'sperimentazione-3', 'sperimentazione-4', 'sperimentazione-5', 'sperimentazione-6', 'sperimentazione-7'] },
        ],
      },
    ],
  },
];

export const archive = {
  slug: 'archivio',
  title: 'Archivio',
  galleries: [
    { label: 'Te Fini Hai Finito — presentazione di tesi', cols: 3, items: range('tesi', 26) },
    { label: 'OVORA — presentazione finale, Grafica III', cols: 3, items: range('ovora', 38) },
    { label: 'L’Isola d’Oro — presentazione, Design dell’imballaggio', cols: 3, items: range('isola', 29) },
    { label: 'Brief', cols: 3, items: ['brief-ovora', 'brief-soglie', 'brief-dolly-noire', 'brief-farcito'] },
  ],
};
