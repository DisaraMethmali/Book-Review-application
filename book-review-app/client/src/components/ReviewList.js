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
    <Box sx={{ maxWidth: "100%", margin: "0 auto", marginTop: "20px" }}>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 850 }} aria-label="book reviews table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Author
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Rating
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Review
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Date Added
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow
                key={review._id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                }}
              >
                <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                  {review.title}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                  {review.author}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                  {review.rating}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                  {review.reviewText}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                  {new Date(review.dateAdded).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/edit/${review._id}`)}
                    sx={{ marginRight: "8px", borderRadius: "20px" ,fontWeight: "bold",}}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(review._id)}
                    sx={{ borderRadius: "20px",fontWeight: "bold", }}
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
