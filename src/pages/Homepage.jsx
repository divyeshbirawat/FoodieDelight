import RestaurantList from '../components/RestaurantList';

const HomePage = () => (
  <>
  <div className='flex text-black my-8 justify-center items-center relative mt-20'>
    <h1>Restaurants</h1>
  </div>
  <RestaurantList />
  </>
);

export default HomePage;
