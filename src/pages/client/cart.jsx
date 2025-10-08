import { useState } from "react";
import { addToCart, getCart, getTotal } from "../../utils/cart";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/tb";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center drop-shadow-[0_4px_10px_rgba(255,192,203,0.6)]">
        Your <span className="text-pink-400">Cart</span> 🛍️
      </h1>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <p className="text-gray-400 text-lg mt-10">
          Your cart is empty 💔 — start shopping now!
        </p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6 w-[90%] md:w-[800px]">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-pink-400/30 hover:border-pink-400/60 transition duration-300 p-4 md:h-[120px]"
              >
                {/* Product Image */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[90px] h-[90px] object-cover rounded-2xl shadow-md"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-pink-300 text-sm">{item.category}</p>
                    <p className="text-gray-300 font-semibold">
                      Rs{" "}
                      {item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mt-4 md:mt-0">
                  <button
                    className="w-[32px] h-[32px] flex justify-center items-center bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition"
                    onClick={() => {
                      addToCart(item, -1);
                      setCart(getCart());
                    }}
                  >
                    -
                  </button>
                  <span className="mx-3 text-lg font-bold">
                    {item.quantity}
                  </span>
                  <button
                    className="w-[32px] h-[32px] flex justify-center items-center bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition"
                    onClick={() => {
                      addToCart(item, 1);
                      setCart(getCart());
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-lg font-bold text-pink-300 mt-3 md:mt-0">
                  Rs{" "}
                  {(item.quantity * item.price).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>

                {/* Delete Button */}
                <button
                  className="w-[36px] h-[36px] flex justify-center items-center bg-red-600 text-white rounded-full hover:bg-red-500 transition shadow-md ml-4"
                  onClick={() => {
                    addToCart(item, -item.quantity);
                    setCart(getCart());
                  }}
                >
                  <TbTrash className="text-xl" />
                </button>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="w-[90%] md:w-[800px] mt-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-center border border-pink-400/30">
            <span className="text-2xl font-bold text-pink-300 mb-4 md:mb-0">
              Total: Rs{" "}
              {getTotal().toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>

            <button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
              onClick={() => {
                navigate("/checkout", {
                  state: {
                    items: cart,
                  },
                });
              }}
            >
              Proceed to Checkout 💳
            </button>
          </div>
        </>
      )}

      {/* Bottom Glow */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-pink-500/10 to-transparent"></div>
    </div>
  );
}
