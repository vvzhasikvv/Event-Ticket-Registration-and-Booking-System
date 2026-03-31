import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import EventsList from '../pages/EventsList.jsx';
import EventDetails from '../pages/EventDetails.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventsList />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
