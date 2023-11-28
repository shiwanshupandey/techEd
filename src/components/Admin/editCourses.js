import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
// import "./allCourses.css";
// import "./editCourses.css";
import "./allCourses.css";

function EditCourses() {

  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  const initialCourseState = {
    type: '',
    id: '',
    name: '',
    price: '',
    category: '',
    section: '',
    creator: '',
    description: '',
    image: '',
    featured: '',
    review: '',
    stars: '',
    bought: '',
    link: '',
    hours: '',
    certificate: '',
    file: '',
    requirements: '',
    sample: '',
    syllabus: [
      {
        syllabusname: '',
        syllabusdescription: '',
        topic: [
          {
            sectionId: '',
            topicfile: '',
            topiclinks: '',
            topicimage: '',
            topictitle: '',
            topicdescription: '',
          },
        ],
      },
    ],
    assignment: [
      {
        assignmenttitle: '',
        assignmentfile: '',
        assignmentupload: '',
      },
    ],
    exam:[{
        examfile: '',
        examupload: '',
    }],
    // notification: [], // Initialize with an empty notification
  };

  const [courses, setCourse] = useState(initialCourseState);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [scrollToTopState, setScrollToTopState] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/category')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        handleApiError(error);
        console.error(error);
      });
  }, [id]);


  const onChangeInput = (e, syllabusIndex, topicIndex, assignmentIndex, field) => {
    setCourse((prevCourse) => {
      const updatedCourse = { ...prevCourse };
  
      if (syllabusIndex !== null) {
        if (topicIndex !== null) {
          if (assignmentIndex !== null) {
            // Handle assignment updates
            updatedCourse.syllabus[syllabusIndex].topic[topicIndex].assignment[assignmentIndex][field] = e.target.value;
          } else {
            // Handle topic updates
            updatedCourse.syllabus[syllabusIndex].topic[topicIndex][field] = e.target.value;
          }
        } else {
          // Handle syllabus updates
          updatedCourse.syllabus[syllabusIndex][field] = e.target.value;
        }
      } else {
        if (assignmentIndex !== null) {
          // Handle assignment updates at the top-level
          updatedCourse.assignment[assignmentIndex][field] = e.target.value;
        } else {
          // Handle top-level updates
          updatedCourse[field] = e.target.value;
        }
      }
  
      return updatedCourse;
    });
  };
  
  
  
  const toggleScrollDirection = () => {
    if (scrollToTopState) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
    // Toggle the state
    setScrollToTopState(!scrollToTopState);
  };
  
  

  const onAddSyllabus = () => {
    const newSyllabus = {
      syllabusname: '',
      syllabusdescription: '',
      topic: [],
    };
    setCourse((prevCourse) => ({
      ...prevCourse,
      syllabus: [...prevCourse.syllabus, newSyllabus],
    }));
  };

  const onAddAssignment = () => {
    const newAssignment = {
      assignmenttitle: '',
      assignmentfile: '',
          assignmentupload: '',
    };
    setCourse((prevCourse) => ({
      ...prevCourse,
      assignment: [...prevCourse.assignment, newAssignment],
    }));
  };

  // const onAddNotification = () => {
  //   const newNotification = {
  //     title: '',
  //     description: '',
  //   };
  
  //   setCourse((prevCourse) => ({
  //     ...prevCourse,
  //     notification: [...prevCourse.notification, newNotification],
  //   }));
  // };
  

  const onRemoveSyllabus = (syllabusIndex) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      syllabus: prevCourse.syllabus.filter((_, index) => index !== syllabusIndex),
    }));
  };

  const onRemoveAssignment = (assignmentIndex) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      assignment: prevCourse.assignment.filter((_, index) => index !== assignmentIndex),
    }));
  };

  // const onRemoveNotification = (notificationIndex) => {
  //   setCourse((prevCourse) => ({
  //     ...prevCourse,
  //     notification: prevCourse.notification.filter((_, index) => index !== notificationIndex),
  //   }));
  // };

  const onAddTopic = (syllabusIndex) => {
    const newTopic = {
      sectionId: '',
      topicfile: '',
      topiclinks: '',
      topicimage: '',
      topictitle: '',
      topicdescription: '',
    };

    setCourse((prevCourse) => {
      const updatedSyllabus = [...prevCourse.syllabus];
      updatedSyllabus[syllabusIndex].topic.push(newTopic);
      return { ...prevCourse, syllabus: updatedSyllabus };
    });
  };

  const onRemoveTopic = (syllabusIndex, topicIndex) => {
    setCourse((prevCourse) => {
      const updatedSyllabus = [...prevCourse.syllabus];
      updatedSyllabus[syllabusIndex].topic.splice(topicIndex, 1);
      return { ...prevCourse, syllabus: updatedSyllabus };
    });
  };
  const handleApiError = (error) => {
    if (error.response) {
      // The request was made, but the server responded with an error status
      const { data, status } = error.response;
      if (status === 400) {
        // Handle bad request errors
        setErrorMessage('Bad request. Please check your data and try again.');
      } else if (status === 404) {
        // Handle not found errors
        setErrorMessage('Course not found. Please check the ID.');
      } else {
        // Handle other server errors
        setErrorMessage('An error occurred on the server. Please try again later.');
      }
    } else if (error.request) {
      // The request was made, but no response was received
      setErrorMessage('No response from the server. Please try again later.');
    } else {
      // Something else happened while setting up the request
      setErrorMessage('An error occurred. Please try again later.');
    }
    // Optionally, you can log the error for debugging
    console.error(error);
  };
  


  
  const onSubmit = (e) => {
    e.preventDefault();


    axios
      .post(`http://localhost:5000/products/update/${id}`, courses)
      .then((res) => {
        setSuccessMessage('Course updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error updating course. Please check your data and try again.');
        setSuccessMessage('');
        handleApiError(error);
      });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', 
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  

  
  return (
    <Wrapper>
      <div className="containe">
      <h3>Edit Course</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
      <button className={`scroll-button ${scrollToTopState ? 'scroll-top' : 'scroll-bottom'}`} onClick={toggleScrollDirection}>
        {scrollToTopState ? '▼' : '▲'}
      </button>
      <hr></hr>
      <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label"></label>
          <input
            type="text"
            required
            className="random-form-input"
            value={courses.type}
            onChange={(e) => onChangeInput(e,null, null,null, 'type')}
          />
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Type:</label>
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="type" value="Live" checked={courses.type === 'Live'} onChange={(e) => onChangeInput(e,null, null,null,'type')} />
              <span className="name">Instructor based live</span>
            </label>
            <label className="radio">
              <input type="radio" name="type" value="Completed" checked={courses.type === 'Completed'} onChange={(e) => onChangeInput(e,null, null,null,'type')} />
              <span className="name">Recorded online</span>
            </label>
            <label className="radio">
              <input type="radio" name="type" value="Offline" checked={courses.type === 'Offline'} onChange={(e) => onChangeInput(e,null, null,null,'type')} />
              <span className="name">Offline in person</span>
            </label>
          </div>
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">ID:</label>
          <input
            type="number"
            required
            className="random-form-input"
            value={courses.id}
            onChange={(e) => onChangeInput(e,null, null,null,'id')}
          />
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Name:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={courses.name}
            onChange={(e) => onChangeInput(e,null, null,null,'name')}
          />
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Price:</label>
          <input
            type="number"
            required
            className="random-form-input"
            value={courses.price}
            onChange={(e) => onChangeInput(e,null, null,null,'price')}
          />
        </div>
        {/* <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Category:</label>
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="category" value="mern" checked={courses.category === 'mern'} onChange={(e) => onChangeInput(e,null, null,null,'category')} />
              <span className="name">MERN</span>
            </label>
            <label className="radio">
              <input type="radio" name="category" value="java" checked={courses.category === 'java'} onChange={(e) => onChangeInput(e,null, null,null,'category')} />
              <span className="name">Java</span>
            </label>
            <label className="radio">
              <input type="radio" name="category" value="mean" checked={courses.category === 'mean'} onChange={(e) => onChangeInput(e,null, null,null,'category')} />
              <span className="name">MEAN</span>
            </label>
            <label className="radio">
              <input type="radio" name="category" value="python" checked={courses.category === 'python'} onChange={(e) => onChangeInput(e,null, null,null,'category')} />
              <span className="name">Python</span>
            </label>
            <label className="radio">
              <input type="radio" name="category" value="c++" checked={courses.category === 'c++'} onChange={(e) => onChangeInput(e,null, null,null,'category')} />
              <span className="name">C++</span>
            </label>
          </div>
        </div> */}
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Category:</label>
          <select
            value={courses.category}
            onChange={(e) => onChangeInput(e, null, null, null, 'category')}
            className="random-form-input"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Section:</label>
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="section" value="Begineer" checked={courses.section === 'Begineer'} onChange={(e) => onChangeInput(e,null, null,null,'section')} />
              <span className="name">Begineer</span>
            </label>
            <label className="radio">
              <input type="radio" name="section" value="Moderate" checked={courses.section === 'Moderate'} onChange={(e) => onChangeInput(e,null, null,null,'section')} />
              <span className="name">Moderate</span>
            </label>
            <label className="radio">
              <input type="radio" name="section" value="Advance" checked={courses.section === 'Advance'} onChange={(e) => onChangeInput(e,null, null,null,'section')} />
              <span className="name">Advance</span>
            </label>
          </div>
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">creator:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={courses.creator ? `${courses.creator.fullname} (${courses.creator._id})` : ''}
            onChange={(e) => onChangeInput(e,null, null,null,'creator')}
          />
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Description:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={courses.description}
            onChange={(e) => onChangeInput(e,null, null,null,'description')}
          />
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Image:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={courses.image}
            onChange={(e) => onChangeInput(e,null, null,null,'image')}
          />
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Featured:</label>
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="featured" value="true" checked={courses.featured === true} onChange={(e) => onChangeInput(e,null, null,null,'featured')} />
              <span className="name">True</span>
            </label>
            <label className="radio">
              <input type="radio" name="featured" value="false" checked={courses.featured === false} onChange={(e) => onChangeInput(e,null, null,null,'featured')} />
              <span className="name">False</span>
            </label>
          </div>
        </div>
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Bought:</label>
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="bought" value="true" checked={courses.bought === true} onChange={(e) => onChangeInput(e,null, null,null,'bought')} />
              <span className="name">True</span>
            </label>
            <label className="radio">
              <input type="radio" name="bought" value="false" checked={courses.bought === false} onChange={(e) => onChangeInput(e,null, null,null,'bought')} />
              <span className="name">False</span>
            </label>
          </div>
        </div>
        
        
        <div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">Link:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={courses.link}
            onChange={(e) => onChangeInput(e,null, null,null,'link')}
          />
        </div>
        <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">Hours:</label>
            <input
              type="number"
              required
              className="random-form-input"
              value={courses.hours}
              onChange={(e) => onChangeInput(e,null, null,null,'hours')}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">certificate:</label>
            <input
              type="text"
              required
              className="random-form-input"
              value={courses.certificate}
              onChange={(e) => onChangeInput(e,null, null,null,'certificate')}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">File:</label>
            <input
              type="text"
              className="random-form-input"
              value={courses.file}
              onChange={(e) => onChangeInput(e,null, null,null,'file')}
            />
          </div>
          <div className="random-mb-5">
            <label htmlFor="name" className="random-form-label">requirements:</label>
            <input
              type="text"
              required
              className="random-form-input"
              value={courses.requirements}
              onChange={(e) => onChangeInput(e,null, null,null,'requirements')}
            />
          </div>
          <hr></hr>
        <div className="random-mb-5">
          <h4>Syllabus</h4>
          
          {courses.syllabus.map((syllabus, syllabusIndex) => (
            <div key={syllabusIndex}>
              <h4>Syllabus Section {syllabusIndex+ 1}</h4>
              <br></br>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onRemoveSyllabus(syllabusIndex)}
              >
                Remove Syllabus
              </button>
              <br></br>
              <br></br>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">Syllabus Name:</label>
                <input 
                type="text"
                className="random-form-input"
                value={syllabus.syllabusname}
                onChange={(e) => onChangeInput(e, syllabusIndex,null,null, 'syllabusname')}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">Syllabus Description:</label>
                <input
                  type="text"
                  className="random-form-input"
                  value={syllabus.syllabusdescription}
                  onChange={(e) => onChangeInput(e, syllabusIndex,null,null, 'syllabusdescription')}
                />
              </div>
              
              <h5>Topics</h5>
              {syllabus.topic.map((topic, topicIndex) => (
                <div key={topicIndex}>
                  <h5>Topic {topicIndex + 1}</h5>
                  <br></br>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onRemoveTopic(syllabusIndex, topicIndex)}
                  >
                    Remove Topic
                  </button>
                  <br></br>
                  <br></br>
                  <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topictitle:</label>
                <input
                  type="text"
                  className="random-form-input"
                  value={topic.topictitle}
                  onChange={(e) => onChangeInput(e,syllabusIndex,topicIndex,null, 'topictitle')}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">sectionId:</label>
                <input
                  type="text"
                  className="random-form-input"
                  value={topic.sectionId}
                  onChange={(e) => onChangeInput(e,syllabusIndex,topicIndex,null, 'sectionId')}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topicfile:</label>
                <input
                  type="text"
                  className="random-form-input"
                  value={topic.topicfile}
                  onChange={(e) => onChangeInput(e,syllabusIndex,topicIndex,null, 'topicfile')}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topiclinks:</label>
                <input
                  type="text"
                  className="random-form-input"
                  value={topic.topiclinks}
                  onChange={(e) => onChangeInput(e,syllabusIndex,topicIndex,null, 'topiclinks')}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topicimage:</label>
                <input
                  type="text"
                  className="random-form-input"
                  value={topic.topicimage}
                  onChange={(e) => onChangeInput(e,syllabusIndex,topicIndex,null, 'topicimage')}
                />
              </div>
              <div className="random-mb-5">
                <label htmlFor="name" className="random-form-label">topicdescription:</label>
                <input
                  type="text"
                  className="random-form-input"
                  value={topic.topicdescription}
                  onChange={(e) => onChangeInput(e,syllabusIndex,topicIndex,null, 'topicdescription')}
                />
              </div>
                </div>
              ))}
              <br></br>
              <button
                type="button"
                className="add-employeed-button"
                onClick={() => onAddTopic(syllabusIndex)}
              >
                Add Topic
              </button>
              <br></br>
              <br></br>
            </div>
          ))}
          <br></br>
          <button type="button" className="add-employeed-button" onClick={onAddSyllabus}>
            Add Syllabus
          </button>
        </div>
        <br></br>
        <hr></hr>

<h4>Assignment</h4>
  {courses.assignment.map((assignment, assignmentIndex) => (
    <div key={assignmentIndex}>
      <h4>Assignment {assignmentIndex + 1}</h4>
      <br />
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onRemoveAssignment(assignmentIndex)}
      >
        Remove Assignment
      </button>
      <br />
      <br />
      <div className="random-mb-5">
        <label htmlFor="name" className="random-form-label">Assignment Title:</label>
        <input
          type="text"
          className="random-form-input"
          value={assignment.assignmenttitle}
          onChange={(e) => onChangeInput(e, null, null, assignmentIndex, 'assignmenttitle')}
        />
      </div>
      <div className="random-mb-5">
        <label htmlFor="name" className="random-form-label">Assignment File:</label>
        <input
          type="text"
          className="random-form-input"
          value={assignment.assignmentfile}
          onChange={(e) => onChangeInput(e, null, null, assignmentIndex, 'assignmentfile')}
        />
      </div>
      <div className="random-mb-5">
        <label htmlFor="name" className="random-form-label">Assignment Upload:</label>
        <input
          type="text"
          className="random-form-input"
          value={assignment.assignmentupload}
          onChange={(e) => onChangeInput(e, null, null, assignmentIndex, 'assignmentupload')}
        />
      </div>
    </div>
  ))}
  <br />
  <button type="button" className="add-employeed-button" onClick={onAddAssignment}>
    Add Assignment
  </button>




  {/* <div className="random-mb-5">
            <h4>Notification</h4>
            {courses.notification.map((notification, notificationIndex) => (
              <div key={notificationIndex}>
                <h5>Notification {notificationIndex + 1}</h5>
                <br />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onRemoveNotification(notificationIndex)}
                >
                  Remove Notification
                </button>
                <br />
                <div className="random-mb-5">
                  <label htmlFor="name" className="random-form-label">Title:</label>
                  <input
                    type="text"
                    className="random-form-input"
                    value={notification.title}
                    onChange={(e) => onChangeInput(e, null, null, null, 'notification', notificationIndex, 'title')}
                  />
                </div>
                <div className="random-mb-5">
                  <label htmlFor="name" className="random-form-label">Description:</label>
                  <input
                    type="text"
                    className="random-form-input"
                    value={notification.description}
                    onChange={(e) => onChangeInput(e, null, null, null, 'notification', notificationIndex, 'description')}
                  />
                </div>
              </div>
            ))}
            <br />
            <button type="button" className="add-employeed-button" onClick={onAddNotification}>
              Add Notification
            </button>
          </div> */}
          <div className="random-mb-5">
            <input type="submit" value="edit User Log" className="add-employeed-button" />
          </div>
      </form>
    </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
/* EditCourses.css */

.scroll-button {
  position: fixed;
  bottom: 20px; /* Adjust this value for desired vertical position */
  right: 20px; /* Adjust this value for desired horizontal position */
  padding: 10px 20px;
  background-color: #007bff; /* Button background color */
  color: #fff; /* Button text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.scroll-button:hover {
  background-color: #0056b3; /* Hover background color */
}
};`

export default EditCourses;

