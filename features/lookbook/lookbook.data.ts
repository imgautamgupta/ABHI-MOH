import { EditorialStory } from './lookbook.types';

export const EDITORIAL_STORIES: EditorialStory[] = [
  // ── 01. THE HERITAGE EDIT ──────────────────────────────────────────────────
  {
    id: 'heritage-edit',
    editionNumber: '01',
    category: 'THE HERITAGE EDIT',
    tagline: 'Threads that remember generations.',
    headline: 'THE ANCESTRAL LOOMS OF VARANASI',
    quote: 'The loom does not merely craft fabric; it binds time into liquid gold.',
    storyBody: [
      'In the ancient stone corridors along the banks of the Ganges, master weavers translate centuries-old Persian jaal blueprints by memory alone. Each saree is an intimate dialogue between double-twisted pure mulberry silk and hand-drawn gold zari.',
      'The Kadhwa technique requires two artisans working in rhythmic synchrony for up to ninety days — interlocking each gold thread individually so no loose ends remain on the reverse.',
    ],
    mainImage: {
      src: '/assets/sarees/saree-maroon.png',
      alt: 'Heritage Crimson Silk Saree with Gold Zari Border',
      caption: 'Look 01 • The Imperial Shikargah Drape in Crimson Vermilion',
      aspectRatio: 'aspect-[3/4]',
    },
    secondaryImage: {
      src: '/assets/sarees/kanjivaram-detail.png',
      alt: 'Zardozi Gold Border Close-up',
      caption: 'Detail • Hand-couched metallic zardozi border weave',
      aspectRatio: 'aspect-[4/5]',
    },
    detailImage: {
      src: '/assets/sarees/banarasi-detail.png',
      alt: 'Intricate Kadwa Brocade Motif',
      caption: 'Archive • Pure Silver & Gold Zari Warp Intersections',
      aspectRatio: 'aspect-square',
    },
    layoutVariant: 'asymmetric-split',
    theme: 'WARM_IVORY',
    metadata: {
      craft: 'Kadhwa Brocade & Handloom Zari',
      origin: 'Varanasi, Uttar Pradesh',
      technique: 'Double-Warp Handloom',
      palette: 'Royal Crimson, Antique Gold, Deep Maroon',
      artisanGuild: 'Bespoke Varanasi Master Weavers',
    },
    looks: [
      {
        lookNumber: 'Look 01',
        lookName: 'The Imperial Kadhwa Shikargah',
        drapeStyle: 'Traditional Nivi Drape with Floating Pallu',
        description: 'Woven over 65 days with fine gold zari hunting motifs (Shikargah) and scalloped temple borders.',
        image: '/assets/sarees/saree-maroon.png',
      },
      {
        lookNumber: 'Look 02',
        lookName: 'The Crimson Zari Heirloom',
        drapeStyle: 'Seedha Pallu Drape with Royal Pleats',
        description: 'Featuring hand-spun double-twisted silk yarn that flows with effortless structural elegance.',
        image: '/assets/sarees/kanjivaram-detail.png',
      },
    ],
  },

  // ── 02. THE WEDDING EDIT ───────────────────────────────────────────────────
  {
    id: 'wedding-edit',
    editionNumber: '02',
    category: 'THE WEDDING EDIT',
    tagline: 'Vows woven in crimson and gold.',
    headline: 'THE BRIDAL TROUSSEAU ANTHOLOGY',
    quote: 'An heirloom crafted not for a single ceremony, but for the daughters yet to come.',
    storyBody: [
      'A celebration of ceremonial magnificence. The bridal drape balances royal gravitas with sublime fluidity. Rich carmine red meets antique golden brocade, accented with floral bel motifs inspired by Mughal miniature murals.',
      'Designed to capture the warm radiance of ceremonial fires and evening candlelight, reflecting quiet brilliance with every graceful step.',
    ],
    mainImage: {
      src: '/assets/sarees/saree-banarasi.png',
      alt: 'Bridal Banarasi Saree in Royal Red',
      caption: 'Look 02 • The Rajwada Bridal Drape with Heavy Gold Pallu',
      aspectRatio: 'aspect-[3/4]',
    },
    secondaryImage: {
      src: '/assets/sarees/banarasi-detail.png',
      alt: 'Macro detail of bridal gold border',
      caption: 'Detail • Intricate Jangla pattern woven on hand pit-loom',
      aspectRatio: 'aspect-[3/4]',
    },
    detailImage: {
      src: '/assets/sarees/hero-mannequin.png',
      alt: 'Atelier Bridal Form Display',
      caption: 'Atelier • The Sculptural Bridal Silhouette',
      aspectRatio: 'aspect-[4/5]',
    },
    layoutVariant: 'magazine-triptych',
    theme: 'DEEP_MAROON',
    metadata: {
      craft: 'Jangla Katan Silk Brocade',
      origin: 'Varanasi, India',
      technique: 'Pit-Loom Brocade with Meenakari Inlay',
      palette: 'Carmine Red, Gold Zari, Saffron Whisper',
      artisanGuild: 'Mughal Heritage Weaving Collective',
    },
    looks: [
      {
        lookNumber: 'Look 01',
        lookName: 'The Rajwada Jangla Heirloom',
        drapeStyle: 'Gujarati Front-Pallu Wedding Drape',
        description: 'An all-over floral jaal adorned with delicate resham Meenakari blossoms on pure katan silk.',
        image: '/assets/sarees/saree-banarasi.png',
      },
      {
        lookNumber: 'Look 02',
        lookName: 'The Shingaar Gold Brocade',
        drapeStyle: 'Classic Royal Pleat Drape',
        description: 'Featuring dense gold pallu and contrast selvedge woven with pure gold zari threads.',
        image: '/assets/sarees/banarasi-detail.png',
      },
    ],
  },

  // ── 03. THE SILK EDIT ──────────────────────────────────────────────────────
  {
    id: 'silk-edit',
    editionNumber: '03',
    category: 'THE SILK EDIT',
    tagline: 'The tactile poetry of pure handloom.',
    headline: 'FLUID LIQUID MERCURY',
    quote: 'Silk that breathes with the wearer, falling with the quiet cadence of water.',
    storyBody: [
      'From organically harvested raw mulberry cocoons to meticulously combed double-ply yarn, the Silk Edit is a masterclass in tactile luxury. Weightless upon the body, yet resilient across decades of wear.',
      'Our master drapers sculpt each fold to follow the natural contours of the body, creating an architectural silhouette that feels second skin.',
    ],
    mainImage: {
      src: '/assets/sarees/saree-chanderi.png',
      alt: 'Chanderi Moti Work Silk Saree',
      caption: 'Look 03 • The Ethereal Chanderi Moti Drape in Warm Ivory',
      aspectRatio: 'aspect-[4/5]',
    },
    secondaryImage: {
      src: '/assets/sarees/chanderi-detail.png',
      alt: 'Chanderi Weave Texture Detail',
      caption: 'Detail • Sheer silk-cotton translucent drape texture',
      aspectRatio: 'aspect-square',
    },
    detailImage: {
      src: '/assets/sarees/tussar-detail.png',
      alt: 'Raw Handloom Texture Close-up',
      caption: 'Weave • Unrefined wild silk raw slub texture',
      aspectRatio: 'aspect-[4/5]',
    },
    layoutVariant: 'cinematic-wide',
    theme: 'WARM_SAND',
    metadata: {
      craft: 'Chanderi Silk & Wild Tussar',
      origin: 'Chanderi & Bhagalpur, India',
      technique: 'Extra-Weft Feather Weave',
      palette: 'Warm Ivory, Muted Champagne, Sandstone',
      artisanGuild: 'Madhya Heritage Handlooms',
    },
    looks: [
      {
        lookNumber: 'Look 01',
        lookName: 'The Ivory Moti Chanderi',
        drapeStyle: 'Cascading Grecian Drape',
        description: 'Lightweight sheer silk adorned with hand-stitched seed pearl moti work.',
        image: '/assets/sarees/saree-chanderi.png',
      },
    ],
  },

  // ── 04. THE ROYAL EDIT ─────────────────────────────────────────────────────
  {
    id: 'royal-edit',
    editionNumber: '04',
    category: 'THE ROYAL EDIT',
    tagline: 'A tribute to the courts of Varanasi.',
    headline: 'IMPERIAL COURT OPULENCE',
    quote: 'Woven for grand assemblies, echoing the majesty of royal darbars.',
    storyBody: [
      'Inspired by the opulent courtly costumes of 19th-century Awadh and Varanasi. Pure katan silk is treated as a regal canvas, embellished with antique copper and gold zari motifs depicting peacocks, paisleys, and lotus blossoms.',
      'The drape has a distinguished weight and acoustic crispness — a hallmark of genuine handloom silk uncompromised by synthetic blends.',
    ],
    mainImage: {
      src: '/assets/sarees/saree-gold.png',
      alt: 'Imperial Gold Brocade Saree',
      caption: 'Look 04 • The Darbar Gold Tissue Saree in Liquid Amber',
      aspectRatio: 'aspect-[3/4]',
    },
    secondaryImage: {
      src: '/assets/sarees/kanjivaram-detail.png',
      alt: 'Gold Tissue Weave Detail',
      caption: 'Detail • Pure metallic zari warp and silk weft fusion',
      aspectRatio: 'aspect-[4/5]',
    },
    detailImage: {
      src: '/assets/sarees/paithani-detail.png',
      alt: 'Paithani Peacock Motif Detail',
      caption: 'Archive • Asawali vine and parrot tapestry motif',
      aspectRatio: 'aspect-square',
    },
    layoutVariant: 'editorial-dialogue',
    theme: 'WARM_IVORY',
    metadata: {
      craft: 'Zari Tissue & Kadwa Silk',
      origin: 'Varanasi & Paithan, India',
      technique: 'Interlocking Tapestry Weave',
      palette: 'Liquid Gold, Imperial Crimson, Warm Bronze',
      artisanGuild: 'Royal Court Guild Artisans',
    },
    looks: [
      {
        lookNumber: 'Look 01',
        lookName: 'The Darbar Liquid Gold Tissue',
        drapeStyle: 'Structured Royal Pleat with Wide Pallu',
        description: 'An ethereal metallic tissue weave with pure silver-gilt zari threads.',
        image: '/assets/sarees/saree-gold.png',
      },
    ],
  },

  // ── 05. THE FESTIVE EDIT ───────────────────────────────────────────────────
  {
    id: 'festive-edit',
    editionNumber: '05',
    category: 'THE FESTIVE EDIT',
    tagline: 'Celebrations sculpted in pure zari.',
    headline: 'LIGHT, CELEBRATION & COLOR',
    quote: 'When celebrations call for joy, the drape mirrors the radiance of festive lamps.',
    storyBody: [
      'A jubilant exploration of vibrant jewel tones — deep emerald greens, ruby ambers, and radiant saffron silks. Accentuated with contrasting borders and pallu arrangements woven with geometric chevron and floral bootis.',
      'Perfect for intimate family gatherings, grand Diwali soirees, and celebratory evenings filled with music and laughter.',
    ],
    mainImage: {
      src: '/assets/sarees/saree-paithani.png',
      alt: 'Festive Paithani Silk Saree in Jewel Tones',
      caption: 'Look 05 • The Paithani Muniya Drape in Emerald & Ruby',
      aspectRatio: 'aspect-[3/4]',
    },
    secondaryImage: {
      src: '/assets/sarees/paithani-detail.png',
      alt: 'Paithani Border Detail',
      caption: 'Detail • Hand-interlocked kaleidoscopic pallu weave',
      aspectRatio: 'aspect-[3/4]',
    },
    detailImage: {
      src: '/assets/sarees/saree-organza.png',
      alt: 'Organza Sheer Texture Saree',
      caption: 'Texture • Crisp organza with hand-painted gold highlights',
      aspectRatio: 'aspect-square',
    },
    layoutVariant: 'asymmetric-split',
    theme: 'DEEP_MAROON',
    metadata: {
      craft: 'Paithani Handloom & Pure Organza',
      origin: 'Maharashtra & Varanasi, India',
      technique: 'Tapestry Technique with Pure Zari',
      palette: 'Jewel Emerald, Ruby Red, Burnished Gold',
      artisanGuild: 'Yeola & Paithan Master Guild',
    },
    looks: [
      {
        lookNumber: 'Look 01',
        lookName: 'The Paithani Maharashtrian Heirloom',
        drapeStyle: 'Nauvari-Inspired Classic Royal Drape',
        description: 'Featuring distinctive oblique square border (Muniya) and signature peacock pallu.',
        image: '/assets/sarees/saree-paithani.png',
      },
    ],
  },

  // ── 06. THE MONSOON EDIT ───────────────────────────────────────────────────
  {
    id: 'monsoon-edit',
    editionNumber: '06',
    category: 'THE MONSOON EDIT',
    tagline: 'Subtle drapes and morning mist.',
    headline: 'WHISPERS OF ORGANZA & PETRICHOR',
    quote: 'Translucent as twilight, capturing the gentle fragrance of rain-soaked earth.',
    storyBody: [
      'Celebrating the airy poetry of ultra-fine sheer organza and raw tussar silks. Light captures through the diaphanous folds like morning mist over mountain rivers.',
      'Finished with hand-rolled hems, delicate French knot embroideries, and brushed antique silver zari accents that whisper rather than shout.',
    ],
    mainImage: {
      src: '/assets/sarees/saree-organza.png',
      alt: 'Monsoon Organza Saree in Sheer Mist',
      caption: 'Look 06 • The Sheer Organza Drape with Brushed Gold Border',
      aspectRatio: 'aspect-[3/4]',
    },
    secondaryImage: {
      src: '/assets/sarees/organza-detail.png',
      alt: 'Organza Sheer Weave Detail',
      caption: 'Detail • Whisper-thin pure silk organza sheer texture',
      aspectRatio: 'aspect-[4/5]',
    },
    detailImage: {
      src: '/assets/sarees/saree-tussar.png',
      alt: 'Tussar Handwoven Silk Drape',
      caption: 'Texture • Natural wild tussar handloom texture',
      aspectRatio: 'aspect-square',
    },
    layoutVariant: 'magazine-triptych',
    theme: 'WARM_SAND',
    metadata: {
      craft: 'Kora Organza & Raw Tussar',
      origin: 'Varanasi & Bhagalpur, India',
      technique: 'Feather-Light Sheer Weave',
      palette: 'Morning Mist, Sand Champagne, Brushed Gold',
      artisanGuild: 'Atelier Fine Kora Weavers',
    },
    looks: [
      {
        lookNumber: 'Look 01',
        lookName: 'The Mist Organza Whisper',
        drapeStyle: 'Flowing Modern Butterfly Drape',
        description: 'Crafted with fine kora silk threads that float with effortless grace in evening breeze.',
        image: '/assets/sarees/saree-organza.png',
      },
    ],
  },
];
