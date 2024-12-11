import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id: productId } = useParams(); // 從網址中抓取 ID
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
          // Authorization: PEXELS_API_KEY, // 使用共享的 API Key [小老弟提供 code]
          Authorization: auth, // 使用共享的 API Key
        },
      });
      setPicture(response.data); // 儲存 API 返回的圖片數據
      console.log(response.data); // Object
    } catch (err) {
      setError(err.message); // 捕捉錯誤
    } finally {
      setLoading(false); // 請求結束後更新載入狀態
    }
  };

  // console.log(picture); // null

  // 當 productId 改變時，重新獲取圖片數據
  useEffect(() => {
    if (productId) {
      fetchPicture(productId);
    }
  }, [productId]);

  // 載入中顯示
  if (loading) {
    return <div>載入中...</div>;
  }

  // 錯誤處理
  if (error) {
    return <div>發生錯誤: {error}</div>;
  }
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7 d-flex justify-content-center">
        <img
          src={picture.src.original}
          alt={picture.alt}
          className="img-fluid rounded shadow-sm"
          style={{
            width: "586px",  
            height: "403px",  
            objectFit: "cover",  // 確保圖片縮放並裁切，維持比例
          }}
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
          <div
            className="d-flex justify-content-between mt-3"
            style={{ gap: "20px" }}>
            
            <button
              className="btn btn-primary btn-lg"
              style={{
                width: "200px", // 固定按鈕寬度
              }}>
              Buy now
            </button>
            <button
              className="btn btn-secondary btn-lg"
              style={{
                width: "200px", // 固定按鈕寬度
              }}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;