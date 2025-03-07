import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const handler = NextAuth({
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
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null; // if credentials are missing, return null
        }

        // Check if the user is admin 
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          return { id: 1, name: 'Admin', email: 'admin@example.com' }; 
        }

        // If not admin, check the database for regular users
        try {
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          if (!user) {
            return null; 
          }

          // Compare the entered password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (isPasswordValid) {
            return { id: user.id, name: user.name, email: user.email };
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
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
