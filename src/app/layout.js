import { Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "QurbaniHat | Livestock Marketplace",
  description: "Book your Qurbani animal easily",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}