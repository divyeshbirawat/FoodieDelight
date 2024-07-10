import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginBox from './components/LoginBox.jsx';
import CustomAppBar from './components/CustomAppBar.jsx';
import HomePage from './pages/Homepage.jsx';
import EditRestaurantPage from './pages/EditRestaurantPage.jsx';
import AddRestaurantPage from './pages/AddRestaurantPage.jsx';

const AppRoutes = () => (
  <>
    <CustomAppBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<LoginBox />} />
        <Route path="/admin/edit/:id" element={<EditRestaurantPage />} />
        <Route path="/admin/add" element={<AddRestaurantPage />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default AppRoutes;
