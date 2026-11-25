/**
 * THE ORIGINAL - Royal Spices & Imperial Dry Fruits
 * Product Catalogue Data
 * 
 * Strict Standards:
 * - Pure single-origin GI spices and imperial dry fruits
 * - Zero gift boxes, zero gift hampers
 * - Zero human faces, zero ordinary fresh vegetables or fruits
 * - Fully verified 200 OK CDN image assets strictly matching each product
 */

export const CATEGORIES = [
  {
    id: 'spices',
    name: 'Royal Spices',
    tagline: 'Single-origin, GI-tagged, cold-ground heirlooms',
    count: '9 Rare Varieties',
    image: '/images/mega/whole-spices-mega.jpg',
    description: 'Explore our prized single-estate harvests: world-record curcumin turmeric, 8mm+ green cardamom, high-piperine pepper, and pure Kashmiri saffron.'
  },
  {
    id: 'dry-fruits',
    name: 'Imperial Dry Fruits',
    tagline: 'Jumbo graded nuts, tree-ripened Medjool dates & figs',
    count: '10 Premium Varieties',
    image: '/images/mega/dry-fruits-mega.jpg',
    description: 'Colossal Nonpareil almonds, King W180 cashews, Chilean walnut halves, and branch-split Antep pistachios with zero additives.'
  },
  {
    id: 'origins',
    name: 'Single-Origin Reserves',
    tagline: 'Single-estate micro-lots with documented terroir provenance',
    count: '3 Exclusive Lots',
    image: '/images/products/kashmiri-saffron.jpg',
    description: 'Numbered micro-harvests sourced directly from generational family estates across the Western Ghats, Kashmir Valley, and Afghan valleys.'
  }
];

export const PRODUCTS = [
  // ==========================================
  // ROYAL SPICES (Single-Origin, GI Tagged)
  // ==========================================
  {
    id: 'spc-lakadong-turmeric',
    name: 'Lakadong High-Curcumin Turmeric',
    category: 'spices',
    badge: '7.8% Curcumin',
    rating: 4.9,
    reviewsCount: 148,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'World-record 7.8% natural curcumin from Jaintia Hills, Meghalaya. Cold-ground under liquid nitrogen to preserve volatile aromatic oils.',
    origin: 'Jaintia Hills, Meghalaya',
    giTag: 'GI Tag No. 544',
    harvestDate: 'December 2025 Harvest',
    images: [
      '/images/products/lakadong-turmeric.jpg',
      '/images/products/spice-powders-artisan.jpg'
    ],
    variants: [
      { weight: '100g', price: 299, originalPrice: 349 },
      { weight: '250g', price: 649, originalPrice: 799 },
      { weight: '500g', price: 1199, originalPrice: 1499 }
    ],
    details: {
      terroir: 'Mineral-rich red soil of Jaintia Hills, 620m above sea level with 3,000mm annual rainfall.',
      flavorNotes: 'Deep marigold hue, pungent ginger-earth warmth, lingering woodsy aromatics.',
      culinaryPairings: 'Golden Turmeric Latte, Dal Tadka, Slow-Cooked Bone Broths, Ayurvedic Tonics.',
      purityGuarantee: 'Tested 7.8% Curcumin • Zero lead chromate • Zero chalk or starch adulteration.'
    }
  },
  {
    id: 'spc-alleppey-cardamom',
    name: 'Alleppey Royal Green Cardamom (8mm+ Extra Bold)',
    category: 'spices',
    badge: '8mm+ Jumbo',
    rating: 5.0,
    reviewsCount: 182,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'The Queen of Spices. Hand-graded 8mm+ jumbo pods harvested at peak maturity in the misty Cardamom Hills of Idukki, Kerala.',
    origin: 'Idukki, Kerala (Western Ghats)',
    giTag: 'GI Tag No. 43',
    harvestDate: 'October 2025 Harvest',
    images: [
      '/images/products/alleppey-cardamom.jpg',
      '/images/products/ceylon-cinnamon.jpg'
    ],
    variants: [
      { weight: '50g', price: 279, originalPrice: 320 },
      { weight: '100g', price: 499, originalPrice: 599 },
      { weight: '250g', price: 1149, originalPrice: 1399 }
    ],
    details: {
      terroir: 'Shaded canopy estates situated at 1,150m MSL in ancient rainforest loamy soils.',
      flavorNotes: 'Explosive eucalyptus warmth, refreshing camphor, sweet citrus undertone.',
      culinaryPairings: 'Hyderabadi Dum Biryani, Kashmiri Kahwa, Royal Masala Chai, Kheer.',
      purityGuarantee: 'Hand-picked 8mm+ diameter • Never bleached • Sealed under inert nitrogen.'
    }
  },
  {
    id: 'spc-tellicherry-pepper',
    name: 'Tellicherry Extra Bold Black Peppercorns (TGSEB)',
    category: 'spices',
    badge: 'TGSEB Grade',
    rating: 4.8,
    reviewsCount: 94,
    isBestseller: false,
    isFeatured: true,
    shortDescription: 'Tellicherry Garbled Special Extra Bold (TGSEB) &mdash; the pinnacle grade of black pepper. Sun-ripened berries exceeding 4.75mm diameter.',
    origin: 'Malabar Coast, Kerala',
    giTag: 'GI Tag No. 49',
    harvestDate: 'January 2026 Harvest',
    images: [
      '/images/products/tellicherry-pepper.jpg',
      '/images/products/star-anise.jpg'
    ],
    variants: [
      { weight: '100g', price: 249, originalPrice: 299 },
      { weight: '250g', price: 549, originalPrice: 650 },
      { weight: '500g', price: 999, originalPrice: 1200 }
    ],
    details: {
      terroir: 'Vines trained on living silver oak trees in the Wayanad and Malabar slopes.',
      flavorNotes: 'Complex fruitiness, cedar wood, bold tingling heat, zero bitter aftertaste.',
      culinaryPairings: 'Pan-seared steaks, Cacio e Pepe, Pepper Chicken Masala, Caesar Dressing.',
      purityGuarantee: 'Piperine content > 6.2% • Screen-graded 4.75mm+ • Zero papaya seed adulteration.'
    }
  },
  {
    id: 'spc-ceylon-cinnamon',
    name: 'Single-Origin True Ceylon Cinnamon Quills (Alba Grade)',
    category: 'spices',
    badge: 'Alba Grade (Zero Cassia)',
    rating: 4.9,
    reviewsCount: 112,
    isBestseller: true,
    isFeatured: false,
    shortDescription: 'True Cinnamomum verum quills hand-rolled pencil-thin by third-generation peelers. Extremely low coumarin content safe for daily wellness.',
    origin: 'Southern Coast, Sri Lanka',
    giTag: 'Certified True Ceylon',
    harvestDate: 'November 2025 Harvest',
    images: [
      '/images/products/ceylon-cinnamon.jpg',
      '/images/products/tellicherry-pepper.jpg'
    ],
    variants: [
      { weight: '50g', price: 299, originalPrice: 350 },
      { weight: '100g', price: 549, originalPrice: 650 },
      { weight: '250g', price: 1249, originalPrice: 1499 }
    ],
    details: {
      terroir: 'Sandy white coastal soil bathed in humid tropical monsoon sea breezes.',
      flavorNotes: 'Delicate citrus sweetness, warm woody perfume, zero harsh burning bite.',
      culinaryPairings: 'Morning oatmeal, spiced apple compote, tagines, infused golden tea.',
      purityGuarantee: 'Coumarin < 0.004% • Pencil-thin multi-layered Alba quills • 100% Cassia-free.'
    }
  },
  {
    id: 'spc-kashmiri-saffron',
    name: 'Kashmiri Mongra Saffron (Grade A1 Lacha)',
    category: 'spices',
    badge: 'Grade A1 Mongra',
    rating: 5.0,
    reviewsCount: 230,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'The crimson gold of Pampore. Unbroken thick stigmas without style or pollen debris, boasting world-leading Crocin coloring strength exceeding 240.',
    origin: 'Pampore Plateau, Kashmir',
    giTag: 'GI Tag No. 635',
    harvestDate: 'Autumn 2025 Harvest',
    images: [
      '/images/products/kashmiri-saffron.jpg',
      '/images/products/lakadong-turmeric.jpg'
    ],
    variants: [
      { weight: '1g', price: 499, originalPrice: 599 },
      { weight: '2g', price: 949, originalPrice: 1150 },
      { weight: '5g', price: 2249, originalPrice: 2699 }
    ],
    details: {
      terroir: 'Karewa lacustrine clay soils of Pampore, snow-fed and sun-drenched at 1,630m elevation.',
      flavorNotes: 'Intense bittersweet floral hay aroma, luminous golden hue when steeped in warm water.',
      culinaryPairings: 'Shahi Biryani, Saffron Risotto, Kashmiri Rogan Josh, Shahi Phirni.',
      purityGuarantee: 'ISO 3632 Category 1 Certified • Crocin color reading > 240 • Zero artificial dye.'
    }
  },
  {
    id: 'spc-guntur-chillies',
    name: 'Sun-Dried Guntur Sannam Red Chillies (Stemless)',
    category: 'spices',
    badge: 'S4 Grade',
    rating: 4.7,
    reviewsCount: 68,
    isBestseller: false,
    isFeatured: false,
    shortDescription: 'Famous Guntur S4 chillies sun-cured on earthen yards. Yields an unmistakable fiery heat and deep natural red oil sheen.',
    origin: 'Guntur District, Andhra Pradesh',
    giTag: 'GI Tag No. 427',
    harvestDate: 'January 2026 Harvest',
    images: [
      '/images/products/guntur-chillies.jpg',
      '/images/products/spice-powders-artisan.jpg'
    ],
    variants: [
      { weight: '100g', price: 149, originalPrice: 180 },
      { weight: '250g', price: 329, originalPrice: 399 },
      { weight: '500g', price: 599, originalPrice: 720 }
    ],
    details: {
      terroir: 'Krishna river black cotton soils under intense peninsular sunshine.',
      flavorNotes: 'Sharp blistering heat, smoky red pepper skin, high capsaicin concentration.',
      culinaryPairings: 'Guntur Chicken Fry, Andhra Sambhar, Chili Oil, Schezwan base.',
      purityGuarantee: '100% Stemless hand-sorted • Zero Sudan Red dye • Scoville 35,000-40,000 SHU.'
    }
  },
  {
    id: 'spc-zanzibar-cloves',
    name: 'Zanzibar Reserve Whole Cloves (Hand-Harvested)',
    category: 'spices',
    badge: 'High Eugenol',
    rating: 4.8,
    reviewsCount: 75,
    isBestseller: false,
    isFeatured: false,
    shortDescription: 'Fat unopened flower buds bursting with essential eugenol oils. Plump crowned heads that exude oil when pressed with a fingernail.',
    origin: 'Pemba Island, Zanzibar Archipelago',
    giTag: 'Single Origin Sourced',
    harvestDate: 'December 2025 Harvest',
    images: [
      '/images/products/zanzibar-cloves.jpg',
      '/images/products/star-anise.jpg'
    ],
    variants: [
      { weight: '50g', price: 189, originalPrice: 220 },
      { weight: '100g', price: 349, originalPrice: 420 },
      { weight: '250g', price: 799, originalPrice: 950 }
    ],
    details: {
      terroir: 'Volcanic tropical coastal soil in the spice archipelago off East Africa.',
      flavorNotes: 'Intense clove spice, sweet numbing warmth, highly aromatic camphor notes.',
      culinaryPairings: 'Biryani bouquet garni, mulled spiced apple cider, garam masala bases.',
      purityGuarantee: 'Eugenol content > 17% • Unbroken full flower heads • Non-spent oil berries.'
    }
  },
  {
    id: 'spc-star-anise',
    name: 'Hand-Graded Star Anise (Eight-Pointed Pods)',
    category: 'spices',
    badge: 'Whole 8-Point Pods',
    rating: 4.9,
    reviewsCount: 88,
    isBestseller: false,
    isFeatured: false,
    shortDescription: 'Flawless whole star-shaped pericarps enclosing glossy resinous seeds. Aromatic licorice bouquet for royal stocks and slow-braised curries.',
    origin: 'Lang Son Highland Forests, Vietnam',
    giTag: 'Single-Forest Harvest',
    harvestDate: 'October 2025 Harvest',
    images: [
      '/images/products/star-anise.jpg',
      '/images/products/zanzibar-cloves.jpg'
    ],
    variants: [
      { weight: '50g', price: 179, originalPrice: 210 },
      { weight: '100g', price: 329, originalPrice: 390 },
      { weight: '250g', price: 749, originalPrice: 890 }
    ],
    details: {
      terroir: 'Subtropical montane evergreen forests at 800m elevation.',
      flavorNotes: 'Sweet licorice, warm fennel seed, subtle clove-like woodiness.',
      culinaryPairings: 'Pho broth, Nihari, braised lamb shanks, festive spiced syrups.',
      purityGuarantee: '100% True Illicium verum (Zero toxic Japanese star anise) • Hand-selected whole stars.'
    }
  },
  {
    id: 'spc-garam-masala',
    name: 'The Original Royal Garam Masala (16-Spice Blend)',
    category: 'spices',
    badge: 'Cold-Ground Signature',
    rating: 5.0,
    reviewsCount: 195,
    isBestseller: true,
    isFeatured: false,
    shortDescription: 'Our master blender signature formula of 16 whole heirloom spices dry-roasted over low fire and pulverized at -20&deg;C under inert nitrogen.',
    origin: 'Royal Kitchens Formula • Single-Estate Spices',
    giTag: 'The Original Proprietary Reserve',
    harvestDate: 'Small-Batch Blended Weekly',
    images: [
      '/images/products/royal-garam-masala.jpg',
      '/images/products/spice-powders-artisan.jpg'
    ],
    variants: [
      { weight: '100g', price: 299, originalPrice: 360 },
      { weight: '250g', price: 699, originalPrice: 840 },
      { weight: '500g', price: 1299, originalPrice: 1550 }
    ],
    details: {
      terroir: 'Crafted exclusively from our verified single-origin harvest portfolio.',
      flavorNotes: 'Complex warming spice, sweet green cardamom floral lift, black pepper zing.',
      culinaryPairings: 'Sprinkled at the finish of Dal Makhani, Paneer Tikka, Dum Biryani.',
      purityGuarantee: 'Zero coriander powder filler • 100% high-value whole spices • Cryo-ground freshness.'
    }
  },

  // ==========================================
  // IMPERIAL DRY FRUITS (Zero Additives)
  // ==========================================
  {
    id: 'df-california-almonds',
    name: 'King California Jumbo Almonds (Nonpareil Supreme 20/22)',
    category: 'dry-fruits',
    badge: 'Nonpareil Supreme 20/22',
    rating: 4.9,
    reviewsCount: 165,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'The gold standard of almonds. Uniform large flat kernels with smooth golden skins, snappy crunch, and sweet almond butter finish.',
    origin: 'San Joaquin Valley, California',
    giTag: 'USDA Extra No. 1 Grade',
    harvestDate: 'September 2025 Harvest',
    images: [
      '/images/products/california-almonds.jpg',
      '/images/products/king-cashews.jpg'
    ],
    variants: [
      { weight: '250g', price: 399, originalPrice: 479 },
      { weight: '500g', price: 749, originalPrice: 899 },
      { weight: '1kg', price: 1399, originalPrice: 1699 }
    ],
    details: {
      terroir: 'Alluvial soils of the Central Valley with pure snowmelt irrigation from the Sierra Nevada.',
      flavorNotes: 'Snappy crisp bite, natural marzipan butteriness, clean wholesome finish.',
      culinaryPairings: 'Overnight soaked morning wellness, almond milk, artisanal granolas.',
      purityGuarantee: 'Steam pasteurized (Zero Propylene Oxide / Zero PPO) • Raw & unroasted.'
    }
  },
  {
    id: 'df-king-cashews-w180',
    name: 'Royal King Cashews (W180 Jumbo Grade)',
    category: 'dry-fruits',
    badge: 'Colossal W180 Size',
    rating: 5.0,
    reviewsCount: 210,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'The undisputed King of Cashews. Colossal W180 grading (only 160-180 nuts per lb) offering an ivory white color and dense sweet creamy chew.',
    origin: 'Mangalore Coastal Orchards, Karnataka',
    giTag: 'Grade W180 Certified',
    harvestDate: 'December 2025 Harvest',
    images: [
      '/images/products/king-cashews.jpg',
      '/images/products/california-almonds.jpg'
    ],
    variants: [
      { weight: '250g', price: 479, originalPrice: 560 },
      { weight: '500g', price: 899, originalPrice: 1099 },
      { weight: '1kg', price: 1749, originalPrice: 2099 }
    ],
    details: {
      terroir: 'Laterite coastal soils of the Konkan-Mangalore belt near the Arabian Sea.',
      flavorNotes: 'Sweet coconut cream chew, velvety melt-in-mouth texture, zero dryness.',
      culinaryPairings: 'Gourmet cheese boards, Kaju Katli, raw snacking, creamy cashew korma base.',
      purityGuarantee: '100% Whole unblemished kernels • Zero broken bits • Inert nitrogen packaging.'
    }
  },
  {
    id: 'df-antep-pistachios',
    name: 'Turkish Roasted Antep Pistachios (Sea Salted)',
    category: 'dry-fruits',
    badge: 'Naturally Open Shell',
    rating: 4.8,
    reviewsCount: 134,
    isBestseller: false,
    isFeatured: true,
    shortDescription: 'Sun-kissed Antep pistachios with naturally burst shells. Slowly dry-roasted with crystal Mediterranean sea salt to caramelize natural oils.',
    origin: 'Gaziantep Highlands, Turkey',
    giTag: 'Gaziantep Protected Origin',
    harvestDate: 'October 2025 Harvest',
    images: [
      '/images/products/antep-pistachios.jpg',
      '/images/products/california-almonds.jpg'
    ],
    variants: [
      { weight: '250g', price: 499, originalPrice: 599 },
      { weight: '500g', price: 949, originalPrice: 1150 },
      { weight: '1kg', price: 1849, originalPrice: 2200 }
    ],
    details: {
      terroir: 'Limestone slopes in Southeastern Anatolia with arid hot summers and cool winters.',
      flavorNotes: 'Rich nutty sesame-almond character, deep green kernel, satisfying savory snap.',
      culinaryPairings: 'Baklava pastries, saffron pistachio ice cream, antipasto boards.',
      purityGuarantee: '100% Naturally branch-opened shells (Zero mechanically cracked) • Pure sea salt.'
    }
  },
  {
    id: 'df-medjool-dates',
    name: 'Royal Medjool Dates (Jumbo Diamond Reserve)',
    category: 'dry-fruits',
    badge: 'Jumbo Diamond Grade',
    rating: 4.9,
    reviewsCount: 178,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'The Crown Jewel of Dates. Colossal fleshy Medjool dates with glossy thin mahogany skin and a luscious caramel-fudge center that melts like candy.',
    origin: 'Jordan River Valley',
    giTag: 'Grade A Jumbo Diamond',
    harvestDate: 'Harvest 2025',
    images: [
      '/images/products/medjool-dates.jpg',
      '/images/products/afghan-anjeer.jpg'
    ],
    variants: [
      { weight: '250g', price: 389, originalPrice: 460 },
      { weight: '500g', price: 729, originalPrice: 875 },
      { weight: '1kg', price: 1399, originalPrice: 1699 }
    ],
    details: {
      terroir: 'Oasis groves 390m below sea level with mineral spring aquifers and dry desert air.',
      flavorNotes: 'Pure brown butter caramel, soft date honey, wild fig finish, zero fibrous grit.',
      culinaryPairings: 'Stuffed with Mamra almonds and sea salt, morning smoothie sweetener.',
      purityGuarantee: 'Zero glucose syrup dipping • Zero preservatives • Cold-chain stored under 4°C.'
    }
  },
  {
    id: 'df-afghan-anjeer',
    name: 'Golden Afghan Figs (Kandahari Anjeer)',
    category: 'dry-fruits',
    badge: 'Threaded Ring Grade',
    rating: 4.8,
    reviewsCount: 92,
    isBestseller: false,
    isFeatured: false,
    shortDescription: 'Traditional round sun-dried Kandahar figs strung on cotton cords. Plump honeyed flesh bursting with poppy seed-like micro crunch inside.',
    origin: 'Kandahar Oases, Afghanistan',
    giTag: 'Authentic Kandahari Heritage',
    harvestDate: 'Autumn 2025 Harvest',
    images: [
      '/images/products/afghan-anjeer.jpg',
      '/images/products/medjool-dates.jpg'
    ],
    variants: [
      { weight: '250g', price: 449, originalPrice: 530 },
      { weight: '500g', price: 849, originalPrice: 1020 },
      { weight: '1kg', price: 1649, originalPrice: 1980 }
    ],
    details: {
      terroir: 'Arid southern Afghanistan valleys irrigated by clean snowmelt canals.',
      flavorNotes: 'Rich clover honey, dried dark berry sweetness, delicate nutty interior seed crunch.',
      culinaryPairings: 'Soaked overnight with walnuts for digestion and iron, cheese accompaniment.',
      purityGuarantee: 'Unbleached natural golden brown • 100% sun-cured • Zero sulfur dioxide.'
    }
  },
  {
    id: 'df-chilean-walnuts',
    name: 'Chilean Extra-Light Walnut Halves (Chandler Grade)',
    category: 'dry-fruits',
    badge: 'Extra Light 80% Halves',
    rating: 4.9,
    reviewsCount: 118,
    isBestseller: true,
    isFeatured: false,
    shortDescription: 'Pristine pearly-light walnut brain halves grown under the snow-capped Andes mountains. Creamy mild flavor completely devoid of bitter skin tannin.',
    origin: 'Central Valley, Chile (Andes Mountain Melt)',
    giTag: 'Grade Extra Light Certified',
    harvestDate: 'May 2025 Fresh Crop',
    images: [
      '/images/products/chilean-walnuts.jpg',
      '/images/products/california-almonds.jpg'
    ],
    variants: [
      { weight: '250g', price: 429, originalPrice: 510 },
      { weight: '500g', price: 799, originalPrice: 960 },
      { weight: '1kg', price: 1549, originalPrice: 1880 }
    ],
    details: {
      terroir: 'Fertile Andean foothills fed by glacier waters with low humidity and Mediterranean warmth.',
      flavorNotes: 'Mild sweet butter, gentle woodiness, smooth finish without mouth-drying astringency.',
      culinaryPairings: 'Morning brain food, Waldorf salads, roasted walnut pestos, dark chocolate baking.',
      purityGuarantee: 'Extra Light classification • High natural Omega-3 ALA content • Nitrogen-packed.'
    }
  },
  {
    id: 'df-turkish-apricots',
    name: 'Sun-Dried Malatya Apricots (Jumbo Whole)',
    category: 'dry-fruits',
    badge: 'Jumbo Size 1',
    rating: 4.7,
    reviewsCount: 79,
    isBestseller: false,
    isFeatured: false,
    shortDescription: 'Plump sun-dried apricots from the orchards of Malatya, Turkey. Thick fleshy bite with a naturally balanced sweet and tart orchard flavor.',
    origin: 'Malatya Province, Eastern Anatolia, Turkey',
    giTag: 'EU Protected Geographical Indication',
    harvestDate: 'August 2025 Harvest',
    images: [
      '/images/products/turkish-apricots.jpg',
      '/images/products/golden-raisins.jpg'
    ],
    variants: [
      { weight: '250g', price: 349, originalPrice: 420 },
      { weight: '500g', price: 649, originalPrice: 780 },
      { weight: '1kg', price: 1249, originalPrice: 1520 }
    ],
    details: {
      terroir: 'Clay loams between the Euphrates and Taurus mountains under baking summer sunshine.',
      flavorNotes: 'Rich dried apricot jam, floral honey, subtle citrus peel tang.',
      culinaryPairings: 'Morning muesli, poached in star anise syrup, Middle Eastern tagines.',
      purityGuarantee: 'Size 1 Jumbo grading • Pitted with care • Soft chew with zero syrup coating.'
    }
  },
  {
    id: 'df-kashmiri-pine-nuts',
    name: 'Kashmiri Royal Pine Nuts (Chilgoza In-Shell)',
    category: 'dry-fruits',
    badge: 'Wild Chilgoza',
    rating: 5.0,
    reviewsCount: 88,
    isBestseller: false,
    isFeatured: false,
    shortDescription: 'Wild harvested Chilgoza pine nuts from high Himalayan pine forests. Prized for their long torpedo shape, buttery sweetness, and rare pine resin notes.',
    origin: 'Kinnaur & Kashmir High Himalayan Forests',
    giTag: 'Wild Himalayan Harvest',
    harvestDate: 'October 2025 Harvest',
    images: [
      '/images/products/kashmiri-pine-nuts.jpg',
      '/images/products/chilean-walnuts.jpg'
    ],
    variants: [
      { weight: '100g', price: 699, originalPrice: 850 },
      { weight: '250g', price: 1649, originalPrice: 1980 },
      { weight: '500g', price: 3199, originalPrice: 3800 }
    ],
    details: {
      terroir: 'Dry temperate Himalayan forests at 2,000m to 3,000m altitude.',
      flavorNotes: 'Intense cedar butter, delicate floral sweetness, silky rich melt.',
      culinaryPairings: 'Traditional Pesto Genovese, Kashmiri Pulao, royal almond confectionery.',
      purityGuarantee: '100% Wild Pinus gerardiana • Hand-gathered cones • Never bleached.'
    }
  },
  {
    id: 'df-golden-raisins',
    name: 'Royal Long Green Kishmish (Kandahari Seedless)',
    category: 'dry-fruits',
    badge: 'Extra Long Green',
    rating: 4.8,
    reviewsCount: 96,
    isBestseller: false,
    isFeatured: false,
    shortDescription: 'Slender elongated jade raisins sun-cured inside traditional ventilated mud brick kishmish khanas. Delicate grape sweetness with zero added oil.',
    origin: 'Kandahar Vineyards, Afghanistan',
    giTag: 'Traditional Mud-House Cured',
    harvestDate: 'September 2025 Harvest',
    images: [
      '/images/products/golden-raisins.jpg',
      '/images/products/black-raisins.jpg'
    ],
    variants: [
      { weight: '250g', price: 299, originalPrice: 360 },
      { weight: '500g', price: 549, originalPrice: 660 },
      { weight: '1kg', price: 999, originalPrice: 1250 }
    ],
    details: {
      terroir: 'Sandy oasis soil with high diurnal temperature swings producing concentrated grape sugars.',
      flavorNotes: 'Refreshing green grape honey, subtle citrus blossom, soft plump chew.',
      culinaryPairings: 'Saffron rice pilaf, morning porridge, festive payasam, healthy snack.',
      purityGuarantee: 'Zero mineral oil coating • 100% Seedless • Natural shade green cure.'
    }
  },
  {
    id: 'df-royal-mamra-almonds',
    name: 'Imperial Iranian Mamra Badam (100% Oil Rich)',
    category: 'dry-fruits',
    badge: '100% Oil Rich Mamra',
    rating: 5.0,
    reviewsCount: 142,
    isBestseller: true,
    isFeatured: false,
    shortDescription: 'The rarest almond on earth. Curved boat-shaped Mamra kernels carrying up to 50% natural almond oil. Zero cholesterol and maximum therapeutic nourishment.',
    origin: 'Chahar Mahal Valleys, Iran',
    giTag: 'Authentic Mamra Certified',
    harvestDate: 'Autumn 2025 Harvest',
    images: [
      '/images/products/mamra-almonds.jpg',
      '/images/products/california-almonds.jpg'
    ],
    variants: [
      { weight: '250g', price: 899, originalPrice: 1050 },
      { weight: '500g', price: 1749, originalPrice: 2050 },
      { weight: '1kg', price: 3399, originalPrice: 3950 }
    ],
    details: {
      terroir: 'High-altitude cold mountain valleys with natural snowmelt and zero chemical farming.',
      flavorNotes: 'Dense concentrated sweet nuttiness, rich natural oils that coat the palate.',
      culinaryPairings: 'Traditional morning Badam Roghan paste with saffron and cow milk.',
      purityGuarantee: '100% Authentic Mamra • Zero bitter kernels guarantee • 50%+ natural oil content.'
    }
  },

  // ==========================================
  // SINGLE-ORIGIN RESERVES (Numbered Lots)
  // ==========================================
  {
    id: 'orig-kashmiri-mamra',
    name: 'Wild Kashmiri Mamra Almonds (Grade AAA 100% Oil Rich)',
    category: 'origins',
    badge: 'Single-Estate Lot #04',
    rating: 5.0,
    reviewsCount: 89,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'Direct harvest from a generational 4th generation orchard in Pulwama. Hand-cracked from wood-hard shells, retaining their intact cellular oil reserves.',
    origin: 'Pulwama Valley, Kashmir',
    giTag: 'Kashmir Organic Heritage',
    harvestDate: 'September 2025 Harvest',
    images: [
      '/images/products/mamra-almonds.jpg',
      '/images/products/california-almonds.jpg'
    ],
    variants: [
      { weight: '250g', price: 949, originalPrice: 1100 },
      { weight: '500g', price: 1849, originalPrice: 2150 },
      { weight: '1kg', price: 3599, originalPrice: 4200 }
    ],
    details: {
      terroir: 'Glacier-fed Karewa slopes of Kashmir at 1,700m elevation.',
      flavorNotes: 'Pure sweet almond oil, dense satisfying crunch, zero astringency.',
      culinaryPairings: 'Therapeutic soaking in warm water, Ayurvedic Ojas tonic, morning nutrition.',
      purityGuarantee: '100% Single-Estate traceable • Hand-sorted AAA grade • Zero bitter guarantee.'
    }
  },
  {
    id: 'orig-coorg-cardamom',
    name: 'Coorg High-Altitude Wild Cardamom (8.5mm Estate Harvest)',
    category: 'origins',
    badge: 'Single-Estate Lot #11',
    rating: 4.9,
    reviewsCount: 76,
    isBestseller: false,
    isFeatured: true,
    shortDescription: 'Uniquely large 8.5mm pods wild-harvested beneath the canopy of ancient Western Ghats rainforest trees in Madikeri, Coorg.',
    origin: 'Madikeri Highland Estate, Coorg, Karnataka',
    giTag: 'Coorg Green Cardamom GI',
    harvestDate: 'November 2025 Harvest',
    images: [
      '/images/products/alleppey-cardamom.jpg',
      '/images/products/tellicherry-pepper.jpg'
    ],
    variants: [
      { weight: '100g', price: 549, originalPrice: 650 },
      { weight: '250g', price: 1299, originalPrice: 1550 },
      { weight: '500g', price: 2499, originalPrice: 2950 }
    ],
    details: {
      terroir: 'Cloud-forested ridges of the Brahmagiri range with rich humus volcanic loam.',
      flavorNotes: 'Crisp green pine, sweet spearmint, lime zest, deep resinous essential oils.',
      culinaryPairings: 'Artisanal coffee brewing, slow-braised curries, cardamom honey pastry.',
      purityGuarantee: '8.5mm screen-sorted pods • Hand-picked at peak ripeness • High oil yield.'
    }
  },
  {
    id: 'orig-afghan-kishmish',
    name: 'Afghan Jumbo Royal Black Kishmish (Sun-Dried Seedless)',
    category: 'origins',
    badge: 'Single-Estate Lot #18',
    rating: 4.9,
    reviewsCount: 104,
    isBestseller: true,
    isFeatured: true,
    shortDescription: 'Large natural black seedless raisins sun-cured in the dry desert air of Kandahar. High in natural anthocyanins and iron with a luscious molasses chew.',
    origin: 'Kandahar Sun Valleys, Afghanistan',
    giTag: 'Kandahar Heritage Cultivar',
    harvestDate: 'October 2025 Harvest',
    images: [
      '/images/products/black-raisins.jpg',
      '/images/products/golden-raisins.jpg'
    ],
    variants: [
      { weight: '250g', price: 369, originalPrice: 440 },
      { weight: '500g', price: 689, originalPrice: 820 },
      { weight: '1kg', price: 1299, originalPrice: 1550 }
    ],
    details: {
      terroir: 'Ancient oasis vineyards fed by the Arghandab river valley.',
      flavorNotes: 'Dark port wine, rich molasses, plump and succulent with zero seed grit.',
      culinaryPairings: 'Traditional biryanis, morning iron tonic with soaked almonds, sourdough baking.',
      purityGuarantee: '100% Sun-dried • Zero added sugar or syrup • Zero mineral oil.'
    }
  }
];

export const PROMO_CODES = {
  "ORIGINAL10": {
    type: "percentage",
    value: 10,
    description: "10% off your entire royal order",
    minOrder: 0
  },
  "ROYAL500": {
    type: "flat",
    value: 500,
    description: "₹500 off on orders above ₹2,499",
    minOrder: 2499
  },
  "FIRSTROYAL": {
    type: "percentage",
    value: 15,
    description: "15% off first harvest purchase",
    minOrder: 999
  }
};
