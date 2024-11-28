import React, { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import axios from "axios";
import { Search as SearchIcon } from "@mui/icons-material";
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField } from "@mui/material";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating"); // Default sort by rating

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    const response = await axios.get("http://localhost:5000/reviews");
    setReviews(response.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle sorting logic (rating or date)
  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  // Filter reviews by search term (title or author)
  const filteredReviews = reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting reviews based on rating or date
  const sortedReviews = filteredReviews.sort((a, b) => {
    if (sortBy === "rating") {
      // Sort by rating (desc)
      return b.rating - a.rating;
    } else {
      // Sort by date (desc)
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  // Calculate average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Rounds to 1 decimal place
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center"  fontFamily= "Poppins, sans-serif" fontWeight= "bold" gutterBottom>
        Book Reviews
      </Typography>

      {/* Search bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderRadius: "20px" }}>
  <TextField
    label="Search by Title or Author"
    variant="outlined"
    size="small"
    value={searchTerm}
    onChange={handleSearchChange}
    sx={{
      width: "70%",
      borderRadius: "20px",
    }}
    InputProps={{
      endAdornment: (
        <SearchIcon sx={{ color: "gray", cursor: "pointer" }} />
      ),
    }}
  />

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            variant={sortBy === "rating" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleSortChange("rating")}
            sx={{
                borderRadius: "20px", // Add border radius
              }}
          >
            Sort by Rating
          </Button>
          <Button
            variant={sortBy === "date" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleSortChange("date")}
            sx={{
                borderRadius: "20px", // Add border radius
              }}
          >
            Sort by Date
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
  
  <Button
    variant="outlined"
    color="success"
    onClick={handleOpenDialog}
    sx={{
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    Add Book
  </Button>
  <Typography variant="h6"  fontFamily= "Poppins, sans-serif">Average Rating: {calculateAverageRating()} / 5</Typography>
</Box>


      {/* Dialog for adding a new review */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
       
        <DialogContent>
          <ReviewForm fetchReviews={fetchReviews} closeDialog={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
        <Button 
  onClick={handleCloseDialog} 
  sx={{ color: 'red', borderColor: 'red' }} 
  variant="outlined"
>
  Cancel
</Button>

        </DialogActions>
      </Dialog>

      {/* Display reviews */}
      <ReviewList reviews={sortedReviews} fetchReviews={fetchReviews} />
    </Container>
  );
};

export default HomePage;
