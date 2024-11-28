import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import '../App.css';

const ReviewForm = ({ fetchReviews, closeDialog }) => {
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
    closeDialog(); // Close the dialog after submitting the form
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "450px", // Increase the width of the form
        padding: "2rem", // Add padding for a spacious look
        backgroundColor: "#f9f9f9", // Lighter background color
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem", // Increase the gap between fields
      }}
    >
      <Typography variant="h5" sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: "1rem", textAlign: "center" }}>
        Add Your Book Review
      </Typography>

      <TextField
        label="Book Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        sx={{
          input: { fontFamily: 'Poppins, sans-serif' }, // Apply Poppins font to input
        }}
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
        sx={{
          input: { fontFamily: 'Poppins, sans-serif' },
        }}
      />

      <FormControl fullWidth required>
        <InputLabel>Rating (1-5)</InputLabel>
        <Select
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          label="Rating (1-5)"
          sx={{
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Review Text"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={formData.reviewText}
        onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
        required
        sx={{
          input: { fontFamily: 'Poppins, sans-serif' },
        }}
      />
      <Button
        variant="contained"
        type="submit"
        color="success" // Green button color
        sx={{
          padding: "12px 24px",
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          '&:hover': {
            backgroundColor: "#45a049", // Darker green on hover
          }
        }}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
