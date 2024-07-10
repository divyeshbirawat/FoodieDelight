import { create } from 'zustand';
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../services/api';

const useStore = create((set) => ({
  restaurants: [],
  isLoggedIn: false,
  fetchRestaurants: async () => {
    try {
      const data = await getRestaurants();
      set({ restaurants: data });
    } catch (error) {
      console.error('Error fetching restaurants');
    }
  },
  addRestaurant: async (restaurant) => {
    try {
      const newRestaurant = await createRestaurant(restaurant);
      set((state) => ({
        restaurants: [...state.restaurants, newRestaurant],
      }));
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  },
  updateRestaurant: async (id, updatedRestaurant) => {
    try {
      const data = await updateRestaurant(id, updatedRestaurant);
      set((state) => ({
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === id ? data : restaurant
        ),
      }));
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  },
  removeRestaurant: async (id) => {
    try {
      await deleteRestaurant(id);
      set((state) => ({
        restaurants: state.restaurants.filter((restaurant) => restaurant.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  },
  login: () => {
    return set({ isLoggedIn: true });
  },
  logout: () => {
    set({ isLoggedIn: false });
  },
}));

export default useStore;
