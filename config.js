/**
 * WHITE-LABEL STOREFRONT MASTER CONFIG ENGINE
 * 100% Cloned from Optic Cheats IPS Nexus Engine
 */
window.STORE_CONFIG = {
  brandName: "OPTIC CHEATS",
  brandShort: "Optic",
  brandTagline: "Premium and Quality. Undetected Cheats.",
  brandDesc: "Discover our range of products made with care and quality. Enjoy fair prices and friendly help every step of the way.",
  logoText: "OPTIC <span style='color:var(--accent,#7983ff)'>CHEATS</span>",
  logoUrl: "assets/optic_banner_logo.png",
  heroImage: "assets/optic_hero_bg.jpg",
  heroVideo: "assets/hero_animation.webm",
  heroTitle1: "Premium and Quality.",
  heroTitle2: "Undetected Cheats.",
  discordUrl: "https://discord.gg/opticcheats",
  supportEmail: "support@opticcheats.xyz",
  currencySymbol: "$",
  currencyCode: "USD",

  stats: {
    onlineNow: 42,
    walletBalance: "0.00",
    totalMembers: "1,748",
    mostOnline: "183"
  },

  currentUser: {
    username: "LexS32",
    email: "lexs40@gmail.com",
    group: "Members",
    rank: "Newbie (1/14)",
    reputation: 0,
    posts: 0,
    joined: "22 minutes ago",
    lastVisited: "1 minute ago",
    avatarBg: "#6bc462",
    avatarLetter: "L"
  },

  theme: {
    preset: "optic",
    accent: "#7983ff",
    accentHover: "#6366f1",
    bgBase: "#0c0f16",
    cardBg: "#131722",
    borderColor: "rgba(121, 131, 255, 0.18)",
    glowColor: "rgba(121, 131, 255, 0.28)"
  },

  // Prime Catalog Cards (Optic Cheats Catalog Grid)
  primeGames: [
    {
      id: "r6",
      name: "Rainbow Six Siege",
      slug: "r6",
      image: "assets/cards/r6_primary.webp",
      hoverImage: "assets/cards/r6_hover.webp",
      logo: "assets/logos/r6.png",
      status: "Undetected",
      antiCheat: "BattlEye Safe",
      fromPrice: "3.99",
      prime: true
    },
    {
      id: "cs2",
      name: "Counter-Strike 2",
      slug: "cs2",
      image: "assets/cards/cs2_primary.webp",
      hoverImage: "assets/cards/cs2_hover.webp",
      logo: "assets/logos/paypal.png",
      status: "Undetected",
      antiCheat: "VACNet Safe",
      fromPrice: "4.99",
      prime: true
    },
    {
      id: "fortnite",
      name: "Fortnite",
      slug: "fortnite",
      image: "assets/cards/fortnite_primary.webp",
      hoverImage: "assets/cards/fortnite_hover.webp",
      logo: "assets/logos/fortnite.png",
      status: "Undetected",
      antiCheat: "EAC & BE Safe",
      fromPrice: "4.99",
      prime: true
    },
    {
      id: "rust",
      name: "Rust",
      slug: "rust",
      image: "assets/cards/rust_primary.webp",
      hoverImage: "assets/cards/rust_hover.webp",
      logo: "assets/logos/rust.png",
      status: "Undetected",
      antiCheat: "EAC Safe",
      fromPrice: "4.99",
      prime: true
    },
    {
      id: "valorant",
      name: "Valorant",
      slug: "valorant",
      image: "assets/cards/valorant_primary.webp",
      hoverImage: "assets/cards/valorant_hover.webp",
      logo: "assets/logos/valorant.png",
      status: "Undetected",
      antiCheat: "Vanguard Safe",
      fromPrice: "7.99",
      prime: true
    },
    {
      id: "tarkov",
      name: "Escape from Tarkov",
      slug: "tarkov",
      image: "assets/cards/tarkov_primary.webp",
      hoverImage: "assets/cards/tarkov_hover.webp",
      logo: "assets/logos/tarkov.png",
      status: "Undetected",
      antiCheat: "BattlEye Safe",
      fromPrice: "8.99",
      prime: true
    },
    {
      id: "arc",
      name: "Arc Raiders",
      slug: "arc",
      image: "assets/cards/arc_primary.webp",
      hoverImage: "assets/cards/arc_hover.webp",
      logo: "assets/logos/r6.png",
      status: "Undetected",
      antiCheat: "EAC Safe",
      fromPrice: "6.99",
      prime: true
    },
    {
      id: "apex",
      name: "Apex Legends",
      slug: "apex",
      image: "assets/cards/apex_primary.webp",
      hoverImage: "assets/cards/apex_hover.webp",
      logo: "assets/logos/apex.png",
      status: "Undetected",
      antiCheat: "EAC Safe",
      fromPrice: "5.49",
      prime: true
    },
    {
      id: "hwid",
      name: "HWID Spoofer & DMA",
      slug: "hwid",
      image: "assets/cards/hwid_primary.webp",
      hoverImage: "assets/cards/hwid_hover.webp",
      logo: "assets/logos/hwid.png",
      status: "Undetected",
      antiCheat: "100% Unbannable",
      fromPrice: "6.99",
      prime: true
    },
    {
      id: "rivals",
      name: "Marvel Rivals",
      slug: "rivals",
      image: "assets/cards/rivals_primary.webp",
      hoverImage: "assets/cards/rivals_hover.webp",
      logo: "assets/logos/rivals.png",
      status: "Undetected",
      antiCheat: "Safe",
      fromPrice: "4.99",
      prime: true
    }
  ],

  // Products by Game Slug
  gameProducts: {
    r6: [
      {
        id: "r6-ancient",
        name: "R6 Ancient",
        gameSlug: "r6",
        category: "Rainbow Six Siege",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Streamproof ESP, Silent Aim, Recoil Control, and Cav ESP for complete tactical control.",
        image: "assets/cards/r6_primary.webp",
        hoverImage: "assets/cards/r6_hover.webp",
        specs: ["WINDOWS 10-11 (23H2)", "INTEL/AMD", "UEFI"],
        fromPrice: "3.99",
        packages: [
          { duration: "1 DAY", price: "3.99", stock: 2, popular: true },
          { duration: "7 DAY", price: "14.99", stock: 2, popular: false },
          { duration: "30 DAY", price: "29.99", stock: 1, popular: false }
        ],
        requirements: [
          "Intel + AMD CPU Supported",
          "Windows 10 - 11 (1909 - 23H2)",
          "SVM (AMD) / V-Tx (Intel) (BIOS) Enabled",
          "16GB RAM (or more)",
          "Secure Boot disabled"
        ],
        featuresAimbot: [
          "Enable / Disable Toggle",
          "Silent Aim & Memory Hit",
          "Draw FOV Circle",
          "Smoothness & Aim Sensitivity Sliders",
          "Target Bone Selection (Head, Neck, Chest)",
          "Target Lock & Team Filter"
        ],
        featuresVisuals: [
          "2D Box & Skeleton Chams",
          "Draw Health & Operator Icons",
          "Skeleton Thickness & Line Thickness Sliders",
          "Snaplines to Visible Enemies",
          "Player Distance Meters"
        ],
        featuresAbilities: [
          "Abilities for all characters",
          "Gadget, Drone & Trap Visuals",
          "Claymore & Hard Breach Alert"
        ]
      },
      {
        id: "r6-exodus-lite",
        name: "R6 Exodus Lite",
        gameSlug: "r6",
        category: "Rainbow Six Siege",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Streamproof Player ESP, Skeleton, Health, Distance & Item Radar.",
        image: "assets/cards/r6_hover.webp",
        hoverImage: "assets/cards/r6_primary.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "INCLUDES SPOOFER"],
        fromPrice: "4.99",
        packages: [
          { duration: "1 DAY", price: "4.99", stock: 4, popular: true },
          { duration: "7 DAY", price: "16.99", stock: 2, popular: false },
          { duration: "30 DAY", price: "34.99", stock: 2, popular: false }
        ],
        requirements: ["Intel + AMD", "Windows 10/11", "UEFI Boot Mode"],
        featuresAimbot: ["Smooth Linear Aim", "Visible Only Check", "Custom Keybinds"],
        featuresVisuals: ["Skeleton ESP", "Health Bar", "Head Circle", "Snaplines"],
        featuresAbilities: ["Operator Identification", "Drone Glow"]
      },
      {
        id: "r6-crusader",
        name: "R6 Crusader",
        gameSlug: "r6",
        category: "Rainbow Six Siege",
        status: "Updating (Not Working)",
        statusCode: "updating",
        desc: "Memory Silent Aim, Rage Spinbot, Unlock All Operators & Skins.",
        image: "assets/cards/r6_primary.webp",
        hoverImage: "assets/cards/r6_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "INTERNAL"],
        fromPrice: "6.99",
        packages: [
          { duration: "1 DAY", price: "6.99", stock: 0, popular: true },
          { duration: "7 DAY", price: "24.99", stock: 0, popular: false }
        ],
        requirements: ["Intel + AMD", "Windows 10/11"],
        featuresAimbot: ["Rage Silent Aim", "No Recoil 100%", "No Spread"],
        featuresVisuals: ["3D Box ESP", "Chams Glow", "Weapon ESP"],
        featuresAbilities: ["Full Unlock All", "Speedhack Mode"]
      },
      {
        id: "sapphire-unlocker",
        name: "Sapphire Unlock All",
        gameSlug: "r6",
        category: "Rainbow Six Siege",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Instant 1-Click Unlock for all Charms, Weapon Skins, and Elite Uniforms.",
        image: "assets/cards/r6_hover.webp",
        hoverImage: "assets/cards/r6_primary.webp",
        specs: ["ALL WINDOWS VERSIONS", "ALL CPUS", "LIFETIME"],
        fromPrice: "14.99",
        packages: [
          { duration: "LIFETIME", price: "14.99", stock: 10, popular: true }
        ],
        requirements: ["Any Windows 10/11", "Any Hardware"],
        featuresAimbot: ["N/A - Unlocker Tool"],
        featuresVisuals: ["Custom Client Camo"],
        featuresAbilities: ["All Elite Sets", "All Pro League Skins", "All Black Ice"]
      }
    ],

    cs2: [
      {
        id: "cs2-predation",
        name: "CS2 Predation Kernel",
        gameSlug: "cs2",
        category: "Counter-Strike 2",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Ultra low-latency kernel aimbot, visible check, smooth curving, weapon RCS, and full visual ESP.",
        image: "assets/cards/cs2_primary.webp",
        hoverImage: "assets/cards/cs2_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "VACNET SAFE"],
        fromPrice: "4.99",
        packages: [
          { duration: "1 DAY", price: "4.99", stock: 5, popular: true },
          { duration: "7 DAY", price: "14.99", stock: 3, popular: false },
          { duration: "30 DAY", price: "28.99", stock: 2, popular: false }
        ],
        requirements: ["Windows 10 or 11 (all versions)", "Intel and AMD supported"],
        featuresAimbot: ["Vector & Bone Aim", "Dynamic FOV", "Standalone RCS Recoil Control"],
        featuresVisuals: ["Box, Bone & Health ESP", "Bomb Timer & Defuse Bar", "Dropped Weapons"],
        featuresAbilities: ["Auto Pistol", "Bunnyhop Script", "Radar 2D Hack"]
      },
      {
        id: "cs2-vision-esp",
        name: "CS2 Vision External ESP",
        gameSlug: "cs2",
        category: "Counter-Strike 2",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "External streamproof overlay, glow outline, skeleton ESP, and spectator detection.",
        image: "assets/cards/cs2_hover.webp",
        hoverImage: "assets/cards/cs2_primary.webp",
        specs: ["WINDOWS 10-11", "STREAMPROOF", "VAC SAFE"],
        fromPrice: "3.99",
        packages: [
          { duration: "1 DAY", price: "3.99", stock: 8, popular: true },
          { duration: "7 DAY", price: "11.99", stock: 5, popular: false },
          { duration: "30 DAY", price: "22.99", stock: 3, popular: false }
        ],
        requirements: ["Windows 10/11", "OBS / Discord Streamproof"],
        featuresAimbot: ["Triggerbot with ms Delay"],
        featuresVisuals: ["Player Chams Glow", "Visible Check Color Shift", "Sound ESP"],
        featuresAbilities: ["Rank & Level Revealer", "Grenade Trajectory Prediction"]
      }
    ],

    fortnite: [
      {
        id: "fortnite-private",
        name: "Fortnite Private External",
        gameSlug: "fortnite",
        category: "Fortnite",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Ring-0 kernel hypervisor bypass. Precise projectile bullet prediction aimbot and custom loot rarity filter.",
        image: "assets/cards/fortnite_primary.webp",
        hoverImage: "assets/cards/fortnite_hover.webp",
        specs: ["WINDOWS 10-11", "EAC & BATTLEYE SAFE", "INTEL/AMD"],
        fromPrice: "6.49",
        packages: [
          { duration: "1 DAY", price: "6.49", stock: 3, popular: true },
          { duration: "7 DAY", price: "22.49", stock: 2, popular: false },
          { duration: "30 DAY", price: "41.99", stock: 1, popular: false }
        ],
        requirements: ["Windows 10/11 (20H2 - 23H2)", "Intel and AMD supported", "BIOS Virtualization On"],
        featuresAimbot: ["Prediction Calculation for Snipers", "FOV Radius Slider", "Target Weakspots"],
        featuresVisuals: ["Corner Box ESP", "Skeleton Lines", "Loot Tier Highlighting", "Chest & Ammo Box ESP"],
        featuresAbilities: ["Vehicle ESP", "Supply Drop Tracker", "Instant Reload Assistant"]
      },
      {
        id: "fortnite-slotted",
        name: "Fortnite Slotted Kernel (50 Slots)",
        gameSlug: "fortnite",
        category: "Fortnite",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Limited slot private build. Custom compiled driver per user with 100% clean tournament record.",
        image: "assets/cards/fortnite_hover.webp",
        hoverImage: "assets/cards/fortnite_primary.webp",
        specs: ["PRIVATE SLOTS", "TOURNAMENT SAFE", "CUSTOM DRIVER"],
        fromPrice: "9.99",
        packages: [
          { duration: "7 DAY", price: "34.99", stock: 1, popular: false },
          { duration: "30 DAY", price: "79.99", stock: 2, popular: true }
        ],
        requirements: ["Application Verification Required", "USB Drive for UEFI Injection"],
        featuresAimbot: ["Humanized Bézier Curve Aimbot", "Randomized Hitbox Target"],
        featuresVisuals: ["Clean Streamproof Direct3D Overlay", "Offscreen Indicator Arrows"],
        featuresAbilities: ["Ghost Peek Assistant", "Automatic Weapon Fire"]
      }
    ],

    rust: [
      {
        id: "rust-phantom",
        name: "Rust Phantom Kernel",
        gameSlug: "rust",
        category: "Rust",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Complete dominating suite for Rust. Silent aim, instant bullet, recoil compensation, and raid alerts.",
        image: "assets/cards/rust_primary.webp",
        hoverImage: "assets/cards/rust_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "CERBERUS SAFE"],
        fromPrice: "7.49",
        packages: [
          { duration: "1 DAY", price: "7.49", stock: 3, popular: true },
          { duration: "7 DAY", price: "24.99", stock: 2, popular: false },
          { duration: "30 DAY", price: "44.99", stock: 1, popular: false }
        ],
        requirements: ["Windows 10/11", "Intel/AMD CPU", "Fast SSD Recommended"],
        featuresAimbot: ["Silent Aim Hitbox Scan", "Fast Bullet Velocity Multiplier", "Predictive Drop"],
        featuresVisuals: ["Player & Sleeper ESP", "Ore Node Filters (Sulfur, Metal)", "Stash & Tool Cupboard ESP"],
        featuresAbilities: ["Always Day Mode", "Spider Climb Assist", "Automatic Bow Draw"]
      },
      {
        id: "rust-recoil",
        name: "Rust Pro Recoil Script",
        gameSlug: "rust",
        category: "Rust",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Hardware mouse emulation recoil script. Works on all mice, 100% external with zero game memory reading.",
        image: "assets/cards/rust_hover.webp",
        hoverImage: "assets/cards/rust_primary.webp",
        specs: ["ALL WINDOWS", "ALL MICE", "LIFETIME ACCESS"],
        fromPrice: "14.99",
        packages: [
          { duration: "LIFETIME", price: "14.99", stock: 12, popular: true }
        ],
        requirements: ["Logitech, Razer, SteelSeries, or Generic USB Mouse"],
        featuresAimbot: ["AK-47, MP5, LR-300 Recoil Compensation", "Attachment Auto Detect"],
        featuresVisuals: ["N/A - Non-Memory External"],
        featuresAbilities: ["Rapid Fire Mode", "Crouch Spam Assist"]
      }
    ],

    valorant: [
      {
        id: "valorant-vanguard",
        name: "Valorant Vanguard Private",
        gameSlug: "valorant",
        category: "Valorant",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Hardware hypervisor bypass for Riot Vanguard. High-tick smooth colorbot, bone tracking, and safe recoil control.",
        image: "assets/cards/valorant_primary.webp",
        hoverImage: "assets/cards/valorant_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "VANGUARD BYPASS"],
        fromPrice: "9.99",
        packages: [
          { duration: "1 DAY", price: "9.99", stock: 2, popular: true },
          { duration: "7 DAY", price: "29.99", stock: 2, popular: false },
          { duration: "30 DAY", price: "59.99", stock: 1, popular: false }
        ],
        requirements: ["Windows 10 (all builds) or Windows 11", "Secure Boot Disabled or Hyper-V Mode"],
        featuresAimbot: ["Vanguard Safe Mouse Emulation", "Custom Smoothing Curves", "Triggerbot with ms Delay"],
        featuresVisuals: ["External Color Highlighting", "Crosshair Overlay"],
        featuresAbilities: ["Bunnyhop Script", "Spike Defusal Timer Audio Alert"]
      },
      {
        id: "valorant-dma",
        name: "Valorant 2PC DMA Firmware",
        gameSlug: "valorant",
        category: "Valorant",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Dual PC PCIe DMA direct memory reader. Vanguard cannot scan second machine memory. Truly unbannable.",
        image: "assets/cards/valorant_hover.webp",
        hoverImage: "assets/cards/valorant_primary.webp",
        specs: ["2 PC SETUP", "PCIE DMA CARD", "100% UNBANNABLE"],
        fromPrice: "19.99",
        packages: [
          { duration: "30 DAY", price: "39.99", stock: 3, popular: true },
          { duration: "LIFETIME", price: "119.99", stock: 1, popular: false }
        ],
        requirements: ["Secondary PC/Laptop with USB 3.0", "PCIe DMA Card installed in Game PC"],
        featuresAimbot: ["KMBox KBot Mouse Output", "Silent Aim Hardware Injection"],
        featuresVisuals: ["Web Radar on Second PC / iPad / Phone", "Full Player 2D Map"],
        featuresAbilities: ["Ultimate Abilities Tracker", "Economy Counter"]
      }
    ],

    tarkov: [
      {
        id: "eft-nexus",
        name: "Escape From Tarkov Nexus",
        gameSlug: "tarkov",
        category: "Escape from Tarkov",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Industry leading Tarkov solution. Loot filter with real-time flea prices, chams, extract ESP, and silent aim.",
        image: "assets/cards/tarkov_primary.webp",
        hoverImage: "assets/cards/tarkov_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "BATTLEYE SAFE"],
        fromPrice: "8.99",
        packages: [
          { duration: "1 DAY", price: "8.99", stock: 4, popular: true },
          { duration: "7 DAY", price: "29.99", stock: 2, popular: false },
          { duration: "30 DAY", price: "59.99", stock: 1, popular: false }
        ],
        requirements: ["Windows 10/11", "Intel/AMD CPU", "16GB+ RAM"],
        featuresAimbot: ["Silent Aim Vector", "Bone Selection (Head, Thorax)", "Hit Sound Effect"],
        featuresVisuals: ["Player & Scav/Boss ESP", "Live Flea Market Price Item Filter", "Extract Points & Requirements"],
        featuresAbilities: ["Instant Search", "No Sway / No Recoil", "Stamina Hack Assist"]
      }
    ],

    arc: [
      {
        id: "arc-pioneer",
        name: "Arc Raiders Pioneer External",
        gameSlug: "arc",
        category: "Arc Raiders",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Undetected external framework for Arc Raiders. Machine weakspot highlighting, bot detection, and safe aim.",
        image: "assets/cards/arc_primary.webp",
        hoverImage: "assets/cards/arc_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "EAC SAFE"],
        fromPrice: "6.99",
        packages: [
          { duration: "1 DAY", price: "6.99", stock: 5, popular: true },
          { duration: "7 DAY", price: "21.99", stock: 3, popular: false },
          { duration: "30 DAY", price: "44.99", stock: 2, popular: false }
        ],
        requirements: ["Windows 10/11", "Intel or AMD Processor"],
        featuresAimbot: ["Weakspot Auto Target", "Smooth Aim Correction", "FOV Circle"],
        featuresVisuals: ["Hostile Machine ESP", "Extraction Pod Tracker", "Container Loot Glow"],
        featuresAbilities: ["Shield Monitor", "Warning Alert When Targeted"]
      }
    ],

    apex: [
      {
        id: "apex-velocity",
        name: "Apex Legends Velocity",
        gameSlug: "apex",
        category: "Apex Legends",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Streamproof glow, smooth humanized aimbot with velocity prediction, spectator list, and armor swap assist.",
        image: "assets/cards/apex_primary.webp",
        hoverImage: "assets/cards/apex_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "EAC SAFE"],
        fromPrice: "5.49",
        packages: [
          { duration: "1 DAY", price: "5.49", stock: 4, popular: true },
          { duration: "7 DAY", price: "18.99", stock: 3, popular: false },
          { duration: "30 DAY", price: "34.99", stock: 1, popular: false }
        ],
        requirements: ["Windows 10/11", "Intel and AMD supported"],
        featuresAimbot: ["Velocity & Bullet Drop Prediction", "Dynamic Target Bone", "Smooth Assist"],
        featuresVisuals: ["Custom Player Glow Colors", "Shield Level & Health Bars", "Deathbox ESP"],
        featuresAbilities: ["Auto Superglide", "Bunnyhop Assist", "Spectator Warning"]
      }
    ],

    hwid: [
      {
        id: "optic-kernel-spoofer",
        name: "Optic Ring-0 HWID Spoofer",
        gameSlug: "hwid",
        category: "HWID Spoofer & DMA",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "One-click clean system serial spoofer. Randomizes Disk, BIOS, NIC MAC, GPU, and Registry IDs to bypass EAC, BE, and Vanguard.",
        image: "assets/cards/hwid_primary.webp",
        hoverImage: "assets/cards/hwid_hover.webp",
        specs: ["ALL WINDOWS VERSIONS", "INTEL/AMD", "ALL ANTICHEATS"],
        fromPrice: "6.99",
        packages: [
          { duration: "1 DAY", price: "6.99", stock: 10, popular: false },
          { duration: "7 DAY", price: "19.99", stock: 8, popular: false },
          { duration: "30 DAY", price: "34.99", stock: 5, popular: true },
          { duration: "LIFETIME", price: "59.99", stock: 3, popular: false }
        ],
        requirements: ["Windows 10 (all versions) or Windows 11", "No Windows reinstall needed"],
        featuresAimbot: ["N/A - System Protection"],
        featuresVisuals: ["Live Serial Check Dashboard"],
        featuresAbilities: ["Motherboard Serial Spoof", "Drive Volume ID Spoof", "MAC Address Randomizer", "Cleaner Suite Included"]
      },
      {
        id: "optic-dma-bundle",
        name: "Optic 75T DMA Hardware & Custom 1:1 Firmware",
        gameSlug: "hwid",
        category: "HWID Spoofer & DMA",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Complete physical DMA hardware kit with custom compiled 1:1 firmware cloned from genuine Intel/Realtek NICs. Zero PC software running.",
        image: "assets/cards/hwid_hover.webp",
        hoverImage: "assets/cards/hwid_primary.webp",
        specs: ["PHYSICAL HARDWARE", "SHIPS WORLDWIDE", "1:1 UNIQUE FIRMWARE"],
        fromPrice: "199.99",
        packages: [
          { duration: "DMA CARD ONLY", price: "199.99", stock: 3, popular: false },
          { duration: "DMA + 1:1 FIRMWARE", price: "289.99", stock: 2, popular: true },
          { duration: "FULL BUNDLE (+ KMBOX + FUSER)", price: "449.99", stock: 1, popular: false }
        ],
        requirements: ["PCIe slot on Gaming PC", "Second PC or Laptop with USB 3.0"],
        featuresAimbot: ["Hardware Injection via KMBox B+ Pro"],
        featuresVisuals: ["Direct Hardware Video Fuser Overlay"],
        featuresAbilities: ["Permanent Undetected Status", "1:1 Unique Firmware Included"]
      }
    ],

    rivals: [
      {
        id: "marvel-rivals-precision",
        name: "Marvel Rivals Precision",
        gameSlug: "rivals",
        category: "Marvel Rivals",
        status: "Undetected (Working)",
        statusCode: "working",
        desc: "Tailored for Marvel Rivals. Hero hitbox lock, fly/dive trajectory calculation, player health ESP, and ultimate timers.",
        image: "assets/cards/rivals_primary.webp",
        hoverImage: "assets/cards/rivals_hover.webp",
        specs: ["WINDOWS 10-11", "INTEL/AMD", "UNDETECTED"],
        fromPrice: "4.99",
        packages: [
          { duration: "1 DAY", price: "4.99", stock: 5, popular: true },
          { duration: "7 DAY", price: "16.99", stock: 3, popular: false },
          { duration: "30 DAY", price: "32.99", stock: 2, popular: false }
        ],
        requirements: ["Windows 10/11", "Intel/AMD Supported"],
        featuresAimbot: ["Hero Lock On Head/Chest", "Flying Target Prediction", "Smooth Curve"],
        featuresVisuals: ["2D Box ESP", "Hero Class Indicator", "Distance Meters", "Health Bars"],
        featuresAbilities: ["Enemy Ultimate Cooldown Tracker", "Team Combo Alerts"]
      }
    ]
  }
};

// Backward compatibility alias for any existing code
window.STORE_CONFIG.r6CategoryProducts = window.STORE_CONFIG.gameProducts.r6;
