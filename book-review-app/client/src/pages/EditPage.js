import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReviewEdit = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const navigate = useNavigate(); // For navigation after edit
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: 1,
    reviewText: "",
  });

  // Fetch the existing review details by ID
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        setFormData(response.data); // Set the fetched data into the state
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReview();
  }, [id]);

  // Handle form submission to update the review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/reviews/${id}`, formData);
      navigate("/"); // Redirect to home page after successful update
    } catch (error) {
      console.error("Error updating the review:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Review Text</label>
          <textarea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Review
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReviewEdit;
