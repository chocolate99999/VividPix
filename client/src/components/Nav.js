import React from 'react';
import { Link } from 'react-router-dom'; 
import AuthService from '../services/auth.service';

const Nav = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); // {/* 登出會導向首頁-2 */} - 清空 local storage
    window.alert("登出成功!現在您會被導向到首頁...");
    setCurrentUser(null);
  }


  return (
    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //     <div className="container-fluid">
    //       <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav">
    //           {/* 以下只有 currentUser 存在 "JWT"，才可以看到頁面 */}
    //           {/* 首頁、購物車 無論是否有 "JWT"，都可以看到頁面 */}
    //           <li className="nav-item">
    //             <Link className="nav-link active" to="/">首頁</Link>
    //           </li>

    //           {!currentUser && (
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/register">註冊</Link>
    //             </li>
    //           )}

    //           {!currentUser && (
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/login">登入</Link>
    //             </li>
    //           )}

    //           {currentUser && (
    //             // {/* 登出會導向首頁-1 */}
    //             <li className="nav-item">
    //               <Link onClick={handleLogout} className="nav-link" to="/">登出</Link>  
    //             </li>
    //           )} 

    //           {currentUser && (
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/profile">會員專區</Link>  
    //             </li>
    //           )} 
              
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/cart">購物車</Link>  
    //           </li>

    //           {currentUser && (
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/checkout">審核訂單</Link>  
    //             </li>
    //           )}              

    //         </ul>
    //       </div>
    //     </div>

    //   </nav>

      
    // </div>

    // 定稿
    <div className="nav-scroller py-0 border-bottom">
      <nav className="nav row flex-nowrap justify-content-between align-items-center m-0">
        <ul className="left col-4 pt-1 d-flex align-items-center mb-1">
          {/* <!-- 指南針和文字 --> */}
          <li className="d-flex justify-content-center align-items-center">
            <Link className="nav-link link-secondary text-decoration-none d-flex align-items-center" to="/imageGrid" href="#" aria-label="Explore">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="me-1" role="img" viewBox="0 0 24 24" transform="rotate(45)">
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
            <a className="link-secondary text-decoration-none d-flex align-items-center" data-bs-toggle="collapse" href="#searchInput" role="button" aria-expanded="false" aria-controls="searchInput">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="me-1" role="img" viewBox="0 0 24 24">
                <title>Search</title>
                <circle cx="10.5" cy="10.5" r="7.5"/>
                <path d="M21 21l-5.2-5.2"/>
              </svg>
              <span>Search</span>
            </a>
          </li>

          {/* <!-- 可折疊的輸入框 --> */}
          <div className="collapse collapse-horizontal ms-2" id="searchInput">
            <input className="form-control" type="text" placeholder="Search..." />
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
            <Link className="nav-link" to="/cart" class="link-secondary text-decoration-none d-flex align-items-center" href="#" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="me-1" role="img" viewBox="0 0 24 24">
                <title>Cart</title>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a1 1 0 0 0 .99.79h9.72a1 1 0 0 0 .98-.79L23 6H6" />
              </svg>
              <span>Cart</span>
            </Link>
          </li>

          {/* <!-- Heart --> */}
          <li className="d-flex justify-content-center align-items-center mx-3">
            <Link className="nav-link" to="/favorites" class="link-secondary text-decoration-none d-flex align-items-center" href="#" aria-label="Heart">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="me-1" role="img" viewBox="0 0 24 24">
                <title>Heart</title>
                <path d="M12 21c-4.8-4.5-8-7.7-8-11.5 0-2.5 2-4.5 4.5-4.5 1.7 0 3.2 1 4 2.5 0.8-1.5 2.3-2.5 4-2.5 2.5 0 4.5 2 4.5 4.5 0 3.8-3.2 7-8 11.5z"/>
              </svg>
              <span>Lists</span>
            </Link>
          </li>

          {/* <!-- User Icon, Account Text, and Collapsible Menu --> */}
          <li className="account d-flex justify-content-center align-items-center position-relative">
            <Link className="link-secondary text-decoration-none d-flex align-items-center" to="#" data-bs-toggle="collapse" data-bs-target="#accountMenu" aria-expanded="false" aria-controls="accountMenu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="me-1" role="img" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              <span>Account</span>
            </Link>
            
            {/* <!-- Collapsible dropdown menu --> */}
            <div className="collapse position-absolute dropdown-menu p-2" id="accountMenu" style={{top: "100%", left: "-68%"}}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-2" viewBox="0 0 24 24">
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