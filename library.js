// DC: BEFORE THE AGE OF HEROES — ULTIMATE LIBRARY
// Fan-made AI Dungeon scenario script.
// Unlimited free-text selection: registry = reliability layer, never a whitelist.
// Designed around persistent state, four script hooks, dynamic Story Cards, and conservative continuity.

var DCBTH = (function(){
  "use strict";

  var PROFILE_DB = {
  "clark kent": {
    "display": "Clark Kent",
    "aliases": [
      "superman",
      "kal-el",
      "kal el"
    ],
    "cls": "born_extraordinary",
    "loc": "Smallville, Kansas or early Metropolis",
    "role": "young adult / reporter path depending chosen stage",
    "future": "Superman",
    "pre": "Kryptonian biology already exists; Superman identity, public reputation and mature heroic methods do not.",
    "catalyst": [
      "public rescue",
      "metropolis",
      "daily planet"
    ],
    "powers": [
      "strength",
      "flight",
      "heat vision",
      "x-ray vision",
      "super speed"
    ]
  },
  "bruce wayne": {
    "display": "Bruce Wayne",
    "aliases": [
      "batman"
    ],
    "cls": "self_made",
    "loc": "Gotham City",
    "role": "Wayne heir / returning traveller",
    "future": "Batman",
    "pre": "Parents are dead and extensive training may already exist; Batman, Bat-Signal, Robin network and mature cave operation do not.",
    "catalyst": [
      "bat",
      "gotham corruption",
      "disguise",
      "vigilante"
    ],
    "powers": []
  },
  "diana": {
    "display": "Diana of Themyscira",
    "aliases": [
      "wonder woman",
      "diana prince"
    ],
    "cls": "born_extraordinary",
    "loc": "Themyscira",
    "role": "Amazon princess",
    "future": "Wonder Woman",
    "pre": "Amazon identity and innate gifts exist; public Wonder Woman identity and man's-world reputation do not.",
    "catalyst": [
      "themyscira",
      "steve trevor",
      "man's world",
      "outside world"
    ],
    "powers": [
      "strength",
      "speed",
      "flight",
      "lasso"
    ]
  },
  "barry allen": {
    "display": "Barry Allen",
    "aliases": [
      "the flash",
      "flash"
    ],
    "cls": "transformed",
    "loc": "Central City",
    "role": "forensic scientist",
    "future": "The Flash",
    "pre": "No super-speed or Speed Force mastery before the defining accident.",
    "catalyst": [
      "lightning",
      "chemicals",
      "laboratory accident",
      "particle accelerator"
    ],
    "powers": [
      "super speed",
      "accelerated perception",
      "phasing",
      "speed force"
    ]
  },
  "hal jordan": {
    "display": "Hal Jordan",
    "aliases": [
      "green lantern"
    ],
    "cls": "chosen_bonded",
    "loc": "Coast City",
    "role": "test pilot",
    "future": "Green Lantern",
    "pre": "No power ring, Corps authority or ring mastery before Abin Sur's selection event.",
    "catalyst": [
      "abin sur",
      "power ring",
      "crash site",
      "green lantern ring"
    ],
    "powers": [
      "power ring",
      "constructs",
      "flight",
      "force field"
    ]
  },
  "john stewart": {
    "display": "John Stewart",
    "aliases": [
      "green lantern john stewart"
    ],
    "cls": "chosen_bonded",
    "loc": "Earth",
    "role": "architect / Marine background depending stage",
    "future": "Green Lantern",
    "pre": "Do not assume an active ring assignment until selection/recruitment occurs in play.",
    "catalyst": [
      "power ring",
      "guardian",
      "green lantern corps"
    ],
    "powers": [
      "power ring",
      "constructs",
      "flight"
    ],
    "deps": [
      "Green Lantern Corps contact with Earth"
    ],
    "legacyNote": "An earlier Earth Lantern can emerge first if the chosen route needs it."
  },
  "jessica cruz": {
    "display": "Jessica Cruz",
    "aliases": [
      "green lantern jessica cruz"
    ],
    "cls": "chosen_bonded",
    "loc": "Earth",
    "role": "civilian",
    "future": "Green Lantern",
    "pre": "No Green Lantern mastery or finished heroic identity before a ring-related origin occurs.",
    "catalyst": [
      "power ring",
      "ring",
      "green lantern corps"
    ],
    "powers": [
      "power ring",
      "constructs",
      "flight"
    ],
    "deps": [
      "Green Lantern Corps contact with Earth"
    ],
    "legacyNote": "Do not assume a mature Justice League or public Lantern history."
  },
  "arthur curry": {
    "display": "Arthur Curry",
    "aliases": [
      "aquaman"
    ],
    "cls": "born_extraordinary",
    "loc": "coastal Maine / Atlantis-linked world",
    "role": "young man of mixed surface/Atlantean heritage",
    "future": "Aquaman",
    "pre": "Atlantean traits may exist; throne, public Aquaman identity and established Justice League status do not.",
    "catalyst": [
      "atlantis",
      "ocean",
      "atlantean",
      "mera"
    ],
    "powers": [
      "underwater breathing",
      "strength",
      "marine communication"
    ]
  },
  "victor stone": {
    "display": "Victor Stone",
    "aliases": [
      "cyborg"
    ],
    "cls": "transformed",
    "loc": "United States",
    "role": "student / athlete depending stage",
    "future": "Cyborg",
    "pre": "Victor begins human; cybernetic reconstruction must follow a catastrophic event rather than being assumed.",
    "catalyst": [
      "accident",
      "silas stone",
      "cybernetic",
      "mother box"
    ],
    "powers": [
      "cybernetics",
      "interface",
      "sonic cannon"
    ]
  },
  "billy batson": {
    "display": "Billy Batson",
    "aliases": [
      "shazam",
      "captain marvel"
    ],
    "cls": "chosen_bonded",
    "loc": "Fawcett City / appropriate modern setting",
    "role": "young civilian",
    "future": "Shazam",
    "pre": "Billy cannot transform until the Wizard's choice occurs.",
    "catalyst": [
      "wizard",
      "rock of eternity",
      "shazam"
    ],
    "powers": [
      "transformation",
      "strength",
      "flight",
      "lightning"
    ],
    "deps": [
      "Wizard / Rock of Eternity selection"
    ]
  },
  "kara zor-el": {
    "display": "Kara Zor-El",
    "aliases": [
      "supergirl",
      "kara danvers"
    ],
    "cls": "born_extraordinary",
    "loc": "Krypton/space/Earth depending origin stage",
    "role": "Kryptonian survivor",
    "future": "Supergirl",
    "pre": "Kryptonian biology is innate; public Supergirl identity and polished mastery are not.",
    "catalyst": [
      "earth",
      "yellow sun",
      "krypton",
      "clark"
    ],
    "powers": [
      "strength",
      "flight",
      "heat vision",
      "super speed"
    ],
    "deps": [
      "Kryptonian/Earth arrival context"
    ],
    "legacyNote": "Clark may exist without being Superman. Kara’s identity cannot assume an established Superman unless this timeline earns one."
  },
  "dick grayson": {
    "display": "Dick Grayson",
    "aliases": [
      "robin dick grayson",
      "nightwing"
    ],
    "cls": "legacy",
    "loc": "Haly's Circus / Gotham",
    "role": "young acrobat",
    "future": "Robin / Nightwing",
    "pre": "The Flying Graysons and circus life matter; Robin and Nightwing identities do not yet exist for him.",
    "catalyst": [
      "flying graysons",
      "circus",
      "gotham",
      "bruce wayne"
    ],
    "powers": []
  },
  "jason todd": {
    "display": "Jason Todd",
    "aliases": [
      "robin jason todd",
      "red hood"
    ],
    "cls": "legacy",
    "loc": "Gotham City",
    "role": "street kid / young civilian",
    "future": "Robin / Red Hood",
    "pre": "No Robin training, death/resurrection history or Red Hood identity before those events happen.",
    "catalyst": [
      "gotham",
      "bruce wayne",
      "batmobile",
      "robin"
    ],
    "powers": [],
    "deps": [
      "Bruce Wayne becoming Batman"
    ],
    "legacyNote": "Jason cannot inherit Robin from a Batman who never existed. Bruce may emerge in parallel before the relevant mentorship stage."
  },
  "tim drake": {
    "display": "Tim Drake",
    "aliases": [
      "robin tim drake",
      "red robin"
    ],
    "cls": "legacy",
    "loc": "Gotham City",
    "role": "student / gifted young detective",
    "future": "Robin / Red Robin",
    "pre": "His intelligence may exist; Robin status and Bat-family membership are future possibilities.",
    "catalyst": [
      "detective",
      "bruce wayne",
      "dick grayson",
      "robin"
    ],
    "powers": [],
    "deps": [
      "Bruce Wayne becoming Batman",
      "Dick Grayson becoming an earlier Robin/Nightwing"
    ],
    "legacyNote": "Tim’s detective insight needs an earlier Batman/Robin history. Build that history in parallel rather than assuming it at turn one."
  },
  "damian wayne": {
    "display": "Damian Wayne",
    "aliases": [
      "robin damian wayne"
    ],
    "cls": "conditioned_created",
    "loc": "League of Assassins environment",
    "role": "heir raised by the League",
    "future": "Robin",
    "pre": "League training and lineage may predate play; Robin identity and relationship with an established Batman are not guaranteed.",
    "catalyst": [
      "talia",
      "league of assassins",
      "bruce wayne",
      "gotham"
    ],
    "powers": [],
    "deps": [
      "Bruce Wayne becoming Batman"
    ],
    "legacyNote": "Damian’s lineage can exist from the beginning; Robin requires a Batman-era foothold."
  },
  "barbara gordon": {
    "display": "Barbara Gordon",
    "aliases": [
      "batgirl",
      "oracle"
    ],
    "cls": "self_made",
    "loc": "Gotham City",
    "role": "student / librarian / computer expert depending stage",
    "future": "Batgirl / Oracle",
    "pre": "No Batgirl or Oracle identity at start unless player explicitly chose a later incarnation.",
    "catalyst": [
      "gotham",
      "costume",
      "vigilante",
      "gcpd"
    ],
    "powers": [],
    "deps": [
      "A Gotham vigilante/Batman foothold (for classic Batgirl route)"
    ],
    "legacyNote": "Barbara may become Gotham’s first costumed vigilante instead if played continuity diverges."
  },
  "cassandra cain": {
    "display": "Cassandra Cain",
    "aliases": [
      "batgirl cassandra cain",
      "orphan"
    ],
    "cls": "conditioned_created",
    "loc": "assassin-training world / Gotham approach",
    "role": "young fighter escaping a weaponised upbringing",
    "future": "Batgirl / Orphan",
    "pre": "Exceptional combat conditioning can already exist; Bat-family identity, language progress and chosen moral role must emerge through play.",
    "catalyst": [
      "david cain",
      "lady shiva",
      "gotham",
      "escape"
    ],
    "powers": [],
    "deps": [
      "Gotham vigilante network (for classic Bat-family route)"
    ],
    "legacyNote": "Her upbringing exists independently. Bat-family membership must be earned in this timeline."
  },
  "stephanie brown": {
    "display": "Stephanie Brown",
    "aliases": [
      "spoiler",
      "batgirl stephanie brown"
    ],
    "cls": "self_made",
    "loc": "Gotham City",
    "role": "student / Cluemaster's daughter",
    "future": "Spoiler / Robin / Batgirl",
    "pre": "No finished vigilante career at start; family conflict can motivate but cannot dictate her choices.",
    "catalyst": [
      "cluemaster",
      "gotham",
      "vigilante"
    ],
    "powers": [],
    "deps": [
      "Cluemaster conflict",
      "Gotham vigilante ecosystem (for classic legacy roles)"
    ]
  },
  "kate kane": {
    "display": "Kate Kane",
    "aliases": [
      "batwoman"
    ],
    "cls": "self_made",
    "loc": "Gotham City",
    "role": "former military cadet / wealthy civilian depending stage",
    "future": "Batwoman",
    "pre": "Training and resources may exist; Batwoman identity must be built.",
    "catalyst": [
      "gotham",
      "vigilante",
      "military",
      "costume"
    ],
    "powers": [],
    "deps": [
      "Gotham vigilante emergence (optional for classic inspiration)"
    ],
    "legacyNote": "Batwoman need not wait for Bruce if this timeline diverges."
  },
  "dinah lance": {
    "display": "Dinah Lance",
    "aliases": [
      "black canary"
    ],
    "cls": "born_extraordinary",
    "loc": "appropriate American city",
    "role": "fighter / civilian",
    "future": "Black Canary",
    "pre": "Combat skill may predate heroism; Canary Cry availability depends chosen continuity and should be discovered rather than assumed if uncertain.",
    "catalyst": [
      "canary",
      "vigilante",
      "cry"
    ],
    "powers": [
      "canary cry"
    ]
  },
  "oliver queen": {
    "display": "Oliver Queen",
    "aliases": [
      "green arrow"
    ],
    "cls": "self_made",
    "loc": "Star City / island origin path",
    "role": "wealthy heir",
    "future": "Green Arrow",
    "pre": "No established Green Arrow identity or trick-arrow arsenal; survival and archery development matter.",
    "catalyst": [
      "island",
      "shipwreck",
      "bow",
      "star city"
    ],
    "powers": []
  },
  "j'onn j'onzz": {
    "display": "J'onn J'onzz",
    "aliases": [
      "martian manhunter",
      "john jones"
    ],
    "cls": "cosmic",
    "loc": "Mars / Earth transition",
    "role": "Martian survivor",
    "future": "Martian Manhunter",
    "pre": "Martian abilities are innate; Earth detective identity and public heroic role are not.",
    "catalyst": [
      "mars",
      "teleport",
      "earth",
      "detective"
    ],
    "powers": [
      "telepathy",
      "shape-shifting",
      "intangibility",
      "flight",
      "strength"
    ]
  },
  "raven": {
    "display": "Raven",
    "aliases": [
      "rachel roth"
    ],
    "cls": "magical_occult",
    "loc": "Azarath / Earth transition",
    "role": "young empath with demonic heritage",
    "future": "Raven",
    "pre": "Her heritage and powers can exist before any Titans identity; control and relationships are still developing.",
    "catalyst": [
      "azarath",
      "trigon",
      "earth",
      "empathy"
    ],
    "powers": [
      "empathy",
      "soul-self",
      "magic"
    ]
  },
  "koriand'r": {
    "display": "Koriand'r",
    "aliases": [
      "starfire",
      "koriandr",
      "kori anders"
    ],
    "cls": "cosmic",
    "loc": "Tamaran / captivity / Earth approach depending stage",
    "role": "Tamaranean princess",
    "future": "Starfire",
    "pre": "Tamaranean biology exists; Earth hero status and Titans relationships do not.",
    "catalyst": [
      "tamaran",
      "citadel",
      "earth",
      "starbolt"
    ],
    "powers": [
      "flight",
      "starbolts",
      "strength"
    ]
  },
  "garfield logan": {
    "display": "Garfield Logan",
    "aliases": [
      "beast boy",
      "changeling"
    ],
    "cls": "transformed",
    "loc": "Africa / United States depending stage",
    "role": "young civilian",
    "future": "Beast Boy",
    "pre": "Shape-shifting requires the appropriate disease/treatment origin if beginning early enough.",
    "catalyst": [
      "disease",
      "treatment",
      "green skin",
      "animal"
    ],
    "powers": [
      "animal transformation"
    ]
  },
  "jaime reyes": {
    "display": "Jaime Reyes",
    "aliases": [
      "blue beetle jaime reyes",
      "blue beetle"
    ],
    "cls": "chosen_bonded",
    "loc": "El Paso, Texas",
    "role": "student",
    "future": "Blue Beetle",
    "pre": "No Scarab armour until the Scarab bonds with Jaime.",
    "catalyst": [
      "scarab",
      "khaji da",
      "blue beetle"
    ],
    "powers": [
      "scarab armor",
      "weapons",
      "flight"
    ],
    "deps": [
      "Reach Scarab arrival/bonding"
    ],
    "legacyNote": "Ted Kord may exist without being a public hero; the Blue Beetle mantle history can emerge separately."
  },
  "ted kord": {
    "display": "Ted Kord",
    "aliases": [
      "blue beetle ted kord"
    ],
    "cls": "legacy",
    "loc": "Chicago / Kord-linked setting",
    "role": "inventor / businessman",
    "future": "Blue Beetle",
    "pre": "Genius and athletic potential may exist; established Blue Beetle career and mature gadgets do not.",
    "catalyst": [
      "dan garrett",
      "kord",
      "blue beetle",
      "investigation"
    ],
    "powers": []
  },
  "michael jon carter": {
    "display": "Michael Jon Carter",
    "aliases": [
      "booster gold"
    ],
    "cls": "cosmic",
    "loc": "25th century / time-travel transition",
    "role": "museum worker / disgraced athlete depending stage",
    "future": "Booster Gold",
    "pre": "Future technology may become available through his origin, but no established modern hero celebrity exists at start.",
    "catalyst": [
      "time machine",
      "future",
      "museum",
      "21st century"
    ],
    "powers": []
  },
  "ronnie raymond": {
    "display": "Ronnie Raymond",
    "aliases": [
      "firestorm"
    ],
    "cls": "transformed",
    "loc": "United States",
    "role": "student",
    "future": "Firestorm",
    "pre": "No Firestorm matrix until the nuclear/quantum origin event and bonding occurs.",
    "catalyst": [
      "martin stein",
      "nuclear",
      "explosion",
      "firestorm matrix"
    ],
    "powers": [
      "transmutation",
      "flight",
      "energy"
    ]
  },
  "jefferson pierce": {
    "display": "Jefferson Pierce",
    "aliases": [
      "black lightning"
    ],
    "cls": "born_extraordinary",
    "loc": "Metropolis/Los Angeles depending continuity",
    "role": "educator / athlete",
    "future": "Black Lightning",
    "pre": "Electrical potential may be innate or tech-mediated by continuity; public Black Lightning identity does not exist.",
    "catalyst": [
      "electricity",
      "neighborhood",
      "school",
      "costume"
    ],
    "powers": [
      "electrokinesis"
    ]
  },
  "mari mccabe": {
    "display": "Mari McCabe",
    "aliases": [
      "vixen"
    ],
    "cls": "chosen_bonded",
    "loc": "Africa / United States depending stage",
    "role": "model / businesswoman depending stage",
    "future": "Vixen",
    "pre": "Tantu Totem and inherited history matter; experienced Vixen identity does not.",
    "catalyst": [
      "tantu totem",
      "totem",
      "animal"
    ],
    "powers": [
      "animal abilities"
    ]
  },
  "zatanna zatara": {
    "display": "Zatanna Zatara",
    "aliases": [
      "zatanna"
    ],
    "cls": "magical_occult",
    "loc": "stage-magic circuit / New York",
    "role": "stage magician",
    "future": "Zatanna",
    "pre": "Real magical heritage may predate play; mastery, occult responsibilities and heroic alliances are not automatically mature.",
    "catalyst": [
      "giovanni zatara",
      "magic",
      "backwards",
      "spell"
    ],
    "powers": [
      "magic"
    ]
  },
  "john constantine": {
    "display": "John Constantine",
    "aliases": [
      "constantine"
    ],
    "cls": "magical_occult",
    "loc": "United Kingdom",
    "role": "young occultist / musician depending stage",
    "future": "John Constantine",
    "pre": "Occult knowledge can already exist; later reputation, scars and network should arise from actual history.",
    "catalyst": [
      "newcastle",
      "occult",
      "demon",
      "ritual"
    ],
    "powers": []
  },
  "alec holland": {
    "display": "Alec Holland",
    "aliases": [
      "swamp thing"
    ],
    "cls": "transformed",
    "loc": "Louisiana swamp research site",
    "role": "scientist",
    "future": "Swamp Thing",
    "pre": "Alec begins human if using the classic origin stage; transformation follows the swamp disaster.",
    "catalyst": [
      "swamp",
      "explosion",
      "bio-restorative",
      "fire"
    ],
    "powers": [
      "plant body",
      "regeneration",
      "the green"
    ]
  },
  "harleen quinzel": {
    "display": "Dr. Harleen Quinzel",
    "aliases": [
      "harley quinn"
    ],
    "cls": "fall_villain",
    "loc": "Gotham City",
    "role": "psychiatrist",
    "future": "Harley Quinn (possible, not inevitable)",
    "pre": "Harleen is a professional person before Harley; Joker-related corruption is not fate and may never occur.",
    "catalyst": [
      "arkham",
      "joker",
      "patient",
      "gotham"
    ],
    "powers": []
  },
  "pamela isley": {
    "display": "Pamela Isley",
    "aliases": [
      "poison ivy"
    ],
    "cls": "transformed",
    "loc": "Gotham / botanical research setting",
    "role": "botanist / scientist",
    "future": "Poison Ivy",
    "pre": "Begin before completed plant-based transformation when possible; scientific life and exploitation should matter.",
    "catalyst": [
      "experiment",
      "botanical",
      "toxins",
      "plants",
      "woodrue"
    ],
    "powers": [
      "plant control",
      "toxins",
      "pheromones"
    ]
  },
  "selina kyle": {
    "display": "Selina Kyle",
    "aliases": [
      "catwoman"
    ],
    "cls": "self_made",
    "loc": "Gotham City",
    "role": "survivor / thief path depending stage",
    "future": "Catwoman",
    "pre": "Athleticism and survival skills may exist; Catwoman identity, suit and reputation must develop.",
    "catalyst": [
      "theft",
      "gotham",
      "cat",
      "costume"
    ],
    "powers": []
  },
  "slade wilson": {
    "display": "Slade Wilson",
    "aliases": [
      "deathstroke",
      "deathstroke the terminator"
    ],
    "cls": "conditioned_created",
    "loc": "military setting",
    "role": "soldier",
    "future": "Deathstroke",
    "pre": "Military skill can be elite; experimental enhancement and mercenary identity must occur if starting pre-origin.",
    "catalyst": [
      "experiment",
      "military",
      "adeline",
      "enhancement"
    ],
    "powers": [
      "enhanced reflexes",
      "healing"
    ]
  },
  "floyd lawton": {
    "display": "Floyd Lawton",
    "aliases": [
      "deadshot"
    ],
    "cls": "self_made",
    "loc": "Gotham / appropriate criminal setting",
    "role": "marksman",
    "future": "Deadshot",
    "pre": "Exceptional shooting may exist; Deadshot armour, criminal reputation and Suicide Squad history do not.",
    "catalyst": [
      "marksman",
      "gotham",
      "assassin",
      "mask"
    ],
    "powers": []
  },
  "teth-adam": {
    "display": "Teth-Adam",
    "aliases": [
      "black adam"
    ],
    "cls": "chosen_bonded",
    "loc": "ancient Kahndaq",
    "role": "enslaved/ancient Kahndaqi depending continuity",
    "future": "Black Adam",
    "pre": "Begin before or around the magical empowerment appropriate to the chosen continuity, not as an established modern ruler by default.",
    "catalyst": [
      "wizard",
      "kahndaq",
      "shazam",
      "power"
    ],
    "powers": [
      "transformation",
      "strength",
      "flight",
      "lightning"
    ]
  },
  "lex luthor": {
    "display": "Lex Luthor",
    "aliases": [
      "lex"
    ],
    "cls": "self_made",
    "loc": "Metropolis",
    "role": "scientist / entrepreneur",
    "future": "Lex Luthor",
    "pre": "Lex can be brilliant and ambitious before Superman; do not assume a Superman obsession or supervillain status before evidence creates it.",
    "catalyst": [
      "lexcorp",
      "metropolis",
      "alien",
      "superman"
    ],
    "powers": []
  },
  "edward nygma": {
    "display": "Edward Nygma",
    "aliases": [
      "riddler",
      "edward nashton"
    ],
    "cls": "fall_villain",
    "loc": "Gotham City",
    "role": "puzzle-obsessed civilian / professional",
    "future": "Riddler (possible)",
    "pre": "No established Riddler crime career or Batman rivalry at start.",
    "catalyst": [
      "riddle",
      "gotham",
      "crime",
      "puzzle"
    ],
    "powers": []
  },
  "victor fries": {
    "display": "Dr. Victor Fries",
    "aliases": [
      "mr freeze",
      "mister freeze"
    ],
    "cls": "transformed",
    "loc": "Gotham City",
    "role": "cryogenic scientist",
    "future": "Mr. Freeze",
    "pre": "Victor is human; Nora and cryogenic research matter before the accident and suit dependence.",
    "catalyst": [
      "nora",
      "cryogenic",
      "accident",
      "freeze"
    ],
    "powers": [
      "cold survival"
    ]
  },
  "harvey dent": {
    "display": "Harvey Dent",
    "aliases": [
      "two-face",
      "two face"
    ],
    "cls": "fall_villain",
    "loc": "Gotham City",
    "role": "prosecutor / district attorney path",
    "future": "Two-Face (possible)",
    "pre": "Harvey begins before disfigurement and criminal identity. Two-Face is preventable.",
    "catalyst": [
      "courtroom",
      "acid",
      "maroni",
      "district attorney"
    ],
    "powers": []
  },
  "bane": {
    "display": "Bane",
    "aliases": [],
    "cls": "conditioned_created",
    "loc": "Santa Prisca",
    "role": "prison-raised strategist/fighter",
    "future": "Bane",
    "pre": "Prison upbringing may already shape him; Venom use and Gotham obsession are not automatically complete.",
    "catalyst": [
      "pena duro",
      "venom",
      "experiment",
      "gotham"
    ],
    "powers": [
      "enhanced strength"
    ]
  },
  "waylon jones": {
    "display": "Waylon Jones",
    "aliases": [
      "killer croc"
    ],
    "cls": "born_extraordinary",
    "loc": "United States / Gotham path",
    "role": "marginalised young man",
    "future": "Killer Croc",
    "pre": "Physical condition may be innate/progressive; criminal identity and Gotham reputation are not inevitable.",
    "catalyst": [
      "gotham",
      "croc",
      "circus",
      "crime"
    ],
    "powers": [
      "strength",
      "durability"
    ]
  },
  "jean-paul valley": {
    "display": "Jean-Paul Valley",
    "aliases": [
      "azrael",
      "jean paul valley"
    ],
    "cls": "conditioned_created",
    "loc": "Gotham / Order of St. Dumas orbit",
    "role": "young civilian with hidden conditioning",
    "future": "Azrael",
    "pre": "The Order, family history and System may exist; completed Azrael identity, equipment and Batman replacement history do not.",
    "catalyst": [
      "order of st. dumas",
      "st dumas",
      "system",
      "father",
      "azrael"
    ],
    "powers": []
  },
  "daniel cassidy": {
    "display": "Daniel Cassidy",
    "aliases": [
      "blue devil"
    ],
    "cls": "transformed",
    "loc": "film production setting",
    "role": "stunt performer / special-effects professional",
    "future": "Blue Devil",
    "pre": "Daniel begins human; the Blue Devil production persona/suit may precede supernatural transformation depending continuity.",
    "catalyst": [
      "blue devil suit",
      "nebiros",
      "demon",
      "film set",
      "transformation"
    ],
    "powers": [
      "strength",
      "durability",
      "mystic trident"
    ]
  },
  "rory regan": {
    "display": "Rory Regan",
    "aliases": [
      "ragman"
    ],
    "cls": "magical_occult",
    "loc": "Gotham City",
    "role": "rag-and-curio shopkeeper / civilian",
    "future": "Ragman",
    "pre": "Rory begins before fully assuming the Suit of Souls and mature Ragman role.",
    "catalyst": [
      "suit of souls",
      "ragman",
      "rags",
      "souls"
    ],
    "powers": [
      "suit of souls"
    ]
  },
  "boston brand": {
    "display": "Boston Brand",
    "aliases": [
      "deadman"
    ],
    "cls": "transformed",
    "loc": "traveling circus",
    "role": "aerialist",
    "future": "Deadman",
    "pre": "Boston begins alive; ghostly existence follows his murder and Rama Kushna's intervention.",
    "catalyst": [
      "circus",
      "murder",
      "rama kushna",
      "ghost"
    ],
    "powers": [
      "possession",
      "intangibility",
      "invisibility"
    ]
  },
  "patrick o'brian": {
    "display": "Patrick O'Brian",
    "aliases": [
      "plastic man",
      "eel o'brian",
      "eel obrian"
    ],
    "cls": "transformed",
    "loc": "criminal underworld",
    "role": "small-time criminal",
    "future": "Plastic Man",
    "pre": "No elastic body until the chemical accident; reform is a choice, not automatic.",
    "catalyst": [
      "chemical",
      "acid",
      "factory",
      "gang"
    ],
    "powers": [
      "elasticity",
      "shape-shifting"
    ]
  },
  "michael holt": {
    "display": "Michael Holt",
    "aliases": [
      "mister terrific",
      "mr terrific"
    ],
    "cls": "self_made",
    "loc": "United States",
    "role": "polymath / entrepreneur",
    "future": "Mister Terrific",
    "pre": "Genius and athletic achievements may predate heroism; T-Spheres and finished Mister Terrific identity must be developed.",
    "catalyst": [
      "t-sphere",
      "fair play",
      "technology",
      "loss"
    ],
    "powers": []
  },
  "vic sage": {
    "display": "Vic Sage",
    "aliases": [
      "the question",
      "question vic sage"
    ],
    "cls": "self_made",
    "loc": "Hub City",
    "role": "investigative journalist",
    "future": "The Question",
    "pre": "Journalistic obsession can exist; faceless vigilante methods and identity must develop.",
    "catalyst": [
      "hub city",
      "investigation",
      "pseudoderm",
      "mask"
    ],
    "powers": []
  },
  "renee montoya": {
    "display": "Renee Montoya",
    "aliases": [
      "question renee montoya",
      "the question renee"
    ],
    "cls": "legacy",
    "loc": "Gotham City",
    "role": "police detective",
    "future": "The Question",
    "pre": "Renee begins as herself; inheriting the Question identity requires the relevant relationship/history to occur in this new continuity.",
    "catalyst": [
      "vic sage",
      "question",
      "gotham",
      "investigation"
    ],
    "powers": [],
    "deps": [
      "Vic Sage / Question legacy for classic succession route"
    ],
    "legacyNote": "Renee can exist and develop independently; inheriting The Question is not automatic."
  },
  "helena bertinelli": {
    "display": "Helena Bertinelli",
    "aliases": [
      "huntress"
    ],
    "cls": "self_made",
    "loc": "Gotham City",
    "role": "survivor of a crime-family background",
    "future": "Huntress",
    "pre": "Family trauma and training may exist; Huntress identity and Bat-family relationship do not.",
    "catalyst": [
      "mafia",
      "gotham",
      "crossbow",
      "huntress"
    ],
    "powers": []
  },
  "buddy baker": {
    "display": "Buddy Baker",
    "aliases": [
      "animal man"
    ],
    "cls": "transformed",
    "loc": "United States",
    "role": "actor / family man depending stage",
    "future": "Animal Man",
    "pre": "Animal powers require the appropriate alien/field origin if beginning early enough; established hero career does not.",
    "catalyst": [
      "alien",
      "yellow aliens",
      "animal powers",
      "morphogenetic"
    ],
    "powers": [
      "animal abilities"
    ]
  },
  "adam strange": {
    "display": "Adam Strange",
    "aliases": [],
    "cls": "cosmic",
    "loc": "Earth / Rann transition",
    "role": "archaeologist",
    "future": "Adam Strange",
    "pre": "No established Rann hero status until the Zeta Beam encounter and subsequent choices.",
    "catalyst": [
      "zeta beam",
      "rann",
      "alanna",
      "archaeology"
    ],
    "powers": []
  },
  "scott free": {
    "display": "Scott Free",
    "aliases": [
      "mister miracle",
      "mr miracle"
    ],
    "cls": "cosmic",
    "loc": "Apokolips",
    "role": "New God raised under Apokoliptian control",
    "future": "Mister Miracle",
    "pre": "New God identity and escape skills may develop under captivity; Earth celebrity/hero status and mature partnership are not assumed.",
    "catalyst": [
      "apokolips",
      "escape",
      "granny goodness",
      "earth"
    ],
    "powers": []
  },
  "barda free": {
    "display": "Big Barda",
    "aliases": [
      "barda",
      "big barda"
    ],
    "cls": "cosmic",
    "loc": "Apokolips",
    "role": "Female Fury / warrior path",
    "future": "Big Barda",
    "pre": "New God physiology and combat training can exist; defection, Earth life and relationship with Scott must happen in play.",
    "catalyst": [
      "apokolips",
      "female furies",
      "scott free",
      "defect"
    ],
    "powers": [
      "strength",
      "durability"
    ]
  },
  "jason blood": {
    "display": "Jason Blood",
    "aliases": [
      "etrigan",
      "etrigan the demon"
    ],
    "cls": "magical_occult",
    "loc": "Camelot / later eras depending stage",
    "role": "human bound to a demon",
    "future": "Jason Blood / Etrigan",
    "pre": "If beginning before the binding, Etrigan is not yet attached; if after, the binding exists but later heroic history does not.",
    "catalyst": [
      "merlin",
      "etrigan",
      "camelot",
      "binding"
    ],
    "powers": [
      "demon transformation",
      "hellfire"
    ]
  },
  "kent nelson": {
    "display": "Kent Nelson",
    "aliases": [
      "doctor fate",
      "dr fate"
    ],
    "cls": "chosen_bonded",
    "loc": "archaeological expedition / Tower-of-Fate path",
    "role": "young archaeologist's son / adult archaeologist depending stage",
    "future": "Doctor Fate",
    "pre": "No full Doctor Fate role until Nabu/Helmet origin occurs.",
    "catalyst": [
      "nabu",
      "helmet of fate",
      "tomb",
      "tower of fate"
    ],
    "powers": [
      "sorcery",
      "helmet of fate"
    ]
  },
  "jack ryder": {
    "display": "Jack Ryder",
    "aliases": [
      "creeper",
      "the creeper"
    ],
    "cls": "transformed",
    "loc": "Gotham City",
    "role": "journalist / television personality",
    "future": "The Creeper",
    "pre": "Jack begins human; transformation technology/chemistry must occur in play.",
    "catalyst": [
      "ryder",
      "device",
      "serum",
      "creeper"
    ],
    "powers": [
      "strength",
      "agility",
      "healing"
    ]
  },
  "rex mason": {
    "display": "Rex Mason",
    "aliases": [
      "metamorpho"
    ],
    "cls": "transformed",
    "loc": "adventure / archaeology setting",
    "role": "adventurer",
    "future": "Metamorpho",
    "pre": "Rex begins human; Orb-of-Ra related transformation is a future event.",
    "catalyst": [
      "orb of ra",
      "meteorite",
      "egypt",
      "simon stagg"
    ],
    "powers": [
      "elemental transformation",
      "shape-shifting"
    ]
  },
  "tatsu yamashiro": {
    "display": "Tatsu Yamashiro",
    "aliases": [
      "katana"
    ],
    "cls": "self_made",
    "loc": "Japan",
    "role": "young adult / martial artist",
    "future": "Katana",
    "pre": "Martial skill and family life come first; Soultaker, tragedy and vigilante identity must occur in play if starting early.",
    "catalyst": [
      "soultaker",
      "maseo",
      "takeo",
      "sword"
    ],
    "powers": []
  },
  "christopher smith": {
    "display": "Christopher Smith",
    "aliases": [
      "peacemaker"
    ],
    "cls": "self_made",
    "loc": "United States",
    "role": "civilian / military-linked path",
    "future": "Peacemaker",
    "pre": "No established armored peace-enforcement identity or government-team history at start.",
    "catalyst": [
      "helmet",
      "peace",
      "military",
      "vigilante"
    ],
    "powers": []
  },
  "adrian chase": {
    "display": "Adrian Chase",
    "aliases": [
      "vigilante"
    ],
    "cls": "fall_villain",
    "loc": "New York / appropriate legal setting",
    "role": "prosecutor",
    "future": "Vigilante",
    "pre": "Begin before the personal tragedy and masked campaign; his eventual methods are not inevitable.",
    "catalyst": [
      "prosecutor",
      "family",
      "crime",
      "vigilante"
    ],
    "powers": []
  },
  "amanda waller": {
    "display": "Amanda Waller",
    "aliases": [
      "the wall"
    ],
    "cls": "self_made",
    "loc": "United States",
    "role": "civilian / government path",
    "future": "Amanda Waller",
    "pre": "No fully established Task Force X empire at start; influence must be built through politics, intelligence and leverage.",
    "catalyst": [
      "government",
      "task force x",
      "argus",
      "intelligence"
    ],
    "powers": []
  },
  "virgil hawkins": {
    "display": "Virgil Hawkins",
    "aliases": [
      "static",
      "static shock"
    ],
    "cls": "transformed",
    "loc": "Dakota City",
    "role": "student",
    "future": "Static",
    "pre": "No electromagnetic powers before the Big Bang event or equivalent origin.",
    "catalyst": [
      "big bang",
      "quantum vapor",
      "dakota",
      "gas"
    ],
    "powers": [
      "electromagnetism",
      "flight"
    ]
  },
  "augustus freeman": {
    "display": "Augustus Freeman",
    "aliases": [
      "icon"
    ],
    "cls": "cosmic",
    "loc": "United States",
    "role": "long-lived alien living as a human professional",
    "future": "Icon",
    "pre": "Alien physiology and long life may exist; public Icon identity does not.",
    "catalyst": [
      "rocket",
      "raquel ervin",
      "alien",
      "hero"
    ],
    "powers": [
      "strength",
      "flight",
      "durability"
    ]
  },
  "raquel ervin": {
    "display": "Raquel Ervin",
    "aliases": [
      "rocket"
    ],
    "cls": "self_made",
    "loc": "Dakota City",
    "role": "teenage writer / civilian",
    "future": "Rocket",
    "pre": "No inertia belt or superhero partnership before she encounters Augustus and chooses a path.",
    "catalyst": [
      "augustus freeman",
      "inertia belt",
      "icon",
      "dakota"
    ],
    "powers": []
  },
  "curtis metcalf": {
    "display": "Curtis Metcalf",
    "aliases": [
      "hardware"
    ],
    "cls": "self_made",
    "loc": "Dakota City",
    "role": "brilliant engineer",
    "future": "Hardware",
    "pre": "Genius and corporate conflict may exist; powered armor and vigilante campaign must be created.",
    "catalyst": [
      "alva",
      "armor",
      "dakota",
      "hardware"
    ],
    "powers": []
  },
  "derek james": {
    "display": "Derek James",
    "aliases": [
      "sideways"
    ],
    "cls": "transformed",
    "loc": "Gotham City",
    "role": "student",
    "future": "Sideways",
    "pre": "No dimensional rift powers before the relevant cosmic event.",
    "catalyst": [
      "dark multiverse",
      "rift",
      "dimension",
      "gotham"
    ],
    "powers": [
      "rifts",
      "teleportation"
    ]
  },
  "duke thomas": {
    "display": "Duke Thomas",
    "aliases": [
      "the signal",
      "signal"
    ],
    "cls": "legacy",
    "loc": "Gotham City",
    "role": "student / young Gotham citizen",
    "future": "The Signal",
    "pre": "No Bat-family role or Signal equipment at start; metahuman traits, if used, should emerge according to chosen continuity.",
    "catalyst": [
      "gotham",
      "bruce wayne",
      "signal",
      "light"
    ],
    "powers": [
      "photokinetic perception"
    ]
  },
  "wally west": {
    "display": "Wally West",
    "aliases": [
      "kid flash",
      "flash wally west"
    ],
    "cls": "transformed",
    "loc": "Blue Valley / Central City orbit",
    "role": "student",
    "future": "Kid Flash / Flash",
    "pre": "No super-speed until his own accident/origin occurs; Barry does not have to be the Flash yet in this continuity.",
    "catalyst": [
      "lightning",
      "chemicals",
      "barry allen",
      "speed"
    ],
    "powers": [
      "super speed",
      "speed force"
    ],
    "deps": [
      "Barry Allen / an earlier Flash legacy foothold"
    ],
    "legacyNote": "Wally’s classic path depends on an earlier Flash. Seed that prerequisite as a parallel thread; do not start with a mature Flash world."
  },
  "roy harper": {
    "display": "Roy Harper",
    "aliases": [
      "speedy",
      "arsenal",
      "red arrow"
    ],
    "cls": "legacy",
    "loc": "United States",
    "role": "young archer",
    "future": "Speedy / Arsenal",
    "pre": "Archery background may exist; partnership with Green Arrow and later identities are not guaranteed.",
    "catalyst": [
      "oliver queen",
      "archery",
      "green arrow"
    ],
    "powers": [],
    "deps": [
      "Oliver Queen / Green Arrow foothold for classic Speedy route"
    ]
  },
  "donna troy": {
    "display": "Donna Troy",
    "aliases": [
      "wonder girl",
      "troia"
    ],
    "cls": "legacy",
    "loc": "Themyscira / Earth depending chosen origin",
    "role": "young woman with disputed/complex origin",
    "future": "Wonder Girl / Troia",
    "pre": "Use one coherent origin interpretation; do not mix contradictory Donna origins at once.",
    "catalyst": [
      "themyscira",
      "diana",
      "titans"
    ],
    "powers": [
      "strength",
      "flight"
    ],
    "deps": [
      "Themyscira/Wonder Woman legacy context"
    ],
    "legacyNote": "Resolve incarnation conservatively because Donna’s published origins vary."
  },
  "cassie sandsmark": {
    "display": "Cassie Sandsmark",
    "aliases": [
      "wonder girl cassie",
      "wonder girl"
    ],
    "cls": "legacy",
    "loc": "archaeology / Themyscira-linked setting",
    "role": "student",
    "future": "Wonder Girl",
    "pre": "No mature heroic identity or Titans history; divine/artefact power source should follow the chosen coherent origin.",
    "catalyst": [
      "zeus",
      "artefact",
      "diana",
      "wonder woman"
    ],
    "powers": [
      "strength",
      "flight"
    ],
    "deps": [
      "Wonder Woman/Amazon public contact for classic Wonder Girl path"
    ]
  },
  "garth": {
    "display": "Garth",
    "aliases": [
      "tempest",
      "aqualad garth"
    ],
    "cls": "born_extraordinary",
    "loc": "Atlantis",
    "role": "young Atlantean",
    "future": "Aqualad / Tempest",
    "pre": "Atlantean traits exist; partnership with Aquaman and Tempest identity are future possibilities.",
    "catalyst": [
      "atlantis",
      "arthur curry",
      "magic"
    ],
    "powers": [
      "underwater breathing",
      "strength",
      "sorcery"
    ],
    "deps": [
      "Atlantean/Aquaman legacy context"
    ]
  },
  "jackson hyde": {
    "display": "Jackson Hyde",
    "aliases": [
      "aqualad jackson hyde",
      "kaldur'ahm",
      "kaldur"
    ],
    "cls": "born_extraordinary",
    "loc": "surface world / Atlantis-linked setting",
    "role": "young man with Atlantean heritage",
    "future": "Aqualad",
    "pre": "Heritage and latent abilities may exist; public hero identity and team history do not.",
    "catalyst": [
      "atlantis",
      "black manta",
      "water bearer"
    ],
    "powers": [
      "hydrokinesis",
      "strength"
    ],
    "deps": [
      "Atlantean/Aquaman world contact"
    ]
  },
  "mera": {
    "display": "Mera",
    "aliases": [],
    "cls": "born_extraordinary",
    "loc": "Xebel / Atlantis-linked realm",
    "role": "royal/warrior",
    "future": "Mera",
    "pre": "Atlantean/Xebellian powers and status may exist; marriage, queenship and Justice League ties are not assumed.",
    "catalyst": [
      "xebel",
      "atlantis",
      "arthur curry"
    ],
    "powers": [
      "hydrokinesis",
      "strength"
    ]
  },
  "oswald cobblepot": {
    "display": "Oswald Cobblepot",
    "aliases": [
      "penguin",
      "the penguin"
    ],
    "cls": "fall_villain",
    "loc": "Gotham City",
    "role": "social climber / businessman",
    "future": "Penguin",
    "pre": "Do not begin with a fully established Iceberg Lounge criminal empire unless a later start is explicitly chosen.",
    "catalyst": [
      "gotham",
      "iceberg",
      "crime",
      "umbrella"
    ],
    "powers": []
  },
  "jonathan crane": {
    "display": "Jonathan Crane",
    "aliases": [
      "scarecrow"
    ],
    "cls": "fall_villain",
    "loc": "Gotham City",
    "role": "psychologist / fear researcher",
    "future": "Scarecrow",
    "pre": "Academic fixation may exist; fear-toxin supervillain identity must develop.",
    "catalyst": [
      "fear toxin",
      "university",
      "gotham",
      "scarecrow"
    ],
    "powers": []
  },
  "basil karlo": {
    "display": "Basil Karlo",
    "aliases": [
      "clayface"
    ],
    "cls": "transformed",
    "loc": "Gotham City",
    "role": "actor",
    "future": "Clayface",
    "pre": "Begin human before the transformation appropriate to this incarnation.",
    "catalyst": [
      "clayface",
      "chemical",
      "film",
      "transformation"
    ],
    "powers": [
      "shape-shifting"
    ]
  },
  "kirk langstrom": {
    "display": "Dr. Kirk Langstrom",
    "aliases": [
      "man-bat",
      "man bat"
    ],
    "cls": "transformed",
    "loc": "Gotham City",
    "role": "zoologist / scientist",
    "future": "Man-Bat",
    "pre": "Kirk begins human; bat-serum transformation is not yet complete.",
    "catalyst": [
      "bat serum",
      "serum",
      "bat",
      "transformation"
    ],
    "powers": [
      "bat transformation",
      "flight",
      "strength"
    ]
  },
  "roman sionis": {
    "display": "Roman Sionis",
    "aliases": [
      "black mask"
    ],
    "cls": "fall_villain",
    "loc": "Gotham City",
    "role": "wealthy heir / businessman",
    "future": "Black Mask",
    "pre": "No established crime lord identity or false-face empire at start.",
    "catalyst": [
      "mask",
      "gotham",
      "crime family",
      "sionis"
    ],
    "powers": []
  },
  "thomas elliot": {
    "display": "Dr. Thomas Elliot",
    "aliases": [
      "hush"
    ],
    "cls": "fall_villain",
    "loc": "Gotham / medical career",
    "role": "surgeon",
    "future": "Hush",
    "pre": "His history with Bruce may exist; Hush identity and elaborate campaign do not.",
    "catalyst": [
      "bruce wayne",
      "gotham",
      "surgeon",
      "hush"
    ],
    "powers": []
  },
  "eobard thawne": {
    "display": "Eobard Thawne",
    "aliases": [
      "reverse-flash",
      "reverse flash",
      "professor zoom"
    ],
    "cls": "transformed",
    "loc": "future Central City",
    "role": "historian/scientist depending continuity",
    "future": "Reverse-Flash",
    "pre": "Do not begin with complete negative-Speed-Force mastery or a finished obsession unless the player explicitly chooses a later origin stage.",
    "catalyst": [
      "flash",
      "speed force",
      "future",
      "time travel"
    ],
    "powers": [
      "super speed",
      "time travel"
    ],
    "deps": [
      "A future/public Flash legacy"
    ],
    "legacyNote": "Temporal character: the prerequisite may exist in Eobard’s native future even while the present-day Heroic Age is at zero."
  },
  "leonard snart": {
    "display": "Leonard Snart",
    "aliases": [
      "captain cold"
    ],
    "cls": "self_made",
    "loc": "Central City",
    "role": "criminal",
    "future": "Captain Cold",
    "pre": "No perfected cold gun, Rogues leadership or Flash rivalry before those are established.",
    "catalyst": [
      "cold gun",
      "central city",
      "flash",
      "heist"
    ],
    "powers": []
  },
  "mick rory": {
    "display": "Mick Rory",
    "aliases": [
      "heat wave"
    ],
    "cls": "self_made",
    "loc": "Central City orbit",
    "role": "criminal / fire-obsessed drifter",
    "future": "Heat Wave",
    "pre": "No established Rogues career or Flash rivalry at start.",
    "catalyst": [
      "flamethrower",
      "fire",
      "central city",
      "flash"
    ],
    "powers": []
  },
  "gorilla grodd": {
    "display": "Grodd",
    "aliases": [
      "gorilla grodd"
    ],
    "cls": "born_extraordinary",
    "loc": "Gorilla City / Africa",
    "role": "intelligent gorilla",
    "future": "Gorilla Grodd",
    "pre": "Advanced intelligence/telepathy may be inherent to chosen origin; Flash rivalry and world-conquest history are not.",
    "catalyst": [
      "gorilla city",
      "telepathy",
      "central city",
      "flash"
    ],
    "powers": [
      "telepathy",
      "strength"
    ]
  },
  "sinestro": {
    "display": "Thaal Sinestro",
    "aliases": [
      "sinestro"
    ],
    "cls": "chosen_bonded",
    "loc": "Korugar / Green Lantern Corps",
    "role": "Korugarian citizen / recruit",
    "future": "Green Lantern / Sinestro Corps founder",
    "pre": "Begin before or early in ring service; dictatorship, fall and yellow Corps are future possibilities.",
    "catalyst": [
      "green lantern ring",
      "korugar",
      "guardians",
      "fear"
    ],
    "powers": [
      "power ring",
      "constructs"
    ]
  },
  "lobo": {
    "display": "Lobo",
    "aliases": [
      "the main man"
    ],
    "cls": "cosmic",
    "loc": "Czarnia",
    "role": "Czarnian",
    "future": "Lobo",
    "pre": "Czarnian biology may already be extraordinary; interstellar bounty-hunter legend and Earth history need not exist yet.",
    "catalyst": [
      "czarnia",
      "bounty",
      "space"
    ],
    "powers": [
      "strength",
      "healing",
      "durability"
    ]
  },
  "orion": {
    "display": "Orion",
    "aliases": [],
    "cls": "cosmic",
    "loc": "New Genesis / Apokolips",
    "role": "New God",
    "future": "Orion",
    "pre": "New God powers and lineage exist; later Earth hero status and Justice League ties do not.",
    "catalyst": [
      "new genesis",
      "darkseid",
      "apokolips",
      "highfather"
    ],
    "powers": [
      "strength",
      "astro force",
      "durability"
    ]
  },
  "darkseid": {
    "display": "Uxas",
    "aliases": [
      "darkseid"
    ],
    "cls": "cosmic",
    "loc": "Apokolips",
    "role": "New God prince / usurper path",
    "future": "Darkseid",
    "pre": "For a true origin start, begin as Uxas before the complete Darkseid reign/Anti-Life campaign; later cosmic tyranny is not preloaded as completed history.",
    "catalyst": [
      "omega force",
      "apokolips",
      "uxas",
      "anti-life"
    ],
    "powers": [
      "new god physiology",
      "omega effect"
    ]
  },
  "brainiac": {
    "display": "Brainiac",
    "aliases": [
      "vril dox"
    ],
    "cls": "conditioned_created",
    "loc": "Colu / deep space",
    "role": "Coluan intelligence / artificial or biological entity depending continuity",
    "future": "Brainiac",
    "pre": "Use one coherent incarnation. Earth/Superman rivalry and trophy-city history are not automatically mature at start.",
    "catalyst": [
      "colu",
      "kandor",
      "collector",
      "earth"
    ],
    "powers": [
      "advanced intellect",
      "technology"
    ]
  },
  "carol ferris": {
    "display": "Carol Ferris",
    "aliases": [
      "star sapphire"
    ],
    "cls": "chosen_bonded",
    "loc": "Coast City",
    "role": "Ferris Aircraft executive/pilot",
    "future": "Star Sapphire",
    "pre": "Carol's career and relationship history can exist; Violet-Light empowerment and Corps identity must occur in play.",
    "catalyst": [
      "zamarons",
      "violet ring",
      "ferris aircraft",
      "star sapphire"
    ],
    "powers": [
      "violet ring"
    ],
    "deps": [
      "Ferris Aircraft",
      "Green Lantern/Star Sapphire cosmic contact"
    ]
  },
  "june moone": {
    "display": "June Moone",
    "aliases": [
      "enchantress"
    ],
    "cls": "magical_occult",
    "loc": "United States",
    "role": "artist / civilian",
    "future": "Enchantress",
    "pre": "June begins before or around the mystical possession/bond; do not assume stable control.",
    "catalyst": [
      "dzamor",
      "castle",
      "enchantress",
      "possession"
    ],
    "powers": [
      "magic"
    ]
  },
  "jim corrigan": {
    "display": "Jim Corrigan",
    "aliases": [
      "the spectre",
      "spectre"
    ],
    "cls": "magical_occult",
    "loc": "United States",
    "role": "detective",
    "future": "The Spectre",
    "pre": "Jim begins alive if using a true origin start; supernatural vengeance role follows death/judgment.",
    "catalyst": [
      "murder",
      "spectre",
      "spirit of vengeance",
      "afterlife"
    ],
    "powers": [
      "spectre powers"
    ]
  },
  "madame xanadu": {
    "display": "Madame Xanadu",
    "aliases": [
      "nimue inwudu"
    ],
    "cls": "magical_occult",
    "loc": "ancient/modern occult world",
    "role": "immortal mystic",
    "future": "Madame Xanadu",
    "pre": "Long history and magic may already exist; choose one coherent era and do not assume every later alliance.",
    "catalyst": [
      "magic",
      "camelot",
      "occult"
    ],
    "powers": [
      "sorcery",
      "divination"
    ]
  },
  "detective chimp": {
    "display": "Bobo T. Chimpanzee",
    "aliases": [
      "detective chimp",
      "bobo"
    ],
    "cls": "transformed",
    "loc": "United States / occult detective world",
    "role": "chimpanzee performer before extraordinary intelligence depending stage",
    "future": "Detective Chimp",
    "pre": "If beginning early, human-level/superhuman intelligence and occult detective role must arise through the Fountain-of-Youth-related origin.",
    "catalyst": [
      "fountain of youth",
      "rex the wonder dog",
      "detective",
      "chimp"
    ],
    "powers": [
      "enhanced intelligence"
    ]
  },
  "phantom stranger": {
    "display": "Phantom Stranger",
    "aliases": [
      "the phantom stranger"
    ],
    "cls": "special",
    "loc": "mystical/cosmic world",
    "role": "mysterious wanderer",
    "future": "Phantom Stranger",
    "pre": "His canon origin is intentionally uncertain; preserve ambiguity rather than inventing one definitive secret as objective fact.",
    "catalyst": [
      "judgment",
      "mystery",
      "stranger",
      "magic"
    ],
    "powers": [
      "mystic abilities"
    ]
  }
};

  var CHARACTER_INDEX = [
  {
    "canonical": "Clark Kent",
    "key": "clark kent",
    "aliases": [
      "superman",
      "kal-el",
      "kal el"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Bruce Wayne",
    "key": "bruce wayne",
    "aliases": [
      "batman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Diana of Themyscira",
    "key": "diana",
    "aliases": [
      "wonder woman",
      "diana prince"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Barry Allen",
    "key": "barry allen",
    "aliases": [
      "the flash",
      "flash"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Hal Jordan",
    "key": "hal jordan",
    "aliases": [
      "green lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "John Stewart",
    "key": "john stewart",
    "aliases": [
      "green lantern john stewart"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Jessica Cruz",
    "key": "jessica cruz",
    "aliases": [
      "green lantern jessica cruz"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Arthur Curry",
    "key": "arthur curry",
    "aliases": [
      "aquaman"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Victor Stone",
    "key": "victor stone",
    "aliases": [
      "cyborg"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Billy Batson",
    "key": "billy batson",
    "aliases": [
      "shazam",
      "captain marvel"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Kara Zor-El",
    "key": "kara zor-el",
    "aliases": [
      "supergirl",
      "kara danvers"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Dick Grayson",
    "key": "dick grayson",
    "aliases": [
      "robin dick grayson",
      "nightwing"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jason Todd",
    "key": "jason todd",
    "aliases": [
      "robin jason todd",
      "red hood"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Tim Drake",
    "key": "tim drake",
    "aliases": [
      "robin tim drake",
      "red robin"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Damian Wayne",
    "key": "damian wayne",
    "aliases": [
      "robin damian wayne"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Barbara Gordon",
    "key": "barbara gordon",
    "aliases": [
      "batgirl",
      "oracle"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Cassandra Cain",
    "key": "cassandra cain",
    "aliases": [
      "batgirl cassandra cain",
      "orphan"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Stephanie Brown",
    "key": "stephanie brown",
    "aliases": [
      "spoiler",
      "batgirl stephanie brown"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Kate Kane",
    "key": "kate kane",
    "aliases": [
      "batwoman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Dinah Lance",
    "key": "dinah lance",
    "aliases": [
      "black canary"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Oliver Queen",
    "key": "oliver queen",
    "aliases": [
      "green arrow"
    ],
    "class": "self_made"
  },
  {
    "canonical": "J'onn J'onzz",
    "key": "j'onn j'onzz",
    "aliases": [
      "martian manhunter",
      "john jones"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Raven",
    "key": "raven",
    "aliases": [
      "rachel roth"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Koriand'r",
    "key": "koriand'r",
    "aliases": [
      "starfire",
      "koriandr",
      "kori anders"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Garfield Logan",
    "key": "garfield logan",
    "aliases": [
      "beast boy",
      "changeling"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Jaime Reyes",
    "key": "jaime reyes",
    "aliases": [
      "blue beetle jaime reyes",
      "blue beetle"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Ted Kord",
    "key": "ted kord",
    "aliases": [
      "blue beetle ted kord"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Michael Jon Carter",
    "key": "michael jon carter",
    "aliases": [
      "booster gold"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Ronnie Raymond",
    "key": "ronnie raymond",
    "aliases": [
      "firestorm"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Jefferson Pierce",
    "key": "jefferson pierce",
    "aliases": [
      "black lightning"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mari McCabe",
    "key": "mari mccabe",
    "aliases": [
      "vixen"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Zatanna Zatara",
    "key": "zatanna zatara",
    "aliases": [
      "zatanna"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "John Constantine",
    "key": "john constantine",
    "aliases": [
      "constantine"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Alec Holland",
    "key": "alec holland",
    "aliases": [
      "swamp thing"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Dr. Harleen Quinzel",
    "key": "harleen quinzel",
    "aliases": [
      "harley quinn"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Pamela Isley",
    "key": "pamela isley",
    "aliases": [
      "poison ivy"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Selina Kyle",
    "key": "selina kyle",
    "aliases": [
      "catwoman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Slade Wilson",
    "key": "slade wilson",
    "aliases": [
      "deathstroke",
      "deathstroke the terminator"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Floyd Lawton",
    "key": "floyd lawton",
    "aliases": [
      "deadshot"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Teth-Adam",
    "key": "teth-adam",
    "aliases": [
      "black adam"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Lex Luthor",
    "key": "lex luthor",
    "aliases": [
      "lex"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Edward Nygma",
    "key": "edward nygma",
    "aliases": [
      "riddler",
      "edward nashton"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Dr. Victor Fries",
    "key": "victor fries",
    "aliases": [
      "mr freeze",
      "mister freeze"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Harvey Dent",
    "key": "harvey dent",
    "aliases": [
      "two-face",
      "two face"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Bane",
    "key": "bane",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Waylon Jones",
    "key": "waylon jones",
    "aliases": [
      "killer croc"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Jean-Paul Valley",
    "key": "jean-paul valley",
    "aliases": [
      "azrael",
      "jean paul valley"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Daniel Cassidy",
    "key": "daniel cassidy",
    "aliases": [
      "blue devil"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Rory Regan",
    "key": "rory regan",
    "aliases": [
      "ragman"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Boston Brand",
    "key": "boston brand",
    "aliases": [
      "deadman"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Patrick O'Brian",
    "key": "patrick o'brian",
    "aliases": [
      "plastic man",
      "eel o'brian",
      "eel obrian"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Michael Holt",
    "key": "michael holt",
    "aliases": [
      "mister terrific",
      "mr terrific"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Vic Sage",
    "key": "vic sage",
    "aliases": [
      "the question",
      "question vic sage"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Renee Montoya",
    "key": "renee montoya",
    "aliases": [
      "question renee montoya",
      "the question renee"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Helena Bertinelli",
    "key": "helena bertinelli",
    "aliases": [
      "huntress"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Buddy Baker",
    "key": "buddy baker",
    "aliases": [
      "animal man"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Adam Strange",
    "key": "adam strange",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Scott Free",
    "key": "scott free",
    "aliases": [
      "mister miracle",
      "mr miracle"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Big Barda",
    "key": "barda free",
    "aliases": [
      "barda",
      "big barda"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Jason Blood",
    "key": "jason blood",
    "aliases": [
      "etrigan",
      "etrigan the demon"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Kent Nelson",
    "key": "kent nelson",
    "aliases": [
      "doctor fate",
      "dr fate"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Jack Ryder",
    "key": "jack ryder",
    "aliases": [
      "creeper",
      "the creeper"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Rex Mason",
    "key": "rex mason",
    "aliases": [
      "metamorpho"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Tatsu Yamashiro",
    "key": "tatsu yamashiro",
    "aliases": [
      "katana"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Christopher Smith",
    "key": "christopher smith",
    "aliases": [
      "peacemaker"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Adrian Chase",
    "key": "adrian chase",
    "aliases": [
      "vigilante"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Amanda Waller",
    "key": "amanda waller",
    "aliases": [
      "the wall"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Virgil Hawkins",
    "key": "virgil hawkins",
    "aliases": [
      "static",
      "static shock"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Augustus Freeman",
    "key": "augustus freeman",
    "aliases": [
      "icon"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Raquel Ervin",
    "key": "raquel ervin",
    "aliases": [
      "rocket"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Curtis Metcalf",
    "key": "curtis metcalf",
    "aliases": [
      "hardware"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Derek James",
    "key": "derek james",
    "aliases": [
      "sideways"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Duke Thomas",
    "key": "duke thomas",
    "aliases": [
      "the signal",
      "signal"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Wally West",
    "key": "wally west",
    "aliases": [
      "kid flash",
      "flash wally west"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Roy Harper",
    "key": "roy harper",
    "aliases": [
      "speedy",
      "arsenal",
      "red arrow"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Donna Troy",
    "key": "donna troy",
    "aliases": [
      "wonder girl",
      "troia"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Cassie Sandsmark",
    "key": "cassie sandsmark",
    "aliases": [
      "wonder girl cassie",
      "wonder girl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Garth",
    "key": "garth",
    "aliases": [
      "tempest",
      "aqualad garth"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Jackson Hyde",
    "key": "jackson hyde",
    "aliases": [
      "aqualad jackson hyde",
      "kaldur'ahm",
      "kaldur"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mera",
    "key": "mera",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Oswald Cobblepot",
    "key": "oswald cobblepot",
    "aliases": [
      "penguin",
      "the penguin"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Jonathan Crane",
    "key": "jonathan crane",
    "aliases": [
      "scarecrow"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Basil Karlo",
    "key": "basil karlo",
    "aliases": [
      "clayface"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Dr. Kirk Langstrom",
    "key": "kirk langstrom",
    "aliases": [
      "man-bat",
      "man bat"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Roman Sionis",
    "key": "roman sionis",
    "aliases": [
      "black mask"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Dr. Thomas Elliot",
    "key": "thomas elliot",
    "aliases": [
      "hush"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Eobard Thawne",
    "key": "eobard thawne",
    "aliases": [
      "reverse-flash",
      "reverse flash",
      "professor zoom"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Leonard Snart",
    "key": "leonard snart",
    "aliases": [
      "captain cold"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Mick Rory",
    "key": "mick rory",
    "aliases": [
      "heat wave"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Grodd",
    "key": "gorilla grodd",
    "aliases": [
      "gorilla grodd"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Thaal Sinestro",
    "key": "sinestro",
    "aliases": [
      "sinestro"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Lobo",
    "key": "lobo",
    "aliases": [
      "the main man"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Orion",
    "key": "orion",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Uxas",
    "key": "darkseid",
    "aliases": [
      "darkseid"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Brainiac",
    "key": "brainiac",
    "aliases": [
      "vril dox"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Carol Ferris",
    "key": "carol ferris",
    "aliases": [
      "star sapphire"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "June Moone",
    "key": "june moone",
    "aliases": [
      "enchantress"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Jim Corrigan",
    "key": "jim corrigan",
    "aliases": [
      "the spectre",
      "spectre"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Madame Xanadu",
    "key": "madame xanadu",
    "aliases": [
      "nimue inwudu"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Bobo T. Chimpanzee",
    "key": "detective chimp",
    "aliases": [
      "detective chimp",
      "bobo"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Phantom Stranger",
    "key": "phantom stranger",
    "aliases": [
      "the phantom stranger"
    ],
    "class": "special"
  },
  {
    "canonical": "Ray Palmer",
    "key": "ray palmer",
    "aliases": [
      "The Atom"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Ryan Choi",
    "key": "ryan choi",
    "aliases": [
      "The Atom Ryan Choi"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Ted Grant",
    "key": "ted grant",
    "aliases": [
      "Wildcat"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Wesley Dodds",
    "key": "wesley dodds",
    "aliases": [
      "Sandman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Jack Knight",
    "key": "jack knight",
    "aliases": [
      "Starman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Courtney Whitmore",
    "key": "courtney whitmore",
    "aliases": [
      "Stargirl"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Rick Tyler",
    "key": "rick tyler",
    "aliases": [
      "Hourman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Rex Tyler",
    "key": "rex tyler",
    "aliases": [
      "Hourman Rex Tyler"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Kate Spencer",
    "key": "kate spencer",
    "aliases": [
      "Manhunter"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Mia Dearden",
    "key": "mia dearden",
    "aliases": [
      "Speedy Mia Dearden"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Connor Hawke",
    "key": "connor hawke",
    "aliases": [
      "Green Arrow Connor Hawke"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Luke Fox",
    "key": "luke fox",
    "aliases": [
      "Batwing"
    ],
    "class": "self_made"
  },
  {
    "canonical": "David Zavimbe",
    "key": "david zavimbe",
    "aliases": [
      "Batwing David Zavimbe"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Sandra Wu-San",
    "key": "sandra wu-san",
    "aliases": [
      "Lady Shiva"
    ],
    "class": "self_made"
  },
  {
    "canonical": "David Cain",
    "key": "david cain",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Cheshire",
    "key": "cheshire",
    "aliases": [
      "Jade Nguyen"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Bronze Tiger",
    "key": "bronze tiger",
    "aliases": [
      "Ben Turner"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Richard Dragon",
    "key": "richard dragon",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Lady Blackhawk",
    "key": "lady blackhawk",
    "aliases": [
      "Zinda Blake"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Blackhawk",
    "key": "blackhawk",
    "aliases": [
      "Janusz Prohaska"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Crimson Avenger",
    "key": "crimson avenger",
    "aliases": [
      "Lee Travis"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Guardian",
    "key": "guardian",
    "aliases": [
      "Jim Harper"
    ],
    "class": "self_made"
  },
  {
    "canonical": "The Shade",
    "key": "the shade",
    "aliases": [
      "Richard Swift"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Jonah Hex",
    "key": "jonah hex",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Tommy Monaghan",
    "key": "tommy monaghan",
    "aliases": [
      "Hitman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Wild Dog",
    "key": "wild dog",
    "aliases": [
      "Jack Wheeler"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Onomatopoeia",
    "key": "onomatopoeia",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Prometheus",
    "key": "prometheus",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Calculator",
    "key": "calculator",
    "aliases": [
      "Noah Kuttler"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Sportsmaster",
    "key": "sportsmaster",
    "aliases": [
      "Lawrence Crock"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Clock King",
    "key": "clock king",
    "aliases": [
      "William Tockman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Killer Moth",
    "key": "killer moth",
    "aliases": [
      "Drury Walker"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Anarky",
    "key": "anarky",
    "aliases": [
      "Lonnie Machin"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Calendar Man",
    "key": "calendar man",
    "aliases": [
      "Julian Day"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Victor Zsasz",
    "key": "victor zsasz",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Professor Pyg",
    "key": "professor pyg",
    "aliases": [
      "Lazlo Valentin"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Toyman",
    "key": "toyman",
    "aliases": [
      "Winslow Schott"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Black Manta",
    "key": "black manta",
    "aliases": [
      "David Hyde"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Ocean Master",
    "key": "ocean master",
    "aliases": [
      "Orm Marius"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Captain Boomerang",
    "key": "captain boomerang",
    "aliases": [
      "George Harkness"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Mirror Master",
    "key": "mirror master",
    "aliases": [
      "Sam Scudder"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Weather Wizard",
    "key": "weather wizard",
    "aliases": [
      "Mark Mardon"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Trickster",
    "key": "trickster",
    "aliases": [
      "James Jesse"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Pied Piper",
    "key": "pied piper",
    "aliases": [
      "Hartley Rathaway"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Golden Glider",
    "key": "golden glider",
    "aliases": [
      "Lisa Snart"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Black Spider",
    "key": "black spider",
    "aliases": [
      "Eric Needham"
    ],
    "class": "self_made"
  },
  {
    "canonical": "KGBeast",
    "key": "kgbeast",
    "aliases": [
      "Anatoli Knyazev"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Merlyn",
    "key": "merlyn",
    "aliases": [
      "Malcolm Merlyn"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Deadshot Zoe Lawton",
    "key": "deadshot zoe lawton",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Raymond Terrill",
    "key": "raymond terrill",
    "aliases": [
      "The Ray"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Albert Rothstein",
    "key": "albert rothstein",
    "aliases": [
      "Atom Smasher"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Nathaniel Adam",
    "key": "nathaniel adam",
    "aliases": [
      "Captain Atom"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Clifford DeVoe",
    "key": "clifford devoe",
    "aliases": [
      "Thinker"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Rudy Jones",
    "key": "rudy jones",
    "aliases": [
      "Parasite"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Leslie Willis",
    "key": "leslie willis",
    "aliases": [
      "Livewire"
    ],
    "class": "transformed"
  },
  {
    "canonical": "John Corben",
    "key": "john corben",
    "aliases": [
      "Metallo"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Doris Zuel",
    "key": "doris zuel",
    "aliases": [
      "Giganta"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Caitlin Snow",
    "key": "caitlin snow",
    "aliases": [
      "Killer Frost"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Louise Lincoln",
    "key": "louise lincoln",
    "aliases": [
      "Killer Frost Louise Lincoln"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Tara Markov",
    "key": "tara markov",
    "aliases": [
      "Terra"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Grant Emerson",
    "key": "grant emerson",
    "aliases": [
      "Damage"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Brion Markov",
    "key": "brion markov",
    "aliases": [
      "Geo-Force"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Gabrielle Doe",
    "key": "gabrielle doe",
    "aliases": [
      "Halo"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Mitch Shelley",
    "key": "mitch shelley",
    "aliases": [
      "Resurrection Man"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Stanley Dover",
    "key": "stanley dover",
    "aliases": [
      "The Starbreaker"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Max Mercury",
    "key": "max mercury",
    "aliases": [],
    "class": "transformed"
  },
  {
    "canonical": "Hunter Zolomon",
    "key": "hunter zolomon",
    "aliases": [
      "Zoom"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Sam Scudder",
    "key": "sam scudder",
    "aliases": [
      "Mirror Master"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Roscoe Dillon",
    "key": "roscoe dillon",
    "aliases": [
      "Top"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Mark Shaw",
    "key": "mark shaw",
    "aliases": [
      "Manhunter Mark Shaw"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Nubia",
    "key": "nubia",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Hippolyta",
    "key": "hippolyta",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Artemis of Bana-Mighdall",
    "key": "artemis of bana-mighdall",
    "aliases": [
      "Artemis"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Lorena Marquez",
    "key": "lorena marquez",
    "aliases": [
      "Aquagirl"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Tula",
    "key": "tula",
    "aliases": [
      "Aquagirl Tula"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Koryak",
    "key": "koryak",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Dolphin",
    "key": "dolphin",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Lagoon Boy",
    "key": "lagoon boy",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Emiko Queen",
    "key": "emiko queen",
    "aliases": [
      "Red Arrow Emiko"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Conner Kent",
    "key": "conner kent",
    "aliases": [
      "Superboy"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Jon Kent",
    "key": "jon kent",
    "aliases": [
      "Superboy Jon Kent"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Lor-Zod",
    "key": "lor-zod",
    "aliases": [
      "Chris Kent"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Power Girl",
    "key": "power girl",
    "aliases": [
      "Kara Zor-L"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mon-El",
    "key": "mon-el",
    "aliases": [
      "Lar Gand"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Maxima",
    "key": "maxima",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "M'gann M'orzz",
    "key": "m'gann m'orzz",
    "aliases": [
      "Miss Martian"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mammoth",
    "key": "mammoth",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Shimmer",
    "key": "shimmer",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Jinx",
    "key": "jinx",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Psimon",
    "key": "psimon",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Solomon Grundy",
    "key": "solomon grundy",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Cheetah",
    "key": "cheetah",
    "aliases": [
      "Barbara Ann Minerva"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Silver Banshee",
    "key": "silver banshee",
    "aliases": [
      "Siobhan McDougal"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Blackfire",
    "key": "blackfire",
    "aliases": [
      "Komand'r"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Despero",
    "key": "despero",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mongul",
    "key": "mongul",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Kalibak",
    "key": "kalibak",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Granny Goodness",
    "key": "granny goodness",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Forager",
    "key": "forager",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Lightray",
    "key": "lightray",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Highfather",
    "key": "highfather",
    "aliases": [
      "Izaya"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Steppenwolf",
    "key": "steppenwolf",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Grafil",
    "key": "grafil",
    "aliases": [
      "Green Man"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Guy Gardner",
    "key": "guy gardner",
    "aliases": [
      "Green Lantern Guy Gardner"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Kyle Rayner",
    "key": "kyle rayner",
    "aliases": [
      "Green Lantern Kyle Rayner"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Simon Baz",
    "key": "simon baz",
    "aliases": [
      "Green Lantern Simon Baz"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Jo Mullein",
    "key": "jo mullein",
    "aliases": [
      "Green Lantern Jo Mullein"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Alan Scott",
    "key": "alan scott",
    "aliases": [
      "Green Lantern Alan Scott"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Saint Walker",
    "key": "saint walker",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Atrocitus",
    "key": "atrocitus",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Larfleeze",
    "key": "larfleeze",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Indigo-1",
    "key": "indigo-1",
    "aliases": [
      "Iroque"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Soranik Natu",
    "key": "soranik natu",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Kilowog",
    "key": "kilowog",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Sodam Yat",
    "key": "sodam yat",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Doctor Fate Khalid Nassour",
    "key": "doctor fate khalid nassour",
    "aliases": [
      "Khalid Nassour"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Jakeem Thunder",
    "key": "jakeem thunder",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Johnny Thunder",
    "key": "johnny thunder",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Amethyst",
    "key": "amethyst",
    "aliases": [
      "Amy Winston"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Black Alice",
    "key": "black alice",
    "aliases": [
      "Lori Zechlin"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Eclipso",
    "key": "eclipso",
    "aliases": [
      "Bruce Gordon"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Black Orchid",
    "key": "black orchid",
    "aliases": [
      "Susan Linden-Thorne"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Andrew Bennett",
    "key": "andrew bennett",
    "aliases": [
      "I Vampire"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Frankenstein",
    "key": "frankenstein",
    "aliases": [
      "Agent of SHADE"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Shade the Changing Man",
    "key": "shade the changing man",
    "aliases": [
      "Rac Shade"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Kid Eternity",
    "key": "kid eternity",
    "aliases": [
      "Christopher Freeman"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Nightmaster",
    "key": "nightmaster",
    "aliases": [
      "Jim Rook"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Blue Beetle Dan Garrett",
    "key": "blue beetle dan garrett",
    "aliases": [
      "Dan Garrett"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Doctor Occult",
    "key": "doctor occult",
    "aliases": [
      "Richard Occult"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Traci 13",
    "key": "traci 13",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Tim Hunter",
    "key": "tim hunter",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Sebastian Faust",
    "key": "sebastian faust",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Felix Faust",
    "key": "felix faust",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Circe",
    "key": "circe",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Doctor Psycho",
    "key": "doctor psycho",
    "aliases": [
      "Edgar Cizko"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Brother Blood",
    "key": "brother blood",
    "aliases": [
      "Sebastian Blood"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Trigon",
    "key": "trigon",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Neron",
    "key": "neron",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Klarion the Witch Boy",
    "key": "klarion the witch boy",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Mordru",
    "key": "mordru",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Gentleman Ghost",
    "key": "gentleman ghost",
    "aliases": [
      "Jim Craddock"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Space Cabbie",
    "key": "space cabbie",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Captain Comet",
    "key": "captain comet",
    "aliases": [
      "Adam Blake"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Vril Dox II",
    "key": "vril dox ii",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "L.E.G.I.O.N.",
    "key": "l.e.g.i.o.n.",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Hawkgirl",
    "key": "hawkgirl",
    "aliases": [
      "Kendra Saunders"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Hawkman",
    "key": "hawkman",
    "aliases": [
      "Carter Hall"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Hawkwoman",
    "key": "hawkwoman",
    "aliases": [
      "Shayera Hol"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Starro",
    "key": "starro",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Mister Mxyzptlk",
    "key": "mister mxyzptlk",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Krypto",
    "key": "krypto",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Streaky",
    "key": "streaky",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Comet the Super-Horse",
    "key": "comet the super-horse",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Bekka",
    "key": "bekka",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Metron",
    "key": "metron",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Desaad",
    "key": "desaad",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Glorious Godfrey",
    "key": "glorious godfrey",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Grail",
    "key": "grail",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Yuga Khan",
    "key": "yuga khan",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Ares",
    "key": "ares",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Zeus",
    "key": "zeus",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Hades",
    "key": "hades",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Ganthet",
    "key": "ganthet",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Sayd",
    "key": "sayd",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Nekron",
    "key": "nekron",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Jesse Chambers",
    "key": "jesse chambers",
    "aliases": [
      "Jesse Quick"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Bart Allen",
    "key": "bart allen",
    "aliases": [
      "Impulse"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jay Garrick",
    "key": "jay garrick",
    "aliases": [
      "The Flash Jay Garrick"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Maxine Hunkel",
    "key": "maxine hunkel",
    "aliases": [
      "Cyclone"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Beth Chapel",
    "key": "beth chapel",
    "aliases": [
      "Doctor Mid-Nite"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Charles McNider",
    "key": "charles mcnider",
    "aliases": [
      "Doctor Mid-Nite Charles McNider"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Pieter Cross",
    "key": "pieter cross",
    "aliases": [
      "Doctor Mid-Nite Pieter Cross"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Rick Flag",
    "key": "rick flag",
    "aliases": [],
    "class": "legacy"
  },
  {
    "canonical": "Sasha Bordeaux",
    "key": "sasha bordeaux",
    "aliases": [],
    "class": "legacy"
  },
  {
    "canonical": "Rose Wilson",
    "key": "rose wilson",
    "aliases": [
      "Ravager"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Joseph Wilson",
    "key": "joseph wilson",
    "aliases": [
      "Jericho"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Grant Wilson",
    "key": "grant wilson",
    "aliases": [
      "Ravager Grant Wilson"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Lian Harper",
    "key": "lian harper",
    "aliases": [],
    "class": "legacy"
  },
  {
    "canonical": "Anissa Pierce",
    "key": "anissa pierce",
    "aliases": [
      "Thunder"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jennifer Pierce",
    "key": "jennifer pierce",
    "aliases": [
      "Lightning"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Natasha Irons",
    "key": "natasha irons",
    "aliases": [
      "Steel Natasha Irons"
    ],
    "class": "legacy"
  },
  {
    "canonical": "John Henry Irons",
    "key": "john henry irons",
    "aliases": [
      "Steel"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Karen Beecher",
    "key": "karen beecher",
    "aliases": [
      "Bumblebee"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Mal Duncan",
    "key": "mal duncan",
    "aliases": [
      "Guardian Mal Duncan"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Freddy Freeman",
    "key": "freddy freeman",
    "aliases": [
      "Captain Marvel Jr"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Mary Bromfield",
    "key": "mary bromfield",
    "aliases": [
      "Mary Marvel"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Osiris",
    "key": "osiris",
    "aliases": [
      "Amon Tomaz"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Isis",
    "key": "isis",
    "aliases": [
      "Adrianna Tomaz"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Joker",
    "key": "joker",
    "aliases": [
      "The Joker"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Jervis Tetch",
    "key": "jervis tetch",
    "aliases": [
      "Mad Hatter"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Garfield Lynns",
    "key": "garfield lynns",
    "aliases": [
      "Firefly"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Maxie Zeus",
    "key": "maxie zeus",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Hugo Strange",
    "key": "hugo strange",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Rupert Thorne",
    "key": "rupert thorne",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Carmine Falcone",
    "key": "carmine falcone",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Sal Maroni",
    "key": "sal maroni",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Tobias Whale",
    "key": "tobias whale",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Simon Stagg",
    "key": "simon stagg",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Veronica Cale",
    "key": "veronica cale",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Maxwell Lord",
    "key": "maxwell lord",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Vandal Savage",
    "key": "vandal savage",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Ra's al Ghul",
    "key": "ra's al ghul",
    "aliases": [
      "Ra's al Ghul"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Talia al Ghul",
    "key": "talia al ghul",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Nyssa Raatko",
    "key": "nyssa raatko",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Doctor Light",
    "key": "doctor light",
    "aliases": [
      "Arthur Light"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Count Vertigo",
    "key": "count vertigo",
    "aliases": [
      "Werner Vertigo"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Murmur",
    "key": "murmur",
    "aliases": [
      "Michael Amar"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Abra Kadabra",
    "key": "abra kadabra",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Savitar",
    "key": "savitar",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Godspeed",
    "key": "godspeed",
    "aliases": [
      "August Heart"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Black Hand",
    "key": "black hand",
    "aliases": [
      "William Hand"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Hector Hammond",
    "key": "hector hammond",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Major Force",
    "key": "major force",
    "aliases": [
      "Clifford Zmeck"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "General Zod",
    "key": "general zod",
    "aliases": [
      "Dru-Zod"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Faora",
    "key": "faora",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Ursa",
    "key": "ursa",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Doomsday",
    "key": "doomsday",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Manchester Black",
    "key": "manchester black",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Atomic Skull",
    "key": "atomic skull",
    "aliases": [
      "Joseph Martin"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Red Tornado",
    "key": "red tornado",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Amazo",
    "key": "amazo",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "O.M.A.C.",
    "key": "o.m.a.c.",
    "aliases": [
      "Buddy Blank"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Brother Eye",
    "key": "brother eye",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Cyborg Superman",
    "key": "cyborg superman",
    "aliases": [
      "Hank Henshaw"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Superboy",
    "key": "superboy",
    "aliases": [
      "Kon-El"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Match",
    "key": "match",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Ace the Bat-Hound",
    "key": "ace the bat-hound",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Talons",
    "key": "talons",
    "aliases": [
      "William Cobb"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "William Cobb",
    "key": "william cobb",
    "aliases": [
      "Talon"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Savant",
    "key": "savant",
    "aliases": [
      "Brian Durlin"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Multiplex",
    "key": "multiplex",
    "aliases": [
      "Danton Black"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Girder",
    "key": "girder",
    "aliases": [
      "Tony Woodward"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Grid",
    "key": "grid",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Failsafe",
    "key": "failsafe",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Robotman",
    "key": "robotman",
    "aliases": [
      "Cliff Steele"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Negative Man",
    "key": "negative man",
    "aliases": [
      "Larry Trainor"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Elasti-Woman",
    "key": "elasti-woman",
    "aliases": [
      "Rita Farr"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Crazy Jane",
    "key": "crazy jane",
    "aliases": [
      "Kay Challis"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Celsius",
    "key": "celsius",
    "aliases": [
      "Arani Desai"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Mento",
    "key": "mento",
    "aliases": [
      "Steve Dayton"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Lucifer Morningstar",
    "key": "lucifer morningstar",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Dream of the Endless",
    "key": "dream of the endless",
    "aliases": [
      "Dream"
    ],
    "class": "special"
  },
  {
    "canonical": "Death of the Endless",
    "key": "death of the endless",
    "aliases": [
      "Death"
    ],
    "class": "special"
  },
  {
    "canonical": "Destiny of the Endless",
    "key": "destiny of the endless",
    "aliases": [
      "Destiny"
    ],
    "class": "special"
  },
  {
    "canonical": "Desire of the Endless",
    "key": "desire of the endless",
    "aliases": [
      "Desire"
    ],
    "class": "special"
  },
  {
    "canonical": "Despair of the Endless",
    "key": "despair of the endless",
    "aliases": [
      "Despair"
    ],
    "class": "special"
  },
  {
    "canonical": "Delirium of the Endless",
    "key": "delirium of the endless",
    "aliases": [
      "Delirium"
    ],
    "class": "special"
  },
  {
    "canonical": "The Presence",
    "key": "the presence",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "The Source",
    "key": "the source",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Anti-Monitor",
    "key": "anti-monitor",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Monitor",
    "key": "monitor",
    "aliases": [
      "Mar Novu"
    ],
    "class": "special"
  },
  {
    "canonical": "Harbinger",
    "key": "harbinger",
    "aliases": [
      "Lyla Michaels"
    ],
    "class": "special"
  },
  {
    "canonical": "Pariah",
    "key": "pariah",
    "aliases": [
      "Kell Mossa"
    ],
    "class": "special"
  },
  {
    "canonical": "Ambush Bug",
    "key": "ambush bug",
    "aliases": [
      "Irwin Schwab"
    ],
    "class": "special"
  },
  {
    "canonical": "Bat-Mite",
    "key": "bat-mite",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Mr. Mxyzptlk",
    "key": "mr. mxyzptlk",
    "aliases": [
      "Mister Mxyzptlk"
    ],
    "class": "special"
  },
  {
    "canonical": "Animal-Vegetable-Mineral Man",
    "key": "animal-vegetable-mineral man",
    "aliases": [
      "Sven Larsen"
    ],
    "class": "special"
  },
  {
    "canonical": "Condiment King",
    "key": "condiment king",
    "aliases": [
      "Mitchell Mayo"
    ],
    "class": "special"
  },
  {
    "canonical": "Kite Man",
    "key": "kite man",
    "aliases": [
      "Charles Brown"
    ],
    "class": "special"
  },
  {
    "canonical": "Polka-Dot Man",
    "key": "polka-dot man",
    "aliases": [
      "Abner Krill"
    ],
    "class": "special"
  },
  {
    "canonical": "The Heckler",
    "key": "the heckler",
    "aliases": [
      "Stuart Mosely"
    ],
    "class": "special"
  },
  {
    "canonical": "Yolanda Montez",
    "key": "yolanda montez",
    "aliases": [
      "Wildcat"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Rex Tyler",
    "key": "rex tyler",
    "aliases": [
      "Hourman"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Beth Chapel",
    "key": "beth chapel",
    "aliases": [
      "Doctor Mid-Nite"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Charles McNider",
    "key": "charles mcnider",
    "aliases": [
      "Doctor Mid-Nite"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Pieter Cross",
    "key": "pieter cross",
    "aliases": [
      "Doctor Mid-Nite"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Michael Holt",
    "key": "michael holt",
    "aliases": [
      "Mister Terrific"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Terry Sloane",
    "key": "terry sloane",
    "aliases": [
      "Mister Terrific"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Sonia Sato",
    "key": "sonia sato",
    "aliases": [
      "Juddmaster"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Judomaster",
    "key": "judomaster",
    "aliases": [
      "Hadley Jagger"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Nemesis",
    "key": "nemesis",
    "aliases": [
      "Tom Tresser"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Human Target",
    "key": "human target",
    "aliases": [
      "Christopher Chance"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Slam Bradley",
    "key": "slam bradley",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Bat Lash",
    "key": "bat lash",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Scalphunter",
    "key": "scalphunter",
    "aliases": [
      "Brian Savage"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Vigilante",
    "key": "vigilante",
    "aliases": [
      "Greg Saunders"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Vigilante",
    "key": "vigilante",
    "aliases": [
      "Adrian Chase"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Manhunter",
    "key": "manhunter",
    "aliases": [
      "Kate Spencer"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Manhunter",
    "key": "manhunter",
    "aliases": [
      "Paul Kirk"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Sandman",
    "key": "sandman",
    "aliases": [
      "Wesley Dodds"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Sandy Hawkins",
    "key": "sandy hawkins",
    "aliases": [
      "Sand"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Cyclone",
    "key": "cyclone",
    "aliases": [
      "Maxine Hunkel"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Atom Smasher",
    "key": "atom smasher",
    "aliases": [
      "Albert Rothstein"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Damage",
    "key": "damage",
    "aliases": [
      "Grant Emerson"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Amazing-Man",
    "key": "amazing-man",
    "aliases": [
      "Will Everett"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Commander Steel",
    "key": "commander steel",
    "aliases": [
      "Hank Heywood"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Citizen Steel",
    "key": "citizen steel",
    "aliases": [
      "Nathan Heywood"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Mr. America",
    "key": "mr. america",
    "aliases": [
      "Tex Thompson"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Freedom Beast",
    "key": "freedom beast",
    "aliases": [
      "Dominic Mndawe"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Red Bee",
    "key": "red bee",
    "aliases": [
      "Rick Raleigh"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Black Condor",
    "key": "black condor",
    "aliases": [
      "Richard Grey Jr."
    ],
    "class": "self_made"
  },
  {
    "canonical": "Black Condor",
    "key": "black condor",
    "aliases": [
      "Ryan Kendall"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Phantom Lady",
    "key": "phantom lady",
    "aliases": [
      "Sandra Knight"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Human Bomb",
    "key": "human bomb",
    "aliases": [
      "Roy Lincoln"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Uncle Sam",
    "key": "uncle sam",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Doll Man",
    "key": "doll man",
    "aliases": [
      "Darrell Dane"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Ray",
    "key": "ray",
    "aliases": [
      "Ray Terrill"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Ray",
    "key": "ray",
    "aliases": [
      "Happy Terrill"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Blackhawk",
    "key": "blackhawk",
    "aliases": [
      "Janos Prohaska"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Spy Smasher",
    "key": "spy smasher",
    "aliases": [
      "Katarina Armstrong"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Firebrand",
    "key": "firebrand",
    "aliases": [
      "Danette Reilly"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Liberty Belle",
    "key": "liberty belle",
    "aliases": [
      "Libby Lawrence"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Liberty Belle",
    "key": "liberty belle",
    "aliases": [
      "Jesse Chambers"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Tomcat",
    "key": "tomcat",
    "aliases": [
      "Tom Bronson"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Man-Bat",
    "key": "man-bat",
    "aliases": [
      "Kirk Langstrom"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Batwing",
    "key": "batwing",
    "aliases": [
      "David Zavimbe"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Batwing",
    "key": "batwing",
    "aliases": [
      "Luke Fox"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Signal",
    "key": "signal",
    "aliases": [
      "Duke Thomas"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Bluebird",
    "key": "bluebird",
    "aliases": [
      "Harper Row"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Flamebird",
    "key": "flamebird",
    "aliases": [
      "Bette Kane"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Huntress",
    "key": "huntress",
    "aliases": [
      "Helena Bertinelli"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Huntress",
    "key": "huntress",
    "aliases": [
      "Helena Wayne"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Catman",
    "key": "catman",
    "aliases": [
      "Thomas Blake"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Lady Shiva",
    "key": "lady shiva",
    "aliases": [
      "Sandra Wu-San"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Onyx Adams",
    "key": "onyx adams",
    "aliases": [],
    "class": "self_made"
  },
  {
    "canonical": "Orpheus",
    "key": "orpheus",
    "aliases": [
      "Gavin King"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Aztek",
    "key": "aztek",
    "aliases": [
      "Uno"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Aztek",
    "key": "aztek",
    "aliases": [
      "Nayeli Constant"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Arsenal",
    "key": "arsenal",
    "aliases": [
      "Roy Harper"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Red Arrow",
    "key": "red arrow",
    "aliases": [
      "Emiko Queen"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Arrowette",
    "key": "arrowette",
    "aliases": [
      "Cissie King-Jones"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Speedy",
    "key": "speedy",
    "aliases": [
      "Mia Dearden"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Guardian",
    "key": "guardian",
    "aliases": [
      "Mal Duncan"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Gangbuster",
    "key": "gangbuster",
    "aliases": [
      "Jose Delgado"
    ],
    "class": "self_made"
  },
  {
    "canonical": "The Heckler",
    "key": "the heckler",
    "aliases": [
      "Stuart Mosely"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Codename Assassin",
    "key": "codename assassin",
    "aliases": [
      "Jonathan Drew"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Gunsmith",
    "key": "gunsmith",
    "aliases": [
      "Steven Sharpe III"
    ],
    "class": "self_made"
  },
  {
    "canonical": "Elongated Man",
    "key": "elongated man",
    "aliases": [
      "Ralph Dibny"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Sue Dibny",
    "key": "sue dibny",
    "aliases": [],
    "class": "transformed"
  },
  {
    "canonical": "Plastic Man",
    "key": "plastic man",
    "aliases": [
      "Patrick O’Brian"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Metamorpho",
    "key": "metamorpho",
    "aliases": [
      "Rex Mason"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Element Woman",
    "key": "element woman",
    "aliases": [
      "Emily Sung"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Firestorm",
    "key": "firestorm",
    "aliases": [
      "Ronnie Raymond"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Firestorm",
    "key": "firestorm",
    "aliases": [
      "Jason Rusch"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Nuclear Man",
    "key": "nuclear man",
    "aliases": [
      "Martin Stein"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Damage",
    "key": "damage",
    "aliases": [
      "Ethan Avery"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Sideways",
    "key": "sideways",
    "aliases": [
      "Derek James"
    ],
    "class": "transformed"
  },
  {
    "canonical": "The Ray",
    "key": "the ray",
    "aliases": [
      "Ray Terrill"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Black Lightning",
    "key": "black lightning",
    "aliases": [
      "Jefferson Pierce"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Lightning",
    "key": "lightning",
    "aliases": [
      "Jennifer Pierce"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Thunder",
    "key": "thunder",
    "aliases": [
      "Anissa Pierce"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Static",
    "key": "static",
    "aliases": [
      "Virgil Hawkins"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Hardware",
    "key": "hardware",
    "aliases": [
      "Curtis Metcalf"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Icon",
    "key": "icon",
    "aliases": [
      "Augustus Freeman"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Rocket",
    "key": "rocket",
    "aliases": [
      "Raquel Ervin"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Bloodwynd",
    "key": "bloodwynd",
    "aliases": [],
    "class": "transformed"
  },
  {
    "canonical": "Resurrection Man",
    "key": "resurrection man",
    "aliases": [
      "Mitch Shelley"
    ],
    "class": "transformed"
  },
  {
    "canonical": "The Creeper",
    "key": "the creeper",
    "aliases": [
      "Jack Ryder"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Animal Man",
    "key": "animal man",
    "aliases": [
      "Buddy Baker"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Vixen",
    "key": "vixen",
    "aliases": [
      "Mari McCabe"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Freedom Beast",
    "key": "freedom beast",
    "aliases": [
      "Dominic Mndawe"
    ],
    "class": "transformed"
  },
  {
    "canonical": "B’wana Beast",
    "key": "b’wana beast",
    "aliases": [
      "Mike Maxwell"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Geo-Force",
    "key": "geo-force",
    "aliases": [
      "Brion Markov"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Terra",
    "key": "terra",
    "aliases": [
      "Tara Markov"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Cyclotron",
    "key": "cyclotron",
    "aliases": [
      "Terry Curtis"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Captain Atom",
    "key": "captain atom",
    "aliases": [
      "Nathaniel Adam"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Major Force",
    "key": "major force",
    "aliases": [
      "Clifford Zmeck"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Firehawk",
    "key": "firehawk",
    "aliases": [
      "Lorraine Reilly"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Killer Frost",
    "key": "killer frost",
    "aliases": [
      "Caitlin Snow"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Killer Frost",
    "key": "killer frost",
    "aliases": [
      "Louise Lincoln"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Killer Frost",
    "key": "killer frost",
    "aliases": [
      "Crystal Frost"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Livewire",
    "key": "livewire",
    "aliases": [
      "Leslie Willis"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Parasite",
    "key": "parasite",
    "aliases": [
      "Rudy Jones"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Atomic Skull",
    "key": "atomic skull",
    "aliases": [
      "Joseph Martin"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Blockbuster",
    "key": "blockbuster",
    "aliases": [
      "Mark Desmond"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Girder",
    "key": "girder",
    "aliases": [
      "Tony Woodward"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Tar Pit",
    "key": "tar pit",
    "aliases": [
      "Joey Monteleone"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Plastique",
    "key": "plastique",
    "aliases": [
      "Bette Sans Souci"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Mammoth",
    "key": "mammoth",
    "aliases": [
      "Baran Flinders"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Shimmer",
    "key": "shimmer",
    "aliases": [
      "Selinda Flinders"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Multiplex",
    "key": "multiplex",
    "aliases": [
      "Danton Black"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Black Bison",
    "key": "black bison",
    "aliases": [
      "John Ravenhair"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Rainbow Raider",
    "key": "rainbow raider",
    "aliases": [
      "Roy G. Bivolo"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Magenta",
    "key": "magenta",
    "aliases": [
      "Frances Kane"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Peek-a-Boo",
    "key": "peek-a-boo",
    "aliases": [
      "Lashawn Baez"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Fallout",
    "key": "fallout",
    "aliases": [
      "Neil Borman"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Blackout",
    "key": "blackout",
    "aliases": [
      "Farooq Gibran"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Bolt",
    "key": "bolt",
    "aliases": [
      "Larry Bolatinsky"
    ],
    "class": "transformed"
  },
  {
    "canonical": "Alan Scott",
    "key": "alan scott",
    "aliases": [
      "Green Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Guy Gardner",
    "key": "guy gardner",
    "aliases": [
      "Green Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Simon Baz",
    "key": "simon baz",
    "aliases": [
      "Green Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Jo Mullein",
    "key": "jo mullein",
    "aliases": [
      "Green Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Jade",
    "key": "jade",
    "aliases": [
      "Jennifer-Lynn Hayden"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Obsidian",
    "key": "obsidian",
    "aliases": [
      "Todd Rice"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Soranik Natu",
    "key": "soranik natu",
    "aliases": [
      "Green Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Arisia Rrab",
    "key": "arisia rrab",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Ch’p",
    "key": "ch’p",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Salaak",
    "key": "salaak",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Tomar-Re",
    "key": "tomar-re",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Tomar-Tu",
    "key": "tomar-tu",
    "aliases": [],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Saint Walker",
    "key": "saint walker",
    "aliases": [
      "Blue Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Atrocitus",
    "key": "atrocitus",
    "aliases": [
      "Red Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Bleez",
    "key": "bleez",
    "aliases": [
      "Red Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Larfleeze",
    "key": "larfleeze",
    "aliases": [
      "Orange Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Arkillo",
    "key": "arkillo",
    "aliases": [
      "Sinestro Corps"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Sinestro",
    "key": "sinestro",
    "aliases": [
      "Thaal Sinestro"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Star Sapphire",
    "key": "star sapphire",
    "aliases": [
      "Carol Ferris"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Fatality",
    "key": "fatality",
    "aliases": [
      "Yrra Cynril"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Black Hand",
    "key": "black hand",
    "aliases": [
      "William Hand"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Kyle Rayner",
    "key": "kyle rayner",
    "aliases": [
      "White Lantern"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Billy Batson",
    "key": "billy batson",
    "aliases": [
      "Shazam"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Mary Bromfield",
    "key": "mary bromfield",
    "aliases": [
      "Mary Marvel"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Freddy Freeman",
    "key": "freddy freeman",
    "aliases": [
      "Captain Marvel Jr."
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Osiris",
    "key": "osiris",
    "aliases": [
      "Amon Tomaz"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Thunderbolt",
    "key": "thunderbolt",
    "aliases": [
      "Yz"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Blue Beetle",
    "key": "blue beetle",
    "aliases": [
      "Jaime Reyes"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Blue Beetle",
    "key": "blue beetle",
    "aliases": [
      "Dan Garrett"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Ragman",
    "key": "ragman",
    "aliases": [
      "Rory Regan"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Enchantress",
    "key": "enchantress",
    "aliases": [
      "June Moone"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Blue Devil",
    "key": "blue devil",
    "aliases": [
      "Daniel Cassidy"
    ],
    "class": "chosen_bonded"
  },
  {
    "canonical": "Superboy",
    "key": "superboy",
    "aliases": [
      "Kon-El"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Jon Kent",
    "key": "jon kent",
    "aliases": [
      "Superman"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Val-Zod",
    "key": "val-zod",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Calvin Ellis",
    "key": "calvin ellis",
    "aliases": [
      "Superman"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Kong Kenan",
    "key": "kong kenan",
    "aliases": [
      "Super-Man"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Ultra Boy",
    "key": "ultra boy",
    "aliases": [
      "Jo Nah"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Saturn Girl",
    "key": "saturn girl",
    "aliases": [
      "Imra Ardeen"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Cosmic Boy",
    "key": "cosmic boy",
    "aliases": [
      "Rokk Krinn"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Lightning Lad",
    "key": "lightning lad",
    "aliases": [
      "Garth Ranzz"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Dream Girl",
    "key": "dream girl",
    "aliases": [
      "Nura Nal"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Brainiac 5",
    "key": "brainiac 5",
    "aliases": [
      "Querl Dox"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Chameleon Boy",
    "key": "chameleon boy",
    "aliases": [
      "Reep Daggle"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Colossal Boy",
    "key": "colossal boy",
    "aliases": [
      "Gim Allon"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Phantom Girl",
    "key": "phantom girl",
    "aliases": [
      "Tinya Wazzo"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Triplicate Girl",
    "key": "triplicate girl",
    "aliases": [
      "Luornu Durgo"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Bouncing Boy",
    "key": "bouncing boy",
    "aliases": [
      "Chuck Taine"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Dawnstar",
    "key": "dawnstar",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Wildfire",
    "key": "wildfire",
    "aliases": [
      "Drake Burroughs"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Timber Wolf",
    "key": "timber wolf",
    "aliases": [
      "Brin Londo"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Shadow Lass",
    "key": "shadow lass",
    "aliases": [
      "Tasmia Mallor"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Star Boy",
    "key": "star boy",
    "aliases": [
      "Thom Kallor"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Element Lad",
    "key": "element lad",
    "aliases": [
      "Jan Arrah"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "White Witch",
    "key": "white witch",
    "aliases": [
      "Mysa Nal"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Princess Projectra",
    "key": "princess projectra",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Karate Kid",
    "key": "karate kid",
    "aliases": [
      "Val Armorr"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Matter-Eater Lad",
    "key": "matter-eater lad",
    "aliases": [
      "Tenzil Kem"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Kid Quantum",
    "key": "kid quantum",
    "aliases": [
      "Jazmin Cullen"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "XS",
    "key": "xs",
    "aliases": [
      "Jenni Ognats"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Aquagirl",
    "key": "aquagirl",
    "aliases": [
      "Tula"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Tempest",
    "key": "tempest",
    "aliases": [
      "Garth"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Aquaman",
    "key": "aquaman",
    "aliases": [
      "Jackson Hyde"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Lagoon Boy",
    "key": "lagoon boy",
    "aliases": [
      "La’gaan"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Orm Marius",
    "key": "orm marius",
    "aliases": [
      "Ocean Master"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Donna Troy",
    "key": "donna troy",
    "aliases": [
      "Troia"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Cassie Sandsmark",
    "key": "cassie sandsmark",
    "aliases": [
      "Wonder Girl"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Yara Flor",
    "key": "yara flor",
    "aliases": [
      "Wonder Girl"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Grace Choi",
    "key": "grace choi",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Damage",
    "key": "damage",
    "aliases": [
      "Ethan Avery"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mammoth",
    "key": "mammoth",
    "aliases": [
      "Baran Flinders"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Bumblebee",
    "key": "bumblebee",
    "aliases": [
      "Karen Beecher"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Pantha",
    "key": "pantha",
    "aliases": [
      "Rosabelle Mendez"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Jericho",
    "key": "jericho",
    "aliases": [
      "Joseph Wilson"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Rose Wilson",
    "key": "rose wilson",
    "aliases": [
      "Ravager"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Blackfire",
    "key": "blackfire",
    "aliases": [
      "Komand’r"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Starfire",
    "key": "starfire",
    "aliases": [
      "Koriand’r"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Miss Martian",
    "key": "miss martian",
    "aliases": [
      "M’gann M’orzz"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "White Martian",
    "key": "white martian",
    "aliases": [
      "A’monn A’mokk"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mongal",
    "key": "mongal",
    "aliases": [],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Mister Miracle",
    "key": "mister miracle",
    "aliases": [
      "Scott Free"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Lightray",
    "key": "lightray",
    "aliases": [
      "Solis"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Darkseid",
    "key": "darkseid",
    "aliases": [
      "Uxas"
    ],
    "class": "born_extraordinary"
  },
  {
    "canonical": "Giovanni Zatara",
    "key": "giovanni zatara",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Doctor Fate",
    "key": "doctor fate",
    "aliases": [
      "Kent Nelson"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Doctor Fate",
    "key": "doctor fate",
    "aliases": [
      "Khalid Nassour"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Nabu",
    "key": "nabu",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Detective Chimp",
    "key": "detective chimp",
    "aliases": [
      "Bobo T. Chimpanzee"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Deadman",
    "key": "deadman",
    "aliases": [
      "Boston Brand"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Swamp Thing",
    "key": "swamp thing",
    "aliases": [
      "Alec Holland"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Abby Arcane",
    "key": "abby arcane",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Animal Man",
    "key": "animal man",
    "aliases": [
      "Buddy Baker"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Black Orchid",
    "key": "black orchid",
    "aliases": [
      "Susan Linden"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Sargon the Sorcerer",
    "key": "sargon the sorcerer",
    "aliases": [
      "John Sargent"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Mister E",
    "key": "mister e",
    "aliases": [
      "Victor Goldstein"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Rose Psychic",
    "key": "rose psychic",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Andrew Bennett",
    "key": "andrew bennett",
    "aliases": [
      "I, Vampire"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Mary Seward",
    "key": "mary seward",
    "aliases": [
      "Queen of Blood"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Amethyst",
    "key": "amethyst",
    "aliases": [
      "Amy Winston"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Princess Amaya",
    "key": "princess amaya",
    "aliases": [
      "Amethyst"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Arion",
    "key": "arion",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Warlord",
    "key": "warlord",
    "aliases": [
      "Travis Morgan"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Etrigan",
    "key": "etrigan",
    "aliases": [
      "Jason Blood"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Timothy Hunter",
    "key": "timothy hunter",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Black Alice",
    "key": "black alice",
    "aliases": [
      "Lori Zechlin"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Nightshade",
    "key": "nightshade",
    "aliases": [
      "Eve Eden"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "The Wizard",
    "key": "the wizard",
    "aliases": [
      "William Asmodeus Zard"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Wotan",
    "key": "wotan",
    "aliases": [],
    "class": "magical_occult"
  },
  {
    "canonical": "Kobra",
    "key": "kobra",
    "aliases": [
      "Jeffrey Burr"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Solomon Grundy",
    "key": "solomon grundy",
    "aliases": [
      "Cyrus Gold"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Spectre",
    "key": "spectre",
    "aliases": [
      "Jim Corrigan"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Spectre",
    "key": "spectre",
    "aliases": [
      "Crispus Allen"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Spectre",
    "key": "spectre",
    "aliases": [
      "Hal Jordan"
    ],
    "class": "magical_occult"
  },
  {
    "canonical": "Cyborg",
    "key": "cyborg",
    "aliases": [
      "Victor Stone"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Dorothy Spinner",
    "key": "dorothy spinner",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Flex Mentallo",
    "key": "flex mentallo",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Coagula",
    "key": "coagula",
    "aliases": [
      "Kate Godwin"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Niles Caulder",
    "key": "niles caulder",
    "aliases": [
      "The Chief"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Beast Boy",
    "key": "beast boy",
    "aliases": [
      "Garfield Logan"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Red Tornado",
    "key": "red tornado",
    "aliases": [
      "John Smith"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Tomorrow Woman",
    "key": "tomorrow woman",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Hourman",
    "key": "hourman",
    "aliases": [
      "Matthew Tyler"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "OMAC",
    "key": "omac",
    "aliases": [
      "Buddy Blank"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "OMAC",
    "key": "omac",
    "aliases": [
      "Kevin Kho"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Bride of Frankenstein",
    "key": "bride of frankenstein",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "Creature Commandos",
    "key": "creature commandos",
    "aliases": [
      "G.I. Robot"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "G.I. Robot",
    "key": "g.i. robot",
    "aliases": [
      "J.A.K.E."
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Weasel",
    "key": "weasel",
    "aliases": [
      "John Monroe"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "King Shark",
    "key": "king shark",
    "aliases": [
      "Nanaue"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Orca",
    "key": "orca",
    "aliases": [
      "Grace Balin"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Man-Bat",
    "key": "man-bat",
    "aliases": [
      "Kirk Langstrom"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Cassandra Cain",
    "key": "cassandra cain",
    "aliases": [
      "Orphan"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Jean-Paul Valley",
    "key": "jean-paul valley",
    "aliases": [
      "Azrael"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Michael Lane",
    "key": "michael lane",
    "aliases": [
      "Azrael"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Talon",
    "key": "talon",
    "aliases": [
      "Calvin Rose"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Talon",
    "key": "talon",
    "aliases": [
      "William Cobb"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Deathstroke",
    "key": "deathstroke",
    "aliases": [
      "Slade Wilson"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Ravager",
    "key": "ravager",
    "aliases": [
      "Rose Wilson"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Peacemaker",
    "key": "peacemaker",
    "aliases": [
      "Christopher Smith"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Captain Atom",
    "key": "captain atom",
    "aliases": [
      "Nathaniel Adam"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Metallo",
    "key": "metallo",
    "aliases": [
      "John Corben"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Red Volcano",
    "key": "red volcano",
    "aliases": [],
    "class": "conditioned_created"
  },
  {
    "canonical": "OMAC",
    "key": "omac",
    "aliases": [
      "Michael Costner"
    ],
    "class": "conditioned_created"
  },
  {
    "canonical": "Alanna Strange",
    "key": "alanna strange",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Sardath",
    "key": "sardath",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Hawkman",
    "key": "hawkman",
    "aliases": [
      "Katar Hol"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Hawkwoman",
    "key": "hawkwoman",
    "aliases": [
      "Shiera Hall"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Tommy Tomorrow",
    "key": "tommy tomorrow",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Star Hawkins",
    "key": "star hawkins",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Ultra the Multi-Alien",
    "key": "ultra the multi-alien",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Omega Men",
    "key": "omega men",
    "aliases": [
      "Tigorr"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Omega Men",
    "key": "omega men",
    "aliases": [
      "Primus"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Omega Men",
    "key": "omega men",
    "aliases": [
      "Doc"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "L.E.G.I.O.N.",
    "key": "l.e.g.i.o.n.",
    "aliases": [
      "Vril Dox"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Lady Quark",
    "key": "lady quark",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Harbinger",
    "key": "harbinger",
    "aliases": [
      "Lyla Michaels"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Pariah",
    "key": "pariah",
    "aliases": [
      "Kell Mossa"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Monitor",
    "key": "monitor",
    "aliases": [
      "Mar Novu"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Anti-Monitor",
    "key": "anti-monitor",
    "aliases": [
      "Mobius"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "World Forger",
    "key": "world forger",
    "aliases": [
      "Alpheus"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Perpetua",
    "key": "perpetua",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Krona",
    "key": "krona",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Guardian Appa Ali Apsa",
    "key": "guardian appa ali apsa",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Mogo",
    "key": "mogo",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Rannian Adam Strange",
    "key": "rannian adam strange",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Thanagarian Shayera Hol",
    "key": "thanagarian shayera hol",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Kanjar Ro",
    "key": "kanjar ro",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Mister Nebula",
    "key": "mister nebula",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Scar",
    "key": "scar",
    "aliases": [
      "Guardian"
    ],
    "class": "cosmic"
  },
  {
    "canonical": "Relic",
    "key": "relic",
    "aliases": [],
    "class": "cosmic"
  },
  {
    "canonical": "Jay Garrick",
    "key": "jay garrick",
    "aliases": [
      "Flash"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Wally West",
    "key": "wally west",
    "aliases": [
      "Flash"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Bart Allen",
    "key": "bart allen",
    "aliases": [
      "Kid Flash"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Johnny Quick",
    "key": "johnny quick",
    "aliases": [
      "Johnny Chambers"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Avery Ho",
    "key": "avery ho",
    "aliases": [
      "Flash"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Wallace West",
    "key": "wallace west",
    "aliases": [
      "Kid Flash"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Irey West",
    "key": "irey west",
    "aliases": [
      "Thunderheart"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jai West",
    "key": "jai west",
    "aliases": [
      "Surge"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Dick Grayson",
    "key": "dick grayson",
    "aliases": [
      "Robin"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jason Todd",
    "key": "jason todd",
    "aliases": [
      "Robin"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Tim Drake",
    "key": "tim drake",
    "aliases": [
      "Robin"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Stephanie Brown",
    "key": "stephanie brown",
    "aliases": [
      "Robin"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Damian Wayne",
    "key": "damian wayne",
    "aliases": [
      "Robin"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Carrie Kelley",
    "key": "carrie kelley",
    "aliases": [
      "Robin"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Duke Thomas",
    "key": "duke thomas",
    "aliases": [
      "Signal"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Terry McGinnis",
    "key": "terry mcginnis",
    "aliases": [
      "Batman Beyond"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jace Fox",
    "key": "jace fox",
    "aliases": [
      "Batman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Cassandra Cain",
    "key": "cassandra cain",
    "aliases": [
      "Batgirl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Stephanie Brown",
    "key": "stephanie brown",
    "aliases": [
      "Batgirl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Barbara Gordon",
    "key": "barbara gordon",
    "aliases": [
      "Batgirl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Bette Kane",
    "key": "bette kane",
    "aliases": [
      "Bat-Girl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Helena Wayne",
    "key": "helena wayne",
    "aliases": [
      "Huntress"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Courtney Whitmore",
    "key": "courtney whitmore",
    "aliases": [
      "Stargirl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Sylvester Pemberton",
    "key": "sylvester pemberton",
    "aliases": [
      "Star-Spangled Kid"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jack Knight",
    "key": "jack knight",
    "aliases": [
      "Starman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Ted Knight",
    "key": "ted knight",
    "aliases": [
      "Starman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "David Knight",
    "key": "david knight",
    "aliases": [
      "Starman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Mikaal Tomas",
    "key": "mikaal tomas",
    "aliases": [
      "Starman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Will Payton",
    "key": "will payton",
    "aliases": [
      "Starman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Thom Kallor",
    "key": "thom kallor",
    "aliases": [
      "Starman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Rick Tyler",
    "key": "rick tyler",
    "aliases": [
      "Hourman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Yolanda Montez",
    "key": "yolanda montez",
    "aliases": [
      "Wildcat"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Albert Rothstein",
    "key": "albert rothstein",
    "aliases": [
      "Atom Smasher"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Khalid Nassour",
    "key": "khalid nassour",
    "aliases": [
      "Doctor Fate"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Renee Montoya",
    "key": "renee montoya",
    "aliases": [
      "The Question"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Ryan Choi",
    "key": "ryan choi",
    "aliases": [
      "Atom"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jaime Reyes",
    "key": "jaime reyes",
    "aliases": [
      "Blue Beetle"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Connor Hawke",
    "key": "connor hawke",
    "aliases": [
      "Green Arrow"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Mia Dearden",
    "key": "mia dearden",
    "aliases": [
      "Speedy"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Emiko Queen",
    "key": "emiko queen",
    "aliases": [
      "Red Arrow"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Jackson Hyde",
    "key": "jackson hyde",
    "aliases": [
      "Aquaman"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Garth",
    "key": "garth",
    "aliases": [
      "Tempest"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Donna Troy",
    "key": "donna troy",
    "aliases": [
      "Wonder Girl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Cassie Sandsmark",
    "key": "cassie sandsmark",
    "aliases": [
      "Wonder Girl"
    ],
    "class": "legacy"
  },
  {
    "canonical": "Freddy Freeman",
    "key": "freddy freeman",
    "aliases": [
      "Captain Marvel Jr."
    ],
    "class": "legacy"
  },
  {
    "canonical": "Harleen Quinzel",
    "key": "harleen quinzel",
    "aliases": [
      "Harley Quinn"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Harvey Dent",
    "key": "harvey dent",
    "aliases": [
      "Two-Face"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Edward Nygma",
    "key": "edward nygma",
    "aliases": [
      "Riddler"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Victor Fries",
    "key": "victor fries",
    "aliases": [
      "Mister Freeze"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Pamela Isley",
    "key": "pamela isley",
    "aliases": [
      "Poison Ivy"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Basil Karlo",
    "key": "basil karlo",
    "aliases": [
      "Clayface"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Matt Hagen",
    "key": "matt hagen",
    "aliases": [
      "Clayface"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Preston Payne",
    "key": "preston payne",
    "aliases": [
      "Clayface"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Oswald Cobblepot",
    "key": "oswald cobblepot",
    "aliases": [
      "Penguin"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Waylon Jones",
    "key": "waylon jones",
    "aliases": [
      "Killer Croc"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Arnold Wesker",
    "key": "arnold wesker",
    "aliases": [
      "Ventriloquist"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Warren White",
    "key": "warren white",
    "aliases": [
      "Great White Shark"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Julian Day",
    "key": "julian day",
    "aliases": [
      "Calendar Man"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Thomas Elliot",
    "key": "thomas elliot",
    "aliases": [
      "Hush"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Lincoln March",
    "key": "lincoln march",
    "aliases": [
      "Owlman"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Professor Pyg",
    "key": "professor pyg",
    "aliases": [
      "Lazlo Valentin"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Anarky",
    "key": "anarky",
    "aliases": [
      "Lonnie Machin"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Cluemaster",
    "key": "cluemaster",
    "aliases": [
      "Arthur Brown"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Ratcatcher",
    "key": "ratcatcher",
    "aliases": [
      "Otis Flannegan"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Ratcatcher 2",
    "key": "ratcatcher 2",
    "aliases": [
      "Cleo Cazo"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Maxie Zeus",
    "key": "maxie zeus",
    "aliases": [
      "Maxie Zeus"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Kite Man",
    "key": "kite man",
    "aliases": [
      "Charles Brown"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Polka-Dot Man",
    "key": "polka-dot man",
    "aliases": [
      "Abner Krill"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Condiment King",
    "key": "condiment king",
    "aliases": [
      "Mitchell Mayo"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Captain Cold",
    "key": "captain cold",
    "aliases": [
      "Leonard Snart"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Heat Wave",
    "key": "heat wave",
    "aliases": [
      "Mick Rory"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Mirror Master",
    "key": "mirror master",
    "aliases": [
      "Sam Scudder"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Mirror Master",
    "key": "mirror master",
    "aliases": [
      "Evan McCulloch"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Weather Wizard",
    "key": "weather wizard",
    "aliases": [
      "Mark Mardon"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Trickster",
    "key": "trickster",
    "aliases": [
      "James Jesse"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Trickster",
    "key": "trickster",
    "aliases": [
      "Axel Walker"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Pied Piper",
    "key": "pied piper",
    "aliases": [
      "Hartley Rathaway"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Golden Glider",
    "key": "golden glider",
    "aliases": [
      "Lisa Snart"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Top",
    "key": "top",
    "aliases": [
      "Roscoe Dillon"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Abra Kadabra",
    "key": "abra kadabra",
    "aliases": [
      "Abra Kadabra"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Doctor Alchemy",
    "key": "doctor alchemy",
    "aliases": [
      "Albert Desmond"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Reverse-Flash",
    "key": "reverse-flash",
    "aliases": [
      "Eobard Thawne"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Zoom",
    "key": "zoom",
    "aliases": [
      "Hunter Zolomon"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Black Manta",
    "key": "black manta",
    "aliases": [
      "David Hyde"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Ocean Master",
    "key": "ocean master",
    "aliases": [
      "Orm Marius"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Cheetah",
    "key": "cheetah",
    "aliases": [
      "Barbara Ann Minerva"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Doctor Psycho",
    "key": "doctor psycho",
    "aliases": [
      "Edgar Cizko"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Giganta",
    "key": "giganta",
    "aliases": [
      "Doris Zeul"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Silver Swan",
    "key": "silver swan",
    "aliases": [
      "Vanessa Kapatelis"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Toyman",
    "key": "toyman",
    "aliases": [
      "Winslow Schott"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Prankster",
    "key": "prankster",
    "aliases": [
      "Oswald Loomis"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Parasite",
    "key": "parasite",
    "aliases": [
      "Rudy Jones"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Metallo",
    "key": "metallo",
    "aliases": [
      "John Corben"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Livewire",
    "key": "livewire",
    "aliases": [
      "Leslie Willis"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Faora Hu-Ul",
    "key": "faora hu-ul",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Black Adam",
    "key": "black adam",
    "aliases": [
      "Teth-Adam"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Doctor Sivana",
    "key": "doctor sivana",
    "aliases": [
      "Thaddeus Sivana"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Mister Mind",
    "key": "mister mind",
    "aliases": [],
    "class": "fall_villain"
  },
  {
    "canonical": "Ibac",
    "key": "ibac",
    "aliases": [
      "Stanley Printwhistle"
    ],
    "class": "fall_villain"
  },
  {
    "canonical": "Lois Lane",
    "key": "lois lane",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Jimmy Olsen",
    "key": "jimmy olsen",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Perry White",
    "key": "perry white",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Alfred Pennyworth",
    "key": "alfred pennyworth",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "James Gordon",
    "key": "james gordon",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Lucius Fox",
    "key": "lucius fox",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Leslie Thompkins",
    "key": "leslie thompkins",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Vicki Vale",
    "key": "vicki vale",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Maggie Sawyer",
    "key": "maggie sawyer",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Steve Trevor",
    "key": "steve trevor",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Etta Candy",
    "key": "etta candy",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Iris West",
    "key": "iris west",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Linda Park",
    "key": "linda park",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Patty Spivot",
    "key": "patty spivot",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Henry Allen",
    "key": "henry allen",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Nora Allen",
    "key": "nora allen",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Joe West",
    "key": "joe west",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Silas Stone",
    "key": "silas stone",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Sarah Charles",
    "key": "sarah charles",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Jonathan Kent",
    "key": "jonathan kent",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Martha Kent",
    "key": "martha kent",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Lana Lang",
    "key": "lana lang",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Pete Ross",
    "key": "pete ross",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Emil Hamilton",
    "key": "emil hamilton",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Mercy Graves",
    "key": "mercy graves",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Bibbo Bibbowski",
    "key": "bibbo bibbowski",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Commissioner Henderson",
    "key": "commissioner henderson",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Dale Gunn",
    "key": "dale gunn",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Snapper Carr",
    "key": "snapper carr",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "King Faraday",
    "key": "king faraday",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Cameron Chase",
    "key": "cameron chase",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Bones",
    "key": "bones",
    "aliases": [
      "Director Bones"
    ],
    "class": "special"
  },
  {
    "canonical": "Steve Lombard",
    "key": "steve lombard",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Cat Grant",
    "key": "cat grant",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Ron Troupe",
    "key": "ron troupe",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Dan Turpin",
    "key": "dan turpin",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Guardian",
    "key": "guardian",
    "aliases": [
      "Jim Harper"
    ],
    "class": "special"
  },
  {
    "canonical": "Professor Emil Hamilton",
    "key": "professor emil hamilton",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Brother Power the Geek",
    "key": "brother power the geek",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Prez Rickard",
    "key": "prez rickard",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "B’wana Beast",
    "key": "b’wana beast",
    "aliases": [
      "Mike Maxwell"
    ],
    "class": "special"
  },
  {
    "canonical": "Dogwelder",
    "key": "dogwelder",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Bueno Excellente",
    "key": "bueno excellente",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Friendly Fire",
    "key": "friendly fire",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Sixpack",
    "key": "sixpack",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Section 8",
    "key": "section 8",
    "aliases": [
      "Baytor"
    ],
    "class": "special"
  },
  {
    "canonical": "G’nort",
    "key": "g’nort",
    "aliases": [
      "Green Lantern"
    ],
    "class": "special"
  },
  {
    "canonical": "Matter-Eater Lad",
    "key": "matter-eater lad",
    "aliases": [
      "Tenzil Kem"
    ],
    "class": "special"
  },
  {
    "canonical": "Arm-Fall-Off-Boy",
    "key": "arm-fall-off-boy",
    "aliases": [
      "Floyd Belkin"
    ],
    "class": "special"
  },
  {
    "canonical": "Color Kid",
    "key": "color kid",
    "aliases": [
      "Ulu Vakk"
    ],
    "class": "special"
  },
  {
    "canonical": "Stone Boy",
    "key": "stone boy",
    "aliases": [
      "Dag Wentim"
    ],
    "class": "special"
  },
  {
    "canonical": "Bouncing Boy",
    "key": "bouncing boy",
    "aliases": [
      "Chuck Taine"
    ],
    "class": "special"
  },
  {
    "canonical": "Infectious Lass",
    "key": "infectious lass",
    "aliases": [
      "Drura Sehpt"
    ],
    "class": "special"
  },
  {
    "canonical": "Chlorophyll Kid",
    "key": "chlorophyll kid",
    "aliases": [
      "Ral Benem"
    ],
    "class": "special"
  },
  {
    "canonical": "Polar Boy",
    "key": "polar boy",
    "aliases": [
      "Brek Bannin"
    ],
    "class": "special"
  },
  {
    "canonical": "Night Girl",
    "key": "night girl",
    "aliases": [
      "Lydda Jath"
    ],
    "class": "special"
  },
  {
    "canonical": "Fire Lad",
    "key": "fire lad",
    "aliases": [
      "Staq Mavlen"
    ],
    "class": "special"
  },
  {
    "canonical": "Porcupine Pete",
    "key": "porcupine pete",
    "aliases": [
      "Peter Dursin"
    ],
    "class": "special"
  },
  {
    "canonical": "Double-Header",
    "key": "double-header",
    "aliases": [
      "Frenk and Dyvud Retzun"
    ],
    "class": "special"
  },
  {
    "canonical": "Comet Queen",
    "key": "comet queen",
    "aliases": [
      "Grava"
    ],
    "class": "special"
  },
  {
    "canonical": "Dream of the Endless",
    "key": "dream of the endless",
    "aliases": [
      "Morpheus"
    ],
    "class": "special"
  },
  {
    "canonical": "Michael Demiurgos",
    "key": "michael demiurgos",
    "aliases": [],
    "class": "special"
  },
  {
    "canonical": "Elaine Belloc",
    "key": "elaine belloc",
    "aliases": [],
    "class": "special"
  }
];

  var AMBIGUOUS = {
  "flash": {
    "default": "barry allen",
    "holders": [
      "barry allen",
      "wally west",
      "jay garrick",
      "bart allen"
    ]
  },
  "green lantern": {
    "default": "hal jordan",
    "holders": [
      "hal jordan",
      "john stewart",
      "guy gardner",
      "kyle rayner",
      "jessica cruz",
      "simon baz",
      "jo mulleins"
    ]
  },
  "robin": {
    "default": "dick grayson",
    "holders": [
      "dick grayson",
      "jason todd",
      "tim drake",
      "stephanie brown",
      "damian wayne"
    ]
  },
  "batgirl": {
    "default": "barbara gordon",
    "holders": [
      "barbara gordon",
      "cassandra cain",
      "stephanie brown"
    ]
  },
  "azrael": {
    "default": "jean-paul valley",
    "holders": [
      "jean-paul valley",
      "michael lane"
    ]
  },
  "blue beetle": {
    "default": "jaime reyes",
    "holders": [
      "dan garrett",
      "ted kord",
      "jaime reyes"
    ]
  },
  "the question": {
    "default": "vic sage",
    "holders": [
      "vic sage",
      "renee montoya"
    ]
  },
  "question": {
    "default": "vic sage",
    "holders": [
      "vic sage",
      "renee montoya"
    ]
  },
  "doctor fate": {
    "default": "kent nelson",
    "holders": [
      "kent nelson",
      "khalid nassour"
    ]
  },
  "atom": {
    "default": "ray palmer",
    "holders": [
      "ray palmer",
      "ryan choi",
      "al pratt"
    ]
  },
  "starman": {
    "default": "jack knight",
    "holders": [
      "ted knight",
      "jack knight",
      "thom kallor"
    ]
  },
  "hawkman": {
    "default": "carter hall",
    "holders": [
      "carter hall",
      "katar hol"
    ]
  },
  "hawkgirl": {
    "default": "kendra saunders",
    "holders": [
      "kendra saunders",
      "shayera hol"
    ]
  },
  "wildcat": {
    "default": "ted grant",
    "holders": [
      "ted grant",
      "yolanda montez"
    ]
  },
  "vigilante": {
    "default": "adrian chase",
    "holders": [
      "greg saunders",
      "adrian chase"
    ]
  },
  "manhunter": {
    "default": "kate spencer",
    "holders": [
      "paul kirk",
      "kate spencer"
    ]
  },
  "clayface": {
    "default": "basil karlo",
    "holders": [
      "basil karlo",
      "matt hagen",
      "preston payne"
    ]
  },
  "killer frost": {
    "default": "caitlin snow",
    "holders": [
      "crystal frost",
      "louise lincoln",
      "caitlin snow"
    ]
  }
};

  var WORLD_HUBS = {
  "gotham": [
    "Gotham City",
    "GCPD",
    "Wayne Enterprises",
    "Arkham",
    "Crime Alley"
  ],
  "metropolis": [
    "Metropolis",
    "Daily Planet",
    "LexCorp",
    "Suicide Slum",
    "S.T.A.R. Labs Metropolis"
  ],
  "central_keystone": [
    "Central City",
    "Keystone City",
    "CCPD",
    "S.T.A.R. Labs Central City"
  ],
  "coast_city": [
    "Coast City",
    "Ferris Aircraft",
    "Ferris Air"
  ],
  "star_city": [
    "Star City",
    "Queen Industries"
  ],
  "fawcett": [
    "Fawcett City",
    "Rock of Eternity"
  ],
  "bludhaven": [
    "Blüdhaven",
    "Bludhaven"
  ],
  "hub_city": [
    "Hub City"
  ],
  "ivy_town": [
    "Ivy Town"
  ],
  "opal_city": [
    "Opal City"
  ],
  "dakota": [
    "Dakota City",
    "Dakota"
  ],
  "themyscira": [
    "Themyscira",
    "Paradise Island"
  ],
  "atlantis": [
    "Atlantis",
    "Poseidonis",
    "Xebel"
  ],
  "oa": [
    "Oa",
    "Green Lantern Corps",
    "Guardians of the Universe"
  ],
  "apokolips": [
    "Apokolips"
  ],
  "new_genesis": [
    "New Genesis"
  ],
  "tamaran": [
    "Tamaran"
  ],
  "rann": [
    "Rann"
  ],
  "thanagar": [
    "Thanagar"
  ],
  "gorilla_city": [
    "Gorilla City"
  ],
  "azarath": [
    "Azarath"
  ],
  "gemworld": [
    "Gemworld"
  ],
  "dreaming": [
    "The Dreaming"
  ],
  "rock_of_eternity": [
    "Rock of Eternity"
  ]
};

  var FACTIONS = {
  "argus": [
    "A.R.G.U.S.",
    "ARGUS"
  ],
  "cadmus": [
    "Project Cadmus",
    "Cadmus"
  ],
  "checkmate": [
    "Checkmate"
  ],
  "league_assassins": [
    "League of Assassins",
    "League of Shadows"
  ],
  "st_dumas": [
    "Order of St. Dumas",
    "St. Dumas"
  ],
  "court_owls": [
    "Court of Owls"
  ],
  "green_lantern_corps": [
    "Green Lantern Corps"
  ],
  "sinestro_corps": [
    "Sinestro Corps"
  ],
  "star_sapphires": [
    "Star Sapphires"
  ],
  "reach": [
    "The Reach",
    "Reach"
  ],
  "task_force_x": [
    "Task Force X",
    "Suicide Squad"
  ],
  "doom_patrol": [
    "Doom Patrol"
  ],
  "titans": [
    "Teen Titans",
    "Titans"
  ],
  "justice_league": [
    "Justice League"
  ],
  "jsa": [
    "Justice Society",
    "JSA"
  ],
  "lexcorp": [
    "LexCorp"
  ],
  "wayne": [
    "Wayne Enterprises"
  ],
  "ferris": [
    "Ferris Aircraft"
  ],
  "daily_planet": [
    "Daily Planet"
  ],
  "star_labs": [
    "S.T.A.R. Labs",
    "STAR Labs"
  ],
  "lords_order": [
    "Lords of Order"
  ],
  "lords_chaos": [
    "Lords of Chaos"
  ],
  "the_green": [
    "The Green"
  ],
  "parliament_trees": [
    "Parliament of Trees"
  ],
  "intergang": [
    "Intergang"
  ],
  "kobra": [
    "Kobra"
  ],
  "hive": [
    "H.I.V.E.",
    "HIVE"
  ],
  "spyral": [
    "Spyral"
  ],
  "leviathan": [
    "Leviathan"
  ]
};

  var CLASS_RULES = {
  "born_extraordinary": "Innate biology or heritage may pre-exist the Heroic Age. Do not strip it away for an accident. The origin is discovery, control, ethics, identity and entry into the wider world.",
  "transformed": "Start before the defining transformation when possible. Future-associated powers stay locked until a played catalyst and aftermath establish them.",
  "chosen_bonded": "The source can exist before the player, but selection/bonding is a played event. A ring, Scarab, wizard or artefact is not silently granted because canon says it eventually happens.",
  "self_made": "No power accident is required. Progress comes through skills, investigation, motive, tools, methods, costume/symbol and reputation. Attempts are not automatic successes.",
  "conditioned_created": "Conditioning, experimentation or weaponisation may shape the starting history, but the script never uses it to steal player agency or predetermine loyalties.",
  "magical_occult": "Use character-specific magic and occult rules, not generic spellcasting. Public knowledge of magic begins low. Costs, teachers, artefacts and entities retain their own logic.",
  "cosmic": "The character may begin away from Earth or already extraordinary. Earth can still have zero public heroes. Keep cosmic societies distinct from Earth’s public Heroic Age.",
  "legacy": "A mantle may depend on predecessors. Build prerequisite history as parallel threads; never materialise a mature heroic ecosystem at turn one just to make the origin convenient.",
  "fall_villain": "The famous villain identity is a possibility, not destiny. Establish civilian life, work, relationships and pressures first. A preventable fall stays preventable.",
  "special": "Use a tailored, conservative origin. For civilians/supporting cast, the story can remain civilian. For reality-scale entities, “origin” means an appropriate early personal stage, not artificially removing inherent nature."
};

  var PHASES = [
  "FOUNDATION",
  "PRESSURE",
  "THRESHOLD",
  "CATALYST",
  "AFTERMATH",
  "DISCOVERY",
  "PRACTICE",
  "PURPOSE",
  "PROTOTYPE IDENTITY",
  "FIRST TEST",
  "PUBLIC EMERGENCE",
  "ESTABLISHED / OPEN WORLD"
];

  // ENGINE INVARIANTS — maintained deliberately for long-running Adventures.
  // 01. The registry is a reliability layer, never a whitelist.
  // 02. Unknown selections remain playable through universal fallback.
  // 03. Player-authored deliberate choices outrank model-authored assumptions.
  // 04. Uncertain attempted actions are not treated as successful outcomes.
  // 05. A locked transformed/chosen power needs a played catalyst first.
  // 06. Innate/cosmic nature is not removed merely to manufacture an accident.
  // 07. Origin phase is descriptive state, not a turn-count timer.
  // 08. Origin percentage never forces a catalyst.
  // 09. Future comic canon has lower authority than played continuity.
  // 10. Legacy prerequisites develop through evidence, not name repetition.
  // 11. A predecessor may diverge and need not become their famous identity.
  // 12. Secret knowledge requires an evidence path.
  // 13. Story Card truth is not universal NPC knowledge.
  // 14. Private superhuman events do not automatically alter public awareness.
  // 15. Public awareness requires witnesses, recordings, broadcasts or evidence.
  // 16. Public extraordinary figures are not automatically labelled heroes.
  // 17. Relationship labels require explicit or repeated played evidence.
  // 18. Famous future romances are never preloaded as obligations.
  // 19. Player attraction and consent are never inferred from NPC behaviour.
  // 20. Under-18 player origins are never sexualised.
  // 21. Age-uncertain player origins remain non-sexual until adulthood is established.
  // 22. Adult sexual activity stays non-graphic/fade-to-black.
  // 23. Mature tone may include strong profanity without forcing profanity every turn.
  // 24. Graphic non-sexual violence may be concrete without requiring constant gore.
  // 25. Injury evidence remains bounded but should not be casually forgotten.
  // 26. Famous characters receive no automatic plot armour.
  // 27. Auto NPC cards are limited to recognised DC identities.
  // 28. Repeated arbitrary capitalised nouns do not create dynamic character cards.
  // 29. Dynamic arrays and maps have hard caps.
  // 30. State cleanup is part of normal operation, not an emergency fallback.
  // 31. Slash commands use a relay because Input-hook stop is documented to error.
  // 32. Commands do not intentionally advance fiction.
  // 33. Context injection respects info.maxChars and a configurable runtime budget.
  // 34. Runtime cards are summaries, not higher authority than played prose.
  // 35. Model uncertainty should produce conservative continuity, not invented canon.
  // 36. Supporting/civilian characters are allowed to stay civilian.
  // 37. Villain falls are possibilities, not destiny.
  // 38. Self-made origins are not converted into random metahuman accidents.
  // 39. Magical characters keep character-specific rules rather than generic spell lists.
  // 40. Cosmic origins can begin off Earth without pre-creating Earth hero culture.
  // 41. Existing expertise is not erased for artificial progression.
  // 42. Skill evidence supplements rather than replaces canonical competence.
  // 43. Repeated scene stalls produce a momentum warning rather than puppeting the player.
  // 44. NPCs may act autonomously while the player's next meaningful choice stays open.
  // 45. Parallel origins are staggered and causal, never a celebrity roll-call.
  // 46. Faction membership is not inferred from a mere organisation mention.
  // 47. The script records evidence, not hidden psychological truth.
  // 48. Wrong NPC theories remain possible.
  // 49. Dynamic Story Card updates are conservative and bounded.
  // 50. Script errors fail soft and preserve the player's text when possible.
  // 51. The engine avoids network/database assumptions unavailable inside AI Dungeon scripts.
  // 52. The local harness validates deterministic mechanics, not model quality.
  // 53. Live AI Dungeon testing remains the final authority on UI/model behaviour.
  // 54. No subsystem may silently overwrite the sole-player agency rule.
  // 55. No subsystem may silently overwrite played continuity with future canon.
  // 56. No subsystem may treat age uncertainty as permission for sexual content.
  // 57. No subsystem may classify a public figure as heroic without supporting prose.
  // 58. No subsystem may establish a legacy prerequisite from plain repetition alone.
  // 59. No subsystem may unlock a future power from input text alone.
  // 60. If a heuristic conflicts with the story, the story wins.
  var VERSION = "REBUILT-MATURE-PROFILES-2026-09-20";
  var SCHEMA = 10;

  // Runtime configuration is intentionally compact and bounded. The AI Dungeon scripting
  // sandbox has a short execution window, so this engine prefers deterministic lookups,
  // capped arrays, and conservative evidence over expensive inference.
  var CONFIG_MEMO = null;

  var DEFAULTS = {
    enabled: true,
    originPacing: "slow",
    canonMode: "placeholder",
    visibleStatus: true,
    contextBudget: 8400,
    minimumOriginTurns: 12,
    parallelOrigins: true,
    legacyPrerequisites: true,
    publicConsequences: true,
    autoCharacterCards: true,
    mentionThreshold: 2,
    maxAutoNpcCards: 24,
    relationshipTracking: true,
    knowledgeTracking: true,
    factionTracking: true,
    worldTracking: true,
    antiJunk: true,
    diagnostics: true,
    matureTone: true,
    strongLanguage: true,
    graphicViolence: true,
    adultRomance: true,
    sexualDetail: "nonGraphic",
    minorSafeguards: true,
    injuryTracking: true,
    sceneMomentum: true,
    maxRelations: 30,
    maxKnowledgeFacts: 44,
    maxDivergences: 30,
    maxThreads: 18,
    maxSignals: 24,
    maxInjuries: 14,
    maxSceneBeats: 8,
    maxFactions: 18
  };

  // A safety-oriented age hint layer. "unknown" never means a character is a minor;
  // it only means the script will not invite sexual content until adulthood is established.
  // The explicit scenario age placeholder always overrides this hint.
  var AGE_HINTS = {
    "clark kent":"adult", "bruce wayne":"adult", "diana":"adult", "barry allen":"adult",
    "hal jordan":"adult", "john stewart":"adult", "arthur curry":"adult", "oliver queen":"adult",
    "dinah lance":"adult", "john constantine":"adult", "zatanna zatara":"adult", "alec holland":"adult",
    "harleen quinzel":"adult", "pamela isley":"adult", "selina kyle":"adult", "lex luthor":"adult",
    "harvey dent":"adult", "victor fries":"adult", "edward nygma":"adult", "slade wilson":"adult",
    "floyd lawton":"adult", "jean-paul valley":"adult", "daniel cassidy":"adult", "rory regan":"adult",
    "lois lane":"adult", "jimmy olsen":"unknown", "michael holt":"adult", "ted kord":"adult",
    "ray palmer":"adult", "buddy baker":"adult", "adam strange":"adult", "scott free":"adult",
    "barda free":"adult", "mari mccabe":"adult", "jefferson pierce":"adult", "kate kane":"adult",
    "renee montoya":"adult", "vic sage":"adult", "kate spencer":"adult", "lucius fox":"adult",
    "jim gordon":"adult", "amanda waller":"adult", "lobo":"adult", "darkseid":"adult",
    "billy batson":"minor", "dick grayson":"minor", "jason todd":"minor", "tim drake":"minor",
    "damian wayne":"minor", "stephanie brown":"minor", "cassandra cain":"minor", "wally west":"minor",
    "jaime reyes":"minor", "virgil hawkins":"minor", "garfield logan":"minor", "raven":"minor",
    "cassie sandsmark":"minor", "courtney whitmore":"minor", "mia dearden":"minor", "jon kent":"minor"
  };

  var ABILITY_ALIASES = {
    "super speed":["super-speed","super speed","speedster speed","moves impossibly fast","moves faster than"],
    "accelerated perception":["accelerated perception","world slows","everything slows","time seems to slow"],
    "phasing":["phase through","phases through","vibrate through","passes through solid"],
    "speed force":["speed force"],
    "flight":["flies","flying","takes flight","take flight","levitates","levitation","airborne under your own power"],
    "strength":["super strength","superhuman strength","impossible strength"],
    "heat vision":["heat vision","beams from your eyes","eyes burn red"],
    "x-ray vision":["x-ray vision","x ray vision","see through the wall","see through walls"],
    "power ring":["green lantern ring","lantern ring","power ring"],
    "constructs":["hard-light construct","hard light construct","ring construct","green construct"],
    "force field":["force field","energy shield","ring shield"],
    "canary cry":["canary cry","sonic scream","sonic cry"],
    "telepathy":["telepathy","reads minds","mind-to-mind","mental link"],
    "shape-shifting":["shape-shift","shapeshift","changes form","turns into"],
    "cybernetics":["cybernetic","mechanical body","machine components","prosthetic systems"],
    "interface":["interfaces with","connects directly to the network","machine interface"],
    "magic":["casts a spell","spellwork","sorcery","magic surges"],
    "transformation":["transforms","transformation","changes into"],
    "lightning":["summons lightning","magical lightning","lightning erupts"],
    "underwater breathing":["breathes underwater","breathe underwater"],
    "marine communication":["communicates with marine life","speaks to fish","marine telepathy"]
  };

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/[^a-z0-9' -]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function clone(o) {
    try { return JSON.parse(JSON.stringify(o)); }
    catch (e) { return o; }
  }

  function uniqPush(arr, val, max) {
    if (!val) return;
    var target = normalize(typeof val === "string" ? val : JSON.stringify(val));
    for (var i = 0; i < arr.length; i++) {
      var cur = normalize(typeof arr[i] === "string" ? arr[i] : JSON.stringify(arr[i]));
      if (cur === target) return;
    }
    arr.push(val);
    if (max && arr.length > max) arr.splice(0, arr.length - max);
  }

  function safeInt(v, d, min, max) {
    var n = parseInt(v, 10);
    if (!isFinite(n)) n = d;
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  }

  function boolVal(v, d) {
    if (typeof v === "boolean") return v;
    var n = normalize(v);
    if (["true","yes","1","on","enabled"].indexOf(n) >= 0) return true;
    if (["false","no","0","off","disabled"].indexOf(n) >= 0) return false;
    return d;
  }

  function actionNo() {
    return (typeof info !== "undefined" && info && info.actionCount) || 0;
  }

  function maxChars() {
    return (typeof info !== "undefined" && info && info.maxChars) || 16000;
  }

  function getPlaceholder(prefix) {
    var a = (state && state.placeholders) || [];
    var p = normalize(prefix);
    for (var i = 0; i < a.length; i++) {
      if (normalize(a[i].question).indexOf(p) === 0) return String(a[i].answer || "").trim();
    }
    return "";
  }

  function selectedCharacter() {
    var x = getPlaceholder("Which DC character do you want to play");
    if (x) return x;
    var a = (state && state.placeholders) || [];
    return (a[0] && a[0].answer) ? String(a[0].answer).trim() : "Unknown DC Character";
  }

  function selectedMode() {
    var x = normalize(getPlaceholder("Origin mode"));
    if (x.indexOf("wild") >= 0) return "wild";
    if (x.indexOf("flex") >= 0) return "flexible";
    return "canonical";
  }

  function selectedContinuity() {
    var x = getPlaceholder("Optional continuity or incarnation note");
    if (!x || normalize(x) === "default" || normalize(x) === "none") return "Default coherent modern/mainline blend";
    return x;
  }

  function selectedAgeNote() {
    var x = getPlaceholder("Starting age or age note");
    return x || "Canonical";
  }

  function detailedExact(n) {
    var ks = Object.keys(PROFILE_DB);
    for (var i = 0; i < ks.length; i++) {
      var p = PROFILE_DB[ks[i]];
      if (n === normalize(ks[i]) || n === normalize(p.display)) return { key: ks[i], p: p };
      var a = p.aliases || [];
      for (var j = 0; j < a.length; j++) if (n === normalize(a[j])) return { key: ks[i], p: p };
    }
    return null;
  }

  function explicitHolderFromText(raw, mantle) {
    var spec = AMBIGUOUS[mantle], n = normalize(raw);
    if (!spec) return null;
    for (var i = 0; i < spec.holders.length; i++) {
      var h = spec.holders[i], parts = [h];
      var d = PROFILE_DB[h];
      if (d) {
        parts.push(d.display);
        parts = parts.concat(d.aliases || []);
      }
      for (var j = 0; j < parts.length; j++) {
        var q = normalize(parts[j]);
        if (q && n.indexOf(q) >= 0 && q !== mantle) return h;
      }
    }
    return null;
  }

  function enriched(key, p, raw, tier) {
    var q = clone(p);
    q.key = key;
    q.rawSelection = raw;
    q.resolutionTier = tier || "detailed";
    q.registered = true;
    q.fallback = false;
    q.deps = clone(p.deps || []);
    q.legacyNote = p.legacyNote || "";
    return q;
  }

  function indexedProfile(x, raw) {
    return {
      key: normalize(x.canonical),
      display: x.canonical,
      aliases: clone(x.aliases || []),
      cls: x.class || "special",
      loc: "character-appropriate pre-origin location",
      role: "character-appropriate pre-origin life",
      future: (x.aliases && x.aliases.length ? x.aliases[0] : x.canonical),
      pre: "Indexed resolution: preserve only well-established DC foundations and begin before the completed famous identity/transformation when logically possible.",
      catalyst: [], powers: [], deps: [], legacyNote: "",
      registered: true, indexedOnly: true, fallback: false,
      resolutionTier: "indexed", rawSelection: raw
    };
  }

  function fallbackProfile(raw) {
    return {
      key: normalize(raw), display: raw || "Unknown DC Character", aliases: [], cls: "special",
      loc: "character-appropriate pre-origin location",
      role: "character-appropriate pre-origin life",
      future: "the identity associated with this selected DC character, if it is ever adopted",
      pre: "Universal fallback: treat the selection as valid DC input. Use only reliable established knowledge. If a detail is uncertain, keep it unspecified and establish it through play instead of inventing fake canon.",
      catalyst: [], powers: [], deps: [], legacyNote: "",
      registered: false, indexedOnly: false, fallback: true,
      resolutionTier: "universal fallback", rawSelection: raw
    };
  }

  function resolveCharacter(raw) {
    raw = String(raw || "").trim() || "Unknown DC Character";
    var n = normalize(raw);
    if (AMBIGUOUS[n]) {
      var h = explicitHolderFromText(raw, n) || AMBIGUOUS[n].default;
      if (PROFILE_DB[h]) return enriched(h, PROFILE_DB[h], raw, "ambiguous mantle → " + h);
    }
    var dx = detailedExact(n);
    if (dx) return enriched(dx.key, dx.p, raw, "detailed");
    var mantles = Object.keys(AMBIGUOUS);
    for (var mi = 0; mi < mantles.length; mi++) {
      var m = mantles[mi];
      if (n.indexOf(m) >= 0) {
        var eh = explicitHolderFromText(raw, m);
        if (eh && PROFILE_DB[eh]) return enriched(eh, PROFILE_DB[eh], raw, "explicit mantle holder");
      }
    }
    var pieces = raw.split(/[\/()—]+/).map(function(v){ return normalize(v); }).filter(Boolean);
    for (var pi = 0; pi < pieces.length; pi++) {
      var dd = detailedExact(pieces[pi]);
      if (dd) return enriched(dd.key, dd.p, raw, "compound selection");
    }
    for (var i = 0; i < CHARACTER_INDEX.length; i++) {
      var x = CHARACTER_INDEX[i];
      if (n === normalize(x.canonical) || n === normalize(x.key)) return indexedProfile(x, raw);
      for (var j = 0; j < (x.aliases || []).length; j++) {
        if (n === normalize(x.aliases[j])) return indexedProfile(x, raw);
      }
    }
    return fallbackProfile(raw);
  }

  function findCard(token) {
    var t = normalize(token);
    for (var i = 0; i < (storyCards || []).length; i++) {
      var sc = storyCards[i] || {};
      if (normalize(sc.keys || "").indexOf(t) >= 0 || normalize(sc.title || "") === t) return i;
    }
    return -1;
  }

  function readAllConfig() {
    if (CONFIG_MEMO) return clone(CONFIG_MEMO);
    var cfg = clone(DEFAULTS), idxs = [];
    for (var i = 0; i < (storyCards || []).length; i++) {
      var k = normalize((storyCards[i] || {}).keys || "");
      if (k.indexOf("dc_config_core") >= 0 || k.indexOf("dc_config_tracking") >= 0 ||
          k.indexOf("dc_config_mature") >= 0 || k.indexOf("dc_config_scene") >= 0 ||
          k.indexOf("dc_config") >= 0) idxs.push(i);
    }
    for (var q = 0; q < idxs.length; q++) {
      var sc = storyCards[idxs[q]] || {};
      var lines = String(sc.value || sc.entry || "").split(/\r?\n/);
      for (var z = 0; z < lines.length; z++) {
        var m = lines[z].match(/^\s*([A-Za-z][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
        if (!m || !Object.prototype.hasOwnProperty.call(cfg, m[1])) continue;
        var key = m[1], val = m[2];
        if (typeof cfg[key] === "boolean") cfg[key] = boolVal(val, cfg[key]);
        else if (typeof cfg[key] === "number") cfg[key] = safeInt(val, cfg[key], 0, 20000);
        else cfg[key] = String(val).trim();
      }
    }
    cfg.contextBudget = safeInt(cfg.contextBudget, 8400, 3000, 12000);
    cfg.minimumOriginTurns = safeInt(cfg.minimumOriginTurns, 12, 0, 100);
    cfg.mentionThreshold = safeInt(cfg.mentionThreshold, 2, 2, 8);
    cfg.maxAutoNpcCards = safeInt(cfg.maxAutoNpcCards, 24, 0, 40);
    cfg.maxRelations = safeInt(cfg.maxRelations, 30, 4, 60);
    cfg.maxKnowledgeFacts = safeInt(cfg.maxKnowledgeFacts, 44, 6, 100);
    cfg.maxDivergences = safeInt(cfg.maxDivergences, 30, 4, 80);
    cfg.maxThreads = safeInt(cfg.maxThreads, 18, 2, 36);
    cfg.maxSignals = safeInt(cfg.maxSignals, 24, 4, 60);
    cfg.maxInjuries = safeInt(cfg.maxInjuries, 14, 0, 30);
    cfg.maxSceneBeats = safeInt(cfg.maxSceneBeats, 8, 2, 20);
    cfg.maxFactions = safeInt(cfg.maxFactions, 18, 4, 40);
    if (["slow","normal","fast"].indexOf(normalize(cfg.originPacing)) < 0) cfg.originPacing = "slow";
    if (["nonGraphic","nongraphic","fadeToBlack","fade-to-black"].indexOf(String(cfg.sexualDetail)) < 0) cfg.sexualDetail = "nonGraphic";
    CONFIG_MEMO = clone(cfg);
    return clone(cfg);
  }

  function ageStatusFromNote(note, p) {
    var n = normalize(note);
    var m = n.match(/\b(\d{1,3})\b/);
    if (m) return parseInt(m[1], 10) >= 18 ? "adult" : "minor";
    if (/\badult\b|\bover 18\b|\b18\+\b/.test(n)) return "adult";
    if (/\bminor\b|\bteen(?:ager)?\b|\bunder 18\b|\bchild\b/.test(n)) return "minor";
    return AGE_HINTS[p.key] || "unknown";
  }

  function makeAbilityState(p) {
    var out = {};
    (p.powers || []).forEach(function(x) {
      var innate = p.cls === "born_extraordinary" || p.cls === "cosmic" || p.cls === "magical_occult";
      out[x] = { status: innate ? "undemonstrated/innate-possible" : "locked", evidence: [], count: 0 };
    });
    return out;
  }

  function makeThreads(p, cfg) {
    var a = [];
    if (cfg.legacyPrerequisites) {
      (p.deps || []).forEach(function(x) {
        a.push({ subject: x, type: "prerequisite", stage: 0, status: "not established", evidence: [], neededFor: p.future || p.display, lastAction: -999 });
      });
    }
    return a.slice(0, cfg.maxThreads);
  }

  function freshState(old) {
    var cfg = readAllConfig();
    var raw = selectedCharacter();
    var p = resolveCharacter(raw);
    var ageNote = selectedAgeNote();
    var S = {
      schema: SCHEMA,
      version: VERSION,
      identity: {
        raw: raw,
        profile: p,
        mode: selectedMode(),
        continuity: selectedContinuity(),
        ageNote: ageNote,
        ageStatus: ageStatusFromNote(ageNote, p),
        resolvedAt: actionNo(),
        playerCardIndex: -1,
        playerCardMarker: "",
        basePlayerCard: ""
      },
      origin: {
        phase: 0, progress: 0, catalyst: false, catalystEvidence: [], milestones: [],
        lastAdvanceAction: 0, identityEstablished: false, identityName: "",
        externalLabels: [], costumeEstablished: false, firstTest: false, publicEmergence: false
      },
      abilities: { byName: makeAbilityState(p) },
      skills: { byName: {} },
      world: {
        heroicAge: 0, publicHeroes: [], publicVillains: [], publicUnknowns: [],
        awareness: { metahuman: 0, alien: 0, magic: 0, vigilante: 0, cosmic: 0 },
        justiceLeague: false, firstPublicEvent: "None established", events: []
      },
      threads: makeThreads(p, cfg),
      knowledge: [],
      relations: {},
      factions: {},
      mentions: {},
      autoNpcKeys: [],
      divergence: [],
      signals: [],
      injuries: [],
      scene: { recent: [], stallCount: 0, lastSubstantiveAction: 0 },
      maturity: { ageStatus: ageStatusFromNote(ageNote, p), consentNotes: [], adultSexAllowed: false },
      command: { pending: null, output: null },
      counters: { inputs: 0, outputs: 0, contexts: 0, lastAction: 0, errors: 0 },
      health: { lastCardSync: 0, lastContextSize: 0, lastError: "", upgradedFrom: (old && old.schema) || 0, cardIndexCache: {}, lastPlayerCardBody: "" }
    };
    S.maturity.adultSexAllowed = cfg.adultRomance && S.maturity.ageStatus === "adult";
    if (old && Array.isArray(old.divergence)) S.divergence = old.divergence.slice(-cfg.maxDivergences);
    return S;
  }

  function ensureState() {
    var old = state.dcbth;
    if (!old || old.schema !== SCHEMA) state.dcbth = freshState(old);
    var S = state.dcbth;
    var cur = selectedCharacter();
    if (normalize(cur) !== normalize(S.identity.raw) && actionNo() <= 2) state.dcbth = freshState(null);
    return state.dcbth;
  }

  function profile() { return ensureState().identity.profile; }

  function safeUpsert(marker, keys, entry, type) {
    var S = ensureState();
    try {
      if (!S.health.cardIndexCache) S.health.cardIndexCache = {};
      var mk = normalize(marker), idx = S.health.cardIndexCache[mk];
      var valid = idx !== undefined && idx !== null && idx >= 0 && idx < (storyCards || []).length;
      if (valid) {
        var cached = storyCards[idx] || {};
        valid = normalize(cached.keys || "").indexOf(mk) >= 0 || normalize(cached.title || "") === mk;
      }
      if (!valid) {
        idx = findCard(marker);
        if (idx >= 0) S.health.cardIndexCache[mk] = idx;
      }
      if (idx >= 0) {
        var cur = storyCards[idx] || {};
        if (String(cur.keys || "") !== String(keys || "") || String(cur.value || cur.entry || "") !== String(entry || "") || String(cur.type || "") !== String(type || "")) {
          updateStoryCard(idx, keys, entry, type);
        }
        S.health.cardIndexCache[mk] = idx;
        return idx;
      }
      var ni = addStoryCard(keys, entry, type);
      if (ni !== false && ni >= 0) S.health.cardIndexCache[mk] = ni;
      return ni === false ? -1 : ni;
    } catch (e) {
      S.counters.errors++;
      S.health.lastError = String(e);
      try { log("DCBTH StoryCard error: " + e); } catch (_e) {}
      return -1;
    }
  }

  function playerKeys(p) {
    var a = ["DC_PLAYER", p.display, p.rawSelection || ""].concat(p.aliases || []), seen = {}, out = [];
    a.forEach(function(v) {
      var n = normalize(v);
      if (n && !seen[n]) { seen[n] = 1; out.push(v); }
    });
    return out.join(",");
  }

  function splitCardKeys(sc) {
    return String((sc || {}).keys || "").split(",").map(function(v){ return normalize(v); }).filter(Boolean);
  }

  function profileMarkerForCard(sc) {
    var parts = String((sc || {}).keys || "").split(",");
    for (var i = 0; i < parts.length; i++) {
      var raw = String(parts[i] || "").trim();
      if (/^DC_PROFILE_/i.test(raw)) return raw;
    }
    return "";
  }

  function selectedCharacterCardIndex(S) {
    var p = S.identity.profile, wanted = {}, raw = [];
    raw.push(S.identity.raw || "");
    raw.push(p.display || "");
    raw.push(p.key || "");
    (p.aliases || []).forEach(function(a){ raw.push(a); });
    raw.forEach(function(v){ var n = normalize(v); if (n) wanted[n] = 1; });
    var best = -1, bestScore = 0;
    for (var i = 0; i < (storyCards || []).length; i++) {
      var sc = storyCards[i] || {};
      if (normalize(sc.type || "") !== "character") continue;
      var marker = profileMarkerForCard(sc);
      if (!marker) continue;
      var ks = splitCardKeys(sc), score = 0;
      for (var j = 0; j < ks.length; j++) if (wanted[ks[j]]) score += 6;
      var title = normalize(String(sc.title || "").replace(/^dc character\s*[—-]\s*/i, ""));
      if (wanted[title]) score += 10;
      var mNorm = normalize(marker.replace(/^DC_PROFILE_/i, "").replace(/_/g, " "));
      if (wanted[mNorm]) score += 8;
      if (normalize(S.identity.raw) === title) score += 4;
      if (score > bestScore) { bestScore = score; best = i; }
    }
    return bestScore >= 6 ? best : -1;
  }

  function compactPromotedPlayerCard(S, base) {
    var p = S.identity.profile, o = S.origin, b = abilityBuckets(S);
    base = String(base || "").replace(/^PLAYER CHARACTER:\s*YES[^\n]*\n?/i, "").trim();
    function pull(label, next) {
      var a = base.indexOf(label); if (a < 0) return ""; a += label.length;
      var z = next ? base.indexOf(next, a) : -1;
      var v = (z >= 0 ? base.slice(a,z) : base.slice(a)).trim().replace(/\s+/g," ").replace(/[.\s]+$/,"");
      return v;
    }
    function clip(v,n) {
      v = String(v || "").trim(); if (v.length <= n) return v;
      return v.slice(0,n-1).replace(/\s+\S*$/, "").replace(/[,:;\-]+$/, "") + "…";
    }
    var age = clip(pull("Age:","Appearance:"),28);
    var app = clip(pull("Appearance:","Personality:"),105);
    var pers = clip(pull("Personality:","Starting life:"),92);
    var life = clip(pull("Starting life:","Abilities/skills:"),82);
    var abilities = clip(pull("Abilities/skills:","Key ties:"),58);
    var ties = clip(pull("Key ties:","Origin lock:"),78);
    var origin = clip(pull("Origin lock:","Future association:"),108);
    var lines = ["PLAYER CHARACTER: YES — " + p.display];
    if (age) lines.push("Age: " + age + ".");
    if (app) lines.push("Appearance: " + app + ".");
    if (pers) lines.push("Personality: " + pers + ".");
    if (life) lines.push("Life: " + life + ".");
    if (abilities) lines.push("Abilities: " + abilities + ".");
    if (ties) lines.push("Ties: " + ties + ".");
    if (origin) lines.push("Origin lock: " + origin + ".");
    lines.push("LIVE: " + PHASES[o.phase] + " " + o.progress + "% advisory; identity " + (o.identityEstablished ? (o.identityName || "established") : "unset") + "; demonstrated " + (b.demonstrated.length ? b.demonstrated.slice(0,3).join(", ") : "none") + ".");
    lines.push("AGENCY: sole player. AI never authors deliberate dialogue, thoughts, consent, moral/relationship choices, codename/costume choice or voluntary power use.");
    var out = lines.join("\n");
    return out.length <= 795 ? out : out.slice(0,792).replace(/\s+\S*$/, "") + "…";
  }

  function promoteSelectedCharacterCard(S) {
    var idx = S.identity.playerCardIndex;
    var sc = (idx >= 0 && idx < (storyCards || []).length) ? (storyCards[idx] || {}) : null;
    var marker = sc ? profileMarkerForCard(sc) : "";
    if (!sc || !marker || (S.identity.playerCardMarker && normalize(marker) !== normalize(S.identity.playerCardMarker))) {
      idx = selectedCharacterCardIndex(S);
      if (idx < 0) return -1;
      sc = storyCards[idx] || {};
      marker = profileMarkerForCard(sc);
    }
    if (!S.identity.basePlayerCard || S.identity.playerCardMarker !== marker) {
      var original = String(sc.value || sc.entry || "");
      if (original.indexOf("PLAYER CHARACTER: YES") !== 0) S.identity.basePlayerCard = original.slice(0, 795);
      S.identity.playerCardMarker = marker;
    }
    S.identity.playerCardIndex = idx;
    var existing = String(sc.keys || "").split(",").map(function(v){ return String(v || "").trim(); }).filter(Boolean);
    var add = playerKeys(S.identity.profile).split(",");
    var seen = {}, keys = [];
    existing.concat(add).forEach(function(v){ var n = normalize(v); if (n && !seen[n]) { seen[n] = 1; keys.push(v); } });
    var body = compactPromotedPlayerCard(S, S.identity.basePlayerCard || sc.value || sc.entry || "");
    try {
      if (String(sc.keys || "") !== keys.join(",") || String(sc.value || sc.entry || "") !== body || String(sc.type || "") !== "character") {
        updateStoryCard(idx, keys.join(","), body, "character");
      }
      S.health.lastPlayerCardBody = body;
      if (!S.health.cardIndexCache) S.health.cardIndexCache = {};
      S.health.cardIndexCache["dc_player"] = idx;
      return idx;
    } catch (e) {
      S.counters.errors++;
      S.health.lastError = String(e);
      return -1;
    }
  }

  function abilityBuckets(S) {
    var b = { locked: [], emerging: [], demonstrated: [], controlled: [], mastered: [], other: [] };
    Object.keys(S.abilities.byName || {}).forEach(function(k) {
      var st = S.abilities.byName[k].status || "other";
      if (st.indexOf("locked") >= 0 || st.indexOf("undemonstrated") >= 0) b.locked.push(k);
      else if (b[st]) b[st].push(k);
      else b.other.push(k);
    });
    return b;
  }

  function maturityRule(S, cfg) {
    var age = S.maturity.ageStatus;
    if (!cfg.matureTone) return "Tone: standard adventure tone.";
    if (age === "minor") return "MATURE-TONE SAFEGUARD: strong language, danger and serious consequences may exist, but the player is under 18 at this origin stage. NO sexual content involving the player. Keep any romance age-appropriate and non-sexual.";
    if (age !== "adult") return "MATURE-TONE SAFEGUARD: strong language and violent consequences may exist. Player age is not safely established as adult, so do not generate sexual content involving the player. Adult NPC relationships may exist only when all participants are clearly adults.";
    return "MATURE TONE: strong profanity and graphic non-sexual violence may be used when scene-appropriate. Consensual adult relationships and sexual themes may occur, but sexual activity remains non-graphic/fade-to-black. Never invent the player's consent, attraction or sexual choice.";
  }

  function originCard(S) {
    var p = S.identity.profile, o = S.origin, b = abilityBuckets(S);
    return [
      "DYNAMIC ORIGIN STATE — " + p.display,
      "Resolution: " + p.resolutionTier,
      "Origin class: " + p.cls.replace(/_/g, " "),
      "Phase: " + PHASES[o.phase] + " (" + o.progress + "% advisory; never force from percentage)",
      "Catalyst established: " + (o.catalyst ? "yes" : "no"),
      "Identity established by player/played continuity: " + (o.identityEstablished ? (o.identityName || "yes") : "no"),
      "External labels: " + (o.externalLabels.length ? o.externalLabels.join(", ") : "none"),
      "Costume/symbol established: " + (o.costumeEstablished ? "yes" : "no"),
      "First major test: " + (o.firstTest ? "yes" : "no"),
      "Public emergence: " + (o.publicEmergence ? "yes" : "no"),
      "Demonstrated: " + (b.demonstrated.length ? b.demonstrated.join(", ") : "none script-confirmed"),
      "Emerging: " + (b.emerging.length ? b.emerging.join(", ") : "none"),
      "Still locked/undemonstrated: " + (b.locked.length ? b.locked.join(", ") : "no deterministic list / fallback"),
      "Class rule: " + (CLASS_RULES[p.cls] || CLASS_RULES.special),
      "Player input establishes deliberate choices; AI output establishes uncertain success and external consequences."
    ].join("\n");
  }

  function playerCard(S) {
    var p = S.identity.profile;
    return [
      "DYNAMIC PLAYER CONTINUITY — " + p.display,
      "Selected as: " + S.identity.raw,
      "Resolution tier: " + p.resolutionTier,
      "Continuity note: " + S.identity.continuity,
      "Origin mode: " + S.identity.mode,
      "Starting age note: " + S.identity.ageNote + " (runtime status: " + S.maturity.ageStatus + ")",
      "Starting location: " + p.loc,
      "Starting life: " + p.role,
      "Future association: " + p.future + " — possibility, not fate",
      "Pre-origin lock: " + p.pre,
      (p.legacyNote ? "Legacy safeguard: " + p.legacyNote : ""),
      "SOLE PLAYER CHARACTER: never invent their deliberate dialogue, thoughts, feelings, consent, promises, relationship choices, moral decisions, codename/costume decisions or voluntary power use.",
      "Current played continuity overrides expected future canon."
    ].filter(Boolean).join("\n");
  }

  function awarenessLabel(n) {
    return ["unknown/folklore only","isolated rumours","classified/disputed evidence","credible local evidence","broad public acceptance","global fact"][Math.max(0, Math.min(5, n || 0))];
  }

  function worldCard(S) {
    var w = S.world;
    return [
      "DYNAMIC WORLD STATE — HEROIC AGE",
      "Heroic Age level: " + w.heroicAge + "/5",
      "Public heroes: " + (w.publicHeroes.length ? w.publicHeroes.join(", ") : "none established"),
      "Public villains: " + (w.publicVillains.length ? w.publicVillains.join(", ") : "none established"),
      "Public extraordinary figures not yet classified: " + (w.publicUnknowns.length ? w.publicUnknowns.join(", ") : "none established"),
      "Metahuman awareness: " + awarenessLabel(w.awareness.metahuman),
      "Alien awareness: " + awarenessLabel(w.awareness.alien),
      "Magic awareness: " + awarenessLabel(w.awareness.magic),
      "Vigilante awareness: " + awarenessLabel(w.awareness.vigilante),
      "Cosmic awareness: " + awarenessLabel(w.awareness.cosmic),
      "Justice League: " + (w.justiceLeague ? "exists by played continuity" : "DOES NOT EXIST"),
      "First major public extraordinary event: " + w.firstPublicEvent,
      "No public superhero culture exists until played evidence establishes one."
    ].join("\n");
  }

  function threadCard(S) {
    if (!S.threads.length) return "";
    return ["DYNAMIC PREREQUISITE / PARALLEL ORIGIN THREADS"]
      .concat(S.threads.map(function(t) {
        return "• " + t.subject + " — " + t.status + " (stage " + t.stage + "/4); needed for: " + t.neededFor;
      }))
      .concat(["Prerequisites are continuity needs, not commands to force canon. Plain name mentions do not advance them; played origin evidence does."])
      .join("\n");
  }

  function ensureCoreCards() {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.enabled) return;
    var p = S.identity.profile;
    var promotedPlayer = promoteSelectedCharacterCard(S);
    if (promotedPlayer < 0) safeUpsert("dc_player", playerKeys(p), playerCard(S), "character");
    safeUpsert("dc_origin_state", "DC_ORIGIN_STATE,origin status," + p.display, originCard(S), "system");
    if (cfg.worldTracking) safeUpsert("dc_world_state", "DC_WORLD_STATE,Heroic Age,Justice League,metahuman,superhero", worldCard(S), "world");
    if (cfg.legacyPrerequisites && S.threads.length) safeUpsert("dc_origin_threads", "DC_ORIGIN_THREADS,prerequisite origins,parallel origins", threadCard(S), "system");
    S.health.lastCardSync = actionNo();
  }

  function recordMilestone(S, label, evidence) {
    uniqPush(S.origin.milestones, { label: label, evidence: String(evidence || "").replace(/\s+/g, " ").slice(0, 180), action: actionNo() }, 24);
  }

  function advanceOrigin(S, target, progress, label, evidence) {
    if (target > S.origin.phase) {
      S.origin.phase = Math.min(PHASES.length - 1, target);
      S.origin.lastAdvanceAction = actionNo();
    }
    S.origin.progress = Math.max(S.origin.progress, Math.min(100, progress));
    if (label) recordMilestone(S, label, evidence);
  }

  function classIs(p, a) { return a.indexOf(p.cls) >= 0; }

  function catalystHit(p, text) {
    var low = normalize(text), hits = [];
    (p.catalyst || []).forEach(function(c) {
      var n = normalize(c);
      if (n && low.indexOf(n) >= 0) hits.push(c);
    });
    return hits;
  }

  function strongEvent(text) {
    return /(struck|strikes?|explod|crash|bonds? with|chooses?|selected|transforms?|changed into|dies|killed|awakens?|activates?|merges?|possess|binds?|bitten|exposed|inject|serum|ritual|fuses?|attaches?|implants?|reconstruct|resurrect|summoned|opens?|unleashes?)/i.test(String(text || ""));
  }

  function pressureEvidence(text, p) {
    var s = normalize(text);
    var words = ["investigation","case","project","experiment","training","threat","secret","strange","unexplained","missing","crime","research","mission","ritual","accident","corruption","conspiracy","inheritance","order","prototype","surveillance","assignment"];
    for (var i = 0; i < words.length; i++) if (s.indexOf(words[i]) >= 0) return true;
    return catalystHit(p, text).length > 0;
  }

  function aftermathEvidence(text) {
    return /(hospital|aftermath|wake(?:s)? up|surviv|recovery|recover|hours later|days later|next morning|changed|different|injur|damage|consequence|rehab|surgery|scar|pain)/i.test(String(text || ""));
  }

  function practiceEvidence(text) {
    return /(practice|train|test(?:s|ing)?|experiment(?:s|ing)? with|learns? to|control|calibrat|prototype|trial|attempts? again|rehears|drill)/i.test(String(text || ""));
  }

  function firstTestEvidence(text) {
    return /(first major|first real|hostage|disaster|attack|battle|confrontation|rescue|collaps|fire|bomb|mass casualty|invasion|crisis|shootout|siege|assassination attempt)/i.test(String(text || ""));
  }

  function externalIdentityLabel(text, p) {
    var s = String(text || ""), all = (p.aliases || []).concat(p.future ? [p.future] : []);
    for (var i = 0; i < all.length; i++) {
      var a = all[i];
      if (!a) continue;
      var esc = String(a).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var rx = new RegExp("(?:newspaper|headline|reporter|press|media|crowd|police|witnesses?|public).{0,80}(?:calls?|dubs?|names?|labels?|refers? to).{0,30}(?:the\\s+)?" + esc, "i");
      if (rx.test(s)) return a;
    }
    return "";
  }

  function detectIdentityNameFromInput(text, p) {
    var s = String(text || ""), all = (p.aliases || []).concat(p.future ? [p.future] : []);
    for (var i = 0; i < all.length; i++) {
      var a = all[i];
      if (!a) continue;
      var esc = String(a).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var rx = new RegExp("\\bI\\b.{0,70}(?:call myself|name myself|use the name|adopt the name|go by|become|operate as).{0,30}(?:the\\s+)?" + esc, "i");
      if (rx.test(s)) return a;
    }
    var generic = s.match(/\bI\b.{0,50}(?:call myself|name myself|use the name|adopt the name|go by|operate as)\s+["']?([A-Za-z][A-Za-z0-9 '\-]{2,40})["']?/i);
    return generic ? generic[1].trim() : "";
  }

  function explicitPurposeInput(text) {
    return /\bI\b.{0,100}\b(?:decide|choose|vow|promise myself|commit|dedicate myself|refuse|will|won't|will not)\b.{0,100}\b(?:protect|help|save|hunt|stop|fight|expose|serve|defend|avenge|leave|reject|become|operate)\b/i.test(String(text || ""));
  }

  function selfMadeCommitInput(text) {
    var s = String(text || "");
    var identityGear = /\bI\b.{0,80}\b(?:build|design|make|wear|put on|don|finish|create)\b.{0,60}\b(?:mask|suit|costume|gear|symbol|emblem|cowl|armor|armour|arsenal|vigilante identity)\b/i.test(s);
    var firstOperation = /\bI\b.{0,80}\b(?:begin|start|go out|take to the streets|operate|patrol|hunt)\b.{0,70}\b(?:as a vigilante|masked|in costume|criminals?|crime|streets|nightly patrol)\b/i.test(s);
    var explicitMission = /\bI\b.{0,80}\b(?:commit|dedicate|train)\b.{0,70}\b(?:to become|as|for)\b.{0,40}\b(?:vigilante|hero|protector|crime-fighter|crime fighter)\b/i.test(s);
    return identityGear || firstOperation || explicitMission;
  }

  function costumeIntentInput(text) {
    return /\bI\b.{0,80}\b(?:wear|put on|don|build|finish|design|make|choose|create)\b.{0,60}\b(?:mask|cowl|suit|costume|uniform|symbol|emblem|armor|armour)\b/i.test(String(text || ""));
  }

  function observePlayerCommitments(text) {
    var S = ensureState(), p = S.identity.profile, s = String(text || "");
    var identity = detectIdentityNameFromInput(s, p);
    if (identity) {
      S.origin.identityEstablished = true;
      S.origin.identityName = identity;
      advanceOrigin(S, 8, 82, "Player established identity/codename", s);
      uniqPush(S.signals, { kind: "identity commitment", action: actionNo(), text: s.replace(/\s+/g, " ").slice(0, 160) }, readAllConfig().maxSignals);
    }
    if (costumeIntentInput(s)) {
      uniqPush(S.signals, { kind: "costume intent", action: actionNo(), text: s.replace(/\s+/g, " ").slice(0, 160) }, readAllConfig().maxSignals);
    }
    if (explicitPurposeInput(s)) {
      advanceOrigin(S, 7, 73, "Player stated a purpose/choice", s);
      uniqPush(S.signals, { kind: "purpose commitment", action: actionNo(), text: s.replace(/\s+/g, " ").slice(0, 160) }, readAllConfig().maxSignals);
    }
    if (classIs(p, ["self_made","legacy"]) && selfMadeCommitInput(s) && !S.origin.catalyst) {
      S.origin.catalyst = true;
      S.origin.catalystEvidence = ["player-directed self-made threshold"];
      advanceOrigin(S, 3, 38, "Player crossed self-made/legacy threshold", s);
    }
  }

  function observeAgeInput(text) {
    var S = ensureState(), cfg = readAllConfig(), s = String(text || "");
    var m = s.match(/\b(?:I am|I'm|I’m|my age is)\s+(\d{1,3})\b/i);
    if (!m) return;
    var age = parseInt(m[1], 10);
    if (!isFinite(age) || age <= 0 || age > 200) return;
    S.identity.ageNote = String(age);
    S.identity.ageStatus = age >= 18 ? "adult" : "minor";
    S.maturity.ageStatus = S.identity.ageStatus;
    S.maturity.adultSexAllowed = cfg.adultRomance && S.maturity.ageStatus === "adult";
  }

  function abilityTerms(name) {
    var n = normalize(name), a = [n];
    if (ABILITY_ALIASES[n]) a = a.concat(ABILITY_ALIASES[n]);
    return a;
  }

  function manifestLanguage(text, term) {
    var s = String(text || ""), low = normalize(s);
    if (low.indexOf(normalize(term)) < 0) return false;
    return /(you (?:can|move|fly|lift|see|hear|feel|become|transform|phase|run|surge|emit|generate)|your (?:body|hands|eyes|voice|skin|speed|strength|power|ring)|from you|through you|erupts?|manifests?|surges?|accelerates?|moves? faster|takes? flight|phases? through|shatters?|lifts?|responds? to you|obeys? you)/i.test(s);
  }

  function detectAnyAbilityManifest(S, text) {
    var found = false, p = S.identity.profile, keys = Object.keys(S.abilities.byName || {});
    for (var i = 0; i < keys.length; i++) {
      var name = keys[i], st = S.abilities.byName[name], terms = abilityTerms(name), hit = false;
      for (var j = 0; j < terms.length; j++) if (manifestLanguage(text, terms[j])) { hit = true; break; }
      if (!hit) continue;
      var allowed = S.origin.catalyst || classIs(p, ["born_extraordinary","cosmic","magical_occult","special"]);
      if (!allowed) continue;
      st.count = (st.count || 0) + 1;
      uniqPush(st.evidence, "action " + actionNo() + ": " + String(text).replace(/\s+/g, " ").slice(0, 160), 6);
      if (st.count === 1) st.status = "emerging";
      else if (st.count === 2) st.status = "demonstrated";
      else if (st.count >= 8) st.status = "mastered";
      else if (st.count >= 4) st.status = "controlled";
      found = true;
    }
    return found;
  }

  function costumeConfirmation(text) {
    return /(you (?:wear|pull on|put on|don|fasten|finish|complete|step out in).{0,60}(?:mask|cowl|suit|costume|uniform|armor|armour)|the (?:mask|cowl|suit|costume|uniform|armor|armour).{0,60}(?:fits|is finished|is complete))/i.test(String(text || ""));
  }

  function hasRecentSignal(S, kind, age) {
    var now = actionNo();
    for (var i = S.signals.length - 1; i >= 0; i--) {
      var x = S.signals[i];
      if (now - (x.action || 0) > age) break;
      if (x.kind === kind) return true;
    }
    return false;
  }

  function observeOriginOutput(text) {
    var S = ensureState(), cfg = readAllConfig(), p = S.identity.profile, o = S.origin, s = String(text || "");
    if (!cfg.enabled) return;
    var pace = normalize(cfg.originPacing), bump = pace === "fast" ? 5 : pace === "normal" ? 3 : 2;
    var cap = pace === "fast" ? 34 : pace === "normal" ? 28 : 23;

    if (pressureEvidence(s, p) && !o.catalyst) {
      advanceOrigin(S, 1, Math.min(cap, Math.max(o.progress, 7) + bump), "Pressure established", s);
      if (o.progress >= Math.min(18, cap)) advanceOrigin(S, 2, Math.min(cap, o.progress), "Threshold pressure", s);
    }

    var hits = catalystHit(p, s);
    if (!o.catalyst) {
      if (classIs(p, ["transformed","chosen_bonded","conditioned_created","fall_villain"]) && hits.length && strongEvent(s)) {
        o.catalyst = true;
        o.catalystEvidence = hits.slice(0, 6);
        advanceOrigin(S, 3, 38, "Catalyst established", s);
      } else if (p.fallback && strongEvent(s) && /(power|ability|artefact|artifact|alien|magic|transformation|experiment|bond|ring)/i.test(s)) {
        o.catalyst = true;
        o.catalystEvidence = ["fallback transformation evidence"];
        advanceOrigin(S, 3, 38, "Fallback catalyst", s);
      } else if (classIs(p, ["born_extraordinary","cosmic","magical_occult"]) && hits.length && strongEvent(s)) {
        o.catalyst = true;
        o.catalystEvidence = hits.slice(0, 6);
        advanceOrigin(S, 3, 38, "Origin threshold/revelation", s);
      }
    }

    if (o.catalyst && aftermathEvidence(s)) advanceOrigin(S, 4, 47, "Aftermath", s);
    var manifested = detectAnyAbilityManifest(S, s);
    if (manifested) {
      if (o.catalyst || classIs(p, ["born_extraordinary","cosmic","magical_occult"])) advanceOrigin(S, 5, 56, "Ability discovery/demonstration", s);
    }
    if (o.phase >= 5 && practiceEvidence(s)) advanceOrigin(S, 6, 65, "Practice/control work", s);

    if (hasRecentSignal(S, "costume intent", 2) && costumeConfirmation(s)) {
      o.costumeEstablished = true;
      if (o.phase >= 7) advanceOrigin(S, 8, Math.max(o.progress, 80), "Player-directed costume/symbol established", s);
    }

    var ext = externalIdentityLabel(s, p);
    if (ext) uniqPush(o.externalLabels, ext, 6);

    if (o.phase >= 7 && firstTestEvidence(s)) {
      o.firstTest = true;
      advanceOrigin(S, 9, 89, "First major test", s);
    }
    if ((o.identityEstablished || o.externalLabels.length) && publicEventEvidence(s)) {
      o.publicEmergence = true;
      advanceOrigin(S, 10, 95, "Public emergence", s);
    }
    if (o.phase >= 10 && o.firstTest && (o.identityEstablished || o.externalLabels.length)) {
      advanceOrigin(S, 11, 100, "Origin established; open world begins", s);
    }
  }

  function observeSkillOutput(text) {
    var S = ensureState();
    var defs = {
      investigation:["investigat","deduc","forensic","evidence","case file"],
      combat:["fight","combat","spar","strike","block","grapple","disarm"],
      stealth:["stealth","sneak","unnoticed","shadow","silent approach"],
      science:["laboratory","scientist","research","experiment","analysis"],
      engineering:["engineer","builds","prototype","device","circuit","fabricat"],
      magic:["spell","ritual","occult","sorcery","magic"],
      medicine:["medical","doctor","surgery","treats","patient","first aid"],
      piloting:["pilot","aircraft","cockpit","flies the","flight controls"],
      journalism:["reporter","article","interview","investigative journalism","source"],
      leadership:["leads","coordinates","command","organizes","briefs the team"],
      hacking:["hack","decrypt","breach the system","code","network intrusion"],
      law:["courtroom","barrister","attorney","lawyer","legal argument","cross-examines"],
      acrobatics:["acrobat","gymnast","trapeze","vaults","somersault"],
      tactics:["tactical","flank","ambush","contingency","battle plan"]
    };
    var low = normalize(text);
    Object.keys(defs).forEach(function(k) {
      var hit = defs[k].some(function(w){ return low.indexOf(w) >= 0; });
      if (!hit) return;
      if (!S.skills.byName[k]) S.skills.byName[k] = { evidence: 0, status: "observed", lastAction: 0 };
      var x = S.skills.byName[k];
      if (x.lastAction === actionNo()) return;
      x.evidence++;
      x.lastAction = actionNo();
      if (x.evidence >= 3) x.status = "established";
      if (x.evidence >= 7) x.status = "strongly established";
      if (x.evidence >= 14) x.status = "expertly established through play";
    });
  }

  function publicEventEvidence(text) {
    return /(broadcast live|live broadcast|goes viral|viral footage|news cameras?|television cameras?|phone cameras?|hundreds of witnesses|thousands of witnesses|crowd records?|crowd watches?|publicly seen|caught on camera|world watches|international news|front page|publicly revealed|dozens of witnesses|police witnesses?|press conference|livestream|live stream)/i.test(String(text || ""));
  }

  function publicScope(text) {
    var s = String(text || "");
    if (/(worldwide|global|international news|world watches|across the world)/i.test(s)) return 5;
    if (/(goes viral|viral footage|national news|millions|television cameras?)/i.test(s)) return 4;
    if (/(hundreds|thousands|news cameras?|live broadcast|livestream|press)/i.test(s)) return 3;
    return 2;
  }

  function bumpAwareness(S, axis, n, evidence) {
    var w = S.world;
    w.awareness[axis] = Math.max(w.awareness[axis] || 0, Math.min(5, n));
    uniqPush(w.events, { axis: axis, level: w.awareness[axis], action: actionNo(), evidence: String(evidence || "").replace(/\s+/g, " ").slice(0, 160) }, 24);
  }

  function observeWorldOutput(text) {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.worldTracking || !cfg.publicConsequences) return;
    var s = String(text || "");
    if (!publicEventEvidence(s)) return;
    var scope = publicScope(s);
    if (/(metahuman|super.?power|super.?speed|impossible strength|energy blast|transforms?|flies?|fly|flying|flight|levitat|telekin|superhuman|impossible speed)/i.test(s)) bumpAwareness(S, "metahuman", scope, s);
    if (/(alien|extraterrestrial|krypton|kryptonian|martian|spaceship|spacecraft|ufo|thanagar|rann|tamaranean)/i.test(s)) bumpAwareness(S, "alien", scope, s);
    if (/(magic|spell|demon|sorcer|occult|ghost|supernatural|ritual|curse)/i.test(s)) bumpAwareness(S, "magic", scope, s);
    if (/(masked|vigilante|costumed|cape|cowl|patrol|masked figure)/i.test(s)) bumpAwareness(S, "vigilante", scope, s);
    if (/(green lantern|apokolips|new genesis|cosmic|guardian of the universe|oa\b|new god)/i.test(s)) bumpAwareness(S, "cosmic", scope, s);
    if (S.world.firstPublicEvent === "None established") S.world.firstPublicEvent = s.replace(/\s+/g, " ").slice(0, 180);

    var p = S.identity.profile;
    if (S.origin.publicEmergence) {
      var name = S.origin.identityName || S.origin.externalLabels[0] || p.future || p.display;
      if (/\bhero\b|rescuer|saves? (?:people|civilians|the crowd)|protects? civilians/i.test(s)) uniqPush(S.world.publicHeroes, name, 16);
      else if (/\bvillain\b|terrorist|murderer|massacre|criminal superhuman|supervillain/i.test(s)) uniqPush(S.world.publicVillains, name, 16);
      else uniqPush(S.world.publicUnknowns, name, 16);
    }

    var maxA = 0;
    Object.keys(S.world.awareness).forEach(function(k){ maxA = Math.max(maxA, S.world.awareness[k] || 0); });
    if (maxA >= 2) S.world.heroicAge = Math.max(S.world.heroicAge, 1);
    if (S.world.publicHeroes.length + S.world.publicVillains.length + S.world.publicUnknowns.length >= 3) S.world.heroicAge = Math.max(S.world.heroicAge, 2);
    if (/justice league (?:forms?|is formed|founded|created|established)/i.test(s) && S.world.publicHeroes.length >= 2) {
      S.world.justiceLeague = true;
      S.world.heroicAge = Math.max(S.world.heroicAge, 3);
    }
  }

  function registryNames() {
    if (DCBTH._nameCache) return DCBTH._nameCache;
    var map = {};
    Object.keys(PROFILE_DB).forEach(function(k) {
      var p = PROFILE_DB[k];
      [k, p.display].concat(p.aliases || []).forEach(function(v) {
        var n = normalize(v);
        if (n && n.length >= 3) map[n] = p.display;
      });
    });
    CHARACTER_INDEX.forEach(function(x) {
      [x.canonical].concat(x.aliases || []).forEach(function(v) {
        var n = normalize(v);
        if (n && n.length >= 3 && !map[n]) map[n] = x.canonical;
      });
    });
    var arr = Object.keys(map).sort(function(a,b){ return b.length - a.length; }).map(function(n){ return { n:n, display:map[n] }; });
    DCBTH._nameCache = arr;
    return arr;
  }

  function playerNameSet(S) {
    var p = S.identity.profile, a = [normalize(p.display), normalize(S.identity.raw)].concat((p.aliases || []).map(normalize));
    var o = {};
    a.forEach(function(x){ if (x) o[x] = 1; });
    return o;
  }

  function namesInText(text) {
    var low = " " + normalize(text) + " ", out = [], seen = {}, names = registryNames();
    for (var i = 0; i < names.length; i++) {
      var x = names[i];
      if (low.indexOf(" " + x.n + " ") >= 0 && !seen[normalize(x.display)]) {
        seen[normalize(x.display)] = 1;
        out.push(x.display);
        if (out.length >= 18) break;
      }
    }
    return out;
  }

  function trimObjectByCount(o, max, scoreFn) {
    var ks = Object.keys(o);
    if (ks.length <= max) return;
    ks.sort(function(a,b){ return (scoreFn ? scoreFn(o[b]) : (o[b] || 0)) - (scoreFn ? scoreFn(o[a]) : (o[a] || 0)); });
    for (var i = max; i < ks.length; i++) delete o[ks[i]];
  }

  function relationSignals(text) {
    var s = String(text || ""), a = [];
    if (/friend|trusts?|close to|confides? in/i.test(s)) a.push("friendship/trust language");
    if (/enemy|hostile|hates?|attacks?|threatens?|betrays?/i.test(s)) a.push("hostility language");
    if (/rival|competition|competitive/i.test(s)) a.push("rivalry language");
    if (/mentor|student|teaches?|trains?|apprentice/i.test(s)) a.push("mentor/student language");
    if (/colleague|coworker|works? with|partner on the case|professional partner/i.test(s)) a.push("professional association");
    if (/dating|girlfriend|boyfriend|lover|romantic|kiss(?:es|ed)?|spouse|husband|wife/i.test(s)) a.push("explicit romantic/partner evidence");
    if (/parent|mother|father|sister|brother|cousin|family|daughter|son|aunt|uncle/i.test(s)) a.push("family language");
    if (/ally|allies|team up|teams up|fights alongside/i.test(s)) a.push("alliance language");
    if (/boss|employer|employee|supervisor|reports to/i.test(s)) a.push("work hierarchy language");
    if (/handler|asset|operative|commanding officer/i.test(s)) a.push("handler/operative language");
    return a;
  }

  function npcCardBody(S, k, resolved) {
    var r = S.relations[k];
    return [
      "AUTO DC CHARACTER CONTINUITY — " + resolved.display,
      "This card exists because a recognised DC identity recurred in played text.",
      "Resolution: " + resolved.resolutionTier,
      "Potential published association: " + resolved.future,
      "Observed interactions with player: " + (r ? r.interactions : (S.mentions[k] || 0)),
      "Observed relationship evidence: " + (r && r.evidence.length ? r.evidence.join(", ") : "none; do not invent one"),
      "DO NOT import unplayed future canon, future romances, future betrayals, future deaths or secret knowledge.",
      "Knowledge firewall: this NPC knows only what played evidence gives them."
    ].join("\n");
  }

  function refreshNpcCard(S, k) {
    if (S.autoNpcKeys.indexOf(k) < 0) return;
    var disp = (S.relations[k] && S.relations[k].name) || k;
    var resolved = resolveCharacter(disp);
    if (resolved.fallback) return;
    safeUpsert("dc_npc_" + k, "DC_NPC_" + k + "," + resolved.display + "," + (resolved.aliases || []).join(","), npcCardBody(S, k, resolved), "character");
  }

  function touchRelation(S, name, text) {
    var cfg = readAllConfig(), k = normalize(name);
    if (!S.relations[k]) S.relations[k] = { name:name, interactions:0, evidence:[], lastAction:0 };
    var r = S.relations[k];
    if (r.lastAction !== actionNo()) r.interactions++;
    r.lastAction = actionNo();
    relationSignals(text).forEach(function(x){ uniqPush(r.evidence, x, 10); });
    trimObjectByCount(S.relations, cfg.maxRelations, function(x){ return x.interactions || 0; });
    refreshNpcCard(S, k);
  }

  function maybeNpcCards(S, cfg) {
    if (S.autoNpcKeys.length >= cfg.maxAutoNpcCards) return;
    var candidates = Object.keys(S.mentions)
      .filter(function(k){ return S.mentions[k] >= cfg.mentionThreshold && S.autoNpcKeys.indexOf(k) < 0; })
      .sort(function(a,b){ return S.mentions[b] - S.mentions[a]; });
    for (var i = 0; i < candidates.length && S.autoNpcKeys.length < cfg.maxAutoNpcCards; i++) {
      var k = candidates[i], disp = (S.relations[k] && S.relations[k].name) || k;
      var resolved = resolveCharacter(disp);
      if (resolved.fallback) continue;
      safeUpsert("dc_npc_" + k, "DC_NPC_" + k + "," + resolved.display + "," + (resolved.aliases || []).join(","), npcCardBody(S, k, resolved), "character");
      S.autoNpcKeys.push(k);
    }
  }

  function observeMentions(text) {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.autoCharacterCards && !cfg.relationshipTracking) return;
    var pset = playerNameSet(S), names = namesInText(text);
    names.forEach(function(name) {
      if (pset[normalize(name)]) return;
      var k = normalize(name);
      S.mentions[k] = (S.mentions[k] || 0) + 1;
      if (cfg.relationshipTracking) touchRelation(S, name, text);
    });
    trimObjectByCount(S.mentions, 120);
    if (cfg.autoCharacterCards) maybeNpcCards(S, cfg);
  }

  function knowledgeKind(text) {
    var s = String(text || "");
    if (/secret identity|real identity|is actually|under the mask|behind the mask/i.test(s)) return "secret identity information";
    if (/powers?|abilities?|kryptonian|martian|metahuman|magic|ring/i.test(s)) return "power/origin information";
    if (/base|hideout|batcave|safehouse|secret location/i.test(s)) return "secret-location information";
    return "sensitive information";
  }

  function observeKnowledge(text, source) {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.knowledgeTracking) return;
    var s = String(text || ""), names = namesInText(s);
    if (!names.length) return;
    var secret = /(secret identity|real identity|is actually|reveals? (?:his|her|their|your) identity|tells? .* (?:about|that) .*power|learns? .*identity|discovers? .*identity|finds? out .*identity|knows? .*identity|under the mask|behind the mask|confides? .*secret)/i.test(s);
    if (!secret) return;
    for (var i = 0; i < Math.min(names.length, 4); i++) {
      var name = names[i];
      if (normalize(name) === normalize(S.identity.profile.display)) continue;
      uniqPush(S.knowledge, {
        holder:name, fact:knowledgeKind(s), source:source, action:actionNo(),
        evidence:s.replace(/\s+/g, " ").slice(0, 160)
      }, cfg.maxKnowledgeFacts);
    }
  }

  function observeFactions(text) {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.factionTracking) return;
    var low = normalize(text);
    Object.keys(FACTIONS).forEach(function(k) {
      var aliases = FACTIONS[k], hit = false;
      for (var i = 0; i < aliases.length; i++) if (low.indexOf(normalize(aliases[i])) >= 0) { hit = true; break; }
      if (!hit) return;
      if (!S.factions[k]) S.factions[k] = { name:aliases[0], mentions:0, status:"encountered/mentioned", evidence:[], lastAction:0 };
      var f = S.factions[k];
      if (f.lastAction !== actionNo()) f.mentions++;
      f.lastAction = actionNo();
      var s = String(text || "");
      if (/joins?|recruits?|works? for|member of|sworn into/i.test(s)) f.status = "membership/recruitment language explicitly present";
      else if (/enemy|opposes?|fights?|targeted by|at war with/i.test(s)) f.status = "hostility/opposition language explicitly present";
      uniqPush(f.evidence, "action " + actionNo() + ": " + s.replace(/\s+/g, " ").slice(0, 120), 5);
    });
    trimObjectByCount(S.factions, cfg.maxFactions, function(x){ return x.mentions || 0; });
  }

  function threadEvidenceStrength(t, text) {
    var low = normalize(text), subject = normalize(t.subject);
    var parts = subject.split(/\s*\/\s*| becoming | legacy | foothold | contact | with earth | for classic | path /).filter(function(x){ return x.length > 3; });
    var subjectHit = parts.some(function(x){ return low.indexOf(x) >= 0; });
    if (!subjectHit) return 0;
    var originAction = /(begins?|starts?|returns?|trains?|builds?|creates?|designs?|chooses?|receives?|is selected|bonds?|takes? up|adopts?|operates?|patrols?|first rescue|first appearance|becomes?|discovers?|awakens?|arrives?|crashes?|inherits?)/i.test(String(text || ""));
    var roleSignal = /(vigilante|mask|suit|ring|speed|lantern|batman|flash|question|doctor fate|helmet|blue beetle|scarab|hero|protector|operative|mantle|identity)/i.test(String(text || ""));
    if (originAction && roleSignal) return 2;
    if (originAction) return 1;
    return 0;
  }

  function observeThreads(text) {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.parallelOrigins || !S.threads.length) return;
    S.threads.forEach(function(t) {
      if (actionNo() - (t.lastAction || -999) < 2) return;
      var strength = threadEvidenceStrength(t, text);
      if (!strength) return;
      t.stage = Math.min(4, t.stage + 1);
      t.lastAction = actionNo();
      t.status = ["not established","seeded by played origin evidence","developing in parallel","prerequisite substantially established","established enough for dependent beats"][t.stage];
      uniqPush(t.evidence, "action " + actionNo() + ": " + String(text).replace(/\s+/g, " ").slice(0, 140), 6);
    });
  }

  function observeDivergenceInput(text) {
    var S = ensureState(), cfg = readAllConfig(), s = String(text || "");
    var pats = [
      [/\bI\b.{0,50}\b(?:refuse|reject|quit|leave|destroy|expose|reveal|kill|save|spare|betray|join)\b/i,"Player made an intentional choice likely to alter expected canon."],
      [/\bI\b.{0,60}\b(?:tell|reveal to)\b.{0,60}\b(?:identity|powers?|truth|secret)\b/i,"Player deliberately disclosed sensitive information."],
      [/\bI\b.{0,60}\b(?:never|won't|will not)\b.{0,50}\b(?:become|join|wear|serve|obey)\b/i,"Player explicitly rejected a likely future path."]
    ];
    for (var i = 0; i < pats.length; i++) if (pats[i][0].test(s)) uniqPush(S.divergence, pats[i][1] + " [action " + actionNo() + "]", cfg.maxDivergences);
  }

  function observeDivergenceOutput(text) {
    var S = ensureState(), cfg = readAllConfig(), s = String(text || "");
    var pats = [
      [/dies? (?:before|without)|is killed before/i,"Played continuity may have removed a canon-linked figure before their expected future role."],
      [/irreparably destroyed|permanently destroyed/i,"A potentially canon-linked resource/location was irreparably destroyed in played continuity."],
      [/publicly reveals?|identity is exposed|secret identity becomes public/i,"A secret/public-status divergence was established."],
      [/refuses? the mantle|rejects? the mantle|walks? away from the role/i,"A future mantle/path was rejected in played continuity."]
    ];
    for (var i = 0; i < pats.length; i++) if (pats[i][0].test(s)) uniqPush(S.divergence, pats[i][1] + " [action " + actionNo() + "]", cfg.maxDivergences);
  }

  function pendingIntent(text) {
    var S = ensureState(), cfg = readAllConfig(), s = String(text || "");
    if (/\b(?:try|attempt|I |I'|I’m|I am)\b/i.test(s) && /(power|fly|speed|ring|spell|transform|mask|costume|patrol|attack|rescue|reveal)/i.test(s)) {
      uniqPush(S.signals, { kind:"player intent (not confirmed result)", action:actionNo(), text:s.replace(/\s+/g," ").slice(0,150) }, cfg.maxSignals);
    }
  }

  function cleanupSignals(S) {
    var now = actionNo();
    S.signals = (S.signals || []).filter(function(x){ return now - (x.action || 0) <= 5; }).slice(-readAllConfig().maxSignals);
  }

  function observeInjuryOutput(text) {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.injuryTracking) return;
    var s = String(text || "");
    if (!/(\byou\b|\byour\b)/i.test(s)) return;
    if (!/(bleed|blood|broken|fractur|dislocat|stab|shot|bullet|burn|concussion|unconscious|crack(?:ed)? rib|torn|lacerat|wound|injur|bruise|sprain|sever|scar)/i.test(s)) return;
    var severity = /(sever|massive blood|critical|life-threatening|life threatening|shattered|gunshot|stabbed through|third-degree|third degree)/i.test(s) ? "severe" :
                   /(broken|fractur|concussion|stab|shot|burn|lacerat|dislocat|unconscious)/i.test(s) ? "significant" : "minor/unclear";
    uniqPush(S.injuries, { action:actionNo(), severity:severity, evidence:s.replace(/\s+/g," ").slice(0,180) }, cfg.maxInjuries);
  }

  function observeSceneOutput(text) {
    var S = ensureState(), cfg = readAllConfig();
    if (!cfg.sceneMomentum) return;
    var s = String(text || "").replace(/\s+/g, " ").trim();
    if (!s) return;
    var stall = /(what do you do\??|everyone (?:looks|turns) to you|they wait for you|the choice is yours|all eyes are on you|waiting for your response)/i.test(s);
    var substantive = s.length >= 180 && /(arrives?|leaves?|reveals?|finds?|discovers?|calls?|enters?|attacks?|interrupts?|hands? you|shows? you|opens?|closes?|explodes?|collapses?|reports?|confirms?|arrests?|escapes?|moves?|begins?|ends?)/i.test(s);
    if (stall && !substantive) S.scene.stallCount++;
    else if (substantive) { S.scene.stallCount = 0; S.scene.lastSubstantiveAction = actionNo(); }
    uniqPush(S.scene.recent, { action:actionNo(), text:s.slice(0,180) }, cfg.maxSceneBeats);
  }

  function relationLines(S) {
    var a = Object.keys(S.relations).map(function(k){ return S.relations[k]; })
      .sort(function(x,y){ return y.interactions - x.interactions; }).slice(0, 12);
    if (!a.length) return ["No recurring DC contact evidence tracked yet."];
    return a.map(function(r){ return "• " + r.name + " — " + r.interactions + " observed interactions" + (r.evidence.length ? "; " + r.evidence.join(", ") : "; no relationship label inferred"); });
  }

  function threadLines(S) {
    if (!S.threads.length) return ["• None required for this registered origin, or fallback has no scripted prerequisite."];
    return S.threads.map(function(t){ return "• " + t.subject + " — " + t.status + " (stage " + t.stage + "/4; evidence " + t.evidence.length + ")"; });
  }

  function knowledgeLines(S) {
    if (!S.knowledge.length) return ["• No sensitive knowledge transfers explicitly tracked yet."];
    return S.knowledge.slice(-12).map(function(k){ return "• " + k.holder + " — " + k.fact + " [" + k.source + ", action " + k.action + "]"; });
  }

  function skillLines(S) {
    var ks = Object.keys(S.skills.byName);
    if (!ks.length) return ["• No repeated skill evidence tracked yet."];
    return ks.sort(function(a,b){ return S.skills.byName[b].evidence - S.skills.byName[a].evidence; }).slice(0,12).map(function(k){ var x=S.skills.byName[k]; return "• " + k + " — " + x.status + " (" + x.evidence + " evidence hits)"; });
  }

  function abilityLines(S) {
    var ks = Object.keys(S.abilities.byName);
    if (!ks.length) return ["• No deterministic scripted power list for this selection; use played continuity conservatively."];
    return ks.map(function(k){ return "• " + k + " — " + S.abilities.byName[k].status; });
  }

  function injuryLines(S) {
    if (!S.injuries.length) return ["• No player injury evidence tracked yet."];
    return S.injuries.slice(-10).map(function(x){ return "• action " + x.action + " — " + x.severity + ": " + x.evidence; });
  }

  function factionLines(S) {
    var ks = Object.keys(S.factions);
    if (!ks.length) return ["• No tracked faction contact yet."];
    return ks.sort(function(a,b){ return S.factions[b].mentions-S.factions[a].mentions; }).slice(0,12).map(function(k){ var f=S.factions[k]; return "• " + f.name + " — " + f.status + " (" + f.mentions + " mentions)"; });
  }

  function sceneLines(S) {
    if (!S.scene.recent.length) return ["• No recent scene beats tracked yet."];
    return S.scene.recent.slice(-6).map(function(x){ return "• " + x.action + ": " + x.text; });
  }

  function doctorLines(S) {
    var cfg = readAllConfig(), checks = [];
    checks.push(["state schema", S.schema === SCHEMA]);
    checks.push(["identity resolved", !!S.identity.profile.display]);
    checks.push(["player card", findCard("dc_player") >= 0]);
    checks.push(["origin card", findCard("dc_origin_state") >= 0]);
    checks.push(["world card", !cfg.worldTracking || findCard("dc_world_state") >= 0]);
    checks.push(["command relay", true]);
    checks.push(["bounded relations", Object.keys(S.relations).length <= cfg.maxRelations]);
    checks.push(["bounded knowledge", S.knowledge.length <= cfg.maxKnowledgeFacts]);
    checks.push(["bounded threads", S.threads.length <= cfg.maxThreads]);
    checks.push(["bounded injuries", S.injuries.length <= cfg.maxInjuries]);
    checks.push(["bounded scene beats", S.scene.recent.length <= cfg.maxSceneBeats]);
    checks.push(["bounded factions", Object.keys(S.factions).length <= cfg.maxFactions]);
    checks.push(["maturity gate", !S.maturity.adultSexAllowed || S.maturity.ageStatus === "adult"]);
    checks.push(["runtime context under configured budget", !S.health.lastContextSize || S.health.lastContextSize <= cfg.contextBudget]);
    return checks.map(function(c){ return (c[1] ? "PASS" : "WARN") + " — " + c[0]; });
  }

  function panel(cmd) {
    var S = ensureState(), p = S.identity.profile, o = S.origin, w = S.world, cfg = readAllConfig(), L = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    if (cmd === "origin") return [L,"DC — ORIGIN STATUS",L,"PLAYER: "+p.display,"SELECTION: "+S.identity.raw,"RESOLUTION: "+p.resolutionTier,"CLASS: "+p.cls.replace(/_/g," "),"MODE: "+S.identity.mode,"PHASE: "+PHASES[o.phase],"ADVISORY PROGRESS: "+o.progress+"%","CATALYST: "+(o.catalyst?"Established":"Not established"),"IDENTITY: "+(o.identityEstablished?(o.identityName||"Established"):"Not established"),"EXTERNAL LABELS: "+(o.externalLabels.join(", ")||"None"),"FIRST TEST: "+(o.firstTest?"Yes":"No"),"PUBLIC EMERGENCE: "+(o.publicEmergence?"Yes":"No"),"","Percentage never forces events.",L].join("\n");
    if (cmd === "identity") return [L,"DC — IDENTITY RESOLVER",L,"RAW: "+S.identity.raw,"RESOLVED: "+p.display,"TIER: "+p.resolutionTier,"FUTURE ASSOCIATION: "+p.future,"CONTINUITY: "+S.identity.continuity,"AGE NOTE: "+S.identity.ageNote+" → "+S.maturity.ageStatus,"PRE-ORIGIN LOCK: "+p.pre,(p.legacyNote?"LEGACY NOTE: "+p.legacyNote:""),L].filter(Boolean).join("\n");
    if (cmd === "world") return [L,"DC — WORLD STATUS",L,"HEROIC AGE: "+w.heroicAge+"/5","PUBLIC HEROES: "+(w.publicHeroes.join(", ")||"None"),"PUBLIC VILLAINS: "+(w.publicVillains.join(", ")||"None"),"UNCLASSIFIED PUBLIC FIGURES: "+(w.publicUnknowns.join(", ")||"None"),"METAHUMAN: "+awarenessLabel(w.awareness.metahuman),"ALIEN: "+awarenessLabel(w.awareness.alien),"MAGIC: "+awarenessLabel(w.awareness.magic),"VIGILANTE: "+awarenessLabel(w.awareness.vigilante),"COSMIC: "+awarenessLabel(w.awareness.cosmic),"JUSTICE LEAGUE: "+(w.justiceLeague?"Exists":"Does not exist"),"FIRST PUBLIC EVENT: "+w.firstPublicEvent,L].join("\n");
    if (cmd === "powers") return [L,"DC — POWERS / ABILITIES",L].concat(abilityLines(S)).concat(["","Player input attempts do not unlock uncertain powers; played consequences do.",L]).join("\n");
    if (cmd === "skills") return [L,"DC — SKILL EVIDENCE",L].concat(skillLines(S)).concat([L]).join("\n");
    if (cmd === "relations") return [L,"DC — RELATIONSHIP EVIDENCE",L].concat(relationLines(S)).concat(["","No trust, romance, hostility or family role is invented without explicit evidence.",L]).join("\n");
    if (cmd === "threads") return [L,"DC — PREREQUISITE / PARALLEL ORIGINS",L].concat(threadLines(S)).concat(["","Plain mentions do not advance prerequisite stages.",L]).join("\n");
    if (cmd === "knowledge") return [L,"DC — KNOWLEDGE FIREWALL",L].concat(knowledgeLines(S)).concat([L]).join("\n");
    if (cmd === "canon") return [L,"DC — CONTINUITY DIVERGENCE",L].concat(S.divergence.length?S.divergence.map(function(x){return "• "+x;}):["• No major scripted divergence marker yet."]).concat(["","Future comic canon is never binding.",L]).join("\n");
    if (cmd === "injuries") return [L,"DC — INJURY / CONSEQUENCE LEDGER",L].concat(injuryLines(S)).concat(["","This is evidence, not a medical simulation. Played prose remains authoritative.",L]).join("\n");
    if (cmd === "factions") return [L,"DC — FACTION CONTACT",L].concat(factionLines(S)).concat([L]).join("\n");
    if (cmd === "scene") return [L,"DC — RECENT SCENE BEATS",L,"STALL WARNING: "+(S.scene.stallCount>=2?"ACTIVE — advance a concrete thread instead of waiting on the player":"clear")].concat(sceneLines(S)).concat([L]).join("\n");
    if (cmd === "tone") return [L,"DC — MATURE TONE",L,"MATURE MODE: "+(cfg.matureTone?"On":"Off"),"STRONG LANGUAGE: "+(cfg.strongLanguage?"On":"Off"),"GRAPHIC VIOLENCE: "+(cfg.graphicViolence?"On":"Off"),"ADULT ROMANCE/THEMES: "+(cfg.adultRomance?"On":"Off"),"SEXUAL DETAIL: non-graphic / fade-to-black","PLAYER AGE STATUS: "+S.maturity.ageStatus,"PLAYER SEXUAL CONTENT GATE: "+(S.maturity.adultSexAllowed?"adult themes allowed, non-graphic":"blocked"),"","Consent is never authored for the player. Under-18 or age-uncertain player sexual content is blocked.",L].join("\n");
    if (cmd === "registry") { var c=debugCounts(); return [L,"DC — REGISTRY",L,"DETAILED PROFILES: "+c.detailed,"INDEXED IDENTITIES: "+c.indexed,"SEARCHABLE NAMES/ALIASES: "+c.names,"CURRENT TIER: "+p.resolutionTier,"","Registry is a reliability layer, never a whitelist. Universal fallback remains enabled.",L].join("\n"); }
    if (cmd === "doctor") return [L,"DC — SYSTEM DOCTOR",L].concat(doctorLines(S)).concat(["","Errors caught: "+S.counters.errors,"Last error: "+(S.health.lastError||"None"),"State schema: "+S.schema+" / engine "+VERSION,"Auto NPC cards: "+S.autoNpcKeys.length+"/"+cfg.maxAutoNpcCards,"Runtime chars: "+S.health.lastContextSize+"/"+cfg.contextBudget,L]).join("\n");
    return [L,"DC — COMMANDS",L,"/origin — origin phase and milestones","/identity — resolver, continuity and age gate","/world — Heroic Age/public awareness","/powers — power states","/skills — skill evidence","/relations — relationship evidence","/threads — prerequisite/parallel origins","/knowledge — sensitive knowledge evidence","/canon — divergence markers","/injuries — injury/consequence evidence","/factions — organisation contact","/scene — recent scene/momentum state","/tone — mature-content/age safeguards","/registry — resolver coverage","/doctor — system health checks","/help — this panel","","Commands do not intentionally advance fiction.",L].join("\n");
  }

  function parseCommand(text) {
    var m = String(text || "").trim().match(/^\/(origin|identity|world|powers|skills|relations|threads|knowledge|canon|injuries|factions|scene|tone|registry|doctor|help)(?:\s+.*)?$/i);
    return m ? normalize(m[1]) : null;
  }

  function recentInjuryReminder(S) {
    if (!S.injuries.length) return "";
    var x = S.injuries[S.injuries.length - 1];
    if (actionNo() - x.action > 12) return "";
    return "RECENT INJURY EVIDENCE: " + x.severity + " at action " + x.action + ". Do not erase consequences without played recovery.";
  }

  function compactRuntime(S) {
    var p = S.identity.profile, o = S.origin, w = S.world, b = abilityBuckets(S), cfg = readAllConfig();
    var lines = [
      "[DC BEFORE THE AGE OF HEROES — RUNTIME]",
      "SOLE PLAYER: " + p.display + " (selected: " + S.identity.raw + "). Never author their deliberate dialogue, internal decisions, feelings, consent, promises, relationship choices, moral decisions, codename/costume choice or voluntary power use.",
      "RESOLUTION: " + p.resolutionTier + ". Origin class: " + p.cls.replace(/_/g," ") + ". Mode: " + S.identity.mode + ".",
      "AGE/TONE: " + maturityRule(S, cfg),
      "PHASE: " + PHASES[o.phase] + " / " + o.progress + "% advisory. Catalyst: " + (o.catalyst?"played":"not established") + ". Player-established identity: " + (o.identityEstablished?(o.identityName||"established"):"not established") + ".",
      "PRE-ORIGIN LOCK: " + p.pre,
      "CLASS RULE: " + (CLASS_RULES[p.cls] || CLASS_RULES.special),
      "POWER STATE: demonstrated " + (b.demonstrated.join(", ")||"none script-confirmed") + "; emerging " + (b.emerging.join(", ")||"none") + "; locked/undemonstrated " + (b.locked.join(", ")||"no deterministic list") + ".",
      "WORLD: Heroic Age " + w.heroicAge + "/5; public heroes " + (w.publicHeroes.length?w.publicHeroes.join(", "):"none") + "; Justice League " + (w.justiceLeague?"exists":"DOES NOT EXIST") + ".",
      "CANON PRIORITY: player action > played consequences > persistent continuity > origin foundations > expected future canon. Never railroad published outcomes.",
      "INPUT IS INTENT: attempted powers, attacks, transformations, kills, discoveries and technological feats are not automatically successful. Deliberate choices explicitly written by the player ARE authoritative choices.",
      "KNOWLEDGE FIREWALL: each NPC knows only what they witnessed, were told, investigated, inferred from evidence or legitimately knew already.",
      "PACING: ordinary life, work, family and relationships remain story. Never fire an origin catalyst merely because enough turns passed.",
      "VIOLENCE: injuries and collateral damage persist when established; do not hand-wave recovery. Graphic non-sexual violence and profanity are allowed when scene-appropriate, not mandatory every turn."
    ];
    if (S.scene.stallCount >= 2) lines.push("MOMENTUM WARNING: recent outputs repeatedly stalled/waited. Advance ONE concrete thread, NPC action, consequence, task, discovery or time beat without deciding the player's next meaningful choice.");
    if (S.threads.length) lines.push("PREREQUISITES: " + S.threads.slice(0,6).map(function(t){ return t.subject + " [" + t.status + "]"; }).join(" | "));
    if (p.fallback) lines.push("UNIVERSAL FALLBACK: selection remains valid. Use conservative DC knowledge; when uncertain, leave a detail open instead of fabricating canon.");
    if (S.divergence.length) lines.push("RECENT DIVERGENCE: " + S.divergence.slice(-3).join(" | "));
    var rel = relationLines(S);
    if (rel[0] && rel[0].indexOf("No recurring") < 0) lines.push("RELATIONSHIP EVIDENCE: " + rel.slice(0,4).join(" "));
    var inj = recentInjuryReminder(S); if (inj) lines.push(inj);
    lines.push("[/DC BEFORE THE AGE OF HEROES]");
    return lines.join("\n");
  }

  function onInput(text) {
    var S = ensureState(), cfg = readAllConfig();
    S.counters.inputs++;
    S.counters.lastAction = actionNo();
    S.maturity.adultSexAllowed = cfg.adultRomance && S.maturity.ageStatus === "adult";
    ensureCoreCards();
    var cmd = parseCommand(text);
    if (cmd && cfg.visibleStatus) {
      S.command.pending = cmd;
      S.command.output = panel(cmd);
      return "[DC SYSTEM COMMAND " + cmd.toUpperCase() + ": do not advance fiction; output exactly SYSTEM_COMMAND_ACK]";
    }
    S.command.pending = null;
    S.command.output = null;
    observeAgeInput(text);
    observePlayerCommitments(text);
    pendingIntent(text);
    observeDivergenceInput(text);
    observeKnowledge(text, "player input");
    observeMentions(text);
    observeFactions(text);
    cleanupSignals(S);
    ensureCoreCards();
    return text;
  }

  function onContext(text) {
    var S = ensureState(), cfg = readAllConfig();
    S.counters.contexts++;
    ensureCoreCards();
    var inject = compactRuntime(S);
    if (S.command.pending) inject += "\n[SYSTEM COMMAND ACTIVE: return only SYSTEM_COMMAND_ACK; visible status panel replaces it.]";
    var max = Math.max(4000, maxChars());
    var budget = Math.min(cfg.contextBudget, Math.max(2800, max - 700));
    if (inject.length > budget) inject = inject.slice(0, budget);
    S.health.lastContextSize = inject.length;
    var kept = String(text || ""), reserve = inject.length + 4;
    var room = Math.max(0, max - reserve);
    if (kept.length > room) kept = kept.slice(-room);
    return kept + "\n\n" + inject;
  }

  function onOutput(text) {
    var S = ensureState();
    S.counters.outputs++;
    if (S.command.pending && S.command.output) {
      var out = S.command.output;
      S.command.pending = null;
      S.command.output = null;
      ensureCoreCards();
      return out;
    }
    observeOriginOutput(text);
    observeSkillOutput(text);
    observeWorldOutput(text);
    observeMentions(text);
    observeKnowledge(text, "AI output");
    observeFactions(text);
    observeThreads(text);
    observeDivergenceOutput(text);
    observeInjuryOutput(text);
    observeSceneOutput(text);
    cleanupSignals(S);
    ensureCoreCards();
    return text;
  }

  function debugSnapshot() { return clone(ensureState()); }
  function debugCounts() { return { detailed:Object.keys(PROFILE_DB).length, indexed:CHARACTER_INDEX.length, names:registryNames().length }; }

  return {
    VERSION:VERSION, SCHEMA:SCHEMA, PHASES:PHASES, CLASS_RULES:CLASS_RULES,
    normalize:normalize, resolveCharacter:resolveCharacter, ensureState:ensureState,
    readConfig:readAllConfig, ensureCoreCards:ensureCoreCards, promoteSelectedCharacterCard:promoteSelectedCharacterCard,
    onInput:onInput, onContext:onContext, onOutput:onOutput, panel:panel,
    debugSnapshot:debugSnapshot, debugCounts:debugCounts, _nameCache:null
  };
})();
