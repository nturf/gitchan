import { Button } from "@/components/ui/button"
import Link from "next/link"
export default async function Home() {
    return (
        <div>
            <Button>Click</Button>
            <Button><Link href="/sign-up">Sign-up</Link></Button>
            <Button><Link href="/sign-in">Sign-in</Link></Button>
        </div>
    )
}
