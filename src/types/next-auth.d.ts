import { Session, Account, DefaultSession} from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Account {
        refresh_token_expires_in?: number;
    }

    interface Session {
        user: {
        } & DefaultSession["user"];
        token_provider?: string;
    }

    interface User {
        provider?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token?: string;
        expires_at?: number;
        refresh_token?: string;
        refresh_token_expires_in?: number;
        provider?: string;
    }
}
