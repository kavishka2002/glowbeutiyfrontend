import { useState, useEffect } from "react";
import { BiCart } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { FaSpa, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/reviews", label: "Reviews" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  // Scroll effect: transparent → solid gradient
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-4 flex items-center justify-between rounded-b-3xl transition-colors duration-500 ${
        scroll
          ? "bg-gradient-to-r from-[#f472b6]/95 via-[#a855f7]/95 to-[#ec4899]/95 shadow-[0_4px_20px_rgba(236,72,153,0.4)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center space-x-2">
        <FaSpa className="text-white text-4xl drop-shadow-lg" />
        <span className="text-2xl font-bold tracking-wide text-white font-serif drop-shadow-lg">
          Glow<span className="text-pink-300">Beauty</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`relative text-lg font-medium transition-all duration-300 ${
              location.pathname === link.to
                ? "text-white after:w-full"
                : "text-white/80 hover:text-white"
            } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-pink-300 after:transition-all after:duration-300 after:w-0 hover:after:w-full`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Cart + Mobile Menu */}
      <div className="flex items-center gap-4">
        <Link
          to="/cart"
          className="relative flex items-center justify-center p-2 rounded-full bg-white/30 hover:bg-white/40 transition duration-300"
        >
          <BiCart className="text-white text-3xl" />
          <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            2
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[90px] left-0 w-full bg-gradient-to-b from-pink-600/90 via-purple-700/90 to-pink-700/90 backdrop-blur-lg shadow-lg flex flex-col items-center space-y-6 py-8 rounded-b-3xl animate-fadeIn md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-lg font-semibold ${
                location.pathname === link.to
                  ? "text-white underline"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
