"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Music } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
    <div className=' flex py-32 items-center justify-center px-2'>
      <main className="flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2
            }}
            className="text-6xl font-extrabold mb-6"
          >
            Uncover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Spotify Story</span>
          </motion.h2>

          <p className="text-xl mb-8 text-gray-300">
            Dive deep into your music journey with personalized insights and comprehensive analytics.
          </p>

          <div className="flex justify-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition"
            >
              {/* <Microphone size={20} /> */}
              <Link href="api/auth/signin"> <span>Explore Your Stats</span></Link>
            </motion.button>
          </div>
        </motion.div>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 right-0 flex justify-center space-x-6 pb-6 text-white/50"
      >
      </motion.div>
    </div>
  );
};

export default HomePage;