import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import toast from "react-hot-toast";
import Header from "../../components/Header"; // ✅ Make sure Header is imported

export default function ProductOverViewPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + `/api/products/${params.productId}`)
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch((error) => {
          setStatus("error");
          console.error("Error fetching product:", error);
        });
    }
  }, [status]);

  return (
    <div className="w-full min-h-screen bg-black text-white relative">
      {/* Header */}
      <Header />

      {status === "loading" && <Loader />}

      {status === "success" && (
        <div className="relative z-10 max-w-6xl mx-auto p-4 pt-32 flex flex-col lg:flex-row gap-8">
          {/* Image Slider */}
          <div className="lg:w-1/2 w-full bg-gradient-to-br from-purple-900/40 via-black/30 to-pink-900/40 rounded-3xl shadow-2xl p-4 backdrop-blur-md">
            <ImageSlider images={product.images} />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 w-full flex flex-col justify-start gap-6 bg-gradient-to-br from-black/40 via-purple-900/40 to-pink-900/40 p-6 rounded-3xl shadow-2xl backdrop-blur-md">
            <h1 className="text-3xl font-bold">
              {product.name}{" "}
              <span className="font-light text-gray-300 text-xl">{product.altName}</span>
            </h1>

            <p className="text-gray-300 text-lg">{product.description}</p>

            {/* Price */}
            <div className="flex items-center gap-4 mt-4">
              {product.labelledPrice > product.price ? (
                <>
                  <span className="text-gray-400 text-2xl line-through">
                    ${product.labelledPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-pink-500 text-3xl font-bold">
                    ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </>
              ) : (
                <span className="text-pink-500 text-3xl font-bold">
                  ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          quantity: 1,
                          name: product.name,
                          image: product.images[0],
                          price: product.price,
                        },
                      ],
                    },
                  });
                }}
                className="flex-1 bg-blue-900 text-white font-semibold py-3 rounded-2xl shadow-lg border-2 border-blue-900 hover:bg-white hover:text-blue-900 transition"
              >
                Buy Now
              </button>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                  console.log(getCart());
                }}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-2xl shadow-lg border-2 border-blue-600 hover:bg-white hover:text-blue-600 transition"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="w-full h-full flex justify-center items-center text-red-600 text-xl font-bold">
          Error loading product. Please try again later.
        </div>
      )}
    </div>
  );
}
