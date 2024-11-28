import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewList = ({ reviews, fetchReviews }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/reviews/${id}`);
    fetchReviews();
  };

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id}>
          <h3>{review.title}</h3>
          <p>Author: {review.author}</p>
          <p>Rating: {review.rating}</p>
          <p>{review.reviewText}</p>
          <small>{new Date(review.dateAdded).toLocaleDateString()}</small>
          <button onClick={() => navigate(`/edit/${review._id}`)}>Edit</button>
          <button onClick={() => handleDelete(review._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
