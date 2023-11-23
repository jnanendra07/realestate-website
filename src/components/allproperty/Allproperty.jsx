import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
// import YachtCard from '../yachtCard/YachtCard'
import classes from './allproperties.module.css'
import { logout } from '../../redux/authSlice'
const Allproperty = () => {
    const { user, token } = useSelector((state) => state.auth)
    const [listedProperties, setListedProperties] = useState([])
    const [listedYachts, setListedYachts] = useState([])
    const [bookmarkedProperties, setBookmarkedProperties] = useState([])
    const [bookmarkedYachts, setBookmarkedYachts] = useState([])
    const [activeBtn, setActiveBtn] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchListedProperties = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/property/getall`, 'GET', options)
                setListedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedProperties()
    }, [])

   

   

   

       
  return (
    <div>
         <div className={classes.wrapper}>
                <div className={classes.catalog}>
                    {activeBtn === 0 && (
                        <>
                            {listedProperties?.length > 0 && <h2 className={classes.title}> All Properties</h2>}
                            <div className={classes.properties}>
                                {listedProperties?.length > 0 ? listedProperties?.map((listedProperty) => (
                                    <div key={listedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${listedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`https://backbone-of-homzspot.onrender.com/images/${listedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>Rs. {listedProperty.price}</span>
                                                {/* <img src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} className={classes.owner} /> */}
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{listedProperty?.beds} <FaBed className={classes.icon} /></span>
                                                <span>{listedProperty?.bath} <i class="fa fa-bath" aria-hidden="true"></i> </span>
                                                <span>{listedProperty?.parking} <i class="fa fa-car" aria-hidden="true"></i> </span>
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>Rooms: {listedProperty?.rooms}</span>
                                                <span>Furnished: {listedProperty?.furnished} </span>
                                                <span>Sq.mts: {listedProperty?.sqmeters}  </span>
                                            </div>

                                            <div className={classes.desc}>
                                                {listedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no listed properties</h2>}
                            </div>
                        </>
                    )}
                    {activeBtn === 1 && (
                        <>
                            {listedYachts?.length > 0 && <h2 className={classes.title}>Listed Yachts</h2>}
                            {listedYachts?.length > 0 ? (
                                <div className={classes.yachts}>
                                    {listedYachts.map((yacht) => (
                                        <YachtCard yacht={yacht} key={yacht._id} />
                                    ))}
                                </div>
                            ) : <h2 className={classes.noListed}>You have no listed yachts</h2>}
                        </>
                    )}
                    {activeBtn === 2 && (
                        <>
                            {bookmarkedProperties?.length > 0 && <h2 className={classes.title}>Bookmarked Properties</h2>}
                            <div className={classes.properties}>
                                {bookmarkedProperties?.length > 0 ? bookmarkedProperties?.map((bookmarkedProperty) => (
                                    <div key={bookmarkedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${bookmarkedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`https://backbone-of-homzspot.onrender.com/images/${bookmarkedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>$ {bookmarkedProperty.price}</span>
                                                <img src={person} className={classes.owner} />
                                            </div>
                                            <div className={classes.moreDetails}>
                                                <span>{bookmarkedProperty?.beds} <FaBed className={classes.icon} /></span>
                                                <span>{bookmarkedProperty?.sqmeters} sq. meters<FaSquareFull className={classes.icon} /></span>
                                            </div>
                                            <div className={classes.desc}>
                                                {bookmarkedProperty?.decs}
                                            </div>
                                        </div>
                                    </div>
                                )) : <h2 className={classes.noListed}>You have no bookmarked properties</h2>}
                            </div>
                        </>
                    )}
                    {activeBtn === 3 && (
                        <>
                            {bookmarkedYachts?.length > 0 && <h2 className={classes.title}>Bookmarked Yachts</h2>}
                            {bookmarkedYachts?.length > 0 ? (
                                <div className={classes.yachts}>
                                    {bookmarkedYachts.map((yacht) => (
                                        <YachtCard yacht={yacht} key={yacht._id} />
                                    ))}
                                </div>
                            ) : <h2 className={classes.noListed}>You have no bookmarked yachts</h2>}
                        </>
                    )}
                </div>
        </div>
    </div>
  )
}

export default Allproperty