"use client"
import { useEffect, useState } from "react";
import { IBM_Plex_Mono } from '@next/font/google';
import html2canvas from "html2canvas";
import ToggleSwitch from "./ToggleSwitch";

type Track = {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
};
const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default function TopTracks() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    const handleDownload = async () => {
        const element = document.getElementById("trackList");
        if (!element) return;
        // Wait for images to load
        const images = element.getElementsByTagName("img");
        await Promise.all([...images].map(img => new Promise(resolve => {
            if (img.complete) resolve(true);
            else img.onload = () => resolve(true);
        })));
    
        // Capture the element after images are loaded
        const canvas = await html2canvas(element, { useCORS: true });
        const image = canvas.toDataURL("image/png");
    
        // Download the image
        const link = document.createElement("a");
        link.href = image;
        link.download = "TrackList.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // async function getSession() {
    //     const res = await fetch('/api/auth/session');
    //     const data = await res.json();
    //     console.log(data.user.name); // Output: Shash
    //     setName(data.user.name);
    // }



    useEffect(() => {
        async function getSession() {
            try {
                const res = await fetch('/api/auth/session');
                const data = await res.json();
                setName(data.user.name);

                // Format the expiration date properly
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

        async function fetchTracks() {
            try {
                const res = await fetch("/api/spotify");
                const data = await res.json();
                setTracks(data.items);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            } finally {
                setLoading(false);
            }
        }

        // Call both functions
        getSession();
        fetchTracks();
    }, []);


    return (
        <div className={ibmPlexMono.className}>
             {/* <div><ToggleSwitch onToggle={(type) => console.log(type)} /></div> */}
            <div className="max-w-2xl mx-auto  bg-gray-900 text-white rounded-lg shadow-lg">
                {/* <h2 className=" text-center text-3xl ">Here is your Receipt</h2> */}
                {/* <h2 className="text-2xl font-bold mb-4">🎵 Your Top Tracks</h2> */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul id="trackList" className="bg-[url('/list.jpg')] bg-cover bg-center bg-no-repeat p-4 ">
                        <h1 className="font-mono text-center text-black text-4xl font-bold">TrackList</h1>
                        <p className=" font-mono text-center text-black text-2xl ">Last month</p><br />
                        <p className="text-black">ORDER #0001 FOR {name || "Guest"}</p>
                        <p className="text-black text-sm"> {formattedDate || "Loading..."}</p> {/* Display Date & Time */}
                        {/* <p className=" text-black">----------------------------------</p>
                        <p className=" text-black">COVER       &nbsp; ITEM</p>
                        <p className=" text-black">-------------------------------------------</p> */}
                        <div className="w-full text-black">
                            <div className="border-b border-black w-full my-2"></div>
                            <p className="flex justify-between w-full">
                                <span>COVER &nbsp; ITEM</span>
                                {/* <span>ITEM</span> */}
                            </p>
                            <div className="border-b border-black w-full my-2"></div>
                        </div>
                        {/* <img src="list.jpg" alt="" /> */}
                        {/* <img src="list.jpg" alt="" /> */}
                        {tracks.map((track, index) => (
                            <li key={index} className="flex items-center space-x-4 p-2 text-black rounded-md">
                                <img src={track.album.images[0].url} alt={track.name} className="w-12 h-12 rounded-md" />
                                <div>
                                    <a
                                        href={track.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-semibold hover:underline"
                                    >
                                        {track.name}
                                    </a>
                                    <p className="text-sm text-black">
                                        {track.artists.map((artist) => artist.name).join(", ")}
                                    </p>
                                </div>
                            </li>
                        ))}
                        <div className="w-full text-black">
                            <div className="border-b border-black w-full my-2"></div>
                            <p className="flex justify-between w-full">
                                <span>ITEM COUNT:</span>
                                <span>10</span>
                            </p>
                            <div className="border-b border-black w-full my-2"></div>
                        </div>
                        <p className="text-black ">CARD: **** **** **** 2069</p>
                        <p className="text-black ">AUTH CODE: 1345</p>
                        <p className="text-black  font-bold ">CARDHOLDER: {name}</p> <br />
                        <div className=" flex justify-center text-black ">
                            <p className=" text-2xl font-bold">THANK YOU FOR VISITING!</p><br /><br />
                        </div>
                        <div className=" flex justify-center text-black ">
                            <img className=" h-20" src="qr.png" alt="" />
                        </div>
                    </ul>
                )}
            </div>
            <br />
            <div className=" flex justify-center">
                <button onClick={handleDownload} className="bg-blue-500  text-2xl text-white px-4 py-2 rounded">
                    Download TrackList
                </button>
            </div>
        </div>
    );
}
