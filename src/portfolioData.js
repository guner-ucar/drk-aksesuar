// ---------------------------------------------------------------------------
// DRK Group – Portföy Ön İzleme Deneyimi (Portfolio Preview Experience)
// ---------------------------------------------------------------------------
// Reusable, bilingual (tr/en) data model for the portfolio preview system.
// Each company can be a simple brand card (immersive: false) or a full
// scroll-driven immersive preview (immersive: true). New DRK Group companies
// (Sharge/Samsung immersive versions, others) can be added by appending an
// entry here — no component changes required.
//
// SpeedWA data (products, prices, links, images) was curated from the live
// site https://speedwa.com.tr and every product URL was verified (HTTP 200).
// Product images live locally under /public/portfolio/speedwa/ so the demo
// never depends on the external CDN at runtime.
// ---------------------------------------------------------------------------

const SPEEDWA_BASE = "https://speedwa.com.tr";

// SpeedWA brand accents — used ONLY as controlled highlights (buttons, active
// category, glow, thin lines), never as a full-surface dominant color. The
// premium DRK Aksesuar dark surface stays the shared foundation.
const SPEEDWA_COLORS = {
  accent: "#ff7a1a", // SpeedWA orange (energy / speed)
  accentStrong: "#ff661a",
  accentSoft: "rgba(255, 122, 26, 0.16)",
  deep: "#001b3a", // SpeedWA navy
};

const SPEEDWA_PRODUCTS = [
  {
    id: "samsung-magnet-powerbank",
    name: "Samsung EB-U2500X Standlı Magnet Powerbank",
    brand: "Samsung",
    group: "guc",
    spec: { tr: "Magnetli · Standlı Powerbank", en: "Magnetic · Stand Powerbank" },
    price: "2.449,00 TL",
    image: "/portfolio/speedwa/magnet-powerbank.png",
    alt: {
      tr: "Samsung EB-U2500X standlı manyetik powerbank",
      en: "Samsung EB-U2500X magnetic stand power bank",
    },
    url: `${SPEEDWA_BASE}/samsung-eb-u2500x-standli-magnet-powerbank`,
  },
  {
    id: "samsung-25w-charger",
    name: "Samsung EP-T2510X Type-C Hızlı Şarj Aleti 25W",
    brand: "Samsung",
    group: "guc",
    spec: { tr: "25W · Type-C Adaptör", en: "25W · Type-C Adapter" },
    price: "1.849,00 TL",
    image: "/portfolio/speedwa/samsung-charger.webp",
    alt: {
      tr: "Samsung EP-T2510X 25W Type-C hızlı şarj adaptörü",
      en: "Samsung EP-T2510X 25W Type-C fast charger",
    },
    url: `${SPEEDWA_BASE}/samsung-ep-t2510x-typec-hizli-sarj-aleti-25w-siyah`,
  },
  {
    id: "tribit-stormbox-pro",
    name: "Tribit StormBox Pro 40W Bluetooth Hoparlör",
    brand: "Tribit",
    group: "ses",
    spec: { tr: "40W · Taşınabilir Hoparlör", en: "40W · Portable Speaker" },
    price: "5.999,00 TL",
    image: "/portfolio/speedwa/stormbox-pro.jpg",
    alt: {
      tr: "Tribit StormBox Pro taşınabilir Bluetooth hoparlör",
      en: "Tribit StormBox Pro portable Bluetooth speaker",
    },
    url: `${SPEEDWA_BASE}/tribit-stormbox-pro-40w-bluetooth-hoparlor`,
  },
  {
    id: "shaza-nexa-powerbank",
    name: "SHAZA Nexa Serisi 5.000 mAh Slim Powerbank",
    brand: "SHAZA",
    group: "guc",
    spec: { tr: "5.000 mAh · Slim Powerbank", en: "5,000 mAh · Slim Power Bank" },
    price: "1.999,90 TL",
    image: "/portfolio/speedwa/nexa-powerbank.png",
    alt: {
      tr: "SHAZA Nexa serisi 5.000 mAh slim powerbank",
      en: "SHAZA Nexa series 5,000 mAh slim power bank",
    },
    url: `${SPEEDWA_BASE}/shaza-nexa-serisi-5-000-mah-slim-powerbank-gri`,
  },
  {
    id: "shaza-air7-earbuds",
    name: "SHAZA AIR7 Bluetooth Kulaklık",
    brand: "SHAZA",
    group: "ses",
    spec: { tr: "TWS · Bluetooth Kulaklık", en: "TWS · Bluetooth Earbuds" },
    price: "1.399,90 TL",
    image: "/portfolio/speedwa/air7-earbuds.png",
    alt: {
      tr: "SHAZA AIR7 kablosuz Bluetooth kulaklık",
      en: "SHAZA AIR7 wireless Bluetooth earbuds",
    },
    url: `${SPEEDWA_BASE}/shaza-air7-bluetooth-kulaklik-siyah`,
  },
  {
    id: "shaza-usbc-hub",
    name: "SHAZA 8-in-1 USB Type-C Hub",
    brand: "SHAZA",
    group: "aksesuar",
    spec: { tr: "8-in-1 · HDMI / USB / PD Hub", en: "8-in-1 · HDMI / USB / PD Hub" },
    price: "1.899,90 TL",
    image: "/portfolio/speedwa/usbc-hub.png",
    alt: {
      tr: "SHAZA 8 in 1 USB Type-C hub adaptör",
      en: "SHAZA 8-in-1 USB Type-C hub adapter",
    },
    url: `${SPEEDWA_BASE}/shaza-8in1-usbtype-c-hub-port-adaptor-hdmi-usb-ethernet-pd-girisli`,
  },
];

const SPEEDWA = {
  id: "speedwa",
  name: "SpeedWA",
  group: "DRK Group",
  immersive: true,
  wordmark: "speedwa",
  website: SPEEDWA_BASE,
  colors: SPEEDWA_COLORS,
  branding: {
    logo: "https://oss.narbulut.com/bucket-21045-ktcl/cdn/speedwa/logo/original/688b0d2301959.png",
    surface: "#00254a",
    surfaceAlt: "#ffffff",
    ink: "#ffffff",
    muted: "#b9c9da",
    accent: "#f9b116",
    accentStrong: "#ff7a1a",
    mark: "SW",
  },
  copy: {
    tr: {
      status: "DRK PORTFÖYÜ",
      kicker: "DİJİTAL ÖN İZLEME",
      tagline: "Hayatı Kolaylaştıran Akıllı Detaylar",
      short:
        "Güç, ses ve akıllı aksesuar dünyasında hızlı ve pratik teknoloji ürünleri.",
      cardHint: "Ön İzlemeyi Keşfet",
      openPreview: "Ön İzlemeyi Aç",
      closePreview: "Ön izlemeyi kapat",
      heroTitle: "SpeedWA dijital vitrini",
      heroText:
        "Powerbank’ten hoparlöre, hızlı şarjdan akıllı aksesuara kadar SpeedWA ürün dünyasının DRK premium diliyle yeniden yorumlanmış ön izlemesi.",
      scrollHint: "Deneyime düğmeyle girin",
      featuredLabel: "ÖNE ÇIKAN ÜRÜN",
      productsLabel: "Öne Çıkan Ürünler",
      productsHint: "SpeedWA kataloğundan seçili teknoloji ürünleri",
      inspect: "Ürünü İncele",
      addToCart: "Sepete Ekle",
      visitSite: "SpeedWA Web Sitesine Git",
      goSite: "Siteye Git",
      exploreFull: "SpeedWA’yı Keşfet",
      newTabNote: "Bağlantılar SpeedWA’da yeni sekmede açılır",
      priceNote: "Ürün ve fiyat bilgileri SpeedWA’dan alınmıştır.",
      announce: ["Ücretsiz Kargo", "Aynı Gün Kargo", "2 Yıl Garanti", "Güvenli Ödeme"],
      searchPlaceholder: "Ürün, kategori veya marka ara",
      categoriesLabel: "Kategoriler",
      heroLead: "Enerjini Yükselt",
      heroSub: "Yüksek performanslı güç, ses ve akıllı aksesuar ürünleri; hızlı, pratik ve güvenilir.",
      heroCtaShop: "Alışverişe Başla",
      seeAll: "Tüm Ürünleri Gör",
      trust: [
        ["Ücretsiz Kargo", "Seçili ürünlerde"],
        ["Hızlı Teslimat", "Aynı gün kargo"],
        ["Güvenli Alışveriş", "2 yıl resmi garanti"],
      ],
      footerTagline: "Hayatı kolaylaştıran akıllı teknoloji aksesuarları.",
      footerColsTitle: ["Kurumsal", "Kategoriler", "Destek"],
      footerCorporate: ["Hakkımızda", "İş Ortaklarımız", "Sosyal Sorumluluk"],
      footerSupport: ["Yardım & Destek", "Teslimat & İade", "Sıkça Sorulan Sorular"],
      footerNote: "DRK Aksesuar tarafından hazırlanan premium ön izleme · Resmi site:",
      reelHint: "Diğer markaları görmek için yana kaydırın",
      soon: "Yakında",
      soonText: "Bu markanın premium ön izleme deneyimi çok yakında burada olacak.",
      prev: "Önceki marka",
      next: "Sonraki marka",
    },
    en: {
      status: "DRK PORTFOLIO",
      kicker: "DIGITAL PREVIEW",
      tagline: "Smart details that make life easier",
      short:
        "Fast, practical technology across power, audio and smart accessories.",
      cardHint: "Explore the preview",
      openPreview: "Open preview",
      closePreview: "Close preview",
      heroTitle: "The SpeedWA digital showroom",
      heroText:
        "A preview of SpeedWA’s product world — from power banks and speakers to fast charging and smart accessories — reinterpreted in the DRK premium design language.",
      scrollHint: "Use the button to enter the experience",
      featuredLabel: "FEATURED PRODUCT",
      productsLabel: "Featured Products",
      productsHint: "Selected technology products from the SpeedWA catalogue",
      inspect: "View product",
      addToCart: "Add to cart",
      visitSite: "Go to the SpeedWA website",
      goSite: "Visit site",
      exploreFull: "Explore SpeedWA",
      newTabNote: "Links open on SpeedWA in a new tab",
      priceNote: "Product and price information is sourced from SpeedWA.",
      announce: ["Free Shipping", "Same-Day Dispatch", "2-Year Warranty", "Secure Payment"],
      searchPlaceholder: "Search products, categories or brands",
      categoriesLabel: "Categories",
      heroLead: "Power up your day",
      heroSub: "High-performance power, audio and smart-accessory products — fast, practical and reliable.",
      heroCtaShop: "Start shopping",
      seeAll: "See all products",
      trust: [
        ["Free Shipping", "On selected products"],
        ["Fast Delivery", "Same-day dispatch"],
        ["Secure Shopping", "2-year official warranty"],
      ],
      footerTagline: "Smart technology accessories that make life easier.",
      footerColsTitle: ["Company", "Categories", "Support"],
      footerCorporate: ["About us", "Partners", "Social Responsibility"],
      footerSupport: ["Help & Support", "Delivery & Returns", "FAQ"],
      footerNote: "A premium preview crafted by DRK Aksesuar · Official site:",
      reelHint: "Swipe sideways to see other brands",
      soon: "Coming soon",
      soonText: "The premium preview experience for this brand is coming here very soon.",
      prev: "Previous brand",
      next: "Next brand",
    },
  },
  siteCategories: [
    { id: "guc", icon: "power", label: { tr: "Güç", en: "Power" }, url: `${SPEEDWA_BASE}/products/category/guc/` },
    { id: "ses", icon: "audio", label: { tr: "Ses", en: "Audio" }, url: `${SPEEDWA_BASE}/products/category/ses/` },
    { id: "kilif", icon: "case", label: { tr: "Kılıf", en: "Cases" }, url: `${SPEEDWA_BASE}/products/category/kilif/` },
    { id: "saat", icon: "watch", label: { tr: "Saat", en: "Watch" }, url: `${SPEEDWA_BASE}/products/category/saat/` },
    { id: "hafiza", icon: "memory", label: { tr: "Hafıza", en: "Memory" }, url: `${SPEEDWA_BASE}/products/category/hafiza/` },
    { id: "aksesuar", icon: "accessory", label: { tr: "Aksesuar", en: "Accessories" }, url: `${SPEEDWA_BASE}/products/category/aksesuar/` },
  ],
  heroBanners: [
    { image: "/portfolio/speedwa/hero-1.jpg", alt: { tr: "Samsung Standlı Magnet Powerbank kampanyası", en: "Samsung magnetic stand power bank campaign" } },
    { image: "/portfolio/speedwa/hero-2.jpg", alt: { tr: "SHAZA taşınabilir Bluetooth hoparlör serisi", en: "SHAZA portable Bluetooth speaker series" } },
    { image: "/portfolio/speedwa/hero-3.jpg", alt: { tr: "Tribit StormBox Bluetooth hoparlör", en: "Tribit StormBox Bluetooth speaker" } },
  ],
  categories: [
    { id: "all", label: { tr: "Tümü", en: "All" } },
    { id: "guc", label: { tr: "Güç", en: "Power" } },
    { id: "ses", label: { tr: "Ses", en: "Audio" } },
    { id: "aksesuar", label: { tr: "Aksesuar", en: "Accessories" } },
  ],
  featured: "samsung-magnet-powerbank",
  products: SPEEDWA_PRODUCTS,
};

// Doruk's HTTPS certificate is currently invalid; use the working canonical
// HTTP address supplied for the group site until their certificate is renewed.
const DORUK_GROUP_URL = "http://dorukiletisim.com.tr/tr";

const BRANDING = {
  samsung: { logo: "/portfolio/samsung-logo-black.svg", surface: "#f4f6ff", surfaceAlt: "#ffffff", ink: "#1428a0", muted: "#56618b", accent: "#1428a0", accentStrong: "#091b8f", mark: "S" },
  sharge: { logo: "/portfolio/sharge-logo.avif", surface: "#071008", surfaceAlt: "#101b11", ink: "#ffffff", muted: "#b8c3b9", accent: "#abce05", accentStrong: "#c4eb16", mark: "SH" },
  ayaneo: { logo: "https://www.ayaneo.com/ayaneo/img/footer/brand.png", surface: "#08080a", surfaceAlt: "#17171a", ink: "#f2f2f2", muted: "#a7a7ac", accent: "#c9c9ce", accentStrong: "#ffffff", mark: "AY" },
  inse: { logo: "https://inselife.com/cdn/shop/files/Animation_logo_36660306-f9d4-4530-873c-e4104b4015e6.png?height=100&v=1681715983", surface: "#eaf9fc", surfaceAlt: "#ffffff", ink: "#073a4a", muted: "#47727e", accent: "#1096b9", accentStrong: "#087894", mark: "IN" },
  turkcell: { logo: "https://ffo3gv1cf3ir.merlincdn.net/SiteAssets/Hakkimizda/genel-bakis/logolarimiz/TURKCELL_YATAY_ERKEK_LOGO.png", surface: "#fff8d7", surfaceAlt: "#ffffff", ink: "#164194", muted: "#596785", accent: "#fec500", accentStrong: "#164194", mark: "TC" },
  xiaomi: { logo: "https://i01.appmifile.com/webfile/globalimg/mobile/logo/mi.png", surface: "#fff2e8", surfaceAlt: "#ffffff", ink: "#5b230a", muted: "#7e5948", accent: "#ec6617", accentStrong: "#c94d00", mark: "MI" },
  roborock: { logo: "https://tr.roborock.com/cdn/shop/files/roborock_logo_share_1200x1200.jpg?v=1758519560", surface: "#fff2f4", surfaceAlt: "#ffffff", ink: "#3b3b3f", muted: "#6f6f74", accent: "#ea0029", accentStrong: "#bd001f", mark: "RR" },
  doruk: { surface: "#eef4ff", surfaceAlt: "#ffffff", ink: "#1b4489", muted: "#64718a", accent: "#f7923d", accentStrong: "#1b4489", mark: "D" },
  dorukCorporate: { surface: "#f1f5ff", surfaceAlt: "#ffffff", ink: "#17366d", muted: "#62708c", accent: "#4c74c9", accentStrong: "#17366d", mark: "DC" },
  dorukTelekom: { surface: "#edf8ff", surfaceAlt: "#ffffff", ink: "#123c59", muted: "#5b7485", accent: "#1e95ce", accentStrong: "#126e9a", mark: "DT" },
  speedGlobal: { surface: "#f3f3f3", surfaceAlt: "#ffffff", ink: "#111111", muted: "#666666", accent: "#111111", accentStrong: "#000000", mark: "SG" },
  drk: { logo: "/brand/drk-aksesuar-logo.png", surface: "#f0f7ef", surfaceAlt: "#ffffff", ink: "#282531", muted: "#667064", accent: "#0d9f00", accentStrong: "#087800", mark: "DRK" },
  electronics: { surface: "#eff6fa", surfaceAlt: "#ffffff", ink: "#00254a", muted: "#5f7080", accent: "#0d9f00", accentStrong: "#00254a", mark: "DE" },
  fleet: { surface: "#fff1f3", surfaceAlt: "#ffffff", ink: "#1a1a18", muted: "#75676a", accent: "#cf152d", accentStrong: "#9f0e20", mark: "PF" },
  service: { surface: "#edf7f5", surfaceAlt: "#ffffff", ink: "#153a34", muted: "#607a75", accent: "#13a18b", accentStrong: "#0b7665", mark: "ST" },
  ht: { surface: "#fff0f1", surfaceAlt: "#ffffff", ink: "#161616", muted: "#766164", accent: "#c72026", accentStrong: "#941419", mark: "HT" },
  netbasit: { surface: "#fff5e9", surfaceAlt: "#ffffff", ink: "#111111", muted: "#776b5c", accent: "#e58229", accentStrong: "#b95d11", mark: "NB" },
  restaurant: { surface: "#f1f6f0", surfaceAlt: "#ffffff", ink: "#282531", muted: "#657062", accent: "#0d9f00", accentStrong: "#087800", mark: "DR" },
};

// Direct DRK portfolio brands and the wider Doruk Group ecosystem. Only
// SpeedWA has an on-site preview; the remaining cards intentionally open the
// verified official site, or the Doruk Group page when no standalone site is
// available.
const SAMSUNG = {
  id: "samsung",
  name: "Samsung",
  group: "DRK Group",
  immersive: false,
  wordmark: "samsung",
  website: "https://shop.samsung.com/tr/",
  kind: "brand",
  reachId: "samsung",
  branding: BRANDING.samsung,
  copy: {
    tr: {
      status: "DRK PORTFÖYÜ",
      short: "Mobil teknoloji ekosisteminde geniş kategori ve kanal gücü.",
      soon: "Resmi mağazaya git",
    },
    en: {
      status: "DRK PORTFOLIO",
      short: "Broad category and channel strength across the mobile technology ecosystem.",
      soon: "Visit official store",
    },
  },
};

const SHARGE_BASE = "https://www.shargeturkiye.com";

// Sharge brand accents — lime energy on a graphite premium surface, matching
// shargeturkiye.com's identity while keeping the shared immersive structure.
const SHARGE_COLORS = {
  accent: "#abce05",
  accentStrong: "#c4eb16",
  accentSoft: "rgba(171, 206, 5, 0.16)",
  deep: "#0f1512",
};

// Real products pulled from shargeturkiye.com (name, price, image, link verified
// via the store's product endpoints).
const SHARGE_PRODUCTS = [
  {
    id: "sharge-170w",
    name: "Sharge 170W Şeffaf GaN Powerbank",
    brand: "Sharge",
    group: "guc",
    spec: { tr: "170W · Şeffaf GaN Powerbank", en: "170W · Transparent GaN Power Bank" },
    price: "6.639,20 TL",
    image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/170W---Yuksek-Guclu-ve-Seffaf-Tasarimli-GaN-Powerbank_kopyasi.png?v=1767246939",
    alt: { tr: "Sharge 170W şeffaf tasarımlı GaN powerbank", en: "Sharge 170W transparent GaN power bank" },
    url: `${SHARGE_BASE}/products/shargeek-170`,
  },
  {
    id: "sharge-icemag-3",
    name: "Sharge ICEMAG 3 MagSafe Kablosuz Powerbank",
    brand: "Sharge",
    group: "guc",
    spec: { tr: "MagSafe · Kablosuz Powerbank", en: "MagSafe · Wireless Power Bank" },
    price: "4.599,00 TL",
    image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/Group_690.png?v=1782913039",
    alt: { tr: "Sharge ICEMAG 3 MagSafe destekli kablosuz powerbank", en: "Sharge ICEMAG 3 MagSafe wireless power bank" },
    url: `${SHARGE_BASE}/products/sharge-icemag3-powerbank`,
  },
  {
    id: "sharge-retractable-165w",
    name: "Sharge Retractable 165W Kablolu Powerbank",
    brand: "Sharge",
    group: "guc",
    spec: { tr: "165W · Geri Çekilebilir Kablolu", en: "165W · Retractable Cabled" },
    price: "5.039,20 TL",
    image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/Group_603.png?v=1773737456",
    alt: { tr: "Sharge Retractable 165W geri çekilebilir kablolu powerbank", en: "Sharge Retractable 165W retractable cabled power bank" },
    url: `${SHARGE_BASE}/products/retractable-165w-geri-cekilebilir-kablolu-powerbank`,
  },
  {
    id: "sharge-pixel-adapter",
    name: "Sharge Pixel 100W / 140W GaN Şarj Cihazı",
    brand: "Sharge",
    group: "adaptor",
    spec: { tr: "140W · 3x USB-C GaN Adaptör", en: "140W · 3× USB-C GaN Adapter" },
    price: "3.279,20 TL",
    image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/Group_654.png?v=1777441897",
    alt: { tr: "Sharge Pixel 100W 140W PD 3.1 GaN hızlı şarj cihazı", en: "Sharge Pixel 100W 140W PD 3.1 GaN fast charger" },
    url: `${SHARGE_BASE}/products/pixel-100w-140w`,
  },
  {
    id: "sharge-disk-pro",
    name: "Sharge Disk Pro 5'i 1 Arada NVMe SSD",
    brand: "Sharge",
    group: "veri",
    spec: { tr: "10Gbps · 4TB'a kadar SSD", en: "10Gbps · up to 4TB SSD" },
    price: "24.999,00 TL",
    image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/3_f3f51e04-5a03-4a39-8e9a-9adb45f939eb.png?v=1783083915",
    alt: { tr: "Sharge Disk Pro aktif soğutmalı 5'i 1 arada NVMe SSD", en: "Sharge Disk Pro active-cooled 5-in-1 NVMe SSD" },
    url: `${SHARGE_BASE}/products/sharge-disk-pro-5i-1-arada-10-gbps-4tba-kadar-aktif-sogutma`,
  },
  {
    id: "sharge-flow-mini",
    name: "Sharge Flow Mini Kompakt Powerbank",
    brand: "Sharge",
    group: "guc",
    spec: { tr: "Kompakt · Hızlı Powerbank", en: "Compact · Fast Power Bank" },
    price: "2.303,20 TL",
    image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/Flow-Mini---Kompakt-ve-Hizli-Tasinabilir-Powerbank_kopyasi.png?v=1767247006",
    alt: { tr: "Sharge Flow Mini kompakt taşınabilir powerbank", en: "Sharge Flow Mini compact portable power bank" },
    url: `${SHARGE_BASE}/products/flow-mini-portable`,
  },
];

const SHARGE = {
  id: "sharge",
  name: "Sharge",
  group: "DRK Group",
  immersive: true,
  wordmark: "sharge",
  website: `${SHARGE_BASE}/`,
  kind: "brand",
  reachId: "sharge",
  colors: SHARGE_COLORS,
  branding: BRANDING.sharge,
  // Graphite + lime theme feeding the shared immersive site (.sw) variables.
  siteTheme: {
    "--sw-navy": "#262b31",
    "--sw-navy-d": "#191d22",
    "--sw-hero": "#2b3037",
    "--sw-orange": "#a9cf1f",
    "--sw-orange-d": "#6f9c1a",
    "--sw-on-accent": "#16220a",
    "--sw-ink": "#1b2018",
    "--sw-muted": "#6b7168",
  },
  copy: {
    tr: {
      status: "DRK PORTFÖYÜ",
      kicker: "DİJİTAL ÖN İZLEME",
      tagline: "Güçlü, Hızlı ve Güvenilir Şarj Çözümleri",
      short: "Yüksek güçlü GaN powerbank, hızlı şarj adaptörü ve taşınabilir veri çözümlerinde yeni nesil teknoloji.",
      cardHint: "Ön İzlemeyi Keşfet",
      openPreview: "Ön İzlemeyi Aç",
      closePreview: "Ön izlemeyi kapat",
      heroTitle: "Sharge dijital vitrini",
      heroText:
        "Şeffaf tasarımlı GaN powerbank'lerden hızlı şarj adaptörlerine ve taşınabilir SSD çözümlerine kadar Sharge ürün dünyasının DRK premium diliyle yeniden yorumlanmış ön izlemesi.",
      scrollHint: "Deneyime düğmeyle girin",
      featuredLabel: "ÖNE ÇIKAN ÜRÜN",
      productsLabel: "Öne Çıkan Ürünler",
      productsHint: "Sharge Türkiye kataloğundan seçili güç ve şarj ürünleri",
      inspect: "Ürünü İncele",
      addToCart: "Sepete Ekle",
      visitSite: "Sharge Türkiye Web Sitesine Git",
      goSite: "Siteye Git",
      exploreFull: "Sharge'ı Keşfet",
      newTabNote: "Bağlantılar Sharge Türkiye'de yeni sekmede açılır",
      priceNote: "Ürün ve fiyat bilgileri Sharge Türkiye'den alınmıştır.",
      announce: ["Yeni Nesil GaN Teknolojisi", "Aynı Gün Kargo", "2 Yıl Garanti", "Güvenli Ödeme"],
      searchPlaceholder: "Ürün, kategori veya marka ara",
      categoriesLabel: "Kategoriler",
      heroLead: "Gücü Yanında Taşı",
      heroSub: "Yüksek performanslı GaN powerbank, hızlı şarj adaptörleri ve taşınabilir veri çözümleri; şeffaf tasarım, gerçek güç.",
      heroCtaShop: "Alışverişe Başla",
      seeAll: "Tüm Ürünleri Gör",
      trust: [
        ["Yeni Nesil GaN", "Şeffaf yüksek güç"],
        ["Hızlı Teslimat", "Aynı gün kargo"],
        ["Güvenli Alışveriş", "2 yıl garanti"],
      ],
      footerTagline: "Güçlü, hızlı ve güvenilir yeni nesil şarj çözümleri.",
      footerColsTitle: ["Kurumsal", "Kategoriler", "Destek"],
      footerCorporate: ["Hakkımızda", "Lansman Özel", "Blog"],
      footerSupport: ["Yardım & Destek", "Teslimat & İade", "Sıkça Sorulan Sorular"],
      footerNote: "DRK Aksesuar tarafından hazırlanan premium ön izleme · Resmi site:",
      reelHint: "Diğer markaları görmek için yana kaydırın",
      soon: "Sharge Türkiye'ye git",
      soonText: "Bu markanın premium ön izleme deneyimi çok yakında burada olacak.",
      prev: "Önceki marka",
      next: "Sonraki marka",
    },
    en: {
      status: "DRK PORTFOLIO",
      kicker: "DIGITAL PREVIEW",
      tagline: "Powerful, fast and reliable charging solutions",
      short: "Next-generation technology across high-power GaN power banks, fast chargers and portable data solutions.",
      cardHint: "Explore the preview",
      openPreview: "Open preview",
      closePreview: "Close preview",
      heroTitle: "The Sharge digital showroom",
      heroText:
        "A preview of Sharge's product world — from transparent GaN power banks and fast chargers to portable SSD solutions — reinterpreted in the DRK premium design language.",
      scrollHint: "Use the button to enter the experience",
      featuredLabel: "FEATURED PRODUCT",
      productsLabel: "Featured Products",
      productsHint: "Selected power and charging products from the Sharge Türkiye catalogue",
      inspect: "View product",
      addToCart: "Add to cart",
      visitSite: "Go to the Sharge Türkiye website",
      goSite: "Visit site",
      exploreFull: "Explore Sharge",
      newTabNote: "Links open on Sharge Türkiye in a new tab",
      priceNote: "Product and price information is sourced from Sharge Türkiye.",
      announce: ["Next-Gen GaN Technology", "Same-Day Dispatch", "2-Year Warranty", "Secure Payment"],
      searchPlaceholder: "Search products, categories or brands",
      categoriesLabel: "Categories",
      heroLead: "Carry real power",
      heroSub: "High-performance GaN power banks, fast chargers and portable data solutions — transparent design, real power.",
      heroCtaShop: "Start shopping",
      seeAll: "See all products",
      trust: [
        ["Next-Gen GaN", "Transparent high power"],
        ["Fast Delivery", "Same-day dispatch"],
        ["Secure Shopping", "2-year warranty"],
      ],
      footerTagline: "Powerful, fast and reliable next-generation charging solutions.",
      footerColsTitle: ["Company", "Categories", "Support"],
      footerCorporate: ["About us", "Launch Specials", "Blog"],
      footerSupport: ["Help & Support", "Delivery & Returns", "FAQ"],
      footerNote: "A premium preview crafted by DRK Aksesuar · Official site:",
      reelHint: "Swipe sideways to see other brands",
      soon: "Visit Sharge Türkiye",
      soonText: "The premium preview experience for this brand is coming here very soon.",
      prev: "Previous brand",
      next: "Next brand",
    },
  },
  siteCategories: [
    { id: "lansman", icon: "power", label: { tr: "Lansman Özel", en: "Launch Specials" }, url: `${SHARGE_BASE}/collections/lansman-ozel` },
    { id: "powerbank", icon: "battery", label: { tr: "Powerbank", en: "Power Banks" }, url: `${SHARGE_BASE}/collections/powerbank` },
    { id: "adaptor", icon: "plug", label: { tr: "Adaptör", en: "Adapters" }, url: `${SHARGE_BASE}/collections/guc-adaptoru` },
    { id: "ssd", icon: "memory", label: { tr: "SSD Disk", en: "SSD Drives" }, url: `${SHARGE_BASE}/collections/ssd-disk` },
    { id: "kablo", icon: "accessory", label: { tr: "Kablolar", en: "Cables" }, url: `${SHARGE_BASE}/collections/sarj-kablolari` },
    { id: "aksesuar", icon: "case", label: { tr: "Aksesuar", en: "Accessories" }, url: `${SHARGE_BASE}/collections/aksesuar` },
  ],
  heroBanners: [
    { image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/170W---Yuksek-Guclu-ve-Seffaf-Tasarimli-GaN-Powerbank_kopyasi.png?v=1767246939", alt: { tr: "Sharge 170W GaN powerbank", en: "Sharge 170W GaN power bank" } },
    { image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/Group_690.png?v=1782913039", alt: { tr: "Sharge ICEMAG 3 MagSafe powerbank", en: "Sharge ICEMAG 3 MagSafe power bank" } },
    { image: "https://cdn.shopify.com/s/files/1/0920/1932/7049/files/3_f3f51e04-5a03-4a39-8e9a-9adb45f939eb.png?v=1783083915", alt: { tr: "Sharge Disk Pro taşınabilir SSD", en: "Sharge Disk Pro portable SSD" } },
  ],
  categories: [
    { id: "all", label: { tr: "Tümü", en: "All" } },
    { id: "guc", label: { tr: "Powerbank", en: "Power" } },
    { id: "adaptor", label: { tr: "Adaptör", en: "Adapters" } },
    { id: "veri", label: { tr: "Veri", en: "Data" } },
  ],
  featured: "sharge-170w",
  products: SHARGE_PRODUCTS,
};

SPEEDWA.kind = "group";
SPEEDWA.reachId = "dealers";

function ecosystemEntry({ id, name, wordmark = "text", website = DORUK_GROUP_URL, tr, en, kind = "group", reachId = "drk", branding = BRANDING.doruk }) {
  return {
    id,
    name,
    group: kind === "brand" ? "DRK Portfolio" : "Doruk Grup",
    immersive: false,
    wordmark,
    website,
    kind,
    reachId,
    branding,
    copy: {
      tr: {
        status: kind === "brand" ? "DRK PORTFÖYÜ" : "DORUK GRUP EKOSİSTEMİ",
        short: tr,
        soon: website === DORUK_GROUP_URL ? "Doruk Grup'ta incele" : "Resmi siteye git",
      },
      en: {
        status: kind === "brand" ? "DRK PORTFOLIO" : "DORUK GROUP ECOSYSTEM",
        short: en,
        soon: website === DORUK_GROUP_URL ? "View on Doruk Group" : "Visit official site",
      },
    },
  };
}

const AYANEO = ecosystemEntry({
  id: "ayaneo",
  name: "AYANEO",
  kind: "brand",
  branding: BRANDING.ayaneo,
  tr: "Yeni nesil taşınabilir oyun bilgisayarları ve oyun teknolojileri.",
  en: "Next-generation handheld gaming computers and gaming technology.",
});

const INSE = ecosystemEntry({
  id: "inse",
  name: "INSE",
  kind: "brand",
  branding: BRANDING.inse,
  tr: "Akıllı ev ve tüketici elektroniği kategorilerinde yenilikçi ürünler.",
  en: "Innovative products across smart-home and consumer-electronics categories.",
});

const TURKCELL = ecosystemEntry({
  id: "turkcell",
  name: "Turkcell",
  kind: "brand",
  website: "https://www.turkcell.com.tr/",
  branding: BRANDING.turkcell,
  tr: "Doruk Grup mağazacılık ve kurumsal iletişim ekosistemindeki uzun soluklu iş ortaklığı.",
  en: "A long-standing partner across Doruk Group's retail and corporate communications ecosystem.",
});

const ROBOROCK = ecosystemEntry({
  id: "roborock",
  name: "Roborock",
  kind: "brand",
  website: "https://tr.roborock.com/",
  branding: BRANDING.roborock,
  tr: "Akıllı ev elektroniği kategorisinde teknik servis ve satış sonrası deneyimi.",
  en: "Technical-service and after-sales experience in the smart-home electronics category.",
});

const XIAOMI = ecosystemEntry({
  id: "xiaomi",
  name: "Xiaomi",
  kind: "brand",
  website: "https://www.mi.com/tr/",
  branding: BRANDING.xiaomi,
  tr: "Akıllı telefon, giyilebilir teknoloji ve bağlantılı yaşam ürünlerinde güçlü kategori markası.",
  en: "A strong category brand across smartphones, wearables and connected-living products.",
});

// Brand-specific profile content shown on the 3D immersive brand panels.
// Each brand tells its own real story (facts + narrative) instead of the
// generic placeholder that every panel used to share.
SAMSUNG.profile = {
  tr: {
    facts: ["Samsung pazaryeri operasyonu", "shop.samsung.com · 2017–2025", "Samsung Otel TV · 2025–günümüz"],
    story: "Samsung Türkiye için üç ayrı ticari operasyon dönemi ve kanal uzmanlığı.",
    note: "DRK Aksesuar; pazaryeri satış operasyonlarını yürütür, 2017–2025 döneminde shop.samsung.com Türkiye satış operasyonu ile Eskisini Getir Yenisini Götür gibi kampanyaları yönetmiş, 2025'ten bu yana Samsung Otel TV işini üstlenmiştir.",
  },
  en: {
    facts: ["Samsung marketplace operations", "shop.samsung.com · 2017–2025", "Samsung Hotel TV · 2025–present"],
    story: "Three distinct commercial operations and deep channel expertise for Samsung Türkiye.",
    note: "DRK Aksesuar runs marketplace sales, managed shop.samsung.com Türkiye sales and campaigns such as trade-in programmes from 2017 to 2025, and has led the Samsung Hotel TV business since 2025.",
  },
};

// Turkish marketplaces DRK operates for Samsung — shown as favicon chips inside
// the Samsung 3D panel instead of product cards.
SAMSUNG.marketplaces = [
  { name: "Trendyol", domain: "trendyol.com" },
  { name: "Hepsiburada", domain: "hepsiburada.com" },
  { name: "Amazon Türkiye", domain: "amazon.com.tr" },
  { name: "n11", domain: "n11.com" },
  { name: "Çiçeksepeti", domain: "ciceksepeti.com" },
  { name: "PttAVM", domain: "pttavm.com" },
  { name: "Pazarama", domain: "pazarama.com" },
];

SHARGE.profile = {
  tr: {
    facts: ["Şarj & powerbank teknolojileri", "Pazaryeri ve perakende kanalı", "Satış sonrası destek"],
    story: "Sharge'ın yeni nesil şarj teknolojilerini Türkiye pazarında büyütüyoruz.",
    note: "Sharge Türkiye kanalında ürün lansmanı, satış ve müşteri deneyimi DRK Aksesuar operasyonuyla yürütülüyor.",
  },
  en: {
    facts: ["Charging & power-bank tech", "Marketplace & retail channel", "After-sales support"],
    story: "We grow Sharge's next-generation charging technology across Türkiye.",
    note: "Product launches, sales and customer experience on the Sharge Türkiye channel are managed by DRK Aksesuar.",
  },
};

AYANEO.profile = {
  tr: {
    facts: ["Taşınabilir oyun bilgisayarları", "Ürün & kanal yönetimi", "Teknik destek"],
    story: "AYANEO'nun taşınabilir oyun sistemlerini Türkiye'de erişilebilir kılıyoruz.",
    note: "AYANEO cihazlarının Türkiye'ye getirilmesi, satışı ve teknik desteği DRK Aksesuar operasyonuyla sağlanıyor.",
  },
  en: {
    facts: ["Handheld gaming PCs", "Product & channel management", "Technical support"],
    story: "We make AYANEO's handheld gaming systems accessible in Türkiye.",
    note: "Bringing AYANEO devices to Türkiye, their sales and technical support are handled by DRK Aksesuar operations.",
  },
};

INSE.profile = {
  tr: {
    facts: ["Akıllı ev & temizlik ürünleri", "Satış kanalı yönetimi", "Satış sonrası"],
    story: "INSE akıllı ev ve temizlik ürünlerini Türkiye pazarına sunuyoruz.",
    note: "INSE ürün gamının Türkiye satış kanallarında konumlandırılması ve satış sonrası süreçleri DRK Aksesuar tarafından yürütülüyor.",
  },
  en: {
    facts: ["Smart-home & cleaning products", "Sales channel management", "After-sales"],
    story: "We bring INSE's smart-home and cleaning products to the Türkiye market.",
    note: "Positioning the INSE range across Türkiye sales channels and after-sales processes are run by DRK Aksesuar.",
  },
};

TURKCELL.profile = {
  tr: {
    facts: ["Mağazacılık iş birliği", "Kurumsal iletişim", "Uzun soluklu iş ortaklığı"],
    story: "Doruk Grup ekosisteminde Turkcell ile uzun soluklu mağazacılık iş birliği.",
    note: "Turkcell perakende ve kurumsal iletişim ekosisteminde Doruk Grup uzun yıllara dayanan bir iş ortağıdır.",
  },
  en: {
    facts: ["Retail partnership", "Corporate communications", "Long-standing collaboration"],
    story: "A long-standing retail partnership with Turkcell within the Doruk Group ecosystem.",
    note: "Doruk Group is a long-term partner across Turkcell's retail and corporate-communications ecosystem.",
  },
};

ROBOROCK.profile = {
  tr: {
    facts: ["Akıllı ev robotları", "Yetkili teknik servis", "Satış sonrası deneyim"],
    story: "Roborock akıllı ev robotlarında teknik servis ve satış sonrası deneyimi sağlıyoruz.",
    note: "Roborock ürünlerinde yetkili teknik servis ve satış sonrası müşteri deneyimi grup operasyonuyla sunuluyor.",
  },
  en: {
    facts: ["Smart-home robots", "Authorised technical service", "After-sales experience"],
    story: "We provide technical service and after-sales experience for Roborock smart-home robots.",
    note: "Authorised technical service and after-sales customer experience for Roborock products are delivered through group operations.",
  },
};

XIAOMI.profile = {
  tr: {
    facts: ["Akıllı telefon ekosistemi", "Giyilebilir teknoloji", "Bağlantılı yaşam ürünleri"],
    story: "Xiaomi'nin geniş teknoloji ekosistemi marka ortaklıkları alanımızda yer alıyor.",
    note: "Akıllı telefon, aksesuar ve bağlantılı ürün kategorileri için Türkiye kanal dinamiklerine uygun ticari modeller geliştiriyoruz.",
  },
  en: {
    facts: ["Smartphone ecosystem", "Wearable technology", "Connected-living products"],
    story: "Xiaomi's broad technology ecosystem sits within our brand-partnership landscape.",
    note: "We build commercial models suited to Türkiye's channel dynamics across smartphones, accessories and connected products.",
  },
};

const GROUP_COMPANIES = [
  ecosystemEntry({
    id: "doruk-iletisim",
    name: "Doruk İletişim",
    branding: BRANDING.doruk,
    tr: "1999'dan bu yana telekomünikasyon perakendesi ve mağaza operasyonları.",
    en: "Telecommunications retail and store operations since 1999.",
  }),
  ecosystemEntry({
    id: "doruk-kurumsal",
    name: "Doruk Kurumsal Çözüm",
    branding: BRANDING.dorukCorporate,
    tr: "Kurumsal iletişim çözümleri ve saha satış operasyonları.",
    en: "Corporate communications solutions and field-sales operations.",
  }),
  ecosystemEntry({
    id: "doruk-telekom",
    name: "Doruk Telekom",
    branding: BRANDING.dorukTelekom,
    tr: "Trakya bölgesinde telekomünikasyon mağazacılığı ve perakende deneyimi.",
    en: "Telecommunications retail and store experience across the Thrace region.",
  }),
  ecosystemEntry({
    id: "speed-global",
    name: "Speed Global Lojistik",
    branding: BRANDING.speedGlobal,
    tr: "Mobil ürün ve aksesuar kategorilerinde dağıtım, lojistik ve kanal operasyonu.",
    en: "Distribution, logistics and channel operations for mobile products and accessories.",
  }),
  ecosystemEntry({
    id: "drk-aksesuar",
    name: "DRK Aksesuar",
    wordmark: "drk",
    branding: BRANDING.drk,
    tr: "Global teknoloji markaları için Türkiye online satış ve marka işletimi.",
    en: "Türkiye online sales and brand operations for global technology brands.",
  }),
  ecosystemEntry({
    id: "drk-elektronik",
    name: "DRK Elektronik",
    branding: BRANDING.electronics,
    tr: "Tüketici elektroniğinde B2B, pazaryeri ve zincir mağaza kanal yönetimi.",
    en: "B2B, marketplace and chain-retail channel management in consumer electronics.",
  }),
  ecosystemEntry({
    id: "peak-filo",
    name: "Peak Filo",
    branding: BRANDING.fleet,
    tr: "Kurumsal ve grup şirketlerine yönelik filo kiralama hizmetleri.",
    en: "Fleet-rental services for group companies and corporate customers.",
  }),
  ecosystemEntry({
    id: "summit-teknik",
    name: "Summit Teknik Servis",
    branding: BRANDING.service,
    tr: "Mobil cihaz ve ev elektroniği kategorilerinde yetkili teknik servis operasyonu.",
    en: "Authorised technical-service operations for mobile and home-electronics products.",
  }),
  ecosystemEntry({
    id: "ht-telekom",
    name: "HT Telekom",
    branding: BRANDING.ht,
    tr: "Telekomünikasyon ürünlerinde perakende satış ve mağaza operasyonu.",
    en: "Retail sales and store operations for telecommunications products.",
  }),
  ecosystemEntry({
    id: "netbasit",
    name: "NETBASİT",
    branding: BRANDING.netbasit,
    tr: "Doruk Grup teknoloji ve iletişim ekosisteminin dijital çözüm markası.",
    en: "A digital-solutions brand within the Doruk Group technology ecosystem.",
  }),
  ecosystemEntry({
    id: "drk-restoran",
    name: "DRK Restoran",
    branding: BRANDING.restaurant,
    tr: "Doruk Grup'un restoran ve yiyecek-içecek hizmetleri şirketi.",
    en: "Doruk Group's restaurant and food-and-beverage services company.",
  }),
];

export const PORTFOLIO_COMPANIES = [
  SAMSUNG,
  SHARGE,
  AYANEO,
  INSE,
  TURKCELL,
  ROBOROCK,
  XIAOMI,
  SPEEDWA,
  ...GROUP_COMPANIES,
];

export const REACH_PROFILES = [
  {
    id: "drk",
    name: "DRK Aksesuar",
    mode: "national",
    accent: "#252a52",
    copy: {
      tr: {
        eyebrow: "DRK AKSESUAR · TÜRKİYE OPERASYONU",
        title: "Türkiye pazarında uçtan uca ticari işletim.",
        text: "Siparişten teslimata, satış kanalından raporlamaya kadar marka operasyonunu tek merkezde yönetiyoruz.",
        mapLabel: "TÜRKİYE GENELİNDE OPERASYON",
        note: "DRK Aksesuar için yapılandırılmış şirket içi operasyon göstergeleri.",
      },
      en: {
        eyebrow: "DRK AKSESUAR · TÜRKİYE OPERATIONS",
        title: "End-to-end commercial operations across Türkiye.",
        text: "We manage brand operations from order to delivery and from sales channels to reporting in one system.",
        mapLabel: "NATIONWIDE TÜRKİYE OPERATIONS",
        note: "Configured internal operating indicators for DRK Aksesuar.",
      },
    },
    metrics: [
      { n: 500000000, suffix: " ₺+", label: { tr: "Yıllık yönetilen ciro", en: "Annual managed revenue" } },
      { n: 50000, suffix: "+", label: { tr: "Yıllık sipariş hacmi", en: "Annual order volume" } },
      { n: 81, suffix: "", label: { tr: "İlde erişim ve teslimat", en: "Provinces reached" } },
      { n: 8, suffix: "+", label: { tr: "Aktif satış kanalı", en: "Active sales channels" } },
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "/portfolio/samsung-logo-black.svg",
    mode: "national",
    accent: "#2563eb",
    copy: {
      tr: {
        eyebrow: "SAMSUNG · TÜRKİYE OPERASYONLARI",
        title: "Samsung Türkiye için çok kanallı operasyon gücü.",
        textBeforeLink: "2017 yılından bugüne Samsung Türkiye adına Marketplace, ",
        textLink: { label: "ShopSamsung.com", url: "https://shop.samsung.com/tr/" },
        textAfterLink: ", Omnichannel, Kampanya Yönetimi ve Otel TV operasyonlarını başarıyla sürdürüyoruz.",
        mapLabel: "SAMSUNG TÜRKİYE OPERASYON AĞI",
        note: "Samsung Türkiye Marketplace operasyonu 2017'den bugüne; Otel TV operasyonu ise 2025'ten bugüne DRK Aksesuar tarafından sürdürülmektedir.",
      },
      en: {
        eyebrow: "SAMSUNG · TÜRKİYE OPERATIONS",
        title: "Multi-channel operating strength for Samsung Türkiye.",
        textBeforeLink: "Since 2017, we have successfully operated Marketplace, ",
        textLink: { label: "ShopSamsung.com", url: "https://shop.samsung.com/tr/" },
        textAfterLink: ", Omnichannel, Campaign Management and Hotel TV operations on behalf of Samsung Türkiye.",
        mapLabel: "SAMSUNG TÜRKİYE OPERATIONS NETWORK",
        note: "DRK Aksesuar has operated Samsung Türkiye Marketplace since 2017 and Hotel TV operations since 2025.",
      },
    },
    metrics: [
      { n: 2017, suffix: "–2025", animate: false, useGrouping: false, label: { tr: "Samsung Shop operasyonu", en: "Samsung Shop operations" } },
      { n: 2025, suffix: { tr: "'ten bugüne", en: "–present" }, animate: false, useGrouping: false, label: { tr: "Otel TV operasyonu", en: "Hotel TV operations" } },
      { n: 2017, suffix: { tr: "'den bugüne", en: "–present" }, animate: false, useGrouping: false, label: { tr: "Marketplace operasyonu", en: "Marketplace operations" } },
      { n: 360, suffix: "°", label: { tr: "Kanal operasyonu", en: "Channel operations" } },
    ],
  },
  {
    id: "sharge",
    name: "Sharge",
    logo: "/portfolio/sharge-logo.avif",
    mode: "shenzhen",
    accent: "#f19a24",
    copy: {
      tr: {
        eyebrow: "SHARGE · ÇİN'DEN TÜRKİYE'YE",
        title: "Shenzhen inovasyonunu Türkiye pazarına taşıyoruz.",
        text: "Ürün, kanal, içerik ve satış operasyonunu Sharge'ın global marka standardıyla yerel tüketici arasında bağlıyoruz.",
        mapLabel: "SHENZHEN → TÜRKİYE TİCARİ AKIŞI",
        note: "Şematik akış ölçekli değildir. Metrikler bu sayfa için sağlanan Sharge operasyon verileridir.",
      },
      en: {
        eyebrow: "SHARGE · CHINA TO TÜRKİYE",
        title: "Bringing Shenzhen innovation to the Türkiye market.",
        text: "We connect product, channel, content and sales operations between Sharge's global standards and local consumers.",
        mapLabel: "SHENZHEN → TÜRKİYE COMMERCIAL FLOW",
        note: "The schematic route is not to scale. Metrics are Sharge operating figures supplied for this page.",
      },
    },
    metrics: [
      { n: 10000000, suffix: " ₺+", label: { tr: "Yönetilen ticari hacim", en: "Managed commercial volume" } },
      { n: 2000, suffix: "+", label: { tr: "Yönetilen sipariş", en: "Orders managed" } },
      { n: 7, suffix: "", label: { tr: "Aktif pazaryeri", en: "Active marketplaces" } },
      { n: 5, suffix: "", label: { tr: "Özel yazılım projesi", en: "Custom software projects" } },
    ],
  },
  {
    id: "dealers",
    name: "Bayi Ağımız",
    label: { tr: "Bayi Ağımız", en: "Dealer Network" },
    mode: "dealers",
    accent: "#08ad00",
    copy: {
      tr: {
        eyebrow: "DRK · TÜRKİYE BAYİ AĞI",
        title: "Bayi gücümüz Türkiye'nin dört bir yanında.",
        text: "Markanızı 81 ile uzanan geniş bayi ve satış noktası ağımızla buluşturuyoruz; ürünü doğru şehirde, doğru noktada konumlandırıp satıştan lojistiğe kadar uçtan uca yönetiyoruz.",
        mapLabel: "TÜRKİYE GENELİNDE BAYİ AĞI",
        note: "Harita, bayi ve satış noktası yoğunluğunu temsili olarak gösterir.",
      },
      en: {
        eyebrow: "DRK · TÜRKİYE DEALER NETWORK",
        title: "Our dealer strength reaches every corner of Türkiye.",
        text: "We place your brand into a nationwide network of dealers and sales points across all 81 provinces — positioning the product in the right city and the right shelf, and running it end to end from sales to logistics.",
        mapLabel: "DEALER NETWORK ACROSS TÜRKİYE",
        note: "The map illustrates dealer and sales-point density across the country.",
      },
    },
    metrics: [
      { n: 81, suffix: "", label: { tr: "İl'de bayi erişimi", en: "Provinces reached" } },
      { n: 500, suffix: "+", label: { tr: "Bayi & satış noktası", en: "Dealers & sales points" } },
      { n: 7, suffix: "", label: { tr: "Bölge dağıtım merkezi", en: "Regional distribution hubs" } },
      { n: 6, suffix: "+", label: { tr: "Kategori erişimi", en: "Category coverage" } },
    ],
  },
];

// City anchors in the Türkiye map viewBox space ("-30 255 1085 505").
// Every coordinate is verified to sit inside the silhouette with enough margin
// that the scattered dealer ring around it also stays on land.
const DEALER_CITY_BASES = [
  ["İstanbul", 214, 404], ["Kocaeli", 252, 420], ["Tekirdağ", 172, 432], ["Edirne", 128, 424],
  ["Balıkesir", 214, 492], ["Bursa", 262, 468], ["Çanakkale", 150, 470], ["İzmir", 165, 548],
  ["Manisa", 208, 528], ["Aydın", 228, 572], ["Denizli", 270, 560], ["Muğla", 250, 612],
  ["Antalya", 372, 624], ["Isparta", 352, 585], ["Ankara", 428, 468], ["Eskişehir", 352, 488],
  ["Afyon", 320, 538], ["Konya", 448, 582], ["Kayseri", 520, 520], ["Nevşehir", 495, 540],
  ["Samsun", 560, 392], ["Çorum", 512, 452], ["Ordu", 632, 420], ["Trabzon", 720, 436],
  ["Sivas", 596, 478], ["Malatya", 664, 528], ["Adana", 556, 604], ["Mersin", 496, 606],
  ["Hatay", 592, 650], ["Gaziantep", 648, 582], ["Şanlıurfa", 700, 582], ["Diyarbakır", 730, 540],
  ["Mardin", 784, 584], ["Elazığ", 700, 502], ["Erzincan", 702, 470], ["Erzurum", 806, 462],
  ["Ağrı", 878, 472], ["Van", 892, 522], ["Kars", 872, 418],
];

export const DEALER_POINT_COUNT = 130;

// ~130 clean demo points scattered in a tight golden-angle ring around each city
// anchor. The ring radius stays small (max ~15 x / ~9 y) so every point lands on
// the Türkiye silhouette; the 0.6 y-squash matches the map's aspect ratio.
export const SPEEDWA_DEALERS = Array.from({ length: DEALER_POINT_COUNT }, (_, index) => {
  const [city, baseX, baseY] = DEALER_CITY_BASES[index % DEALER_CITY_BASES.length];
  const ring = 4 + ((index * 11) % 12);
  const angle = index * 2.3999632297;
  return {
    id: `demo-dealer-${String(index + 1).padStart(3, "0")}`,
    name: `DRK ${city} Bayi Noktası ${String(index + 1).padStart(3, "0")}`,
    city,
    x: Math.round((baseX + Math.cos(angle) * ring) * 10) / 10,
    y: Math.round((baseY + Math.sin(angle) * ring * 0.6) * 10) / 10,
  };
});

// Helper: resolve a company's featured product object.
export function getFeaturedProduct(company) {
  if (!company?.products) return null;
  return (
    company.products.find((product) => product.id === company.featured) ||
    company.products[0]
  );
}
