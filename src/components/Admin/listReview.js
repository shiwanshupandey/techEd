import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import {
  StyledTable,
  AttendanceContainer,
  AttendanceHeader,
  LinkButton,
  ActionButtons,
  EditButton,
  DeleteButton,
} from './styles';



const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 50) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};


const Courses = (props) => (
  <tr key={props._id}>
    <td>{props.product.name}</td>
    <td>{props.product.creator}</td>
    <td>{props.comment}</td>
    <td>{props.stars}</td>
    <td>
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteReview(props._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);


class ListReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
    this.deleteReview = this.deleteReview.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/review/')
      .then((res) => {
		console.log('API Response:', res.data);
        this.setState({ courses: res.data });
      })
      .catch((error) => {
		console.error(error);
	  });
  }

  deleteReview(_id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this review?');
    if (!shouldDelete) {
      return; 
    }
    
    axios.delete(`http://localhost:5000/review/${_id}`).then((res) => {
      console.log(res.data);
    });
  
    this.setState({ courses: this.state.courses.filter((el) => el._id !== _id) });
  }
  

  coursesList() {
    if (!Array.isArray(this.state.courses) || this.state.courses.length === 0) {
      return (
        <tr>
          <td colSpan="6">No users found.</td>
        </tr>
      );
    }

    return this.state.courses.map((currentCourses) => (
      <Courses
        product={currentCourses.product}

        user={currentCourses.user}
        key={currentCourses._id}
        comment = {currentCourses.comment}
        stars = {currentCourses.stars}
      />
    ));
  }


  

  render() {
    return (
       <Wrapper>
       <div className="container">
         <h3>review</h3>

         {this.state.courses.map((currentCourses) => (
           <div key={currentCourses._id}>
            <h4 className="user-heading">
  User: {currentCourses.user ? currentCourses.user.fullname : 'N/A'}
</h4>
<h4 className="user-heading">
  Email: {currentCourses.user ? currentCourses.user.email : 'N/A'}
</h4>
             <table className="table">
                <thead className="thead-light">
                <tr>
              <th>Name</th>
              <th>Creator</th>
              <th>Comment</th>
              <th>Stars</th>
              <th>action</th>
            </tr>
                </thead>
                <tbody>
            {this.state.courses.map((currentCourses) => (
              <Courses
                product={currentCourses.product}
                key={currentCourses._id}
                _id={currentCourses._id}
                comment={currentCourses.comment}
                stars={currentCourses.stars}
                deleteReview={this.deleteReview}
              />
            ))}
          </tbody>
              </table>
           </div>
         ))}
       </div>
     </Wrapper>
      
    );
  }
}

const Wrapper = styled.section`

padding: 20px ;

.user-heading {
  font-size: 18px;
  margin: 10px 0;
  text-align: left;
}


/* In your component's stylesheet or a global stylesheet */
.button-link {
  display: inline-block;
  background-color: #0074d9; /* Button background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding for spacing */
  text-decoration: none; /* Remove underlines from links */
  border-radius: 4px; /* Rounded corners */
  text-align: center; /* Center text within the button */
}

.button-link:hover {
  background-color: #0056a4; /* Darker color on hover */
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h3 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.button-link {
  display: inline-block;
  background-color: #0074d9;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.button-link:hover {
  background-color: #0056a4;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.table th {
  background-color: #0074d9;
  color: #fff;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.subtotal {
  text-align: right;
  margin-top: 20px;
  font-weight: bold;
}

.text {
  font-size: 16px;
  line-height: 1.5;
}

.read-or-hide {
  color: #0074d9;
  cursor: pointer;
}

.read-or-hide:hover {
  text-decoration: underline;
}



`

export default ListReview;


