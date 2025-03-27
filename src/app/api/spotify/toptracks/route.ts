import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function GET(req: Request) {
    const session = await getServerSession(options);

    if (!session || !session.accessToken) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
        headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

