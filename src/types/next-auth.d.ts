
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isPremium?: boolean;
      isAdmin?: boolean;
      id?: string;
    };
  }

  interface User {
    isPremium?: boolean;
    isAdmin?: boolean;
    id?: string;
  }
}