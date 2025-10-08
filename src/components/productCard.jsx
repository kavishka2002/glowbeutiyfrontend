import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";

export default function ProductCard({ product }) {
  return (
    <div className="group relative w-[300px] h-[440px] flex flex-col shadow-xl rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#2a0845] to-[#2a0845]/90 border border-purple-800/40 hover:shadow-pink-700/40 hover:scale-105 transition-all duration-300">

      {/* Product Image */}
      <Link to={"/overview/" + product.productId} className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-[270px] object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Discount Badge */}
        {product.labelledPrice > product.price && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
            Sale
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col justify-between flex-1 p-5 text-white">
        <div>
          <h1 className="text-lg font-bold line-clamp-1 drop-shadow-sm">
            {product.name}
          </h1>
          <span className="text-gray-400 text-sm">{product.category}</span>

          {/* Ratings */}
          <div className="flex mt-1 text-yellow-400 drop-shadow-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-3">
          {product.labelledPrice > product.price ? (
            <p className="text-gray-300">
              <span className="line-through mr-2 text-gray-500">
                {product.labelledPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-pink-400 font-bold text-xl tracking-wide">
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          ) : (
            <span className="text-pink-400 font-bold text-xl tracking-wide">
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="absolute bottom-5 right-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-6">
        <BiCartAlt size={22} />
      </button>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
