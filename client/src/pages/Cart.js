import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();  // 使用 useNavigate

  useEffect(() => {  
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setCartCount(storedCart.length); // 更新 cartCount
  }, [setCartCount]);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length); // 更新 cartCount
  };

  // 計算總額
  const calculateTotal = () => {
    return cartItems.length * 12; // 假設每張圖片價格為 $12
  };

  // 函數：將 cartSummary 加入 localStorage 的 'user' 物件中的 'cart' 屬性
  const pendingPayOrder = (cartSummary) => { 

    // 取得 'user' 物件並解析
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    console.log(user.user);

    // Clear local storage
    user.user.cart=[];
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user.user);

    //檢查 'cart' 屬性是否存在且是陣列
    if (user && Array.isArray(user.user.cart)) 
    {
      // 將 cartSummary 加入 'cart' 陣列
      user.user.cart.push(cartSummary);
      console.log(cartSummary);
      console.log(user.user.cart);
      
      // 清空 'cart' 陣列 // 測試後清空用
      // user.cart = [];
      // delete user.cart;
    } 

    // 更新回 'user' 物件到 localStorage
    localStorage.setItem('user', JSON.stringify(user));
  };

  // 點擊按鈕後跳轉到 Checkout 頁面
  const handleCheckout = () => {
    
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      // 如果 'user' 不存在，導向登入頁面
      navigate('/login');
    } 
    else {
      // 將購物車資料統整為新訂單
      const cartSummary = {
        "cartItems"  : cartItems.map(item => ({
        "photoID"    : item.id,
        "photoTitle" : item.alt,
        "photoUrl"   : item.src.original,
        "price"      : 12 // 每個商品的固定價格
      })),
        "totalPrice" : cartItems.length * 12 // 總價格計算公式
      };

      console.log(cartSummary);
      pendingPayOrder(cartSummary);

      navigate("/checkout");  // 跳轉到 Checkout 頁面
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* 左邊產品清單 */}
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <h3 className="fw-bold mb-0 me-2">Cart</h3>
            <p className="mb-0" style={{ fontSize: "1.5rem" }}>
              ({cartItems.length} items)
            </p>
          </div>

          {cartItems.length === 0 ? (
            <p>The shopping cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={item.id}
                className="d-flex align-items-center py-3"
                style={{
                  borderBottom:
                    index !== cartItems.length - 1 ? "1px solid #ddd" : "none",
                }}
              >
                <img
                  src={item.src.tiny}
                  alt={item.alt || "Wonderful Simplicity"}
                  className="me-3"
                  style={{ objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <h5 className="mb-2">{item.alt || "Wonderful Simplicity"}</h5>
                  <p className="mb-0 text-muted">
                    Stock photo ID{'\u00A0'}:{'\u00A0'}{item.id}
                  </p>
                </div>
                <p>
                  <span style={{ fontSize: "1.5rem", color: "red" }}>$12</span>
                </p>
                <button className="btn btn-sm mb-3" onClick={() => handleRemoveItem(item.id)}>        
                  <img src="/icons/Cart-delete.png" alt="Delete" style={{ width: "20px", height: "20px" }}/>               
                </button>
              </div>
            ))
          )}
        </div>

        {/* 右邊結帳資訊 */}
        <div className="col-lg-4">
          <div className="p-4 border rounded" style={{ backgroundColor: "#f8f9fa" }}>
            <h4 className="fw-bold mb-4">Order Summary</h4>
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold">Taxes:</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold mt-2">Estimated total:</span>
              <span className="fw-bold" style={{ fontSize: "1.5rem", color: "red" }}>${calculateTotal()}</span>
            </div>
            <button className="btn btn-primary w-100 mt-3" onClick={handleCheckout}>Continue to checkout</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;