import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../../components/Header"; // ✅ Make sure the path is correct

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cart, setCart] = useState(location.state?.items || []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setName(res.data.firstName + " " + res.data.lastName);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch user details");
      });
  }, []);

  if (!cart || cart.length === 0) {
    toast.error("Please select items to checkout");
    navigate("/products");
  }

  function getTotal() {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }
    if (!name || !address || !phone) {
      toast.error("Please fill all the fields");
      return;
    }

    const order = {
      name,
      address,
      phone,
      items: cart.map((item) => ({ productId: item.productId, qty: item.quantity })),
    };

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white relative">
      {/* Header */}
      <Header />

      {/* Background overlay + content */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6 pt-32 px-4 pb-10"
        style={{
          backgroundImage: "url('/checkout-bg.jpg')", // Add your background image to /public
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 rounded-3xl"></div>

        {/* Cart Items */}
        <div className="relative z-10 flex flex-col gap-6">
          {cart.map((item, index) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-black/40 via-purple-900/40 to-pink-900/40 shadow-2xl backdrop-blur-md hover:shadow-3xl transform hover:-translate-y-1 transition-all"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl"
              />
              <div className="flex-1 flex flex-col justify-center text-white px-4">
                <span className="text-lg font-bold">{item.name}</span>
                <span className="text-sm text-gray-300">{item.category || ""}</span>
                <span className="text-pink-400 font-semibold mt-1">
                  ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  onClick={() => {
                    const newCart = [...cart];
                    newCart[index].quantity -= 1;
                    if (newCart[index].quantity <= 0) newCart.splice(index, 1);
                    setCart(newCart);
                  }}
                >-</button>
                <span className="text-white font-semibold">{item.quantity}</span>
                <button
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  onClick={() => {
                    const newCart = [...cart];
                    newCart[index].quantity += 1;
                    setCart(newCart);
                  }}
                >+</button>
              </div>
              <button
                className="ml-4 w-10 h-10 rounded-full bg-red-700 hover:bg-white hover:text-red-700 text-white flex items-center justify-center shadow-lg"
                onClick={() => {
                  const newCart = [...cart];
                  newCart.splice(index, 1);
                  setCart(newCart);
                }}
              >
                <TbTrash size={20} />
              </button>
            </div>
          ))}

          {/* Total + Place Order */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-black/40 via-purple-900/40 to-pink-900/40 shadow-2xl backdrop-blur-md text-white">
            <span className="text-2xl font-bold">
              Total: ${getTotal().toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <button
              onClick={placeOrder}
              className="mt-4 sm:mt-0 px-6 py-3 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg transition"
            >
              Place Order
            </button>
          </div>

          {/* User Details Form */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-gradient-to-r from-black/40 via-purple-900/40 to-pink-900/40 shadow-2xl backdrop-blur-md">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
