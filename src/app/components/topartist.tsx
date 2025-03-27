"use client";
import { useEffect, useState } from "react";
import { IBM_Plex_Mono } from '@next/font/google';
import html2canvas from "html2canvas";

type Artist = {
    name: string;
    images: { url: string }[];
    external_urls: { spotify: string };
};

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default function TopArtists() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    const handleDownload = async () => {
        const element = document.getElementById("TopArtist");
        if (!element) return;

        const images = element.getElementsByTagName("img");
        await Promise.all([...images].map(img => new Promise(resolve => {
            if (img.complete) resolve(true);
            else img.onload = () => resolve(true);
        })));

        const canvas = await html2canvas(element, { useCORS: true });
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "TopArtists.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        async function getSession() {
            try {
                const res = await fetch('/api/auth/session');
                const data = await res.json();
                setName(data.user.name);

                const expiryDate = new Date(data.expires);
                const formatted = expiryDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }).toUpperCase();

                setFormattedDate(formatted);
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        }

        async function fetchArtists() {
            try {
                const res = await fetch("/api/spotify/topartist");
                const data = await res.json();
        
                if (!data || !data.items || !Array.isArray(data.items)) {
                    console.error("Invalid API response:", data);
                    return;
                }
        
                setArtists(data.items);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            } finally {
                setLoading(false);
            }
        }
        

        getSession();
        fetchArtists();
    }, []);

    return (
        <div className={ibmPlexMono.className}>
            <div className="max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul id="TopArtist" className="bg-[url('/list.jpg')] bg-cover bg-center bg-no-repeat p-4">
                        <h1 className="font-mono text-center text-black text-4xl font-bold">TrackList</h1>
                        <p className="font-mono text-center text-black text-2xl">Last month</p><br />
                        <p className="text-black">ORDER #0001 FOR {name || "Guest"}</p>
                        <p className="text-black text-sm">{formattedDate || "Loading..."}</p>

                        <div className="w-full text-black">
                            <div className="border-b border-black w-full my-2"></div>
                            <p className="flex justify-between w-full">
                                <span>COVER &nbsp; ARTIST</span>
                            </p>
                            <div className="border-b border-black w-full my-2"></div>
                        </div>

                        {artists.map((artist, index) => (
                            <li key={index} className="flex items-center space-x-4 p-2 text-black rounded-md">
                                <img

                                    src={artist.images?.[0]?.url || "/placeholder.jpg"}
                                    alt={artist.name}
                                    className="w-12 hover:scale-110 h-12 rounded-md"
                                />
                                <div>
                                    <a
                                        href={artist.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-semibold hover:underline"
                                    >
                                        {artist.name}
                                    </a>
                                </div>
                            </li>
                        ))}

                        <div className="w-full text-black">
                            <div className="border-b border-black w-full my-2"></div>
                            <p className="flex justify-between w-full">
                                <span>ITEM COUNT:</span>
                                <span>{artists.length}</span>
                            </p>
                            <div className="border-b border-black w-full my-2"></div>
                        </div>

                        <p className="text-black">CARD: **** **** **** 2069</p>
                        <p className="text-black">AUTH CODE: 1345</p>
                        <p className="text-black font-bold">CARDHOLDER: {name}</p> <br />
                        <div className="flex justify-center text-black">
                            <p className="text-2xl font-bold">THANK YOU FOR VISITING!</p><br /><br />
                        </div>
                        <div className="flex justify-center text-black">
                            <img className="h-20" src="qr.png" alt="" />
                        </div>
                    </ul>
                )}
            </div>
            <br />
            <div className="flex justify-center">
                <button onClick={handleDownload} className="bg-blue-500 text-2xl text-white px-4 py-2 rounded">
                    Download Artist List
                </button>
            </div>
        </div>
    );
}
