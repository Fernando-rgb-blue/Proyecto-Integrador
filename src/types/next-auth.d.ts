import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      fullname: string;
      role?: "admin" | "profeC" | "profeN" | "directorE" | "directorD";
    };
    sub?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
  }

  declare module "next-auth/jwt" {
    interface JWT {
      user?: {
        _id: string;
        email: string;
        fullname: string;
        role: string;
      };
    }
  }
}