import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography
} from "@mui/material";

const ReviewList = ({ reviews, fetchReviews }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/reviews/${id}`);
    fetchReviews();
  };

  return (
    <Box sx={{ maxWidth: "90%", margin: "0 auto", marginTop: "20px" }}>
      
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="book reviews table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f4f4f4" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f4f4f4" }}>Author</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f4f4f4" }}>Rating</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f4f4f4" }}>Review</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f4f4f4" }}>Date Added</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f4f4f4" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review._id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                <TableCell>{review.title}</TableCell>
                <TableCell>{review.author}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.reviewText}</TableCell>
                <TableCell>
                  {new Date(review.dateAdded).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/edit/${review._id}`)}
                    sx={{ marginRight: "8px", borderRadius: "20px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(review._id)}
                    sx={{ borderRadius: "20px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReviewList;
