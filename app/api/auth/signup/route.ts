// src/app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db  from '../../../../lib/db'; // Assumes path alias is set up

export const runtime = 'nodejs'; 
const JWT_SECRET = process.env.JWT_SECRET!; 

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing credentials.' }, { status: 400 });
    }
    
    // Check if user exists
    const existingUser = await db.query('SELECT id FROM "User" WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const result = await db.query(
      'INSERT INTO "User" (email, password, name, "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, email, name',
      [email, hashedPassword, name]
    )
    const newUser = result.rows[0];

    const token = jwt.sign({ userId: newUser.id, email : newUser.email, name : newUser.name }, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json(
      { token, user: { id: newUser.id, email: newUser.email, name: newUser.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}