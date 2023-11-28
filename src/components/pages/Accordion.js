import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 25) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " ...show less"}
      </span>
    </p>
  );
};


function Accordion({ items, userData,productId,examLink}) {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const totalSections = items.length;
  const totalTopics = items.reduce((total, item) => total + item.topic.length, 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchases, setPurchases] = useState([]);
  // const [hasPurchased, setHasPurchased] = useState(true);


  const hasPurchased = () => {
    if (userData && userData._id) {
      for (const purchase of purchases) {
        if (purchase.user._id === userData._id && purchase.products.some((p) => p._id === productId)) {
          // console.log("true.");
          return true; 
        }
      }
    }
    // console.log("false.");
    return false;
  };

  const [selectedTopics, setSelectedTopics] = useState([]);


  

  useEffect(() => {

    axios
      .get("http://localhost:5000/purchases/")
      .then((response) => {
        setPurchases(response.data);
  })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
      });
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = (index) => {
    if (isAllExpanded) {
      // If "Expand All" is active, close the clicked item
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      );
    } else {
      // If "Expand All" is not active, toggle the clicked item
      setActiveIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      );
    }
  };

  const handleTopicClick = (link, topicIndex) => {
    if (link) {
      window.location.href = link;
    }
    
  };
  

  const toggleAll = () => {
    setIsAllExpanded(!isAllExpanded);
    if (isAllExpanded) {
      setActiveIndexes([]);
    } else {
      setActiveIndexes([...Array(items.length).keys()]);
    }
  };

  const toggleExamSection = () => {
    setActiveIndexes((prevIndexes) =>
      prevIndexes.includes(items.length) ? prevIndexes.filter((i) => i !== items.length) : [...prevIndexes, items.length]
    );
  };
  

  return (
    <Wrapper>
      
      <div className="button-container">
      <button onClick={toggleAll} className="expand-all-button">
        {isAllExpanded ? "Collapse All Section" : "Expand All Section"}
      </button>
      <p>{totalSections} Sections | {totalTopics} Lectures</p>
      </div>
      
      <div>
        {items.map((item, index) => (
          <div className="accordion" key={item.id}>
            <button onClick={() => handleClick(index)} className="accordion-container">
            <span className="serial-number">{index + 1}. </span>
              <b>{item.title}</b>{" "}
              {activeIndexes.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {activeIndexes.includes(index) && (
              <div className="show">
                <ReadMore>{item.content}</ReadMore>
                <ul>
                {hasPurchased() ? (
                  item.topic.map((topiclink, topicIndex) => (
                    <p key={topicIndex}>
                      <span className="serial-number">{topicIndex + 1}. </span>
                      <BsFillCameraVideoFill size={25} color="red" className="custom-icon" />
                      <span
                        className="topic-link"
                        onClick={() => handleTopicClick(item.link[topicIndex])}
                      >
                        {topiclink}
                        <br></br>
                      </span>
                    </p>
                  ))
                ) : (
                  item.topic.map((topiclink, topicIndex) => (
                    <p key={topicIndex}>
                      <span className="serial-number">{topicIndex + 1}. </span>
                      <BsFillCameraVideoFill size={25} color="red" className="custom-icon" />
                      {topiclink}
                      <br></br>
                    </p>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* Additional accordion section for "exam" link */}
<div className="accordion" key="exam-section">
  <button onClick={() => toggleExamSection()} className="accordion-container">
    <span className="serial-number">{items.length + 1}. </span>
    <b>Exam</b> {activeIndexes.includes(items.length) ? <FaChevronUp /> : <FaChevronDown />}
  </button>
  {activeIndexes.includes(items.length) && (
     <div className="show">
     <p>Take your exam right now to test out your knowledge</p>
     {hasPurchased() && (
       <p>
         <Link to={examLink} className="exam-link">
           Redirect to exam
         </Link>
       </p>
     )}
   </div>
  )}
</div>

      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`



/* Styles for the link */
.exam-link {
  color: #007bff; /* Set the link color */
  text-decoration: none; /* Remove underline */
  font-weight: bold; /* Make the text bold */
  cursor: pointer; /* Show pointer cursor on hover */
}

.exam-link:hover {
  text-decoration: underline; /* Underline on hover */
}


.serial-number {
  font-weight: bold;
  margin-right: 5px;
}
  .custom-icon {
    margin: 5px;
    align: left;
  }

  /* Accordion.css */
  button:hover {
    background-color: #fff;
  }
  button:active {
    transform: scale(0.95);
  }
  button:focus {
    outline: none;
  }

  /* Accordion.css */
  @media screen and (max-width: 500px) {
    p {
      font-size: 16px;
    }
  }

  .accordion-container {
    width: 100%;
    background-color: #f7f9fa;
    text-align: left;
    padding: 2rem;
    border-radius: 0px;
    margin: 2px;
  }

  /* Accordion container */
  .accordion {
    background-color: #f7f9fa;
    color: #333;
    cursor: pointer;
    padding: 0px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: background-color 0.2s;
  }

  /* Active accordion */
  .accordion.active {
    background-color: #fff;
  }

  /* Panel container hidden by default */
  .panel {
    display: none;
    background-color: #fff;
    overflow: hidden;
  }

  /* Show panel when active */
  .show {
    display: block;
    padding: 16px;
    background-color: #fff;
  }

  .button-container {
   text-align: right; /* Align the button to the right */
 }

  .expand-all-button {
    background-color: #f7f9fa;
    border: none;
    cursor: pointer;
    outline: none;
    margin-bottom: 10px;
    position: right;
  }
`;

export default Accordion;

