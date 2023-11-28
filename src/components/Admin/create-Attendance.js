import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CreateAttendanceWithUserData = (props) => {
  const [date, setDate] = useState('');
  const [products, setProducts] = useState('');
  const [purchases, setPurchases] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [usersFromPurchases, setUsersFromPurchases] = useState([]);
  const [notPresentUsers, setNotPresentUsers] = useState([]);

    

  
    useEffect(() => {
      const token = localStorage.getItem('auth-token');
  
      if (token) {
        axios
          .post('http://localhost:5000/users/userData', { token })
          .then((response) => {
            const { status, data } = response.data;
  
            if (status === 'ok') {
              setUserData(data);
            } else {
              console.error('Error:', data);
              setUserData('not logged in');
            }
          })
          .catch((error) => {
            console.error('Request error:', error);
            setUserData('not logged in');
          });
      }
    }, []);
  
    useEffect(() => {
      if (userData && userData._id) {
        axios
          .get('http://localhost:5000/teacher')
          .then((res) => {
            const teacherData = res.data;
            const matchingTeacher = teacherData.find((teacher) => teacher.user._id === userData._id);
    
            if (matchingTeacher) {
              setProducts(matchingTeacher.products);
              setSelectedProduct('');
            } else {
              setProducts('');
            }
          })
          .catch((error) => {
            console.error(error);
            setProducts('');
          });
      }
    }, [userData]);
    
    





    const fetchUsersByProduct = (product) => {
      axios.get('http://localhost:5000/purchases')
        .then((res) => {
          const purchasesData = res.data;
      
      const filteredPurchases = purchasesData.filter((purchase) =>
        purchase.products.some((product) => product._id === selectedProduct)
      );

      
      const usersFromPurchases = filteredPurchases.map((purchase) => purchase.user);
      setUsersFromPurchases(usersFromPurchases);

      
        })
        .catch((error) => {
          console.error(error);
          setSelectedUserIds([]);
        });
    };


    useEffect(() => {
      
        fetchUsersByProduct(selectedProduct);
    }, [selectedProduct]);

    useEffect(() => {
      if (usersFromPurchases.length > 0) {
        const notPresentUserIds = usersFromPurchases
          .map((user) => user._id)
          .filter((userId) => !selectedUsers.includes(userId));
        setNotPresentUsers(
          usersFromPurchases.filter((user) => notPresentUserIds.includes(user._id))
        );
      } else {
        setNotPresentUsers([]);
      }
    }, [selectedUsers, usersFromPurchases]);

    




    const onSubmit = (e) => {
      e.preventDefault();
      const userPresentIds = selectedUsers.map(userId => userId);
      
    
      const attendanceData = {
        date,
        products: selectedProduct,
        Present: userPresentIds,
      };
    
      console.log(attendanceData);
  
      axios
        .post('http://localhost:5000/attend', attendanceData)
        .then((res) => {
          setSuccessMessage('Attendance record created successfully!');
          setErrorMessage('');
          setDate('');
          setUser('');
          
        })
        .catch((error) => {
          setErrorMessage('Error creating attendance record. Please check your data and try again.');
          setSuccessMessage('');
          console.error(error);
        });
    };

    const handleUserCheckboxChange = (userId) => {
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter((_id) => _id !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    };

  return (
    
    <div className="container">
      <h3>Create New Attendance Record</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
        <div className="random-mb-5">
          <label for="name" className="random-form-label">Date:</label>
          <input
            type="date"
            required
            className="random-form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="random-mb-5">
          <label for="name" className="random-form-label">Products:</label>
          <select
            name="products"
            value={selectedProduct} // Set the value of the select element to the selectedProduct state
            onChange={(e) => setSelectedProduct(e.target.value)} // Update the selected product state
            className="random-form-input"
          >
            <option value="">Select a product</option>
            {Array.isArray(products) && (
              products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
               ) ))
            }
          </select>
        </div>
        <div className="random-mb-5">
  <label for="name" className="random-form-label">Select Users:</label>
  {usersFromPurchases && usersFromPurchases.map((user) => (
    <div key={user._id}>
      <label for="name" className="random-form-label">
        <input
          type="checkbox"
          name="selectedUsers"
          value={user._id}
          checked={selectedUsers.includes(user._id)}
          onChange={() => handleUserCheckboxChange(user._id)}
        />
        {user.fullname} / {user.email} 
      </label>
    </div>
  ))}
</div>
{/* <div className="random-mb-5">
        <label for="name" className="random-form-label">Adsent Students:</label>
        {notPresentUsers.map((user) => (
          <div key={user._id}>
            <label for="name" className="random-form-label">
              <input
                type="checkbox"
                name="notPresentUsers"
                value={user._id}
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleUserCheckboxChange(user._id)}
              />
              {user.fullname} / {user.email} / {user.studentsPhone}
            </label>
          </div>
        ))}
      </div> */}

        <div className="random-mb-5">
          <input type="submit" value="Create Attendance Record" className="btn btn-primary" />
        </div>
      </form>
    </div>
    
  );
};



export default CreateAttendanceWithUserData;
