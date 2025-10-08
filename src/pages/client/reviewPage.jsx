import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { FaStar, FaSpa } from "react-icons/fa";
import Loader from "../../components/loader";
import toast from "react-hot-toast";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Review Form
  const [newReview, setNewReview] = useState({
    userName: "",
    userImage: "",
    productName: "",
    rating: 0,
    comment: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!newReview.userName || !newReview.productName || !newReview.comment || newReview.rating === 0) {
      toast.error("Please fill all fields and select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/reviews", newReview);
      setReviews([res.data, ...reviews]);
      setNewReview({ userName: "", userImage: "", productName: "", rating: 0, comment: "" });
      toast.success("Review added successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add review");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white">
      {/* Header */}
      <Header />

      {/* Shop Info */}
      <div className="max-w-7xl mx-auto py-10 px-4 text-center">
        <FaSpa className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-pink-500 mt-10"/> 
        <h1 className="text-4xl font-bold mb-2">Glow Beutiy</h1>
        <p className="text-gray-300">Premium handmade products & luxury collections</p>
      </div>

      {/* Add Review Form */}
      <div className="max-w-3xl mx-auto bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-12">
        <h2 className="text-2xl font-bold mb-4 text-pink-500">Add a Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-3 p-3 rounded-lg text-gray-800"
          value={newReview.userName}
          onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product Name"
          className="w-full mb-3 p-3 rounded-lg text-gray-800"
          value={newReview.productName}
          onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
        />
        <textarea
          placeholder="Write your review..."
          className="w-full mb-3 p-3 rounded-lg text-gray-800 h-24 resize-none"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className={`cursor-pointer transition ${
                newReview.rating >= star ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setNewReview({ ...newReview, rating: star })}
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow-lg transition"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Customer Reviews</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-black/50 backdrop-blur-md p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-transform transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.userImage || "/default-user.png"}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{review.userName}</h2>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={16}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-500"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-200 text-sm">{review.comment}</p>

                <span className="block mt-4 text-pink-500 font-semibold">
                  {review.productName}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
