import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/explore'); 
  };

  return (
    <main id="carouselExampleFade" className="carousel slide carousel-fade position-relative" data-bs-ride="carousel" data-bs-pause="false">
      <div className="carousel-inner" style={{ height: "87.3vh" }} data-bs-pause="false">
        {/* <!-- 文字標題 --> */}
        <div className="carousel-caption d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100 h-100 z-3 flex-column">
          <h1 className="text-white text-nowrap fw-semibold text-shadow">Seeking the beautiful things in life.</h1>
          <button onClick={handleNavigate} type="button" className="btn btn-custom btn-lg mt-3">EXPLORE NOW</button>
        </div>

        {/* <!-- 圖片區 --> */}
        <div className="carousel-item active" data-bs-interval="5000">
          <img src="https://picsum.photos/700/500?random=1" className="d-block w-100 h-100 object-fit-cover zoom-effect" alt="Picture1"/>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src="https://picsum.photos/700/500?random=2" className="d-block w-100 h-100 object-fit-cover zoom-effect" alt="Picture2"/>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src="https://picsum.photos/700/500?random=3" className="d-block w-100 h-100 object-fit-cover zoom-effect" alt="Picture3"/>
        </div>
      </div>
    </main>
  );
};

export default Home;