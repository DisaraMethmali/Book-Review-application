import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

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
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography variant="h6">Add a New Review</Typography>
      <TextField
        label="Book Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
      />
      <TextField
        label="Rating (1-5)"
        type="number"
        variant="outlined"
        fullWidth
        value={formData.rating}
        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        required
      />
      <TextField
        label="Review Text"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={formData.reviewText}
        onChange={(e) =>
          setFormData({ ...formData, reviewText: e.target.value })
        }
        required
      />
      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default ReviewForm;
