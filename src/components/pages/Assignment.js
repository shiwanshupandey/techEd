import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import useUserData from '../userData';

const ReadMore = ({ children }) => {
    const text = children || ''; // Ensure 'children' is a string or an empty string if undefined
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
  


function Assignment({ item, product }) {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');
  const userData = useUserData();
  const userId = userData && userData._id;





  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAssignmentNameChange = (event) => {
    setAssignmentName(event.target.value);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', assignmentName);
      formData.append('user', userId);
      formData.append('products', product);


      // Make an API request to upload the file
      axios
        .post('http://localhost:5000/assignment/upload', formData)
        .then((response) => {
          // Handle the response, e.g., show a success message
          console.log('File uploaded successfully:', response.data);
          setUploadedFile(response.data.fileUrl);
          
        })
        .catch((error) => {
          // Handle the error, e.g., show an error message
          console.error('File upload failed:', error);
        });
    }
  };


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

  const handleTopicClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const toggleAll = () => {
    setIsAllExpanded(!isAllExpanded);
    if (isAllExpanded) {
      setActiveIndexes([]);
    } else {
      setActiveIndexes([...Array(item.length).keys()]);
    }
  };
  const total = item.length;


  return (
    <Wrapper>
      
      <div className="button-container">
      <button onClick={toggleAll} className="expand-all-button">
        {isAllExpanded ? "Collapse All Section" : "Expand All Section"}
      </button>
      {/* <p>{total} Sections</p> */}
      </div>
      
      <div>
        {item.map((item, index) => (
          <div className="accordion" key={item.id}>
            <button onClick={() => handleClick(index)} className="accordion-container">
            <span className="serial-number">{index + 1}. </span>
              <b>{item.assignmenttitle}</b>{" "}
              {activeIndexes.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {activeIndexes.includes(index) && (
              <div className="show">
                <b>{item.assignmentfile}</b>{" "}
                <br></br>
                <div className='button-container'>
  {item.assignmentupload && (
    // <a href={item.assignmentupload} target="_blank" rel="noopener noreferrer" className="file-upload-button">
    //   <button className="button-style">
    //     assignments
    //   </button>
    // </a>
    <a href={item.assignmentupload} target="_blank" rel="noopener noreferrer" className="file-upload-button">
  assignments
</a>

  )}
</div>
                <hr/>
                <input
                className='assignment-name' 
          type="text"
          placeholder="signature-filename"
          value={assignmentName}
          onChange={handleAssignmentNameChange}
        />
                <input type="file" id="file-upload" 
                className='file-upload' accept=".pdf, .docx" 
                onChange={handleFileSelect} />
                <br/>
                
                <button onClick={handleFileUpload} className="custom-upload-button">
  Upload File
</button>
              </div>
              
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`

.file-upload-button {
  display: inline-block;
  padding: 10px 20px; /* Adjust padding as needed */
  background-color: #007bff; /* Button background color */
  color: #fff; /* Button text color */
  text-decoration: none; /* Remove default underline on anchor */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.file-upload-button:hover {
  background-color: #0056b3; /* Hover background color */
}


.assignment-name {
  text-align: center;
}

.file-download-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

.file-download-button:hover {
  background-color: #0056b3;
}


.file-upload {
  display: block; /* Change the display property to block */
  margin: 0 auto; /* Center horizontally using margin */
  background-color: #007bff; /* Button background color */
  color: #fff; /* Button text color */
  border: none; /* Remove button border */
  border-radius: 5px; /* Add button border radius */
  padding: 10px 20px; /* Button padding */
  cursor: pointer; /* Change cursor on hover */
}/* Center the button horizontally and vertically */


.button-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100%; /* Ensure the container takes up the full height */
}

.button-style {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

.button-style:hover {
  background-color: #0056b3;
}


.show {
  padding: 20px; /* Adjust the padding to your preference */
  border: 1px solid #ccc; /* Add a border around the container */
  background-color: #f5f5f5; /* Set the background color */
  margin-top: 10px; /* Add space above the container */
}

.show b {
  font-weight: bold; /* Style the <b> element within .show */
}

.show hr {
  margin: 10px 0; /* Add margin above and below the <hr> element */
}

.show .custom-upload-button {
  background-color: #007bff; /* Button background color */
  color: #fff; /* Button text color */
  border: none; /* Remove button border */
  border-radius: 5px; /* Add button border radius */
  padding: 10px 20px; /* Button padding */
  cursor: pointer; /* Change cursor on hover */
}

.show .custom-upload-button:hover {
  background-color: #0056b3; /* Button background color on hover */
}


.custom-upload-button {
  display: block; /* Change the display property to block */
  margin: 0 auto; /* Center horizontally using margin */
  background-color: #007bff; /* Button background color */
  color: #fff; /* Button text color */
  border: none; /* Remove button border */
  border-radius: 5px; /* Add button border radius */
  padding: 10px 20px; /* Button padding */
  cursor: pointer; /* Change cursor on hover */
}

.custom-upload-button:hover {
  background-color: #0056b3; /* Button background color on hover */
}



.serial-number {
  font-weight: bold;
  margin-right: 5px;
}
  .custom-icon {
    margin: 5px;
    align: left;
  }

  .button-container {
    text-align: right; /* Align the button to the right */
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

export default Assignment;

