import { NextApiHandler } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import EmailProvider from 'next-auth/providers/email';

import { prisma } from '@/lib/prisma';

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST as string,
    //     port: Number(process.env.EMAIL_SERVER_PORT),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER as string,
    //       pass: process.env.EMAIL_SERVER_PASSWORD as string,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    // @ts-ignore
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      session.user.id = user.id;

      return Promise.resolve(session);
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
}


const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;