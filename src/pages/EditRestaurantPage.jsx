import { Typography } from '@mui/material';
import RestaurantForm from '../components/RestaurantForm';


const EditRestaurantPage = () => (
  <div className="mt-28">
    <Typography variant="h4" component="h1" className="text-black text-center uppercase" style={{fontWeight: 700}}>Edit Restaurant</Typography>
    <RestaurantForm />
  </div>
);

export default EditRestaurantPage;
