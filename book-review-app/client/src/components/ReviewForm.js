import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ fetchReviews }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    reviewText: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/reviews", formData);
    setFormData({ title: "", author: "", rating: "", reviewText: "" });
    fetchReviews();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={formData.rating}
        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        required
      />
      <textarea
        placeholder="Review Text"
        value={formData.reviewText}
        onChange={(e) =>
          setFormData({ ...formData, reviewText: e.target.value })
        }
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
