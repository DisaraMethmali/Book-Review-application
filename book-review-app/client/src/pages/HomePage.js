import React, { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import axios from "axios";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    const response = await axios.get("http://localhost:5000/reviews");
    setReviews(response.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h1>Book Reviews</h1>
      <ReviewForm fetchReviews={fetchReviews} />
      <ReviewList reviews={reviews} fetchReviews={fetchReviews} />
    </div>
  );
};

export default HomePage;
