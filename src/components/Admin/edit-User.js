import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./allCourses.css";


function EditUser() {
	const { id } = useParams(); // Access route parameter 'id' using useParams

	const [user, setUser] = useState({
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
  const [userData, setUserData] = useState({});
	const [role, setUserType] = useState("");
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
  console.log(user);  
	useEffect(() => {
	  axios
		.get(`http://localhost:5000/users/${id}`)
		.then((res) => {
		  const userData = res.data;
		  setUser({
        email: userData.email,
        password: userData.password,
        fullname: userData.fullname,
        role: userData.role,
        education: userData.education || '',
        photo: userData.photo || '',
        fatherName: userData.fatherName || '',
        motherNamne: userData.motherNamne || '',
        currentAddress: userData.currentAddress || '',
        fullAddress: userData.fullAddress || '',
        pincode: userData.pincode || '',
        currentPincode: userData.currentPincode || '',
        dob: userData.dob || '',
        studentsPhone: userData.studentsPhone || '',
        fatherPhone: userData.fatherPhone || '',
        previouseducation: userData.previouseducation || '',
        height: userData.height || '',
        weight: userData.weight || '',
        adhaarCard: userData.adhaarCard || '',
        leavingCertificate: userData.leavingCertificate || '',
        result: userData.result || '',
        proofOfIncome: userData.proofOfIncome || '',
        employeed: userData.employeed || [
          {
            companyname: '',
            address: '',
            workingHours: '',
          },
        ],
      });
		})
		.catch((error) => {
		  console.error(error);
		});


		const token = localStorage.getItem("auth-token");

    if (token) {

      axios
        .post("http://localhost:5000/users/userData", { token })
        .then((response) => {
          const { status, data } = response.data;

          if (status === "ok") {
            
            setUserData(data);
          } else {
            
            console.error("Error:", data);
          }
        })
        .catch((error) => {
          console.error("Request error:", error);
        });
    }
	}, [id]);
  
	const onChangeEmail = (e) => {
	  setUser({ ...user, email: e.target.value });
	};
  
	const onChangePassword = (e) => {
	  setUser({ ...user, password: e.target.value });
	};
  
	const onChangefullname = (e) => {
	  setUser({ ...user, fullname: e.target.value });
	};

  const onChangeEducation = (e) => {
		setUser({ ...user, education: e.target.value });
	  };
	  
	  const onChangePhoto = (e) => {
		setUser({ ...user, photo: e.target.value });
	  };
	  
	  const onChangeFatherName = (e) => {
		setUser({ ...user, fatherName: e.target.value });
	  };
	  
	  const onChangeMotherName = (e) => {
		setUser({ ...user, motherNamne: e.target.value });
	  };
	  
	  const onChangeCurrentAddress = (e) => {
		setUser({ ...user, currentAddress: e.target.value });
	  };
	  
	  const onChangeFullAddress = (e) => {
		setUser({ ...user, fullAddress: e.target.value });
	  };
	  
	  const onChangePincode = (e) => {
		setUser({ ...user, pincode: e.target.value });
	  };
	  
	  const onChangeCurrentPincode = (e) => {
		setUser({ ...user, currentPincode: e.target.value });
	  };
	  
	  const onChangeDob = (e) => {
		setUser({ ...user, dob: e.target.value });
	  };
	  
	  const onChangeStudentsPhone = (e) => {
		setUser({ ...user, studentsPhone: e.target.value });
	  };
	  
	  const onChangeFatherPhone = (e) => {
		setUser({ ...user, fatherPhone: e.target.value });
	  };
	  
	  const onChangePreviousEducation = (e) => {
		setUser({ ...user, previouseducation: e.target.value });
	  };
	  
	  const onChangeHeight = (e) => {
		setUser({ ...user, height: e.target.value });
	  };
	  
	  const onChangeWeight = (e) => {
		setUser({ ...user, weight: e.target.value });
	  };
	  
	  const onChangeAdhaarCard = (e) => {
		setUser({ ...user, adhaarCard: e.target.value });
	  };
	  
	  const onChangeLeavingCertificate = (e) => {
		setUser({ ...user, leavingCertificate: e.target.value });
	  };
	  
	  const onChangeResult = (e) => {
		setUser({ ...user, result: e.target.value });
	  };
	  
	  const onChangeProofOfIncome = (e) => {
		setUser({ ...user, proofOfIncome: e.target.value });
	  };

    const onChangeCompanyName = (e, index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed[index].companyname = e.target.value;
      setUser({ ...user, employeed: newEmployeed });
    };
    
    const onChangeAddress = (e, index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed[index].address = e.target.value;
      setUser({ ...user, employeed: newEmployeed });
    };
    
    const onChangeWorkingHours = (e, index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed[index].workingHours = e.target.value;
      setUser({ ...user, employeed: newEmployeed });
    };

    const addEmployeedEntry = () => {
      const newEmployeed = [...user.employeed, { companyname: '', address: '', workingHours: '' }];
      setUser({ ...user, employeed: newEmployeed });
    };

    const removeEmployeedEntry = (index) => {
      const newEmployeed = [...user.employeed];
      newEmployeed.splice(index, 1);
      setUser({ ...user, employeed: newEmployeed });
    };

	const onChangeRole = (e) => {
	  setUser({ ...user, role: e.target.value });
	};

  const isAdmin = userData && userData.role === 'Admin';
  
	const onSubmit = (e) => {
	  e.preventDefault();
	  axios
		.put(`http://localhost:5000/users/updated/${id}`, user)
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
      <div className="containe">
        <h3>Edit User Log</h3>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
    <div class="radio-inputs">
            <label className="radio">
    <input type="radio" name="UserType" value="User" checked={user.role === 'User'} onChange={onChangeRole}/>
    <span className="name">USER</span>
  </label>
  <label className="radio">
    <input type="radio" name="UserType" value="teacher" checked={user.role === 'teacher'} onChange={onChangeRole}/>
    <span className="name">TEACHER</span>
  </label>
  <label className="radio">
    <input type="radio" name="UserType" value="Admin" checked={user.role === 'Admin'}  onChange={onChangeRole}/>
    <span className="name">ADMIN</span>
  </label>
      
                </div>


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
    );
  }


export default EditUser;
