"use client"
import React,{useState} from 'react'
import Home from '../page'
import TopTracks from '../components/toptracks'
import ToggleSwitch from '../components/ToggleSwitch'
import TopArtists from '../components/topartist'

function page() {
    const [activeTab, setActiveTab] = useState("TopTracks");

  return (
    <div>
      {/* Toggle Switch to change between Top Tracks & Top Artists */}
      <ToggleSwitch onToggle={setActiveTab} />  
      <br /><br />

      {/* Conditionally Render Based on Active Tab */}
      {activeTab === "TopTracks" ? <TopTracks /> : <TopArtists />}
    </div>
  );
}

export default page;
