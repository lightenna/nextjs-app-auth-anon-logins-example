import {useEffect, ReactNode} from "react";
import {signIn, useSession} from "next-auth/react"

export default function AnonymousSessionProvider({
    children
}: {
    children: ReactNode
}) {
    const {data: session, status} = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
            // login as anonymous
            signIn("credentials")
                .then((data) => {
                    // async sign-in returned
                });
        }
    }, [status]);

    return (
        <>
            {children}
        </>
    );
}
