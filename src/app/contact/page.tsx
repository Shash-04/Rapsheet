"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Github, 
    Linkedin, 
    Twitter, 
    Mail, 
    Send, 
    Instagram, 
    MapPin, 
    Link as LinkIcon 
} from "lucide-react";

const SocialLink = ({ 
    href, 
    icon: Icon, 
    label, 
    color 
}: { 
    href: string, 
    icon: React.ComponentType<{className?: string}>, 
    label: string, 
    color: string 
}) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className={`
                flex items-center space-x-3 
                px-4 py-3 my-2 
                bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                backdrop-blur-md 
                rounded-xl 
                border border-gray-700/50
                shadow-2xl 
                hover:shadow-blue-500/30 
                transition-all 
                duration-300
                transform 
                hover:-translate-y-2
            `}>
                <Icon 
                    className={`w-6 h-6 ${color} group-hover:${color.replace('text-', 'text-')}-400 transition-colors duration-300`} 
                />
                <span className="text-white font-medium group-hover:text-gray-100 transition-colors duration-300">
                    {label}
                </span>
            </div>
        </motion.a>
    );
};

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Construct mailto link
        const mailtoLink = `mailto:shashwatvaish1@gmail.com?subject=Contact%20from%20Website&body=From:%20${encodeURIComponent(email)}%0A%0AMessage:%20${encodeURIComponent(message)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Clear form and show sent confirmation
        setEmail("");
        setMessage("");
        setIsSent(true);
        
        // Reset sent state after 3 seconds
        setTimeout(() => {
            setIsSent(false);
        }, 3000);
    };

    return (
        // <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white py-12 px-4 relative overflow-hidden">
        <div >
            {/* Subtle background glow effect */}
            {/* <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div> */}

            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl  relative z-10"
            >
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight"
                    >
                        Connect with me 
                    </motion.h1>
                    <p className="text-gray-100 max-w-xl mx-auto text-lg opacity-80">
                    
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Social Links */}
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <SocialLink 
                            href="https://github.com/Shash-04"
                            icon={Github}
                            label="GitHub"
                            color="text-gray-200"
                        />
                        <SocialLink 
                            href="https://www.linkedin.com/in/shashwat-vaish-6256442b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            icon={Linkedin}
                            label="LinkedIn"
                            color="text-blue-500"
                        />
                        <SocialLink 
                            href="https://x.com/ShashwatVaish2"
                            icon={Twitter}
                            label="Twitter"
                            color="text-sky-500"
                        />
                        <SocialLink 
                            href="https://instagram.com/shash.ded"
                            icon={Instagram}
                            label="Instagram"
                            color="text-pink-500"
                        />
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl"
                    >
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
                                Email Address
                            </label>
                            <input 
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-md rounded-xl text-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/70 
                                transition-all duration-300 
                                border border-gray-600/50"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-sm text-gray-300">
                                Your Message
                            </label>
                            <textarea 
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-md rounded-xl text-white 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/70 
                                transition-all duration-300 
                                border border-gray-600/50"
                                placeholder="Write your message here..."
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full flex items-center justify-center space-x-3 
                            bg-gradient-to-r from-blue-500 to-purple-600 
                            text-white py-3.5 rounded-xl 
                            hover:opacity-90 transition-all duration-300 
                            shadow-xl hover:shadow-blue-500/50 
                            group"
                        >
                            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Send Message</span>
                        </motion.button>

                        {/* Sent Confirmation */}
                        <AnimatePresence>
                            {isSent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center text-green-400 bg-green-500/10 p-3 rounded-xl"
                                >
                                    Message sent successfully!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>
                </div>

                {/* Additional Contact Info */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="flex justify-center items-center space-x-4 text-gray-400">
                        <MapPin className="w-5 h-5 animate-pulse" />
                        <span className="font-medium">Delhi, India</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}