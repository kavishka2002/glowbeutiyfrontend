import Header from "../components/Header"; // adjust the path if needed
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Header /> {/* 🩷 Header added here */}

      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden text-white"
        style={{
          backgroundImage: "url('/be.jpg')", // Ensure be.jpg inside public/
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 md:px-10 max-w-4xl mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-wide drop-shadow-[0_4px_10px_rgba(255,192,203,0.6)]">
            Glow<span className="text-pink-400">Beauty</span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl mb-6 font-light text-pink-100 drop-shadow-md">
            Redefining your inner glow with luxury, love, and care ✨
          </p>

          <p className="text-sm md:text-base text-gray-200 max-w-xl mx-auto mb-10 leading-relaxed">
            At GlowBeauty, we believe every woman deserves to shine.  
            Explore premium cosmetics, skincare, and beauty tips tailored just for you 💋
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-10">
            <Link
              to="/products"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              🛍️ Shop Now
            </Link>
            <Link
              to="/about-us"
              className="border border-pink-400 text-pink-300 text-lg font-medium px-8 py-3 rounded-full hover:bg-pink-400/20 transition duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 space-y-3 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg mx-auto max-w-md text-left">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-pink-300" />
              <span className="text-sm md:text-base">+94 71 234 5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-pink-300" />
              <span className="text-sm md:text-base">info@glowbeauty.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-pink-300" />
              <span className="text-sm md:text-base">
                123 Glow Street, Colombo, Sri Lanka
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-8">
            <a href="#" className="text-pink-300 hover:text-white transition text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-pink-300 hover:text-white transition text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-pink-300 hover:text-white transition text-xl">
              <FaTiktok />
            </a>
          </div>
        </motion.div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-pink-500/10 to-transparent"></div>
      </section>
    </>
  );
}
