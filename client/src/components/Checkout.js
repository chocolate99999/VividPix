import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Checkout = ({ currentUser, setCurrentUser }) => {


  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && ( 
        <div>
          <div className="container">
            <div className="text-center">
              {/* 圖示 */}
              <img src="/icons/Checkout-cart.png" alt="Cart" style={{ width: "200px", height: "200px" }}/>
              <h4 className="mb-4 fw-bold">Sign in to see your saved items.</h4>
              <Link to="/login">
                <button className="btn btn-primary btn-lg" style={{ width: "20%", marginTop: "-10px" }}>Sign in</button>
              </Link>
              <hr style={{ borderTop: "1px solid #666", width: "60%", margin: "20px auto" }} />
              <p className="mb-4 fw-bold">Come join us and start your new journey!</p>
              <Link to="/register">
                <button className="btn btn-outline-secondary btn-lg" style={{ width: "20%", marginTop: "-10px" }}>Register now</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {currentUser && (
        <div>
          <h2>Review Order</h2>
          <h2>TapPay</h2>
        </div>
      )}
    </div>
  );
};

export default Checkout;