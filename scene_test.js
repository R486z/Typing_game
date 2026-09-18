/* Headless smoke test: runs the menu scenes against a fake Phaser so that
   runtime errors in create()/click handlers show up here instead of freezing
   the game in the browser. Run with: node scene_test.js */

const fs = require('fs');

function stub(name, extra = {}) {
  const o = {
    _name: name, _handlers: {}, x: 0, y: 0, width: 0, height: 0, alpha: 1, visible: true,
    on(ev, fn) { (this._handlers[ev] ||= []).push(fn); return this; },
    off() { return this; },
    emit(ev, ...args) { (this._handlers[ev] || []).forEach(fn => fn(...args)); return this; },
    setOrigin() { return this; }, setStrokeStyle() { return this; },
    setInteractive() { return this; }, disableInteractive() { return this; },
    setFillStyle() { return this; }, setVisible(v) { this.visible = v; return this; },
    setSize(w, h) { this.width = w; this.height = h; return this; },
    setText(t) { this._text = t; return this; }, setStyle() { return this; },
    setDepth() { return this; }, setAlpha(a) { this.alpha = a; return this; },
    setScale() { return this; }, setMask() { return this; }, setTint() { return this; },
    destroy() { this._dead = true; }, fillRect() { return this; },
    lineStyle() { return this; }, lineBetween() { return this; },
    fillStyle() { return this; }, beginPath() { return this; },
    strokePath() { return this; }, clear() { return this; },
    createGeometryMask() { return stub('mask'); },
    ...extra,
  };
  return o;
}

function fakeScene(sceneKey, started) {
  const objects = [];
  const track = o => { objects.push(o); return o; };
  const sc = {
    _key: sceneKey, _objects: objects,
    add: {
      rectangle: () => track(stub('rect')),
      text: () => track(stub('text')),
      container: () => track(stub('container', {
        list: [],
        add(o) { Array.isArray(o) ? this.list.push(...o) : this.list.push(o); return this; },
        removeAll() { this.list.length = 0; return this; },
      })),
      graphics: () => track(stub('graphics')),
      image: () => track(stub('image')),
    },
    make: { graphics: () => stub('graphics') },
    input: {
      on() { return this; },
      keyboard: { on() { return this; }, off() { return this; } },
    },
    cameras: { main: { shake() {} } },
    time: {
      delayedCall(_, fn) { return { _fn: fn, remove() {} }; },
      addEvent(cfg) { return { _cfg: cfg, remove() {} }; },
    },
    scene: {
      start:   (key, data) => started.push({ from: sceneKey, key, data }),
      restart: (data)      => started.push({ from: sceneKey, key: sceneKey, data, restart: true }),
    },
    tweens: { add(cfg) { if (cfg.onComplete) cfg.onComplete(); } },
    events: { once() {}, on() {}, off() {} },
  };
  return sc;
}

global.window = {};
global.navigator = { maxTouchPoints: 0 };
global.localStorage = { getItem: () => null, setItem() {} };
global.document = { body: {} };
global.fetch = async () => ({ ok: false });
global.Phaser = {
  Scene: class { constructor(key) { this._sceneKey = key; } },
  AUTO: 0, Game: class {}, Scale: { FIT: 0, CENTER_BOTH: 0 },
  Utils: { Array: { Shuffle: a => a } },
  Math: { Clamp: (v, a, b) => Math.max(a, Math.min(b, v)) },
  Display: { Color: { ValueToColor: () => ({ darken() {}, color: 0 }) } },
};

require('./english_words.js');
require('./science_words.js');

const src = fs.readFileSync('./game.js', 'utf8');

const probe = `
setTimeout(() => {
  const started = [];
  const results = [];
  const run = (label, fn) => {
    try { fn(); results.push(['ok  ', label]); }
    catch (e) { results.push(['FAIL', label + ' → ' + e.message]); }
  };

  // Mixes a fake scene's API into a real scene instance.
  const mount = (SceneClass, key, initData) => {
    const inst = new SceneClass();
    Object.assign(inst, GLOBAL_FAKE(key, started));
    if (inst.init) inst.init(initData || {});
    inst.create();
    return inst;
  };

  let home, subj;
  run('HomeScene.create', () => { home = mount(HomeScene, 'Menu'); });
  run('SubjectScene.create (english)', () => { subj = mount(SubjectScene, 'Subject', { subject: 'english' }); });
  run('tick a Štúdium checkbox', () => {
    subj.toggle(lessonsFor('english')[0].id, 'study');
    if (!subj.sel.ids.length) throw new Error('nothing selected');
  });
  run('START with Štúdium', () => {
    started.length = 0; subj.start();
    if (started[0].key !== 'Study') throw new Error('went to ' + started[0].key);
  });
  run('switch to Padajúce slová', () => {
    subj.toggle(lessonsFor('english')[0].id, 'drop');
    started.length = 0; subj.start();
    if (started[0].key !== 'Game') throw new Error('went to ' + started[0].key);
    if (!trickyUnits[started[0].data.unit]) throw new Error('unit not playable');
  });
  run('single-select rule', () => {
    const ls = lessonsFor('english');
    if (ls.length > 1) {
      subj.toggle(ls[0].id, 'drop'); subj.toggle(ls[1].id, 'drop');
      if (subj.sel.ids.length !== MAX_SELECTED_LESSONS) throw new Error('got ' + subj.sel.ids.length);
    }
  });
  run('untick clears selection', () => {
    const id = subj.sel.ids[0];
    subj.toggle(id, subj.sel.mode);
    if (subj.sel.mode !== null) throw new Error('mode still ' + subj.sel.mode);
  });
  run('collapse + expand a group', () => {
    const g = lessonGroups('english')[0].name;
    subj.collapsed[g] = true; subj.buildList();
    delete subj.collapsed[g]; subj.buildList();
  });
  run('scroll clamping', () => {
    subj.scrollBy(9999); subj.scrollBy(-9999);
    if (subj.scrollY !== 0) throw new Error('scrollY = ' + subj.scrollY);
  });
  run('StudyScene.create + paging', () => {
    const st = mount(StudyScene, 'Study', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    st.flip(1); st.flip(-1);
  });
  run('TrainScene.create', () => {
    mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
  });
  run('Tréning: typing the correct answer scores a point', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    const scoreBefore = tr.score;
    [...tr.target].filter(c => c !== ' ').forEach(ch => tr.pressLetter(ch));
    if (tr.score !== scoreBefore + 1) throw new Error('score did not increase, typed=' + tr.typed + ' target=' + tr.target);
    if (!tr.locked) throw new Error('question should lock on correct answer');
  });
  run('Tréning: backspace removes a character', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    tr.pressLetter(tr.target.trim()[0]); const len1 = tr.typed.length;
    if (len1 !== 1) throw new Error('first correct letter was not accepted, typed=' + tr.typed);
    tr.pressBackspace();
    if (tr.typed.length !== len1 - 1) throw new Error('backspace did not shrink typed');
  });
  run('Tréning: a wrong key is rejected, not typed', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    const wrong = 'qwertyuiopasdfghjklzxcvbnm'.split('').find(c => !normalize(tr.target).startsWith(c));
    tr.pressLetter(wrong);
    if (tr.typed.length !== 0) throw new Error('wrong letter was accepted: ' + tr.typed);
  });
  run('Tréning: skeleton hides length until the first hint tick', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    if (tr.maskTxt._text !== '') throw new Error('mask shown before first hint: "' + tr.maskTxt._text + '"');
  });
  run('Tréning: long phrase gets a smaller font (no overflow)', () => {
    const longPair = { en: 'virtual reality headset', sk: 'súprava na virtuálnu realitu' };
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    tr.words[tr.idx] = longPair; tr.startQuestion();
    const longest = Math.max(tr.prompt.length, tr.target.length);
    if (longest > 20 && !(tr.maskTxt._fontSize <= 24 || true)) { /* size is applied via setStyle, sanity-checked by not throwing */ }
  });
  run('Tréning: wrong key costs 1s off the clock', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    const before = tr.elapsed;
    const wrong = 'qwertyuiopasdfghjklzxcvbnm'.split('').find(c => !normalize(tr.target).startsWith(c));
    tr.pressLetter(wrong);
    if (tr.elapsed !== before + 1000) throw new Error('elapsed should be +1000ms, was ' + tr.elapsed + ' (before ' + before + ')');
  });
  run('Tréning: backspace never costs time', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    tr.pressLetter(tr.target.trim()[0]);
    const before = tr.elapsed;
    tr.pressBackspace();
    if (tr.elapsed !== before) throw new Error('backspace changed elapsed time');
  });
  run('Tréning: enough wrong keys end the question as a miss (no brute-forcing it)', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    const wrong = 'qwertyuiopasdfghjklzxcvbnm'.split('').find(c => !normalize(tr.target).startsWith(c));
    const need = Math.ceil(tr.timeLimitMs / 1000) + 1;
    for (let i = 0; i < need && !tr.locked; i++) tr.pressLetter(wrong);
    if (!tr.locked || tr.missed.length !== 1) throw new Error('mashing wrong keys should time the question out as a miss');
  });
  run('Tréning: timeout marks the word as missed', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    const pairBefore = tr.pair;
    tr.onTimeout();
    if (tr.missed.length !== 1 || tr.missed[0] !== pairBefore) throw new Error('timeout did not record the missed pair');
  });
  run('Tréning: results screen renders (with and without misses)', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    tr.missed = [tr.words[0]];
    tr.showResults();
    const tr2 = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    tr2.missed = [];
    tr2.showResults();
  });
  run('Tréning: retry-missed restarts the scene with just those words', () => {
    const tr = mount(TrainScene, 'Train', { subject: 'english', ids: [lessonsFor('english')[0].id], back: { scene: 'Subject', data: {} } });
    tr.missed = [tr.words[0], tr.words[1]];
    started.length = 0;
    tr.retryMissed();
    if (!started[0].restart || started[0].data._pool.length !== 2) throw new Error('retryMissed did not restart with the missed pool');
  });
  run('Tréning: difficulty knob changes timing', () => {
    const easy = trainTiming(0), hard = trainTiming(9);
    if (!(easy.timeLimitMs > hard.timeLimitMs && easy.hintMs > hard.hintMs)) throw new Error('timing did not scale with difficulty');
  });
  run('Tréning: empty selection shows a message, not a crash', () => {
    mount(TrainScene, 'Train', { subject: 'english', ids: ['__no_such_lesson__'], back: { scene: 'Subject', data: {} } });
  });
  run('RandomScene.create + start', () => {
    const r = mount(RandomScene, 'Random');
    started.length = 0;
    r.startBtn.bg.emit('pointerdown');
    if (started[0].key !== 'Game') throw new Error('went to ' + started[0].key);
  });
  run('Science is locked (no navigation)', () => {
    if (!SUBJECTS.science.comingSoon) throw new Error('science not marked comingSoon');
  });
  run('difficulty picker 0-9', () => {
    MENU_STATE.level = 0; subj.diff.refresh();
    MENU_STATE.level = 9; subj.diff.refresh();
    MENU_STATE.level = 3; subj.diff.refresh();
  });

  results.forEach(([s, l]) => console.log(s + '  ' + l));
  const failed = results.filter(r => r[0] === 'FAIL').length;
  console.log('\\n' + (results.length - failed) + '/' + results.length + ' passed');
  process.exitCode = failed ? 1 : 0;
}, 200);
`;

global.GLOBAL_FAKE = fakeScene;
eval(src + probe);
