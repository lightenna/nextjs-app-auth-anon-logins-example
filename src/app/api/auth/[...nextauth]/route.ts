import NextAuth, {Account, Profile, AuthOptions, SessionStrategy, Awaitable, Session, User} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {JWT} from "next-auth/jwt";
import {AdapterUser} from "next-auth/adapters";
import { uniqueNamesGenerator, Config, adjectives, colors, starWars, animals } from 'unique-names-generator';
import { randomUUID } from 'crypto';
import Debug from 'debug';
const debug = Debug("nextjs:api:auth");

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "anonymous",
            credentials: {},
            async authorize(credentials, req) {
                return createAnonymousUser();
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({token, account, profile}: {token: JWT, account: Account | null, profile?: Profile}): Promise<JWT> {
            if (account && account?.expires_at && account?.type === 'oauth') {
                // at sign-in, persist in the JWT the GitHub account details to enable brokered requests in the future
                token.access_token = account.access_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                token.refresh_token_expires_in = account.refresh_token_expires_in;
                token.provider = 'github';
            }
            if (!token.provider) token.provider = 'anonymous';
            return token;
        },
        async session({session, token, user}: {session: Session, token: JWT, user: AdapterUser}): Promise<Session> {
            // don't make the token (JWT) contents available to the client session (JWT), but flag that they're server-side
            if (token.provider) {
                session.token_provider = token.provider;
            }
            return session;
        },
    },
    events: {
        async signIn({user, account, profile}: {user: User, account: Account | null, profile?: Profile}): Promise<void> {
            debug(`signIn of ${user.name} from ${user?.provider || account?.provider}`);
        },
        async signOut({session, token}: {session: Session, token: JWT}): Promise<void> {
            debug(`signOut of ${token.name} from ${token.provider}`);
        },
    },
    session: {
        // use default, an encrypted JWT (JWE) store in the session cookie
        strategy: "jwt" as SessionStrategy,
    },
}
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}

// Helper functions

const createAnonymousUser = (): User => {
    // generate a random name and email for this anonymous user
    const customConfig: Config = {
        dictionaries: [adjectives, colors, animals],
        separator: '-',
        length: 3,
        style: 'capital'
    };
    // handle is simple-red-aardvark
    const unique_handle: string = uniqueNamesGenerator(customConfig).replaceAll(' ','');
    // real name is Red Aardvark
    const unique_realname: string = unique_handle.split('-').slice(1).join(' ');
    const unique_uuid: string = randomUUID();
    return {
        id: unique_uuid,
        email: `${unique_handle.toLowerCase()}@example.com`,
        name: unique_realname,
        image: "",
        provider: "anonymous"
    };
};
