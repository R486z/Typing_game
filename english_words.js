// ─────────────────────────────────────────────────────────────────────────────
// Word Drop — English / Tricky words  (LEKCIE)
//
// Každá lekcia = jeden blok { ... } v zozname nižšie.
//
//   id     – krátky jednoznačný kód lekcie (nikdy ho už nemeň, viaže sa naň
//            výsledok v leaderboarde).  Napr. 'en-w13'
//   label  – čo sa zobrazí v menu.  Napr. 'Týždeň 13'
//   topic  – téma, zobrazí sa malým pod názvom (môže byť aj '')
//   group  – nadpis skupiny v menu (zbaliteľná sekcia), napr. 'September 2026'
//   words  – slovíčka vo formáte  english|slovensky, jedno na riadok
//
// PRIDANIE NOVEJ LEKCIE (každý týždeň):
//   1. Skopíruj celý blok { ... }, vrátane čiarky na konci.
//   2. Vlož ho NA KONIEC zoznamu (najnovšie ide dospodu súboru — v menu sa
//      potom zobrazí navrchu).
//   3. Zmeň id, label, topic, group a napíš slovíčka.
//   4. Ulož a v hre stlač F5.
//
// V hre netreba meniť nič — menu sa poskladá samo z tohto súboru.
//
// Pozn.: "Nationalities" tu nie je — má vlastný súbor nationality.txt
//        (formát Country|Nationality) a v menu je v skupine "Témy".
// ─────────────────────────────────────────────────────────────────────────────
window.ENGLISH_LESSONS = [

  {
    id:    'en-unit0',
    label: 'Unit 0',
    topic: 'úvodné slovíčka',
    group: 'Unit 0',
    words: `
to investigate|pátrať
invention|vynález
curious|zvedavý
famous|slávny
region|oblasť
to look for|hľadať
virtual reality headset|súprava na virtuálnu realitu
to chat|písať si
to post a comment|uverejniť komentár
to share a password|zdieľať heslo
to observe|pozorovať
to visit|navštíviť
to travel|cestovať
country|krajina
nationality|národnosť
always|vždy
usually|zvyčajne
often|často
sometimes|niekedy
never|nikdy
`,
  },

  // ── ŠABLÓNA: skopíruj tento blok, odkomentuj a vyplň ──────────────────────
  // {
  //   id:    'en-w1',
  //   label: 'Týždeň 1',
  //   topic: 'cestovanie',
  //   group: 'September 2026',
  //   words: `
  // through|cez
  // island|ostrov
  // enough|dosť
  // `,
  // },

];
