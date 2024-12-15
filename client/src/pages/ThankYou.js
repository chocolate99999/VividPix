import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  // 從 localStorage 或其他來源抓取訂單資訊
  // const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

  return (
    <div style={{ padding: "3rem" }} className="text-center">
      <div className="container">
        {/* 購物車圖示 */}
        <div className="position-relative">
          <i className="bi bi-cart-check-fill text-success" style={{ fontSize: "60px" }}></i>
        </div>

        {/* 感謝訊息 */}
        <h1 className="mb-4 fw-bold ms-5">感謝您的購買！</h1>
        <p className="mb-4 ms-4">
          我們已收到您的訂單，並正在處理中。
        </p>

        {/* 訂單資訊 */}
        {/* {orderDetails && (
          <div className="border p-4 rounded shadow-sm bg-light">
            <h4 className="mb-3">訂單資訊</h4>
            <p>
              <strong>訂單編號：</strong> {orderDetails.orderId}
            </p>
            <p>
              <strong>金額：</strong> NT$ {orderDetails.amount}
            </p>
            <p>
              <strong>付款方式：</strong> 信用卡
            </p>
          </div>
        )} */}

        {/* 返回首頁按鈕 */}
        <div className="mt-4">
          <Link to="/">
            <button className="btn btn-primary btn-lg">返回首頁</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;