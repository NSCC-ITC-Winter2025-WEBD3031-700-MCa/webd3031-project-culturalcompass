// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      is_premium?: boolean;
      isAdmin?: boolean;
      id?: string;
    };
  }

  interface User {
    is_premium?: boolean;
    isAdmin?: boolean;
    id?: string;
  }
}
