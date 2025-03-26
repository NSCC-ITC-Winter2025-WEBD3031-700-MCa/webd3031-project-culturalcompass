import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    // Credentials Provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Check if the user exists in the database by email
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error('User not found. Please sign up first.');
        }

        // If user exists, compare the password hash
        const isValidPassword = await bcrypt.compare(credentials.password, existingUser.password);
        if (!isValidPassword) {
          throw new Error('Invalid Password');
        }

        // Return user info including isAdmin
        return { id: existingUser.id, email: existingUser.email, name: existingUser.name, isAdmin: existingUser.isAdmin };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // JWT callback to include user info in the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = user.isAdmin || false;  // Ensure isAdmin is in the token
      }
      return token;
    },

    // Session callback to attach user info from JWT to session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.isAdmin = token.isAdmin;  // Ensure isAdmin is added to the session
      }
      return session;
    },
  },
};

// Export GET and POST methods as named exports
export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
