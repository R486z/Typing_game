// ─────────────────────────────────────────────────────────────────────────────
// Word Drop — Science  (LEKCIE)
//
// Presne ten istý formát ako english_words.js:
//
//   id     – krátky jednoznačný kód lekcie (nemeň ho neskôr), napr. 'sci-w3'
//   label  – názov v menu, napr. 'Týždeň 3'
//   topic  – téma (môže byť aj '')
//   group  – zbaliteľná sekcia v menu, napr. 'September 2026'
//   words  – english|slovensky, jedno na riadok
//
// PRIDANIE NOVEJ LEKCIE: skopíruj blok { ... }, vlož na koniec zoznamu,
// vyplň a v hre stlač F5. V kóde hry netreba meniť nič.
//
// Prvá lekcia nižšie je ukážková — kľudne ju prepíš slovíčkami z hodiny.
// ─────────────────────────────────────────────────────────────────────────────
window.SCIENCE_LESSONS = [

  {
    id:    'sci-w1',
    label: 'Týždeň 1',
    topic: 'ukážková lekcia — pokusy',
    group: 'Ukážka',
    words: `
experiment|pokus
to observe|pozorovať
result|výsledok
liquid|kvapalina
solid|pevná látka
gas|plyn
temperature|teplota
to measure|merať
`,
  },

  // ── ŠABLÓNA: skopíruj tento blok, odkomentuj a vyplň ──────────────────────
  // {
  //   id:    'sci-w2',
  //   label: 'Týždeň 2',
  //   topic: 'rastliny',
  //   group: 'September 2026',
  //   words: `
  // root|koreň
  // leaf|list
  // seed|semeno
  // `,
  // },

];
