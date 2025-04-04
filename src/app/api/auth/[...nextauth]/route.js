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
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
 
    // GitHub Provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
 
    // Credentials Provider (Custom SignIn)
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
          throw new Error('User not found.');
        }
 
        // If user exists, compare the password hash
        const isValidPassword = await bcrypt.compare(credentials.password, existingUser.password);
        if (!isValidPassword) {
          throw new Error('Invalid Login.');
        }
 
        // Return existing user info if login is successful
        return { id: existingUser.id, email: existingUser.email, name: existingUser.name, isAdmin: existingUser.isAdmin, is_premium: existingUser.is_premium };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for session strategy
  },
  callbacks: {
    // SignIn callback for OAuth providers (Google, GitHub)
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        const google_id = profile.sub;
 
        const existingUser = await prisma.user.findUnique({
          where: { google_id },
        });
 
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              google_id,
              is_premium: false,
              isAdmin: false,
            },
          });
        }
      }
 
      if (account.provider === 'github') {
        const github_id = profile.id;
 
        const existingUser = await prisma.user.findUnique({
          where: { github_id },
        });
 
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.login,
              github_id,
              is_premium: false,
              isAdmin: false,
            },
          });
        }
      }
 
      return true;
    },
 
    // JWT callback to include user info in the token
    async jwt({ token, user }) {
      if (user) {
        // Fetch the latest user data from the database to ensure is_premium is up-to-date
        const updatedUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (updatedUser) {
          token.is_premium = updatedUser.is_premium;
        }
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },

    // Session callback to attach user info from JWT to session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.isAdmin = token.isAdmin;
        session.user.is_premium = token.is_premium; // Ensure is_premium is included in the session
      }
      return session;
    },
  },
};
 
const handler = NextAuth(authOptions);
 
export { handler as GET, handler as POST };