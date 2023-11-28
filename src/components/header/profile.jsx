import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./Profile.css";
import useUserData from '../userData';

function EditUser() {
	const { id } = useParams(); 
  const userData = useUserData();
  

	const [user, setUserData] = useState({
		email: '',
		password: '',
		fullname: '',
		role: '',
  education: '', 
  photo: '', 
  fatherName: '', 
  motherNamne: '', 
  currentAddress: '', 
  fullAddress: '', 
  pincode: '', 
  currentPincode: '', 
  dob: '', 
  studentsPhone: '', 
  fatherPhone: '', 
  previouseducation: '', 
  height: '', 
  weight: '', 
  adhaarCard: '', 
  leavingCertificate: '', 
  result: '', 
  proofOfIncome: '', 
  employeed: [
    {
      companyname: '',
      address: '',
      workingHours: '',
    },
  ],
	  });

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
  

	
	  const fetchUserData = (token) => {
		axios
		  .post("http://localhost:5000/users/userData", { token })
		  .then((response) => {
			const { status, data } = response.data;
	
			if (status === "ok") {
			  setUserData(data);
			  console.log(data);
			} else {
			  console.error("Error:", data);
			}
		  })
		  .catch((error) => {
			console.error("Request error:", error);
		  })
		  
	  };
  
	useEffect(() => {
		
		  const token = localStorage.getItem('auth-token');
		
		  if (token) {
			fetchUserData(token, id);
		  }
		}, [id]);
  
	const onChangeEmail = (e) => {
	  setUserData({ ...user, email: e.target.value });
	};
  
	const onChangefullname = (e) => {
		setUserData({ ...user, fullname: e.target.value });
	};
	  
	  const onChangeEducation = (e) => {
		setUserData({ ...user, education: e.target.value });
	  };
	  
	  const onChangePhoto = (e) => {
		setUserData({ ...user, photo: e.target.value });
	  };
	  
	  const onChangeFatherName = (e) => {
		setUserData({ ...user, fatherName: e.target.value });
	  };
	  
	  const onChangeMotherName = (e) => {
		setUserData({ ...user, motherNamne: e.target.value });
	  };
	  
	  const onChangeCurrentAddress = (e) => {
		setUserData({ ...user, currentAddress: e.target.value });
	  };
	  
	  const onChangeFullAddress = (e) => {
		setUserData({ ...user, fullAddress: e.target.value });
	  };
	  
	  const onChangePincode = (e) => {
		setUserData({ ...user, pincode: e.target.value });
	  };
	  
	  const onChangeCurrentPincode = (e) => {
		setUserData({ ...user, currentPincode: e.target.value });
	  };
	  
	  const onChangeDob = (e) => {
		setUserData({ ...user, dob: e.target.value });
	  };
	  
	  const onChangeStudentsPhone = (e) => {
		setUserData({ ...user, studentsPhone: e.target.value });
	  };
	  
	  const onChangeFatherPhone = (e) => {
		setUserData({ ...user, fatherPhone: e.target.value });
	  };
	  
	  const onChangePreviousEducation = (e) => {
		setUserData({ ...user, previouseducation: e.target.value });
	  };
	  
	  const onChangeHeight = (e) => {
		setUserData({ ...user, height: e.target.value });
	  };
	  
	  const onChangeWeight = (e) => {
		setUserData({ ...user, weight: e.target.value });
	  };
	  
	  const onChangeAdhaarCard = (e) => {
		setUserData({ ...user, adhaarCard: e.target.value });
	  };
	  
	  const onChangeLeavingCertificate = (e) => {
		setUserData({ ...user, leavingCertificate: e.target.value });
	  };
	  
	  const onChangeResult = (e) => {
		setUserData({ ...user, result: e.target.value });
	  };
	  
	  const onChangeProofOfIncome = (e) => {
		setUserData({ ...user, proofOfIncome: e.target.value });
	  };

    const onChangeCompanyName = (e, index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed[index].companyname = e.target.value;
      setUserData({ ...user, employeed: newEmployeed });
    };
    
    const onChangeAddress = (e, index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed[index].address = e.target.value;
      setUserData({ ...user, employeed: newEmployeed });
    };
    
    const onChangeWorkingHours = (e, index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed[index].workingHours = e.target.value;
      setUserData({ ...user, employeed: newEmployeed });
    };

    const addEmployeedEntry = () => {
      const newEmployeed = [...user.employeed, { companyname: '', address: '', workingHours: '' }];
      setUserData({ ...user, employeed: newEmployeed });
    };

    const removeEmployeedEntry = (index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed.splice(index, 1);
      setUserData({ ...user, employeed: newEmployeed });
    };
    
    
	  
  
	const onSubmit = (e) => {
	  e.preventDefault();
	  axios
		.put(`http://localhost:5000/users/updated/${user._id}`, user)
		.then((res) => {
		  setSuccessMessage('User updated successfully!');
		  setErrorMessage('');
		})
		.catch((error) => {
		  setErrorMessage('Error updating user. Please check your data and try again.');
		  setSuccessMessage('');
		  console.error(error);
		});
	};
  



  
    return (
      <div className="random-main-wrapper">
         <div class="random-form-wrapper">
        <h3 className='wow'>Profile Details</h3>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
	  <form onSubmit={onSubmit}>

      
    <label class="random-form-label random-form-label-2">
          Student Details
        </label>
    <div className="random-mb-5">
    <label htmlFor="name" className="random-form-label">Full Name:</label>
          <input
            type="text"
            className="random-form-input"
            value={user.fullname}
            onChange={onChangefullname}
          />
        </div>

        <div className="random-mb-5">
          <label for="Email" className="random-form-label">Email:</label>
          <input
            type="text"
            required
            className="random-form-input"
            value={user.email}
            onChange={onChangeEmail}
          />
        </div>

        <div className="random-mb-5">
<label for="DOB" className="random-form-label">Date of Birth:</label>
  <input
    type="date"
    className="random-form-input"
    value={user.dob}
    onChange={onChangeDob} // Use the appropriate function
  />
</div>

        <div className="flex flex-wrap random--mx-3">
          <div class="w-full sm:w-half random-px-3">
            <div className="random-mb-5 w-full">
            <label for="phone" className="random-form-label">Student's Phone:</label>
              <input
    type="number"
    className="random-form-input"
    value={user.studentsPhone}
    onChange={onChangeStudentsPhone} 
  />
</div>
</div>

<div class="w-full sm:w-half random-px-3">
<div className="random-mb-5 w-full">
<label for="Email" className="random-form-label">Father's Phone:</label>
  <input
    type="number"
    className="random-form-input"
    value={user.fatherPhone}
    onChange={onChangeFatherPhone} 
  />
</div>
</div>
</div>

<div className="flex flex-wrap random--mx-3">
          <div class="w-full sm:w-half random-px-3">
            <div className="random-mb-5 w-full">
            <label for="Email" className="random-form-label">Father's Name:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.fatherName}
    onChange={onChangeFatherName} 
  />
</div>
</div>

<div class="w-full sm:w-half random-px-3">
<div className="random-mb-5 w-full">
<label for="Email" className="random-form-label">Mother's Name:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.motherNamne}
    onChange={onChangeMotherName} 
  />
</div>
</div>
</div>

<div className="random-mb-5">
      <label for="name" className="random-form-label">Photo:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.photo}
    onChange={onChangePhoto} 
  />
</div>

<div className="flex flex-wrap random--mx-3">
          <div class="w-full sm:w-half random-px-3">
            <div className="random-mb-5 w-full">
            <label for="name" className="random-form-label">Weight:{"{kg}"}</label>
  <input
    type="number"
    className="random-form-input"
    value={user.weight}
    onChange={onChangeWeight} // Use the appropriate function
  />
</div>
</div>

<div class="w-full sm:w-half random-px-3">
<div className="random-mb-5 w-full">
<label for="name" className="random-form-label">Height:{"{Feet}"}</label>
  <input
    type="number"
    className="random-form-input"
    value={user.height}
    onChange={onChangeHeight} // Use the appropriate function
  />
</div>
</div>
</div>


<div className="random-mb-5">
<label for="name" className="random-form-label">Aadhaar Card:</label>
  <input
    type="number"
    className="random-form-input"
    value={user.adhaarCard}
    onChange={onChangeAdhaarCard} // Use the appropriate function
  />
</div>
<br></br>
<hr></hr>
<label class="random-form-label random-form-label-2">
          Education Details
        </label>

        <div className="random-mb-5">
        <label for="name" className="random-form-label">Education:</label>
        <input
          type="text"
          className="random-form-input"
          value={user.education}
          onChange={onChangeEducation} // Use the appropriate function
        />
      </div>


      <div className="random-mb-5">
<label for="name" className="random-form-label">Leaving Certificate:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.leavingCertificate}
    onChange={onChangeLeavingCertificate} // Use the appropriate function
  />
</div>

<div className="random-mb-5">
<label for="name" className="random-form-label">Previous Education:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.previouseducation}
    onChange={onChangePreviousEducation} // Use the appropriate function
  />
</div>

<div className="random-mb-5">
<label for="name" className="random-form-label">Result:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.result}
    onChange={onChangeResult} // Use the appropriate function
  />
</div>

<br></br>
<hr></hr>
<label class="random-form-label random-form-label-2">
          Address Details
        </label>

      

<div className="random-mb-5">
<label for="name" className="random-form-label">Current Address:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.currentAddress}
    onChange={onChangeCurrentAddress} // Use the appropriate function
  />
</div>
<div className="random-mb-5">
<label for="name" className="random-form-label">Full Address:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.fullAddress}
    onChange={onChangeFullAddress} // Use the appropriate function
  />
</div>

<div className="flex flex-wrap random--mx-3">
          <div class="w-full sm:w-half random-px-3">
            <div className="random-mb-5 w-full">
            <label for="name" className="random-form-label">Pincode:</label>
  <input
    type="number"
    className="random-form-input"
    value={user.pincode}
    onChange={onChangePincode} // Use the appropriate function
    inputMode="numeric" 
    style={{ appearance: "textfield" }}
  />
</div>
</div>

<div class="w-full sm:w-half random-px-3">
<div className="random-mb-5 w-full">
<label for="name" className="random-form-label">Current Pincode:</label>
  <input
    type="number"
    className="random-form-input"
    value={user.currentPincode}
    onChange={onChangeCurrentPincode} // Use the appropriate function
  />
</div>
</div>
</div>



<br></br>
<hr></hr>
<label class="random-form-label random-form-label-2">
Employment Details
        </label>


        <div className="random-mb-5">
<label htmlFor="name" className="random-form-label">Proof of Income:</label>
  <input
    type="text"
    className="random-form-input"
    value={user.proofOfIncome}
    onChange={onChangeProofOfIncome} // Use the appropriate function
  />
</div>

<button type="button" onClick={addEmployeedEntry} className="add-employeed-button">
          Are you Employed?
        </button>



{user.employeed.map((employeedItem, index) => (
  <div key={index}>
    <div className="random-mb-5">
    <label htmlFor={`companyname${index}`} className="random-form-label">Company Name:</label>
    <input
      type="text"
      className="random-form-input"
      value={employeedItem.companyname}
      onChange={(e) => onChangeCompanyName(e, index)}
    />
    </div>

    <div className="random-mb-5">
    <label htmlFor={`address${index}`} className="random-form-label">Company Address:</label>
    <input
      type="text"
      className="random-form-input"
      value={employeedItem.address}
      onChange={(e) => onChangeAddress(e, index)}
    />
    </div>

    <div className="random-mb-5">
    <label htmlFor={`workingHours${index}`} className="random-form-label">Working Hours:</label>
    <input
      type="text"
      className="random-form-input"
      value={employeedItem.workingHours}
      onChange={(e) => onChangeWorkingHours(e, index)}
    />
    </div>

    <button type="button" onClick={() => removeEmployeedEntry(index)} className="add-employeed-button">
      Remove Employment
    </button>
    
    {/* Repeat similar blocks for address and working hours */}
  </div>
))}




        
<div className="random-mb-5">
          <input type="submit" value="Edit User Log" className="btn btn-primary" />
        </div>
      </form>
      </div>
      </div>
    );
  }


export default EditUser;











