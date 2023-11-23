import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FaBed, FaSquareFull } from 'react-icons/fa';
import { request } from '../../util/fetchAPI';
import img from '../../assets/estate3.jpg';
import logo from './logo.png'
import classes from './featuredProperties.module.css';
import './offer.js'



const FeaturedProperties = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const endDate = new Date('2023-12-31T00:00:00'); // Replace with your end date

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTime({
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
      } else {
        const hours = padZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = padZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = padZero(Math.floor((distance % (1000 * 60)) / 1000));

        setTime({
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const padZero = (num) => (num < 10 ? '0' : '') + num;




  const divStyle = {
    backgroundImage: 'linear-gradient(to right,rgba(1,127,208,255), rgb(255, 255, 255),rgb(255, 255, 255),  rgba(1,127,208,255)',
    width: '40%',
    margin: '20px auto',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginTop:"100px"
  };
  const styles = {
    ctaButton: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#ff5722',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '5px',
      marginTop: '10px',
      transition: 'background-color 0.3s ease',
    },
    countdownBox: {
      borderRadius: '5px',
      padding: '10px',
      marginTop: '10px',
      fontSize: '18px',
      display: 'inline-block',
    },
    countdownSection: {
      display: 'inline-block',
      margin: '0 10px',
      padding: '5px 10px',
      color: '#fff',
      borderRadius: '5px',
      backgroundColor: '#050505',
    },
    
  };
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request('/property/find/featured', 'GET');
        setFeaturedProperties(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <div >

      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.titles}>
            <h5>Properties you may like</h5>
            <h2>Our Featured Properties</h2>
          </div>
          <div className={classes.featuredProperties}>
            {featuredProperties?.map((property) => (
              <div key={property._id} className={classes.featuredProperty}>
                <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}>
                  <img
                    src={property.img ? `https://backbone-of-homzspot.onrender.com/images/${property.img}` : img}
                    alt=""
                  />
                </Link>

              </div>
            ))}
          </div>
        </div>
      </div>



      <div style={divStyle} >

        <h1 style={{ color: " #333" }}>Special Limited Offer!</h1>
        <p>Hurry up! This offer expires in: </p>
        <div class="offer" style={{
          fontSize: "24px",
          color: " #ff5722",
          marginTop: "20px"
        }}>
          <p style={{ color: " #0e0d0d" }}>Get <strong>50% OFF</strong> </p>
        </div>
        <a href="/Allproperty" class="cta-button" style={styles.ctaButton}>Buy Now</a>
        <div style={styles.countdownBox}>
          <span style={styles.countdownSection} id="hours">{time.hours}</span>
          <span>:</span>
          <span style={styles.countdownSection} id="minutes">{time.minutes}</span>
          <span>:</span>
          <span style={styles.countdownSection} id="seconds">{time.seconds}</span>
          <div>
    </div>
        </div>
      </div>

      <div className={classes.container}>
        <div className={classes.wrapper}></div>
        <center>
          <h1>Gallary </h1>

          <br></br>
          <br></br>



          <div className='row g-1 col-md-6 col-lg-4' style={{ width: "1000px" }}>
            <div className='col-4 col-md-6 col-lg-4 ' >
              <div class="card text-bg-dark " style={{ width: "330px" }}>
                <img src="https://img.freepik.com/free-photo/vertical-shot-white-building-clear-sky_181624-4575.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1699747200&semt=ais" class="card-img img-fluid" alt="..." style={{ height: "300px" }} />

              </div>

              <div class="card text-bg-dark  mt-1" style={{ width: "330px" }}>
                <img src="https://pvsbuilders.com/wp-content/uploads/2021/12/What-does-an-Independent-House-mean-1.jpg" class="card-img" alt="..." style={{ height: "300px" }} />

              </div>
              <div class="card text-bg-dark  mt-1" style={{ width: "330px" }}>
                <img src="https://ca-times.brightspotcdn.com/dims4/default/2fb14c0/2147483647/strip/true/crop/2048x1151+0+0/resize/1200x674!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F15%2Ff7%2Fb8d9cac0461ea0bcb799291b6442%2Fimage-14.jpg" class="card-img" alt="..." style={{ height: "195px" }} />

              </div>

            </div>
            <div className='col-4 col-md-6 col-lg-4'>
              <div class="card text-bg-dark " style={{ width: "330px" }} >
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/bb097e57419029.59d50ac72fa55.png" class="card-img" alt="..." style={{ height: "250px" }} />

              </div>
              <div class="card text-bg-dark  mt-1" style={{ width: "330px" }} >
                <img src={logo} class="card-img" alt="..." style={{ height: "325px" }} />

              </div>
              <div class="card text-bg-dark  mt-1" style={{ width: "330px" }} >
                <img src="https://archello.com/thumbs/images/2018/01/31/ModernApartmentExteriorDesign8.1517370640.4789.jpg?fit=crop&w=414&h=518" class="card-img" alt="..." style={{ height: "225px" }} />

              </div>

            </div>
            <div className='col-4 col-md-6 col-lg-4'>
              <div class="card text-bg-dark  " style={{ width: "330px" }} >
                <img src="https://images.moneycontrol.com/static-mcnews/2022/08/Plotted-homes-770x431.jpg?impolicy=website&width=770&height=431" class="card-img" alt="..." style={{ height: "175px" }} />

              </div>
              <div class="card text-bg-dark  mt-1" style={{ width: "330px" }} >
                <img src="https://centerpointseattledc.com/images/rendering/centerpoint-rendering1.jpg" class="card-img" alt="..." style={{ height: "175px" }} />

              </div>
              <div class="card text-bg-dark  mt-1" style={{ width: "330px" }} >
                <img src="https://www.realestate.com.au/news-image/w_1024,h_768/v1686703502/news-lifestyle-content-assets/wp-content/production/capi_3d0ae6fd24aaa82334ec97a250693b66_44445c7bdb9a73dda0e768548520397a.jpeg?_i=AA" class="card-img" alt="..." style={{ height: "175px" }} />

              </div>
              <div class="card text-bg-dark  mt-1" style={{ width: "330px" }} >
                <img src="https://media.bizj.us/view/img/3747711/logistics-warehouse*1200xx3867-2179-0-0.jpg" class="card-img" alt="..." style={{ height: "265px" }} />

              </div>
            </div>
          </div>
        </center>
      </div>

    </div>
  );
}

export default FeaturedProperties;

