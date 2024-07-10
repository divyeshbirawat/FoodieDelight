import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import RestaurantItem from './RestaurantItem';
import { Container, Grid, Pagination, Button } from '@mui/material';

const RestaurantList = () => {
  const { restaurants, fetchRestaurants, isLoggedIn } = useStore();
  const [page, setPage] = useState(1);
  const restaurantsPerPage = 9;
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * restaurantsPerPage;
  const endIndex = startIndex + restaurantsPerPage;
  const displayedRestaurants = restaurants.slice(startIndex, endIndex);

  return (
    <Container>
      {isLoggedIn && <Button component={Link} to={`/admin/add`} variant="contained" color="primary" className="text-white hover:text-gray-200 mr-4" sx={{marginBottom: '20px'}}> 
        Add New Restaurant
      </Button>
      }
      <Grid container spacing={4}>
        {displayedRestaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <RestaurantItem restaurant={restaurant} isLoggedIn={isLoggedIn} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        className='mx-auto w-fit py-4'
      />
    </Container>
  );
};

export default RestaurantList;
