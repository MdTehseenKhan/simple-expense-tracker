import type { Adapter, AdapterUser } from 'next-auth/adapters'
import { getServerSession, type NextAuthOptions } from 'next-auth'

import CredendtialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { compare } from 'bcrypt'
import db from '@/lib/db'

const getAdapter = (): Adapter => ({
  ...PrismaAdapter(db),
  async getSessionAndUser(sessionToken: string) {
    console.log({ sessionToken })
    const session = await db.session.findFirst({
      where: { sessionToken },
    })
    console.log('SESSION USER: ', sessionToken)
    if (!session) return null

    const user = (await db.user.findUnique({
      where: { id: session.userId },
    })) as AdapterUser
    console.log('USER: ', user)
    if (!user) return null

    return { user, session }
  },
})

const adapter = getAdapter()

export const authOptions: NextAuthOptions = {
  adapter,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredendtialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials) return null

        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        })
        if (!user) return null

        const isPasswordCorrect = await compare(
          credentials?.password,
          user?.password as string
        )
        if (isPasswordCorrect) {
          return {
            id: user.id,
            email: user.email,
          }
        } else {
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
        },
      }
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email },
      })
      if (!dbUser) {
        token.id = user.id
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async redirect() {
      return '/'
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  // debug: process.env.NODE_ENV === 'development',
}

export const getAuthSession = () => getServerSession(authOptions)
