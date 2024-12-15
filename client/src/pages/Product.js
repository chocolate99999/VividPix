import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = ({ currentUser, setCartCount }) => {  // 加入 setCartCount 來更新購物車數量
  const { id: productId } = useParams(); // 從網址中抓取 ID
  const navigate = useNavigate(); 
  const [picture, setPicture] = useState(null); // 圖片資料
  const [loading, setLoading] = useState(true); // 載入狀態
  const [error, setError] = useState(null); // 錯誤訊息
  const auth = 'A9hLA30p9pska7Hy4vKOSygOggWwxMKaMJoZJxNLZHrcO6XPC9WK9pmv';

  // 獲取圖片數據
  const fetchPicture = async (id) => {
    const getPictureURL = `https://api.pexels.com/v1/photos/${id}`;
    try {
      const response = await axios.get(getPictureURL, {
        headers: {
          // Authorization: PEXELS_API_KEY, // 使用共享的 API Key [little code]
          Authorization: auth, // 使用共享的 API Key
        },
      });
      setPicture(response.data); // 儲存 API 返回的圖片數據
    } catch (err) {
      setError(err.message); // 捕捉錯誤
    } finally {
      setLoading(false); // 請求結束後更新載入狀態
    }
  };

  // 當 productId 改變時，重新獲取圖片數據
  useEffect(() => {
    if (productId) {
      fetchPicture(productId);
    }
  }, [productId]);

  const handleBuyNow = async () => {
    if (currentUser) {
      await handleAddToCart(productId);
      // 已登入，導向 Cart 頁面
      navigate("/cart");
    } else {
      await handleAddToCart(productId);
      // 未登入，導向 Login 頁面
      navigate("/login");
    }
  };

  // 處理加入購物車邏輯
  const handleAddToCart = async (id) => {
    try {
      const getPictureURL = `https://api.pexels.com/v1/photos/${id}`;
      const response = await axios.get(getPictureURL, {
        headers: {
          Authorization: auth, // 使用您的 API Key
        },
      });
  
      // 獲取圖片數據
      const pictureData = response.data;
      console.log(pictureData); // {}
  
      // 從 localStorage 中取得現有的購物車訂單資料
      const cart = JSON.parse(localStorage.getItem('cart'));
      console.log(cart); // []
      
      // 檢查商品是否已經存在於購物車
      const isAlreadyInCart = cart.some((item) => item.id === pictureData.id);
  
      if (isAlreadyInCart) {
        alert('This item is already in your cart.');
        return; // 如果已存在，則不再新增
      }
  
      // 將圖片加入購物車
      cart.push(pictureData);
  
      // 將更新後的購物車儲存回 localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // 更新購物車數量
      setCartCount(cart.length);
  
      console.log('Added to cart:', pictureData);
    } catch (err) {
      console.error('Error adding to cart:', err.message);
    }
  };

  // 載入中顯示
  if (loading) {
    return <div>Loading...</div>;
  }

  // 錯誤處理
  if (error) {
    return <div>An error occurred:{error}</div>;
  }
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7 d-flex justify-content-center">
        <img
          src={picture.src.original}
          alt={picture.alt}
          className="img-fluid rounded shadow-sm"
          style={{ width: "586px",  height: "403px",  objectFit: "cover" }}
        />
        </div>
        <div className="col-md-5">
          <h3 className="mb-3">{picture.alt || 'Wonderful Simplicity'}</h3>
          <p>
            <strong>Photographer{'\u00A0'}:</strong>
            <a
              href={picture.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-primary">            
              {'\u00A0'}{picture.photographer}
            </a>
          </p>
          <p>
            <strong className="mt-3">Stock photo ID{'\u00A0'}:</strong>{'\u00A0'}{picture.id}
          </p>
          <div className="mb-3">
            <p>
              <span style={{ fontSize: "1.5rem", color: "red" }}>$12</span>
              {'\u00A0'}for this image
            </p>
          </div>
          <div className="d-flex justify-content-between mt-3" style={{ gap: "20px" }}>
            <button className="btn btn-primary btn-lg" style={{ width: "200px" }} onClick={() => handleBuyNow()}>Buy now</button>
            <button className="btn btn-secondary btn-lg" style={{ width: "200px" }} onClick={() => handleAddToCart(productId)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;