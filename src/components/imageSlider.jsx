import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageSlider({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
      {/* Main Image */}
      <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900/20 via-black/20 to-pink-900/20">
        <img
          src={images[activeImageIndex]}
          alt="product"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition"
        >
          <FaChevronRight />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                activeImageIndex === index
                  ? "bg-pink-500 scale-125"
                  : "bg-gray-400 hover:bg-pink-400"
              }`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Row */}
      <div className="w-full flex gap-3 overflow-x-auto scrollbar-hide mt-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumbnail"
            className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-transform duration-300 ${
              activeImageIndex === index
                ? "border-pink-500 scale-110 shadow-lg"
                : "border-gray-300 hover:border-pink-400 hover:scale-105"
            }`}
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
