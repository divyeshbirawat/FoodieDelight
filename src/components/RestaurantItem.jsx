import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import useStore from '../store/useStore';

const RestaurantItem = ({ restaurant, isLoggedIn }) => {
  const { removeRestaurant } = useStore();
  const [imageURL, setImageURL] = useState('');

useEffect(() => {
    const fetchImage = async () => {
      const cachedImage = localStorage.getItem(`restaurant-image-${restaurant.id}`);
      if (cachedImage) {
        setImageURL(cachedImage);
      } else {
        const response = await fetch(`https://picsum.photos/340/300?random=${Math.random()}`);
        const data = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setImageURL(base64data);
          localStorage.setItem(`restaurant-image-${restaurant.id}`, base64data);
        };
        reader.readAsDataURL(data);
      }
    };

    fetchImage();
  }, [restaurant.id]);

  const handleDelete = () => {
    alert('Are you sure you want to delete this restaurant?')
    removeRestaurant(restaurant.id);
    localStorage.removeItem(`restaurant-image-${restaurant.id}`);
  };


  return (
    <Card className='h-[545px] max-w-[363px] mx-auto'>
      <CardContent className='h-full relative'>
        <Box className="rounded-xl bg-grey shadow-md mb-4 overflow-hidden max-w-[330px] mx-auto">
          <img src={imageURL} className="rounded-xl hover:scale-125 transition duration-300" alt={restaurant.restaurant_name} />
        </Box>
        <Typography variant="h5" component="div">
          {restaurant.restaurant_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='text-base line-clamp-3'>
          {restaurant.restaurant_description}
        </Typography>
        <p className='pt-2 text-black text-base'>
          {restaurant.location}
        </p>
        <p className='pt-2 font-bold text-base'>
          {restaurant.phone_number}
        </p>
        {isLoggedIn && 
        <div className='absolute bottom-[20px] mt-[10px]'>
          <Button component={Link} to={`/admin/edit/${restaurant.id}`} variant="contained" color="primary">
            Edit
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary" style={{ marginLeft: "16px" }}>
            Delete
          </Button>
        </div>}
      </CardContent>
    </Card>
  );
};

RestaurantItem.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    phone_number: PropTypes.string,
    restaurant_name: PropTypes.string.isRequired,
    restaurant_description: PropTypes.string.isRequired,
    location: PropTypes.string,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default RestaurantItem;
