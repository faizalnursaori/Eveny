import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Star } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    id: number;
    username: string;
    name: string;
  };
}

interface ReviewSectionProps {
  eventId: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ eventId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    fetchReviews();
  }, [eventId, currentPage]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/reviews/event/${eventId}?page=${currentPage}`,
      );
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews.");
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to submit a review.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/api/reviews",
        {
          rating: userRating,
          comment: userComment,
          eventId,
          userId: userInfo.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserRating(0);
      setUserComment("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Reviews</h2>

      <form onSubmit={handleSubmitReview} className="mb-8">
        <div className="mb-4">
          <label className="mb-2 block">Rating:</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer ${star <= userRating ? "fill-yellow-400 stroke-none" : "text-gray-300"}`}
                onClick={() => setUserRating(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Comment:</label>
          <textarea
            className="w-full rounded border p-2"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit Review
        </button>
      </form>

      {reviews.map((review) => (
        <div key={review.id} className="border-b py-4">
          <div className="mb-2 flex items-center">
            <span className="font-semibold">{review.user.name}</span>
            <div className="ml-4 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= review.rating ? "fill-yellow-400 stroke-none" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
