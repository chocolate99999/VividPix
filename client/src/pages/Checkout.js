import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = ({ currentUser, setCartCount }) => {
  const navigate = useNavigate();
  // const [cartItems, setCartItems] = useState([]);
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  // setCartItems(storedCart);
  const apiUrl = process.env.REACT_APP_API_URL;
  
  // 初始化 TapPay
  useEffect(() => {
    if (currentUser) {
      initializeTapPay();
    }
  }, [currentUser]);

  const initializeTapPay = () => {
    console.log("============== initializeTapPay ==============")
    const APP_ID = "124301";
    const APP_KEY = "app_wdUhNv0x3NTm1tzQBGaiFQAImHFjDSZKDwFTbcHHx1CPArcwexUpBuDgWgTv";
    window.TPDirect.setupSDK(APP_ID, APP_KEY, "sandbox");

    const fields = {
      number: {
        element: "#card-number",
        placeholder: "**** **** **** ****",
      },
      expirationDate: {
        element: "#card-expiration-date",
        placeholder: "MM / YY",
      },
      ccv: {
        element: "#card-ccv",
        placeholder: "後三碼",
      },
    };

    /* 設定CSS外觀 */
    window.TPDirect.card.setup({
      fields: fields,
      styles: {
        // Style all elements
        'input': {
          'color': 'gray'
        },
        // Styling ccv field
        'input.ccv': {
          // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
          // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
          // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
          // 'color': 'black'
        },
        // style valid state
        '.valid': {
          'color': 'green'
        },
        // style invalid state
        '.invalid': {
          'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
          'input': {
            'color': 'orange'
          }
        }
      }
    })
  };

  const payConfirmBtnCallback = (event) => {
    event.preventDefault();
    console.log("[DBG] payConfirmBtnCallback");

    // 確認信用卡相關欄位 是否符合信用卡規則
    // 且確認是否可以 getPrime
    const tappayStatus = window.TPDirect.card.getTappayFieldsStatus();
    console.log(tappayStatus);

    if (tappayStatus.canGetPrime === false) {
      alert("*請輸入正確信用卡資訊*");
      console.log("[DBG] can not get prime");
      return;
    }

    // 連線至TapPay，將卡號轉換成 Prime
    window.TPDirect.card.getPrime(async (result) => {
      if (result.status !== 0) {
        alert("*請輸入正確信用卡資訊");
        console.log("[DBG] get prime error " + result.msg);
        return;
      }

      let Prime = result.card.prime;
      console.log("[DBG] get prime 成功，prime: " + Prime);

      // 從 localStorage 抓取 user 物件
      const user = JSON.parse(localStorage.getItem("user"));
      
      // 建立傳送至後端 api/orders 資料 
      const orderData = {
        "prime": Prime,
        "order": user.user.cart,
        "amount": user.user.cart[0].totalPrice, 
      }
      console.log(orderData);

      // 發送 Prime Token 給後端 API
      try {
        // 使用 axios 發送 POST 請求 
        const response = await axios.post(`${apiUrl}/api/orders`, 
          orderData,
        );
    
        const data = response.data;
        console.log("[DBG] response.data:",response.data);
        if (response.data.message === "Pay Successful") {
          alert("付款成功！");

          // [Workaround] -s 把 localstorage cart 清空
          // 取得 'user' 物件並解析
          let cart = JSON.parse(localStorage.getItem('cart'));
          console.log(cart);          

          // Clear local storage
          cart = [];
          localStorage.setItem('cart', JSON.stringify(cart));
          console.log(cart);
          setCartCount(0);
          // [Workaround] -e  

          navigate('/thankyou');
        } else {
          alert("付款失敗：" + data.message);
        }
      } catch (error) {
        console.error("付款錯誤：", error);
        alert("付款過程發生錯誤，請稍後再試！");
      }
    });
  };

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
          <form className="p-4 border rounded shadow-sm" style={{ maxWidth: "310px", margin: "auto", backgroundColor: "#f8f9fa" }}>
            <h4 className="text-center mb-4">信用卡付款資訊</h4>
            
            {/* 卡片號碼 */}
            <div className="mb-3 itemBox">
              <label htmlFor="card-number" className="form-label">
                卡片號碼
              </label>
              <div id="card-number" className="form-control"></div>
            </div>

            {/* 有效期限 */}
            <div className="mb-3 itemBox">
              <label htmlFor="card-expiration-date" className="form-label">
                有效期限
              </label>
              <div id="card-expiration-date" className="form-control"></div>
            </div>

            {/* 驗證密碼 */}
            <div className="mb-3 itemBox">
              <label htmlFor="card-ccv" className="form-label">
                驗證密碼
              </label>
              <div id="card-ccv" className="form-control"></div>
            </div>

            {/* 提交按鈕 */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4 w-50" onClick={payConfirmBtnCallback}>
                Pay
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;