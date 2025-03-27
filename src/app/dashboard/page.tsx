"use client";

import React, { useState } from "react";
import TopTracks from "../components/toptracks";
import ToggleSwitch from "../components/ToggleSwitch";
import TopArtists from "../components/topartist";
import TopGenres from "@/app/components/TopGenres";

function Page() {
  const [activeTab, setActiveTab] = useState("TopTracks");

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      {/* Page Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">🎵 Your Music Stats 🎵</h1>

      {/* Toggle Switch */}
      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Top Tracks & Artists</h2>
        <ToggleSwitch onToggle={setActiveTab} />
      </div>

      {/* Active Tab Content */}
      <div className="w-full flex justify-center items-center mt-6">
        {activeTab === "TopTracks" ? <TopTracks /> : <TopArtists />}
      </div>

      {/* Top Genres Section */}
      <div className="w-full max-w-lg mt-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 flex justify-center items-center whitespace-nowrap">
          🔥 Your Top Genres 🔥
        </h2>
        <TopGenres />
      </div>
    </div>
  );
}

export default Page;
