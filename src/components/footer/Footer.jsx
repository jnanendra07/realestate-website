import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          
          <h2>Services </h2>
          <p>
          Our real estate listing website streamlines the property search and transaction process. Buyers enjoy a user-friendly platform with detailed listings, virtual tours, and advanced search options. Sellers benefit from efficient listing management. Our platform promotes transparent communication, offering tools like mortgage calculators and market insights. With a commitment to user satisfaction, we aim to be your trusted resource for all real estate needs.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +91 9083638090</span>
          <span>YouTube: homzspot</span>
          <span>GitHub: homzspot</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Location: India</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer