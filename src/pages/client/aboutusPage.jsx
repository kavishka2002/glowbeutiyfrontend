import Header from "../../components/Header";
import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaStar, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Header /> {/* 🩷 Same header reuse කරනවා */}

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
            About <span className="text-pink-400">GlowBeauty</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-pink-100 leading-relaxed max-w-3xl mx-auto mb-10">
            At GlowBeauty, we celebrate confidence, elegance, and natural beauty.
            Our mission is to empower every woman to feel beautiful inside and out —
            with products crafted using love, care, and premium ingredients.
          </p>

          {/* Feature Icons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
            >
              <FaHeart className="text-pink-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Made with Love</h3>
              <p className="text-sm text-gray-300">
                Every product is created with deep passion and care for your skin.s
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
            >
              <FaLeaf className="text-green-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Eco-Friendly</h3>
              <p className="text-sm text-gray-300">
                We use sustainable ingredients that care for nature and you.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
            >
              <FaStar className="text-yellow-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-300">
                Our products are dermatologically tested and trusted by experts.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg"
            >
              <FaUsers className="text-blue-400 text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Community First</h3>
              <p className="text-sm text-gray-300">
                Join thousands of women glowing with confidence and beauty.
              </p>
            </motion.div>
          </div>

          {/* Mission Section */}
          <motion.div
            className="mt-20 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-pink-300">
              Our Mission 🌸
            </h2>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed">
              We aim to redefine beauty through authenticity and self-love.
              From natural skincare to glam essentials, GlowBeauty is more than
              a brand — it’s a movement towards self-confidence and positivity.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-pink-500/10 to-transparent"></div>
      </section>
    </>
  );
}
