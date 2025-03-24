import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Correct import
import { NextResponse } from "next/server";
import * as z from 'zod';

// Define a schema for input validation
const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

const prisma = new PrismaClient();


//Get Route for dashboard---------------
export async function GET() {
  try {
    // Fetch users from the database
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        is_premium: true,
      },
    });

    // Return the users as a JSON response
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    // Return a 500 status code if there's an error
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  } finally {
    // Disconnect Prisma client to avoid connection leaks
    await prisma.$disconnect();
  }
}
//-------------------------------------








export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const { email, name, password } = userSchema.parse(body);

    // Check if the user already exists by email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { success: false, field: 'email', message: "Email already exists" },
        { status: 400 }
      );
    }

    // Check if the user already exists by name
    const existingUserByName = await prisma.user.findUnique({
      where: { name: name },
    });

    if (existingUserByName) {
      return NextResponse.json(
        { success: false, field: 'name', message: "Name already exists" },
        { status: 400 }
      );
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Return successful response
    return NextResponse.json(
      { success: true, user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Check if the error is from Zod validation
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors.map(e => e.message).join(", ") },
        { status: 400 } // Bad Request
      );
    }

    // Handle unexpected errors
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 } // Internal Server Error
    );
  }
}