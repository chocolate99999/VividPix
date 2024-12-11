import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

import Explore from './pages/Explore';
import Product from './pages/Product';

import Favorites from './components/Favorites';

import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AuthService from './services/auth.service';

import './styles/style.css';

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />} >
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="explore" element={<Explore currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/product/:id" element={<Product currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="favorites" element={<Favorites currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;