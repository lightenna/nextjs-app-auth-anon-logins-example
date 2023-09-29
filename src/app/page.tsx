import { permanentRedirect } from 'next/navigation'

export default async function Home() {
    permanentRedirect('/editor')
}
