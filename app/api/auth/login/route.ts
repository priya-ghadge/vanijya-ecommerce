// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  db  from '../../../../lib/db'

export const runtime = 'nodejs'; 
const JWT_SECRET = process.env.JWT_SECRET!; 

// RESTful POST endpoint for user login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Basic Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 2. Find the user by email
    const result = await db.query('SELECT * FROM "User" WHERE email = $1', [email]);
    const user = result.rows[0];
    
    // Fail authentication quickly if user is not found
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 } // 401 Unauthorized
      );
    }

    // 3. Compare the provided password with the stored hash
    const passwordValid = await bcrypt.compare(password, user.password);
    
    // Fail if password does not match
    if (!passwordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // 4. Issue a new JWT token for the session
    const token = jwt.sign(
      { userId: user.id, email : user.email, name : user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Return success response
    return NextResponse.json(
      { 
        token, 
        user: { id: user.id, email: user.email, name: user.name } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}