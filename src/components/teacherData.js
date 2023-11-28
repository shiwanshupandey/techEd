// import React, { useEffect, useState } from 'react';
// import useUserData from './userData';

// const TeacherData = () => {
//   const userData = useUserData();
//   const [result, setResult] = useState(null);

//   // Function to make the GET request and compare user IDs
//   const compareUserIds = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/teacher/');
//       if (response.ok) {
//         const data = await response.json();
//         if (data && data.user === userData._id) {
//           setResult('User IDs match.');
        
//         } else {
//           setResult('User IDs do not match.');
//         }
//       } else {
//         setResult('Error fetching data.');
//       }
//     } catch (error) {
//       setResult('An error occurred.');
//     }
//   };

//   useEffect(() => {
//     compareUserIds();
//   }, [userData._id]);

//   return result;
// };

// export default TeacherData;

import React, { useEffect, useState } from 'react';
import useUserData from './userData';

const TeacherData = () => {
  const userData = useUserData();
  const [teacherData, setTeacherData] = useState(null);
  const [error, setError] = useState(null);

  // Function to make the GET request and compare user IDs
  const compareUserIds = async () => {
    try {
      const response = await fetch('http://localhost:5000/teacher/');
      if (response.ok) {
        const data = await response.json();
        console.log('data.user:', data[0].user);
        if (data[0] && data[0].user === userData._id) {
          const productIds = Array.isArray(data.products) ? data.products.map((product) => product['$oid']) : [];
          setTeacherData({ ...data, products: productIds });
        } else {
          setError('User IDs do not match.');
        }
      } else {
        setError('Error fetching data.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred.');
    }
  };

  useEffect(() => {
    compareUserIds();
  }, [userData._id]);
  console.log(userData._id);




  // Conditionally render based on the availability of teacherData
  if (teacherData === null) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error: {error}</p>;
  } else {
    return (
      <div>
        <p>Teacher's ID: {teacherData._id}</p>
        <p>Products:</p>
        <ul>
          {teacherData.products.map((productId, index) => (
            <li key={index}>
              <a href={productId} target="_blank" rel="noopener noreferrer">
                Product {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default TeacherData;





