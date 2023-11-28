import React, { useState } from 'react';
import axios from 'axios';
import useUserData from '../userData';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'; // Import the empty star icon

function CommentForm({ product }) {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const userData = useUserData(); 


  const user = userData && userData._id;

  if (user && product._id) {
    return null;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = {
        comment,
        stars,
        product,
        user,
      };
  
      const response = await axios.post('http://localhost:5000/review/', newReview);
  
      if (response.status === 201) {
        console.log('Review posted:', response.data);
        setComment('');
        setStars(0);
      } else {
        console.error('Failed to post review. Server response:', response);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request made but no response received. Error:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleStarClick = (star) => {
    // When a star is clicked, set the number of stars.
    setStars(star);
  };
  

  return (
    <Wrapper>
<div className="comment-form"> {/* Apply the CSS class */}
        <h3>Add a Comment</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              cols="50"
            />
          </div>
          <div>
            <label>Stars:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={star <= stars ? solidStar : regularStar} // Use different icons for selected and unselected stars
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>
          <div>
            <button type="submit">Post Comment</button>
          </div>
        </form>
      </div>
    </Wrapper>
    
  );
}




const Wrapper = styled.section`
/* CommentForm.css */
/* Style the form container */
.comment-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Style the form title */
.comment-form h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

/* Style form inputs and labels */
.comment-form label {
  font-weight: bold;
}

.comment-form textarea,
.comment-form input[type="number"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

.comment-form textarea:focus,
.comment-form input[type="number"]:focus {
  border-color: #007bff;
}

/* Style the submit button */
.comment-form button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment-form button:hover {
  background-color: #0056b3;
}


`;





export default CommentForm;
