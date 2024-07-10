import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Box } from '@mui/material';
import useStore from '../store/useStore';

const RestaurantForm = () => {
  const [restaurant, setRestaurant] = useState({ restaurant_name: '', restaurant_description: '', location: '', phone_number: '' });
  const navigate = useNavigate();
  const { id } = useParams();
  const { addRestaurant, updateRestaurant, restaurants, isLoggedIn } = useStore();
  const isEdit = id !== undefined;


  useEffect(() => {
    if (isLoggedIn === false ) {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);
    

  useEffect(() => {
    if (isEdit) {
      const existingRestaurant = restaurants.find((r) => r.id === id);
      console.log(restaurants,`restaurants`,existingRestaurant)
      if (existingRestaurant) {
      
      console.log('restaurant',existingRestaurant,id);
        setRestaurant(existingRestaurant);
      }
    }
  }, [id, isEdit, restaurants]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateRestaurant(id, restaurant).then(() => navigate('/'));
    } else {
      addRestaurant(restaurant).then(() => navigate('/'));
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          name="restaurant_name"
          label="Name"
          fullWidth
          value={restaurant.restaurant_name}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          name="restaurant_description"
          label="Description"
          fullWidth
          value={restaurant.restaurant_description}
          onChange={handleChange}
          required
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          name="location"
          label="Location"
          fullWidth
          value={restaurant.location}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          name="phone_number"
          label="Phone Number"
          fullWidth
          value={restaurant.phone_number}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {isEdit ? 'Update' : 'Add'} Restaurant
        </Button>
      </Box>
    </Container>
  );
};

export default RestaurantForm;
