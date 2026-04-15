// Weapon manifest — structured card data for the Armoury.
//
// Each weapon is a flat object. Group them however you want downstream
// by filtering on `ownerId` or `ownerType`.
//
// Schema:
//   id          — stable short id, kebab-case
//   name        — the weapon's poetic name (short, 2-4 words)
//   subtitle    — short descriptive tagline (one line)
//   image       — path under /images/weapons/ (can be empty until locked in)
//   ownerId     — slug of the wielder or sect ("aria", "yuean", "aoli-fen-blaze", etc.)
//   ownerName   — display name of the wielder
//   ownerType   — "fellowship" | "aoli" | "caerndrath" | "solis" | "aurum"
//   category    — free-text tag like "Fire Greatsword" or "Spirit Dagger"
//   labels      — array of { feature, description } — points on the weapon
//   description — prose block describing the weapon as a whole
//   cost        — what the wielder pays to use it (the "trading card stat")
//   style       — one sentence describing the combat style / how it's wielded
//
// Empty string = not yet filled in. Keep the field, just leave the string empty.

export const WEAPONS = [
  // ═══════════════════════════════════════
  // ARIA TYRAMARE
  // ═══════════════════════════════════════
  {
    id: 'aria-crystal-daggers',
    name: 'The Fox-Tail Daggers',
    subtitle: "Twin blades forged from a mother's spirit",
    image: '',
    ownerId: 'aria',
    ownerName: 'Aria Tyramare',
    ownerType: 'fellowship',
    category: 'Spirit Daggers — Pair (Hun Sect Relic)',
    labels: [
      {
        feature: 'Crystal blade',
        description:
          "Forged from a piece of Mínhuì's own spirit — a fragment of the nine-tailed sky fox god's soul torn off and crystallised by her own hand. Transparent, luminous, like solidified moonlight. They do not cut the body first. They cut the soul, and the body simply follows.",
      },
      {
        feature: 'Ribbon tether',
        description:
          "Each dagger is tethered by a fine silver ribbon of wind — Wénjī's element, given as a gift from one fox sister to the other when the daggers were forged. The ribbon lets the blades ride the air. When Aria throws one, it does not fall; it GLIDES. Mínhuì's spirit and Wénjī's wind, the two fox sisters united in one weapon.",
      },
      {
        feature: 'Nine-tail fan',
        description:
          "On activation, the daggers spread outward from Aria in a fan and dance autonomously — spinning, slicing, protecting. They move like fox tails because they ARE fox tails. Watching them in flight is watching a nine-tailed fox's defensive stance rendered in crystal and wind. The number has always been nine, though she carries only two.",
      },
      {
        feature: 'Mother-lock',
        description:
          "The daggers will never strike Aria. Even at the height of a fight, even if she throws them badly, even if an enemy tries to guide them into her body — the blades curve around her without thinking. They were made to protect her instinctively. The way a mother protects.",
      },
      {
        feature: 'The chipped corners',
        description:
          "Close inspection of the hilts shows small chips along the pommels — tiny slivers carved out of the crystal by Aria herself when she was fourteen. She thought the daggers were inert heirlooms and she needed spirit material for the revolver she was building. She took slivers carefully, painfully, the daggers not resisting her because she was theirs. She has six or seven slivers left. Each one she has fired as a Spirit round through The Elemental — and every Spirit shot she has ever fired has been a piece of her mother's soul travelling through both weapons at once. The daggers and the gun are the same relic, split across two forms. She does not know. The daggers are patient.",
      },
      {
        feature: 'Recognition',
        description:
          "Xuěhuā will recognise the daggers as fox-spirit work the first time she sees them. Yuè'àn will feel their divine presence and almost be unable to look at them straight. Mínhuì, across a crowded market in Aurum, has been watching them stay bright for sixteen years — a piece of herself, held safe inside the daughter she could not raise.",
      },
    ],
    description:
      "Left with Aria at the orphanage as a baby by a woman she does not remember. Made from Mínhuì's own spirit — a piece of the nine-tailed sky fox god's soul torn off and forged into crystal, then given ribbon-form by Wénjī's wind. The two fox sisters united in one weapon, placed beside a baby girl who would not know for sixteen years that her mother had given her a piece of her own soul as a cradle-gift. The daggers have kept her alive her whole life in a city that eats children with magic. They guard her when she sleeps. They will come to her hand from across a room. They are the oldest love in her life that she cannot remember receiving.\n\nAnd there is something the cultivators of Aoli will notice before Aria does: the daggers are Mínhuì's gift, but the SLIVERS Aria chipped from them are now loaded as the spirit stone of The Elemental revolver. The daggers and the gun are the SAME RELIC in two forms. The mother's soul flows through both. Every morning when Aria charges the spirit chamber of her gun, the daggers in her boot or her belt hum slightly in sympathy, because a piece of them is being filled with her daughter's Qi across the workshop. She has never noticed. The daggers have.",
    cost: "Paid by Mínhuì, once, sixteen years ago — a piece of her own soul for a child she could not raise. The cost has not ended. Every Spirit round Aria fires is a second tiny offering, unknowingly given, unknowingly received, unknowingly completing a loop between a mother and a daughter who have never been in the same room.",
    style:
      "Fan-blade wind dancing — the daggers leave Aria's hands and fight alongside her, spinning and striking while she moves. Best in open space where the wind can catch them. And linked, through the slivers in her gun, to every round The Elemental fires in the Spirit chamber.",
  },

  {
    id: 'aria-elemental-gun',
    name: 'The Elemental',
    subtitle: 'Five sacred stones, one gun, one hidden truth',
    image:
      '/images/weapons/fellowship/aria/2026-04-15 12_18_46-Greenshot - File Explorer.png',
    ownerId: 'aria',
    ownerName: 'Aria Tyramare',
    ownerType: 'fellowship',
    category: 'Aurum Artimancy — Five-Stone Elemental Revolver',
    labels: [
      {
        feature: 'Five sacred stones',
        description:
          'Set permanently into the frame along the barrel. These are not gems. These are the SACRED STONES of the five true sects of Aoli — each one a piece of a sleeping god. Aria does not know this. She thinks she bought pretty minerals in markets.',
      },
      {
        feature: '🪨 Earth — Green Jade (Yan Sect)',
        description:
          "The stone of Yánlóng the rock dragon. In Aoli, jade is treated as a piece of the sleeping earth god wearing mineral form — not a gem, a living substance that absorbs virtue with use. Aria's jade is the warmest Yan-jade any cultivator has ever touched, because she has been pouring Qi into it every morning for years. The day a Yan disciple picks it up and goes still is the day the Fellowship starts to understand what her gun actually is.",
      },
      {
        feature: '💧 Water — Moonstone (Yun Sect)',
        description:
          "The stone of Yúnshēng the water dragon. Moonstone catches the reflection of the moon in water, which is Yúnshēng's truest face, and every Yun disciple carries one somewhere on their body. The hidden thematic resonance: moonstone is named for the MOON — and Yuèlì, the primordial mother goddess before her corruption, is Moon Beauty. The water sect's sacred stone quietly carries the corrupted mother's true name, and Aria channels water through both goddesses every time she fires.",
      },
      {
        feature: '🔥 Fire — Red Agate (Fen Sect)',
        description:
          'The stone of Fèngzhé the phoenix. Red agate is born in volcanic caves, formed when molten minerals cool slowly in lava bubbles — literally a fire-shaped stone. The five Fen brothers each carry a small red agate. Jìng Huǒ, the eldest, has the oldest one: given to him by the old master just before he disappeared, worn on a cord under his robe for forty years. When Jìng sees the red agate in Aria\u2019s gun, he will recognise it instantly and go very still. She will have no idea why.',
      },
      {
        feature: '💨 Wind — Clear Quartz (Wen Sect)',
        description:
          'The stone of Wénjī the wind fox. Clear quartz is the stone you can see through — matched to wind\u2019s invisible nature — and in Aoli it is treated as the stone of memory and clarity. Every Wen disciple carries a small quartz, often set into their instrument. The first time Xuěhuā sees Aria\u2019s gun, she recognises the clear quartz instantly as Wen Sect work and asks, quietly: "Aria — where did you get that stone?" Aria, puzzled, will say: "I bought it in a market."',
      },
      {
        feature: '👁️ Spirit — Crystal Daggers Slivers (Hun Sect)',
        description:
          "The only focus that is not a mineral. The spirit chamber holds slivers Aria chipped from her own crystal daggers at age fourteen — and the crystal daggers are made from Mínhuì\u2019s own spirit, forged by the nine-tailed sky fox god before placing them beside her daughter. Every time Aria fires a spirit round, she is firing a piece of her mother\u2019s soul through the gun her mother\u2019s daughter built. She does not know the daggers are Mínhuì\u2019s. She only knows the slivers feel sacred and she uses them when nothing else will do.",
      },
      {
        feature: 'The morning charge',
        description:
          "Every morning in her workshop, Aria sits with the gun and charges each stone in turn — holding it, focusing, pouring what she calls 'prepared artimantic energy' into the stones one by one. She thinks this is the skill of an engineer preparing her tools. She is wrong. She is performing a five-sect cultivation ritual she does not recognise as a ritual, pouring her own Qi directly into five sleeping gods through their sacred stones. She has been doing this every morning, alone, since she was twelve.",
      },
      {
        feature: 'Five-way selector',
        description:
          'A small dial behind the hammer picks which stone the next trigger pull draws from. She can cycle through Earth/Water/Fire/Wind/Spirit mid-fight without reloading. A fight with Aria is a fight where the element changes every third beat and nobody else can read the rhythm.',
      },
      {
        feature: 'Five-stone ignition',
        description:
          'When ALL five stones are fully charged, firing them in sequence triggers a single massive elemental burst — the five true sects channelled simultaneously, bound together by the spirit stone (Mínhuì\u2019s soul) into one impossible shot. Aria has managed this exactly ONCE. She still does not know how she did it. The gun remembers, but will not explain.',
      },
      {
        feature: 'No Shi Sect stone',
        description:
          "There is no sixth stone. No chaos. No corruption. Aria\u2019s gun carries the five TRUE sects and nothing of the dark one. She built a shrine to the five unfallen gods of Aoli without knowing it, and excluded the sect of Yuèlì\u2019s corruption without knowing that either. The absence is itself a declaration: she is cosmologically pure of chaos, and her weapon reflects her.",
      },
      {
        feature: 'Dragon-scale grip',
        description:
          'The handle is wrapped in a leather Aria bought from an Aoli trader who could not explain what animal it came from. The trader said only "the scales remember fire." She liked the pattern. She did not know. The grip is fire-dragon hide, and it is the reason the red agate charges faster than the other stones when she holds the gun.',
      },
      {
        feature: "Phineas's mark",
        description:
          "A tiny maker's mark engraved on the underside — Phineas Thatcher's initials next to her own. Aria carved them both the day she finished the first chamber, at the tinker's workbench he had shown her. Nobody else in Aurum knows the mark is there. Nobody else in Aurum knows Phineas Thatcher ever existed.",
      },
    ],
    description:
      "Aria built the revolver herself from Aurum scrap using artimancy principles from Phineas Thatcher's hidden book. She spent years solving the mechanism — finding the right shape for the chambers, the right way to set the stones into the frame, the right sequence for charging them. She thinks the whole weapon is a triumph of her engineering. Every component built with her own hands. Every stone selected from markets she visited herself. Every morning charging ritual designed from first principles. She is certain, with the certainty of a twelve-year-old artimancer who has out-built every adult she has ever met, that she understands exactly how it works.\n\nShe is wrong about the deepest truth. The engineering is real. The mechanism is real. But the gun is not running on artimancy. **It is a reassembled Aoli relic.** She did not know it when she built it, but every one of her five stones is a piece of one of the five true sect gods — Yánlóng in jade, Yúnshēng in moonstone, Fèngzhé in red agate, Wénjī in clear quartz, Mínhuì in the crystal slivers. The gun is a shrine disguised as a weapon. Every morning when she 'prepares her calibration,' she is performing a five-sect ritual she cannot name, pouring her own cultivation Qi from the dantian she does not know she has through five sleeping gods she has never met.\n\nShe is, without knowing, already a cultivator. She has been cultivating every day since she was twelve. She just thinks it is engineering. And when the Fellowship reaches Aoli and the first cultivator who really LOOKS at her gun understands what she has been doing, they are going to weep. Because a girl alone in the sky cities figured out how to connect with five sleeping gods through minerals and willpower, with no teacher, no lineage, no permission, and no idea she was doing it on purpose.",
    cost: "Every charge burns cultivation Qi from the dantian she does not yet know she has. She tires after a long fight the way a cultivator tires, but she thinks she is tired from the engineering. The day she realises what the gun actually runs on is the day her entire understanding of herself breaks open.",
    style:
      "Ranged, precise, unpredictable. She switches elements mid-fight the way a musician switches keys. The hidden cost is a cost she does not yet know she is paying — and the hidden power is a power she does not yet know she has. The stones remember every morning she has held them. The gods inside them are starting to remember her.",
  },

  {
    id: 'aria-xiao-niao',
    name: 'Xiǎo Niǎo',
    subtitle: 'The accidental son, the accidental prophet',
    image: '/images/characters/fellowship/Aria Tyramare.png', // temp — will swap for dedicated bird image
    ownerId: 'aria',
    ownerName: 'Aria Tyramare',
    ownerType: 'fellowship',
    category: 'Living Construct — Companion',
    labels: [
      {
        feature: 'Blue-light eyes',
        description: "The colour of Aria's own spirit shining through metal. Not glass. Not paint. A piece of her soul wearing brass.",
      },
      {
        feature: 'Brass and copper body',
        description: "Built from scrap when Aria was ten, copied from a songbird illustration in a children's book. He should not work. He does. Nobody else can fix him — he repairs himself.",
      },
      {
        feature: 'Two-word vocabulary',
        description: '"Patience, soon." The only thing he has ever said. He whispers it when Aria is sad, when the gremlin is loud, when she is alone in the dark.',
      },
      {
        feature: 'Keeper of small things',
        description: "Xiǎo Niǎo remembers everyone Aria has lost. He is the only other being in Aurum who still knows Phineas Thatcher existed. He is her second memory.",
      },
    ],
    description:
      "Built by Aria at age ten from scrap metal and a picture in a book of a songbird she had never seen because songbirds do not live in Aurum. She poured a piece of her own spirit into him without knowing — a child of Mínhuì's bloodline reaching for the earth below through the only language her city would let her speak. When he opened his eyes for the first time, they were blue — not metal, her colour — and she sighed and tickled his chin and said welcome little bird. He has been with her for half her life. He is her pet, her friend, her family, and her first accidental act of creation.",
    cost: 'A piece of her spirit, given once at age ten. She has not missed it. It is safer inside him than inside her.',
    style:
      'Not a weapon in combat — but the first thing the Fellowship protects before they have finished learning to protect each other.',
  },

  // ═══════════════════════════════════════
  // YUÈ'ÀN — THE SHADOW PRINCE
  // ═══════════════════════════════════════
  {
    id: 'yuean-phoenix-eye-beads',
    name: 'Phoenix Eye Bodhi Beads',
    subtitle: 'Twenty-seven onyx beads that cage a god',
    image:
      '/images/weapons/fellowship/yuean/2026-04-15 12_06_35-Greenshot - File Explorer.png',
    ownerId: 'yuean',
    ownerName: "Yuè'àn",
    ownerType: 'fellowship',
    category: "Leash & Arsenal — 27-Bead Strand",
    labels: [
      {
        feature: 'Onyx bead × 27',
        description:
          'Each bead is carved onyx — matte, black, and heavy. A central taiji (yin-yang) is set at the face of every bead, a portrait of Yuè\u2019àn\u2019s interior landscape: the abyss and the spark inside it. The taiji is wrapped on all sides in a woven cross-hatch pattern — the discipline holding the duality in check.',
      },
      {
        feature: 'Collapsed star within',
        description:
          'When a bead is full of captured shadow, a faint depth opens inside the stone — not a light, a depth, like a tiny star collapsing at the core of the onyx. The fuller the strand, the heavier the beads feel on his wrist. He gauges his shadow-inventory by weight.',
      },
      {
        feature: 'Silken cord',
        description:
          'A black silken cord strung through all twenty-seven beads. Worn on his left wrist. Looks like a monk\u2019s meditation strand at a glance — a scholar\u2019s cultural affectation, quiet and unostentatious. It is not an affectation. It is his leash and his arsenal.',
      },
      {
        feature: 'The mother-mark',
        description:
          'The yin-yang at the centre of every bead is a reminder of what he is — Yuèlì\u2019s son, carrying both her original beauty and her corruption. The mark also appears on his forehead when he uses the darkness — an upside-down crescent moon. The beads and the brow are the same signature in two places.',
      },
    ],
    description:
      "Wǔ Yǐng Zhū (乌影珠) — 'Dark Shadow Beads' — is their inner name, known only to him and the scholar he is trying to become. Every time Yuè'àn conjures darkness, the excess that would grow his shadow gets drawn into the next empty bead on the strand, caching the raw void as refined shadow he can spend later. The closed loop is the reason he has not yet become his mother. The beads are a leash around the wildest part of his inheritance — and they are also the arsenal from which every one of his weapons is drawn. Threads. Daggers. Swords. Cloak. Net. The spear that pierces light. The arrows that pierce anything. All of them live in the twenty-seven beads on his wrist, waiting for him to reach for them.",
    cost: 'A strand full of shadow is a night without sleep. A broken strand is a day of his humanity surrendered.',
    style:
      'Quiet accounting. He does not draw his weapons — he opens a bead and the darkness answers. Every fight is him reading his own wrist like a balance sheet, spending carefully, always within budget.',
  },
]
