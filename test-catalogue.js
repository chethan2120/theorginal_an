import { PRODUCTS, CATEGORIES } from './src/data/products.js';
import { TESTIMONIALS } from './src/data/reviews.js';
import { FAQS } from './src/data/faqs.js';

console.log('=== VERIFYING THE ORIGINAL CATALOGUE ===');
console.log(`Total Products: ${PRODUCTS.length}`);
console.log(`Total Categories: ${CATEGORIES.length}`);
console.log(`Total Reviews: ${TESTIMONIALS.length}`);
console.log(`Total FAQ Categories: ${FAQS.length}`);

// 1. Check unique images rule:
const imageSet = new Set();
const duplicates = [];

for (const p of PRODUCTS) {
  const primaryImg = p.images[0];
  if (imageSet.has(primaryImg)) {
    duplicates.push({ id: p.id, name: p.name, img: primaryImg });
  } else {
    imageSet.add(primaryImg);
  }
}

if (duplicates.length > 0) {
  console.error(`FAIL: Found ${duplicates.length} duplicate images!`, duplicates);
  process.exit(1);
} else {
  console.log(`SUCCESS: All ${PRODUCTS.length} products have 100% unique primary images!`);
}

// 2. Check each product has required fields:
for (const p of PRODUCTS) {
  if (!p.id || !p.name || !p.category || !p.shortDescription || !p.fullDescription) {
    console.error(`FAIL: Product ${p.id} missing text fields`);
    process.exit(1);
  }
  if (!p.variants || p.variants.length === 0) {
    console.error(`FAIL: Product ${p.id} has no weight variants`);
    process.exit(1);
  }
  for (const v of p.variants) {
    if (!v.weight || typeof v.price !== 'number' || v.price <= 0) {
      console.error(`FAIL: Product ${p.id} has invalid variant`, v);
      process.exit(1);
    }
  }
}
console.log(`SUCCESS: All product fields, variants and pricing validated!`);

// 3. Check categories
for (const c of CATEGORIES) {
  const count = PRODUCTS.filter(p => p.category === c.id).length;
  console.log(`Category: ${c.name} (${c.id}) -> ${count} products`);
}

console.log('=== ALL CATALOGUE INTEGRITY CHECKS PASSED ===');
