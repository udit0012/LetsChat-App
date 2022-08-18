import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import About from '../components/miscellaneous/About';
import Homemain from '../components/Homemain';
import Navbar from '../components/Navbar';
import Footer from '../components/miscellaneous/Footer';
import { useMediaQuery } from 'react-responsive';

const Homepage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) navigate("/LetsChat");
  // }, [navigate]);
  return <div>
      <div className="mainbody w100 h100">
            <Navbar />
            <Homemain />
            <About />
            <Footer />
        </div>
  </div>;
};

export default Homepage;
