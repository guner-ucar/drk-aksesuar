import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Boxes,
  Check,
  ChevronDown,
  CircleDot,
  Compass,
  Database,
  Globe2,
  Handshake,
  Languages,
  Layers3,
  MapPin,
  Menu,
  PackageCheck,
  Palette,
  Rocket,
  Search,
  ShoppingBag,
  BatteryCharging,
  Cable,
  ChevronLeft,
  ChevronRight,
  HardDrive,
  Plug,
  Heart,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Truck,
  TrendingUp,
  Volume2,
  Watch,
  X,
  Zap,
} from "lucide-react";
import {
  PORTFOLIO_COMPANIES,
  REACH_PROFILES,
  SPEEDWA_DEALERS,
  getFeaturedProduct,
} from "./portfolioData";
import TurkeyMap from "./TurkeyMap";
import CHINA_MAP from "@svg-maps/china";

const BRAND_NAME = "DRK Aksesuar";
const LOGO_PATH = "/brand/drk-aksesuar-logo.png";
const CONTACT_EMAIL = "info@drkisortagim.com";
const CONTACT_ADDRESS = "Sinpaş Flatofis, Defterdar, Otakçılar Cd. No:78, 34055 Eyüpsultan/İstanbul";
const CONTACT_ADDRESS_SHORT = "Sinpaş Flatofis · Eyüpsultan / İstanbul";
const PORTFOLIO_BY_NAME = new Map(PORTFOLIO_COMPANIES.map((company) => [company.name, company]));
const GROUP_PORTFOLIO_COMPANIES = PORTFOLIO_COMPANIES.filter((company) => company.kind === "group");
const BRAND_PORTFOLIO_COMPANIES = PORTFOLIO_COMPANIES.filter((company) => company.kind === "brand");
const FLAGSHIP_OPERATION_ICONS = [ShoppingBag, Globe2, Store, Zap];

const SERVICE_DEFS = [
  {
    slug: "marka-temsili-strateji",
    icon: Palette,
    graphIcon: "palette",
    number: "01",
    tone: "green",
    color: "#08ad00",
    soft: "#e4f6e2",
    rgb: "8, 173, 0",
  },
  {
    slug: "pazar-girisi-distributorluk",
    icon: Handshake,
    graphIcon: "boxes",
    number: "02",
    tone: "yellow",
    color: "#d9aa18",
    soft: "#fff2bf",
    rgb: "217, 170, 24",
  },
  {
    slug: "e-ticaret-turkiye-pazaryerleri",
    icon: ShoppingBag,
    graphIcon: "shopping",
    number: "03",
    tone: "blue",
    color: "#6c92ef",
    soft: "#e2edff",
    rgb: "108, 146, 239",
  },
  {
    slug: "perakende-kanal-operasyonu",
    icon: Store,
    graphIcon: "store",
    number: "04",
    tone: "peach",
    color: "#ec8f72",
    soft: "#fde7dd",
    rgb: "236, 143, 114",
  },
  {
    slug: "pazarlama-lansman-icerik",
    icon: Target,
    graphIcon: "target",
    number: "05",
    tone: "lilac",
    color: "#8a70df",
    soft: "#eee9ff",
    rgb: "138, 112, 223",
  },
  {
    slug: "veri-crm-otomasyon",
    icon: Bot,
    graphIcon: "chart",
    number: "06",
    tone: "pink",
    color: "#d986b9",
    soft: "#f6e2f0",
    rgb: "217, 134, 185",
  },
];

const COPY = {
  tr: {
    languageName: "Türkçe",
    nav: {
      services: "Hizmetler",
      solutions: "Çözümler",
      approach: "Yaklaşım",
      about: "Hakkımızda",
      contact: "Markanı konuşalım",
    },
    common: {
      detail: "Detay sayfası",
      exploreServices: "Hizmetleri keşfedin",
      talk: "Markanı konuşalım",
      backServices: "Hizmet mimarisine dön",
      scope: "Kapsamı gör",
      related: "Bağlı hizmetler",
      allServices: "Tüm hizmetleri incele",
      start: "Büyüme planını çıkaralım",
      discover: "Keşfet",
      contact: "İletişim",
      projectForm: "Marka formu",
      location: CONTACT_ADDRESS,
      rights: "© 2026 DRK Aksesuar. Tüm hakları saklıdır.",
      footerLine: "Global markalar için yerel operasyon; güçlü markalar için uçtan uca büyüme.",
      outcome: "Sonuç odağı",
      workingSystem: "Çalışma sistemi",
    },
    hero: {
      titleTop: "Markaları pazarda",
      titleAccent: "güçlü hale getiririz.",
      text: "DRK Aksesuar; global teknoloji ve aksesuar markalarının Türkiye operasyonunu üstlenen, aynı zamanda Türkiye’den gelen seçili marka ve ticari büyüme taleplerine uçtan uca çözüm üreten yeni nesil distribütörlük ve marka işletim ortağıdır.",
      primary: "İhtiyacınızı birlikte analiz edelim",
      secondary: "Yetkinlikleri keşfedin",
      trustBrand: "SAMSUNG",
      trustText: "Pazaryeri, resmi online mağaza ve Otel TV operasyonlarında uzun soluklu deneyim",
    },
    analyzer: {
      eyebrow: "BÜYÜME İHTİYACI RADARI",
      title: "Markanızın hangi sisteme ihtiyacı olduğunu birlikte bulalım.",
      text: "Mevcut durumunuzu seçin; doğru temsil, kanal ve büyüme modelini saniyeler içinde görün.",
      recommended: "ÖNERİLEN BAŞLANGIÇ",
      options: [
        {
          label: "Global markam için yerel operasyon arıyorum",
          title: "Pazar girişi ve distribütörlük planı",
          text: "Kategori talebini, rekabeti, fiyat pozisyonunu ve kanal fırsatlarını analiz edip uygulanabilir yerel operasyon modelini oluştururuz.",
          tags: ["Pazar analizi", "Konumlandırma", "Kanal planı"],
          path: "/hizmetler/pazar-girisi-distributorluk",
          action: "Giriş modelini incele",
        },
        {
          label: "Markam satışta, daha hızlı büyümek istiyorum",
          title: "Kanal ve satış operasyonu",
          text: "Pazaryeri, perakende, stok, fiyat, kampanya ve saha operasyonunu tek ticari ritimde birleştiririz.",
          tags: ["Pazaryeri", "Perakende", "Satış operasyonu"],
          path: "/hizmetler/perakende-kanal-operasyonu",
          action: "Kanal yapısını incele",
        },
        {
          label: "Türkiye merkezli markam için güçlü bir ekip arıyorum",
          title: "Uçtan uca marka ve büyüme yönetimi",
          text: "Marka dili, lansman, içerik, medya, CRM ve raporlamayı tek büyüme ekibi olarak yürütürüz.",
          tags: ["Marka temsili", "Lansman", "Büyüme"],
          path: "/iletisim",
          action: "İş modelini konuşalım",
        },
      ],
    },
    network: {
      live: "CANLI HARİTA",
      title: "DRK yetenek ağı",
      hint: "BAĞLANTILI YETKİNLİKLER · ÜZERİNE GEL VE KEŞFET",
      center: "GROWTH NETWORK",
    },
    ecosystem: {
      label: "TEK EKİP. UÇTAN UCA MARKA, KANAL VE BÜYÜME OPERASYONU.",
      items: ["MARKA TEMSİLİ", "DİSTRİBÜTÖRLÜK", "E-TİCARET", "PERAKENDE", "PAZARLAMA", "CRM"],
    },
    flagship: {
      eyebrow: "AMİRAL OPERASYONLAR",
      title: "Türkiye'de markayı yalnızca satmıyor, uçtan uca işletiyoruz.",
      text: "Samsung Türkiye ile farklı dönem ve kanallarda geliştirdiğimiz operasyon kasını, Sharge'ın omnichannel büyüme modelinde geleceğe taşıyoruz.",
      items: [
        {
          id: "samsung-marketplace",
          brand: "Samsung",
          title: "Samsung Pazaryeri Operasyonu",
          period: "DEVAM EDİYOR",
          channel: "Marketplace · 360° operasyon",
          text: "Ürün listeleme, fiyat, stok, kampanya, sipariş, lojistik, iade ve satış sonrası süreçlerini Türkiye'nin önde gelen pazaryerlerinde yönetiyoruz.",
          tags: ["7+ pazaryeri", "Satış & operasyon", "Raporlama"],
        },
        {
          id: "samsung-shop",
          brand: "Samsung",
          title: "Samsung Resmi Online Mağaza",
          period: "2017–2025",
          channel: "shop.samsung.com/tr · D2C",
          text: "Samsung Türkiye resmi online mağazasının satış operasyonlarını; katalogdan siparişe, kampanyadan müşteri deneyimine kadar yönettik.",
          tags: ["Resmi online mağaza", "D2C satış", "Uçtan uca işletim"],
        },
        {
          id: "samsung-hotel-tv",
          brand: "Samsung",
          title: "Samsung Otel TV Operasyonu",
          period: "2025–GÜNÜMÜZ",
          channel: "Otel TV · B2B",
          text: "Samsung Otel TV ürünlerinin Türkiye'deki ticari operasyonunu; proje geliştirme, kurumsal satış ve kanal koordinasyonuyla üstleniyoruz.",
          tags: ["Otel TV", "B2B proje", "Kanal geliştirme"],
        },
        {
          id: "sharge-omnichannel",
          brand: "Sharge",
          title: "Sharge Türkiye Omnichannel",
          period: "BÜYÜYOR",
          channel: "Marka işletimi · Omnichannel",
          text: "Resmi e-ticaret, pazaryeri, perakende, içerik ve müşteri deneyimini tek marka işletim sistemi altında büyütüyoruz.",
          tags: ["Omnichannel", "Marka temsili", "Yerel büyüme"],
        },
      ],
      legacy: "2017–2025 döneminde Eskisini Getir Yenisini Götür gibi Samsung kampanyalarının satış ve operasyon akışlarını da yürüttük.",
    },
    reach: {
      eyebrow: "TÜRKİYE'DEKİ TİCARİ HACMİMİZ",
      title: "Türkiye pazarında güçlü ve ölçülebilir bir ticari hacim.",
      text: "Global markaları ülke genelindeki tüketiciyle buluşturuyor; siparişten teslimata, kanaldan ciroya kadar tüm operasyonu tek elden yönetiyoruz.",
      statLabels: ["Yıllık yönetilen ciro", "Yıllık sipariş hacmi", "İlde erişim ve teslimat", "Aktif satış kanalı"],
      mapLabel: "TÜRKİYE GENELİNDE OPERASYON",
      note: "Rakamlar DRK Aksesuar operasyonlarının güncel ticari hacmini yansıtır.",
    },
    portfolio: {
      eyebrow: "ŞİRKETLER & MARKALAR",
      title: "Güçlü şirket yapısı.\nSeçili marka ortaklıkları.",
      text: "Doruk Grup şirketlerinin operasyon gücünü, birlikte çalıştığımız teknoloji markalarının yerel büyüme hedefleriyle buluşturuyoruz.",
      samsung: "Mobil teknoloji ekosisteminde geniş kategori ve kanal gücü.",
      sharge: "Yeni nesil şarj teknolojilerinde tasarım ve inovasyon odağı.",
      status: "DRK PORTFÖYÜ",
      note: "Tüm marka ve şirketleri 3D portföyde gezebilir; doğrulanmış resmi siteye, bağımsız sitesi olmayanlarda Doruk Grup'a geçebilirsiniz.",
      filters: ["Tümü", "Markalar", "Doruk Grup şirketleri"],
      reachAction: "Ticari ağı göster",
      previewAction: "Tam ekran ön izleme",
      websiteAction: "Web sitesine git",
      companiesLabel: "DRK & DORUK GRUP ŞİRKETLERİ",
      companiesText: "Operasyonu taşıyan grup şirketleri",
      brandsLabel: "ÇALIŞTIĞIMIZ MARKALAR",
      brandsText: "Kategori ortaklıklarımız ve yönettiğimiz markalar",
    },
    servicesSection: {
      eyebrow: "DRK NE YAPAR?",
      title: "Distribütörlükten fazlası. Markalar için ticari işletim sistemi.",
      text: "Stratejiden ithalat ve kanala, lansmandan veriye kadar her katman aynı ticari hedefe bağlanır.",
    },
    marketplace: {
      eyebrow: "TÜRKİYE SATIŞ EKOSİSTEMİ",
      title: "Markanızı Türkiye’nin güçlü satış kanallarında açar ve işletiriz.",
      text: "Yurt dışı pazaryeri operasyonu yürütmüyoruz. Odağımız; global markaların Türkiye’de doğru katalog, fiyat, stok, kampanya ve kanal yönetimiyle büyümesi.",
      focusOneLabel: "PAZARYERLERİ",
      focusOneTitle: "Trendyol, Hepsiburada, Amazon Türkiye, n11, Çiçeksepeti, PttAVM, Pazarama ve daha fazlası",
      focusOneText: "Mağaza açılışından katalog kalitesine, reklamdan kampanyaya kadar günlük pazaryeri operasyonunu yönetiriz.",
      focusTwoLabel: "TEKNOLOJİ PERAKENDESİ",
      focusTwoTitle: "Teknosa, MediaMarkt, Vatan Bilgisayar, İncehesap ve İtopya",
      focusTwoText: "Kategori sunumu, ürün listesi, fiyat ritmi, kampanya ve perakende ilişkilerini ticari planla birleştiririz.",
      region: "Türkiye",
      regionLabel: "TEK ODAK PAZAR",
      regionText: "Global markalar için yerel kanal açılışı, ürün ve kategori kurulumu, fiyat-stok ritmi, kampanya, içerik ve satış raporlaması.",
      operationsEyebrow: "A’DAN Z’YE",
      operationsTitle: "Türkiye kanalını açar, düzenler ve büyütürüz.",
      operations: [
        "Kanal uygunluk ve kârlılık analizi",
        "Mağaza ve bayi açılış süreçleri",
        "Türkçe katalog ve ürün içerikleri",
        "Fiyat, stok ve kampanya yönetimi",
        "Retail media ve pazaryeri reklamları",
        "İade, yorum ve operasyon takibi",
        "Haftalık satış ve kârlılık raporu",
        "Kategori büyüme ve kanal genişleme planı",
      ],
    },
    answers: {
      eyebrow: "HIZLI CEVAPLAR",
      title: "Markaların büyüme yolculuğunda sorduğu net sorular.",
      items: [
        {
          q: "DRK Aksesuar ne yapar?",
          a: "Global tüketici teknolojisi ve aksesuar markaları için Türkiye pazar girişi, distribütörlük, marka temsili, satış kanalı, pazarlama ve operasyon yönetimi sağlar.",
        },
        {
          q: "DRK yalnızca yabancı markalarla mı çalışır?",
          a: "Hayır. Ana uzmanlığımız global markaların Türkiye operasyonunu kurmak ve büyütmektir; Türkiye merkezli markalardan gelen seçili distribütörlük, kanal, pazarlama ve sistem projelerini de değerlendiririz.",
        },
        {
          q: "Hangi satış kanalları yönetilir?",
          a: "Türkiye’deki önde gelen pazaryerleri, teknoloji perakendecileri, e-ticaret kanalları ve uygun bayi ağları marka stratejisine göre yönetilir.",
        },
        {
          q: "Yabancı bir marka Türkiye’ye nasıl hazırlanır?",
          a: "Pazar ve kategori analizi, fiyatlandırma, yerel konumlandırma, kanal seçimi, içerik, lansman ve ölçüm planı tek yol haritasında hazırlanır.",
        },
      ],
    },
    homeSolutions: {
      eyebrow: "PAZAR VE KATEGORİ UZMANLIĞI",
      title: "Global vizyon.\nYerel pazar refleksi.",
      text: "Global marka standartlarını, yerel tüketici içgörüsünü ve teknoloji kategorisinin ticari gerçekliğini aynı masada buluşturuyoruz.",
      blocks: [
        {
          label: "PAZARA GİRİŞ",
          title: "Global markadan yerel kategori liderine.",
          text: "Markanın yerel konumunu, fiyatını, kanalını ve lansman hikâyesini birlikte kurarız.",
          link: "Pazara giriş çözümü",
        },
        {
          label: "KANAL OPERASYONU",
          title: "Ürünü doğru yerde, doğru ritimde büyütürüz.",
          text: "Pazaryeri, teknoloji perakendesi, e-ticaret ve bayi yapısını tek satış planında işletiriz.",
          link: "Kanal çözümü",
        },
      ],
    },
    servicesPage: {
      eyebrow: "HİZMET MİMARİSİ",
      title: "Bir markayı pazarda güçlü kılmak için gereken tüm yetkinlikler.",
      text: "Pazara girişten günlük satış operasyonuna kadar ihtiyaç duyulan ticari, yaratıcı ve teknolojik katmanları tek ekipte topluyoruz.",
      sectionEyebrow: "UÇTAN UCA KAPSAM",
      sectionTitle: "Tek tek hizmetler değil, birbirine bağlı bir büyüme sistemi.",
      sectionText: "İhtiyacınız tek bir kanalda başlayabilir; kurduğumuz yapı markanın tüm büyüme yolculuğunu taşıyacak şekilde tasarlanır.",
    },
    solutionsPage: {
      eyebrow: "MARKA VE PAZAR ÇÖZÜMLERİ",
      title: "Markayı pazarda çalışır bir ticari sisteme dönüştürürüz.",
      text: "Global standartları yerel tüketici, kanal ve ticaret dinamikleriyle buluşturur; Türkiye merkezli seçili markalar için de aynı operasyon gücünü sunarız.",
      blocks: [
        {
          type: "PAZARA GİRİŞ",
          title: "Pazara giriş için net ticari model.",
          description: "Kategori potansiyelini, rekabeti, fiyat yapısını ve kanal fırsatlarını analiz ederek uygulanabilir bir giriş planı kurarız.",
          items: ["Kategori ve rekabet analizi", "Tüketici içgörüsü", "Fiyat ve marj mimarisi", "Kanal önceliği", "Yerel marka konumu", "Lansman takvimi"],
          metrics: [["PAZAR UYUMU", "92"], ["KANAL", "88"], ["LANSMAN", "90"]],
        },
        {
          type: "DİSTRİBÜSYON",
          title: "Satış kanalından günlük operasyona.",
          description: "Ürün, stok, fiyat, kampanya, perakende ilişkisi ve raporlamayı sürdürülebilir bir ticari operasyona dönüştürürüz.",
          items: ["Ürün ve katalog kurulumu", "Pazaryeri operasyonu", "Perakende kanal yönetimi", "Stok ve fiyat takibi", "Retail media", "Satış/kârlılık raporu"],
          metrics: [["KATALOG", "94"], ["OPERASYON", "91"], ["BÜYÜME", "86"]],
        },
      ],
    },
    approachPage: {
      eyebrow: "YAKLAŞIM",
      title: "Markayı temsil eder, ticari sonucu sahipleniriz.",
      text: "DRK Aksesuar stratejiyi sunumda bırakmaz. Yerel yapıyı kurar, kanalı açar, lansmanı yürütür, performansı ölçer ve geliştirir.",
      sectionEyebrow: "DRK ÇALIŞMA SİSTEMİ",
      sectionTitle: "Beş adım. Tek ticari sorumluluk.",
      sectionText: "Her aşamada karar, teslimat, sorumluluk ve başarı ölçümü nettir.",
      steps: [
        ["01", "Keşif", "Markayı, ürünü, global standartları ve pazar hedefini birlikte tanımlarız."],
        ["02", "Pazar modeli", "Kategori, rakip, fiyat, marj ve kanal analizini ticari modele dönüştürürüz."],
        ["03", "Yerel kurulum", "Marka dili, katalog, satış kanalları, içerik ve operasyon altyapısını hazırlarız."],
        ["04", "Lansman", "Ürünü doğru kanallarda, doğru kampanya ve medya planıyla pazara çıkarırız."],
        ["05", "Büyüme", "Satış, stok, kârlılık ve tüketici verisini izleyerek sistemi sürekli geliştiririz."],
      ],
    },
    aboutPage: {
      eyebrow: "HAKKIMIZDA",
      title: "Global standart. Yerel güç. Ticari sahiplenme.",
      text: "DRK Aksesuar; teknoloji ve aksesuar kategorisinde global markaların Türkiye operasyonunu üstlenen, yerel markalar için de seçili büyüme ve dağıtım projeleri geliştiren yeni nesil marka işletim ortağıdır.",
      statementEyebrow: "NEDEN DRK?",
      statement: "Türkiye’de başarılı olmak yalnızca ürün getirmek değil; markayı, kanalı ve tüketici deneyimini aynı ticari sistemde işletmektir.",
      principles: [
        ["Yerel uzmanlık", "Türkiye tüketicisini, perakendeyi ve pazaryeri dinamiklerini yakından okuruz."],
        ["Marka disiplini", "Global marka standartlarını yerel uygulamada korur ve güçlendiririz."],
        ["Ticari sahiplenme", "Dağıtımı yalnızca lojistik değil; satış, kârlılık ve marka değeri olarak yönetiriz."],
      ],
      numbers: [["360°", "marka ve kanal sahiplenmesi"], ["6", "bağlantılı uzmanlık alanı"], ["1", "entegre ticari ekip"]],
    },
    contactPage: {
      eyebrow: "İLETİŞİM",
      title: "Markanızın bir sonraki büyüme adımını konuşalım.",
      text: "Kısa bir keşif görüşmesinde ürününüzü, hedefinizi ve en hızlı değer yaratabileceğimiz alanları birlikte değerlendirelim.",
      formEyebrow: "MARKA KEŞFİ",
      formTitle: "Bize markanızdan bahsedin.",
      formText: "Formu doldurun; pazar, kanal ve iş modeli açısından ilk değerlendirmeyi hazırlayalım.",
      benefits: ["Pazar ve kategori uygunluğu", "Kanal ve fiyat fırsatları", "Net başlangıç modeli"],
      fields: {
        name: "Adınız",
        namePlaceholder: "Ad Soyad",
        company: "Şirket / Marka",
        companyPlaceholder: "Marka adı",
        email: "E-posta",
        phone: "Telefon",
        area: "İlgilendiğiniz alan",
        areaPlaceholder: "Bir alan seçin",
        goal: "Büyüme hedefiniz",
        goalPlaceholder: "Markanız, ürünleriniz ve hedefiniz hakkında kısa bilgi...",
        submit: "Görüşme talebi oluştur",
      },
      successTitle: "Markanız için ilk adımı attınız.",
      successText: "Başvuru formunuz başarı ile gönderildi. Marka danışmanlarımız en kısa sürede sizinle iletişime geçecektir.",
      reset: "Yeni talep oluştur",
      faqEyebrow: "MERAK EDİLENLER",
      faqTitle: "Net sorular. Net cevaplar.",
      faq: [
        ["Hangi markalarla çalışıyorsunuz?", "Tüketici teknolojisi, mobil aksesuar, şarj teknolojileri ve bağlantılı kategorilerde global markalarla; ayrıca seçili Türkiye merkezli markalarla çalışıyoruz."],
        ["Sadece distribütörlük mü yapıyorsunuz?", "Hayır. Marka konumlandırma, kanal açılışı, e-ticaret, perakende, lansman, pazarlama, CRM ve raporlamayı da tek sistemde yönetiyoruz."],
        ["Operasyon odağınız nedir?", "Ana odağımız global markaların Türkiye’de temsil, dağıtım ve büyüme operasyonudur. Bunun yanında yerel markalardan gelen güçlü ve uyumlu projeleri de değerlendiririz."],
        ["İlk görüşmede ne konuşulur?", "Markanın ürünlerini, hedefini, mevcut pazar durumunu, fiyat yapısını ve uygun başlangıç modelini değerlendiririz."],
      ],
    },
    servicePage: {
      scopeEyebrow: "KAPSAM",
      scopeTitle: "Bu hizmette ne teslim ediyoruz?",
      scopeText: "Alt hizmetler tek tek değil, markanın ticari operasyonunda birlikte çalışacak şekilde kurgulanır.",
      outcomeTitle: "Güzel görünen değil, gerçekten işleyen sistem.",
      outcomeText: "Her hizmette üretimin yanında karar ritmini, ticari ölçümü, sorumluluğu ve sonraki büyüme adımını tanımlarız.",
      relatedTitle: "Bu hizmet çoğu zaman şunlarla birlikte çalışır.",
      cta: "Bu hizmet için başlangıç planını çıkaralım.",
    },
    notFound: {
      title: "Aradığınız sayfa büyüme ağımızda yok.",
      action: "Ana sayfaya dön",
    },
  },
  en: {
    languageName: "English",
    nav: {
      services: "Services",
      solutions: "Solutions",
      approach: "Approach",
      about: "About",
      contact: "Discuss your brand",
    },
    common: {
      detail: "View details",
      exploreServices: "Explore services",
      talk: "Discuss your brand",
      backServices: "Back to services",
      scope: "View scope",
      related: "Connected services",
      allServices: "Explore all services",
      start: "Build your growth plan",
      discover: "Explore",
      contact: "Contact",
      projectForm: "Brand form",
      location: CONTACT_ADDRESS,
      rights: "© 2026 DRK Aksesuar. All rights reserved.",
      footerLine: "Local operations for global brands; end-to-end growth for ambitious brands.",
      outcome: "Outcome focus",
      workingSystem: "Operating model",
    },
    hero: {
      titleTop: "We make brands",
      titleAccent: "powerful in-market.",
      text: "DRK Aksesuar is a new-generation distribution and brand operating partner that leads the Türkiye operations of global technology and accessory brands while supporting selected local brands with end-to-end commercial growth solutions.",
      primary: "Let’s assess your needs",
      secondary: "Explore capabilities",
      trustBrand: "SAMSUNG",
      trustText: "Long-standing experience across marketplace, official online-store and Hotel TV operations",
    },
    analyzer: {
      eyebrow: "GROWTH NEEDS RADAR",
      title: "Let’s identify the operating system your brand needs.",
      text: "Choose your current stage and see the right representation, channel and growth model in seconds.",
      recommended: "RECOMMENDED START",
      options: [
        {
          label: "I need local operations for my global brand",
          title: "Market entry and distribution plan",
          text: "We assess category demand, competition, pricing and channel opportunities to build an actionable local operating model.",
          tags: ["Market review", "Positioning", "Channel plan"],
          path: "/hizmetler/pazar-girisi-distributorluk",
          action: "Explore the entry model",
        },
        {
          label: "My brand is selling and I want faster growth",
          title: "Channel and sales operations",
          text: "We connect marketplace, retail, inventory, pricing, promotion and field operations in one commercial rhythm.",
          tags: ["Marketplace", "Retail", "Sales operations"],
          path: "/hizmetler/perakende-kanal-operasyonu",
          action: "Explore channel operations",
        },
        {
          label: "I need a strong team for my Türkiye-based brand",
          title: "End-to-end brand and growth management",
          text: "We run brand language, launch, content, media, CRM and reporting as one connected growth team.",
          tags: ["Brand representation", "Launch", "Growth"],
          path: "/iletisim",
          action: "Discuss the model",
        },
      ],
    },
    network: {
      live: "LIVE MAP",
      title: "DRK capability network",
      hint: "CONNECTED CAPABILITIES · HOVER TO EXPLORE",
      center: "GROWTH NETWORK",
    },
    ecosystem: {
      label: "ONE TEAM. END-TO-END BRAND, CHANNEL AND GROWTH OPERATIONS.",
      items: ["BRAND REPRESENTATION", "DISTRIBUTION", "E-COMMERCE", "RETAIL", "MARKETING", "CRM"],
    },
    flagship: {
      eyebrow: "FLAGSHIP OPERATIONS",
      title: "We do more than sell brands in Türkiye — we operate them end to end.",
      text: "The operating depth built across multiple Samsung Türkiye channels now powers Sharge's omnichannel growth model.",
      items: [
        {
          id: "samsung-marketplace",
          brand: "Samsung",
          title: "Samsung Marketplace Operations",
          period: "ONGOING",
          channel: "Marketplace · 360° operations",
          text: "We manage listings, pricing, inventory, campaigns, orders, logistics, returns and after-sales across Türkiye's leading marketplaces.",
          tags: ["7+ marketplaces", "Sales & operations", "Reporting"],
        },
        {
          id: "samsung-shop",
          brand: "Samsung",
          title: "Samsung Official Online Store",
          period: "2017–2025",
          channel: "shop.samsung.com/tr · D2C",
          text: "We operated Samsung Türkiye's official online store across catalogue, orders, campaigns and customer experience.",
          tags: ["Official online store", "D2C sales", "End-to-end operations"],
        },
        {
          id: "samsung-hotel-tv",
          brand: "Samsung",
          title: "Samsung Hotel TV Operations",
          period: "2025–PRESENT",
          channel: "Hospitality TV · B2B",
          text: "We lead the commercial operation for Samsung Hotel TV products in Türkiye through project development, B2B sales and channel coordination.",
          tags: ["Hotel TV", "B2B projects", "Channel development"],
        },
        {
          id: "sharge-omnichannel",
          brand: "Sharge",
          title: "Sharge Türkiye Omnichannel",
          period: "SCALING",
          channel: "Brand operations · Omnichannel",
          text: "We grow official e-commerce, marketplaces, retail, content and customer experience under one connected brand operating system.",
          tags: ["Omnichannel", "Brand representation", "Local growth"],
        },
      ],
      legacy: "From 2017 to 2025, we also operated the sales and execution flows of Samsung campaigns, including trade-in programmes.",
    },
    reach: {
      eyebrow: "OUR COMMERCIAL VOLUME IN TÜRKİYE",
      title: "A strong, measurable commercial volume across the Türkiye market.",
      text: "We connect global brands with consumers nationwide — running the whole operation, from orders and delivery to channels and revenue, under one roof.",
      statLabels: ["Annual managed revenue", "Annual order volume", "Provinces reached", "Active sales channels"],
      mapLabel: "OPERATIONS ACROSS TÜRKİYE",
      note: "Figures reflect the current commercial volume of DRK Aksesuar operations.",
    },
    portfolio: {
      eyebrow: "COMPANIES & BRANDS",
      title: "A strong company structure.\nSelected brand partnerships.",
      text: "We connect the operating strength of Doruk Group companies with the local growth ambitions of the technology brands we work with.",
      samsung: "Broad category and channel strength across the mobile technology ecosystem.",
      sharge: "Design and innovation focus in next-generation charging technology.",
      status: "DRK PORTFOLIO",
      note: "Explore every brand and company in the 3D portfolio, then continue to its verified official website or Doruk Group when no standalone site exists.",
      filters: ["All", "Brands", "Doruk Group companies"],
      reachAction: "Show commercial network",
      previewAction: "Full-screen preview",
      websiteAction: "Visit website",
      companiesLabel: "DRK & DORUK GROUP COMPANIES",
      companiesText: "Group companies powering the operation",
      brandsLabel: "BRANDS WE WORK WITH",
      brandsText: "Our category partnerships and managed brands",
    },
    servicesSection: {
      eyebrow: "WHAT DOES DRK DO?",
      title: "More than distribution. A commercial operating system for brands.",
      text: "From strategy and market access to launch and data, every layer is connected to the same commercial objective.",
    },
    marketplace: {
      eyebrow: "TÜRKİYE SALES ECOSYSTEM",
      title: "We open and operate your brand across Türkiye’s leading sales channels.",
      text: "We do not manage international marketplace operations. Our focus is helping global brands grow in Türkiye through the right catalogue, pricing, inventory, campaign and channel management.",
      focusOneLabel: "MARKETPLACES",
      focusOneTitle: "Trendyol, Hepsiburada, Amazon Türkiye, n11, Çiçeksepeti, PttAVM, Pazarama and more",
      focusOneText: "We manage the daily marketplace operation from store opening and catalogue quality to advertising and campaigns.",
      focusTwoLabel: "TECH RETAIL",
      focusTwoTitle: "Teknosa, MediaMarkt, Vatan Bilgisayar, İncehesap and İtopya",
      focusTwoText: "We connect category presentation, product listings, pricing, campaigns and retail relationships to one commercial plan.",
      region: "Türkiye",
      regionLabel: "SINGLE FOCUS MARKET",
      regionText: "Local channel setup, product and category onboarding, price-inventory rhythm, campaigns, content and sales reporting for global brands.",
      operationsEyebrow: "END TO END",
      operationsTitle: "We open, organise and grow your Türkiye channel.",
      operations: [
        "Channel fit and profitability analysis",
        "Marketplace and dealer onboarding",
        "Turkish catalogue and product content",
        "Pricing, inventory and campaign management",
        "Retail media and marketplace advertising",
        "Returns, reviews and operational tracking",
        "Weekly sales and profitability reporting",
        "Category growth and channel expansion plan",
      ],
    },
    answers: {
      eyebrow: "QUICK ANSWERS",
      title: "Clear answers for brands on a growth journey.",
      items: [
        {
          q: "What does DRK Aksesuar do?",
          a: "DRK provides Türkiye market entry, distribution, brand representation, sales-channel, marketing and operations management for global consumer technology and accessory brands.",
        },
        {
          q: "Does DRK only work with international brands?",
          a: "No. Our core expertise is building and growing Türkiye operations for global brands, but we also assess selected distribution, channel, marketing and systems projects from Türkiye-based brands.",
        },
        {
          q: "Which sales channels are managed?",
          a: "Leading Turkish marketplaces, technology retailers, e-commerce channels and relevant dealer networks are managed according to the brand strategy.",
        },
        {
          q: "How is a global brand prepared for Türkiye?",
          a: "Market and category analysis, pricing, local positioning, channel selection, content, launch and measurement are combined in one roadmap.",
        },
      ],
    },
    homeSolutions: {
      eyebrow: "MARKET AND CATEGORY EXPERTISE",
      title: "Global vision.\nLocal market reflex.",
      text: "We bring global brand standards, local consumer insight and the commercial realities of technology categories to the same table.",
      blocks: [
        {
          label: "MARKET ENTRY",
          title: "From global brand to local category leader.",
          text: "We shape the brand’s local positioning, pricing, channels and launch narrative.",
          link: "Market-entry solution",
        },
        {
          label: "CHANNEL OPERATIONS",
          title: "We grow the product in the right place and rhythm.",
          text: "We operate marketplace, technology retail, e-commerce and dealer structures under one sales plan.",
          link: "Channel solution",
        },
      ],
    },
    servicesPage: {
      eyebrow: "SERVICE ARCHITECTURE",
      title: "Every capability needed to build a strong in-market brand.",
      text: "We bring together the commercial, creative and technology layers required from market entry to daily sales operations.",
      sectionEyebrow: "END-TO-END SCOPE",
      sectionTitle: "Not isolated services, but one connected growth system.",
      sectionText: "Your need may begin with one channel; the system is designed to support the brand’s full growth journey.",
    },
    solutionsPage: {
      eyebrow: "BRAND AND MARKET SOLUTIONS",
      title: "We turn a brand into a working commercial system.",
      text: "We connect global standards with local consumer, channel and commercial dynamics—and bring the same operating strength to selected Türkiye-based brands.",
      blocks: [
        {
          type: "MARKET ENTRY",
          title: "A clear commercial market-entry model.",
          description: "We assess category potential, competition, pricing and channel opportunities to build an actionable entry plan.",
          items: ["Category and competition review", "Consumer insight", "Pricing and margin architecture", "Channel prioritisation", "Local brand position", "Launch calendar"],
          metrics: [["MARKET FIT", "92"], ["CHANNEL", "88"], ["LAUNCH", "90"]],
        },
        {
          type: "DISTRIBUTION",
          title: "From sales channels to daily operations.",
          description: "We turn product, inventory, pricing, campaigns, retail relationships and reporting into a sustainable commercial operation.",
          items: ["Product and catalogue setup", "Marketplace operations", "Retail channel management", "Inventory and pricing", "Retail media", "Sales/profitability reporting"],
          metrics: [["CATALOGUE", "94"], ["OPERATIONS", "91"], ["GROWTH", "86"]],
        },
      ],
    },
    approachPage: {
      eyebrow: "APPROACH",
      title: "We represent the brand and own the commercial outcome.",
      text: "DRK Aksesuar does not leave strategy in a presentation. We build the local structure, open channels, run the launch, measure performance and improve it.",
      sectionEyebrow: "THE DRK OPERATING MODEL",
      sectionTitle: "Five steps. One commercial owner.",
      sectionText: "At every stage, decisions, deliverables, ownership and success metrics are clear.",
      steps: [
        ["01", "Discovery", "We align on the brand, products, global standards and market objective."],
        ["02", "Market model", "We turn category, competitor, pricing, margin and channel analysis into a commercial model."],
        ["03", "Local setup", "We prepare brand language, catalogue, sales channels, content and operational infrastructure."],
        ["04", "Launch", "We take the product to market through the right channels, campaign and media plan."],
        ["05", "Growth", "We continuously improve the system through sales, inventory, profitability and consumer data."],
      ],
    },
    aboutPage: {
      eyebrow: "ABOUT",
      title: "Global standards. Local strength. Commercial ownership.",
      text: "DRK Aksesuar is a new-generation brand operating partner that leads Türkiye operations for global technology and accessory brands while developing selected growth and distribution projects for local brands.",
      statementEyebrow: "WHY DRK?",
      statement: "Success in Türkiye is not only about bringing in products; it is about operating the brand, channels and consumer experience within one commercial system.",
      principles: [
        ["Local expertise", "We understand Türkiye’s consumers, retail landscape and marketplace dynamics."],
        ["Brand discipline", "We protect and strengthen global brand standards through local execution."],
        ["Commercial ownership", "We manage distribution as sales, profitability and brand value—not only logistics."],
      ],
      numbers: [["360°", "brand and channel ownership"], ["6", "connected capability areas"], ["1", "integrated commercial team"]],
    },
    contactPage: {
      eyebrow: "CONTACT",
      title: "Let’s discuss your brand’s next growth move.",
      text: "In a short discovery call, we can assess your products, goals and the fastest opportunities to create value.",
      formEyebrow: "BRAND DISCOVERY",
      formTitle: "Tell us about your brand.",
      formText: "Complete the form and we will prepare an initial view of market, channel and business-model fit.",
      benefits: ["Market and category fit", "Channel and pricing opportunities", "Clear starting model"],
      fields: {
        name: "Your name",
        namePlaceholder: "Full name",
        company: "Company / Brand",
        companyPlaceholder: "Brand name",
        email: "Email",
        phone: "Phone",
        area: "Area of interest",
        areaPlaceholder: "Select an area",
        goal: "Your growth objective",
        goalPlaceholder: "A short note about your brand, products and goals...",
        submit: "Request a meeting",
      },
      successTitle: "You've taken the first step for your brand.",
      successText: "Your application form has been submitted successfully. Our brand consultants will contact you shortly.",
      reset: "Create another request",
      faqEyebrow: "FREQUENTLY ASKED",
      faqTitle: "Clear questions. Clear answers.",
      faq: [
        ["Which brands do you work with?", "We work with global brands and selected Türkiye-based brands across consumer technology, mobile accessories, charging technology and adjacent categories."],
        ["Do you only provide distribution?", "No. We also manage brand positioning, channel setup, e-commerce, retail, launches, marketing, CRM and reporting under one system."],
        ["What is your operational focus?", "Our primary focus is representation, distribution and growth for global brands in Türkiye. We also evaluate strong, well-aligned projects from local brands."],
        ["What is discussed in the first meeting?", "We review the brand’s products, objectives, current market status, pricing structure and the right starting model."],
      ],
    },
    servicePage: {
      scopeEyebrow: "SCOPE",
      scopeTitle: "What do we deliver in this service?",
      scopeText: "Sub-services are designed to work together inside the brand’s commercial operation.",
      outcomeTitle: "Not just attractive—a system that actually operates.",
      outcomeText: "Alongside execution, every service defines the decision rhythm, commercial measurement, ownership and next growth action.",
      relatedTitle: "This service often works together with these capabilities.",
      cta: "Let’s build the starting plan for this service.",
    },
    notFound: {
      title: "This page is not in our growth network.",
      action: "Return home",
    },
  },
};

const SERVICE_COPY = {
  tr: [
    {
      title: "Marka Temsili & Pazar Stratejisi",
      navTitle: "Marka",
      eyebrow: "YEREL MARKA OMURGASI",
      short: "Global marka standartlarını yerel tüketici, kategori ve kanal gerçekliğiyle buluştururuz.",
      intro: "Markanın global özünü korurken yerel pazarda nasıl konuşacağını, hangi değer önerisiyle ayrışacağını ve kanallarda nasıl temsil edileceğini kurarız.",
      items: ["Pazar konumlandırması", "Yerel marka dili", "Kategori stratejisi", "Fiyat algısı", "Lansman anlatısı", "Marka standartları"],
      outcomes: ["Net pazar pozisyonu", "Tutarlı yerel iletişim", "Satışa bağlı marka değeri"],
      sections: [
        ["Pazar ve kategori konumu", "Markanın hangi kategori, tüketici ihtiyacı ve rekabet alanında konumlanacağını netleştiririz.", ["Kategori haritası", "Rakip ve fiyat analizi", "Tüketici segmentleri", "Yerel değer önerisi"]],
        ["Yerel kimlik ve anlatı", "Global marka rehberini Türkçe mesaj, içerik ve kanal ihtiyaçlarına uyarlayan bir iletişim sistemi kurarız.", ["Mesaj matrisi", "Türkçe marka dili", "Kampanya temaları", "Kanal bazlı anlatı"]],
        ["Temsil ve yönetişim", "Markanın her temas noktasında aynı kalite ve stratejiyle temsil edilmesini sağlarız.", ["Onay akışları", "Marka standart kontrolü", "Partner iletişimi", "Dönemsel marka planı"]],
      ],
      process: ["Analiz", "Konum", "Yerel sistem", "Temsil"],
    },
    {
      title: "Pazar Girişi & Distribütörlük",
      navTitle: "Distribütörlük",
      eyebrow: "TÜRKİYE PAZAR ERİŞİMİ",
      short: "Global markanın yerel pazara giriş modelini, ticari yapısını ve dağıtım planını uçtan uca kurarız.",
      intro: "Ürün uygunluğu ve fiyat mimarisinden kanal seçimine, stok planından lansmana kadar distribütörlük modelini uygulanabilir bir ticari sisteme dönüştürürüz.",
      items: ["Pazar analizi", "Distribütörlük modeli", "Fiyat & marj", "Kanal planı", "Stok planlama", "Lansman"],
      outcomes: ["Uygulanabilir giriş modeli", "Sağlıklı marj yapısı", "Ölçeklenebilir dağıtım"],
      sections: [
        ["Ticari fizibilite", "Kategori potansiyelini, rekabeti, regülasyonları, fiyatları ve kârlılık sınırlarını değerlendiririz.", ["TAM/SAM görünümü", "Rakip ürün matrisi", "Fiyat koridoru", "Marj senaryoları"]],
        ["Dağıtım ve kanal modeli", "Marka için uygun pazar yeri, perakende, e-ticaret ve bayi kombinasyonunu kurarız.", ["Kanal önceliği", "Bayi/perakende yaklaşımı", "Kanal sözleşme çerçevesi", "Stok ve sipariş ritmi"]],
        ["Pazara çıkış", "İlk ürün seti, lansman tarihi, kampanya ve satış hedeflerini tek takvimde birleştiririz.", ["SKU seçimi", "Lansman planı", "Satış hedefi", "90 günlük büyüme planı"]],
      ],
      process: ["Fizibilite", "Ticari model", "Kanal kurulum", "Lansman"],
    },
    {
      title: "E-Ticaret & Türkiye Pazaryerleri",
      navTitle: "E-Ticaret",
      eyebrow: "YEREL DİJİTAL SATIŞ",
      short: "Türkiye pazaryerleri ve markanın kendi e-ticaret kanalında satış operasyonunu kurar ve yönetiriz.",
      intro: "Mağaza açılışı, Türkçe katalog, fiyat-stok, kampanya, reklam ve müşteri deneyimini tek e-ticaret sistemi içinde işletiriz.",
      items: ["Trendyol", "Hepsiburada", "Amazon Türkiye", "n11", "Katalog SEO", "Fiyat & stok", "Retail media"],
      outcomes: ["Temiz katalog", "Kontrollü fiyat-stok", "Ölçülebilir dijital satış"],
      sections: [
        ["Mağaza ve katalog kurulumu", "Yerel satış kanallarında mağaza, kategori ve ürün içeriklerini marka standardında yayına hazırlarız.", ["Mağaza açılışı", "Türkçe ürün içeriği", "Kategori eşleştirme", "Görsel standart"]],
        ["Günlük kanal operasyonu", "Fiyat, stok, kampanya, sipariş, iade ve yorum akışını düzenli bir operasyon ritmine bağlarız.", ["Fiyat-stok takibi", "Kampanya yönetimi", "Sipariş/iade kontrolü", "Yorum yönetimi"]],
        ["Dijital büyüme", "Pazaryeri reklamları, ürün sayfası optimizasyonu ve satış verisiyle kanal performansını geliştiririz.", ["Retail media", "CRO testleri", "Kârlılık raporu", "Kanal büyüme planı"]],
      ],
      process: ["Kanal analizi", "Katalog", "Yayın", "Optimizasyon"],
    },
    {
      title: "Perakende & Kanal Operasyonu",
      navTitle: "Perakende",
      eyebrow: "OMNICHANNEL SATIŞ",
      short: "Teknoloji perakendesi, bayi ve kurumsal satış kanallarını aynı ticari planla yönetiriz.",
      intro: "Markanın ürünlerini doğru perakende noktalarıyla buluşturur; listeleme, kategori sunumu, fiyat, kampanya, stok ve satış takibini sahipleniriz.",
      items: ["Teknosa", "MediaMarkt", "Vatan", "Bayi ağı", "Kurumsal satış", "Kategori yönetimi"],
      outcomes: ["Daha geniş erişim", "Kanal tutarlılığı", "Sağlıklı satış ritmi"],
      sections: [
        ["Kanal geliştirme", "Marka ve kategori için uygun perakende, bayi ve kurumsal satış fırsatlarını belirleriz.", ["Kanal haritası", "Partner önceliği", "Listeleme dosyaları", "Ticari görüşme hazırlığı"]],
        ["Perakende uygulaması", "Ürünün mağaza ve online perakende ortamında doğru bilgi, görsel, fiyat ve kampanyayla sunulmasını sağlarız.", ["Ürün listeleri", "Kategori sunumu", "Kampanya koordinasyonu", "Fiyat tutarlılığı"]],
        ["Satış ve stok takibi", "Sell-in, sell-out, stok yaşı ve kanal kârlılığını birlikte izleyerek aksiyon planı oluştururuz.", ["Stok sağlığı", "Satış raporu", "Tahminleme", "Kanal aksiyonları"]],
      ],
      process: ["Kanal seçimi", "Listeleme", "Uygulama", "Sell-out"],
    },
    {
      title: "Pazarlama, Lansman & İçerik",
      navTitle: "Pazarlama",
      eyebrow: "YEREL TALEP YARATMA",
      short: "Pazara özel lansman, performans, sosyal medya ve içerik sistemini satış hedefiyle birlikte yönetiriz.",
      intro: "Marka hikâyesini yerel tüketiciye uygun kreatif, medya ve içerik ritmine dönüştürür; yatırımı kanal performansına bağlarız.",
      items: ["Lansman", "Meta & Google Ads", "Sosyal medya", "Influencer", "Kreatif üretim", "PR koordinasyonu"],
      outcomes: ["Yerel marka bilinirliği", "Ölçülen talep", "Sürekli içerik ritmi"],
      sections: [
        ["Yerel lansman", "Yeni marka veya ürünün mesajını, kanal planını, medya ve içerik takvimini tek lansman kurgusunda birleştiririz.", ["Lansman fikri", "Kampanya takvimi", "Medya planı", "Partner aktivasyonu"]],
        ["Performans ve içerik", "Kreatif üretimi, reklam yatırımı ve sosyal medya yayınını satış kanalındaki hedeflerle birlikte yönetiriz.", ["Meta/Google Ads", "Reels ve kısa video", "Ürün kreatifleri", "Sosyal medya yönetimi"]],
        ["Topluluk ve güven", "Influencer, PR, yorum ve kullanıcı içeriğiyle markanın yerel güven kazanmasını destekleriz.", ["Influencer seçimi", "PR koordinasyonu", "UGC sistemi", "Topluluk takibi"]],
      ],
      process: ["Hedef", "Kreatif sistem", "Lansman", "Ölçekleme"],
    },
    {
      title: "Veri, CRM & Otomasyon",
      navTitle: "Veri",
      eyebrow: "ÖLÇÜLEBİLİR BÜYÜME",
      short: "Satış, stok, müşteri ve pazarlama verisini karar üreten dashboard ve otomasyonlara bağlarız.",
      intro: "Ticari operasyonun satış, stok, reklam, kanal ve müşteri verisini tek görünümde toplar; tekrar eden işleri otomasyonlarla hızlandırırız.",
      items: ["Dashboard", "CRM", "Satış raporu", "Stok tahmini", "AI otomasyon", "Uyarı sistemleri"],
      outcomes: ["Tek veri görünümü", "Daha hızlı karar", "Daha az manuel operasyon"],
      sections: [
        ["Ticari dashboard", "Kanal, ürün ve dönem bazında satış, stok ve kârlılık performansını okunabilir hale getiririz.", ["Satış görünümü", "Stok yaşı", "Kanal kârlılığı", "Yönetici raporu"]],
        ["CRM ve müşteri yaşam döngüsü", "İlk temastan tekrar satın almaya kadar müşteri segmentlerini ve iletişim akışlarını kurarız.", ["Segmentasyon", "E-posta/SMS", "Sadakat akışları", "Tekrar satış"]],
        ["Otomasyon sistemi", "Rapor, uyarı, görev ve veri akışlarını otomatikleştirerek ekibin karar hızını artırırız.", ["Otomatik rapor", "Stok/fiyat alarmı", "Görev akışları", "AI özetleri"]],
      ],
      process: ["Veri audit", "Takip planı", "Dashboard", "Otomasyon"],
    },
  ],
  en: [
    {
      title: "Brand Representation & Market Strategy",
      navTitle: "Brand",
      eyebrow: "LOCAL BRAND FOUNDATION",
      short: "We connect global brand standards with local consumers, categories and channel realities.",
      intro: "We preserve the brand’s global essence while building how it should speak, differentiate and be represented in the local market.",
      items: ["Market positioning", "Local brand language", "Category strategy", "Price perception", "Launch narrative", "Brand standards"],
      outcomes: ["Clear market position", "Consistent local communication", "Commercial brand value"],
      sections: [
        ["Market and category position", "We define the category, consumer need and competitive space the brand should own.", ["Category map", "Competitor and pricing review", "Consumer segments", "Local value proposition"]],
        ["Local identity and narrative", "We adapt the global brand guide into Turkish messaging, content and channel requirements.", ["Message matrix", "Turkish brand language", "Campaign themes", "Channel narratives"]],
        ["Representation and governance", "We ensure the brand is represented with the same strategy and quality at every touchpoint.", ["Approval flows", "Brand-standard control", "Partner communication", "Quarterly brand plan"]],
      ],
      process: ["Review", "Position", "Local system", "Representation"],
    },
    {
      title: "Market Entry & Distribution",
      navTitle: "Distribution",
      eyebrow: "TÜRKİYE MARKET ACCESS",
      short: "We build the local market-entry model, commercial structure and distribution plan for global brands.",
      intro: "From product fit and pricing architecture to channel selection, inventory and launch, we turn distribution into an actionable commercial system.",
      items: ["Market analysis", "Distribution model", "Price & margin", "Channel plan", "Inventory planning", "Launch"],
      outcomes: ["Actionable entry model", "Healthy margin structure", "Scalable distribution"],
      sections: [
        ["Commercial feasibility", "We assess category potential, competition, regulations, pricing and profitability boundaries.", ["TAM/SAM view", "Competitor product matrix", "Price corridor", "Margin scenarios"]],
        ["Distribution and channel model", "We build the right combination of marketplace, retail, e-commerce and dealer channels.", ["Channel priorities", "Dealer/retail model", "Commercial framework", "Inventory and ordering rhythm"]],
        ["Go to market", "We align the first product range, launch date, campaigns and sales targets in one calendar.", ["SKU selection", "Launch plan", "Sales target", "90-day growth plan"]],
      ],
      process: ["Feasibility", "Commercial model", "Channel setup", "Launch"],
    },
    {
      title: "E-Commerce & Türkiye Marketplaces",
      navTitle: "E-Commerce",
      eyebrow: "LOCAL DIGITAL SALES",
      short: "We build and operate sales across Türkiye’s marketplaces and the brand’s own e-commerce channel.",
      intro: "We manage store onboarding, Turkish catalogue, price-inventory, campaigns, advertising and customer experience inside one e-commerce system.",
      items: ["Trendyol", "Hepsiburada", "Amazon Türkiye", "n11", "Catalogue SEO", "Price & inventory", "Retail media"],
      outcomes: ["Clean catalogue", "Controlled price-inventory", "Measurable digital sales"],
      sections: [
        ["Store and catalogue setup", "We prepare marketplace stores, categories and product content to the brand standard.", ["Store onboarding", "Turkish product content", "Category mapping", "Visual standards"]],
        ["Daily channel operations", "We connect pricing, inventory, campaigns, orders, returns and reviews to a clear operating rhythm.", ["Price-inventory tracking", "Campaign management", "Order/return control", "Review management"]],
        ["Digital growth", "We improve channel performance through marketplace advertising, product-page optimisation and sales data.", ["Retail media", "CRO tests", "Profitability report", "Channel growth plan"]],
      ],
      process: ["Channel review", "Catalogue", "Launch", "Optimisation"],
    },
    {
      title: "Retail & Channel Operations",
      navTitle: "Retail",
      eyebrow: "OMNICHANNEL SALES",
      short: "We manage technology retail, dealer and corporate sales channels under one commercial plan.",
      intro: "We connect products with the right retail points and own listing, category presentation, pricing, campaigns, inventory and sales tracking.",
      items: ["Teknosa", "MediaMarkt", "Vatan", "Dealer network", "Corporate sales", "Category management"],
      outcomes: ["Wider reach", "Channel consistency", "Healthy sales rhythm"],
      sections: [
        ["Channel development", "We identify the right retail, dealer and corporate sales opportunities for the brand and category.", ["Channel map", "Partner priorities", "Listing files", "Commercial meeting preparation"]],
        ["Retail execution", "We ensure the product is presented with the right information, visuals, price and campaigns across physical and online retail.", ["Product listings", "Category presentation", "Campaign coordination", "Price consistency"]],
        ["Sales and inventory tracking", "We monitor sell-in, sell-out, inventory age and channel profitability to create action plans.", ["Inventory health", "Sales reporting", "Forecasting", "Channel actions"]],
      ],
      process: ["Channel selection", "Listing", "Execution", "Sell-out"],
    },
    {
      title: "Marketing, Launch & Content",
      navTitle: "Marketing",
      eyebrow: "LOCAL DEMAND CREATION",
      short: "We manage market-specific launch, performance, social and content systems against sales objectives.",
      intro: "We turn the brand story into creative, media and content rhythms for Turkish consumers and connect investment to channel performance.",
      items: ["Launch", "Meta & Google Ads", "Social media", "Influencer", "Creative production", "PR coordination"],
      outcomes: ["Local brand awareness", "Measured demand", "Consistent content rhythm"],
      sections: [
        ["Local launch", "We combine the new brand or product message, channel plan, media and content calendar in one launch system.", ["Launch concept", "Campaign calendar", "Media plan", "Partner activation"]],
        ["Performance and content", "We manage creative production, media investment and social publishing alongside sales-channel targets.", ["Meta/Google Ads", "Reels and short video", "Product creative", "Social management"]],
        ["Community and trust", "We support local trust through influencer, PR, reviews and user-generated content.", ["Influencer selection", "PR coordination", "UGC system", "Community tracking"]],
      ],
      process: ["Objective", "Creative system", "Launch", "Scale"],
    },
    {
      title: "Data, CRM & Automation",
      navTitle: "Data",
      eyebrow: "MEASURABLE GROWTH",
      short: "We connect sales, inventory, customer and marketing data to decision-ready dashboards and automation.",
      intro: "We bring sales, inventory, advertising, channel and customer data into one view and accelerate repetitive operations through automation.",
      items: ["Dashboard", "CRM", "Sales reporting", "Inventory forecast", "AI automation", "Alert systems"],
      outcomes: ["Single data view", "Faster decisions", "Less manual operations"],
      sections: [
        ["Commercial dashboard", "We make sales, inventory and profitability readable by channel, product and period.", ["Sales view", "Inventory age", "Channel profitability", "Executive report"]],
        ["CRM and customer lifecycle", "We build customer segments and communication flows from first interaction to repeat purchase.", ["Segmentation", "Email/SMS", "Loyalty flows", "Repeat sales"]],
        ["Automation system", "We automate reporting, alerts, tasks and data flows to increase the team’s decision speed.", ["Automated reports", "Stock/price alerts", "Task flows", "AI summaries"]],
      ],
      process: ["Data audit", "Tracking plan", "Dashboard", "Automation"],
    },
  ],
};

const CHANNELS = [
  { name: "Trendyol", domain: "trendyol.com", accent: "#ff6b00" },
  { name: "Hepsiburada", domain: "hepsiburada.com", accent: "#ff7600" },
  { name: "Amazon Türkiye", domain: "amazon.com.tr", accent: "#ff9900" },
  { name: "n11", domain: "n11.com", accent: "#6f2cff" },
  { name: "Çiçeksepeti", domain: "ciceksepeti.com", accent: "#6ab023" },
  { name: "PttAVM", domain: "pttavm.com", accent: "#00539b" },
  { name: "Pazarama", domain: "pazarama.com", accent: "#234cff" },
  { name: "Modanisa", domain: "modanisa.com", accent: "#12a5a0" },
  { name: "İdefix", domain: "idefix.com", accent: "#ff5a00" },
  { name: "Teknosa", domain: "teknosa.com", accent: "#f58220" },
  { name: "MediaMarkt", domain: "mediamarkt.com.tr", accent: "#df0000" },
  { name: "Vatan Bilgisayar", domain: "vatanbilgisayar.com", accent: "#005ba9" },
  { name: "İncehesap", domain: "incehesap.com", accent: "#ff7a00" },
  { name: "İtopya", domain: "itopya.com", accent: "#e60012" },
];

const faviconUrl = (domain) => `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

const buildServices = (lang) => SERVICE_DEFS.map((definition, index) => ({
  ...definition,
  ...SERVICE_COPY[lang][index],
  path: `/hizmetler/${definition.slug}`,
}));

function useRouter() {
  const readPath = () => window.location.pathname.replace(/\/+$/, "") || "/";
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const onPopState = () => {
      setPath(readPath());
      const hash = window.location.hash.replace("#", "");
      window.requestAnimationFrame(() => {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "instant" });
      });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [path]);

  const navigate = (nextPath) => {
    const target = new URL(nextPath, window.location.origin);
    const normalizedPath = target.pathname.replace(/\/+$/, "") || "/";
    if (`${target.pathname}${target.hash}` === `${window.location.pathname}${window.location.hash}`) {
      const id = target.hash.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.history.pushState({}, "", `${target.pathname}${target.hash}`);
    if (normalizedPath === path && target.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(target.hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      setPath(normalizedPath);
    }
  };

  return { path, navigate };
}

function updateSeo(path, lang, services) {
  const copy = COPY[lang];
  const service = services.find((item) => item.path === path);
  const pageNames = {
    "/": lang === "tr" ? "Marka Temsili, Distribütörlük ve Büyüme" : "Brand Representation, Distribution and Growth",
    "/hizmetler": copy.nav.services,
    "/cozumler": copy.nav.solutions,
    "/yaklasim": copy.nav.approach,
    "/hakkimizda": copy.nav.about,
    "/iletisim": copy.common.contact,
  };
  const title = service
    ? `${service.title} | ${BRAND_NAME}`
    : `${pageNames[path] || (lang === "tr" ? "Sayfa Bulunamadı" : "Page Not Found")} | ${BRAND_NAME}`;
  const description = service
    ? service.intro
    : lang === "tr"
      ? "DRK Aksesuar, global markaların Türkiye operasyonunu üstlenir; seçili yerel markalara distribütörlük, kanal, pazarlama ve büyüme çözümleri sunar."
      : "DRK Aksesuar leads Türkiye operations for global brands and provides selected local brands with distribution, channel, marketing and growth solutions.";

  document.documentElement.lang = lang;
  document.title = title;

  const setMeta = (selector, attribute, value) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      const [key, keyValue] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) || [];
      if (key) tag.setAttribute(key, keyValue);
      document.head.appendChild(tag);
    }
    tag.setAttribute(attribute, value);
  };

  setMeta('meta[name="description"]', "content", description);
  setMeta('meta[name="robots"]', "content", "index, follow, max-image-preview:large");
  setMeta('meta[property="og:title"]', "content", title);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[property="og:site_name"]', "content", BRAND_NAME);
  setMeta('meta[property="og:image"]', "content", `${window.location.origin}${LOGO_PATH}`);
  setMeta('meta[property="og:url"]', "content", `${window.location.origin}${path}`);
  setMeta('meta[name="twitter:title"]', "content", title);
  setMeta('meta[name="twitter:description"]', "content", description);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = `${window.location.origin}${path}`;
  document.head.querySelectorAll('link[rel="alternate"]').forEach((node) => node.remove());

  let structuredData = document.getElementById("drk-structured-data");
  if (!structuredData) {
    structuredData = document.createElement("script");
    structuredData.id = "drk-structured-data";
    structuredData.type = "application/ld+json";
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: BRAND_NAME,
        url: window.location.origin,
        logo: `${window.location.origin}${LOGO_PATH}`,
        description,
        email: CONTACT_EMAIL,
        areaServed: "Türkiye",
        sameAs: ["https://www.shargeturkiye.com/", "https://speedwa.com.tr", "http://dorukiletisim.com.tr/tr"],
        knowsAbout: [
          "Türkiye market entry",
          "Consumer technology distribution",
          "Brand representation",
          "E-commerce operations",
          "Retail channel management",
        ],
      },
      {
        "@type": service ? "Service" : "WebPage",
        name: service?.title || title,
        description,
        inLanguage: lang === "tr" ? "tr-TR" : "en",
      },
    ],
  });
}

function PageLink({ to, navigate, className = "", children, onClick, ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        if (
          event.button !== 0
          || event.metaKey
          || event.ctrlKey
          || event.shiftKey
          || event.altKey
        ) return;
        event.preventDefault();
        onClick?.();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Logo({ navigate, display = false, compact = false }) {
  return (
    <PageLink
      to="/"
      navigate={navigate}
      className={`brand ${display ? "brand--display" : ""} ${compact ? "brand--plain" : ""}`}
      aria-label={`${BRAND_NAME} ana sayfa`}
    >
      <span className="brand__mark">
        <img src={LOGO_PATH} alt="" width="1500" height="478" />
      </span>
    </PageLink>
  );
}

function LanguageSwitch({ lang, setLang, compact = false }) {
  return (
    <div className={`language-switch ${compact ? "language-switch--compact" : ""}`} aria-label="Language selection">
      <Languages size={13} aria-hidden="true" />
      {["tr", "en"].map((value) => (
        <button
          key={value}
          type="button"
          className={lang === value ? "active" : ""}
          aria-pressed={lang === value}
          onClick={() => setLang(value)}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Header({ path, navigate, lang, setLang }) {
  const copy = COPY[lang];
  const [open, setOpen] = useState(false);
  const navItems = [
    [copy.nav.services, "/hizmetler"],
    [copy.nav.solutions, "/cozumler"],
    [copy.nav.approach, "/yaklasim"],
    [copy.nav.about, "/hakkimizda"],
  ];

  useEffect(() => setOpen(false), [path]);

  return (
    <header className="header">
      <div className="shell header__inner">
        <Logo navigate={navigate} />
        <nav className={`nav-links ${open ? "nav-links--open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([label, target]) => (
            <PageLink
              key={target}
              to={target}
              navigate={navigate}
              className={path === target || path.startsWith(`${target}/`) ? "active" : ""}
            >
              {label}
            </PageLink>
          ))}
          <div className="mobile-language"><LanguageSwitch lang={lang} setLang={setLang} /></div>
          <PageLink to="/iletisim" navigate={navigate} className="mobile-contact">
            {copy.nav.contact} <ArrowRight size={15} />
          </PageLink>
        </nav>
        <LanguageSwitch lang={lang} setLang={setLang} compact />
        <PageLink to="/iletisim" navigate={navigate} className="button button--dark header__cta">
          {copy.nav.contact} <ArrowRight size={16} />
        </PageLink>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Footer({ navigate, lang, setLang }) {
  const copy = COPY[lang];
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__intro">
            <Logo navigate={navigate} compact />
            <p>{copy.common.footerLine}</p>
          </div>
          <div className="footer__links">
            <div>
              <small>{copy.common.discover.toUpperCase()}</small>
              <PageLink to="/hizmetler" navigate={navigate}>{copy.nav.services}</PageLink>
              <PageLink to="/cozumler" navigate={navigate}>{copy.nav.solutions}</PageLink>
              <PageLink to="/yaklasim" navigate={navigate}>{copy.nav.approach}</PageLink>
              <PageLink to="/hakkimizda" navigate={navigate}>{copy.nav.about}</PageLink>
            </div>
            <div>
              <small>{copy.common.contact.toUpperCase()}</small>
              <PageLink to="/iletisim" navigate={navigate}>{copy.common.projectForm}</PageLink>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span>{copy.common.location}</span>
              {setLang ? <LanguageSwitch lang={lang} setLang={setLang} /> : null}
            </div>
          </div>
        </div>
        <div className="footer__word"><Logo navigate={navigate} display /></div>
        <div className="footer__bottom">
          <span>{copy.common.rights}</span>
          <span>{copy.common.footerLine}</span>
        </div>
      </div>
    </footer>
  );
}

function CharacterRow({ services, navigate }) {
  return (
    <div className="characters" aria-label="DRK capability categories">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <PageLink
            key={service.slug}
            to={service.path}
            navigate={navigate}
            style={{ "--circle-color": service.soft }}
            aria-label={service.title}
          >
            <Icon size={23} />
            <small>{index + 1}</small>
          </PageLink>
        );
      })}
    </div>
  );
}

function NeedAnalyzer({ navigate, lang }) {
  const copy = COPY[lang].analyzer;
  const [selected, setSelected] = useState(0);
  const active = copy.options[selected];

  useEffect(() => setSelected(0), [lang]);

  return (
    <section className="need-analyzer" aria-label={copy.eyebrow}>
      <div className="need-analyzer__intro">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.text}</p>
      </div>
      <div className="need-analyzer__panel">
        <div className="need-analyzer__choices" role="tablist">
          {copy.options.map((option, index) => (
            <button
              key={option.label}
              type="button"
              className={selected === index ? "active" : ""}
              role="tab"
              aria-selected={selected === index}
              onClick={() => setSelected(index)}
            >
              <small>0{index + 1}</small>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        <article className="need-analyzer__result">
          <small>{copy.recommended}</small>
          <h3>{active.title}</h3>
          <p>{active.text}</p>
          <div>{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <PageLink to={active.path} navigate={navigate} className="button button--purple">
            {active.action} <ArrowRight size={17} />
          </PageLink>
        </article>
      </div>
    </section>
  );
}

function drawNetworkIcon(context, icon, x, y, size, color) {
  const scale = size / 24;
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);
  context.translate(-12, -12);
  context.strokeStyle = color;
  context.lineWidth = 1.8;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();

  if (icon === "palette") {
    context.ellipse(12, 12, 8, 7, -0.2, 0, Math.PI * 2);
    context.moveTo(17.5, 15.8);
    context.bezierCurveTo(16, 17.5, 13.5, 16.8, 14.2, 14.5);
  } else if (icon === "shopping") {
    context.roundRect(5.2, 8.4, 13.6, 11, 2);
    context.moveTo(8.4, 8.8);
    context.bezierCurveTo(8.4, 4.5, 15.6, 4.5, 15.6, 8.8);
  } else if (icon === "store") {
    context.moveTo(4, 9);
    context.lineTo(6.2, 5);
    context.lineTo(17.8, 5);
    context.lineTo(20, 9);
    context.moveTo(5.3, 10);
    context.lineTo(5.3, 19);
    context.lineTo(18.7, 19);
    context.lineTo(18.7, 10);
    context.moveTo(9.5, 19);
    context.lineTo(9.5, 13);
    context.lineTo(14.5, 13);
    context.lineTo(14.5, 19);
  } else if (icon === "target") {
    context.arc(11.2, 12.8, 6.7, 0, Math.PI * 2);
    context.moveTo(7.7, 12.8);
    context.arc(11.2, 12.8, 3.5, Math.PI, Math.PI * 3);
    context.moveTo(11.2, 12.8);
    context.lineTo(19.5, 4.5);
  } else if (icon === "chart") {
    context.moveTo(5, 19);
    context.lineTo(5, 6);
    context.moveTo(5, 19);
    context.lineTo(20, 19);
    context.moveTo(8, 16);
    context.lineTo(11, 12);
    context.lineTo(14, 14);
    context.lineTo(19, 7);
  } else {
    context.moveTo(12, 4.2);
    context.lineTo(18.2, 7.5);
    context.lineTo(12, 10.8);
    context.lineTo(5.8, 7.5);
    context.closePath();
    context.moveTo(5.8, 7.5);
    context.lineTo(5.8, 15);
    context.lineTo(12, 19);
    context.lineTo(18.2, 15);
    context.lineTo(18.2, 7.5);
    context.moveTo(12, 10.8);
    context.lineTo(12, 19);
  }

  context.stroke();
  context.restore();
}

function DistributionNetwork({ services, navigate, lang }) {
  const copy = COPY[lang].network;
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const groups = useMemo(() => services.map((service) => ({
    label: service.navTitle,
    icon: service.graphIcon,
    color: service.color,
    soft: service.soft,
    path: service.path,
    children: service.items,
  })), [services]);
  const skillCount = groups.reduce((sum, group) => sum + group.children.length, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let links = [];
    let hovered = null;
    let pointer = { x: -1000, y: -1000, active: false };
    let visible = true;
    let frame;
    let lastFrame = 0;
    const startedAt = performance.now();

    const buildGraph = () => {
      const minSide = Math.min(width, height);
      const center = {
        id: "drk",
        type: "center",
        baseX: width / 2,
        baseY: height / 2 + 22,
        x: width / 2,
        y: height / 2 + 22,
        radius: coarsePointer ? 37 : 50,
        phase: 0,
      };
      nodes = [center];
      links = [];
      const hubRadius = minSide * (coarsePointer ? 0.29 : 0.33);

      groups.forEach((group, groupIndex) => {
        const angle = -Math.PI / 2 + (groupIndex * Math.PI * 2) / groups.length;
        const hub = {
          id: `hub-${groupIndex}`,
          type: "hub",
          group: groupIndex,
          label: group.label,
          icon: group.icon,
          color: group.color,
          soft: group.soft,
          baseX: center.baseX + Math.cos(angle) * hubRadius,
          baseY: center.baseY + Math.sin(angle) * hubRadius * 0.82,
          radius: coarsePointer ? 15 : 20,
          phase: groupIndex * 0.9,
        };
        hub.x = hub.baseX;
        hub.y = hub.baseY;
        nodes.push(hub);
        links.push([center.id, hub.id]);

        group.children.forEach((label, childIndex) => {
          const spread = group.children.length > 6 ? 1.13 : 0.96;
          const childAngle = angle - spread / 2
            + (childIndex * spread) / Math.max(group.children.length - 1, 1);
          const childRadius = minSide * (coarsePointer ? 0.095 : 0.12) + (childIndex % 2) * 8;
          const child = {
            id: `child-${groupIndex}-${childIndex}`,
            type: "child",
            group: groupIndex,
            childIndex,
            label,
            color: group.color,
            soft: group.soft,
            baseX: hub.baseX + Math.cos(childAngle) * childRadius,
            baseY: hub.baseY + Math.sin(childAngle) * childRadius * 0.8,
            radius: coarsePointer ? 4.7 : 6.2,
            phase: groupIndex * 0.7 + childIndex * 1.25,
          };
          child.x = child.baseX;
          child.y = child.baseY;
          nodes.push(child);
          links.push([hub.id, child.id]);
        });
      });

      [[0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [4, 5]].forEach(([from, to]) => {
        links.push([`hub-${from}`, `hub-${to}`]);
      });
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGraph();
    };

    const findNode = (id) => nodes.find((node) => node.id === id);
    const isConnected = (from, to) => {
      if (!hovered) return false;
      if (from.id === hovered.id || to.id === hovered.id) return true;
      return hovered.type === "hub" && from.group === hovered.group && to.group === hovered.group;
    };

    const draw = (now) => {
      if (!visible || (!reducedMotion && now - lastFrame < 32)) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;
      const elapsed = (now - startedAt) / 1000;
      context.clearRect(0, 0, width, height);

      context.fillStyle = "rgba(31, 35, 67, 0.06)";
      for (let x = 18; x < width; x += 24) {
        for (let y = 18; y < height; y += 24) {
          context.beginPath();
          context.arc(x, y, 0.7, 0, Math.PI * 2);
          context.fill();
        }
      }

      nodes.forEach((node) => {
        if (node.type === "center") return;
        const drift = reducedMotion ? 0 : Math.sin(elapsed * 0.65 + node.phase) * (node.type === "hub" ? 3.2 : 2.2);
        let targetX = node.baseX + Math.cos(node.phase) * drift;
        let targetY = node.baseY + Math.sin(node.phase * 1.4) * drift;

        if (pointer.active && !coarsePointer) {
          const dx = targetX - pointer.x;
          const dy = targetY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 115 && distance > 0) {
            const force = (1 - distance / 115) * (node.type === "hub" ? 14 : 22);
            targetX += (dx / distance) * force;
            targetY += (dy / distance) * force;
          }
        }

        node.x += (targetX - node.x) * (reducedMotion ? 1 : 0.085);
        node.y += (targetY - node.y) * (reducedMotion ? 1 : 0.085);
      });

      links.forEach(([fromId, toId]) => {
        const from = findNode(fromId);
        const to = findNode(toId);
        if (!from || !to) return;
        const active = isConnected(from, to);
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = active
          ? `${groups[hovered?.group ?? 0]?.color || "#242746"}aa`
          : "rgba(31, 35, 67, 0.15)";
        context.lineWidth = active ? 1.6 : 0.8;
        context.stroke();
      });

      nodes.forEach((node) => {
        const isHovered = hovered?.id === node.id;
        const activeGroup = hovered?.type === "hub" && hovered.group === node.group;
        const radius = node.radius + (isHovered ? 4 : 0);

        if (node.type === "center") {
          const pulse = reducedMotion ? 0 : Math.sin(elapsed * 1.8) * 2;
          context.beginPath();
          context.arc(node.x, node.y, radius + 13 + pulse, 0, Math.PI * 2);
          context.fillStyle = "rgba(35, 39, 72, 0.1)";
          context.fill();
        } else if (node.type === "hub") {
          context.beginPath();
          context.arc(node.x, node.y, radius + (activeGroup ? 9 : 5), 0, Math.PI * 2);
          context.fillStyle = activeGroup ? `${node.color}20` : "rgba(255, 255, 255, 0.82)";
          context.fill();
        }

        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fillStyle = node.type === "center" ? "#20233f" : node.soft;
        context.fill();
        context.strokeStyle = node.type === "center"
          ? "#20233f"
          : isHovered || activeGroup
            ? node.color
            : "#252842";
        context.lineWidth = node.type === "child" ? 1 : 1.7;
        context.stroke();

        if (node.type === "center") {
          context.fillStyle = "#ffffff";
          context.font = `800 ${coarsePointer ? 14 : 18}px Manrope`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText("DRK", node.x, node.y - 5);
          context.fillStyle = "#84dc7f";
          context.font = "800 6.5px Manrope";
          context.fillText(copy.center, node.x, node.y + 14);
        } else if (node.type === "hub") {
          const onLeft = node.x < width / 2;
          const nearCenter = Math.abs(node.x - width / 2) < (coarsePointer ? 35 : 48);
          drawNetworkIcon(
            context,
            node.icon,
            node.x,
            node.y,
            coarsePointer ? 14 : 18,
            isHovered || activeGroup ? node.color : "#20233f",
          );
          context.fillStyle = isHovered || activeGroup ? node.color : "#343754";
          context.font = `${isHovered || activeGroup ? 800 : 700} ${coarsePointer ? 7.5 : 9}px Manrope`;
          context.textAlign = nearCenter ? "center" : onLeft ? "right" : "left";
          context.textBaseline = "middle";
          context.fillText(
            node.label,
            nearCenter ? node.x : node.x + (onLeft ? -radius - 7 : radius + 7),
            nearCenter ? node.y + radius + (coarsePointer ? 9 : 11) : node.y,
          );
        } else if (
          !coarsePointer
          && ((hovered?.type === "hub" && hovered.group === node.group) || isHovered)
        ) {
          const hub = findNode(`hub-${node.group}`);
          const dx = node.x - hub.x;
          const dy = node.y - hub.y;
          const distance = Math.hypot(dx, dy) || 1;
          const ux = dx / distance;
          const uy = dy / distance;
          const labelDistance = 13 + (node.childIndex % 2) * 9;
          context.fillStyle = isHovered ? node.color : "#4f5267";
          context.font = `${isHovered ? 800 : 700} 8px Manrope`;
          context.textAlign = ux > 0.25 ? "left" : ux < -0.25 ? "right" : "center";
          context.textBaseline = uy > 0.35 ? "top" : uy < -0.35 ? "bottom" : "middle";
          context.fillText(node.label, node.x + ux * labelDistance, node.y + uy * labelDistance);
        }
      });

      frame = requestAnimationFrame(draw);
    };

    const pickClosestNode = () => {
      let closest = null;
      let distanceToClosest = Infinity;
      nodes.forEach((node) => {
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        const hitArea = node.type === "child" ? 21 : node.radius + 13;
        if (distance < hitArea && distance < distanceToClosest) {
          closest = node;
          distanceToClosest = distance;
        }
      });
      return closest;
    };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      hovered = pickClosestNode();
      canvas.style.cursor = hovered ? "pointer" : "default";
      if (!tooltipRef.current) return;
      tooltipRef.current.classList.toggle("visible", Boolean(hovered));
      const group = hovered?.group !== undefined ? groups[hovered.group] : null;
      tooltipRef.current.textContent = hovered?.type === "center"
        ? (lang === "tr" ? "DRK · Hizmet mimarisi" : "DRK · Service architecture")
        : hovered?.type === "hub"
          ? `${hovered.label} · ${lang === "tr" ? "detayları aç" : "open details"}`
          : hovered
            ? `${hovered.label} · ${group.label}`
            : "";
      tooltipRef.current.style.transform = `translate3d(${pointer.x + 18}px, ${pointer.y - 28}px, 0)`;
    };

    const clearPointer = () => {
      pointer.active = false;
      hovered = null;
      canvas.style.cursor = "default";
      tooltipRef.current?.classList.remove("visible");
    };

    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      const target = pickClosestNode();
      if (!target) return;
      if (target.type === "center") {
        navigate("/hizmetler");
        return;
      }
      const group = groups[target.group];
      if (group?.path) navigate(group.path);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { rootMargin: "120px" });
    resizeObserver.observe(wrapper);
    intersectionObserver.observe(wrapper);
    canvas.addEventListener("pointermove", updatePointer, { passive: true });
    canvas.addEventListener("pointerleave", clearPointer);
    canvas.addEventListener("click", handleClick);
    resize();
    frame = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(frame);
    };
  }, [copy.center, groups, lang, navigate]);

  return (
    <section className="growth-graph distribution-network" ref={wrapperRef}>
      <div className="growth-graph__header">
        <div><span><i /> {copy.live}</span><strong>{copy.title}</strong></div>
        <small>{skillCount} · {copy.hint}</small>
      </div>
      <canvas
        ref={canvasRef}
        aria-label={lang === "tr" ? "DRK merkezli hizmet ve yetenek ağı" : "DRK service and capability network"}
      />
      <span className="growth-graph__tooltip" ref={tooltipRef} aria-hidden="true" />
      <p className="sr-only">
        {services.map((service) => `${service.title}: ${service.items.join(", ")}`).join(". ")}
      </p>
    </section>
  );
}

function EcosystemStrip({ lang }) {
  const copy = COPY[lang].ecosystem;
  return (
    <section className="ecosystem" aria-label={copy.label}>
      <div className="shell">
        <p>{copy.label}</p>
        <div>{copy.items.map((item) => <span key={item}>{item}<CircleDot size={8} /></span>)}</div>
      </div>
    </section>
  );
}

function FlagshipOperations({ lang }) {
  const copy = COPY[lang].flagship;
  return (
    <section className="section flagship-operations" id="amiral-operasyonlar">
      <div className="shell">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} text={copy.text} />
        <div className="flagship-operations__grid">
          {copy.items.map((item, index) => {
            const company = PORTFOLIO_BY_NAME.get(item.brand);
            const Icon = FLAGSHIP_OPERATION_ICONS[index];
            return (
              <article
                className={`flagship-operation ${item.brand === "Sharge" ? "flagship-operation--sharge" : ""}`}
                key={item.id}
                style={{
                  "--operation-accent": company?.branding?.accent || "#252a52",
                  "--operation-surface": company?.branding?.surface || "#f5f7fb",
                }}
              >
                <div className="flagship-operation__head">
                  <span className="flagship-operation__logo">
                    <BrandWordmark company={company} wordmark={company?.wordmark} name={item.brand} />
                  </span>
                  <span className="flagship-operation__period"><Icon size={14} /> {item.period}</span>
                </div>
                <small>{item.channel}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="flagship-operation__tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            );
          })}
        </div>
        <p className="flagship-operations__legacy"><Sparkles size={15} /> {copy.legacy}</p>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text, center = false }) {
  return (
    <div className={`section-heading ${center ? "section-heading--center" : ""}`}>
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ArrowLink({ to, navigate, children, light = false }) {
  return (
    <PageLink to={to} navigate={navigate} className={`arrow-link ${light ? "arrow-link--light" : ""}`}>
      {children} <ArrowRight size={17} />
    </PageLink>
  );
}

function ServiceCard({ service, navigate, lang, compact = false }) {
  const Icon = service.icon;
  return (
    <PageLink
      to={service.path}
      navigate={navigate}
      className={`service-card tone-${service.tone} ${compact ? "service-card--compact" : ""}`}
      style={{ "--service-accent": service.color, "--service-soft": service.soft, "--service-rgb": service.rgb }}
      aria-label={service.title}
    >
      <div className="service-card__top">
        <span className="round-icon"><Icon size={22} /></span>
        <small>{service.number}</small>
      </div>
      <div className="service-card__copy">
        <h3>{service.title}</h3>
        <p>{service.short}</p>
        <div className="tags">{service.items.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
        <span className="service-card__link">{COPY[lang].common.detail} <ArrowRight size={15} /></span>
      </div>
    </PageLink>
  );
}

// ---------------------------------------------------------------------------
// PORTFOLIO PREVIEW EXPERIENCE (modular, reusable for DRK Group companies)
// ---------------------------------------------------------------------------

const IMMERSIVE_ID = "portfolio-immersive";

// Outbound links: always new tab + noopener/noreferrer, clearly separated
// from the rest of the card so users are never sent off-site by accident.
function OutboundLink({ href, className = "", children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}

// Brand wordmarks. Samsung/Sharge reuse their existing styled marks so their
// identity is untouched; SpeedWA is a themeable wordmark (white on dark, navy
// on light) with a controlled orange tick accent.
// Brand identity: real logo when we have one, otherwise the brand's *name* set
// in clean type. We never fabricate a logo from initials.
function BrandWordmark({ company, wordmark, name }) {
  if (wordmark === "speedwa") {
    return (
      <span className="pf-wordmark" role="img" aria-label={name}>
        <span className="pf-wordmark__a">SPEED</span>
        <span className="pf-wordmark__b">WA</span>
        <i className="pf-wordmark__tick" aria-hidden="true" />
      </span>
    );
  }
  if (wordmark === "sharge") {
    return (
      <span className="pf-wordmark pf-wordmark--sharge" role="img" aria-label={name}>
        <Zap className="pf-wordmark__bolt" size={17} aria-hidden="true" />
        <span className="pf-wordmark__a">SHARGE</span>
      </span>
    );
  }
  const branding = company?.branding;
  if (branding?.logo) {
    return (
      <span className="brand-identity has-image" role="img" aria-label={`${name} logo`}>
        <img
          className="brand-identity__image"
          src={branding.logo}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.hidden = true;
            event.currentTarget.parentElement.dataset.logoError = "true";
          }}
        />
        <strong>{name}</strong>
      </span>
    );
  }
  return (
    <span className="brand-identity" role="img" aria-label={name}>
      <strong>{name}</strong>
    </span>
  );
}

function PortfolioCategoryTabs({ categories, active, onChange, lang, label }) {
  return (
    <div className="pf-tabs" role="tablist" aria-label={label}>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="tab"
          aria-selected={active === category.id}
          className={`pf-tab ${active === category.id ? "pf-tab--active" : ""}`}
          onClick={() => onChange(category.id)}
        >
          {category.label[lang]}
        </button>
      ))}
    </div>
  );
}

function PortfolioProductCard({ product, lang, inspectLabel }) {
  return (
    <article className="pf-product">
      <div className="pf-product__media">
        <img
          src={product.image}
          alt={product.alt[lang]}
          loading="lazy"
          decoding="async"
          width="600"
          height="600"
        />
        <span className="pf-product__spec">{product.spec[lang]}</span>
      </div>
      <div className="pf-product__body">
        <span className="pf-product__brand">{product.brand}</span>
        <h4 className="pf-product__name">{product.name}</h4>
        <div className="pf-product__foot">
          <span className="pf-product__price">{product.price}</span>
          <OutboundLink
            href={product.url}
            className="pf-product__cta"
            aria-label={`${product.name} — ${inspectLabel}`}
          >
            {inspectLabel} <ArrowUpRight size={14} />
          </OutboundLink>
        </div>
      </div>
    </article>
  );
}

// The small premium teaser preview that grows from the card on hover / focus /
// tap. Not a tooltip — a layered mini web-preview.
function PortfolioPreviewPopover({ company, lang, id, open }) {
  const t = company.copy[lang];
  const featured = getFeaturedProduct(company);
  const mini = company.products.filter((product) => product.id !== featured.id).slice(0, 2);
  const chips = company.categories.filter((category) => category.id !== "all");
  return (
    <div
      className="pf-pop"
      id={id}
      role="group"
      aria-label={`${company.name} ${t.kicker}`}
      aria-hidden={open ? undefined : "true"}
    >
      <span className="pf-pop__glow" aria-hidden="true" />
      <div className="pf-pop__bar">
        <BrandWordmark company={company} wordmark={company.wordmark} name={company.name} />
        <small><i className="pf-live-dot" /> {t.kicker}</small>
      </div>
      <div className="pf-pop__hero">
        <div className="pf-pop__hero-media">
          <img
            src={featured.image}
            alt={featured.alt[lang]}
            loading="lazy"
            decoding="async"
            width="300"
            height="300"
          />
        </div>
        <div className="pf-pop__hero-copy">
          <strong>{featured.name}</strong>
          <span>{featured.spec[lang]}</span>
        </div>
      </div>
      <div className="pf-pop__chips" aria-hidden="true">
        {chips.map((category) => (
          <span key={category.id}>{category.label[lang]}</span>
        ))}
      </div>
      <div className="pf-pop__mini">
        {mini.map((product) => (
          <div className="pf-pop__mini-item" key={product.id}>
            <img src={product.image} alt="" loading="lazy" decoding="async" width="120" height="120" />
            <b>{product.brand}</b>
            <i>{product.spec[lang]}</i>
          </div>
        ))}
      </div>
      <OutboundLink href={company.website} className="pf-btn pf-btn--accent pf-pop__cta" tabIndex={open ? undefined : -1}>
        {t.exploreFull} <ArrowUpRight size={14} />
      </OutboundLink>
    </div>
  );
}

function PortfolioCompanyCard({ company, lang, onOpenOverlay, onSelectReach, portfolioCopy }) {
  const t = company.copy[lang];
  const featured = company.immersive ? getFeaturedProduct(company) : null;
  const branding = company.branding;
  const accent = branding?.accent || company.colors?.accent || (company.kind === "brand" ? "#252a52" : "#68708f");

  return (
    <article
      className={`pf-card pf-card--directory ${company.immersive ? "pf-card--live" : "pf-card--simple"}`}
      style={{
        "--brand-accent": accent,
        "--brand-accent-strong": branding?.accentStrong || company.colors?.accentStrong || accent,
        "--brand-accent-soft": company.colors?.accentSoft || "rgba(37, 42, 82, 0.10)",
        "--brand-deep": branding?.ink || company.colors?.deep || "#171a34",
        "--brand-surface": branding?.surface || "#ffffff",
        "--brand-surface-alt": branding?.surfaceAlt || "#ffffff",
        "--brand-ink": branding?.ink || "#20233f",
        "--brand-muted": branding?.muted || "#6a6d7e",
      }}
    >
      <div className="pf-card__head">
        <small>{t.status}</small>
        {company.immersive ? <span className="pf-card__live"><i className="pf-live-dot" /> {t.kicker}</span> : null}
      </div>
      <div className="pf-card__mark">
        <BrandWordmark company={company} wordmark={company.wordmark} name={company.name} />
      </div>
      <p className="pf-card__desc">{t.short}</p>
      {featured ? (
        <div className="pf-card__media" aria-hidden="true">
          <img src={featured.image} alt="" loading="lazy" decoding="async" width="400" height="400" />
          <span className="pf-card__media-glow" />
        </div>
      ) : null}
      <div className="pf-card__actions pf-card__actions--directory">
        {onOpenOverlay ? (
          <button type="button" className="pf-card__explore" onClick={onOpenOverlay}>
            <Layers3 size={14} /> {portfolioCopy.previewAction}
          </button>
        ) : null}
        {onSelectReach ? (
          <button type="button" className="pf-card__network" onClick={() => onSelectReach(company.reachId || "drk")}>
            <MapPin size={14} /> {portfolioCopy.reachAction}
          </button>
        ) : null}
        <OutboundLink href={company.website} className="pf-card__site" aria-label={`${company.name} — ${portfolioCopy.websiteAction}`}>
          {company.immersive ? portfolioCopy.websiteAction : t.soon} <ArrowUpRight size={15} />
        </OutboundLink>
      </div>
    </article>
  );
}

const CATEGORY_ICON = {
  power: Zap,
  battery: BatteryCharging,
  plug: Plug,
  audio: Volume2,
  case: Smartphone,
  watch: Watch,
  memory: HardDrive,
  accessory: Cable,
};

// Rotating hero banner slider — uses SpeedWA's real homepage banners.
function SpeedwaHero({ banners, lang }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % banners.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [banners.length]);

  return (
    <div className="sw-hero">
      <div className="sw-hero__frame">
        {banners.map((banner, idx) => (
          <img
            key={banner.image}
            src={banner.image}
            alt={banner.alt[lang]}
            className={`sw-hero__img ${idx === index ? "is-active" : ""}`}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            width="1600"
            height="714"
          />
        ))}
        <span className="sw-hero__shade" aria-hidden="true" />
      </div>
      <div className="sw-hero__dots">
        {banners.map((banner, idx) => (
          <button
            key={banner.image}
            type="button"
            className={idx === index ? "is-active" : ""}
            aria-label={`${idx + 1}`}
            aria-current={idx === index}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// A full, premium mini-website representing SpeedWA — reinterpreted in the DRK
// design language while keeping SpeedWA's navy/orange identity. Real chrome:
// announcement bar, header + nav, hero banner, category tiles, product grid,
// footer. Designed to fit the expanded window; scrolls in the mobile overlay.
function SpeedwaSite({ company, lang }) {
  const t = company.copy[lang];
  const featured = getFeaturedProduct(company);
  const siteHost = company.website.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  return (
    <div className="sw" style={company.siteTheme}>
      <div className="sw__announce">
        {t.announce.map((item, idx) => (
          <span key={item}>
            {idx > 0 ? <i className="sw__announce-dot" aria-hidden="true" /> : null}
            {item}
          </span>
        ))}
      </div>

      <header className="sw__header">
        <BrandWordmark company={company} wordmark={company.wordmark} name={company.name} />
        <nav className="sw__nav" aria-label={`${company.name} ${t.categoriesLabel}`}>
          {company.siteCategories.map((category) => (
            <OutboundLink key={category.id} href={category.url}>{category.label[lang]}</OutboundLink>
          ))}
        </nav>
        <div className="sw__tools">
          <span className="sw__search" aria-hidden="true">
            <Search size={14} />
            <em>{t.searchPlaceholder}</em>
          </span>
          <span className="sw__icon-btn" aria-hidden="true"><Heart size={16} /></span>
          <span className="sw__icon-btn sw__icon-btn--cart" aria-hidden="true"><ShoppingBag size={16} /><i>0</i></span>
          <OutboundLink href={company.website} className="sw__go">
            {t.goSite} <ArrowUpRight size={13} />
          </OutboundLink>
        </div>
      </header>

      <div className="sw__scroll">
        <section className="sw__hero">
          <div className="sw__hero-text">
            <span className="sw-eyebrow">{t.kicker}</span>
            <h1>{t.heroLead}</h1>
            <p>{t.heroSub}</p>
            <div className="sw__hero-cta">
              <OutboundLink href={company.website} className="sw__hero-btn">{t.heroCtaShop}</OutboundLink>
              <OutboundLink href={company.website} className="sw__hero-more">
                {t.seeAll} <ArrowRight size={15} />
              </OutboundLink>
            </div>
            <div className="sw__hero-trust">
              {t.trust.map((item, idx) => {
                const Icon = [Truck, Zap, ShieldCheck][idx] || ShieldCheck;
                return <span key={item[0]}><Icon size={14} /> {item[0]}</span>;
              })}
            </div>
          </div>
          <div className="sw__hero-media">
            <span className="sw__hero-glow" aria-hidden="true" />
            <img
              src={featured.image}
              alt={featured.alt[lang]}
              loading="eager"
              decoding="async"
              width="720"
              height="720"
            />
            <div className="sw__hero-badge">{featured.spec[lang]}</div>
          </div>
        </section>

        <div className="sw__cats" aria-label={t.categoriesLabel}>
          {company.siteCategories.map((category) => {
            const Icon = CATEGORY_ICON[category.icon] || Zap;
            return (
              <OutboundLink key={category.id} href={category.url} className="sw__cat">
                <span className="sw__cat-ic"><Icon size={17} /></span>
                <b>{category.label[lang]}</b>
              </OutboundLink>
            );
          })}
        </div>

        <section className="sw__products">
          <div className="sw__products-head">
            <div>
              <span className="sw-eyebrow">{company.name}</span>
              <h3>{t.productsLabel}</h3>
            </div>
            <p>{t.productsHint}</p>
          </div>
          <div className="sw__grid">
            {company.products.map((product) => (
              <PortfolioProductCard key={product.id} product={product} lang={lang} inspectLabel={t.inspect} />
            ))}
          </div>
        </section>

        <footer className="sw__footer">
          <div className="sw__footer-main">
            <div className="sw__footer-brand">
              <BrandWordmark company={company} wordmark={company.wordmark} name={company.name} />
              <p>{t.footerTagline}</p>
              <div className="sw__trust">
                {t.trust.map((item, idx) => {
                  const Icon = [Truck, Zap, ShieldCheck][idx] || ShieldCheck;
                  return (
                    <span key={item[0]}>
                      <Icon size={15} />
                      <b>{item[0]}</b>
                      <i>{item[1]}</i>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="sw__footer-cols">
              <div>
                <small>{t.footerColsTitle[0]}</small>
                {t.footerCorporate.map((label) => (
                  <OutboundLink key={label} href={company.website}>{label}</OutboundLink>
                ))}
              </div>
              <div>
                <small>{t.footerColsTitle[1]}</small>
                {company.siteCategories.slice(0, 4).map((category) => (
                  <OutboundLink key={category.id} href={category.url}>{category.label[lang]}</OutboundLink>
                ))}
              </div>
              <div>
                <small>{t.footerColsTitle[2]}</small>
                {t.footerSupport.map((label) => (
                  <OutboundLink key={label} href={company.website}>{label}</OutboundLink>
                ))}
              </div>
            </div>
          </div>
          <div className="sw__footer-bottom">
            <span>{t.footerNote} <OutboundLink href={company.website}>{siteHost}</OutboundLink></span>
            <OutboundLink href={company.website} className="pf-btn pf-btn--accent">
              {t.visitSite} <ArrowUpRight size={14} />
            </OutboundLink>
          </div>
        </footer>
      </div>
    </div>
  );
}

const REEL_COPY = {
  tr: {
    label: "Marka web deneyimleri",
    eyebrow: "İNTERAKTİF PORTFÖY",
    title: "Markalarımızın dijital dünyalarını keşfedin.",
    text: "Yana sürükleyerek 3D silindir etrafında gezinin. Seçtiğiniz deneyime yalnızca düğmeyle girin; aynı düğme alanından kolayca çıkın.",
    hint: "Yana sürükleyin",
    prev: "Önceki marka",
    next: "Sonraki marka",
    expand: "Deneyime gir",
    close: "Deneyimden çık",
    visit: "Resmi web sitesine git",
    portfolio: "Portföy şirketi",
  },
  en: {
    label: "Brand web experiences",
    eyebrow: "INTERACTIVE PORTFOLIO",
    title: "Explore the digital worlds of our brands.",
    text: "Swipe sideways around the 3D cylinder. Enter the selected experience only with the button and leave it from the same clear control area.",
    hint: "Swipe sideways",
    prev: "Previous brand",
    next: "Next brand",
    expand: "Enter experience",
    close: "Exit experience",
    visit: "Visit official website",
    portfolio: "Portfolio company",
  },
};

// Brand panel for companies WITHOUT a product feed: instead of fake product
// cards it presents a real brand profile — the brand's own description, DRK's
// role, and a clear link to the official site. (SpeedWA, which has a real
// product catalogue, renders the full SpeedwaSite instead.)
function PortfolioBrandPanel({ company, lang }) {
  const t = company.copy[lang];
  const branding = company.branding;
  const isGroup = company.kind === "group";
  const relEyebrow = isGroup
    ? (lang === "tr" ? "DORUK GRUP EKOSİSTEMİ" : "DORUK GROUP ECOSYSTEM")
    : (lang === "tr" ? "DRK AKSESUAR · TÜRKİYE OPERASYONU" : "DRK AKSESUAR · TÜRKİYE OPERATIONS");
  // Prefer brand-specific profile content; fall back to a generic role
  // narrative so every panel reads differently instead of sharing one text.
  const profile = company.profile?.[lang];
  const facts = profile?.facts
    ?? (isGroup
      ? (lang === "tr"
        ? ["Doruk Grup ekosistemi", "Kurumsal iş birliği", "Uçtan uca ticari operasyon"]
        : ["Doruk Group ecosystem", "Corporate partnership", "End-to-end commercial operations"])
      : (lang === "tr"
        ? ["Türkiye pazar operasyonu", "Resmi kanal & satış yönetimi", "Satış, lojistik ve satış sonrası"]
        : ["Türkiye market operations", "Official channel & sales", "Sales, logistics & after-sales"]));
  const storyTitle = profile?.story
    ?? (isGroup
      ? (lang === "tr" ? "Doruk Grup bünyesinde uçtan uca ticari deneyim." : "End-to-end commercial experience within Doruk Group.")
      : (lang === "tr"
        ? "Bu markanın Türkiye pazarındaki operasyonunu DRK Aksesuar yürütüyor."
        : "DRK Aksesuar runs this brand's operations in the Türkiye market."));
  const storyNote = profile?.note
    ?? (isGroup
      ? (lang === "tr"
        ? "Doruk Grup ekosisteminde uçtan uca ticari operasyon ve iş birliği."
        : "End-to-end commercial operations and collaboration within the Doruk Group ecosystem.")
      : (lang === "tr"
        ? "Bu markanın Türkiye pazarındaki satış ve operasyon süreçleri DRK Aksesuar tarafından yürütülüyor."
        : "This brand's Türkiye sales and operations are run by DRK Aksesuar."));
  return (
    <div
      className="pf-site-preview pf-site-preview--profile"
      style={{
        "--brand-surface": branding?.surface,
        "--brand-surface-alt": branding?.surfaceAlt,
        "--brand-ink": branding?.ink,
        "--brand-muted": branding?.muted,
        "--brand-accent": branding?.accent,
        "--brand-accent-strong": branding?.accentStrong,
      }}
    >
      <header className="pf-site-preview__header">
        <BrandWordmark company={company} wordmark={company.wordmark} name={company.name} />
        <OutboundLink href={company.website} className="pf-site-preview__gohome">
          {t.soon} <ArrowUpRight size={14} />
        </OutboundLink>
      </header>
      <div className="pf-site-preview__scroll">
        <section className="pf-site-preview__hero">
          <div className="pf-site-preview__hero-copy">
            <span>{relEyebrow}</span>
            <h2>{company.name}</h2>
            <p>{t.short}</p>
            <OutboundLink href={company.website} className="pf-site-preview__cta">
              {t.soon} <ArrowUpRight size={15} />
            </OutboundLink>
          </div>
          <div className="pf-site-preview__logo" aria-hidden="true">
            <span className="pf-site-preview__halo" />
            {branding?.logo
              ? <img src={branding.logo} alt="" loading="lazy" decoding="async" />
              : <strong>{company.name}</strong>}
          </div>
        </section>
        <section className="pf-site-preview__facts">
          {facts.map((fact, index) => (
            <article key={fact}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{fact}</p>
            </article>
          ))}
        </section>
        {company.marketplaces ? (
          <section className="pf-site-preview__markets">
            <span className="pf-site-preview__markets-label">
              {lang === "tr" ? "Yönettiğimiz Türkiye pazaryerleri" : "Türkiye marketplaces we operate"}
            </span>
            <div className="pf-site-preview__markets-grid">
              {company.marketplaces.map((market) => (
                <span className="pf-market-chip" key={market.name}>
                  <img src={faviconUrl(market.domain)} alt="" loading="lazy" decoding="async" />
                  <b>{market.name}</b>
                </span>
              ))}
            </div>
          </section>
        ) : null}
        <section className="pf-site-preview__story">
          <span>{isGroup ? "Doruk Grup" : "DRK Aksesuar"}</span>
          <h3>{storyTitle}</h3>
          <p>{storyNote}</p>
        </section>
        <footer className="pf-site-preview__footer">
          <BrandWordmark company={company} wordmark={company.wordmark} name={company.name} />
          <span>© 2026 · {company.name}</span>
        </footer>
      </div>
    </div>
  );
}

// Memoised so a drag (which only re-renders the reel wrapper to update panel
// transforms) never re-renders the heavy site/brand DOM inside each panel.
const SpeedwaSiteMemo = memo(SpeedwaSite);
const PortfolioBrandPanelMemo = memo(PortfolioBrandPanel);

function PortfolioReel({ companies, lang, initialIndex = 0, onExit, onExpand, fullscreen = false }) {
  const labels = REEL_COPY[lang];
  const stageRef = useRef(null);
  const dragRef = useRef(null);
  const wheelRef = useRef(0);
  const suppressClickRef = useRef(false);
  const [active, setActive] = useState(initialIndex);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const n = companies.length;
  const mod = (value) => ((value % n) + n) % n;
  const go = (direction) => {
    setDragX(0);
    setDragging(false);
    setActive((value) => mod(value + direction));
  };

  useEffect(() => { setActive(mod(initialIndex)); }, [initialIndex, n]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 16) return;
      event.preventDefault();
      const now = performance.now();
      if (now - wheelRef.current < 430) return;
      wheelRef.current = now;
      go(event.deltaX > 0 ? 1 : -1);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    // Start tracking a potential drag anywhere on the stage — including over the
    // live site's links/buttons. We do NOT preventDefault here and do NOT bail on
    // interactive targets, so a genuine tap (movement < threshold) still clicks.
    // The gesture is only hijacked once horizontal movement crosses the threshold
    // (see onPointerMove), at which point the follow-up click is suppressed.
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      axis: null,
    };
  };

  const onClickCapture = (event) => {
    // Swallow the click that ends a real horizontal drag so links/buttons inside
    // the active site don't fire when the user was actually swiping the reel.
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickRef.current = false;
    }
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) * 1.1 ? "x" : "y";
      if (drag.axis === "y") { dragRef.current = null; return; }
      setDragging(true);
      // Past the threshold this is a horizontal drag, not a click: capture the
      // pointer for 1:1 tracking and mark the follow-up click for suppression.
      suppressClickRef.current = true;
      stageRef.current?.focus({ preventScroll: true });
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    if (drag.axis !== "x") return;
    if (event.cancelable) event.preventDefault();
    const now = performance.now();
    drag.velocity = (event.clientX - drag.lastX) / Math.max(1, now - drag.lastT);
    drag.lastX = event.clientX;
    drag.lastT = now;
    const width = stageRef.current?.clientWidth || 1000;
    setDragX(Math.max(-width * 0.62, Math.min(width * 0.62, dx)));
  };

  const settleDrag = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    setDragging(false);
    if (!drag || drag.axis !== "x") { setDragX(0); return; }
    const width = stageRef.current?.clientWidth || 1000;
    if (Math.abs(dragX) > width * 0.17 || Math.abs(drag.velocity) > 0.48) {
      go(dragX < 0 ? 1 : -1);
    } else {
      setDragX(0);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
    if (event.key === "Escape" && onExit) { event.preventDefault(); onExit(); }
  };

  const stageWidth = stageRef.current?.clientWidth || 1000;
  const progress = dragX / Math.max(stageWidth, 1);
  // Continuous position. Dragging right (progress > 0) rotates toward the
  // previous brand. Every brand is a STABLE panel (keyed by id) so changing the
  // active index only re-targets each panel's transform — the CSS transition
  // then animates it, instead of the panels remounting and hard-cutting.
  const activeFloat = active - progress;
  const cyclic = (raw) => {
    let offset = ((raw % n) + n) % n;
    if (offset > n / 2) offset -= n;
    return offset;
  };

  return (
    <div
      className={`pf-cyl pf-cyl--stable ${fullscreen ? "pf-cyl--fullscreen" : ""} ${dragging ? "is-dragging" : ""}`}
      ref={stageRef}
      tabIndex="0"
      role="region"
      aria-label={labels.label}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={settleDrag}
      onPointerCancel={settleDrag}
      onLostPointerCapture={settleDrag}
      onClickCapture={onClickCapture}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="pf-cyl__stage">
        {companies.map((company, index) => {
          const offset = cyclic(index - activeFloat);
          const abs = Math.abs(offset);
          const clamped = Math.min(abs, 1.25);
          const near = abs <= 2;
          const isActive = abs < 0.5;
          const style = {
            "--slot-x": `${offset * 72}%`,
            "--slot-z": `${-clamped * 320}px`,
            "--slot-r": `${offset * -52}deg`,
            "--slot-scale": Math.max(0.86, 1 - clamped * 0.09),
            "--slot-opacity": abs > 1.6 ? 0 : Math.max(0.3, 1 - clamped * 0.3),
            "--slot-shade": Math.min(0.34, clamped * 0.28),
            zIndex: Math.round(100 - clamped * 30),
            visibility: near ? "visible" : "hidden",
          };
          return (
            <div
              className={`pf-cyl__panel ${isActive ? "is-active" : ""}`}
              key={company.id}
              style={style}
              role={isActive ? "tabpanel" : undefined}
              aria-label={isActive ? company.name : undefined}
              aria-hidden={isActive ? undefined : "true"}
              inert={isActive ? undefined : ""}
              data-company={company.id}
            >
              <div className="pf-cyl__screen">
                {near
                  ? (isActive && company.immersive
                    ? <SpeedwaSiteMemo company={company} lang={lang} />
                    : <PortfolioBrandPanelMemo company={company} lang={lang} />)
                  : null}
              </div>
              <span className="pf-cyl__shade" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <div className="pf-cyl__topbar">
        <span aria-live="polite"><b>{String(active + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")} · {companies[active].name}</span>
        {onExpand ? (
          <button className="pf-cyl__enter" type="button" onClick={() => onExpand(active)} aria-label={labels.expand}><Layers3 size={15} /> <span>{labels.expand}</span></button>
        ) : null}
        {onExit ? (
          <button className="pf-cyl__exit" type="button" onClick={onExit} aria-label={labels.close}><X size={18} /> <span>{labels.close}</span></button>
        ) : null}
      </div>

      <div className="pf-cyl__brandbadge" aria-hidden="true">
        <BrandWordmark company={companies[active]} wordmark={companies[active].wordmark} name={companies[active].name} />
      </div>

      <button type="button" className="pf-cyl__arrow pf-cyl__arrow--prev" onClick={() => go(-1)} aria-label={labels.prev}>
        <ChevronLeft size={22} />
      </button>
      <button type="button" className="pf-cyl__arrow pf-cyl__arrow--next" onClick={() => go(1)} aria-label={labels.next}>
        <ChevronRight size={22} />
      </button>
      <div className="pf-cyl__dots" role="tablist" aria-label={labels.hint}>
        {companies.map((company, idx) => (
          <button
            key={company.id}
            type="button"
            role="tab"
            className={idx === active ? "is-active" : ""}
            aria-selected={idx === active}
            aria-label={company.name}
            tabIndex={idx === active ? 0 : -1}
            onClick={() => setActive(idx)}
          />
        ))}
      </div>
      <span className="pf-cyl__hint" aria-hidden="true">{labels.hint}</span>
    </div>
  );
}

// Stable 3D reel. Horizontal drag rotates the cylinder; entering and leaving a
// site is an explicit button action so ordinary page scrolling never hijacks
// the visitor or traps the document in a scroll-grown state.
function PortfolioImmersivePreview({ companies, lang, id, onExpand }) {
  const labels = REEL_COPY[lang];

  return (
    <section className="pf-imm pf-imm--stable pf-imm--button" id={id} aria-label={labels.label}>
      <header className="pf-imm__title">
        <span className="pf-imm__eyebrow">{labels.eyebrow}</span>
        <h2>{labels.title}</h2>
        <p>{labels.text}</p>
      </header>
      <div className="pf-imm__window">
        <PortfolioReel companies={companies} lang={lang} onExpand={onExpand} />
      </div>
    </section>
  );
}

function PortfolioOverlay({ companies, lang, initialIndex, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  return (
    <div className="pf-overlay pf-overlay--reel" role="dialog" aria-modal="true" aria-label={REEL_COPY[lang].label}>
      <div className="pf-overlay__window">
        <PortfolioReel companies={companies} lang={lang} initialIndex={initialIndex} onExit={onClose} fullscreen />
      </div>
    </div>
  );
}

// Premium, calm brand wall: logos flow left→right in one continuous marquee,
// pausing on hover. Each card links to the brand's official site when it has one.
function BrandMarquee({ companies, lang, variant, label }) {
  const items = [...companies, ...companies];
  return (
    <div className={`brand-marquee brand-marquee--${variant}`} aria-label={label}>
      <div className="brand-marquee__track">
        {items.map((company, index) => {
          const branding = company.branding;
          const duplicate = index >= companies.length;
          const inner = (
            <>
              <span className="brand-marquee__logo">
                <BrandWordmark company={company} wordmark={company.wordmark} name={company.name} />
              </span>
              <span className="brand-marquee__meta">
                {company.id === "samsung"
                  ? <><ShieldCheck size={12} /> {lang === "tr" ? "Yönettiğimiz operasyon" : "Operation we run"}</>
                  : company.immersive
                    ? <><i className="pf-live-dot" /> {lang === "tr" ? "Canlı ön izleme" : "Live preview"}</>
                    : null}
                {company.website ? <ArrowUpRight size={13} /> : null}
              </span>
            </>
          );
          const style = {
            "--brand-surface": branding?.surface || "#ffffff",
            "--brand-ink": branding?.ink || "#20233f",
            "--brand-accent": branding?.accent || "#252a52",
          };
          const shared = {
            className: `brand-marquee__card ${company.immersive ? "is-live" : ""} ${company.id === "samsung" ? "is-flagship" : ""}`,
            style,
            "aria-hidden": duplicate ? "true" : undefined,
            tabIndex: duplicate ? -1 : undefined,
          };
          return company.website ? (
            <a key={`${company.id}-${index}`} href={company.website} target="_blank" rel="noopener noreferrer" {...shared}>{inner}</a>
          ) : (
            <div key={`${company.id}-${index}`} {...shared}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}

function Portfolio({ lang, withImmersive = false }) {
  const copy = COPY[lang].portfolio;
  const companies = PORTFOLIO_COMPANIES;
  const [overlayIndex, setOverlayIndex] = useState(null);
  const openerRef = useRef(null);

  const openOverlay = (index) => {
    openerRef.current = document.activeElement;
    setOverlayIndex(index);
  };

  const closeOverlay = () => {
    setOverlayIndex(null);
    window.requestAnimationFrame(() => openerRef.current?.focus?.({ preventScroll: true }));
  };

  return (
    <>
      <section className="section portfolio-section">
        <div className="shell">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} text={copy.text} />
        </div>
        <div className="portfolio-rails">
          <div className="portfolio-rail portfolio-rail--companies">
            <div className="shell portfolio-rail__head">
              <strong>{copy.companiesLabel}</strong>
              <span>{copy.companiesText}</span>
            </div>
            <BrandMarquee companies={GROUP_PORTFOLIO_COMPANIES} lang={lang} variant="companies" label={copy.companiesLabel} />
          </div>
          <div className="portfolio-rail portfolio-rail--brands">
            <div className="shell portfolio-rail__head">
              <strong>{copy.brandsLabel}</strong>
              <span>{copy.brandsText}</span>
            </div>
            <BrandMarquee companies={BRAND_PORTFOLIO_COMPANIES} lang={lang} variant="brands" label={copy.brandsLabel} />
          </div>
        </div>
        <div className="shell">
          <p className="portfolio-note">{copy.note}</p>
        </div>
      </section>
      {withImmersive ? (
        <PortfolioImmersivePreview companies={companies} lang={lang} id={IMMERSIVE_ID} onExpand={openOverlay} />
      ) : null}
      {withImmersive && overlayIndex !== null ? (
        <PortfolioOverlay companies={companies} lang={lang} initialIndex={overlayIndex} onClose={closeOverlay} />
      ) : null}
    </>
  );
}

function MarketplaceEcosystem({ lang, compact = false }) {
  const copy = COPY[lang].marketplace;
  return (
    <section className={`section marketplace-ecosystem ${compact ? "marketplace-ecosystem--compact" : ""}`}>
      <div className="shell">
        <div className="marketplace-ecosystem__intro">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
          </div>
          <p>{copy.text}</p>
        </div>
        <div className="marketplace-focus">
          <article>
            <small>{copy.focusOneLabel}</small>
            <strong>{copy.focusOneTitle}</strong>
            <p>{copy.focusOneText}</p>
          </article>
          <article>
            <small>{copy.focusTwoLabel}</small>
            <strong>{copy.focusTwoTitle}</strong>
            <p>{copy.focusTwoText}</p>
          </article>
        </div>
        <div className="marketplace-region-grid marketplace-region-grid--single">
          <article className="marketplace-region marketplace-region--turkey">
            <div className="marketplace-region__head">
              <span>{copy.regionLabel}</span>
              <h3>{copy.region}</h3>
              <p>{copy.regionText}</p>
            </div>
            <div className="marketplace-logo-grid" aria-label="Türkiye sales channels">
              {CHANNELS.map((channel) => (
                <span className="marketplace-logo" style={{ "--logo-accent": channel.accent }} key={channel.name}>
                  <img src={faviconUrl(channel.domain)} alt={`${channel.name} logo`} loading="lazy" />
                  <b>{channel.name}</b>
                  <i />
                </span>
              ))}
            </div>
          </article>
        </div>
        <div className="marketplace-operations">
          <div><span className="eyebrow">{copy.operationsEyebrow}</span><h3>{copy.operationsTitle}</h3></div>
          <div>{copy.operations.map((item) => <span key={item}><Check size={15} /> {item}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function QuickAnswers({ lang }) {
  const copy = COPY[lang].answers;
  return (
    <div className="quick-answers">
      <div><span className="eyebrow">{copy.eyebrow}</span><h3>{copy.title}</h3></div>
      <div className="quick-answers__grid">
        {copy.items.map((item) => <article key={item.q}><h4>{item.q}</h4><p>{item.a}</p></article>)}
      </div>
    </div>
  );
}

function CTA({ navigate, lang, title }) {
  const copy = COPY[lang];
  return (
    <section className="cta">
      <div className="shell cta__inner">
        <span className="cta__icon"><Sparkles size={30} /></span>
        <h2>{title || copy.hero.titleAccent}</h2>
        <p>{copy.contactPage.text}</p>
        <PageLink to="/iletisim" navigate={navigate} className="button button--dark">
          {copy.common.start} <ArrowRight size={17} />
        </PageLink>
      </div>
    </section>
  );
}

const REACH_CITIES = [
  [214, 402], [430, 470], [156, 548], [372, 628], [560, 606], [726, 438], [842, 520],
];

function useCountUp(target, active, duration = 1700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return undefined;
    }
    let frame = 0;
    const start = performance.now();
    const ease = (k) => 1 - Math.pow(1 - k, 3);
    const step = (now) => {
      const k = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * ease(k)));
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return value;
}

function ReachStat({ def, lang, active, locale }) {
  const value = useCountUp(def.n, active);
  return (
    <div className="reach-stat">
      <strong>{value.toLocaleString(locale)}{def.suffix}</strong>
      <span>{def.label[lang]}</span>
    </div>
  );
}

function ShargeTradeMap({ lang, label }) {
  const titleId = `sharge-route-title-${lang}`;
  const descId = `sharge-route-desc-${lang}`;
  return (
    <figure className="trade-map" role="img" aria-labelledby={`${titleId} ${descId}`}>
      <svg className="trade-map__svg" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid meet">
        <title id={titleId}>{label}</title>
        <desc id={descId}>
          {lang === "tr"
            ? "Türkiye solda, Çin sağda. Ticari akış Shenzhen'den Türkiye operasyon merkezine sağdan sola ilerler."
            : "Türkiye is on the left and China on the right. The commercial flow moves right-to-left from Shenzhen to the Türkiye operations hub."}
        </desc>
        <defs>
          <marker id="trade-arrow-left" markerWidth="11" markerHeight="11" refX="9" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M0,0 L11,5.5 L0,11 Z" fill="var(--reach-accent)" />
          </marker>
          <linearGradient id="trade-route-gradient" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="var(--reach-accent)" />
            <stop offset="1" stopColor="#25365d" />
          </linearGradient>
        </defs>

        <g className="trade-map__country trade-map__country--turkey" data-country="turkey">
          <rect x="32" y="78" width="410" height="252" rx="28" />
          <TurkeyMap x="64" y="128" width="350" height="162" aria-hidden="true" focusable="false" />
          <text x="70" y="112">TÜRKİYE</text>
        </g>

        <g className="trade-map__country trade-map__country--china" data-country="china">
          <rect x="590" y="38" width="376" height="322" rx="28" />
          <svg x="640" y="64" width="288" height="260" viewBox={CHINA_MAP.viewBox} aria-hidden="true">
            <g className="trade-map__china-shape">
              {CHINA_MAP.locations.map((location) => <path key={location.id} d={location.path} />)}
            </g>
          </svg>
          <text x="620" y="82">CHINA</text>
        </g>

        <path className="trade-map__route-base" d="M850 292 C690 150 525 148 318 224" />
        <path className="trade-map__route" d="M850 292 C690 150 525 148 318 224" markerEnd="url(#trade-arrow-left)" />
        <g className="trade-map__packet trade-map__packet--one">
          <circle r="7" />
          <animateMotion dur="3.8s" repeatCount="indefinite" path="M850 292 C690 150 525 148 318 224" />
        </g>
        <g className="trade-map__packet trade-map__packet--two">
          <circle r="5" />
          <animateMotion dur="3.8s" begin="-1.9s" repeatCount="indefinite" path="M850 292 C690 150 525 148 318 224" />
        </g>

        <g className="trade-map__node trade-map__node--turkey" transform="translate(318 224)">
          <circle className="trade-map__node-ring" r="17" />
          <circle r="8" />
        </g>
        <g className="trade-map__node trade-map__node--shenzhen" transform="translate(850 292)">
          <circle className="trade-map__node-ring" r="17" />
          <circle r="8" />
        </g>
        <g className="trade-map__label trade-map__label--turkey">
          <rect x="202" y="238" width="162" height="48" rx="12" />
          <text x="219" y="258">DRK OPERASYON</text>
          <text x="219" y="275">Türkiye</text>
        </g>
        <g className="trade-map__label trade-map__label--shenzhen">
          <rect x="790" y="300" width="160" height="48" rx="12" />
          <text x="807" y="320">SHENZHEN</text>
          <text x="807" y="337">Guangdong · China</text>
        </g>
        <g className="trade-map__flow-label">
          <rect x="416" y="113" width="190" height="32" rx="16" />
          <text x="511" y="134" textAnchor="middle">SHENZHEN → TÜRKİYE</text>
        </g>
      </svg>
      <figcaption>
        {lang === "tr"
          ? "Şematik gösterimdir; haritalar ve rota ölçekli değildir. Hareket yalnız yönü gösterir, hacmi temsil etmez."
          : "Schematic only; maps and route are not to scale. Motion indicates direction, not volume."}
        <small> China map: SVG Maps · CC BY 4.0</small>
      </figcaption>
    </figure>
  );
}

function ReachVisualization({ profile, lang }) {
  const [selectedDealer, setSelectedDealer] = useState(SPEEDWA_DEALERS[0]);
  const copy = profile.copy[lang];
  // Map the selected dealer's viewBox coords to a %-position inside the map box,
  // then clamp horizontally and flip the tooltip below the point when it sits too
  // close to the top edge so it never clips outside the map.
  const rawLeft = selectedDealer ? ((selectedDealer.x + 30) / 1085) * 100 : 50;
  const rawTop = selectedDealer ? ((selectedDealer.y - 255) / 505) * 100 : 50;
  const dealerLeft = Math.max(18, Math.min(82, rawLeft));
  const dealerTop = rawTop;
  const tooltipBelow = rawTop < 32;

  return (
    <div className={`reach-stage reach-stage--${profile.mode}`} style={{ "--reach-accent": profile.accent }}>
      {profile.mode === "shenzhen" ? <ShargeTradeMap lang={lang} label={copy.mapLabel} /> : null}

      {profile.mode !== "shenzhen" ? <div className="market-reach__map">
        <span className="market-reach__glow" />
        <TurkeyMap className="market-reach__svg" aria-hidden="true" />
        <svg
          className={`market-reach__dots ${profile.mode === "dealers" ? "market-reach__dots--interactive" : ""}`}
          viewBox="-30 255 1085 505"
          preserveAspectRatio="xMidYMid meet"
          role={profile.mode === "dealers" ? "group" : undefined}
          aria-label={profile.mode === "dealers" ? copy.mapLabel : undefined}
          aria-hidden={profile.mode === "dealers" ? undefined : "true"}
        >
          {profile.mode === "dealers" ? SPEEDWA_DEALERS.map((dealer, index) => (
            <circle
              key={dealer.id}
              className={`mr-dot mr-dot--dealer ${selectedDealer?.id === dealer.id ? "is-selected" : ""}`}
              cx={dealer.x}
              cy={dealer.y}
              r="4.8"
              tabIndex={selectedDealer?.id === dealer.id ? 0 : -1}
              role="button"
              aria-label={`${dealer.name}, ${dealer.city}`}
              data-mobile-hidden={index >= 70 ? "true" : undefined}
              onPointerEnter={() => setSelectedDealer(dealer)}
              onFocus={() => setSelectedDealer(dealer)}
              onClick={() => setSelectedDealer(dealer)}
              onKeyDown={(event) => {
                if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) return;
                event.preventDefault();
                const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
                const next = SPEEDWA_DEALERS[(index + direction + SPEEDWA_DEALERS.length) % SPEEDWA_DEALERS.length];
                setSelectedDealer(next);
                window.requestAnimationFrame(() => document.querySelector(`[data-dealer-id="${next.id}"]`)?.focus());
              }}
              data-dealer-id={dealer.id}
            >
              <title>{dealer.name} · {dealer.city}</title>
            </circle>
          )) : REACH_CITIES.map(([x, y], index) => (
            <circle key={`${x}-${y}`} className="mr-dot" cx={x} cy={y} r="6" style={{ animationDelay: `${index * 0.22}s` }} />
          ))}
          <circle className="mr-hub-ring" cx="430" cy="470" r="15" />
          <circle className="mr-hub" cx="430" cy="470" r="8" />
        </svg>
        {profile.mode === "dealers" && selectedDealer ? (
          <div className="dealer-tooltip" data-below={tooltipBelow ? "true" : undefined} style={{ left: `${dealerLeft}%`, top: `${dealerTop}%` }} role="status">
            <strong>{selectedDealer.name}</strong>
            <span><MapPin size={12} /> {selectedDealer.city}</span>
            <small>{lang === "tr" ? "Temsilî ağ noktası" : "Representative network point"}</small>
          </div>
        ) : null}
        <span className="market-reach__map-label">{copy.mapLabel}</span>
      </div> : null}

      {profile.mode === "dealers" && selectedDealer ? (
        <div className="dealer-detail" aria-live="polite">
          <span>{lang === "tr" ? "SEÇİLİ BAYİ NOKTASI" : "SELECTED DEALER POINT"}</span>
          <strong>{selectedDealer.name}</strong>
          <small><MapPin size={13} /> {selectedDealer.city}</small>
        </div>
      ) : null}
    </div>
  );
}

function MarketReach({ lang, selectedId, onSelect }) {
  const copy = COPY[lang].reach;
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const profile = REACH_PROFILES.find((item) => item.id === selectedId) || REACH_PROFILES[0];
  const profileCopy = profile.copy[lang];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section market-reach" id="ticari-ag" ref={sectionRef}>
      <div className="shell reach-switcher" role="group" aria-label={copy.eyebrow}>
        {REACH_PROFILES.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={item.id === profile.id}
            className={item.id === profile.id ? "is-active" : ""}
            style={{ "--tab-accent": item.accent }}
            onClick={() => onSelect(item.id)}
          >
            {item.logo
              ? <img className="reach-switcher__logo" src={item.logo} alt={item.name} loading="lazy" decoding="async" />
              : <><i /> {item.label?.[lang] || item.name}</>}
          </button>
        ))}
      </div>
      <div className="shell market-reach__grid">
        <div className="market-reach__intro">
          <span className="eyebrow"><MapPin size={13} /> {profileCopy.eyebrow}</span>
          <h2>{profileCopy.title}</h2>
          <p>{profileCopy.text}</p>
          <div className="market-reach__stats">
            {profile.metrics.map((def, index) => (
              <ReachStat key={`${profile.id}-${index}`} def={def} lang={lang} active={active} locale={locale} />
            ))}
          </div>
        </div>
        <ReachVisualization key={profile.id} profile={profile} lang={lang} />
      </div>
      <p className="market-reach__note shell">{profileCopy.note}</p>
    </section>
  );
}

function HomePage({ navigate, lang, services }) {
  const copy = COPY[lang];
  const [selectedReach, setSelectedReach] = useState("drk");
  return (
    <>
      <main>
        <section className="home-hero">
          <div className="shell home-hero__inner">
            <CharacterRow services={services} navigate={navigate} />
            <h1>{copy.hero.titleTop} <span><i /> {copy.hero.titleAccent}</span></h1>
            <p>{copy.hero.text}</p>
            <div className="hero-actions">
              <PageLink to="/iletisim" navigate={navigate} className="button button--purple">
                {copy.hero.primary} <ArrowRight size={17} />
              </PageLink>
              <PageLink to="/hizmetler" navigate={navigate} className="button button--soft">
                {copy.hero.secondary}
              </PageLink>
            </div>
            <NeedAnalyzer navigate={navigate} lang={lang} />
            <DistributionNetwork services={services} navigate={navigate} lang={lang} />
          </div>
        </section>
        <EcosystemStrip lang={lang} />
        <FlagshipOperations lang={lang} />
        <MarketReach lang={lang} selectedId={selectedReach} onSelect={setSelectedReach} />
        <Portfolio lang={lang} withImmersive />
        <section className="section home-services">
          <div className="shell">
            <SectionHeading
              eyebrow={copy.servicesSection.eyebrow}
              title={copy.servicesSection.title}
              text={copy.servicesSection.text}
            />
            <div className="home-service-grid">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} navigate={navigate} lang={lang} compact />
              ))}
            </div>
            <ArrowLink to="/hizmetler" navigate={navigate}>{copy.common.allServices}</ArrowLink>
            <QuickAnswers lang={lang} />
          </div>
        </section>
        <MarketplaceEcosystem lang={lang} compact />
        <section className="section home-solutions">
          <div className="shell">
            <SectionHeading
              eyebrow={copy.homeSolutions.eyebrow}
              title={copy.homeSolutions.title}
              text={copy.homeSolutions.text}
            />
            <div className="solution-preview-grid">
              {copy.homeSolutions.blocks.map((block, index) => (
                <article className="solution-preview" key={block.label}>
                  <img
                    src={index === 0 ? "/images/market-entry-hero.webp" : "/images/ecommerce-editorial.webp"}
                    alt=""
                  />
                  <div>
                    <small>{block.label}</small>
                    <h3>{block.title}</h3>
                    <p>{block.text}</p>
                    <ArrowLink to="/cozumler" navigate={navigate}>{block.link}</ArrowLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CTA navigate={navigate} lang={lang} title={copy.hero.titleAccent} />
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function PageHero({ eyebrow, title, text, icon: Icon, children }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__inner">
        <div className="page-hero__copy">
          <span className="page-hero__icon"><Icon size={27} /></span>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function ServicesPage({ navigate, lang, services }) {
  const copy = COPY[lang].servicesPage;
  return (
    <>
      <main>
        <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} icon={Layers3}>
          <div className="page-hero__visual service-orbit" aria-hidden="true">
            <span><Handshake /></span><span><ShoppingBag /></span><span><Store /></span><span><Target /></span>
            <strong>DRK<small>TÜRKİYE</small></strong>
          </div>
        </PageHero>
        <section className="section services-page">
          <div className="shell">
            <SectionHeading eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} text={copy.sectionText} />
            <div className="services-full-grid">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} navigate={navigate} lang={lang} />
              ))}
            </div>
          </div>
        </section>
        <CTA navigate={navigate} lang={lang} />
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function ServiceDetailPage({ service, navigate, lang, services }) {
  const copy = COPY[lang].servicePage;
  const Icon = service.icon;
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  return (
    <>
      <main
        className="service-detail"
        style={{ "--service-accent": service.color, "--service-soft": service.soft, "--service-rgb": service.rgb }}
      >
        <section className="service-detail-hero">
          <div className="shell service-detail-hero__inner">
            <div className="service-detail-hero__copy">
              <PageLink to="/hizmetler" navigate={navigate} className="back-link">{COPY[lang].common.backServices}</PageLink>
              <span className="page-hero__icon"><Icon size={27} /></span>
              <span className="eyebrow">{service.eyebrow}</span>
              <h1>{service.title}</h1>
              <p>{service.intro}</p>
              <div className="service-detail-hero__actions">
                <PageLink to="/iletisim" navigate={navigate} className="button button--dark">
                  {COPY[lang].common.talk} <ArrowRight size={17} />
                </PageLink>
                <PageLink to={`${service.path}#kapsam`} navigate={navigate} className="button button--service">
                  {COPY[lang].common.scope}
                </PageLink>
              </div>
            </div>
            <div className="service-detail__visual" aria-hidden="true">
              <small>{service.number}</small>
              <span><Icon size={48} /></span>
              <strong>{service.navTitle}</strong>
              <p>{service.short}</p>
              <div>{service.process.map((item) => <i key={item}>{item}</i>)}</div>
            </div>
          </div>
        </section>
        <section className="section service-scope" id="kapsam">
          <div className="shell">
            <SectionHeading eyebrow={copy.scopeEyebrow} title={copy.scopeTitle} text={copy.scopeText} />
            <div className="service-skill-map">
              {service.items.map((item) => <span key={item}><Check size={15} /> {item}</span>)}
            </div>
            <div className="service-section-grid">
              {service.sections.map(([title, text, bullets], index) => (
                <article key={title}>
                  <small>0{index + 1}</small>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  <ul>{bullets.map((item) => <li key={item}><Check size={15} /> {item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        {service.slug === "e-ticaret-turkiye-pazaryerleri" ? <MarketplaceEcosystem lang={lang} /> : null}
        <section className="section service-outcomes">
          <div className="shell service-outcomes__grid">
            <div>
              <span className="eyebrow">{COPY[lang].common.outcome.toUpperCase()}</span>
              <h2>{copy.outcomeTitle}</h2>
              <p>{copy.outcomeText}</p>
            </div>
            <div className="outcome-list">
              {service.outcomes.map((item, index) => (
                <article key={item}><small>0{index + 1}</small><strong>{item}</strong><span /></article>
              ))}
            </div>
          </div>
        </section>
        <section className="section related-services">
          <div className="shell">
            <SectionHeading eyebrow={COPY[lang].common.related.toUpperCase()} title={copy.relatedTitle} center />
            <div className="related-services__grid">
              {related.map((item) => (
                <ServiceCard key={item.slug} service={item} navigate={navigate} lang={lang} compact />
              ))}
            </div>
          </div>
        </section>
        <CTA navigate={navigate} lang={lang} title={copy.cta} />
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function SolutionBlock({ data, reverse = false }) {
  return (
    <article className={`solution-block ${reverse ? "solution-block--reverse" : ""}`}>
      <div className="solution-block__copy">
        <span className="eyebrow"><Globe2 size={14} /> {data.type}</span>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <div className="check-grid">{data.items.map((item) => <span key={item}><Check size={15} /> {item}</span>)}</div>
      </div>
      <div className="solution-block__media">
        <img src={reverse ? "/images/ecommerce-editorial.webp" : "/images/market-entry-hero.webp"} alt="" />
        <div className="metric-panel">
          {data.metrics.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
        </div>
      </div>
    </article>
  );
}

function SolutionsPage({ navigate, lang }) {
  const copy = COPY[lang].solutionsPage;
  return (
    <>
      <main>
        <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} icon={Globe2}>
          <div className="page-hero__visual split-visual" aria-hidden="true">
            <div><Globe2 /><span>GLOBAL</span></div><div><MapPin /><span>TÜRKİYE</span></div>
          </div>
        </PageHero>
        <section className="section solutions-page">
          <div className="shell">
            {copy.blocks.map((block, index) => <SolutionBlock key={block.type} data={block} reverse={index === 1} />)}
          </div>
        </section>
        <Portfolio lang={lang} />
        <CTA navigate={navigate} lang={lang} />
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function ApproachPage({ navigate, lang }) {
  const copy = COPY[lang].approachPage;
  return (
    <>
      <main>
        <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} icon={Compass}>
          <div className="page-hero__visual flow-visual" aria-hidden="true">
            {copy.steps.map(([number, title]) => <span key={number}><b>{number}</b>{title}</span>)}
          </div>
        </PageHero>
        <section className="section process-page">
          <div className="shell">
            <SectionHeading eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} text={copy.sectionText} />
            <div className="process-full">
              {copy.steps.map(([number, title, text], index) => {
                const icons = [Search, BarChart3, Boxes, Rocket, TrendingUp];
                const Icon = icons[index];
                return (
                  <article key={number}>
                    <small>{number}</small>
                    <span className="round-icon"><Icon size={23} /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <CTA navigate={navigate} lang={lang} />
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function AboutPage({ navigate, lang }) {
  const copy = COPY[lang].aboutPage;
  const icons = [MapPin, PackageCheck, Handshake];
  return (
    <>
      <main>
        <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} icon={Sparkles}>
          <div className="page-hero__visual about-visual" aria-hidden="true">
            <strong>DRK</strong><span>BRAND</span><span>CHANNEL</span><span>RETAIL</span><span>GROWTH</span>
          </div>
        </PageHero>
        <section className="about-statement">
          <div className="shell"><small>{copy.statementEyebrow}</small><p>{copy.statement}</p></div>
        </section>
        <section className="section principles">
          <div className="shell">
            <div className="principles-grid">
              {copy.principles.map(([title, text], index) => {
                const Icon = icons[index];
                return <article key={title}><span><Icon /></span><h3>{title}</h3><p>{text}</p></article>;
              })}
            </div>
            <div className="about-numbers">
              {copy.numbers.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </section>
        <CTA navigate={navigate} lang={lang} />
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function ContactPage({ navigate, lang, services }) {
  const copy = COPY[lang].contactPage;
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const prepareEmail = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = lang === "tr"
      ? `DRK Aksesuar görüşme talebi · ${data.get("company")}`
      : `DRK Aksesuar meeting request · ${data.get("company")}`;
    const labels = lang === "tr"
      ? ["Ad Soyad", "Şirket / Marka", "E-posta", "Telefon", "İlgilenilen alan", "Büyüme hedefi"]
      : ["Name", "Company / Brand", "Email", "Phone", "Area of interest", "Growth objective"];
    const values = ["name", "company", "email", "phone", "area", "goal"];
    const body = values.map((key, index) => `${labels[index]}: ${data.get(key) || "-"}`).join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <main>
        <PageHero eyebrow={copy.eyebrow} title={copy.title} text={copy.text} icon={Handshake}>
          <div className="page-hero__visual contact-visual" aria-hidden="true">
            <span><Globe2 /> GLOBAL → TÜRKİYE</span>
            <span><MapPin /> {COPY[lang].common.location}</span>
            <strong><i /> {lang === "tr" ? "Yeni markalara açığız" : "Open to new brands"}</strong>
          </div>
        </PageHero>
        <section className="section contact-page">
          <div className="shell contact-page__grid">
            <div className="contact-page__intro">
              <span className="eyebrow">{copy.formEyebrow}</span>
              <h2>{copy.formTitle}</h2>
              <p>{copy.formText}</p>
              <div>{copy.benefits.map((item) => <span key={item}><Check /> {item}</span>)}</div>
            </div>
            <form className="project-form" onSubmit={prepareEmail}>
              {sent ? (
                <div className="form-success">
                  <span><Check size={27} /></span><h3>{copy.successTitle}</h3><p>{copy.successText}</p>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  <button type="button" onClick={() => setSent(false)}>{copy.reset}</button>
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <label>{copy.fields.name}<input required name="name" autoComplete="name" type="text" placeholder={copy.fields.namePlaceholder} /></label>
                    <label>{copy.fields.company}<input required name="company" autoComplete="organization" type="text" placeholder={copy.fields.companyPlaceholder} /></label>
                  </div>
                  <div className="form-row">
                    <label>{copy.fields.email}<input required name="email" autoComplete="email" type="email" placeholder="name@brand.com" /></label>
                    <label>{copy.fields.phone}<input name="phone" autoComplete="tel" type="tel" placeholder="+90 5__ ___ __ __" /></label>
                  </div>
                  <label>{copy.fields.area}
                    <select name="area" required defaultValue="">
                      <option disabled value="">{copy.fields.areaPlaceholder}</option>
                      {services.map((service) => <option key={service.slug}>{service.title}</option>)}
                    </select>
                  </label>
                  <label>{copy.fields.goal}<textarea required name="goal" rows="5" placeholder={copy.fields.goalPlaceholder} /></label>
                  <button type="submit" className="button button--purple">
                    {copy.fields.submit} <ArrowRight size={17} />
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
        <section className="section contact-faq">
          <div className="shell contact-faq__grid">
            <div><span className="eyebrow">{copy.faqEyebrow}</span><h2>{copy.faqTitle}</h2></div>
            <div className="faq-list">
              {copy.faq.map(([question, answer], index) => (
                <article key={question} className={openFaq === index ? "open" : ""}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    <span>0{index + 1}</span><strong>{question}</strong><ChevronDown size={19} />
                  </button>
                  <div><p>{answer}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function NotFoundPage({ navigate, lang }) {
  const copy = COPY[lang].notFound;
  return (
    <>
      <main className="not-found">
        <div className="shell">
          <span>404</span><h1>{copy.title}</h1>
          <PageLink to="/" navigate={navigate} className="button button--dark">{copy.action} <ArrowRight size={17} /></PageLink>
        </div>
      </main>
      <Footer navigate={navigate} lang={lang} />
    </>
  );
}

function App() {
  const { path, navigate } = useRouter();
  const [lang, setLang] = useState(() => {
    const saved = window.localStorage.getItem("drk-language");
    return saved === "en" ? "en" : "tr";
  });
  const services = useMemo(() => buildServices(lang), [lang]);
  const service = services.find((item) => item.path === path);

  useEffect(() => {
    window.localStorage.setItem("drk-language", lang);
    updateSeo(path, lang, services);
  }, [lang, path, services]);

  const pages = {
    "/": <HomePage navigate={navigate} lang={lang} services={services} />,
    "/hizmetler": <ServicesPage navigate={navigate} lang={lang} services={services} />,
    "/cozumler": <SolutionsPage navigate={navigate} lang={lang} />,
    "/yaklasim": <ApproachPage navigate={navigate} lang={lang} />,
    "/hakkimizda": <AboutPage navigate={navigate} lang={lang} />,
    "/iletisim": <ContactPage navigate={navigate} lang={lang} services={services} />,
  };

  return (
    <div className="app">
      <Header path={path} navigate={navigate} lang={lang} setLang={setLang} />
      {service
        ? <ServiceDetailPage service={service} navigate={navigate} lang={lang} services={services} />
        : pages[path] || <NotFoundPage navigate={navigate} lang={lang} />}
    </div>
  );
}

export default App;
