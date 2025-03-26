"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Mic } from "lucide-react";

export default function ToggleSwitch({ onToggle }: { onToggle: (type: string) => void }) {
    const [active, setActive] = useState("TopTracks");

    const toggle = () => {
        const newType = active === "TopTracks" ? "TopArtists" : "TopTracks";
        setActive(newType);
        onToggle(newType);
    };

    return (
        <div className="w-full max-w-md px-4">
            <div
                className="relative flex items-center w-full min-h-[56px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={toggle}
            >
                {/* Sliding Background */}
                <motion.div
                    className="absolute h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    initial={false}
                    animate={{
                        x: active === "TopTracks" ? 0 : "100%",
                    }}
                    transition={{ 
                        type: "tween", 
                        duration: 0.2 
                    }}
                />

                {/* Labels with Icons */}
                <div className="relative z-10 flex w-full">
                    <div 
                        className={`w-1/2 flex items-center justify-center space-x-2 py-3 sm:py-4 transition-all duration-200 ${
                            active === "TopTracks" ? "text-white" : "text-gray-500"
                        }`}
                    >
                        <Music 
                            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 ${
                                active === "TopTracks" 
                                    ? "scale-100 text-white" 
                                    : "scale-75 text-gray-400"
                            }`} 
                        />
                        <span className="text-sm sm:text-base">Top Tracks</span>
                    </div>
                    <div 
                        className={`w-1/2 flex items-center justify-center space-x-2 py-3 sm:py-4 transition-all duration-200 ${
                            active === "TopArtists" ? "text-white" : "text-gray-500"
                        }`}
                    >
                        <Mic 
                            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 ${
                                active === "TopArtists" 
                                    ? "scale-100 text-white" 
                                    : "scale-75 text-gray-400"
                            }`} 
                        />
                        <span className="text-sm sm:text-base">Top Artists</span>
                    </div>
                </div>
            </div>
        </div>
    );
}