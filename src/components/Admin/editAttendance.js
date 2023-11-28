import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SingleProduct from '../pages/SingleProduct';
import "./allCourses.css";
import styled from 'styled-components';
import { debounce } from 'lodash';

const SidebarContainer = styled.div`
  width: 250px; /* Adjust the width as needed */
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CheckboxWrapper = styled.div`
  margin-top: 10px;
`;

const SwitchLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const UserLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  cursor: pointer;
`;

// Optional: Highlight selected users
const SelectedUserLabel = styled(UserLabel)`
  font-weight: bold;
  color: #007bff; /* Change the color as needed */
`;



function EditAttendance() {
  const { id } = useParams(); 
  const [attendannce, setAttendance] = useState({
    date: '',
    products: '',
    Present: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [commonUsers, setCommonUsers] = useState([]);
  
  
  const formatDateForInput = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear().toString().padStart(4, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = formattedDate.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/attend/${id}`)
  //     .then((res) => {
  //       const attendanceData = res.data;
  //             // Extract an array of fullnames from the user objects
  //     const userFullnames = attendanceData.Present;
  //     const date = attendanceData.date;
  //     const product = attendanceData.products;
      

  //       setAttendance({
  //         date: date,
  //         products: product,
  //         Present: userFullnames,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

      // axios
      // .get('http://localhost:5000/purchases/')
      // .then((res) => {
      //   const purchasesData = res.data;
      //   const filteredPurchases = purchasesData.filter((purchase) =>
      //   purchase.products.some((product) => product._id === attendannce.products._id)
      // );
      // const usersFromPurchases = filteredPurchases.flatMap((purchase) => purchase.user);
      // console.log(usersFromPurchases);
      // setAllUsers(usersFromPurchases);
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
  // }, [id]);

  
  useEffect(() => {
    

    axios
      .get(`http://localhost:5000/attend/${id}`)
      .then((res) => {
        const attendanceData = res.data;
        const userFullnames = attendanceData.Present;
        const date = attendanceData.date;
        const product = attendanceData.products;
        // console.log(userFullnames.map((user)=> user._id));

        setAttendance({
          date: date,
          products: product,
          Present: userFullnames,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    const fetchDataInterval = setInterval(() => {
      axios
        .get('http://localhost:5000/purchases/')
        .then((res) => {
          // console.log(res.data);
          const purchasesData = res.data;
          const filteredPurchases = purchasesData.filter((purchase) =>
            purchase.products.some((product) => product._id === attendannce.products._id)
          );
          const usersFromPurchases = filteredPurchases.flatMap((purchase) => purchase.user);
          // console.log(usersFromPurchases.map((user)=> user._id));


          const commonUsers = attendannce.Present.filter((user) =>
          usersFromPurchases.map((u) => u._id).includes(user._id)
        );

        console.log('Common Users:', commonUsers.map((user)=> user._id));
        setCommonUsers(commonUsers.map((user)=> user._id));

          setAllUsers(usersFromPurchases);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000); // Fetch data every 5 seconds

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(fetchDataInterval);
  }, [id, attendannce.products._id]);
  // console.log(attendannce);


  const onDeleteUser = (userId) => {
    // Send a DELETE request to remove the user from the present list
    axios
      .delete(`http://localhost:5000/attend/${id}/${userId}`)
      .then((res) => {
        // Update the local state after successful deletion
        setAttendance((prevAttendance) => {
          const updatedPresent = prevAttendance.Present.filter((id) => id !== userId);
          return {
            ...prevAttendance,
            Present: updatedPresent,
          };
        });
        setSuccessMessage('User removed successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error removing user. Please try again.');
        setSuccessMessage('');
        console.error(error);
      });
  };


  const onChangeInput = (e, field) => {
    setAttendance({ ...attendannce, [field]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/attend/${id}`, attendannce)
      .then((res) => {
        setSuccessMessage('Course updated successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error updating course. Please check your data and try again.');
        setSuccessMessage('');
        console.error(error);
      });
  };

  const handleCheckboxChange = (userId) => {
    // Check if the user is already in the attendance list
    const isUserAlreadySelected = selectedUsers.includes(userId);
  
    setSelectedUsers((prevSelectedUsers) => {
      if (isUserAlreadySelected) {
        // User is already in the list, remove them
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        // User is not in the list, add them
        return [...prevSelectedUsers, userId];
      }
    });
  
    setAttendance((prevAttendance) => {
      const updatedPresent = isUserAlreadySelected
        ? prevAttendance.Present.filter((id) => id !== userId)
        : [...prevAttendance.Present, userId];
  
      return {
        ...prevAttendance,
        Present: updatedPresent,
      };
    
    });
    
  };
  
  // console.log('attendannce.Present', attendannce.Present);
  // console.log('Is user present:', attendannce.Present.includes(user._id));
// console.log('selectedUsers', selectedUsers);


  

  return (
    <div className="containe">
      <h3>Edit Attendance</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
      <div className="random-mb-5">
  <label htmlFor="name" className="random-form-label">Date:</label>
  <input
  type="date"
  required
  className="random-form-input"
  value={formatDateForInput(attendannce.date)}
  onChange={(e) => onChangeInput(e, 'date')}
/>
</div>
<br></br>

<div className="random-mb-5">
          <label htmlFor="name" className="random-form-label">course:</label>
          <b>{attendannce.products.name}</b>
          <input
            type="text"
            required
            className="random-form-input"
            value={attendannce.products._id}
            onChange={(e) => onChangeInput(e, 'products')}
          />
        </div>

        <CheckboxContainer>
          <SidebarContainer>
            <CheckboxWrapper className="checkbox-wrapper-22">
              <SwitchLabel htmlFor="name" className="switch">
                Attendance:
              </SwitchLabel>
              {allUsers.map((user) => (
                <div key={user._id}>
                  {console.log('Is user present:', commonUsers.includes(user._id))}
                  <CheckboxInput
                    type="checkbox"
                    id={`user-${user._id}`}
                    checked={attendannce.Present.includes(user._id) || selectedUsers.includes(user._id) || commonUsers.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                  {attendannce.Present.includes(user._id) ? (
                    <SelectedUserLabel htmlFor={`user-${user._id}`}>
                      {user.fullname}
                    </SelectedUserLabel>
                  ) : (
                    <UserLabel htmlFor={`user-${user._id}`}>
                      {user.fullname}
                    </UserLabel>
                  )}
                  <button type="button" onClick={() => onDeleteUser(user._id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              ))}
            </CheckboxWrapper>
  </SidebarContainer>
</CheckboxContainer>


       

        <div className="random-mb-5">
          <input type="submit" value="Edit Notification" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

const CheckboxContainer = styled.div`
  /* Add any additional styling for the container here */
`;

export default EditAttendance;