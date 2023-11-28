import { useEffect, useState } from 'react';
import axios from 'axios';

const useUserData = () => {
  const [userData, setUserData] = useState('not logged in'); // Set initial value

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
            // If there's an error, you can set userData to 'not logged in' or handle the error as needed
            setUserData('not logged in');
          }
        })
        .catch((error) => {
          // console.error('Request error:', error);
          // If there's a request error, you can set userData to 'not logged in' or handle the error as needed
          setUserData('not logged in');
        });
    }
  }, []);

  return userData;
};

export default useUserData;
