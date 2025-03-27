import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthProvider'
import { Roboto } from "next/font/google";
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Project',
  description: 'Goood project',
}
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // You can customize the weights
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <Navbar />
          <main className="flex justify-center items-start p-6 min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-900">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
