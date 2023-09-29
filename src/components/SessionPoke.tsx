import {useSession} from "next-auth/react"

export default function SessionPoke() {
    const { data, status } = useSession()

    if (data) {
        const json_dump = JSON.stringify(data);
        return (
            <p>Session as JSON: {json_dump}</p>
        );
    } else {
        return (
            <p>No data</p>
        );
    }
}
