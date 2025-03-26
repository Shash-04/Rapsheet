import type { NextAuthOptions } from 'next-auth'
import SpotifyProvider from "next-auth/providers/spotify";

export const options: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-top-read'
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Store access token in JWT
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass access token to session
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    pages: {
        signOut: "/", // Redirect to home after logout
    },
};
