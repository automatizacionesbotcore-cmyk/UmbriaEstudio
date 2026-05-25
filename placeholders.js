// ============================================
// REAL IMAGES — Curated Unsplash photos
// Seeded by content category. Replace this file with client photos when delivered.
// ============================================

const U = (id, w = 1200, h = null) => {
  const sizeQS = h ? `&w=${w}&h=${h}&fit=crop` : `&w=${w}`;
  return `https://images.unsplash.com/photo-${id}?auto=format&q=80${sizeQS}`;
};

// Pools of curated photo IDs per editorial category.
// Each category has 3-5 options that get rotated by seed.
const POOLS = {
  weddingGolden: [
    "1519741497674-611481863552",  // bride+groom golden hour
    "1606216794074-735e91aa2c92",  // couple golden field
    "1511285560929-80b456fea0bc",  // hands rings warm
    "1521577352947-9bb58764b69a",  // wedding moment warm
  ],
  weddingBW: [
    "1583939003579-730e3918a45a",  // B&W bride
    "1519225421980-715cb0215aed",  // B&W couple
    "1606800052052-a08af7148866",  // editorial bride
    "1511285560929-80b456fea0bc",
    "1529636798458-92182e662485",
  ],
  weddingMoody: [
    "1469371670807-013ccf25f16a",  // moody flowers
    "1606490194859-07c18c9f0968",  // moody couple
    "1532712938310-34cb3982ef74",  // wedding details
    "1519741497674-611481863552",
  ],
  prenatal: [
    "1518131672697-613becd4fab5",  // pregnant woman
    "1554342872-034a06541bad",     // prenatal warm
    "1519415943484-9fa1873496d4",  // pregnancy editorial
    "1555252333-9f8e92e65df9",     // maternity portrait
  ],
  smashCake: [
    "1486427944299-d1955d23e34d",  // birthday cake
    "1464349095431-e9a21285b5f3",  // dessert pastel
    "1558636508-e0db3814bd1d",     // party
    "1530103862676-de8c9debad1d",  // cake decorated
  ],
  family: [
    "1511895426328-dc8714191300",  // family lifestyle
    "1609220136736-443140cffec6",  // family warm
    "1545167622-3a6ac756afa4",     // family golden
    "1591084728795-1149f32d9866",  // family portrait
    "1518621736915-f3b1c41bfd00",  // family beach
  ],
  graduation: [
    "1492538368677-f6e0afe31dcc",  // graduates throwing caps
    "1627556704290-2b1f5853ff78",  // graduation
    "1517486430290-35657bdcef51",  // students academic
  ],
  makeup: [
    "1487412947147-5cebf100ffc2",  // makeup brushes
    "1503236823255-94609f598e71",  // bride makeup
    "1522337360788-8b13dee7a37e",  // beauty closeup
    "1457972729786-0411a3b2b626",  // makeup applied
    "1560869713-7d0a29430803",     // beauty
  ],
  audiovisual: [
    "1478737270239-2f02b77fc618",  // microphone studio
    "1598653222000-6b7b7a552625",  // recording studio
    "1593697821252-0c9137d9fc45",  // audio equipment
  ],
  portrait: [
    "1494790108377-be9c29b29330",  // woman portrait warm
    "1438761681033-6461ffad8d80",  // woman editorial
    "1531746020798-e6953c6e8e04",  // woman portrait moody
    "1517841905240-472988babdf9",  // woman portrait clean
    "1488426862026-3ee34a7d66df",  // portrait warm
  ],
  // Couples / parejas — beach, sunset, golden hour. Swap these for Emmanuel & Rosa's real photos.
  parejas: [
    "1516589179581-4d6414d53c02",  // couple embrace outdoors
    "1529516548873-9ce57c8f155e",  // couple at the beach
    "1474552226712-ac0f0961a954",  // couple romantic outdoors golden
    "1519389950473-47ba0277781c",  // couple sunset silhouette
    "1455849318743-b2233052fcff",  // couple walking beach
    "1485808191979-5bde8f974e7e",  // couple silhouette sunset
  ],
};

function pickFromPool(kind, seed) {
  const pool = POOLS[kind] || POOLS.portrait;
  const idx = ((seed || 1) * 7) % pool.length;
  return pool[idx];
}

// Public API — returns a usable URL for CSS background-image or <img src>.
// kind: category name; seed: number to pick variant deterministically.
window.umbriaImg = (kind, seed = 1) => {
  // Magazine covers are portrait 3:4
  const isCover = kind === "weddingBW" || kind === "weddingGolden" || kind === "weddingMoody";
  const id = pickFromPool(kind, seed);
  // For portraits/covers, use a taller crop. For wide heroes, use wider.
  return U(id, 1200, 1500);
};

// Wider crop helper for full-bleed heroes/masonry tiles
window.umbriaImgWide = (kind, seed = 1) => {
  const id = pickFromPool(kind, seed);
  return U(id, 1800, 1200);
};

// Square crop for instagram-style tiles
window.umbriaImgSquare = (kind, seed = 1) => {
  const id = pickFromPool(kind, seed);
  return U(id, 800, 800);
};

// Backwards-compatible placeholder structure (no longer used but kept in case)
window.UMBRIA_PLACEHOLDERS = new Proxy({}, {
  get: (_, kind) => (seed) => window.umbriaImg(kind, seed),
});
