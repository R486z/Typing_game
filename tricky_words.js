// ─────────────────────────────────────────────────────────────────────────────
// Word Drop – Tricky Words (your custom school vocabulary)
//
// This file now holds several NAMED UNITS instead of one flat list. Each unit
// shows up as its own selectable option in the game's "Tricky Words" menu.
//
// Format per unit:  english|slovensky   (one pair per line, inside backticks)
// Lines starting with # are ignored.
//
// To add a brand-new unit: copy one of the blocks below (including its name
// in quotes and the comma after the closing backtick), rename it, and fill
// in your own words. Then also add it to MENU_TREE in game.txt so it shows
// up in the menu (ask Claude to do this part if you're not sure).
//
// After editing: save the file and reload the game page (F5).
// ─────────────────────────────────────────────────────────────────────────────
window.TRICKY_WORDS = {

  "Unit 0 words": `
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

  // "Nationalities" is NOT defined here — it's loaded separately from
  // nationality.txt (see loadWords() in game.txt). Keeping it in its own
  // .txt file makes it easy to edit without touching this JS file.

};
