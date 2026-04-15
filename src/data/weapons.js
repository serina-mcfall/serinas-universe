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
    image: '',
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
    image: '',
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

  // ─── Yuè'àn's Three One-Word Spells ─────────────
  // Each spell is one syllable. Each must be spoken aloud.
  // Each reveals what he is willing to do for the people he loves.
  // Together they are the three economies of mercy.

  {
    id: 'yuean-spell-hui',
    name: '回  —  Huí',
    subtitle: 'Return — the word for Aria',
    image: '',
    ownerId: 'yuean',
    ownerName: "Yuè'àn",
    ownerType: 'fellowship',
    category: 'One-Word Spell — The Word of Protection',
    labels: [
      {
        feature: 'The casting',
        description:
          "A single finger-form. Yuè'àn's right hand makes a subtle scholar's sign — two fingers extended, the rest folded — and then the word leaves his mouth. The gesture is the key. The word is the turning of the key. No chant, no circle, no ritual; just a man making a small gesture and saying an ordinary syllable.",
      },
      {
        feature: 'The stream — dark-red-almost-black',
        description:
          "The moment the word is spoken, a ribbon of darkness rushes from his right hand toward Aria — a DEEP DARK RED, almost black, like blood drained of its last warmth. The colour of a wedding robe in shadow. The colour of home at dusk. It reaches her body and reverses the distance between them, and she arrives beside him as if she had always been there.",
      },
      {
        feature: 'The syllable',
        description:
          '回 — Huí — "return." Spoken once, out loud, in Wu Huo\'s measured everyday voice. Not shouted. Not whispered. At exactly the level he speaks most sentences, which is what makes it terrifying — the world obeys an ordinary statement.',
      },
      {
        feature: 'What it does',
        description:
          "When Aria is in danger — when a blade is about to fall on her, when a guard has her, when she is about to step off a cliff she did not see — Yuè'àn speaks one word, and Aria is dragged across the space between them and arrives at his side. Not teleported. PULLED. Her body cuts through the air, through crowds, through walls of guards, and arrives slightly breathless, unhurt, delivered the way a letter is delivered to its envelope.",
      },
      {
        feature: 'Why it cannot harm her',
        description:
          "The spell is RETURN, not rescue. His intent is the vehicle, and his intent cannot hurt her. The pull is gentle regardless of distance or obstacles — she arrives intact because the word treats her as if she is made of the same substance as his own will.",
      },
      {
        feature: 'The confession he cannot take back',
        description:
          "He could have chosen many words for protecting her. Shield would have kept her where she was. Save would have been a general plea. He chose — subconsciously, before he knew he loved her — a word that means BELONGS TO. Every time he says Huí, he is declaring to the world, and to his own body, that Aria belongs at his side. The spell is a confession he has been making for as long as he has known her, and one day she will figure it out.",
      },
      {
        feature: 'The only word for her',
        description:
          "He will never use Huí on anyone else. Not a stranger. Not Gēnmù. Not another member of the Fellowship, no matter how much danger they are in. The word is hers alone. The other members of the Fellowship will eventually notice this asymmetry and understand what it means before Aria does.",
      },
    ],
    description:
      "The Word for Aria. The word Yuè'àn reaches for when the thing he is about to lose is her. He has used it more times than he has admitted to anyone — each time afterward sitting very still for a long moment, as if the word costs him something beyond the beads, and maybe it does. He has never been able to unsay it. He has never wanted to unsay it. And every use of Huí tightens the thread that some quiet part of him has been weaving toward her since the day he first saw her.",
    cost: '3–5 beads per use, depending on distance. Wu Huo register, measured voice. The real cost is not in the strand — it is in the confession he makes every time the word leaves his mouth, and in the hope that she will one day hear it for what it is.',
    style:
      "Emergency only. He will not use it to move her when she is safe, only to bring her back when she is not. A fight where Yuè'àn says Huí is a fight that has just pivoted — the enemy does not yet know it, but the geometry of the room has changed.",
  },

  {
    id: 'yuean-spell-wang',
    name: '忘  —  Wàng',
    subtitle: 'Forget — the word for mercy',
    image: '',
    ownerId: 'yuean',
    ownerName: "Yuè'àn",
    ownerType: 'fellowship',
    category: 'One-Word Spell — The Word of Erasure',
    labels: [
      {
        feature: 'The casting',
        description:
          "A single finger-form. His right hand makes the scholar's sign — two fingers extended, the rest folded — and the word leaves his mouth in the same motion. No chant. No circle. Just a man making a small gesture and saying an ordinary syllable. The gesture is the key. The word is the turning of the key.",
      },
      {
        feature: 'The stream — midnight-blue black',
        description:
          "When the word is spoken, a ribbon of darkness drifts from his right hand toward the target — a deep MIDNIGHT BLUE, almost black, the colour you see behind closed eyelids when you are about to fall asleep. The colour of dreamless rest. The colour of a night with no moon. It reaches the witness and settles into them, and the memory is simply gone. The witness does not know they are forgetting. They only know the moment is suddenly finished.",
      },
      {
        feature: 'The syllable',
        description:
          '忘 — Wàng — "forget." Spoken in Wu Huo\'s voice pitched EVEN LOWER than his everyday tone. Almost a sigh. He does not want to say the word. The reluctance is part of the spell — cast with grief, it carries less cruelty than the same mechanism cast with satisfaction.',
      },
      {
        feature: 'What it does',
        description:
          "Erases a specific memory from a witness. Not the whole mind — just the fragment his intent points at. The last ten minutes. The face he did not mean them to see. The witness blinks once, and the thing they were about to report is simply gone. They walk home and cannot remember why they came out.",
      },
      {
        feature: 'Why he hates it',
        description:
          "Forget is the same tool the ruling class of Aurum uses. The same tool the blood-magic fog uses. The same tool that took Phineas Thatcher from the city and the flower girl from the market. Every time Yuè'àn speaks the word, a piece of him knows he is touching the same weapon his enemies use. He is doing a small quiet version of what Aurum does at city scale. He is unmaking memory.",
      },
      {
        feature: 'Why he uses it anyway',
        description:
          'Because the alternative is killing the witness. And the scholar chooses the smaller violence. He would rather take one fragment of a life than take the whole thing. The meditation at the qin afterward is always longer on the nights he has used Wàng — he is cleansing himself of the echo as much as refilling the beads.',
      },
      {
        feature: 'His rules',
        description:
          "Never on a child. Never on someone who has earned the truth. And never — NEVER — on Aria. The day he realises he could not use it on her even if he tried (her divine blood makes her unforgetable, the spell would bounce off her and leave her standing there with her hands on her hips) is the day he understands that Aria is outside his tools entirely. She will always know what he truly is. And she has chosen him anyway, knowing everything.",
      },
    ],
    description:
      "The Word for Mercy. When something has happened that cannot be allowed to be remembered — a guard who saw his face under the mask, a civilian who saw Aria do something magical, a noble who was about to give an order that would doom the wrong people — Yuè'àn speaks one word and the memory goes away. The witness keeps their life. The city keeps its order. The Fellowship keeps its cover. And Yuè'àn carries one more small weight on the pile of things he has done in the same register as his enemies, reluctantly, because the alternative was worse.",
    cost: '2–4 beads per use. Cheaper in beads than Huí because erasure is a smaller-scale operation than transit. But emotionally it is the most expensive of the three — he hates the word in his own mouth, and every use of it asks him a question he does not want to answer: am I becoming the thing I am fighting?',
    style:
      'Last resort, not first. He will always try to avoid being seen in the first place, because not being seen is better than being seen and then erasing the sight. When Wàng leaves his mouth, it means something has gone wrong in his planning, and the scholar is unhappy about it for days afterward.',
  },

  {
    id: 'yuean-spell-zhi',
    name: '执  —  Zhí',
    subtitle: 'Hold — the most powerful word',
    image: '',
    ownerId: 'yuean',
    ownerName: "Yuè'àn",
    ownerType: 'fellowship',
    category: 'One-Word Spell — The Word Against Death',
    labels: [
      {
        feature: 'The casting',
        description:
          "A single finger-form. His right hand makes the scholar's sign — two fingers extended, the rest folded — and he speaks the word. Same gesture as the other two spells. The same small, understated motion that looks at first like a scholar pointing to a line of text. But this time the room knows what is coming before the word arrives. This time the air itself bends toward his throat.",
      },
      {
        feature: 'The stream — dark-purple almost black',
        description:
          "When the word is spoken, a ribbon of darkness flows from his right hand toward whatever he has chosen to hold — a DEEP DARK PURPLE, almost black, the colour of imperial authority, the colour of the Purple Forbidden City in shadow. The stream is heavier than the other two. It does not drift; it COMMANDS. It reaches its target and wraps around it, and reality stops trying to move the thing. The purple is the royalest darkness — the colour of the command reality obeys.",
      },
      {
        feature: 'The syllable',
        description:
          "执 — Zhí — \"hold.\" This is the ONLY word he speaks in the full Zhao Yuan Zhou resonant spell-voice. Low, vibrant, reality-bending. The air distorts around his throat and the syllable IS law. The one time he does not ration his voice. Candles lean toward him. The shadow at his feet goes absolutely still. Even his own darkness pays attention.",
      },
      {
        feature: 'What it does',
        description:
          "Whatever he is pointing his intent at HOLDS. Not forever — long enough. A wound holds shut until a healer arrives. A door holds against an army. A falling body holds in midair. A dying heart holds one more beat, and another, and another. A promise holds even when the person who made it wants to break it. A structure holds against physics itself. For as long as he can pay for it, the thing he is holding cannot slip.",
      },
      {
        feature: 'The bead drain',
        description:
          'Hold is the spell that breaks the strand fastest. It is not a single act — it is a SUSTAINED command. Every heartbeat he holds, the cost keeps draining. A ten-second hold can cost half the strand. A thirty-second hold can empty it entirely. A minute-long hold is beyond what he can do without shattering his beads and taking the backlash into his body. The longer he holds, the closer he gets to losing himself to the flood.',
      },
      {
        feature: 'When the answer is pay anything',
        description:
          "This is the spell he speaks when the only acceptable outcome is MORE TIME. Gēnmù bleeding, no healer close enough. Aria's heart failing. A door that must not open. A dying god that cannot yet die. He will spend every bead he has to buy the seconds that save a life. And when the beads are empty, he will keep speaking the word with his own raw shadow, and he will keep speaking it until his body is empty too, because that is who he chose to become.",
      },
      {
        feature: 'The full-throat register',
        description:
          "Every other act of magic in Yuè'àn's life is him PULLING THE PUNCH — rationing his voice, keeping his shadow contained, spending carefully. Zhí is the one moment he lets his real voice out. It is the only time the Shadow Prince's true sound leaves its cage. Whoever hears it in full register never forgets it. Aria, the first time she hears it, will understand in that one syllable how much he has been holding back every other day of his life.",
      },
    ],
    description:
      "The Most Powerful Word. Reality pushes back against HOLD the way a tide pushes back against a wall, and Yuè'àn has to pay for every second the wall stands. It is the ultimate act of rationing his soul against the clock. It is the most beautiful version of his whole character in one spell — the weapon who refuses to let the person he loves slip out of the world, spending every bead he owns to buy the seconds someone else will need to save them. He will do this for Aria. He will do this for Gēnmù. He would do this, eventually, for any of them. And the day he does it, everyone who witnesses it will finally understand what the Shadow Prince has been for.",
    cost: '10+ beads for short holds; can empty the whole strand for longer ones. Full Zhao Yuan Zhou spell-voice — the one time he does not ration. If the beads run out, the cost comes from his own body, and if the body runs out, the cost comes from whatever he has left to be.',
    style:
      'The answer when the answer is pay anything. He does not speak Zhí to win a fight — he speaks it to buy time for someone else to win it. When he speaks it, the Fellowship has SECONDS to do whatever they came to do, and they had better move.',
  },

  // ═══════════════════════════════════════
  // FEN SECT — THE FIVE BROTHERS
  // ═══════════════════════════════════════
  // Five brothers, five disciplines, five weapons — each forged by
  // the old master himself (Fèngzhé in disguise) in the volcanic
  // forges of the Fen Sect before he vanished. Each weapon was a gift
  // shaped to the boy who would carry it. Each brother has carried
  // his weapon for nearly forty years. None of them will let the
  // weapons be reforged, even when damaged, because the hands that
  // made them are gone.

  {
    id: 'fen-ember-mo-dao-shield',
    name: 'The Long Red Line',
    subtitle: 'Jìng Huǒ — the Mò Dāo and the breathing shield',
    image: '',
    ownerId: 'aoli-fen-ember',
    ownerName: 'Jìng Huǒ — Ember Discipline',
    ownerType: 'aoli',
    category: 'Mò Dāo & Living Shield — Ember Discipline',
    labels: [
      {
        feature: 'The Mò Dāo',
        description:
          "A long straight double-edged blade of folded steel in the Tang Mò Dāo form — the weapon that historically held the line against cavalry in the hands of elite imperial infantry. Forged in volcanic heat, quenched in cooled lava. The blade is deep red-black with a faint ember-glow at the very edge, visible only in full darkness. It does not flash bright. It holds heat — the kind of fire that outlasts anything louder. It is not a duellist's sword. It is a siege weapon one man has decided to carry alone.",
      },
      {
        feature: 'The living shield',
        description:
          "A round heavy shield of MOLTEN LAVA ROCK bound on an iron core — carved from a piece of volcanic stone that had not fully cooled when the old master shaped it, so the stone still carries heat at its core forty years later. It is pitted and scarred from a hundred fights. Jìng refuses to replace it. 'It knows me now,' is all he says. He is not speaking in metaphor.",
      },
      {
        feature: 'The shield breathes',
        description:
          "The shield is aware. Not in words — it does not speak — but in weight and heat and readiness. When Jìng carries it on his left arm it is heavy, grounded, dense — built to take the impact of cavalry. When he slings it onto his back, the shield CHANGES — it becomes lighter, its weight redistributes to cover his spine, and it shifts itself as he moves so that whatever is behind him is always meeting stone. The same shield in two positions, with two weights, two heat-signatures, two postures. A second shield on his back, in the same body.",
      },
      {
        feature: 'Front-and-back mode',
        description:
          "This is how Jìng fights. The shield is on his LEFT ARM during the patience phase — planted, holding, deflecting — and he wields the Mò Dāo ONE-HANDED during this period because his Ember body cultivation has given his right arm the strength to hold it that way for as long as he needs to. The fight can last ten minutes like this with Jìng never moving from his mark. Then the enemy makes the mistake. The enemy overextends, or exhausts themselves, or loses focus for a single heartbeat. Jìng SLINGS the shield onto his back in one fluid motion — the shield rearranges itself to guard his spine — and he takes the Mò Dāo in BOTH HANDS for the decisive strike. Everyone in the Fen Sect compound knows what it means when Jìng Huǒ's shield goes onto his back. It means the fight is about to end.",
      },
      {
        feature: "The old master's care",
        description:
          "The Mò Dāo and the shield were both forged by the old master himself — by Fèngzhé in disguise — in the sect's central forge, the year Jìng turned sixteen. They were a gift marking the day the eldest brother officially became the Ember discipline's lead. The weapons are alive because the old master poured more than metalwork into them. He poured his CARE. He did not give them a voice — Jìng's weapons do not speak — but he gave them awareness, patience, and the same fierce loyalty he gave the boys themselves. Forty years later, the weapons still carry that care. They have been Jìng's partners in silence for longer than most men have been alive. When Zhúhuǒ eventually returns with Fèngzhé's soul inside him and walks into Fen Sect territory, the Mò Dāo and the shield will RECOGNISE their maker before Jìng does — and Jìng will notice the weapons' response a heartbeat before he understands what he is seeing.",
      },
      {
        feature: 'The slow burn',
        description:
          "The Ember cultivator fights by ENDURANCE, not by strike. The fire that never goes out. Jìng will stand in one place for an entire battle and let the enemy tire themselves out against the shield. By the end of a long fight, the Mò Dāo is glowing red because it has been holding his cultivation back for so long that the metal itself remembers its forging temperature. The shield is humming hot against his arm. Both weapons know exactly how long until the moment opens. So does Jìng. They are patient together.",
      },
    ],
    description:
      "The eldest brother's weapons. The Mò Dāo and the living shield that have kept the Fen Sect compound's gate for four decades. Jìng Huǒ has used these two things to hold a line that the old master drew in front of a doorway when he was nineteen years old, and nobody has crossed it since. The Mò Dāo is scarred at the grip and has been resharpened many times, but never reforged — the metal is what the old master made, and Jìng will not let anyone change it. The shield has been humming quietly against his arm for so long that it has worn a permanent faint scorch-mark into his inner forearm where the heat bleeds through. He has never complained. It is the oldest touch in his life.\n\nWhen the Chaos Quintet asks him how he can stand so still for so long in a fight, Jìng says only: 'I am not standing alone.' They do not understand. They are not supposed to yet. The weapons on his arm and in his hand know what he means. They have been holding the line with him since before the youngest quintet members were born.",
    cost: "The slowest price in the sect. Jìng does not burn hot or fast. He burns for decades. His fire is the one that never goes out, which means it never fully flares, which means he has been QUIETLY TIRED for forty years and nobody but his brothers — and his two weapons — has noticed.",
    style:
      'Defensive cultivator. He plants, he holds, he waits, with the shield on his arm and the Mò Dāo one-handed. The enemy fights itself out against the shield. When the moment opens, the shield goes onto his back and the Mò Dāo takes both hands, and the single decisive two-handed strike falls. A fight with Jìng Huǒ is a fight the enemy lost the moment they decided to start it, and it ends the moment his shield changes sides.',
  },

  {
    id: 'fen-spark-twin-blades',
    name: 'The Hidden Bite',
    subtitle: 'Yǐn Huǒ — the blades that watch with him',
    image: '',
    ownerId: 'aoli-fen-spark',
    ownerName: 'Yǐn Huǒ — Spark Discipline',
    ownerType: 'aoli',
    category: 'Twin Short Blades — Spark Discipline',
    labels: [
      {
        feature: 'Twin short blades',
        description:
          "Two short curved blades, each the length of a forearm. Folded steel forged in volcanic heat and quenched in cooled lava. At rest the edges show a deep blood-red where the light catches them — a red that vanishes into shadow and is almost invisible against dark cloth. They are the exact length of the reach Yǐn has measured from his elbow, because the old master measured them against the boy's own arm when Yǐn was fifteen.",
      },
      {
        feature: 'The hidden ignition',
        description:
          "When the blades ignite, the edge flashes to the BLUE-RED you only see in the hottest core of a flame — the colour at the base of a candle wick that most people never notice because the brighter yellow-orange above it steals the eye. The flash lasts less than half a heartbeat. It is just long enough for the strike to pass through any ordinary armour or guard as if it were paper. The colour is the hidden fire inside fire itself. It matches his name. The hottest part of any flame is the part nobody is looking at. So is Yǐn.",
      },
      {
        feature: 'They watch with him',
        description:
          "The blades are aware. Not in words — they do not speak — but in pressure and weight and readiness. When Yǐn is reading a room, the blades are reading it too. They can tell which direction a threat is coming from through the faint change in pressure against his lower back where they ride in their rig. Yǐn never LOOKS at a suspicious sound. He feels the blades' weight shift toward it, and the shift is what turns his head. He has been reading rooms through his own spine for so long that he has forgotten what it was like to read one any other way.",
      },
      {
        feature: 'Commitment, not command',
        description:
          "The ignition is not something Yǐn triggers. It is something the blades do for him the instant before a strike lands, because they read his commitment the way he reads a room. If he draws the blades to intimidate, the edges stay cool. If he draws them as a feint, the edges stay cool. They will ONLY burn for a real strike. They have never once been wrong about the difference. The blades are the patience Yǐn inherited from the old master, made metal.",
      },
      {
        feature: 'The shoulder rig',
        description:
          'Carried in a single rig at the small of his back, completely hidden under his outer robe. Drawn over each shoulder in a single clean motion when he commits to a strike. The blades HELP with the draw — becoming slightly lighter at the moment his hands find the hilts, so that the motion is faster than it has any right to be. The draw is so quiet and so fast that most of his victims never register that he reached for a weapon at all.',
      },
      {
        feature: "The old master's care",
        description:
          "Forged by the old master when Yǐn turned fifteen. Fèngzhé in disguise, working at the forge for a week, talking to the boy about watching versus looking, about reading a fight before it happens, about the strike that happens before the enemy has decided to move. The old master did not pour his voice into the steel. He poured his CARE — patience, attention, the willingness to wait until the right moment. Forty years later, the blades still carry that care. They have been waiting with Yǐn for four decades, and they will still be waiting when he is gone.",
      },
      {
        feature: 'Heavier on the day he vanished',
        description:
          "The morning Yǐn woke up and found the old master's workshop empty, the blades were heavier than they had ever been before. They still are. They have been carrying some of Yǐn's grief for him for forty years. He has never mentioned this to anyone. He has never needed to. The blades know. He knows they know. That is enough.",
      },
      {
        feature: "Gentle with his grandson",
        description:
          "When Yǐn's single grandson — the wary boy of seven or eight who reminds him of himself — is first allowed to hold one of the Hidden Bites, the blade does not ignite. It does not get heavy. It does not even WARM. It simply rests, completely inert and softened, in the child's hands. Yǐn understands in that moment that the blade is being GENTLE with the boy because it recognises the wariness it sees in him. It is being patient. The same way it is patient with Yǐn when Yǐn is wary himself. The blade is teaching the boy something Yǐn has not yet figured out how to put into words — that you do not have to strike the first thing that feels safe.",
      },
      {
        feature: 'The second in silence',
        description:
          "Yǐn rarely speaks in a fight. He does not announce. He does not taunt. He watches, he reads, and he moves. His weapons do the same. The three of them — Yǐn and the two blades — are a single conversation that has been going on quietly for forty years and has never needed a word.",
      },
    ],
    description:
      "The second brother's weapons. The twin blades Yǐn Huǒ has carried for forty years without ever losing either of them. He does not practice drawing them because he never needs to — his hands have known where the hilts live since before he was old enough to shave, and the hilts have known where his hands live for just as long. The blades have been resharpened many times but never reforged. Whatever the old master put into the steel is still there, and Yǐn will not let anyone change it.\n\nThe Spark discipline is the assassin's discipline of the Fen Sect — fast, observant, lethal, gone before the enemy has understood what happened. But the secret of how Yǐn fights is not his speed. It is that he is never fighting alone. The two blades at the small of his back are watching the room with him, feeling the threats with him, reading the commitment with him, and waiting for the same moment he is waiting for. When the moment arrives, Yǐn does not DECIDE to strike. He and the blades simply strike, because all three of them have been waiting for the same thing, and all three of them recognise it at once.\n\nWhen the Chaos Quintet asks him how he learned to strike before the enemy moves, he says only: 'I watched the old master watch me. That was the first lesson. Every lesson after it was the same lesson.' He does not tell them that the blades were watching too. He does not need to. They know.",
    cost: "The spark is fast and cheap in Qi — the Spark discipline's gift — but every ignition leaves a small residue of fatigue in the wielder's dantian. Yǐn fights short battles on purpose. And the blades, loving him, have learned to reserve their ignition for the one strike that will end the fight rather than the three strikes that would have been showy. They are saving him from himself.",
    style:
      'Observe, read, strike once. Yǐn will often go the entire length of a fight having moved only three steps — one to position, one to strike, one to withdraw. The fight is over before most people notice it began. Most people also do not notice the blue-red flash at the edge in the half-heartbeat before the strike lands. It is the last thing they fail to see.',
  },

  {
    id: 'fen-blaze-greatsword',
    name: 'Laughing Inferno',
    subtitle: 'Lè Huǒ — the greatsword that charges in first',
    image: '',
    ownerId: 'aoli-fen-blaze',
    ownerName: 'Lè Huǒ — Blaze Discipline',
    ownerType: 'aoli',
    category: 'Two-Handed Greatsword — Blaze Discipline',
    labels: [
      {
        feature: 'The greatsword',
        description:
          "A massive two-handed greatsword (dadao in form, but larger, heavier, with a straight rather than curved blade). Forged of lava-quenched steel, its surface shows the rippling water-pattern of folded metal. The blade is long enough that most men would use both hands on the hilt; Lè uses one when he feels like showing off and two when the fight actually matters. The pommel is set with a single rough chunk of unpolished red agate — the Fen Sect's sacred stone — and the cord-wrapped grip is worn to the exact curve of Lè's palm.",
      },
      {
        feature: 'The name',
        description:
          "Lè named the sword 'Laughing Inferno' when he was fifteen. He thought it was the best name any weapon had ever had. His brothers all laughed at him. He has refused to rename it for twenty-five years because the boy who named it deserves respect from the man who carries it now. Jìng teases him about the name at least once a month. Lè pretends to be offended. Nobody is fooled.",
      },
      {
        feature: 'The fire trail',
        description:
          "When Lè swings the sword in full cultivation form, the blade trails an arc of fire behind it — the air itself catches briefly from the heat and then goes out. A full overhead swing leaves a curtain of flame hanging in the air for a second before it dissipates. It looks like Lè is painting fire onto the world with the sword's edge, and in a way he is.",
      },
      {
        feature: "The old master's fire",
        description:
          "Forged by the old master when Lè turned fourteen. Lè remembers the day with warmth more than detail (he was the first brother young enough to grow up safe, and safety blurs into a single happy colour in his memory). What he does remember clearly is the old master handing him the sword and saying 'the sword is for the man you are going to be, not the boy you are now. Grow into it.' Lè has been trying to grow into it for twenty-five years. He would say he is still not quite there. His brothers would tell you he has been there for fifteen.",
      },
      {
        feature: 'The Blaze charge',
        description:
          "The Blaze discipline is the front line. Lè Huǒ charges in first, and he charges in LAUGHING. The Blaze cultivator's role in a Fen Sect fight is to be the loudest, brightest, most dangerous thing on the battlefield — to draw the enemy's attention, absorb the first strikes, and open space for the other brothers to do their work. Lè is excellent at this because he is genuinely having fun. The laugh is not bravado. He really IS enjoying the fight. That is what makes him terrifying.",
      },
    ],
    description:
      "The third brother's sword. Lè Huǒ's laughing inferno. Forged when he was fourteen and named when he was fifteen by a teenage boy who had too much fire in his blood and too much joy in his heart. The sword has been swung in every fight Lè has been in for twenty-five years, and it has never missed a swing it meant to land. Lè will bring it to council meetings on days when the council bores him — leaned against his chair, hilt casually at hand — and his brothers roll their eyes but none of them ask him to leave it at the door. When his two adopted sons (the Chaos Quintet's older half, Lè Zhé and Lè Yǔ) train with their own Blaze-discipline greatswords, Lè watches them copy the forms he learned from the old master, and it breaks him quietly inside because he is watching his father's fire pass into his sons' hands through his own, and he does not yet know his father was a god.",
    cost: "Big Qi per swing. Lè tires fast in long fights because every swing of the greatsword is a full expenditure of fire cultivation. He compensates by ending fights fast — hitting hard enough in the first thirty seconds that there is nothing left to hit after that.",
    style:
      'Charge in first, laugh the whole way, swing big, hit once, hit again if you have to. Lè is not subtle. He does not want to be. Subtlety is for his older brothers; the third brother is there to kick the door down.',
  },

  {
    id: 'fen-pyre-chain-scythe',
    name: 'The Threshold Chain',
    subtitle: 'Jiè Huǒ — the scythe that walks between worlds',
    image: '',
    ownerId: 'aoli-fen-pyre',
    ownerName: 'Jiè Huǒ — Pyre Discipline',
    ownerType: 'aoli',
    category: 'Chain Scythe — Pyre Discipline',
    labels: [
      {
        feature: 'The scythe',
        description:
          "A short curved scythe-blade of dark iron, the edge so fine it looks translucent in certain light. The curve is deeper than an ordinary sickle — closer to a crescent moon than a reaper's blade. The metal is pitted along the back from decades of use at funeral rites, each pit a soul Jiè has helped release.",
      },
      {
        feature: 'The chain',
        description:
          "The scythe is attached by a long fine chain — five arm-lengths when fully extended — to a counterweight of folded iron shaped like a closed lotus bud. Jiè can throw the scythe out, let the chain run through his fingers, and recall it with a flick of the wrist. In battle, the chain scythe is a reach weapon that can strike from ten feet away and return before the enemy has finished flinching. In ritual, the chain is the thread of the soul, and the scythe is the cut that frees it from the body.",
      },
      {
        feature: 'Severs the cultivator-element bond',
        description:
          "The Pyre discipline's signature ability: on the battlefield, the chain scythe can sever a cultivator's connection to their cultivated element. A fire cultivator struck by Jiè Huǒ's blade might find that their fire has simply stopped answering for the next hour, or the next day, or forever. Against ordinary mortals the scythe is just a scythe. Against cultivators it is something else: it unmakes the foundation of their power. This is why Shi Sect cultivators particularly fear Jiè.",
      },
      {
        feature: 'The funeral rite',
        description:
          "The same weapon that severs on a battlefield releases at a funeral. When a Fen Sect cultivator dies, Jiè stands over the body with the chain scythe and performs a rite in which the blade touches the chest and the soul is gently cut free from the flesh. The whole sect knows the sound of the chain running through his fingers at a death-bed. They call it 'the quiet cut.' War and peace in the same blade.",
      },
      {
        feature: "The old master's last gift",
        description:
          "Forged by the old master when Jiè turned thirteen. Jiè remembers the old master telling him that the chain scythe was the most dangerous weapon in the sect — not because it killed fast, but because it chose WHAT to cut, and choice was the hardest thing a weapon could do. 'You will be my fourth son, and this sect's keeper of thresholds,' the old master said. 'You will learn when to cut a soul free and when to let it stay. That is a harder thing to learn than anything your brothers will be taught.' Jiè has been learning it ever since.",
      },
    ],
    description:
      "The fourth brother's weapon. The chain scythe Jiè Huǒ has carried for thirty-six years. The Pyre discipline is the most invisible of the five Fen branches — the work happens in rooms nobody else enters, at funerals nobody else attends, in private conversations between a dying brother and the man who will walk him through the threshold. Jiè's weapon is quieter than his brothers' weapons and more dangerous in specific ways none of them are. When the old master disappeared, Jiè went quieter for a while and channelled the grief into becoming the kind of man who would make sure nobody else ever felt invisible. He carries the scythe at his hip in battle, wrapped in a black silk when he is among civilians, and unwrapped when he sits beside the dying. His two young Pyre-discipline sons are being taught to carry their own chain scythes with the same patience the old master used on him. He says the hardest part of teaching them is not the form — it is the discernment. 'A scythe that does not choose is just a butcher,' he tells them. 'Choose well. Choose slowly. Choose even when you have no time.'",
    cost: "Pyre cultivation is the most emotionally costly of the five disciplines. Every severance Jiè performs — battlefield or funeral — takes a small piece of him with it. He is the steadiest of the brothers and the saddest, and his brothers know both things without either of them being said.",
    style:
      'Reach weapon in combat, ritual tool in peace. Jiè strikes once at distance, pulls the chain back, considers, and strikes again or withdraws. His fights end with the enemy sitting on the ground wondering why their cultivation has stopped working, and Jiè already walking away.',
  },

  {
    id: 'fen-forge-gauntlets',
    name: 'Forge Gauntlets',
    subtitle: 'Měng Huǒ — the hands that became the weapon',
    image: '',
    ownerId: 'aoli-fen-forge',
    ownerName: 'Měng Huǒ — Forge Discipline',
    ownerType: 'aoli',
    category: 'Gauntlets & Body Cultivation — Forge Discipline',
    labels: [
      {
        feature: 'The gauntlets',
        description:
          "Heavy iron-plated gauntlets that cover the backs of Měng's hands, the knuckles, and most of the forearm. The plates are dark from lava-quenching and scored along the striking edges from a lifetime of impacts. The knuckle-plates are spiked. The forearm guards are shaped to block and deflect weapons the size of swords. The gauntlets are not the weapon. The gauntlets are just what PROTECTS the weapon. The weapon is Měng's own body.",
      },
      {
        feature: 'Body cultivation',
        description:
          "The Forge discipline hardens the cultivator's own flesh in fire. Literally. Měng has spent thirty years pressing his skin to flame, again and again, letting the cultivation absorb the heat and reshape his tissue. His skin is like worn leather. His bones are denser than iron. His fists are heavier than ordinary fists even when empty. He IS a Forge. He IS a weapon. The gauntlets are decoration compared to the body inside them.",
      },
      {
        feature: "The old master's warning",
        description:
          "Forged by the old master when Měng turned twelve — the youngest of the brothers at the time of his first weapon. The old master took Jìng aside the day he handed Měng the gauntlets and said 'take care of the small one. He does not know what fear is. That is going to be a problem someday.' Jìng has been keeping that promise ever since. The gauntlets are the only part of Měng's kit that can be damaged, because the body inside them cannot. This is by design. The old master knew that Měng needed SOMETHING that could be broken, so that the fight would end before Měng did.",
      },
      {
        feature: 'Fearless',
        description:
          "The Forge cultivator charges fire. Walks into it. Catches blades on the gauntlets and breaks them. Punches through stone walls. Throws grown men over his shoulder. Has never been afraid of anything in his life. This is partly cultivation and partly the fact that Měng grew up so loved by four older brothers that harm has always been theoretical to him. His fights are disasters the enemy walks into and Měng walks out of with a grin and a small new scar he will not remember the origin of by next year.",
      },
      {
        feature: 'The scars he has forgotten',
        description:
          "Měng's hands, arms, chest, and back are covered in small burn scars from a lifetime of throwing himself at fires. He cannot remember where most of them came from. 'Oh, that one? I think... I was... no, I don't know. Yí, do you remember?' — to his youngest son, who also has no idea. The scars are a map Měng stopped keeping because he was having too much fun living to bother writing it down.",
      },
    ],
    description:
      "The youngest brother's weapon — the body Měng has forged over thirty years of pressing himself into fire and letting the cultivation reshape what came out. The gauntlets are the old master's work; the flesh inside them is Měng's. He fights with his hands, his feet, his shoulders, his forehead, his chest. He has been known to headbutt grown men in full plate because he forgot he had gauntlets on. He has three teenage adopted sons who fight in the same form and who are, in the compound's universally-held opinion, a perfect reproduction of Měng at their age — which everyone finds hilarious except Měng himself, who is now on the OTHER side of the 'GET DOWN FROM THERE' equation for the first time in his life and is genuinely losing his mind about it. When the old master's reincarnation eventually appears and Měng meets Zhúhuǒ, Měng will not recognise him from memory because Měng's memories of the old master are the thinnest of the five brothers. But his body will recognise the old master — the same way his body has always recognised fire. He will step close and stand quietly for the first time in his adult life, because some part of him will know he is being seen by the man who made his gauntlets.",
    cost: "Forge cultivation has the highest PHYSICAL toll of any of the disciplines. Měng pays for his strength with pain every day — old burns, new burns, bones that have been broken and reforged by his own cultivation. He does not complain because the payment feels like practice to him. Practice feels like practice. He does not yet understand that pain is supposed to be avoided.",
    style:
      'Close, loud, unrelenting, and joyful. Měng does not outthink his opponents — he outlasts them and outpunches them. A fight with Měng Huǒ is a fight in which the only way to win is to hit him HARDER than he is willing to absorb, and nobody in living memory has managed it.',
  },
]
