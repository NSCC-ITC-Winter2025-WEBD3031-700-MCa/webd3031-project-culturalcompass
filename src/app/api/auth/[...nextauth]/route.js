import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();
 
const handler = NextAuth({
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
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null; // If credentials are missing, return null
        }
 
        try {
          let user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });
 
          if (!user) {
            const hashedPassword = await bcrypt.hash(credentials.password, 12);
            user = await prisma.user.create({
              data: {
                username: credentials.username,
                password_hash: hashedPassword,
                email: credentials.username,
                is_premium: false,
                isAdmin: false, // New users are not admins by default
              },
            });
          }
 
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);
          if (isPasswordValid) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              isAdmin: user.isAdmin, // Pass the admin role
            };
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = user.isAdmin || false; // Ensure admin flag is stored
      } else {
        // Fetch user from the database in case of token refresh
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
        });
        token.isAdmin = dbUser?.isAdmin || false;
      }
      return token;
    },
 
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.isAdmin = token.isAdmin; // Pass admin role to session
      console.log('session', session);
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
 
export { handler as GET, handler as POST };