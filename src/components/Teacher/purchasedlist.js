import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";



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


const Courses = (props) => { 
  return (
    <tr key={props.product._id}>
      <td>{props.product.id}</td>
      <td>{props.user ? props.user.email : 'N/A'}</td> 
      <td>{props.product.name}</td>
      <td>{props.product.price}</td>
    </tr>
  );
};




class PurchasedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      teacher: [],
      commonProducts: [], 
    };
  }

  findCommonProducts() {
    const { courses, teacher } = this.state;
  
    if (courses.length === 0 || !Array.isArray(teacher.products)) {
      // No courses or teacher's products, nothing to match
      return [];
    }
  
    const commonProducts = [];
  
    courses.forEach((course) => {
      course.products.forEach((product) => {
        if (teacher.products.some((teacherProduct) => teacherProduct._id === product._id)) {
          commonProducts.push({ product, user: course.user });
        }
      });
    });
  
    return commonProducts;
  }
  

  
  componentDidMount() {
    axios
      .get('http://localhost:5000/purchases/')
      .then((res) => {
        this.setState({ courses: res.data });
    })
      .catch((error) => {
        console.error('Error fetching purchases:', error);
      });

    axios
      .get('http://localhost:5000/teacher/')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          const teacher = res.data[0];
          this.setState({ teacher: teacher });
        } else {
          console.log('Teacher data not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching teacher data:', error);
      });
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
        courses={currentCourses.products}
        user={currentCourses.user}
        key={currentCourses._id}
      />
    ));
  }
  

  calculateSubtotal(products) {
    return products.reduce((total, product) => total + product.price, 0);
  }

  calculateTotalMoney() {
    const commonProducts = this.findCommonProducts();
    const totalMoney = commonProducts.reduce(
      (total, product) => total + product.product.price,
      0
    );
    return totalMoney;
  }
  
  
  
  
  

  


  render() {

    const commonProducts = this.findCommonProducts();
    
    return (
     <Wrapper>
     <div className="container">
       <h3>Sales</h3>
       <table className="table">
         <thead className="thead-light">
           <tr>
             <th>Id</th>
             <th>Buyer</th>
             <th>Name</th>
             <th>Price</th>
           </tr>
         </thead>
         <tbody>
         {commonProducts.map((product) => (
    <Courses product={product.product} user={product.user} key={product.product._id} />
  ))}
         </tbody>
       </table>
       <div className="total-money">
         <p className="total-money-label">Total:</p>
         <p className="total-money-amount">
           ₹{this.calculateTotalMoney(commonProducts)}
         </p>
       </div>
       
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

/* Rest of your CSS styles */

.total-money {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: right;
  margin-top: 20px;
  font-weight: bold;
}

.total-money-label {
  font-size: 20px;
  margin: 0;
  color: #555; /* Adjust the color to your preference */
}

.total-money-amount {
  font-size: 24px;
  margin: 0;
  color: #0074d9; /* Adjust the color to your preference */
}

/* Rest of your CSS styles */



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

export default PurchasedList;


