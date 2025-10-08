import { useEffect, useState } from "react";
import axios from "axios";
import Paginator from "../../components/paginator.jsx";
import toast from "react-hot-toast";

export default function OrderPageAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [popupVisible, setPopuoVisible] = useState(false);
  const [click, setClick] = useState(null);

  const [products, setProducts] = useState([]);
  const [orderStatus, setoderStatus] = useState("pending");
  const [orderNote, setorderNote] = useState("");


  // Load orders
  useEffect(() => {
    if (loading) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setOrders(res.data.orders);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loading, page, limit]);

  // Load products (to get images)
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Helper: get product photo
  const getProductPhoto = (productId) => {
    const product = products.find((p) => p.productId === productId);
    return product ? product.images[0] : "https://via.placeholder.com/60";
  };

  return (
    <div className="w-full h-full flex justify-center items-start p-6 bg-gray-50">
      <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-2xl bg-white">
        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase tracking-wider">
              <th className="p-4">Order ID</th>
              <th className="p-4">Email</th>
              <th className="p-4">Name</th>
              <th className="p-4">Address</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderId}
                className="text-sm text-gray-800 border-b last:border-none hover:bg-blue-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setoderStatus(order.status);
                  setorderNote(order.notes);
                  setClick(order);
                  setPopuoVisible(true);
                }}
              >
                <td className="p-4 font-medium">{order.orderId}</td>
                <td className="p-4">{order.email}</td>
                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.address}</td>
                <td className="p-4">{order.phone}</td>
                <td
                  className={`p-4 font-semibold ${
                    order.status === "pending"
                      ? "text-yellow-600"
                      : order.status === "completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-4">{order.date.substring(0, 10)}</td>
                <td className="p-4 text-right font-semibold text-blue-600">
                  {order.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Popup */}
{popupVisible && click && (
  <div className="fixed top-0 left-0 w-full h-full bg-[#00000090] flex justify-center items-center z-50">
    <div className="w-[650px] h-[85vh] bg-white rounded-2xl shadow-xl relative flex flex-col">

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer text-xl font-bold"
        onClick={() => setPopuoVisible(false)}
      >
        ✕
      </button>

      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">
          Order #{click.orderId}
        </h2>
        <div className="grid grid-cols-2 gap-2 text-sm mt-3">
          <p>
            <span className="font-semibold">Name:</span> {click.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {click.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {click.phone}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {click.address}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={
                click.status === "pending"
                  ? "text-yellow-600 font-semibold"
                  : click.status === "completed"
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {click.status}
            </span>
            <select
              className="ml-4 p-1 border rounded"
              value={orderStatus}
              onChange={(e) => setoderStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {click.date.substring(0, 10)}
          </p>
        </div>
      </div>

      {/* Scrollable Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {click.items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border rounded-lg p-3 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={getProductPhoto(item.productId)}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg border"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {item.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 border-t">
        {click.note && (
          <p className="text-sm text-gray-600 italic mb-2">
            Note: {click.note}
          </p>
        )}
        <textarea
          name="note"
          className="w-full p-2 border rounded-md h-[50px] mb-3"
          value={orderNote}
          onChange={(e) => setorderNote(e.target.value)}
        ></textarea>
        <p className="text-xl font-bold text-blue-600 mb-4">
          Total:{" "}
          {click.total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        {/* ✅ Save Button Footer එකේ */}
       { 
        (orderStatus != click.status) &&
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
           onClick={async ()=>{
                                setPopuoVisible(false);
                                try{
                                    await axios.put(
                                        import.meta.env.VITE_BACKEND_URL + "/api/orders/" + click.orderId,
                                        {
                                            status: orderStatus,
                                            note: orderNote
                                        },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                            },
                                        }
                                    );
                                    toast.success("Order updated successfully");
                                    setLoading(true);
                                }catch(err){
                                    console.error(err);
                                    toast.error("Failed to update order");
                                }

                            }}
        >
          Save Changes
        </button>}
      </div>
    </div>
  </div>
)}


        {/* Pagination */}
        <Paginator
          currentPage={page}
          totalPages={totalPages}
          setCurrentPage={setPage}
          limit={limit}
          setLimit={setLimit}
          setLoading
        />
      </div>
    </div>
  );
}
