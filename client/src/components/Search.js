import React from 'react';

const Search = ({ exploreSearch, setInput, value }) => {
  
  // [原有]
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="input-group">                
      <input type="text" onChange={inputHandler} value={value} className="form-control form-control-lg bg-white" placeholder="Enter your search..." style={{ height: "50px" }}/>
      <button onClick={exploreSearch} className="btn btn-primary btn-lg" type="button">Search</button>             
    </div>
  );
};

// [功能: 清除輸入框文字] 父: value={input}、子: value={value}

export default Search;