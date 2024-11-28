import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    reviewText: "",
  });

  useEffect(() => {
    const fetchReview = async () => {
      const response = await axios.get(`http://localhost:5000/reviews/${id}`);
      setFormData(response.data);
    };
    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/reviews/${id}`, formData);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Review</h2>
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
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
};

export default EditPage;
