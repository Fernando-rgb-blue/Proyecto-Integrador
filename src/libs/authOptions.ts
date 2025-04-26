// C:\laragon\www\startup-nextjs\src\app\api\auth\[...nextauth]\route.ts

import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { Adapter } from "next-auth/adapters";
import client from "@/libs/mongoForGoogle"

// Configuración de NextAuth
export const authOptions = {
  adapter: MongoDBAdapter(client) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {

        await connectDB()
        //console.log(credentials);

        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password").lean();

        if (!userFound) throw new Error("Invalid Credentials");

        if (userFound.status !== "activo") throw new Error("Usuario no activo");

        //console.log(userFound);
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Invalid Credentials");
        // return userFound;
        return {
          id: userFound._id.toString(),
          name: userFound.fullname,
          email: userFound.email,
          image: userFound.image || undefined
        };
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) {
        token.user = {
          _id: user.id,
          fullname: user.name,
          email: user.email,
          role: user.role
        }
      }
      console.log(token);
      return token;
    },
    session({ session, token }) {
      // Pasa la información completa del usuario a la sesión
      if (token.user) {
        session.user = token.user; // Incluye el rol en la sesión
      }
      return session;
    },
  },
  pages: {
    secret: process.env.NEXTAUTH_SECRET,  // Aquí se añade el secret
    signIn: '/signin',
  }
};

// Exportar la configuración de NextAuth
//const handler = NextAuth(authOptions);

//export { handler as GET, handler as POST };

// export { authOptions }; // Exportar authOptions