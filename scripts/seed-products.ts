#!/usr/bin/env tsx
/**
 * Product Seeding Script for ANIMA 119
 * Migrates static product data to Supabase
 *
 * Usage: npx tsx scripts/seed-products.ts
 */

import { createClient } from '@supabase/supabase-js';
import { products } from '../src/lib/products-data';
import type { Database } from '../src/types/database.types';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('❌ Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

// Create admin client with service role
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Map category to database schema
function mapCategory(category: string): 'tea' | 'teaware' | 'gift' {
  if (category.includes('LIMITED') || category.includes('PREMIUM') || category.includes('CLASSIC')) {
    return 'tea';
  }
  return 'tea'; // Default to tea
}

// Map to database product type
function mapType(name: string): 'green' | 'black' | 'white' | 'oolong' | 'herbal' | null {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('lục') || nameLower.includes('green')) return 'green';
  if (nameLower.includes('đen') || nameLower.includes('black')) return 'black';
  if (nameLower.includes('trắng') || nameLower.includes('white')) return 'white';
  if (nameLower.includes('oolong')) return 'oolong';
  return null;
}

async function seedProducts() {
  // Transform static data to database format
  const productsToInsert = products.map(p => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    long_description: p.descriptionFull,
    price: p.priceVnd || Math.round(p.price * 14285), // Convert USD to VND if needed
    original_price: null,
    weight: p.weight,
    image: p.image, // Will be replaced with actual URLs later
    images: null,
    category: mapCategory(p.category),
    type: mapType(p.name),
    origin: p.origin || 'Tây Bắc, Việt Nam',
    harvest: p.harvest || null,
    taste: p.brewing || null,
    tags: p.benefits ? p.benefits.slice(0, 5) : null, // Use benefits as tags
    in_stock: true,
    featured: p.featured || false,
    rating: 0 as number,
    reviews_count: 0,
  })) as Database['public']['Tables']['products']['Insert'][];

  // Upsert products (insert or update based on slug)
  const { error } = await supabase
    .from('products')
    .upsert(productsToInsert, {
      onConflict: 'slug',
      ignoreDuplicates: false
    })
    .select();

  if (error) {
    throw new Error(`❌ Seeding failed: ${error.message}`);
  }
}

// Execute seeding
seedProducts()
  .catch((err) => {
    throw new Error(`💥 Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
  });
