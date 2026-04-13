// Character manifest — maps entry keys to their characters and image paths.
//
// searchName is used to find the character's section within the entry text
// (matches the ═══ LEADER N — NAME pattern in initial-entries.js).
//
// Paths are absolute web paths (files live in public/images/...).
//
// Optional fields:
//   stats: { hair, eyes, height, attire } — any may be empty string
//   quote: a memorable line the character would say (empty if not yet decided)

export const CHARACTERS = {
  "aoli-yansect": [
    {
      name: "Shí Ān",
      title: "Peaceful Stone — The Face of the Sect",
      image: "/images/characters/aoli/yan-sect/Shi An.png",
      searchName: "SHÍ ĀN",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Shān Rú",
      title: "Mountain Gentleness — Healer of People",
      image: "/images/characters/aoli/yan-sect/Shan Ru.png",
      searchName: "SHĀN RÚ",
      stats: {
        hair: "Long dark hair, pinned simply — ornaments chosen from whatever the mountain provides (a leaf, a flower, bone, stone)",
        eyes: "Ageless — eyes that have seen centuries of wounds open and close beneath her hands",
        height: "",
        attire: "White robes, always",
      },
      quote: "",
    },
    {
      name: "Tǔ Héng",
      title: "Earth Permanence — Healer of Land",
      image: "/images/characters/aoli/yan-sect/Tu Heng.png",
      searchName: "TǓ HÉNG",
      stats: {
        hair: "Long dark hair in a high ponytail or topknot — nothing loose, nothing out of place",
        eyes: "Cool, composed, measure you before you finish speaking",
        height: "",
        attire: "Dark robes — deep grey, black, white depending on season",
      },
      quote: "",
    },
    {
      name: "Yán Shǒu",
      title: "Rock Guardian — Guardian of the Mountain",
      image: "/images/characters/aoli/yan-sect/Yan Shou.png",
      searchName: "YÁN SHǑU",
      stats: {
        hair: "Wild dark hair — loose, windswept, never fully tamed. Sometimes braided for practicality, never for beauty",
        eyes: "Measure every movement in the pass before you know you have been seen",
        height: "Built for the mountain’s edge",
        attire: "Layered dark grey, black, deep blue. Fur-lined, leather-reinforced",
      },
      quote: "",
    },
    {
      name: "Kè Zhēn",
      title: "Carved Truth — The Recorder",
      image: "/images/characters/aoli/yan-sect/Ke Zhen.png",
      searchName: "KÈ ZHĒN",
      stats: {
        hair: "Dark hair pinned up with delicate ornaments — flowers, jade, pearl",
        eyes: "Clear, honest, always watching",
        height: "",
        attire: "White, blue, soft green. Ink-stained cuffs. Stone dust under her nails",
      },
      quote: "",
    },
    {
      name: "Tiān Mù (young)",
      title: "Heaven's Curtain — The Geographer",
      image: "/images/characters/aoli/yan-sect/Tian Mu young.png",
      searchName: "TIĀN MÙ",
      stats: {
        hair: "Starlight white. Always. In both forms. Long, flowing or half-pinned",
        eyes: "Focused on something nobody else can see",
        height: "",
        attire: "White, silver, pale robes — sometimes soft pink",
      },
      quote: "",
    },
    {
      name: "Tiān Mù (old)",
      title: "Heaven's Curtain — Elder form",
      image: "/images/characters/aoli/yan-sect/Tian Mu Old.png",
      searchName: "TIĀN MÙ",
      stats: {
        hair: "White, long, in a loose topknot. White beard",
        eyes: "Deep-set — have watched ten thousand star cycles",
        height: "",
        attire: "Slightly rumpled because dignity matters less than comfort when you are older than most mountains",
      },
      quote: "",
    },
  ],

  "aoli-yunsect": [
    {
      name: "Cháo Lán",
      title: "Tide's Wave — Avatar of Water",
      image: "/images/characters/aoli/yun-sect/Chao Lan.png",
      searchName: "CHÁO LÁN",
      stats: {
        hair: "Dark hair, flowing and wild when her mood shifts",
        eyes: "A young face carrying centuries of tidal force behind the eyes",
        height: "",
        attire: "Deep blue — midnight, water, oceans before a storm. Always blue",
      },
      quote: "",
    },
    {
      name: "Lián Yīng",
      title: "Ripple Reflection — The Purifier",
      image: "/images/characters/aoli/yun-sect/Lian Ying.png",
      searchName: "LIÁN YĪNG",
      stats: {
        hair: "Dark hair in elaborate arrangements with pins and ribbons — red and teal",
        eyes: "",
        height: "",
        attire: "Red and teal over white, trailing like fins when she moves",
      },
      quote: "",
    },
    {
      name: "Bō Xī",
      title: "Wave Play (Bolshy) — The Current",
      image: "/images/characters/aoli/yun-sect/Bo Xi.png",
      searchName: "BŌ XĪ",
      stats: {
        hair: "Dark hair in elaborate but slightly messy arrangements — buns and braids with red ribbons, never symmetrical",
        eyes: "Round-cheeked, bright-eyed, looks like she could not hurt a fly",
        height: "",
        attire: "Deep blue and red, practical under flowing outer layers, shorter hems for combat",
      },
      quote: "",
    },
    {
      name: "Hǎi Shěn",
      title: "Ocean Depth — Master Dragon, The Flood",
      image: "/images/characters/aoli/yun-sect/Hai Shen.png",
      searchName: "HǍI SHĚN",
      stats: {
        hair: "Long, flowing, luminous WHITE — the flood bleached the colour out",
        eyes: "Can go from devastating tenderness to terrifying power in a single breath",
        height: "",
        attire: "White silk over black inner layers. Gold and turquoise accents",
      },
      quote: "",
    },
    {
      name: "Míng Mèng",
      title: "Deep Sea Dream — Lady of Dreams, The Seer",
      image: "/images/characters/aoli/yun-sect/Ming Meng.png",
      searchName: "MÍNG MÈNG",
      stats: {
        hair: "Long, flowing, almost silver white — washed out by visions",
        eyes: "Clear luminous blue — shallow water over white sand",
        height: "",
        attire: "White, palest blue, silver — translucent layers that move like water",
      },
      quote: "",
    },
    {
      name: "Hé Cháng",
      title: "River Flow — River Lord, The Nourisher",
      image: "/images/characters/aoli/yun-sect/He Chang.png",
      searchName: "HÉ CHÁNG",
      stats: {
        hair: "Green and blue with streaks of sandy brown — river-coloured. Contains twigs, seaweed, river grass, and occasionally a very small frog",
        eyes: "Bright, present, perpetually on the edge of laughing",
        height: "",
        attire: "White, cream, warm earth tones — rumpled, slightly damp, usually with a grass stain",
      },
      quote: "",
    },
  ],

  "aoli-wensect": [
    {
      name: "Chén Xī",
      title: "The Lady — Guqin Branch (Foxes)",
      image: "/images/characters/aoli/wen-sect/Chen Xi.png",
      searchName: "CHÉN XĪ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Chén Xī (fox form)",
      title: "Nine-tailed blue-tipped fox",
      image: "/images/characters/aoli/wen-sect/Chen Xi - Fox.png",
      searchName: "CHÉN XĪ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Qíng Hé",
      title: "Second — Flute Branch (Cranes)",
      image: "/images/characters/aoli/wen-sect/Qing He.png",
      searchName: "QÍNG HÉ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Liè Fēng",
      title: "Third — Pipa Branch (Falcons)",
      image: "/images/characters/aoli/wen-sect/Lie Feng.png",
      searchName: "LIÈ FĒNG",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Níng Shuǐ",
      title: "Fourth — Erhu Branch (Swans)",
      image: "/images/characters/aoli/wen-sect/Ning Shui.png",
      searchName: "NÍNG SHUǏ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Zhēn Yǔ",
      title: "Fifth — Voice Branch (Formless)",
      image: "/images/characters/aoli/wen-sect/Zhen Yu.png",
      searchName: "ZHĒN YǓ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
  ],

  "aoli-fensect": [
    {
      name: "Jìng Huǒ",
      title: "Quiet Fire — Eldest, The Ember",
      image: "/images/characters/aoli/fen-sect/Jing Huo.png",
      searchName: "JÌNG HUǑ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Yǐn Huǒ",
      title: "Hidden Fire — Second, The Spark",
      image: "/images/characters/aoli/fen-sect/Yin Huo.png",
      searchName: "YǏN HUǑ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Lè Huǒ",
      title: "Joyful Fire — Third, The Blaze",
      image: "/images/characters/aoli/fen-sect/Le Huo.png",
      searchName: "LÈ HUǑ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Jiè Huǒ",
      title: "Boundary Fire — Fourth, The Pyre",
      image: "/images/characters/aoli/fen-sect/Jie Huo.png",
      searchName: "JIÈ HUǑ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Měng Huǒ",
      title: "Fierce Fire — Youngest, The Forge",
      image: "/images/characters/aoli/fen-sect/Meng Huo.png",
      searchName: "MĚNG HUǑ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Lè Zhé",
      title: "Joyful Wisdom — The Brains",
      image: "/images/characters/aoli/fen-sect/Le Zhe.png",
      searchName: "LÈ ZHÉ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Lè Yǔ",
      title: "Joyful Rain — The Listener",
      image: "/images/characters/aoli/fen-sect/Le Yu.png",
      searchName: "LÈ YǓ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Měng Zhàn",
      title: "Fierce Battle — The Fist",
      image: "/images/characters/aoli/fen-sect/Meng Zhan.png",
      searchName: "MĚNG ZHÀN",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Měng Shǎn",
      title: "Fierce Flash — The Spark",
      image: "/images/characters/aoli/fen-sect/Meng Shan.png",
      searchName: "MĚNG SHǍN",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Měng Yì",
      title: "Fierce Resolve — The Heart",
      image: "/images/characters/aoli/fen-sect/Meng Yi.png",
      searchName: "MĚNG YÌ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "The Chaos Quintet",
      title: "The next generation, all five",
      image: "/images/characters/aoli/fen-sect/The Chaos Quintet.png",
      searchName: "THE CHAOS QUINTET",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
  ],

  "aoli-hunsect": [
    {
      name: "Bái Shuāng",
      title: "White Frost — The Medium (Soul Speaking)",
      image: "/images/characters/aoli/hun-sect/Bai Shuang.png",
      searchName: "BÁI SHUĀNG",
      stats: {
        hair: "Long, luminous white — moves with her like gauze curtains",
        eyes: "WHITE — fully sightless. Spirit sight replaces physical sight",
        height: "Old but not bent — graceful, poised",
        attire: "White, silver, pale purple-grey gauze",
      },
      quote: "",
    },
    {
      name: "Hún Zhào",
      title: "Soul Light — Successor to the Medium",
      image: "/images/characters/aoli/hun-sect/Hun Zhao.png",
      searchName: "HÚN ZHÀO",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Zǐ Yè",
      title: "Purple Night — Soul Severing Master",
      image: "/images/characters/aoli/hun-sect/Zi Ye.png",
      searchName: "ZǏ YÈ",
      stats: {
        hair: "Black streaked with white, long, worn up in elaborate hairpins",
        eyes: "PURPLE so deep they look black in low light — glow faintly violet in the mist",
        height: "",
        attire: "Purples so dark they are almost black, with light purple accents",
      },
      quote: "",
    },
    {
      name: "Zǐ Shēn",
      title: "Purple Depth — Dangerous successor",
      image: "/images/characters/aoli/hun-sect/Zi Shen.png",
      searchName: "ZǏ SHĒN",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Zǐ Lù",
      title: "Purple Dew — The Young Hope",
      image: "/images/characters/aoli/hun-sect/Zi Lu.png",
      searchName: "ZǏ LÙ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Jīn Yǎn",
      title: "Golden Eye — Soul Reading Master",
      image: "/images/characters/aoli/hun-sect/Jin Yan.png",
      searchName: "JĪN YǍN",
      stats: {
        hair: "",
        eyes: "GOLDEN — warm amber-gold from sixty years of reading souls",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Jīn Nuǎn",
      title: "Golden Warmth — Successor",
      image: "/images/characters/aoli/hun-sect/Jin Nuan.png",
      searchName: "JĪN NUǍN",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Bì Lán",
      title: "Turquoise Orchid — Soul Mending Master",
      image: "/images/characters/aoli/hun-sect/Bi Lan.png",
      searchName: "BÌ LÁN",
      stats: {
        hair: "Vivid RED — worn loose, the colour of living flame against the grey mist",
        eyes: "TURQUOISE — the colour a soul turns when it is dying. Her own soul is dying too. Deepening every month",
        height: "",
        attire: "Simple clothing. A flame in the fog",
      },
      quote: "",
    },
    {
      name: "Yōu Lán",
      title: "Mysterious Blue — The Dream Walker",
      image: "/images/characters/aoli/hun-sect/You Lan.png",
      searchName: "YŌU LÁN",
      stats: {
        hair: "",
        eyes: "Hidden. Said to be the purest BLUE of dreams — the colour that exists only inside the sleeping mind",
        height: "",
        attire: "Veiled or hooded always. Nobody sees his face",
      },
      quote: "",
    },
  ],

  "aoli-shimosect": [
    {
      name: "Míng Jué",
      title: "The Avatar — Master of Corruption",
      image: "/images/characters/aoli/shi-sect/Ming Jue.png",
      searchName: "MÍNG JUÉ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Ruò Yǐng",
      title: "The Smiling Blade — Master of Blades",
      image: "/images/characters/aoli/shi-sect/Ruo Ying.png",
      searchName: "RUÒ YǏNG",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Lì Yuè",
      title: "The Veiled Advisor — Master of Blood Magic",
      image: "/images/characters/aoli/shi-sect/Li Yue.png",
      searchName: "LÌ YUÈ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Mù Xī",
      title: "The Blind Poisoner — true form & crone",
      image: "/images/characters/aoli/shi-sect/Mu Xi_ True form and crone.png",
      searchName: "MÙ XĪ",
      stats: {
        hair: "Loose and wild",
        eyes: "Blind. Hidden behind silk blindfold (or golden lace in true form)",
        height: "",
        attire: "True form — black feathered cloak, glittering robes like dying stars. Crone disguise — rags, basket, hunched",
      },
      quote: "",
    },
    {
      name: "Lóng Yí",
      title: "The Entheras — Master of Diplomats",
      image: "/images/characters/aoli/shi-sect/Long Yi.png",
      searchName: "LÓNG YÍ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Cì Zhēn",
      title: "Thorn Needle — Master of Poisons",
      image: "/images/characters/aoli/shi-sect/Ci Zhen.png",
      searchName: "CÌ ZHĒN",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Guǐ Xī",
      title: "The Blood Witch — Master of Blood Magic",
      image: "/images/characters/aoli/shi-sect/Gui Xi.png",
      searchName: "GUǏ XĪ",
      stats: {
        hair: "WHITE as snow with blood-red streaks that look alive, pulsing like blood flowing through her hair",
        eyes: "RED as blood that burns to life",
        height: "Walks in absolute silence — no footsteps, no rustle",
        attire: "",
      },
      quote: "",
    },
    {
      name: "Lán Yí",
      title: "Orchid / Moon Flower — Master of Diplomacy",
      image: "/images/characters/aoli/shi-sect/Lan Yi.png",
      searchName: "LÁN YÍ",
      stats: {
        hair: "",
        eyes: "",
        height: "",
        attire: "",
      },
      quote: "",
    },
  ],

}

// Extract a character's text section from the entry by finding the ═══ header
// containing their searchName and capturing everything until the next ═══ header.
export function extractCharacterText(entryText, searchName) {
  if (!entryText || !searchName) return ''
  const lines = entryText.split('\n')
  let startIdx = -1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('═══') && line.toUpperCase().includes(searchName.toUpperCase())) {
      startIdx = i
      break
    }
  }
  if (startIdx === -1) return ''
  let endIdx = lines.length
  for (let j = startIdx + 1; j < lines.length; j++) {
    if (lines[j].includes('═══')) {
      endIdx = j
      break
    }
  }
  return lines.slice(startIdx, endIdx).join('\n').trim()
}
