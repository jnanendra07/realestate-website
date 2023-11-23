import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import classes from './hero.module.css'

const Hero = () => {
  const [type, setType] = useState("apartment")
  const [continent, setContinent] = useState("0")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best property</h5>
        <div className={classes.options} >
          <select onChange={(e) => setType(e.target.value)} style={{ color: 'black' }}>
            <option disabled>Select type</option>
            <option value='apartment'>Apartment</option>
            <option value='individual'>Individual</option>
            <option value='industrial'>Industrial</option>
            <option value='mansion'>mansion</option>
            <option value='rent'>Rent</option>
            <option value='land'>land</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
            <option value="5">above 500,000</option>
          </select>
          <select onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select State</option>
            {/* <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option> */}

            <option value="0">Andhra Pradesh</option>
            <option value="1">Arunachal Pradesh</option>
            <option value="2">Assam</option>
            <option value="3">Bihar</option>
            <option value="4">Chhattisgarh	</option>
            <option value="5">Goa</option>
            <option value="6">Gujarat</option>
            <option value="7">Haryana</option>
            <option value="8">Himachal Pradesh</option>
            <option value="9">Jharkhand</option>
            <option value="10">Karnataka</option>
            <option value="11">Kerala</option>
            <option value="12">Madhya Pradesh</option>
            <option value="13">Maharashtra</option>
            <option value="14">Manipur</option>
            <option value="15">Meghalaya</option>
            <option value="16">Mizoram</option>
            <option value="17">Nagaland</option>
            <option value="18">Odisha</option>
            <option value="19">Punjab</option>
            <option value="20">Rajasthan</option>
            <option value="21">Sikkim</option>
            <option value="22">Tamil Nadu</option>
            <option value="23">Telangana</option>
            <option value="24">Tripura</option>
            <option value="25">Uttar Pradesh</option>
            <option value="26">Uttarakhand</option>
            <option value="27">West Bengal</option>
          </select>


          <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero