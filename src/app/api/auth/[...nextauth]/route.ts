// C:\laragon\www\startup-nextjs\src\app\api\auth\[...nextauth]\route.ts

import { Session } from "inspector";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs"
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";
// Configuración de NextAuth
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB()
        console.log(credentials);
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        if(!userFound) throw new Error("Invalid Credentials");
        console.log(userFound);
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if(!passwordMatch) throw new Error("Invalid Credentials");
        return userFound;
      },
    }),
  ],
  callbacks:{
    jwt({account, token, user, profile,session}){
      if(user) token.user = user;
      console.log(token);
      return token;
    },
    Session({session,token}){
      session.user = token.user as any;
      return session;
    },
  },
  pages:{
    signIn: '/signin',
  }
};

// Exportar la configuración de NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
