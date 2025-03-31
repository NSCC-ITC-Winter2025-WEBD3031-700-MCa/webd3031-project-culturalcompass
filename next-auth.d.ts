// next-auth.d.ts
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      isAdmin: boolean;
      is_premium:boolean; // Ensure isAdmin is included
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    is_premium:boolean; 
  }
}
