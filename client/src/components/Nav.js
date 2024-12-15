import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import AuthService from '../services/auth.service';

import { useNavigate, useSearchParams } from "react-router-dom";

const Nav = ({ currentUser, setCurrentUser, cartCount }) => {  // 接收 cartCount 作為 props
  const navigate = useNavigate();
  let [input, setInput] = useState("");
  let [currentSearch, setCurrentSearch] = useState(""); 
  let [navInput, setNavInput] = useState(""); 
  let [navCurrentSearch, setNavCurrentSearch] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
 
  const handleNavInput = (e) => {
    setNavInput(e.target.value);
  };

  let addQueryParam = (key, value) => {   
    console.warn("[ DBG] 2");
    searchParams.set(key, value);
    console.warn("[ DBG] 3");
    setSearchParams(searchParams); // 更新 URL
    return searchParams.toString();
  }

  // const removeQueryParam = () => {
  //   searchParams.delete("input"); // 刪除 input 參數
  //   setSearchParams(searchParams); // 更新 URL
  //   console.log("[後]searchParams :", `${searchParams.toString()}`); // ""
  //   navigate(`/`, { replace: true });
  // };

  // 獲取 URL 中的 input 參數
  let checkQueryParams = () => {
    const urlInputParam = searchParams.get("input");
    return urlInputParam;
  };

  let urlInputParam = checkQueryParams();

  // Enter 功能 
  const handleNavKeyDown  = async (e) => {
    if (e.key === 'Enter') 
    {
      console.log('Nav search API called');
      console.log("urlInputParam", urlInputParam);
      console.log("!urlInputParam", !urlInputParam);

      //[BUG] if (!urlInputParam){添加 網址 input 參數、清空ES值、search(變更URL)、設定 navCurrentSearch 值} 
      // else{進入頁面直接 Nav Search}
      if (!urlInputParam){
        console.log("狀態: url 沒有 input 參數時! ===== 檢驗方法 : 由 Explore Search 後，轉而 Nav Search =====");

        setInput(input = ""); 
        setCurrentSearch(setCurrentSearch = currentSearch); // 清空 currentSearch

        let addInputParam = addQueryParam("input", navInput);
        console.log("addInputParam : ", addInputParam); // 實: input=cat

        // navigate(`/explore?${addInputParam}`, { replace: true });

        navigate(`/`, { replace: true });

        if (addInputParam) {
          // 使用 Promise 延遲確保狀態同步後再跳轉
          setTimeout(() => {
            console.log("跳轉到：", `/explore?${addInputParam}`);
            navigate(`/explore?${addInputParam}`, { replace: true });
          }, 0);
        }
      }
      else if(urlInputParam){
        console.log("狀態: url 有 input 參數時! ===== 檢驗方法 : 進入頁面後，連續重複使用 Nav Search =====");

        setNavCurrentSearch(navCurrentSearch = navInput);
        console.log("navCurrentSearch : ", navCurrentSearch);    // 預 : star 實: star
        let updateInputParam = addQueryParam("input", navInput);
        console.log("updateInputParam : ", updateInputParam);    // 預 : input=star 實: input=star

        navigate(`/`, { replace: true });

        if (updateInputParam) {
          // 使用 Promise 延遲確保狀態同步後再跳轉
          setTimeout(() => {
            console.log("跳轉到：", `/explore?${updateInputParam}`);
            navigate(`/explore?${updateInputParam}`, { replace: true });
          }, 0);
        }

        console.log(navInput);         // 預 : star 實: star
        console.log(navCurrentSearch); // 預 : star 實: star
      }

      setNavInput("");            // 清空輸入框

      console.log(navInput);      // 預 : star 實: star

      setNavInput(navInput = ""); // 清空 navInput 的值

      console.log(navInput);      // 預 : " " 實: " "
    }
  }

  const handleLogout = () => {
    AuthService.logout(); // {/* 登出會導向首頁-2 */} - 清空 local storage
    window.alert("登出成功!現在您會被導向到首頁...");
    setCurrentUser(null);
  }

  return (
    <div className="nav-scroller py-0 border-bottom">
      <nav className="nav row flex-nowrap justify-content-between align-items-center m-0">
        <ul className="left col-4 pt-1 d-flex align-items-center mb-1">
          {/* <!-- 指南針和文字 --> */}
          <li className="d-flex justify-content-center align-items-center">
            <Link className="nav-link link-secondary text-decoration-none d-flex align-items-center" to="/explore" aria-label="Explore">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-1" role="img" viewBox="0 0 24 24" transform="rotate(45)">
                <title>Explore</title>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6l3.5 8.5L12 12l-3.5 2.5L12 6z" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
              <span>Explore</span>
            </Link>
          </li>

          {/* <!-- 放大鏡圖示和文字 "Search" --> */}
          <li className="d-flex justify-content-center align-items-center ms-3">
            <a className="link-secondary text-decoration-none d-flex align-items-center" href="#searchInput" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="searchInput">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-1" role="img" viewBox="0 0 24 24">
                <title>Search</title>
                <circle cx="10.5" cy="10.5" r="7.5"/>
                <path d="M21 21l-5.2-5.2"/>
              </svg>
              <span>Search</span>
            </a>
          </li>

          {/* <!-- 可折疊的輸入框 --> */}
          <div className="collapse collapse-horizontal ms-2" id="searchInput">
            <input onChange={handleNavInput} onKeyDown={handleNavKeyDown} value={navInput} className="form-control bg-white" type="text" placeholder="Search..." />
          </div>
        </ul>

        {/* <!-- 網站名 --> */}
        <div className="middle col-4 text-center">
          <Link className="nav-link blog-header-logo text-body-emphasis text-decoration-none fixed-black-text" to="/">
            <span style={{ color: 'black' }}>ViviPix</span>
          </Link>
        </div>

        <ul className="right col-4 d-flex justify-content-end align-items-center mb-1">
          {/* <!-- Cart --> */}
          <li className="d-flex justify-content-center align-items-center">
            <Link className="nav-link link-secondary text-decoration-none d-flex align-items-center" to="/cart" href="#" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-1" role="img" viewBox="0 0 24 24">
                <title>Cart</title>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a1 1 0 0 0 .99.79h9.72a1 1 0 0 0 .98-.79L23 6H6" />
              </svg>
              <span>Cart({cartCount})</span>  {/* 顯示購物車項目數量 */}
            </Link>
          </li>

          {/* <!-- Heart --> */}
          <li className="d-flex justify-content-center align-items-center mx-3">
            <Link className="nav-link link-secondary text-decoration-none d-flex align-items-center" to="/favorites" href="#" aria-label="Heart">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-1" role="img" viewBox="0 0 24 24">
                <title>Heart</title>
                <path d="M12 21c-4.8-4.5-8-7.7-8-11.5 0-2.5 2-4.5 4.5-4.5 1.7 0 3.2 1 4 2.5 0.8-1.5 2.3-2.5 4-2.5 2.5 0 4.5 2 4.5 4.5 0 3.8-3.2 7-8 11.5z"/>
              </svg>
              <span>Lists</span>
            </Link>
          </li>

          {/* <!-- User Icon, Account Text, and Collapsible Menu --> */}
          <li className="account d-flex justify-content-center align-items-center position-relative">
            <Link className="link-secondary text-decoration-none d-flex align-items-center" to="#" data-bs-toggle="collapse" data-bs-target="#accountMenu" aria-expanded="false" aria-controls="accountMenu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-1" role="img" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>

              {!currentUser && (
                <span>Account</span>
              )}

              {currentUser && (
                <div className="d-flex flex-column position-relative text-center mb-3">
                  <p className="fw-bold mb-3">{currentUser.user.username}</p>
                  <span style={{ marginTop: '-25px'}}>Account</span>
                </div>               
              )}
            </Link>
            
            {/* <!-- Collapsible dropdown menu --> */}
            <div className="collapse position-absolute dropdown-menu p-2" id="accountMenu" style={{ top: "100%", left: "-75%" }}>
              {!currentUser && (
                <Link className="dropdown-item text-decoration-none d-flex align-items-center" to="/login">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-2" viewBox="0 0 24 24">                   
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                  </svg>
                  <span>Sign In</span>
                </Link>
              )}
              {!currentUser && (
                <Link className="dropdown-item text-decoration-none d-flex align-items-center" to="/register">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" /> 
                    <line x1="12" y1="9" x2="12" y2="15" /> 
                    <line x1="9" y1="12" x2="15" y2="12" /> 
                  </svg>
                  <span>Register</span>                 
                </Link>
              )}
              
              {currentUser && (
                <Link className="dropdown-item text-decoration-none d-flex align-items-center" to="/profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-2" viewBox="0 0 24 24">
                    <title>My Account</title>
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                  </svg>
                  <span>My Account</span>                  
                </Link>
              )}
             
              {currentUser && (
                <Link onClick={handleLogout} className="dropdown-item text-decoration-none d-flex align-items-center" to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-2" viewBox="0 0 24 24">
                    <title>Sign Out</title>
                    <path d="M5 3h8M5 3v18M5 21h8" />
                    <path d="M12 12H21" />
                    <path d="M17 8l4 4-4 4" />
                  </svg>
                  <span>Sign Out</span> 
                </Link>
              )}
            </div>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Nav;