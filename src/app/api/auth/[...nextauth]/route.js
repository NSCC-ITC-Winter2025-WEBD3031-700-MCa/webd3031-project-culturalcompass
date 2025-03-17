import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = NextAuth({
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
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null; // If credentials are missing, return null
        }

        // Check if the user already exists in the database
        try {
          let user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          // If user does not exist, create a new user
          if (!user) {
            const hashedPassword = await bcrypt.hash(credentials.password, 12);
            user = await prisma.user.create({
              data: {
                username: credentials.username,
                password_hash: hashedPassword,
                email: credentials.username,
                is_premium: false,
                isAdmin: false,
              },
            });
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);

          if (isPasswordValid) {
            return { id: user.id, name: user.username, email: user.email };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', 
  },
  callbacks: {
    // SignIn callback for OAuth providers
    async signIn({ account, profile }) {
      // Handle Google sign-in
      if (account.provider === 'google') {
        const google_id = profile.id; // Get Google ID from profile
        const existingUser = await prisma.user.findUnique({
          where: { google_id },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name,
              google_id: google_id,
              is_premium: false,
              isAdmin: false,
            },
          });
        }
      }

      // Handle GitHub sign-in
      if (account.provider === 'github') {
        const github_id = profile.id; // Get GitHub ID from profile
        const existingUser = await prisma.user.findUnique({
          where: { github_id },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.login, // GitHub uses login as username
              github_id: github_id,
              is_premium: false,
              isAdmin: false,
            },
          });
        }
      }

      return true; // Allow sign-in
    },

    // JWT callback to include user info in the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = user.isAdmin || false; // Add the isAdmin flag to the JWT token
      }
      return token;
    },
  
    // Session callback to pass user info to the session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.isAdmin = token.isAdmin;  // Pass the isAdmin flag to the session
  
      return session;
    },
  },
});

export { handler as GET, handler as POST };