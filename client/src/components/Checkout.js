import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AuthService from '../services/auth.service';

const Checkout = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && ( 
        <div>
          <h2>您必須要先登入才可以看到結帳畫面。</h2>
          <button className="btn btn-primary btn-lg" onClick={handleTakeToLogin} >回到登入頁面</button>
        </div>
      )}
      {currentUser && (
        <div>
          <h2>Review Order</h2>
        </div>
      )}
    </div>
  );
};

export default Checkout;