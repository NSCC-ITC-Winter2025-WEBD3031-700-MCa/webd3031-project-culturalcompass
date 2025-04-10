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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

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

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error('User not found.');
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!isValidPassword) {
          throw new Error('Invalid Login.');
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          isAdmin: existingUser.isAdmin,
          is_premium: existingUser.is_premium,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
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

    async jwt({ token, user }) {
      const email = user?.email || token?.email;

      if (email) {
        const updatedUser = await prisma.user.findUnique({
          where: { email },
        });

        if (updatedUser) {
          token.id = updatedUser.id;
          token.email = updatedUser.email;
          token.name = updatedUser.name;
          token.isAdmin = updatedUser.isAdmin;
          token.is_premium = updatedUser.is_premium;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.isAdmin = token.isAdmin;
      session.user.is_premium = token.is_premium;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };