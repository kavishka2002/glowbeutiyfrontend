import Header from "../../components/Header";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <Header /> {/* 🩷 Reuse same header */}

      <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/be.jpg')" }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 drop-shadow-[0_4px_10px_rgba(255,192,203,0.6)]">
            Contact <span className="text-pink-400">Us</span>
          </h1>

          <p className="text-pink-100 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
            Have a question or just want to say hi?  
            We'd love to hear from you! Get in touch with our friendly team and we’ll get back to you soon 💌
          </p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg"
            >
              <FaPhoneAlt className="text-pink-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-gray-300">+94 71 234 5678</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg"
            >
              <FaEnvelope className="text-pink-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-300">info@glowbeauty.com</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg"
            >
              <FaMapMarkerAlt className="text-pink-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p className="text-gray-300">123 Glow Street, Colombo, Sri Lanka</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-3xl mx-auto text-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-pink-300">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-pink-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-pink-300">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400"
                required
              ></textarea>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300"
              >
                ✉️ Send Message
              </button>
            </div>
          </motion.form>
        </motion.div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-pink-500/10 to-transparent"></div>
      </section>
    </>
  );
}
