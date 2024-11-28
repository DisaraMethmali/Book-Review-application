import React, { useState, useEffect } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import axios from "axios";

import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book Reviews
      </Typography>
      
      <Button
  variant="outlined"
  color="success" // Green color
  onClick={handleOpenDialog}
  sx={{
    marginBottom: "1rem",
    marginRight: "8px",
    borderRadius: "20px",
  }}
>
  Add Book
</Button>


      {/* Dialog for adding a new review */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Book Review</DialogTitle>
        <DialogContent>
          <ReviewForm fetchReviews={fetchReviews} closeDialog={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ReviewList reviews={reviews} fetchReviews={fetchReviews} />
    </Container>
  );
};

export default HomePage;
