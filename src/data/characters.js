// Character manifest — maps entry keys to their characters and image paths.
//
// searchName is used to find the character's section within the entry text
// (matches the ═══ LEADER N — NAME pattern in initial-entries.js).
//
// Paths are absolute web paths (files live in public/images/...).
//
// Stats are base details only — short and factual (hair, eyes, height).
// Anything richer belongs in the Bible entry itself, not the stat block.
// Quote is a memorable line (empty if not yet decided).

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
      },
      quote: "",
    },
    {
      name: "Shān Rú",
      title: "Mountain Gentleness — Healer of People",
      image: "/images/characters/aoli/yan-sect/Shan Ru.png",
      searchName: "SHĀN RÚ",
      stats: {
        hair: "Long, dark",
        eyes: "Dark, ageless",
        height: "",
      },
      quote: "",
    },
    {
      name: "Tǔ Héng",
      title: "Earth Permanence — Healer of Land",
      image: "/images/characters/aoli/yan-sect/Tu Heng.png",
      searchName: "TǓ HÉNG",
      stats: {
        hair: "Long dark, high topknot",
        eyes: "Dark, cool",
        height: "",
      },
      quote: "",
    },
    {
      name: "Yán Shǒu",
      title: "Rock Guardian — Guardian of the Mountain",
      image: "/images/characters/aoli/yan-sect/Yan Shou.png",
      searchName: "YÁN SHǑU",
      stats: {
        hair: "Wild, dark, often braided",
        eyes: "Sharp, watchful",
        height: "Tall, built for the mountain",
      },
      quote: "",
    },
    {
      name: "Kè Zhēn",
      title: "Carved Truth — The Recorder",
      image: "/images/characters/aoli/yan-sect/Ke Zhen.png",
      searchName: "KÈ ZHĒN",
      stats: {
        hair: "Dark, pinned with delicate ornaments",
        eyes: "Clear, honest",
        height: "",
      },
      quote: "",
    },
    {
      name: "Tiān Mù (young)",
      title: "Heaven's Curtain — The Geographer",
      image: "/images/characters/aoli/yan-sect/Tian Mu young.png",
      searchName: "TIĀN MÙ",
      stats: {
        hair: "Starlight white, long",
        eyes: "Distant",
        height: "",
      },
      quote: "",
    },
    {
      name: "Tiān Mù (old)",
      title: "Heaven's Curtain — Elder form",
      image: "/images/characters/aoli/yan-sect/Tian Mu Old.png",
      searchName: "TIĀN MÙ",
      stats: {
        hair: "White, long beard",
        eyes: "Deep-set, warm",
        height: "",
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
        hair: "Dark, wild",
        eyes: "",
        height: "",
      },
      quote: "",
    },
    {
      name: "Lián Yīng",
      title: "Ripple Reflection — The Purifier",
      image: "/images/characters/aoli/yun-sect/Lian Ying.png",
      searchName: "LIÁN YĪNG",
      stats: {
        hair: "Dark, ornate pins, red & teal ribbons",
        eyes: "",
        height: "",
      },
      quote: "",
    },
    {
      name: "Bō Xī",
      title: "Wave Play (Bolshy) — The Current",
      image: "/images/characters/aoli/yun-sect/Bo Xi.png",
      searchName: "BŌ XĪ",
      stats: {
        hair: "Dark, messy buns & braids, red ribbons",
        eyes: "Bright, round-cheeked",
        height: "Small, lean",
      },
      quote: "",
    },
    {
      name: "Hǎi Shěn",
      title: "Ocean Depth — Master Dragon, The Flood",
      image: "/images/characters/aoli/yun-sect/Hai Shen.png",
      searchName: "HǍI SHĚN",
      stats: {
        hair: "White, long, flowing",
        eyes: "",
        height: "",
      },
      quote: "",
    },
    {
      name: "Míng Mèng",
      title: "Deep Sea Dream — Lady of Dreams, The Seer",
      image: "/images/characters/aoli/yun-sect/Ming Meng.png",
      searchName: "MÍNG MÈNG",
      stats: {
        hair: "Silver-white, long",
        eyes: "Luminous blue",
        height: "",
      },
      quote: "",
    },
    {
      name: "Hé Cháng",
      title: "River Flow — River Lord, The Nourisher",
      image: "/images/characters/aoli/yun-sect/He Chang.png",
      searchName: "HÉ CHÁNG",
      stats: {
        hair: "Green, blue, sandy brown — often contains twigs, grass, frogs",
        eyes: "Bright, warm",
        height: "",
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
        hair: "Long, luminous white",
        eyes: "White (sightless)",
        height: "",
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
      },
      quote: "",
    },
    {
      name: "Zǐ Yè",
      title: "Purple Night — Soul Severing Master",
      image: "/images/characters/aoli/hun-sect/Zi Ye.png",
      searchName: "ZǏ YÈ",
      stats: {
        hair: "Black streaked with white, elaborate pins",
        eyes: "Deep purple",
        height: "",
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
        eyes: "Golden",
        height: "",
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
      },
      quote: "",
    },
    {
      name: "Bì Lán",
      title: "Turquoise Orchid — Soul Mending Master",
      image: "/images/characters/aoli/hun-sect/Bi Lan.png",
      searchName: "BÌ LÁN",
      stats: {
        hair: "Vivid red, worn loose",
        eyes: "Turquoise (deepening)",
        height: "",
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
        eyes: "Dream blue (hidden)",
        height: "",
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
      },
      quote: "",
    },
    {
      name: "Mù Xī",
      title: "The Blind Poisoner — true form & crone",
      image: "/images/characters/aoli/shi-sect/Mu Xi_ True form and crone.png",
      searchName: "MÙ XĪ",
      stats: {
        hair: "Loose, wild",
        eyes: "Blind (silk blindfold, gold lace in true form)",
        height: "",
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
      },
      quote: "",
    },
    {
      name: "Guǐ Xī",
      title: "The Blood Witch — Master of Blood Magic",
      image: "/images/characters/aoli/shi-sect/Gui Xi.png",
      searchName: "GUǏ XĪ",
      stats: {
        hair: "White with blood-red streaks (pulsing)",
        eyes: "Red",
        height: "",
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
      },
      quote: "",
    },
  ],

  "fellowship-aria": [
    {
      name: "Aria Tyramare",
      title: "The Prophecy Child",
      image: "/images/characters/fellowship/Aria Tyramare.png",
      searchName: "ARIA TYRAMARE",
      stats: {
        hair: "Auburn curly, copper highlights",
        eyes: "Bright green",
        height: "Petite",
      },
      quote: "",
    },
  ],

  "fellowship-yuean": [
    {
      name: "Yuè'àn",
      title: "The Shadow Prince",
      image: "/images/characters/fellowship/Yue an.png",
      searchName: "YUÈ'ÀN",
      stats: {
        hair: "Long black, silver-streaked",
        eyes: "Dark, old-soul",
        height: "Tall, slim-strong",
      },
      quote: "",
    },
  ],

}

// Extract a character's text section from the entry by finding the ═══ header
// containing their searchName and capturing everything until the next ═══ header.
//
// Fallback: if no section header matches (e.g. the entry is about ONE character
// with no leader markers), return the full entry text.
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
  if (startIdx === -1) {
    if (entryText.toUpperCase().includes(searchName.toUpperCase())) {
      return entryText.trim()
    }
    return ''
  }
  let endIdx = lines.length
  for (let j = startIdx + 1; j < lines.length; j++) {
    if (lines[j].includes('═══')) {
      endIdx = j
      break
    }
  }
  return lines.slice(startIdx, endIdx).join('\n').trim()
}
