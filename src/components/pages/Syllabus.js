import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Syllabus() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch product data
        const productResponse = await axios.get(`http://localhost:5000/products/${_id}`);
        const productData = productResponse.data;
        setProduct(productData);

        // Fetch syllabus data
        const syllabusResponse = await axios.get(`http://localhost:5000/products/products/${_id}/syllabus`);
        const syllabusData = syllabusResponse.data;
        setSyllabus(syllabusData);

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching the data.');
        setLoading(false);
      }
    }

    fetchData();
  }, [_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Display other product details as needed */}
      
      <h2>Syllabus</h2>
      <ul>
        {syllabus.map((item) => (
          <li key={item._id}>{item.syllabusname}: {item.syllabusdescription}</li>
        ))}
      </ul>
    </div>
  );
}

export default Syllabus;
