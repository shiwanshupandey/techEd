import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Review({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [averageStars, setAverageStars] = useState(0);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/review`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Display only the last 5 comments
  const latestReviews = reviews.slice(-5);

  // Calculate the average stars
  const totalStars = latestReviews.reduce((sum, review) => sum + review.stars, 0);
  const reviewsCount = latestReviews.length;
  const average = reviewsCount > 0 ? totalStars / reviewsCount : 0;

  useEffect(() => {
    setAverageStars(average);
  }, [latestReviews]);

  return (
    <ReviewContainer>
      
      <ul>
        {latestReviews.map((review) => {
          if (review.product._id === productId) {
            return (
              <ReviewItem key={review._id}>
                <p className="review-comment">{review.comment}</p>
                <div className="review-stars">
                  {/* Display stars based on review.stars */}
                  {Array.from({ length: review.stars }, (_, index) => (
                    <FontAwesomeIcon icon="star" key={index} />
                  ))}
                </div>
                {/* <p className="review-name">Name: {review.user.fullname}</p> */}
              </ReviewItem>
            );
          }
          return null;
        })}
      </ul>
      {latestReviews.every((review) => review.product._id !== productId) && (
      <p>No reviews available for this product.</p>
    )}
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
`;

const ReviewItem = styled.li`
  padding: 15px;
  margin: 15px 0;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background-color: #f9f9f9;
  
  .review-comment {
    margin-top: 10px;
  }

  .review-stars {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    color: #f39c12; /* Change the color to your preference */
    font-weight: bold;
  }

  .review-name {
    margin-top: 10px;
    font-weight: bold;
  }
`;


export default Review;
