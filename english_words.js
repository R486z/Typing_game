// ─────────────────────────────────────────────────────────────────────────────
// Word Drop — English / Tricky words  (LEKCIE)
//
// Každá lekcia = jeden blok { ... } v zozname nižšie.
//
//   id     – krátky jednoznačný kód lekcie (nikdy ho už nemeň, viaže sa naň
//            výsledok v leaderboarde).  Napr. 'en-w13'
//   label  – čo sa zobrazí v menu (po anglicky).  Napr. 'Week 13'
//   topic  – téma po anglicky, zobrazí sa malým pod názvom (môže byť aj '')
//   group  – nadpis skupiny v menu (zbaliteľná sekcia), napr. 'September 2026'
//   words  – slovíčka vo formáte  english|slovensky, jedno na riadok
//
// PRIDANIE NOVEJ LEKCIE:
//   1. Skopíruj celý blok { ... }, vrátane čiarky na konci.
//   2. Vlož ho NA KONIEC zoznamu. Menu ukazuje lekcie v rovnakom poradí ako
//      tento súbor (Unit 0 hore, najnovšia lekcia dole).
//   3. Zmeň id, label, topic, group a napíš slovíčka.
//   4. Ulož a v hre stlač F5.
//
// PRAVIDLÁ PRE SLOVÍČKA (dieťa ich musí vedieť napísať):
//   - Iba písmená a medzery. Čiarka, lomka, pomlčka ani číslice sa napísať
//     nedajú — taký riadok hra preskočí (upozornenie: F12 → Console).
//   - Vysvetlivka v ZÁTVORKE NA KONCI sa zobrazí, ale nepíše sa:
//       boots|čižmy (vysoké topánky)   -> píše sa iba "čižmy"
//     V zátvorke už môže byť čokoľvek (aj čiarka alebo lomka).
//   - Diakritika sa pri písaní nekontroluje ("cizmy" = "čižmy").
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
    topic: 'introductory words',
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

  {
    id:    'en-unit1-p1',
    label: 'Unit 1 – Part 1',
    topic: 'equipment & activities',
    group: 'Unit 1',
    words: `
boots|čižmy (vysoké topánky)
flippers|plutvy
helmet|helma
mask|maska
go caving|ísť do jaskyne
go kayaking|ísť na kajak
go rock climbing|ísť liezť na skaly
go scuba diving|ísť sa potápať (s dýchacím prístrojom)
go snowboarding|ísť snowbordovať
go surfing|ísť surfovať (na doske, bez plachty)
go rafting|ísť raftovať (na divokú vodu)
go sailing|ísť plachtiť (loďka s plachtami)
go mountain biking|ísť na horský bicykel
`,
  },

  {
    id:    'en-unit1-p2',
    label: 'Unit 1 – Part 2',
    topic: 'adventure & rescue',
    group: 'Unit 1',
    words: `
cave|jaskyňa
tunnel|tunel
shelf|skalný výčnelok
trapped|chytený v pasci
adventure|dobrodružstvo
equipment|vybavenie
waterproof|vodeodolný (nepremokavý)
gloves|rukavice
torch|baterka (svetlo)
life jacket|záchranná vesta
wetsuit|neoprénový oblek
knee pads|chrániče na kolená
harness|popruhy (postroj / ochranný pás / sedák)
rope|lano
first aid kit|lekárnička
a rescue|záchrana
rescuers|záchranári
do a skydive|skočiť strmhlav z lietadla (neskôr otvoriť padák)
do a bungee jump|skočiť na pružnom lane
go black water rafting|ísť raftovať v jaskyni
tandem|vo dvojici
accident|nehoda
`,
  },

  {
    id:    'en-unit1-p3',
    label: 'Unit 1 – Part 3',
    topic: 'verbs & adjectives',
    group: 'Unit 1',
    words: `
to explore|preskúmať
to rescue|zachrániť
to protect|ochrániť
to carry|niesť
to compare|porovnať
to escape|uniknúť
to fill|vyplniť
to reach|dosiahnuť
to weigh|vážiť
to cost|stáť peniaze
opinion|názor
exciting|vzrušujúci
fun|zábavný
dangerous|nebezpečný
scary|strašidelný
boring|nudný
calm|pokojný
disappointed|sklamaný
comfortable|pohodlný
upset|rozrušený
`,
  },

  // ── ŠABLÓNA: skopíruj tento blok, odkomentuj a vyplň ──────────────────────
  // {
  //   id:    'en-w1',
  //   label: 'Week 1',
  //   topic: 'travel',
  //   group: 'September 2026',
  //   words: `
  // through|cez
  // island|ostrov
  // enough|dosť
  // `,
  // },

];
