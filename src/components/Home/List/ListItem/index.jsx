import React,{ Link } from 'react';
import './styles.css';
import StarRateIcon from '@mui/icons-material/StarRate';


const ListItem = ({
  item: { img, title, price, creator, time, rating },
}) => (
  <div className='listItem-wrap'>
    <img src={img} alt='' />
    <header>
      <h4>{title}</h4>
      <span><StarRateIcon></StarRateIcon>{rating}</span>
    </header>
    <footer>
      <p>
        <b>{time}</b> <span> creator: {creator}</span>
      </p>
      <p>
        <button className='button' >Add To Cart</button>
      </p>
      <p>
        <b>₹{price}</b>
      </p>
    </footer>
  </div>
);

export default ListItem;
