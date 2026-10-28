// Versione inglese. Sovrascrive i testi di content/site.mjs; tutto il resto
// (immagini, ordine, gallerie) resta quello della versione italiana.
// Le sezioni dei progetti seguono lo stesso ordine di site.mjs.

const DISHES = {
  'Pollo arrosto': 'Roast chicken',
  'Coniglio al sugo': 'Rabbit stew',
  'Cotolette': 'Breaded cutlets',
  'Rane': 'Frogs',
  'Torta di mele': 'Apple cake',
  'Crostata di ciliegie': 'Cherry tart',
  'La crema': 'Custard',
};

// Etichette delle gallerie (es. "Lasagne — Nonna Luciana").
export function galleryLabel(label) {
  const [dish, who] = label.split(' — ');
  if (!who) return label;
  return `${DISHES[dish] ?? dish} — ${who.replace('Nonna', 'Grandma')}`;
}

export const en = {
  site: {
    description: 'Carlotta Ghinassi — graphic designer. Editorial design, packaging, brand identity, lettering.',
    archiveMarquee: 'presentations, briefs, boards, ',
    contactSubject: 'Hello from your website',
  },

  about: {
    bio: [
      'Carlotta is a graphic designer from Lugo, near Ravenna, working across editorial design, packaging, brand identity, lettering and analogue photography.',
      'After a degree in Sociology at the University of Bologna, she trained in Graphic Design at NID – Nuovo Istituto Design in Perugia. She starts from people and their stories to build visual systems that are clear, recognisable and personal.',
      'For collaborations or enquiries, get in touch by email.',
    ],
    sections: [
      {
        label: 'Education',
        html: `2024-2026<br>BA in Graphic Design<br>NID – Nuovo Istituto Design, Perugia<br><br>
2020-2024<br>BA in Sociology<br>University of Bologna – Alma Mater Studiorum<br><br>
2015-2020<br>High school diploma in Human Sciences<br>Liceo G. Ricci Curbastro, Lugo`,
      },
      {
        label: 'Experience',
        html: `2023<br>She_is_a_scientist, Bologna<br>6-month internship – Instagram content<br><br>
Bar Farcito, Cittadella (PD)<br>T-shirt line: 20 illustrations and a custom typeface<br><br>
RDL – Romagnolo Don’t Lie<br>Posters, Instagram posts and video<br><br>
Rometti Ceramiche<br>Centenary book`,
      },
      { label: 'Exhibitions', html: `2025<br><i>The Holy Art Gallery,</i> Tokyo` },
      { label: 'Courses', html: `Glyphs with Marco Goran Romano<br>Designing a typeface from scratch – calligraphy basics` },
      { label: 'Software', html: `InDesign<br>Illustrator<br>Photoshop<br>After Effects<br>Figma<br>Glyphs<br>Lightroom<br>Canva<br>CapCut` },
      { label: 'Languages', html: `Italian<br>English B2` },
      {
        label: 'Contact',
        html: `<a href="mailto:carlottaghinassi@yahoo.it">carlottaghinassi@yahoo.it</a><br>
<a href="https://www.instagram.com/carlottaghinassii/" target="_blank" rel="noopener">@carlottaghinassii</a><br>
<a href="https://www.instagram.com/nodesignnn/" target="_blank" rel="noopener">@nodesignnn</a>`,
      },
    ],
  },

  projects: {
    'te-fini-hai-finito': {
      category: 'Editorial',
      tags: 'Editorial, Analogue photography, Illustration',
      text: [
        '<i>Te Fini Hai Finito</i> — “you’re done”, in Romagnol dialect — is Carlotta’s thesis project at NID: twelve of her grandmothers’ recipes, six from Grandma Marilena and six from Grandma Luciana, gathered into a series of 12 standalone booklets split into first courses, mains and desserts, following the rhythm of a traditional Italian lunch.',
        'The work brings together analogue photography, publishing and cinema: the kitchen becomes a film set, and every gesture a line in the script.',
      ],
      sections: [
        {
          label: 'Brief',
          text: [
            'It began as a photographic study in her first year at NID: a spontaneous record of her grandmothers’ everyday life, shot simply to keep a memory of them on film. Over time each frame became part of a visual story, then an analogue photo archive, and finally a structured editorial project.',
            'Rather than a single volume, a series of 12 standalone booklets: a nimble, contemporary format that rethinks the classic cookbook. Film language enters the layout — making a dish is not a technical sequence but a screenplay unfolding in time, told in five visual and written acts.',
          ],
        },
        {
          label: 'Moodboard',
          text: ['References from independent publishing, zines, coloured paper and domestic still lifes: the kitchen as a set, paper as something to touch.'],
        },
        {
          label: 'The 12 booklets',
          text: [
            'Each booklet opens with a line-drawn cover and the title in dialect, moves through the ingredients, a quote and the five acts of the recipe, and closes with “Bôn Aptit / Buon Appetito” and “Te Fini / Hai Finito”.',
            'Set in CairoliClassic, on pastel pink and green grounds — one colour for each grandmother.',
          ],
        },
        {
          label: 'Final output',
          text: [
            'After early mock-ups in A5 and hybrid formats, working through costs and the limits of printing and binding with the printer led to a slim A4 — the only format that kept the cinematic verticality — and saddle stitching, ideal for the low page count of each booklet.',
            'The insides are printed on a high-bulk ivory uncoated stock, with the pastel grounds laid down as halftone screens.',
          ],
        },
        {
          label: 'Process',
          text: ['Analogue photo research, line drawings for the covers — first courses, mains and desserts — and the study of the typeface.'],
        },
      ],
    },

    'soglie-thresholds': {
      category: 'Exhibition',
      tags: 'Exhibition design, Leporello, Signage',
      text: [
        '<i>Soglie / Thresholds</i> is a group project by NID’s Graphic Design course, shown in the windows of the Biblioteca degli Arconi: an exploration of the threshold as the place where the individual meets the community — between private and public, inside and outside. Developed with Sofia Massetti.',
      ],
      sections: [
        {
          label: 'Brief',
          text: [
            'Students explored the tension between personal and shared space through marks, paths and surfaces that make the passage from one to the other visible.',
            'The Biblioteca degli Arconi is a threshold by nature: the solitary act of reading sits alongside a shared space of knowledge, exchange and encounter. Every reader walks in alone yet, often without noticing, joins a temporary community of quiet presences, repeated gestures and attention. The library’s real threshold — its windows — became the visual and conceptual metaphor of the project.',
          ],
        },
        {
          label: 'Project',
          text: [
            'Stability / change — what stays and what transforms. The threshold chosen is resistance: a body doesn’t fight change, it goes through it, bending, shifting, strengthening or deforming while it carries on existing. And decay, where transformation and resistance live side by side.',
            'Two foods were left outside until they had completely decayed: a strawberry, easy to find and quick to spoil, and a piece of chicken, slow to break down. The final leporello turns the process into a bitmap: the pixels fall apart until all that is left is mould.',
          ],
        },
        {
          label: 'Installation',
          text: ['The library windows, the leporellos and the reading materials laid out on the table.'],
        },
      ],
    },

    ovora: {
      category: 'Packaging',
      tags: 'Brand identity, Packaging',
      text: [
        'OVORA is an egg brand designed to shake up the traditional, often institutional image of the poultry sector: a fresh, pop, memorable identity with an approachable, genuine and playful tone of voice. Exam project for Graphic Design III, developed with Sofia Massetti.',
      ],
      sections: [
        {
          label: 'Brief',
          text: [
            'Pick a product type — cosmetics, fashion, food or objects — and analyse it through at least two physical formats: size, weight, form and function, brand, positioning, audience and tone of voice. Then build a complete brand identity and packaging in at least two variants, all the way to a prototype and its photographic documentation.',
            'Audience: 25 to 45-year-olds who care about food quality, sustainability and where their food comes from. Positioning: a premium free-range egg brand that pairs authenticity with contemporary design.',
          ],
        },
        {
          label: 'Moodboard',
          text: ['Markets, flat bold colour and pop food packaging: references for an egg brand far from industrial imagery.'],
        },
        {
          label: 'Identity',
          text: [
            'The logotype is set in Grobold: thick, slightly uneven letters that feel solid and nourishing, with soft curves that make it friendly and human. The white lettering against the yellow centre recalls the yolk, the heart of the egg; the tilted oval echoes its shape.',
            'A palette of blue, yellow, brown and white; Grobold for headlines, Helvetica Neue for text.',
          ],
        },
        {
          label: 'Packaging',
          text: ['Two lines — free-range (blue) and barn-laid (brown) — across 6 and 10-egg boxes and 500 g egg-white bottles, with egg-shaped tags and stickers.'],
        },
        {
          label: 'Prototype',
          text: ['The finished prototype on camera: egg boxes, egg-white bottles and the carry bag.'],
        },
      ],
    },

    'lisola-doro': {
      category: 'Packaging',
      tags: 'Packaging, Redesign, Illustration',
      text: [
        'L’Isola d’Oro is a Parma company that has been making preserved fish since 1958. The project redesigns the labels of its pasta sauce range so they feel contemporary and stand out on the shelf. Graphic Design III — Packaging Design.',
      ],
      sections: [
        {
          label: 'Brief',
          text: [
            'The original labels lean on a dated, 90s cartoon style that undersells the product. The photos are flat and the ingredient collages look artificial; too many typefaces, badges and claims create visual noise and bury the key information. Saturated colours, glossy finishes and naïve graphics push the product towards the budget end of the shelf.',
          ],
        },
        {
          label: 'Labels',
          text: [
            'Photography gives way to illustrations of the ingredients. The lettering is simplified with FREITAG, whose shapes suggest waves and the sea, and the fish in the logo becomes a small drawing. The aim wasn’t to make the product exclusive, but to clean up its image and make it easier to read.',
            'A jar about 9.5–10 cm tall and 6.5 cm wide, a 63 mm twist-off lid and a 16 × 6 cm label. The main palette is blue #1B75BB, white and black; a secondary palette changes with the ingredients.',
          ],
        },
        {
          label: 'Communication',
          text: ['Launching the new cuttlefish-ink sauce on the website, plus the business cards.'],
        },
        {
          label: 'Prototype',
          text: ['The printed jar, photographed.'],
        },
      ],
    },

    'dolly-noire-stamp': {
      category: 'Lettering',
      tags: 'Lettering, Illustration, Apparel',
      text: [
        'Artwork for Dolly Noire’s LOGO PLUS line: the DLYNR monogram becomes a coin, inspired by the old coins and seals of Milan.',
      ],
      sections: [
        {
          label: 'Brief',
          text: [
            'Create an artwork, in any technique, for the LOGO PLUS line: rework the logo and create illustrations and/or lettering, possibly combined. A reduced palette and a pared-back graphic style; Milan Cathedral as the main subject, the bench and the goat as secondary ones; and the brand’s taglines: DLYNR, STAY BRAVE, PARTY HARD, EST. 2013, BORN IN MILANO, SINCE 2004.',
            'After mapping every brand close to Dolly Noire — to see what was already out there and how to bring her own style into the brand’s — research into Milan, what the city stands for and its historical symbols, led to the coins and seals of the past.',
          ],
        },
        {
          label: 'Moodboard',
          text: ['Ancient coins, seals and crests: profiles, circular inscriptions and irregular edges that gave the coin its shape.'],
        },
        {
          label: 'Project',
          text: ['Around thirty intermediate sketches and several rounds of feedback with the professor, on the lettering and the layout of the coin, led to a final version where every piece of lettering — numbers included — speaks the same language.'],
        },
        {
          label: 'Apparel',
          text: ['The coin on black and white T-shirts, front and back.'],
        },
      ],
    },

    'dolly-noire-pack': {
      category: 'Illustration',
      tags: 'Illustration, Lettering, Apparel',
      text: [
        'A second proposal for Dolly Noire: a T-shirt graphic shaped like an open, die-cut box.',
      ],
      sections: [
        {
          label: 'Moodboard',
          text: ['Vintage packaging — bubble gum cigarettes, razor blades, needles, shampoo — with ornate lettering, open flaps and sides full of text.'],
        },
        {
          label: 'First draft',
          text: ['The first line sketch of the die-cut box: lettering, Cathedral and taglines already in place, before colour and finishing.'],
        },
        {
          label: 'Project',
          text: ['Milan Cathedral, the DOLLY NOIRE logo and the brand’s taglines share the pack, in a reduced palette of blue, cream and red.'],
        },
        {
          label: 'Apparel',
          text: ['The box printed on a blue and a white T-shirt.'],
        },
      ],
    },

    farcito: {
      category: 'Illustration',
      tags: 'Illustration, Lettering, Apparel',
      text: [
        'A line of 20 T-shirts for Bar Farcito in Cittadella, near Padua — worn by the staff and sold to customers: a visual mashup of the breakfast ritual and the aperitivo ritual, the two sides of the place.',
      ],
      sections: [
        {
          label: 'Brief',
          text: [
            'Tell the bar’s double life through a contemporary, ironic, laid-back illustrated language. Freehand illustration in a white sketchy line on black, with flat fills and two-tone shading so it prints cleanly.',
            'Black T-shirts, centre print, textile screen printing in white or white and grey. A limited run: 20 one-off pieces sharing the same artwork, each with its own slogan.',
          ],
        },
        {
          label: 'Illustration',
          text: ['A surreal blend of the icons of both moments: a croissant served in a cocktail coupe, a takeaway coffee, a bottle of gin and a cigarette burning on the counter. From the rough sketch to the single elements.'],
        },
        {
          label: 'The 20 T-shirts',
          text: ['Each shirt carries a hand-lettered slogan — bar-counter humour, wake-up jokes, twisted quotes and puns, from “Espresso Yourself” to “Dammi il tempooooo” (“give me a minuuuute”) and “I drink to make other people more interesting” — turning every piece into a collectible.'],
        },
        {
          label: 'At the bar',
          text: ['The T-shirts on Farcito’s staff.'],
        },
      ],
    },

    'fotografia-analogica': {
      title: 'Analogue photography',
      category: 'Photography',
      tags: 'Analogue photography',
      text: [
        'Collections of film photographs: a trip to Japan, the everyday life of her grandmothers that sparked her thesis, and a night-time experiment in the vegetable garden. One frame was selected and shown in Tokyo at The Holy Art Gallery.',
      ],
      sections: [
        {
          label: 'The Holy Art Gallery, Tokyo',
          text: ['In 2025 her photograph of laundry drying in the sun, between a meadow and the mountains, was selected for a group show at The Holy Art Gallery in Tokyo.'],
        },
        {
          label: 'Japan',
          text: ['Streets, markets, kitchens and subway cars: a diary on film, almost entirely in black and white.'],
        },
        {
          label: 'Thesis',
          text: ['The photographs behind <i>Te Fini, Tesi</i>: a spontaneous record of her grandmothers in the kitchen, taken to keep a memory of them on film, which became the heart of the editorial project.'],
        },
        {
          label: 'Experiment',
          text: ['Tomato plants at night, caught between flash, sunset skies and layers of colour.'],
        },
      ],
    },
  },

  archive: {
    title: 'Archive',
    labels: [
      'Te Fini Hai Finito — thesis presentation',
      'OVORA — final presentation, Graphic Design III',
      'L’Isola d’Oro — presentation, Packaging Design',
      'Briefs',
    ],
  },
};
