"use client";

import { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function capitalizeGenres(genres: string[]): string[] {
    return genres.map(genre =>
        genre
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );
}

export default function TopGenresDonut() {
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await fetch("/api/spotify/genre");
                const data = await response.json();
                if (response.ok) {
                    setGenres(capitalizeGenres(data));
                } else {
                    setError(data.error || "Failed to fetch genres");
                }
            } catch (err) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchGenres();
    }, []);

    const getTopGenres = (genres: string[]) => {
        const genreCount: Record<string, number> = {};
        genres.forEach(genre => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
        return Object.entries(genreCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, value]) => ({ name, value }));
    };

    const data = useMemo(() => getTopGenres(genres), [genres]);
    const COLORS = ["#FF5733", "#FFC300", "#36A2EB", "#4BC0C0", "#9966FF"];

    if (loading) return <p className="text-white text-center">Loading genres...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex bg-gray-800 rounded-2xl p-8 w-full max-w-3xl">
                {/* Donut Chart */}
                <div className="w-2/3 flex justify-center items-center">
                    <ResponsiveContainer width={250} height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                dataKey="value"
                                stroke="none"
                                animationDuration={700}
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "8px", color: "#fff" }}
                                cursor={{ fill: "transparent" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Genre List */}
                <div className="w-1/3 flex flex-col justify-center space-y-4">
                    <h2 className="text-white text-xl font-semibold border-b pb-2 border-gray-600">Top 5 Genres</h2>
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                            <span className="text-gray-200 text-lg font-medium">{item.name} ({item.value})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
