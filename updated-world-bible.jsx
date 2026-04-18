import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  {
    id: "cosmology",
    title: "The Cosmology",
    icon: "🌙",
    subtitle: "The gods who dream the world",
    description: "The primordial forces, the five young gods, divine guardians, and the prophecy that binds them all.",
    prompts: [
      { id: "primordials", label: "The Primordials", placeholder: "Mùjīn and Yuèlì — Fate and Chaos, the Father and the Mother..." },
      { id: "younggods", label: "The Five Young Gods", placeholder: "Yánlóng, Yúnshēng, Wénjī, Fèngzhé, Mínhuì — their natures, their fates..." },
      { id: "guardians", label: "Divine Guardians & Twins", placeholder: "The Wind Serpent, the Koi Fish, the Immortal Twins..." },
      { id: "prophecy", label: "The Prophecy & Evil", placeholder: "The child born where no magic dwells. Yuèlì's corruption. The Lost Name..." },
      { id: "fragments", label: "The Fragments of Yuèlì", placeholder: "Each inner sect member carries a fragment. When all come together, the prison breaks..." },
      { id: "fatechaos", label: "Fate vs Chaos", placeholder: "Mùjīn and Yuèlì playing each other across centuries. Free will stepping off the board..." },
    ],
  },
  {
    id: "aoli",
    title: "Aoli (奥里)",
    icon: "🏯",
    subtitle: "The Breathing Land",
    description: "Xianxia/cultivation. The land is alive. Six sects, divine connections severed and sleeping, and the Shi Sect's dark secret.",
    prompts: [
      { id: "overview", label: "The Realm", placeholder: "The breathing land — how Aoli lives, feels, and responds to those who walk it..." },
      { id: "sects", label: "The Six Sects", placeholder: "Yan, Yun, Wen, Fen, Hun, Shi — the six sects, their natures and connections..." },
      { id: "cultivation", label: "Cultivation & Magic", placeholder: "How cultivation works in Aoli, the sect system, ranks and advancement..." },
      { id: "shimosect", label: "The Shi Sect Secret", placeholder: "The inner sect, Yuèlì's avatar, the worldwide network of agents and fragments..." },
      { id: "dailylife", label: "Daily Life & Culture", placeholder: "Sect daily life, architecture, food, customs, festivals..." },
      { id: "landscape", label: "The Land Itself", placeholder: "Mountains, rivers, sacred places, where the gods sleep..." },
    ],
  },
  {
    id: "isenholt",
    title: "Isenholt",
    icon: "⛰️",
    subtitle: "Where the mountain remembers",
    description: "Mongolian-Scandinavian frozen province. Six clans, beast bonds, god-touched women, and traditions carved in stone and ice.",
    prompts: [
      { id: "landscape", label: "The Land", placeholder: "Fjordlands, Mongolian steppes, deep mountain passes, snow-capped mountains..." },
      { id: "clans", label: "The Six Clans", placeholder: "Greymane, Mistborne, Stonewall, Shroudborn, Skycrest, Coldhollow..." },
      { id: "warbands", label: "Warbands & War Leaders", placeholder: "Frost Howl, Vanishing Snow, Ironhide, Mistwalkers, Frostwing, Nightfall..." },
      { id: "leadership", label: "Leadership & Titles", placeholder: "Stoneborn, Stonebred, Hearthkeeper, Völugan..." },
      { id: "godtouched", label: "The God-Touched Women", placeholder: "Silvermyst, Skyborn, Rootweaver — hidden behind the veil..." },
      { id: "marriage", label: "Marriage & Sacred Traditions", placeholder: "Gods Tears, the climb, the walk between fires, the wedding tattoo..." },
      { id: "beastbond", label: "The Beast Bond", placeholder: "The bonding rite at age 12, the week alone in the mountains..." },
      { id: "outcasts", label: "The Ivyless & Outcasts", placeholder: "Those born without the gods' blessing. The boundary. Temgar's story..." },
      { id: "dailylife", label: "Daily Life & Culture", placeholder: "Food, housing, longhouses and yurts, hospitality, music..." },
      { id: "warfare", label: "Warfare & Fighting", placeholder: "How each clan fights based on their animal..." },
    ],
  },
  {
    id: "tyramare",
    title: "Tyramare",
    icon: "🏛️",
    subtitle: "Beauty with poison in its veins",
    description: "Mediterranean coastal province. Seven guild districts, a corrupt faith, a stolen palace, and an empty throne that waits.",
    prompts: [
      { id: "overview", label: "The Province & City", placeholder: "Venice meets Alexandria. Islands connected by waterways..." },
      { id: "districts", label: "The Seven Districts", placeholder: "Spice Harbour, Marble Quarter, Iron Quarter, The Veil, Aurumvale, Stillhaven, The Solace..." },
      { id: "guildseats", label: "The Seven Guild Seats", placeholder: "How each seat is claimed..." },
      { id: "entheras", label: "The Entheras & Solenthera", placeholder: "The pope figure. The stolen palace..." },
      { id: "faiths", label: "The Three Faiths", placeholder: "Solenthera, Umbrathi, Verenthae..." },
      { id: "oranthi", label: "The Oranthi & Temples", placeholder: "The temple priests who charge fees..." },
      { id: "underground", label: "Stillhaven & Lìyǐn", placeholder: "The underground district. Lìyǐn's territory..." },
      { id: "magic", label: "Magic & Monopoly", placeholder: "Magic hoarded for nobility..." },
      { id: "throne", label: "The Empty Throne", placeholder: "The Bannric throne still in the council chamber. Waiting..." },
      { id: "dailylife", label: "Daily Life & Culture", placeholder: "Food, clothing, markets, harbours..." },
    ],
  },
  {
    id: "braedun",
    title: "Braedun",
    icon: "🌿",
    subtitle: "Where the wild things root",
    description: "Celtic province. Wild Crags, riders, druids. The Earth Twin hides here as the original druid.",
    prompts: [
      { id: "overview", label: "The Province", placeholder: "Celtic, wild, untamed..." },
      { id: "culture", label: "Culture & People", placeholder: "How the people of Braedun live..." },
      { id: "earthtwin", label: "The Earth Twin", placeholder: "Hiding as the original druid..." },
      { id: "magic", label: "Magic & Druidism", placeholder: "How magic manifests here..." },
      { id: "politics", label: "Power & Governance", placeholder: "Who leads? How?" },
      { id: "dailylife", label: "Daily Life", placeholder: "Food, clothing, housing, customs..." },
    ],
  },
  {
    id: "ardmere",
    title: "Ardmere",
    icon: "⚔️",
    subtitle: "Where chains are forged from fields",
    description: "English/French province. Farmland and slaves. Sleeping earth magic. Revolution brewing.",
    prompts: [
      { id: "overview", label: "The Province", placeholder: "Farmland. Slavery. Revolution..." },
      { id: "slavery", label: "The Slave System", placeholder: "How slavery works here..." },
      { id: "magic", label: "Sleeping Earth Magic", placeholder: "Magic buried beneath the fields..." },
      { id: "revolution", label: "The Revolution Brewing", placeholder: "Who is angry? Who is organizing?" },
      { id: "politics", label: "Power & Governance", placeholder: "Who rules? How?" },
      { id: "dailylife", label: "Daily Life", placeholder: "Food, clothing, housing..." },
    ],
  },
  {
    id: "maramir",
    title: "Maramir",
    icon: "🏜️",
    subtitle: "Where shadows rule the sand",
    description: "Middle Eastern/nomadic province. The Shadow Prince Yuè'àn. Mirage magic and assassination.",
    prompts: [
      { id: "overview", label: "The Province", placeholder: "Desert. Nomadic. Mirage magic..." },
      { id: "yuean", label: "Yuè'àn's Rule", placeholder: "The Shadow Prince..." },
      { id: "magic", label: "Mirage Magic", placeholder: "How mirage magic works..." },
      { id: "culture", label: "Culture & People", placeholder: "Nomadic desert life..." },
      { id: "assassination", label: "The Shadow Arts", placeholder: "Assassination as profession..." },
      { id: "dailylife", label: "Daily Life", placeholder: "Food, clothing, housing..." },
    ],
  },
  {
    id: "solisopia",
    title: "Solisòpia",
    icon: "💎",
    subtitle: "Where excess hides the truth",
    description: "Roman/Byzantine province. Jeweled rot. The Water Twin's pleasure house. Lìyǐn's home.",
    prompts: [
      { id: "overview", label: "The Province", placeholder: "Roman/Byzantine. Excess..." },
      { id: "watertwin", label: "The Water Twin", placeholder: "The madam of the pleasure house..." },
      { id: "liyinlife", label: "Lìyǐn's World", placeholder: "Raised in the pleasure house..." },
      { id: "culture", label: "Culture & Excess", placeholder: "How excess defines this place..." },
      { id: "politics", label: "Power & Governance", placeholder: "Who holds power here?" },
      { id: "dailylife", label: "Daily Life", placeholder: "Food, fashion, entertainment..." },
    ],
  },
  {
    id: "aurumshi",
    title: "Aurumshì (金铁)",
    icon: "⚙️",
    subtitle: "Gold and iron in the sky",
    description: "Victorian steampunk + Asian fusion. Sky cities. Magic outlawed but powered by blood magic.",
    prompts: [
      { id: "overview", label: "The Realm", placeholder: "Sky cities. Magic outlawed..." },
      { id: "bloodmagic", label: "The Blood Magic Secret", placeholder: "The ruling class secret..." },
      { id: "minhui", label: "Mínhuì in Hiding", placeholder: "The sky fox god hiding..." },
      { id: "ariaorigin", label: "Aria's Birthplace", placeholder: "Born where no magic dwells..." },
      { id: "culture", label: "Culture & Daily Life", placeholder: "Victorian steampunk meets Asian fusion..." },
      { id: "politics", label: "Power & Control", placeholder: "How the ruling class maintains control..." },
    ],
  },
  {
    id: "fellowship",
    title: "The Fellowship",
    icon: "🔥",
    subtitle: "Six souls, one impossible journey",
    description: "The six members, their weapons, their bonds, and the parents who shaped them.",
    prompts: [
      { id: "aria", label: "Aria Tyramare", placeholder: "Prophecy child. Auburn curls, green eyes, freckles..." },
      { id: "yuean", label: "Yuè'àn (月暗)", placeholder: "Shadow Prince. Created by Shi Sect..." },
      { id: "xuehua", label: "Xuěhuā (雪花)", placeholder: "Four-tailed white fox. Trickster..." },
      { id: "genmu", label: "Gēnmù (根木)", placeholder: "Youngest. Healer of the land..." },
      { id: "temgar", label: "Temgar", placeholder: "Isenholt. Greymane outcast. Ice blue eyes..." },
      { id: "liyin", label: "Lìyǐn Aurelian (丽隐)", placeholder: "Beautiful shadow. Solisòpia..." },
      { id: "parents", label: "Key Parents", placeholder: "Zhúhuǒ, Mínhuì..." },
      { id: "dynamics", label: "Fellowship Dynamics", placeholder: "How they meet, bond, clash..." },
    ],
  },
  {
    id: "connections",
    title: "The Connections",
    icon: "🕸️",
    subtitle: "Where stories cross paths",
    description: "The thread board. How stories, characters, and events link across the universe.",
    prompts: [
      { id: "shimoweb", label: "The Shi Web", placeholder: "Agents in every hub. Fragments of Yuèlì..." },
      { id: "crossover", label: "Characters Who Cross Over", placeholder: "Which characters appear in multiple stories?" },
      { id: "events", label: "Shared Events", placeholder: "Events that ripple across multiple stories..." },
      { id: "objects", label: "Objects That Travel", placeholder: "Swords, letters, jewels, curses..." },
      { id: "rumours", label: "Rumours & Echoes", placeholder: "What characters hear about events elsewhere..." },
      { id: "timeline", label: "The Timeline", placeholder: "How stories sit in time..." },
    ],
  },
];

const INITIAL_ENTRIES = {"cosmology-primordials": "TWO PRIMORDIAL FORCES (married):\n\nMÙJĪN (暮金) — The Father. Fate. Golden dragon. Sunset gold. Subtle power, whispers prophecy. Every sunset = handing sky to his wife.\n\nYUÈLÌ (月丽) — The Mother. Chaos. Black nine-tailed fox. Moon beauty. Was NOT always evil — corrupted by humanity’s greed/darkness over centuries. Sealed by her own children who didn’t recognize her.\n\nTHE CORE TRUTH: The sealed evil is a mother who needs saving, not a monster to kill.", "cosmology-younggods": "FIVE YOUNG GODS (children of Mùjīn & Yuèlì):\n\nYÁNLÓNG (岩龙) — Rock dragon. Earth/forest. SLEEPING in Aoli mountains. Married to Yúnshēng. Carved stone guardians. Weeps in his sleep — his tears become Gods Tears (white ivy) on the highest peaks.\n\nYÚNSHĒNG (云生) — Water dragon. Water/peace/balance. SLEEPING in Aoli cave. Married to Yánlóng.\n\nWÉNJĪ (文姬) — Nine-tailed wind fox. Wind/music/shapeshifting/stories. EXILED, wandering. Plays guqin. Sister to Mínhuì. (This is Wen.)\n\nFÈNGZHÉ (凤折) — Phoenix. Fire/rebirth/death. Currently BURIED INSIDE Zhúhuǒ (Bannric heir).\n\nMÍNHUÌ (明慧) — Nine-tailed sky fox. Spirit/soul/veil. HIDING in Aurumshì for centuries. Aria’s mother.\n\nNo sixth god — Chaos sect unknowingly follows corrupted Yuèlì.", "cosmology-guardians": "DIVINE GUARDIANS (love gifts between sleeping gods):\n\nWind Serpent (female) — Yánlóng’s gift to Yúnshēng. Luminescent, ink-dark hair tipped purple/blue. Keeps Yuèlì’s lost name. Speaking the name may remind the Mother who she was.\n\nKoi Fish (male) — Yúnshēng’s gift to Yánlóng. Playful trickster, carries a fan.\n\nConnected mentally, never physically met. Take human forms when waking begins.\n\nIMMORTAL TWINS — Children of Yánlóng & Yúnshēng:\nEarth Twin (male, name TBD) — Hides in Braedun as the original druid.\nWater Twin (female, name TBD) — Hides in Solisòpia as madam of a pleasure house. Guides Lìyǐn.", "cosmology-prophecy": "PROPHECY (whispered by Mùjīn): A child born where no magic dwells, with strong magic roots.\n\nEVIL = Yuèlì’s corruption, manifests differently per culture.\n\nTHE LOST NAME: Yuèlì’s true name, held by wind serpent. Speaking it may remind the Mother who she was.\n\nFATE VS CHAOS: Mùjīn and Yuèlì playing each other across centuries. The story is about children stepping OFF the board through free will.", "cosmology-fragments": "THE FRAGMENTS OF YUÈLÌ\n\nEvery member of the Shi Sect's inner circle carries a FRAGMENT of Yuèlì — a shard of her power, consciousness, and corruption.\n\nThe fragment prolongs their life far beyond mortal years, making them appear immortal. It grants them power — the weight in the Entheras's voice, the shiver others feel. It is a piece of a sealed god lodged in their soul like a splinter.\n\nTHE FIVE FRAGMENT-CARRIERS:\n- THE AVATAR in Aoli — Master of Corruption. Runs the Shi Sect openly. Unmasked.\n- THE SMILING BLADE in Solisòpia — Master of Blades. Runs the pleasure quarter.\n- THE VEILED ADVISOR in Aurumshì — Master of Blood Magic. Advisor to the ruling body.\n- THE BLIND POISONER in Aoli — Master of Poisons. Travels as a crone carrying messages.\n- THE ENTHERAS in Tyramare — Master of Diplomats. Seventh guild seat, pope of Solenthera.\n\nTHE ULTIMATE GOAL: When all fragments come together — Yuèlì is free. Every century of slow poison has been in service of one goal: Gather the pieces. Free the mother. Darkness reigns.\n\nCRITICAL IMPLICATION: The fellowship CANNOT simply kill the agents. Killing a vessel may RELEASE the fragment, accelerating Yuèlì's return. They must find a way to REMOVE fragments without releasing them. The wind serpent carrying Yuèlì's lost name may be the key.\n\nThis isn't a war. It's a rescue mission disguised as one.", "cosmology-fatechaos": "Mùjīn (Fate) and Yuèlì (Chaos) have been playing each other across centuries — a cosmic chess match using their children, the sects, the kingdoms as pieces.\n\nThe story is ultimately about the children — Aria, the fellowship, the young gods’ descendants — stepping OFF the board entirely. Not choosing Fate or Chaos but choosing FREE WILL.\n\nThe prophecy child (Aria) is the convergence of ALL bloodlines — the piece neither player expected.", "aoli-sects": "THE SIX SECTS OF AOLI (short names used in daily speech):\n\nYAN SECT (山石 Shānshí) — Mountain stone. Earth. Yánlóng’s. Retains divine connection. Carved INTO the Dragon’s Spine. Suspended in time — summer and winter exist simultaneously.\nYUN SECT (水静 Shuǐjìng) — Water stillness. Water. Yúnshēng’s. Retains divine connection. Perpetual spring. Cherry blossoms always in bloom. Water glows at night.\nWEN SECT (风羽 Fēngyǔ) — Wind feather. Wind. Wénjī’s. Connection severed. Above the clouds, closest to heaven. Golden-white open-walled architecture. White cranes. Xuěhuā’s sect.\nFEN SECT (凤灰 Fènghuī) — Phoenix ash. Fire. Fèngzhé’s. Connection severed. Built on rivers of lava that flow like burning blood. Cherry blossoms grow from ash.\nHUN SECT (魂织 Húnzhī) — Soul weave. Spirit. Mínhuì’s. Connection severed. Lives LOW among the people — forest villages, humble wood, healers and spirit walkers.\nSHI SECT (蚀没 Shímò) — Erode into oblivion. Chaos. No god — except the inner secret sect serves Yuèlì’s avatar. IN the Dark Range. Blood-red maples. Winter never leaves.", "aoli-shimosect": "THE SHI SECT SECRET:\n\nThe outer Shi Sect has no god — or so they believe. The INNER secret sect serves Yuèlì's avatar directly.\n\nThe religion of Solenthera in Tyramare was PLANTED by the Shi Sect after the Bannric civil war. Over centuries it shapeshifted — stopped looking like Aoli, dressed itself in Mediterranean robes, built marble temples. But at its core, the poison is the same.\n\n═══ THE FIVE FRAGMENT-CARRIERS ═══\n\nFive operatives carry fragments of Yuèlì. Each fragment prolongs life, grants power, and feeds the sealed goddess. Each one leads a DISCIPLINE of the Shi Sect. Together they can unmake a world from the inside out.\n\n1. THE AVATAR — Master of Corruption\nMale. Stationed: AOLI (Shi Sect compound, the Dark Range).\nThe living voice of Yuèlì. Runs the Shi Sect openly — both outer and inner. UNMASKED. Shows his face because his face IS the proof. Centuries old, unchanged, radiating power. When disciples doubt, they look at him and believe.\nVisual: Red and black robes, god-mark between brows, ornate crown. Dragon imagery. Silver armour for ceremonies. Beautiful, composed, absolute.\nDiscipline — CORRUPTION MAGIC: Does not create lies — warps truths. Finds the hairline crack in a soul (doubt, grief, envy, loneliness) and feeds it. Waters it like a gardener tending a seed. The corruption grows from something already inside you — you think these are still your choices. His most devoted disciples came to him broken, and he made them feel whole. That's not a lie. That's worse than a lie. It's a truth with poison at its root.\nMirrors Yuèlì herself — he does to mortals what the world did to his goddess.\n\n2. THE SMILING BLADE — Master of Blades\nMale. Stationed: SOLISÒPIA (runs the pleasure quarter).\nTwo swords strapped to his back, a smaller knife hidden. Beautiful, devious, deadly. Smiles while he kills — not a grin, not a snarl, a SMILE, like watching something beautiful unfold. The blade is a brushstroke, the blood is ink.\nVisual: Wide-brimmed hat with ornate metal face mask (working). Hat off in pleasure quarter — face on full display, dangerously beautiful. Dark braids, forehead markings, gold ear cuff, dark crimson and black robes. Armoured shoulders, chains at belt.\nDiscipline — BLADES: His disciples are assassins and swordsmen who make violence beautiful. Speed, precision, elegance. Every kill is choreography. The pleasure quarter is the training ground — seduction and swordplay taught in the same breath.\nThe pleasure quarter is his web — where secrets spill like wine, alliances form and break between silk sheets. Every whisper finds its way back to him. Hides in the LIGHT, not the shadows. Operates in the same province as the Water Twin — relationship TBD.\n\n3. THE VEILED ADVISOR — Master of Blood Magic\nFemale. Stationed: AURUMSHÌ (advisor to the ruling body).\nWhispers in the ear of the ruling class. The practitioner of blood magic. Death disguised as beauty. The sister who loves you, the mother who helps you, the wife who guides you — and all the while she is taking the very blood of the people.\nVisual: Veiled in black, red, and gold. Elaborate headdresses and flowing robes. Face always covered by sheer veil or beaded curtain. Ceremonial form: red and black with crescent-blade crown, blood-drop jewels.\nDiscipline — BLOOD MAGIC: The oldest, most forbidden cultivation. Drawing power from the living. How to take without being noticed. How to make the giving feel like a gift. She taught Aurumshì's ruling class and they think THEY'RE in control.\nOperates in the same city where Mínhuì hides and where Aria was born. This may be WHY Mínhuì sent Aria away.\n\n4. THE BLIND POISONER — Master of Poisons\nFemale. Stationed: AOLI (inner circle, but TRAVELS as a crone).\nBlind. Soft. Deadly. Poison is her art, delivered with a warm smile. The kind of smile that makes you think she genuinely cares. Cunning with a softness that is lethal.\nVisual: True form — black feathered cloak, black silk blindfold or golden lace blindfold, glittering robes like dying stars. Loose wild hair. Holds golden leaf. Ethereal, delicate, beautiful. Crone disguise — rags, hunched back, clouded voice, basket. Harmless old woman shuffling between villages.\nDiscipline — POISONS: Every plant, every fungus, every combination that kills slowly, quickly, painfully, peacefully. The art of making death look like nature. She teaches with soft voice and gentle hands — her students don't think of it as killing. They think of it as mercy.\nShe is the CONNECTIVE TISSUE of the web. Carries coded messages between all fragment-carriers disguised as a travelling crone. An old blind woman at a teahouse — nobody suspects. She could leave death across provinces and no one traces it back.\n\n5. THE ENTHERAS — Master of Diplomats\nMale. Stationed: TYRAMARE (seventh guild seat, supreme leader of Solenthera).\nTitle meaning: \"The Inner Sanctum.\" Pope-king in fur and flame. Lives in the stolen Bannric palace. Almost always the deciding vote. When he speaks, ALL IS QUIET.\nVisual: Luxurious — fur-trimmed robes, deep reds and blacks, gold embroidery. Looks like a KING, not a priest. Red flame dancing casually between fingers. Small golden hairpin. Effortless, almost bored with power.\nDiscipline — DIPLOMACY: His disciples are infiltrators, priests, politicians. They walk into rooms wearing the right robes and reshape entire societies from the inside. Solenthera is his masterwork — a religion built from nothing that now controls a province. His disciples don't carry swords. They carry influence.\nThe guild masters do NOT know what he truly is. Immortality explained as divine preservation. Truth: vessel holding a fragment of a goddess.\n\n═══ THE FIVE DISCIPLINES ═══\n\nPoisons — killing the body\nBlades — killing the person\nBlood Magic — killing the spirit\nDiplomacy — killing the truth\nCorruption — killing the soul\n\nEach destroys something different. Together they unmake a world from the inside out.\n\nTHE VISUAL LANGUAGE: Women hide their EYES (veils, blindfolds, dark coverings). Men hide their faces from ABOVE (hoods, hats, shadow falling downward). The direction of concealment is the tell. The Avatar alone shows his face — because his face IS the proof.", "isenholt-landscape": "Fjordlands, Mongolian steppes, deep mountain passes, snow-capped mountains. Beautiful and untamed like its people. Majestic mountain ranges.\n\nTHE FEELING: Beautiful but dangerous. The land does not forgive carelessness. Wild — no walls, no castles, no cities. Just longhouses and yurts and stone and sky.\n\nNorwegian fjords — sheer cliff walls plunging into dark still water. Waterfalls cascading from impossible heights. Mist in valleys.\nMongolian steppe adapted — high-altitude plateaus between mountain ranges. Alpine meadows in summer, frozen tundra in winter.\nDeep mountain passes — narrow corridors of stone where wind howls like wolves. Passes that close in winter, cutting clans off for months.\nSnow-capped mountains — the backbone of Isenholt. Always visible. The mountains ARE the gods — Yánlóng sleeps inside them.\n\nThe air tastes of cold stone and pine. The first sound you hear is wind. Rivers run ice-cold and fast. Silence so deep you can hear your own heartbeat — and then the howl of something in the distance.", "isenholt-clans": "THE SIX CLANS OF ISENHOLT:\n\nGREYMANE CLAN (Wolf — Blue Eyes)\nWarband: Frost Howl | Leader: The Fenrir (The Winter Wolf)\nThe most social clan. Pack tactics. Relentless pursuit. Every adult teaches every child. Fiercely loyal. Temgar is an outcast of this clan.\n\nMISTBORNE CLAN (Snow Fox — Blue Eyes)\nWarband: Vanishing Snow | Leader: The Winter Fox\nThe tricksters. Scouts, misdirection, camouflage. Children learn through games and riddles. They cache supplies, plan three moves ahead, never fight fair. Xuěhuā is Mistborne in spirit.\n\nSTONEWALL CLAN (Bear — Amber Eyes)\nWarband: Ironhide | Leader: The Ice Bear\nThe heavy hitters. Shield wall that doesn’t break. Patient, enduring. Mothers are the fierce heart of every family. “We hold the line” — not a boast, a fact.\n\nSHROUDBORN CLAN (Snow Leopard — Amber Eyes)\nWarband: Mistwalkers | Leader: The Ghost of the Mountain\nThe assassins. Mountain stalkers. Track for days, choose the perfect moment, one strike, no warning, then gone. Natural rivalry with Mistborne.\n\nSKYCREST CLAN (Eagle — Green Eyes)\nWarband: Frostwing | Leader: The Snow Talon\nThe eyes of the army. Longhouses on highest ridges. Children learn patience and precision. Height IS power — the height of VISION.\n\nCOLDHOLLOW CLAN (Owl — Green Eyes)\nWarband: Nightfall | Leader: The Wraith\nThe quietest clan. Night fighters. Silent, invisible. When Coldhollow speak at a gathering, everyone goes still.\n\nEYE COLOUR PAIRINGS:\nBlue Eyes = canines (wolf + fox)\nAmber Eyes = solitary predators (bear + leopard)\nGreen Eyes = aerial hunters (eagle + owl)", "isenholt-warbands": "THE SIX WARBANDS AND THEIR LEGENDARY LEADERS:\n\nFROST HOWL (Greymane/Wolf) — Led by THE FENRIR (The Winter Wolf)\nRuns at the front. First voice in the howl, first teeth in the chase. Pack tactics — coordinated, relentless, never leave a member behind.\n\nVANISHING SNOW (Mistborne/Snow Fox) — Led by THE WINTER FOX\nEverywhere and nowhere. Directing from the shadows. Three moves ahead. Scouts, tricksters, misdirection.\n\nIRONHIDE (Stonewall/Bear) — Led by THE ICE BEAR\nThe centre of the wall. Massive, white, unstoppable. Every Ironhide warrior looks to The Ice Bear and holds.\n\nMISTWALKERS (Shroudborn/Snow Leopard) — Led by THE GHOST OF THE MOUNTAIN\nAlways above you. Watching. Choosing the moment. One strike, no warning, no sound.\n\nFROSTWING (Skycrest/Eagle) — Led by THE SNOW TALON\nSees the whole battlefield. Directs from high ground. Archers, scouts, precision strikes from above.\n\nNIGHTFALL (Coldhollow/Owl) — Led by THE WRAITH\nNot a ghost — something that was never fully there. Moves through darkness because it IS the dark. The title breaks the winter pattern — The Wraith has something older. Night.", "isenholt-leadership": "ISENHOLT LEADERSHIP HIERARCHY:\n\nSTONEBORN — Leader of all clans. Chosen through free-for-all combat — fists and beast only. Not a king — the one the mountain tested and found strongest.\n\nSTONEBRED — Clan chieftains. The fighters who lost in the Stoneborn combat become the new chieftains. Forged in the same fire, one step down.\n\nHEARTHKEEPER — Clan mothers. Keeper of fire, magic, and life. Performs marriage tattoos with magic in her hands. Draws paste on newborn girls’ brows in the Living Cave. The chieftain leads the warriors. The Hearthkeeper leads the CLAN.\n\nVÖLUGAN — Maiden priestess and archivist. Keeps ALL records. Cannot marry or have children. Her life becomes the scrolls. A bride who finds no Gods Tears may choose to become the Völugan instead of marrying without blessing.", "isenholt-godtouched": "THE GOD-TOUCHED WOMEN:\n\nAll Isenholt women wear ceremonial headdress/veil covering their eyes — hiding god-touched among ungifted. A shield wall of sisterhood.\n\nGOD-TOUCHED RITUAL: Newborn girls taken to the Living Cave. Clan mother mixes water + earth into paste, draws line on baby’s brow. If god-touched, eyes slowly change colour.\n\nSILVERMYST — Healers (Silver Eyes)\nSymbol: White Ivy (Gods Tears). They heal people.\n\nSKYBORN — Listeners (Dark Blue Eyes)\nSymbol: Owl. They hear the mountain’s whispers. Seers.\n\nROOTWEAVER — Growers (Green Eyes)\nSymbol: Hearthroot (the root that grows toward warmth). They make things grow in frozen ground. Connected to the Hearthkeeper — the clan mother keeps the hearth, the Rootweavers grow toward it.", "isenholt-marriage": "GODS TEARS (WHITE IVY):\nPure white ivy growing only at the highest mountain peaks in snow. Sacred name: Gods Tears. TRUE ORIGIN: Yánlóng weeps in his sleep, dreaming of Yúnshēng. Where his tears fall beneath stone, the white ivy grows.\n\nTHE CLIMB — THE BRIDE’S PILGRIMAGE:\nThe bride, her sisters, her mother, and her grandmother climb together to gather Gods Tears. If ivy is found — blessed. If NO ivy — the bride chooses: become a Völugan or marry anyway and become an outcast.\n\nWEDDING ATTIRE:\nMen: Rich earth tones. Women: Subdued creams and earth tones.\nBridal headdress: Sheer veil of cream silk, circlet of ivy and silver.\n\nTHE WALK BETWEEN FIRES:\nTwo fires lit. Bride walks between — mother and grandmother on either side. They leave her before the centre. She crosses ALONE. On the other side, the groom’s mother and grandmother receive her. Women claim her before the groom. He leads her to the Hearthkeeper for the blessing and tattoo.\n\nTHE WEDDING TATTOO — SOUL BOND:\nGiven by the Hearthkeeper. She weaves MAGIC into the bond. Not decoration — a spell. Both wrists. No beginning, no ending. Husband’s side: clan animal. Wife’s side: god-touched gift or favourite flower. Bonded for life AND BEYOND.\n\nSEVERANCE: Only by destroying the tattoo. It happened once — the man disappeared, the woman died. Told as warning.", "isenholt-beastbond": "THE BEAST BONDING RITE:\n\nAge 12. Week-long solo trial in the mountains with only bow/arrows. Elder says “listen to the mountains.” Bond is an instant spark — feel whole, senses explode. Eye colour changes to match bond type.\n\nSIX BOND ANIMALS & EYE COLOURS:\nWolf (blue), Snow Fox (blue), Bear (amber), Snow Leopard (amber), Eagle (green), Owl (green)\n\nWOMEN: Do NOT beast-bond. Take mother’s clan. Are the roots/anchors/culture keepers.\n\nOUTCAST CHILDREN: Do NOT get to participate. Do NOT become warriors. They become butchers, blacksmiths, woodcutters — useful but invisible.\n\nTEMGAR’S BOND: As an outcast child of the Greymane Clan, Temgar was never allowed the bonding rite. Yet Meila (his direwolf, with matching ice-blue eyes) found him anyway — a bond without rite, without permission. This shakes the foundations of everything Isenholt believes.", "isenholt-outcasts": "THE IVYLESS — OUTCASTS & THE BOUNDARY:\n\nCouples who marry without the Gods Tears blessing DO NOT receive the wedding tattoo. They choose to become outcasts. They may stay at THE BOUNDARY — close enough to see the fires, hear the songs, smell the food.\n\nTheir children are born into the same shadow. No bonding rite, no warrior status. Useful but invisible.\n\nTEMGAR: Result of an ivyless marriage. Grew up on the boundary of the Greymane Clan. Never meant to bond. Yet Meila found him anyway.\n\nHIS MOTHER: Given the choice on the mountain — become a Völugan or marry without blessing. She chose love over the scrolls, knowing the cost.", "tyramare-overview": "Venice meets Alexandria meets King’s Landing. A city of islands connected by waterways — canals threading between districts, gondolas gliding beneath arched bridges, flowers spilling from balconies.\n\nThe province includes both the island city (capital — name TBD) AND mainland territory.\n\nABOVE GROUND: Turquoise water reflecting golden buildings. Tree-lined canals. Marble and sunlight.\nBELOW GROUND: Catacombs. Carved stone pillars. Faded frescoes. Walls of skulls. Buried secrets and buried bodies.\n\nThe same city. The same ground. Just a few steps down.", "tyramare-districts": "THE SEVEN DISTRICTS:\n\nSPICE HARBOUR (Seat 1 — Trade) — The harbour, docks, markets. Salt air, spice, fish, tar. Where money enters.\n\nTHE MARBLE QUARTER (Seat 2 — Banking) — Cold, quiet, marble halls, guards. Vaults deeper than the catacombs. Every loan is a leash.\n\nTHE IRON QUARTER (Seat 3 — Military) — Occupied zone. Forges, patrols, barracks. Noble sons become commanders, common boys become fodder. Magic hunters operate here.\n\nTHE VEIL (Seat 4 — Pleasure) — Lanterns, music, perfume. Looks like paradise. IS hell. Beautiful people indentured. Magic users forced to serve. No escape.\n\nAURUMVALE (Seat 5 — Nobility) — Highest ground. Gated. Magic baked into everything. ONLY district name kept from the old days — a sign of prestige. The least powerful seat.\n\nSTILLHAVEN / THE SILENCE BELOW (Seat 6 — Underground) — ABOVE: Taverns, real life, common people’s home. BELOW: Entheras’s dirty money, buried secrets, disappeared people. Lìyǐn’s territory. Verenthae hide here.\n\nTHE SOLACE (Seat 7 — Faith) — The palace district. Grand temples, golden domes. The Entheras lives in the stolen Bannric palace.\n\nSENSORY GUIDE:\nSpice Harbour: salt, cinnamon, tar, fish\nMarble Quarter: cold stone, ink, nothing\nIron Quarter: forge smoke, horse sweat, blood\nThe Veil: jasmine, opium, perfume over something sour\nAurumvale: ozone/magic, orange blossom, old money\nStillhaven: ale, sawdust, cooking meat, life\nThe Solace: incense — sweet enough to make you forget it’s a prison", "tyramare-guildseats": "HOW EACH GUILD SEAT IS CLAIMED:\n\nSEAT 1 — SPICE HARBOUR: VOTED — but votes can be bought. Looks democratic. Quietly corrupt.\n\nSEAT 2 — MARBLE QUARTER: INHERITED — MATRIARCHAL. Oldest daughter of the first family. No daughter? One can be stolen. CRISIS: The first lady is old with no heir. Four families circling.\n\nSEAT 3 — IRON QUARTER: DEATH MATCH. Champions fight to the death. Last standing faces current holder. The one seat a common man can claim.\n\nSEAT 4 — THE VEIL: APPOINTED by the other five. Changed every two years. A puppet. A glass throne.\n\nSEAT 5 — AURUMVALE: INHERITED — same family since the Bannric fall. They carry MEMORY — buried loyalty to the crown.\n\nSEAT 6 — STILLHAVEN: KILLED FOR. Current holder: Lìyǐn’s agent. New, unknown, sly, watchful. The Entheras can’t read her.\n\nSEAT 7 — THE SOLACE: “DIVINE.” Public believes one immortal man for centuries. Truth: Yuèlì fragment.", "tyramare-entheras": "THE ENTHERAS — Supreme Leader of Solenthera\n\nTitle meaning: “The Inner Sanctum.” The hidden centre.\n\nSeventh guild seat. Most powerful voice. Almost always the deciding vote. When he speaks, ALL IS QUIET.\n\nHe KNOWS the faith is a tool. He is a deliberate follower of Yuèlì. A Shi Sect devotee in pope’s robes.\n\nHe has taken the PALACE — the ancestral home of the Bannric kings. He IS the king in everything but name.\n\nThe other guild masters DO NOT KNOW what he truly is.\n\nIMMORTALITY: He carries a fragment of Yuèlì. The people believe he is divinely preserved. The truth: he is a vessel holding a piece of a goddess.", "tyramare-faiths": "THE THREE FAITHS OF TYRAMARE:\n\nSOLENTHERA — The Public Faith (The Sun That Locks You In)\n“The Light Within.” Claims safety, guidance, prosperity. Truth: a weapon of control planted by the Shi Sect. Every ceremony feeds Yuèlì’s corruption. Temples feel safe — that’s what makes it effective.\n\nTHE UMBRATHI — The Dark Cult (The Shadow That Pulls You Down)\n“Shadow Prayer.” Yuèlì’s corruption rising from the catacombs. Recruits through GRIEF — finds people Solenthera failed. Spreads through the cracks Solenthera creates.\n\nTHE VERENTHAE — The Good Cult (The Truth That Sets You Free)\n“Truth Within Grace.” Followers of Yúnshēng. Saves magic for common people. Meets in cellars, back rooms, beside rivers at dawn. Creed: water finds the lowest point.\n\nLIGHT. SHADOW. TRUTH.\nThe sun that locks you in. The shadow that pulls you down. The truth that sets you free.", "tyramare-oranthi": "THE ORANTHI — Temple Priests of Solenthera\n\n“Those who speak for” — soft, warm, sounds almost like prayer.\n\nRun the temples. Charge fees for blessings, funerals, marriages, divination.\n\nMost Oranthi are NOT villains. They are true believers who joined to help people. They charge fees because “that’s how it’s always been done.”\n\nWhen the truth comes out, some will break. Some will fight for the guild. Some will turn.", "tyramare-underground": "STILLHAVEN — Lìyǐn’s territory.\n\nHis SECOND IN COMMAND holds the sixth seat — a woman who killed the previous holder. New, unknown, sly, watchful. She is Lìyǐn’s eyes, ears, and mouth.\n\nThe Entheras is unsettled — he can’t read her. For the first time in centuries, he doesn’t know what’s sitting across from him.\n\nTHE SILENCE BELOW: The Entheras’s dirty money. Hidden vaults. Buried secrets. Disappeared people. Lìyǐn’s network has mapped every tunnel, vault, and grave.\n\nTHE VERENTHAE operate in Stillhaven — protected by the district’s natural hostility to authority.", "tyramare-throne": "THE EMPTY BANNRIC THRONE:\n\nStill in the council chamber. Not hidden — LEFT THERE deliberately. The guild masters hold meetings around it. Its presence is a statement: “we sit here and no god strikes us down.”\n\nBut the throne is NOT empty. It is WAITING.\n\nZhúhuǒ exists — the Bannric heir with a phoenix god inside him.\nAria carries every bloodline without knowing it.\n\nThe Aurumvale family (Seat 5) may be the first to kneel when the heir comes. They carry MEMORY.", "tyramare-magic": "MAGIC IN TYRAMARE:\n\nMonopolised by the nobility. Common people denied access.\n\nIn Aurumvale: magic baked into everything — streetlamps, gardens, the air itself. While common children are enslaved for showing a spark.\n\nThe military hunts unsanctioned magic. In The Veil: magic users indentured to serve.\n\nThe Verenthae fight against this — giving magic freely to common people.", "fellowship-aria": "ARIA TYRAMARE — Age 16\nProphecy child. Born Aurumshì. Daughter of Zhúhuǒ and Mínhuì (doesn’t know). Convergence of ALL bloodlines.\nAuburn curly hair, green eyes, freckles. Steampunk artificer. Dyslexia & AuDHD.\nMechanical bird (accidental prophet, whispers “patience, soon”).\nWEAPONS: Elemental gun (channels any element as condensed magic bullets). Crystal daggers (made from Mínhuì’s own spirit — fan out and dance on air like fox tails, ride on wind).", "fellowship-yuean": "YUÈ’ÀN (月暗) — Age 20 (eldest)\nMoon shadow. Shadow Prince of Maramir. CREATED by Shi Sect / Yuèlì’s avatar. Son of Yuèlì. Five elements. Aria’s love/opposite.\nPale, silver-streaked black hair, mark between brows. All black robes, silver filigree mask.\nSilent, cold, calculating. Fights hunger/darkness constantly. Small piece of Yuèlì’s original love took root.\nWEAPONS: Shadow blades conjured from void — each use makes his shadow GROW larger (price = losing humanity). Aria and Gēnmù quiet his darkness.", "fellowship-xuehua": "XUĚHUĀ (雪花) — Age 17\nSnow flower. Four-tailed WHITE fox, Wen Sect (cast out). Trickster, seductive, flirty, impossibly nosy.\nFox form: pure white, pink-tipped tails. Human form: black hair with white/pink strands, golden amber eyes.\nInstant best friends with Aria. Fox instinct to protect Gēnmù. Recognises Aria’s daggers as fox spirit. Mistborne in spirit.", "fellowship-genmu": "GĒNMÙ (根木) — Age 14 (youngest)\nRoot and tree. Yan Sect (cast out). Healer of the LAND. Divine blood (earth twin’s line — Aria’s cousin).\nGolden-blonde hair, young, gentle. Wears heart on sleeve. Trees whisper, flowers sing, land loves him.\nQuiets Yuè’àn’s darkness. Fellowship’s emotional anchor. Aria and Xuěhuā fiercely protective.", "fellowship-temgar": "TEMGAR — Age 18-19\nIron spear. Isenholt, Greymane Clan (outcast). Mongolian-Norse blend. ICE BLUE eyes (unique — result of ivyless marriage, outcast from birth).\nBurly, sharp nose/senses, full of life. Beast-bonded to direwolf MEILA (matching ice eyes, found as broken pup — bond without rite, without permission).\nTwo swords. Big brother energy.\nHis bond challenges everything Isenholt believes — the bonding rite may not be necessary. The bond CHOOSES.", "fellowship-liyin": "LÌYǐN AURELIAN (丽隐) — Age 17 (going on 40)\nBeautiful shadow. Solisòpia. Water twin’s bloodline (Aria’s cousin). Raised in pleasure house by the water twin (madam).\nFlamboyant, loud performer hiding calculating mind. Spy network into Tyramare. Think Tyrion Lannister.\nDark curly hair, freckles, eyes flash gold. Byzantine-Chinese aesthetic, draped in gold.\nRUNS THE SIXTH SEAT OF TYRAMARE through his second in command. Controls Stillhaven and The Silence Below. Has been mapping the Entheras’s secrets.", "fellowship-parents": "KEY PARENTS:\n\nZHÚHUǒ (逐火) — Bannric heir, Fen Sect. Stern, conflicted, temper. Phoenix god (Fèngzhé) inside him. Doesn’t know Aria exists.\n\nMÍNHUÌ (明慧) — Nine-tailed sky fox god hiding in Aurumshì. Watches Aria from across markets. Made crystal daggers from own spirit — a piece of herself protecting her daughter.", "connections-shimoweb": "THE SHÍMÒ WEB — Worldwide Network:\n\nTHE FIVE FRAGMENT-CARRIERS AND THEIR DISCIPLINES:\n\n1. THE AVATAR (Aoli) — Master of Corruption. Runs the Shi Sect. Unmasked. The living proof. Corruption magic finds the crack in your soul and grows from within.\n2. THE SMILING BLADE (Solisòpia) — Master of Blades. Runs the pleasure quarter. Beautiful assassin. Smiles when he kills. Operates near the Water Twin.\n3. THE VEILED ADVISOR (Aurumshì) — Master of Blood Magic. Whispers in the ruling body's ear. Drains the people while they thank her. Operates near Mínhuì and Aria's birthplace.\n4. THE BLIND POISONER (Aoli/Travelling) — Master of Poisons. The connective tissue. Travels as a crone carrying messages between all five. Nobody suspects the old blind woman.\n5. THE ENTHERAS (Tyramare) — Master of Diplomats. Pope-king of Solenthera. Stolen Bannric palace. Lìyǐn is mapping his secrets.\n\nFIVE DISCIPLINES:\nPoisons — killing the body\nBlades — killing the person\nBlood Magic — killing the spirit\nDiplomacy — killing the truth\nCorruption — killing the soul\n\nWHEREVER THE FELLOWSHIP GOES, THE SHI SECT IS ALREADY THERE.\n\nIsenholt MAY be the exception — what do you plant in a land of mountain people who answer to no throne?"};

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Quicksand:wght@400;500;600&display=swap";

function WorldBible() {
  const [activeSection, setActiveSection] = useState("cosmology");
  const [entries, setEntries] = useState({});
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  const [wordCounts, setWordCounts] = useState({});
  const textareaRefs = useRef({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await window.storage.get("world-bible-entries");
        if (result && result.value) {
          const saved = JSON.parse(result.value);
          const merged = { ...INITIAL_ENTRIES, ...saved };
          setEntries(merged);
        } else {
          setEntries({ ...INITIAL_ENTRIES });
        }
      } catch (e) {
        console.log("Starting fresh with initial entries");
        setEntries({ ...INITIAL_ENTRIES });
      }
      setLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(async () => {
      try {
        setSaving(true);
        await window.storage.set("world-bible-entries", JSON.stringify(entries));
        setTimeout(() => setSaving(false), 800);
      } catch (e) { setSaving(false); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [entries, loaded]);

  useEffect(() => {
    const counts = {};
    SECTIONS.forEach((s) => {
      let total = 0;
      s.prompts.forEach((p) => { const t = entries[`${s.id}-${p.id}`] || ""; total += t.trim() ? t.trim().split(/\s+/).length : 0; });
      counts[s.id] = total;
    });
    setWordCounts(counts);
  }, [entries]);

  const handleChange = (sid, pid, val) => setEntries((prev) => ({ ...prev, [`${sid}-${pid}`]: val }));

  const getFilledCount = (sid) => {
    const s = SECTIONS.find((x) => x.id === sid);
    return s.prompts.filter((p) => (entries[`${sid}-${p.id}`] || "").trim().length > 0).length;
  };

  const totalFilled = SECTIONS.reduce((a, s) => a + getFilledCount(s.id), 0);
  const totalPrompts = SECTIONS.reduce((a, s) => a + s.prompts.length, 0);
  const totalWords = Object.values(wordCounts).reduce((a, b) => a + b, 0);
  const currentSection = SECTIONS.find((s) => s.id === activeSection);

  const autoResize = (el) => { if (el) { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; } };

  useEffect(() => { Object.values(textareaRefs.current).forEach(autoResize); }, [activeSection]);

  const handleExport = () => {
    let t = "═══════════════════════════════════════\n         THE WORLD BIBLE\n         Serina's Universe\n═══════════════════════════════════════\n\n";
    SECTIONS.forEach((s) => {
      t += `\n${"─".repeat(40)}\n${s.icon}  ${s.title.toUpperCase()}\n${s.subtitle}\n${"─".repeat(40)}\n\n`;
      s.prompts.forEach((p) => { const v = entries[`${s.id}-${p.id}`] || ""; t += `▸ ${p.label}\n${v.trim() ? v + "\n\n" : "[Not yet written]\n\n"}`; });
    });
    t += `\n${"═".repeat(40)}\nTotal words: ${totalWords}\nSections filled: ${totalFilled}/${totalPrompts}\n${"═".repeat(40)}\n`;
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([t], { type: "text/plain" })); a.download = "world-bible.txt"; a.click();
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to clear ALL entries? This cannot be undone.")) {
      setEntries({});
      try { await window.storage.delete("world-bible-entries"); } catch (e) {}
    }
  };

  if (!loaded) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(170deg, #f5efe6 0%, #ebe3d7 40%, #f0e8dc 100%)", fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#6b5a4a" }}>
      <link href={FONTS_LINK} rel="stylesheet" />
      <p style={{ fontSize: "1.3rem", fontStyle: "italic", opacity: 0.7 }}>Unrolling the scroll...</p>
    </div>
  );

  const sIdx = SECTIONS.findIndex((s) => s.id === activeSection);
  const prev = sIdx > 0 ? SECTIONS[sIdx - 1] : null;
  const next = sIdx < SECTIONS.length - 1 ? SECTIONS[sIdx + 1] : null;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(170deg, #f5efe6 0%, #ebe3d7 40%, #f0e8dc 100%)", fontFamily: "'Quicksand', 'Segoe UI', sans-serif", color: "#5a4a3a", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <link href={FONTS_LINK} rel="stylesheet" />
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0);opacity:.3} 50%{transform:translateY(-20px) rotate(5deg);opacity:.5} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 8px rgba(160,120,140,.06)} 50%{box-shadow:0 0 16px rgba(160,120,140,.12)} }
        @keyframes savePulse { 0%{opacity:1} 100%{opacity:0} }
        textarea:focus{outline:none;border-color:rgba(150,120,130,.4)!important;box-shadow:0 0 0 2px rgba(150,120,130,.1),inset 0 1px 3px rgba(0,0,0,.03)!important}
        textarea::placeholder{color:rgba(120,100,85,.38);font-style:italic}
        textarea::-webkit-scrollbar{width:6px} textarea::-webkit-scrollbar-track{background:transparent} textarea::-webkit-scrollbar-thumb{background:rgba(150,130,120,.2);border-radius:3px}
        .nav-btn:hover{background:rgba(150,120,130,.08)!important;transform:translateX(3px)}
        .nav-btn.active{background:rgba(150,120,130,.1)!important;border-left-color:rgba(170,120,140,.5)!important}
        .prompt-card{animation:fadeIn .4s ease forwards}
        .action-btn:hover{background:rgba(150,120,130,.1)!important;transform:translateY(-1px)}
        @media(max-width:768px){.sidebar-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.15);z-index:90}}
      `}</style>

      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ position:"fixed", width:12+i*4+"px", height:12+i*4+"px", borderRadius:"50% 0 50% 0",
          background: i%2===0 ? "radial-gradient(circle,rgba(200,150,160,.25),rgba(200,150,160,.05))" : "radial-gradient(circle,rgba(150,180,170,.2),rgba(150,180,170,.04))",
          top:(10+i*14)+"%", left:(5+i*16)+"%", animation:`float ${4+i*1.5}s ease-in-out infinite`, animationDelay:`${i*.8}s`, pointerEvents:"none", zIndex:0 }} />
      ))}

      <header style={{ padding:"24px 28px 20px", borderBottom:"1px solid rgba(160,130,140,.12)", position:"relative", zIndex:10, display:"flex", alignItems:"center", gap:"16px", flexShrink:0 }}>
        <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{ display:window.innerWidth<=768?"block":"none", background:"none", border:"1px solid rgba(150,130,120,.25)", color:"#5a4a3a", fontSize:"1.3rem", padding:"6px 10px", borderRadius:"8px", cursor:"pointer" }}>☰</button>
        <div style={{ flex:1 }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.5rem,4vw,2.2rem)", fontWeight:500, color:"#4a3a2e", margin:0, letterSpacing:".05em" }}>
            <span style={{ opacity:.4, marginRight:"10px" }}>文</span>The World Bible
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:".95rem", fontStyle:"italic", color:"rgba(100,80,65,.45)", margin:"4px 0 0" }}>Serina's Universe</p>
        </div>
        <div style={{ textAlign:"right", fontSize:".75rem", color:"rgba(110,90,75,.55)", position:"relative" }}>
          <div>{totalWords.toLocaleString()} words</div>
          <div>{totalFilled}/{totalPrompts} entries</div>
          {saving && <div style={{ position:"absolute", top:-18, right:0, fontSize:".65rem", color:"rgba(90,140,100,.8)", animation:"savePulse .8s ease forwards" }}>saved ✓</div>}
        </div>
      </header>

      <div style={{ display:"flex", flex:1, overflow:"hidden", position:"relative", zIndex:5 }}>
        {sidebarOpen && window.innerWidth<=768 && <div className="sidebar-overlay" onClick={()=>setSidebarOpen(false)} />}

        <nav style={{ width:"240px", minWidth:"240px", borderRight:"1px solid rgba(160,130,140,.08)", padding:"16px 12px", display:"flex", flexDirection:"column", gap:"4px", overflowY:"auto",
          ...(window.innerWidth<=768?{ position:"fixed", top:0, left:sidebarOpen?0:"-260px", bottom:0, background:"#f0e8dc", zIndex:95, transition:"left .3s ease", paddingTop:"80px" }:{}) }}>
          {SECTIONS.map((section) => {
            const filled = getFilledCount(section.id);
            const total = section.prompts.length;
            const isActive = activeSection === section.id;
            return (
              <button key={section.id} className={`nav-btn ${isActive?"active":""}`}
                onClick={()=>{setActiveSection(section.id);setSidebarOpen(false);setExpandedPrompt(null)}}
                style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", border:"none", borderLeft:"2px solid transparent", borderRadius:"0 8px 8px 0", background:"transparent", color:isActive?"#4a3a2e":"rgba(100,85,70,.55)", cursor:"pointer", transition:"all .25s ease", textAlign:"left", fontFamily:"'Quicksand',sans-serif", fontSize:".85rem", fontWeight:isActive?600:400, width:"100%" }}>
                <span style={{ fontSize:"1.1rem", width:"24px", textAlign:"center" }}>{section.icon}</span>
                <span style={{ flex:1 }}>{section.title}</span>
                <span style={{ fontSize:".65rem", padding:"2px 6px", borderRadius:"10px",
                  background: filled===total?"rgba(90,150,110,.12)":filled>0?"rgba(180,140,80,.1)":"rgba(140,130,120,.06)",
                  color: filled===total?"rgba(60,120,80,.85)":filled>0?"rgba(150,110,50,.75)":"rgba(130,115,100,.4)" }}>{filled}/{total}</span>
              </button>
            );
          })}
          <div style={{ flex:1 }} />
          <div style={{ display:"flex", flexDirection:"column", gap:"6px", padding:"12px 4px 4px", borderTop:"1px solid rgba(160,130,140,.08)", marginTop:"8px" }}>
            <button className="action-btn" onClick={handleExport} style={{ padding:"8px 14px", border:"1px solid rgba(150,130,120,.2)", borderRadius:"8px", background:"rgba(150,130,120,.05)", color:"rgba(90,75,60,.65)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".78rem", transition:"all .2s ease" }}>📄 Export as Text</button>
            <button className="action-btn" onClick={handleReset} style={{ padding:"8px 14px", border:"1px solid rgba(180,110,110,.18)", borderRadius:"8px", background:"transparent", color:"rgba(160,100,100,.5)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".72rem", transition:"all .2s ease" }}>Reset All</button>
          </div>
        </nav>

        <main style={{ flex:1, overflowY:"auto", padding:"clamp(20px,4vw,40px)" }}>
          <div style={{ marginBottom:"32px", animation:"fadeIn .5s ease" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:"12px", marginBottom:"6px" }}>
              <span style={{ fontSize:"2rem" }}>{currentSection.icon}</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1.6rem,3.5vw,2rem)", fontWeight:500, color:"#4a3a2e", margin:0 }}>{currentSection.title}</h2>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.05rem", fontStyle:"italic", color:"rgba(100,80,65,.45)", margin:"0 0 8px" }}>{currentSection.subtitle}</p>
            <p style={{ fontSize:".85rem", color:"rgba(100,85,70,.6)", margin:0, lineHeight:1.6, maxWidth:"640px" }}>{currentSection.description}</p>
            {wordCounts[activeSection]>0 && <div style={{ marginTop:"12px", fontSize:".72rem", color:"rgba(110,95,80,.45)" }}>{wordCounts[activeSection].toLocaleString()} words in this section</div>}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"16px", maxWidth:"720px" }}>
            {currentSection.prompts.map((prompt, index) => {
              const key = `${currentSection.id}-${prompt.id}`;
              const value = entries[key] || "";
              const hasContent = value.trim().length > 0;
              const isExpanded = expandedPrompt === key || hasContent;
              return (
                <div key={key} className="prompt-card" style={{ animationDelay:`${index*.07}s`, opacity:0, background:"rgba(255,252,248,.7)", border:`1px solid ${hasContent?"rgba(160,130,140,.18)":"rgba(185,175,165,.25)"}`, borderRadius:"12px", overflow:"hidden", transition:"border-color .3s ease", ...(hasContent?{animation:`fadeIn .4s ease ${index*.07}s forwards, pulseGlow 4s ease-in-out infinite`}:{}) }}>
                  <button onClick={()=>setExpandedPrompt(expandedPrompt===key?null:key)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"14px 18px", border:"none", background:"transparent", cursor:"pointer", color:hasContent?"#4a3a2e":"rgba(100,85,70,.5)", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.05rem", fontWeight:500, textAlign:"left" }}>
                    <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:hasContent?"rgba(90,150,110,.6)":"rgba(180,170,160,.3)", flexShrink:0, transition:"background .3s ease" }} />
                    <span style={{ flex:1 }}>{prompt.label}</span>
                    <span style={{ fontSize:".7rem", color:"rgba(120,100,85,.3)", transform:isExpanded?"rotate(180deg)":"rotate(0)", transition:"transform .25s ease" }}>▼</span>
                  </button>
                  {isExpanded && (
                    <div style={{ padding:"0 18px 16px" }}>
                      <textarea ref={(el)=>{textareaRefs.current[key]=el;if(el)autoResize(el)}} value={value}
                        onChange={(e)=>{handleChange(currentSection.id,prompt.id,e.target.value);autoResize(e.target)}}
                        placeholder={prompt.placeholder}
                        style={{ width:"100%", minHeight:"100px", padding:"14px 16px", border:"1px solid rgba(180,170,160,.3)", borderRadius:"8px", background:"rgba(255,255,252,.6)", color:"#4a3a2e", fontFamily:"'Quicksand',sans-serif", fontSize:".88rem", lineHeight:1.7, resize:"none", overflow:"hidden", transition:"border-color .3s ease,box-shadow .3s ease", boxSizing:"border-box" }} />
                      {hasContent && <div style={{ marginTop:"6px", fontSize:".65rem", color:"rgba(110,95,80,.4)", textAlign:"right" }}>{value.trim().split(/\s+/).length} words</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"40px", padding:"20px 0", borderTop:"1px solid rgba(160,130,140,.06)", maxWidth:"720px" }}>
            {prev ? <button className="action-btn" onClick={()=>{setActiveSection(prev.id);setExpandedPrompt(null)}} style={{ padding:"8px 16px", border:"1px solid rgba(150,130,120,.18)", borderRadius:"8px", background:"transparent", color:"rgba(100,85,70,.5)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".8rem", transition:"all .2s ease" }}>← {prev.icon} {prev.title}</button> : <div />}
            {next ? <button className="action-btn" onClick={()=>{setActiveSection(next.id);setExpandedPrompt(null)}} style={{ padding:"8px 16px", border:"1px solid rgba(150,130,120,.18)", borderRadius:"8px", background:"transparent", color:"rgba(100,85,70,.5)", cursor:"pointer", fontFamily:"'Quicksand',sans-serif", fontSize:".8rem", transition:"all .2s ease" }}>{next.icon} {next.title} →</button> : <div />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default WorldBible;
