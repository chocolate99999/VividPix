import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

import Explore from './pages/Explore';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';

import Favorites from './components/Favorites';
import AuthService from './services/auth.service';
import ApiService from './services/api.service'; 

import './styles/style.css';

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [apiKey, setApiKey] = useState(""); // 儲存從後端取得的 API Key
  const [cartCount, setCartCount] = useState(0);  // 儲存購物車項目數量

  // 獲取 API Key 從後端
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const key = await ApiService.getApiKey();
        if (key) {
          setApiKey(key);
        } else {
          console.error("Failed to fetch API Key");
        }
      } catch (error) {
        console.error("Error fetching API Key:", error);
      }
    };
  
    fetchApiKey();
  }, []); // 僅在首次渲染時執行

  useEffect(() => {
    console.log("--- APP 頁面 START ---");
    // 從 localStorage 獲取購物車項目數量
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
    console.log("--- APP 頁面 END ---");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser} cartCount={cartCount} />} >
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="explore" element={<Explore currentUser={currentUser} setCurrentUser={setCurrentUser} apiKey={apiKey} />} />          
          <Route path="product/:id" element={<Product currentUser={currentUser} setCurrentUser={setCurrentUser} setCartCount={setCartCount} apiKey={apiKey} />} />
          <Route path="cart" element={<Cart currentUser={currentUser} setCurrentUser={setCurrentUser} setCartCount={setCartCount} />} />
          <Route path="checkout" element={<Checkout currentUser={currentUser} setCurrentUser={setCurrentUser} setCartCount={setCartCount} />} />          
          <Route path="thankYou" element={<ThankYou currentUser={currentUser} setCurrentUser={setCurrentUser} />} />          
          <Route path="favorites" element={<Favorites currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;