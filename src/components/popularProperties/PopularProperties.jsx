import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProperties.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../util/fetchAPI'

const PopularProperties = () => {
  const [apartmentProperties, setapartmentProperties] = useState(0)
  const [mansionProperties, setmansionProperties] = useState(0)
  const [individualProperties, setindividualProperties] = useState(0)
  const [IndustrialProperties, setIndustrialProperties] = useState(0)
  const [landProperties, setlandProperties] = useState(0)
  const [mixedProperties, setmixedProperties] = useState(0)

  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')

         setapartmentProperties(data.apartment)
         setmansionProperties(data.mansion)
         setindividualProperties(data.individual)
         setIndustrialProperties(data.industrial)
         setlandProperties(data.land) 
         setmixedProperties(data.rent)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link to={`/properties?type=apartment&continent=0&priceRange=0`} className={classes.property}>
            <img src="https://images.mansionglobal.com/im-500840?width=1280&size=1.33333333" />
            <div className={classes.quantity}>{apartmentProperties} properties</div>
            <h5>Apartments</h5>
          </Link>
          <Link to={`/properties?type=mansion&continent=0&priceRange=0`} className={classes.property}>
            <img src="https://i.pinimg.com/736x/14/df/22/14df2212b0cd8feb12ceafb2308bf84f.jpg" />
            <div className={classes.quantity}>{mansionProperties} properties</div>
            <h5>Mansions</h5>
          </Link>
          <Link to={`/properties?type=individual&continent=0&priceRange=0`} className={classes.property}>
            <img src="https://i2.au.reastatic.net/800x600/40e1aef80afa662921d76674109b4062edbda9ec950212e94cbfe4e0fbea494d/main.jpg" />
            <div className={classes.quantity}>{individualProperties} properties</div>
            <h5>Individuals</h5>
          </Link>
          <Link to={`/properties?type=industrial&continent=0&priceRange=0`} className={classes.property}>
            <img src="https://assets.savills.com/properties/GB0400S88670/783b92299f8dbb40da26eb687316230a-plot-04-enterprise-park-cgi-13-07-23_l_lis.jpg" />
            <div className={classes.quantity}>{IndustrialProperties} properties</div>
            <h5>Industries</h5>
          </Link>
          <Link to={`/properties?type=land&continent=0&priceRange=0`} className={classes.property}>
            <img src="https://t3.ftcdn.net/jpg/05/02/18/64/360_F_502186443_Kubg3Wl76uE8BYl1tcAuYYXgGKAaO6r4.jpg" />
            <div className={classes.quantity}>{landProperties} properties</div>
            <h5>Plots</h5>
          </Link>
          <Link to={`/properties?type=rent&continent=0&priceRange=0`} className={classes.property}>
            <img src="https://www.northbeachprop.com/wp-content/uploads/2012/09/DSC_1575.jpg" />
            <div className={classes.quantity}>{mixedProperties} properties</div>
            <h5>Rent</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties