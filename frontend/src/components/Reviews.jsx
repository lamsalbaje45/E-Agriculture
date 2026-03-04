import { useState, useEffect } from "react";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`krishiconnect_reviews_${productId}`);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, [productId]);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const handleSubmitReview = () => {
    if (!name.trim() || !comment.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date(),
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem(
      `krishiconnect_reviews_${productId}`,
      JSON.stringify(updated)
    );

    // Reset form
    setName("");
    setComment("");
    setRating(5);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  const StarRating = ({ value, onChange, interactive = false }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onChange && onChange(star)}
            className={`text-2xl ${
              star <= value ? "text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:scale-110" : ""}`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Average Rating */}
      {reviews.length > 0 && (
        <div className="mb-6 p-4 bg-white rounded border">
          <p className="text-sm text-gray-600">Average Rating</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating value={Math.round(averageRating)} />
            <span className="text-lg font-bold">{averageRating}</span>
            <span className="text-sm text-gray-500">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      )}

      {/* Submit Review Form */}
      <div className="mb-6 p-4 bg-white rounded border">
        <h3 className="font-bold mb-4">Leave Your Review</h3>

        {submitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Thank you! Your review has been posted.
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-forestGreen"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Rating</label>
          <StarRating value={rating} onChange={setRating} interactive={true} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-forestGreen resize-none"
            rows="4"
          />
        </div>

        <button
          onClick={handleSubmitReview}
          className="bg-forestGreen text-white px-6 py-2 rounded hover:bg-darkGreen"
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          reviews
            .slice()
            .reverse()
            .map((review) => (
              <div key={review.id} className="p-4 bg-white rounded border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <StarRating value={review.rating} />
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
