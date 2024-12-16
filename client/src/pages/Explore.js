import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

import Search from '../components/Search';
import Pictures from '../components/Pictures';

import ApiService from '../services/api.service'; 

const Explore = ({ apiKey }) => {
  let [input, setInput] = useState("");
  let [data, setData]   = useState(null);
  let [page, setPage]   = useState(1);
  let [currentSearch, setCurrentSearch]       = useState("");
  let [navCurrentSearch, setNavCurrentSearch] = useState("");
  let [searchParams, setSearchParams]         = useSearchParams();
  
  const navigate              = useNavigate();
  const initialURL            = `https://api.pexels.com/v1/curated?page=1&per_page=16`;
  const searchURL             = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=16`;
  const searchQueryNoValueURL = `https://api.pexels.com/v1/search?query=&page=1&per_page=16`; 

  let checkQueryParams  = () => {
    const urlInputParam = searchParams.get("input");
    return urlInputParam;
  };

  let urlInputParam = checkQueryParams();

  let removeQueryParam = () => {
    searchParams.delete("input");  // 刪除 input 參數
    setSearchParams(searchParams); // 更新 URL
    console.log("[後]searchParams :", `${searchParams.toString()}`); // ""
    navigate(`/explore`, { replace: true });
  };

  // 發送搜尋請求
  const search = async (url) => {
    if (url === searchQueryNoValueURL) {
      console.warn('Invalid URL or empty query!');
      return;
    }

    try {
      const photos = await ApiService.searchPhotos(url, apiKey); // 使用 API Key 發送請求
      setData(photos); // 儲存搜尋結果
    } 
    catch (error) {
      console.error('Error during search:', error);
    }
  };

  // [原本]
  // const search = async (url) => {
  //   if (url === searchQueryNoValueURL)
  //     return;
    
  //   let result = await axios.get(url, {
  //     headers: { Authorization: auth },
  //   });

  //   console.log("input :" , input); // " "
  //   console.log("currentSearch : ", currentSearch); // " "

  //   setData(result.data.photos);
  // };

  const exploreSearch = async () => {
    if (urlInputParam) {
      console.log("===== 檢驗方法 : 由 Nav Search 後，轉而 Explore Search =====");

      removeQueryParam();

      // searchParams.delete("input");
      // setSearchParams(searchParams); // 刪除 "urlInputParam" 並更新 URL
      // console.log("[後]searchParams :", `${searchParams.toString()}`); // ""
      
      urlInputParam = `${searchParams.toString()}`;
      setNavCurrentSearch(navCurrentSearch = urlInputParam); // 清空 navCurrentSearch

      console.log(navCurrentSearch); // => 預期應為 " "  
      console.log(urlInputParam);    // => 預期應為 " "    

      await search(searchURL);
      setCurrentSearch(currentSearch = input);

      console.log(input);         // 目前檢驗該值:  ，預期應為 " "
      console.log(currentSearch); // 目前檢驗該值:  ，預期應為 dog
      
    }else{
      console.log("===== 檢驗方法 : 進入頁面直接 Explore Search =====");

      await search(searchURL);
      setCurrentSearch(currentSearch = input);

      console.log(input);         // 目前檢驗該值:dog  ，預期應為 dog
      console.log(currentSearch); // 目前檢驗該值:dog  ，預期應為 dog
    }

    setInput(""); // 清空輸入框文字
    setInput(input = ""); 
    console.log(input);         // 目前檢驗該值: " " ，預期應為 " "
    console.log(currentSearch); // 目前檢驗該值: dog ，預期應為 dog
  };

  // Colsure
  const morePicture = async () => {
    let newURL;
    setPage(page + 1); // -> page = page + 1
    
    if (urlInputParam) {
      console.log("===== 檢驗方法 : 由 Nav Search 後，再點擊 More Btn =====");
      // setCurrentSearch(currentSearch = urlInputParam);      // 暫時不需要把 urlInputParam 丟值到 currentSearch
      // setNavCurrentSearch(navCurrentSearch = urlInputParam);

      console.log("[Small Search]第二頁的 urlInputParam :" , urlInputParam);       // cat 
      console.log("[Small Search]第二頁的 navCurrentSearch :" , navCurrentSearch); // cat
      console.log("[Small Search]第二頁的 currentSearch :" , currentSearch);       // " "
      newURL = `https://api.pexels.com/v1/search?query=${navCurrentSearch}&page=${page + 1}&per_page=16`;
    }
    else { 
      // [BUG] 雖然可以呈現正常關鍵物搜尋，但最後一列圖片缺張數
      // [原]
      // setCurrentSearch(currentSearch = input);
      
      console.log("[Big Search]第二頁的 input :" , input); // 目前檢驗該值:  ，預期應為 " "
      console.log("[Big Search]第二頁的 currentSearch :" , currentSearch); // 目前檢驗該值: " " ，預期應為 dog

      if (currentSearch) {
        console.log("===== 檢驗方法 : 進入頁面直接 Explore Search，再點擊 More Btn =====");
        console.log("[Big Search]第二頁的 input :" , input); // " "
        console.log("[Big Search]第二頁的 currentSearch :" , currentSearch); // dog
        newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page + 1}&per_page=15`;
      } 
      else { 
        console.log("===== 檢驗方法 : 沒有輸入任何值搜尋(無任何搜尋行為)，再點擊 More Btn =====");
        newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=16`;
        console.log("newURL :", newURL); // https://api.pexels.com/v1/curated?page=2&per_page=16
        console.log("page", page);       // 2
      }
    }

    let result = await axios.get(newURL, {
      headers: { Authorization: apiKey },
    });

    setData(data.concat(result.data.photos));

    console.log("currentSearch :", currentSearch); // " "
  };

  // 獲取 API Key 從後端
  // useEffect(() => {
  //   const fetchApiKey = async () => {
  //     try {
  //       const key = await apiService.getApiKey();
  //       if (key) {
  //         setApiKey(key);
  //       } else {
  //         console.error("Failed to fetch API Key");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching API Key:", error);
  //     }
  //   };
  
  //   fetchApiKey();
  // }, []); // 僅在首次渲染時執行
  
  // 確保 apiKey 存在後執行相關邏輯
  useEffect(() => {
    if (apiKey) {
      if(urlInputParam){
        console.log("urlInputParam :", urlInputParam);        // 預: cat 實: cat
        search(`https://api.pexels.com/v1/search?query=${urlInputParam}&page=1&per_page=16`);
        setNavCurrentSearch(navCurrentSearch = urlInputParam);
        console.log("navCurrentSearch", navCurrentSearch);    // 預 : cat 實: cat
      } 
      else{
        search(initialURL);
        // setCurrentSearch("");
        // setNavCurrentSearch("");

        console.log("currentSearch", currentSearch);       // 預期 :  實際: 
        console.log("navCurrentSearch", navCurrentSearch); // 預期 :  實際:
      }
    }
  }, [apiKey]); // 僅在 apiKey 更新時執行

  
  return (
    <div className="picBox container-fluid p-0 position-relative vh-100">
      {/* <!-- 標題和搜尋區域 --> */}
      <div className="search-area text-center text-white d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ top: "20%", zIndex: "10" }}>
        <div className="title mb-3">
          <h1>每一瞬間，都是一個故事的開始</h1> 
          <p>這一刻的畫面是無數故事的開端，從眼神交匯到微風吹拂，等待著被你發現的情節。</p>
        </div>
        <div className="row justify-content-center mb-4 w-100">
          <div className="col-12 col-md-8 col-lg-6">
            <Search exploreSearch={() => {exploreSearch();} } setInput={setInput} value={input} />
          </div>
        </div>
      </div>
    
      {/* <!-- 第一張橫式照片 --> */}
      <div className="rowPic row justify-content-center m-0">
        <div className="col-12 p-0">
          <div className="position-relative">
            {
              data && (
                <img src={data[15].src.original} 
                className="img w-100"
                alt={data[15].alt}
                style={{ maxHeight: "100vh", objectFit: "cover" }}/>             
              )
            }
          </div>
        </div>
      </div>
    
      {/* <!-- 標題和描述文字，與下方三張照片間距一致 --> */}
      <div className="row justify-content-center text-center" style={{ marginBottom: "0", paddingTop: "40px", paddingBottom: "20px" }}>
        <div className="col-12">
          <h2>讓照片訴說無聲的故事</h2>
          <p>有些故事不需要言語，透過一張照片，你將能感受到其中的情感、思念，甚至是回憶。</p>
        </div>
      </div>

      <div className="pictures row justify-content-center g-3">
        {
          data && data.map((d) => {
            return <Pictures data={d} key={d.id}/>
          })
        }
      </div>
  
      {/* <!-- 更多圖片的按鈕區塊 --> */}
      <div className="moreBtn container text-center my-5">
        <button onClick={morePicture} className="btn btn-primary btn-lg">More Pictures</button>
      </div>
    </div>
  );
};

export default Explore;