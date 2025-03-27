import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
    const session = await getServerSession(options);

    if (!session || !session.accessToken) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "Failed to fetch top artists" }), {
                status: response.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await response.json();

        // Collect all genres (including duplicates)
        const genres: string[] = [];
        data.items.forEach((artist: any) => {
            genres.push(...artist.genres); // Push all genres of each artist
        });

        return new Response(JSON.stringify(genres), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
