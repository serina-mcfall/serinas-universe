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
    category: 'Spirit Daggers — Pair',
    labels: [
      {
        feature: 'Crystal blade',
        description: "Forged from a piece of Mínhuì's own spirit. Transparent, luminous, like solidified moonlight. Cut the soul, not the body.",
      },
      {
        feature: 'Ribbon tether',
        description: "Each dagger is tethered by a fine silver ribbon of wind — Wénjī's element, the fox sisters' gift, allowing the blades to ride the air.",
      },
      {
        feature: 'Nine-tail fan',
        description: "On activation, the daggers spread outward like a fan and dance autonomously — spinning, slicing, protecting. They move like fox tails because they ARE fox tails.",
      },
      {
        feature: 'Mother-lock',
        description: "The daggers will never strike Aria. Even at the height of a fight, they curve around her. They were made to protect her instinctively — the way a mother protects.",
      },
    ],
    description:
      "Left with Aria at the orphanage as a baby by a woman she does not remember. Made from Mínhuì's own spirit — a piece of the nine-tailed sky fox god's soul torn off and forged into crystal, then given ribbon-form by Wénjī's wind. The two fox sisters united in one weapon, given to a baby girl who would not know what she had been given for sixteen years. The daggers have kept her alive her whole life in a city that eats children with magic. Xuěhuā recognises them the first time she sees them. Yuè'àn feels their divine presence and almost cannot look at them straight.",
    cost: "Paid by Mínhuì, once, sixteen years ago — a piece of her own soul for a child she could not raise.",
    style:
      "Fan-blade wind dancing — the daggers leave Aria's hands and fight alongside her, spinning and striking while she moves. Best in open space where the wind can catch them.",
  },

  {
    id: 'aria-elemental-gun',
    name: 'The Elemental',
    subtitle: 'A steampunk revolver that fires the five elements',
    image: '',
    ownerId: 'aria',
    ownerName: 'Aria Tyramare',
    ownerType: 'fellowship',
    category: 'Aurum Artimancy — Firearm',
    labels: [
      {
        feature: 'Purple energy chambers',
        description: "The heart of the gun — condenses Aria's magic into a bullet of pure element on each trigger pull. The glow is a sickly purple that should not exist in an Aurum weapon.",
      },
      {
        feature: 'Brass and copper frame',
        description: "Built from Aurum scrap in Aria's workshop when she was twelve. Ordinary metal doing impossible work because she is the one holding it.",
      },
      {
        feature: 'Five-way selector',
        description: "A tiny dial behind the hammer lets her choose element — Fire, Water, Earth, Wind, Spirit. She does not know she is channelling five elements. She thinks it is one power.",
      },
      {
        feature: "Phineas's stamp",
        description: "A tiny maker's mark on the underside — Phineas Thatcher's initials, engraved by Aria when she finished it at the tinker's workbench. Nobody else knows it is there.",
      },
    ],
    description:
      "Aria built the revolver herself in Aurum using artimancy principles from Phineas Thatcher's hidden book. Each shot channels her elemental magic as a condensed bullet of pure element — fire that detonates, water that hits like a tidal wave, earth that cracks the ground open with roots, wind that is invisible force, spirit that strikes the soul not the body. She has both a revolver and a long rifle version. The gun responds differently to each element — different glow, different hum, different kick.",
    cost: 'No material cost, but every shot is cultivation Qi from her own body. She will tire before a real cultivator would.',
    style:
      'Ranged, precise, impossible to predict — she can switch elements mid-reload, and a fight with Aria is a fight where the bullets keep changing rules.',
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
]
