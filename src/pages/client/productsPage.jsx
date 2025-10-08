import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const url =
          query === ""
            ? `${import.meta.env.VITE_BACKEND_URL}/api/products`
            : `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${query}`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/be.jpg')" }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Search Bar – floating under header */}
      <div className="absolute top-[100px] w-full max-w-xl px-6 z-20">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md transition duration-300 hover:shadow-lg text-base"
        />
      </div>

      {/* Products Grid */}
      <div className="relative z-20 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 mt-[180px]">
        {loading ? (
          <Loader />
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="bg-gradient-to-t from-black/30 via-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transform transition duration-300 p-4"
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
