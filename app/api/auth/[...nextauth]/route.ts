import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { type NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
