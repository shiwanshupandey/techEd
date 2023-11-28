import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import PageNavigation from "./PageNavigation";
import { useParams } from 'react-router-dom';
import Star from "../../components/pages/Star";
import AddToCart from "./AddToCart";
import Accordion from './Accordion';
import { TbCategory } from 'react-icons/tb';
import { GiShardSword } from 'react-icons/gi';
import { AiOutlineLink } from 'react-icons/ai';
import { BiHourglass,BiMobileVibration } from 'react-icons/bi';
import {LiaCertificateSolid} from 'react-icons/lia';
import FormatPrice from '../../Helper/FormatPrice';
import { MdSecurity } from 'react-icons/md';
import { TbReplace } from 'react-icons/tb';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 200) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' ...show less'}
      </span>
    </p>
  );
};

const CourseDetails = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const CourseSection = styled.div`
  margin-bottom: 20px;
`;

const CourseTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CourseDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

const CourseLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-left: 10px;
`;

const Wrapper = styled.section`
  .container {
    position: relative;
    padding: 0rem 0;
  }

  .product-details {
    background-color: #2d2f31;
    color: #fff;
    width: 100%;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
  }

  .product_image {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;

    .hr {
      width: 100%;
    }
  }

  .icon-text-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }

  .addtocart {
    background-color: #2d2f31;
    color: #fff;
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    border-radius: 2rem;
  }

  @media (min-width: 768px) {
    .product-data {
      flex-direction: row;
      align-items: flex-start;
    }

    .product-details {
      margin-bottom: 0;
      margin-right: 2rem;
    }
  }

  .product-details.sticky {
    position: sticky;
    top: 0;
    /* Add other styling as needed */
  }
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const MRP = styled.p`
  margin-bottom: 5px;
`;

const DealPrice = styled.p`
  font-size: 20px;
`;

const StyledCourseDetails = styled.div`
  /* Add any additional styling for the course details section here */
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridItem = styled.div`
  /* Add styling for the grid items here */
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 0.5rem;
  }
`;

function Purchases() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:5000/products/${_id}`);
        const productData = response.data;
        setProduct(productData);

        const syllabusResponse = await axios.get(`http://localhost:5000/products/products/${_id}/syllabus`);
        const syllabusData = syllabusResponse.data;
        setSyllabus(syllabusData);

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching the product.');
        setLoading(false);
      }
    }

    fetchProduct();
  }, [_id]);

  const items = syllabus.map((item) => ({
    id: item._id,
    title: item.syllabusname,
    content: item.syllabusdescription,
    id1: item.topic.map((topic) => topic.sectionId),
    topic: item.topic.map((topic) => topic.topictitle),
    link: item.topic.map((topic) => topic.topiclinks),
    description: item.topic.map((topic) => topic.topicdescription),
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const Container = styled.div`
    // ... (CSS styles for your Container component)
  `;

  return (
    <Wrapper>
      <PageNavigation title={product.name} />
      <Container className="container">
        <div className="product-data">
          <div className="product-details sticky">
  <img className="product_image" src={product.image} alt={product.name} />
  <h4>{product.name}</h4>
  <hr></hr>
  <Star stars={product.stars} reviews={product.review} />
  <p>Created By: <span>{product.creator}</span></p>
  <p>Uploaded At: {product.createdAt}</p>
  <hr></hr>
  <div className="icon-text-container">
    <p><TbReplace className="warranty-icon" size={25} /> 30-Day Money-Back Guarantee</p>
    <p><MdSecurity className="warranty-icon" size={25} /> Full Lifetime Access</p>
    <p><LiaCertificateSolid size={25} /> Certificate of completion</p>
  </div>
  <hr></hr>
  <p>
    <PriceSection>
      <MRP>MRP:{' '}
        <del>
          <FormatPrice price={product.price + 2500} />
        </del>
      </MRP>
      <DealPrice>
        Deal of the Day:
        <br />
        <FormatPrice price={product.price} />
      </DealPrice>
    </PriceSection>
  </p>
  <AddToCart product={product} />
</div>

          <CourseDetails>
            <StyledCourseDetails>
              <CourseSection>
                <CourseTitle>This course includes:</CourseTitle>
                <GridContainer>
                  <GridItem>
                    <p><TbCategory /> Category:</p>
                    <p><GiShardSword /> Difficulty:</p>
                    <p><AiOutlineLink /> Sample video:</p>
                    <p><BiHourglass size={25} /> Hours:</p>
                    <p><BiMobileVibration size={25} /> Access:</p>
                    <p><LiaCertificateSolid size={25} /> Certificate:</p>
                  </GridItem>
                  <GridItem>
                    <p><span>{product.category}</span></p>
                    <p>{product.section}</p>
                    <p><CourseLink href={product.link} target="_blank" rel="noopener noreferrer">Sample</CourseLink></p>
                    <p>{product.hours} hours on-demand video</p>
                    <p>Mobile and Computer</p>
                    <p>Certificate of completion</p>
                  </GridItem>
                </GridContainer>
              </CourseSection>
            </StyledCourseDetails>
            <CourseSection>
              <CourseTitle>What you'll learn</CourseTitle>
              <CourseDescription><ReadMore>{product.description}</ReadMore></CourseDescription>
            </CourseSection>
            <CourseSection>
              <CourseTitle>Course content</CourseTitle>
              <Accordion items={items} />
            </CourseSection>
            <CourseSection>
              <CourseTitle>Requirements</CourseTitle>
              <CourseDescription><ReadMore>{product.requirements}</ReadMore></CourseDescription>
            </CourseSection>
          </CourseDetails>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Purchases;


