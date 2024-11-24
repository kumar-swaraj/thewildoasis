import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { config } from '@/lib/config';
import { createGuest, getGuest } from '@/lib/data-service';

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: config.oauth.google.id,
      clientSecret: config.oauth.google.secret,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const { email, name } = user;

        if (email) {
          const existingGuest = await getGuest(email);

          if (!existingGuest) {
            await createGuest({
              fullName: name ?? '<NameNotFound>',
              email,
            });
          }
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);

      if (guest) {
        session.user.id = guest._id;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authConfig);
