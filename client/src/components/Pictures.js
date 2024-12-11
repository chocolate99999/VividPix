import React from 'react';
import { Link } from 'react-router-dom';

const Pictures = ({ data }) => {
  
  return (
    <div className="picture col-6 col-md-3">
      <Link className="imageContainer text-center" to={`/product/${data.id}`} style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}>
        <img src={data.src.original} alt={data.alt} className="img-fluid w-100" style={{ border: "10px solid white", objectFit: "cover", height: "266px" }}/>
      </Link>
    </div>
  );
};

export default Pictures;