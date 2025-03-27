"use client";
import { useState } from 'react';
import {
    Music,
    User,
    Clock,
    PieChart,
    Trophy,
    Headphones,
    PlayCircle,
    Share2,
    Shuffle
} from 'lucide-react';

const mockTrackData = [
    {
        id: 1,
        title: "Bexley .Road",
        artist: "Baghh-e SMG, BIG KAY SMG, Farmaan SMG",
        cover: "/api/placeholder/50/50",
        plays: 342
    },
    {
        id: 2,
        title: "Green Flag",
        artist: "Vikram Sarkar",
        cover: "/api/placeholder/50/50",
        plays: 287
    },
    {
        id: 3,
        title: "Knife Brows",
        artist: "Dhanda Nyoliwala",
        cover: "/api/placeholder/50/50",
        plays: 219
    }
];

const GenreChart = () => {
    const genres = [
        { name: "Hip Hop", percentage: 45, color: "bg-purple-500" },
        { name: "Pop", percentage: 25, color: "bg-blue-500" },
        { name: "Electronic", percentage: 15, color: "bg-green-500" },
        { name: "Others", percentage: 15, color: "bg-gray-500" }
    ];

    return (
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white flex items-center">
                    <PieChart className="mr-2 text-blue-400" /> Genre Distribution
                </h3>
                <span className="text-gray-400">Last Month</span>
            </div>
            <div className="space-y-2">
                {genres.map((genre) => (
                    <div key={genre.name} className="flex items-center">
                        <div className={`w-3 h-3 ${genre.color} rounded-full mr-3`}></div>
                        <div className="flex-grow bg-gray-700 rounded-full h-2">
                            <div
                                className={`${genre.color} h-2 rounded-full`}
                                style={{ width: `${genre.percentage}%` }}
                            ></div>
                        </div>
                        <span className="ml-3 text-white text-sm">{genre.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function EnhancedDashboard() {
    const [activeTab, setActiveTab] = useState('tracks');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        RapSheet
                    </h1>
                    <p className="text-gray-400">Your Musical Journey</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition">
                        <User className="inline mr-2" size={18} /> Profile
                    </button>
                    <button className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition">
                        <Shuffle className="inline mr-2" size={18} /> Discover
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Top Tracks Section */}
                <div className="md:col-span-2 bg-gray-800/50 backdrop-blur-xl rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2 bg-gray-700 rounded-full p-1">
                            <button
                                onClick={() => setActiveTab('tracks')}
                                className={`px-4 py-2 rounded-full transition ${activeTab === 'tracks'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                <Music className="inline mr-2" size={18} /> Top Tracks
                            </button>
                            <button
                                onClick={() => setActiveTab('artists')}
                                className={`px-4 py-2 rounded-full transition ${activeTab === 'artists'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-400 hover:bg-gray-600'
                                    }`}
                            >
                                <Headphones className="inline mr-2" size={18} /> Top Artists
                            </button>
                        </div>
                        <button className="text-gray-400 hover:text-white transition">
                            <Share2 className="inline mr-2" /> Share
                        </button>
                    </div>

                    {activeTab === 'tracks' && (
                        <div className="space-y-4">
                            {mockTrackData.map((track) => (
                                <div
                                    key={track.id}
                                    className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={track.cover}
                                            alt={track.title}
                                            className="w-12 h-12 rounded-lg"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{track.title}</h4>
                                            <p className="text-gray-400 text-sm">{track.artist}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-400 text-sm">{track.plays} plays</span>
                                        <button className="text-green-500 hover:text-green-400">
                                            <PlayCircle />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Insights Column */}
                <div className="space-y-6">
                    <GenreChart />
                    {/* Listening Stats */}
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white flex items-center mb-4">
                            <Trophy className="mr-2 text-yellow-400" /> Listening Highlights
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Listening Time</span>
                                <span className="text-white font-medium">42h 15m</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Top Genre</span>
                                <span className="text-white font-medium">Hip Hop</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">New Artists</span>
                                <span className="text-white font-medium">12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}