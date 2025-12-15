// src/app/api/products/route.ts

import { NextResponse } from 'next/server';
import  db  from '../../../lib/db';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    // Select all product fields
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const result = await db.query(`SELECT p.id, p.sku,  p.price, p.stock, p."isAvailable", t.name AS name, t.description AS description, t.locale FROM "Product" p LEFT JOIN "ProductTranslation" t ON p.id = t.product_id AND t.locale = $1 WHERE p."isAvailable" = TRUE ORDER BY "createdAt" DESC`, [locale]);
    
    const products = result.rows.map(row => ({
      ...row,
      // Simple fallback: If the requested translation is missing, use a placeholder
      name: row.name || `[Translation Missing] ${row.sku}`,
      description: row.description || `[Translation Missing]`,
    }));
    // Return the rows directly as JSON
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error fetching products.' },
      { status: 500 }
    );
  }
}