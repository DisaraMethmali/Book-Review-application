import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

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
  const handleInput = (e) => {
    const { name, value } = e.target;
  
    // Block numbers from being typed in the "Author" field
    if (name === "author" && /\d/.test(value)) {
      e.preventDefault(); // Prevent entering numbers
    }
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 , fontFamily :"Poppins, sans-serif",fontWeight :"bold"}}>
        Edit Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Book Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
   <TextField
  label="Author"
  name="author"
  value={formData.author}
  onChange={(e) => {
    const value = e.target.value.replace(/[0-9]/g, ""); // Remove numbers
    setFormData((prev) => ({ ...prev, author: value })); // Update the state
  }}
  fullWidth
  required
  sx={{ marginBottom: 2 }}
  helperText="Numbers are not allowed."
/>



        <TextField
          label="Rating (1-5)"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 1, max: 5 }}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Review Text"
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update Review
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/")}
            variant="outlined"
            color="secondary"
            sx={{
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewEdit;
