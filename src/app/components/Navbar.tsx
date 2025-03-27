"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bbg-gradient-to-br from-gray-950 via-black to-gray-900 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Name */}
                    <div className="">
                        <Link href="/" className=" text-white font-bold text-3xl hover:text-purple-200 transition-all duration-300 transform hover:scale-105">
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                RapSheet
                            </h1>
                        </Link>
                    </div>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <Link href="/contact" className="text-xl text-white hover:bg-purple-700 px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px]">
                            Contact
                        </Link>
                        <Link href="/api/auth/signin" className="text-xl text-white hover:bg-purple-700 px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px]">
                            Sign In
                        </Link>
                        <Link href="/api/auth/signout" className="text-xl text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:translate-y-[-2px]">
                            Sign Out
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-purple-200 focus:outline-none transition-all duration-300 transform hover:scale-110"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-700 rounded-b-lg">
                            <Link
                                href="/contact"
                                className="text-white block hover:bg-purple-600 px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:translate-x-2"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>
                            <Link
                                href="/api/auth/signin"
                                className="text-white block hover:bg-purple-600 px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:translate-x-2"
                                onClick={toggleMenu}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/api/auth/signout"
                                className="text-white block bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:translate-x-2"
                                onClick={toggleMenu}
                            >
                                Sign Out
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;