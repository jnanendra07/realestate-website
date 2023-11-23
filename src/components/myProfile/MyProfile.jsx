import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
// import YachtCard from '../yachtCard/YachtCard'
import classes from './myProfile.module.css'
import { logout } from '../../redux/authSlice'

const MyProfile = () => {
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
                const data = await request(`/property/find/my-properties`, 'GET', options)
                setListedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedProperties()
    }, [])

    useEffect(() => {
        const fetchListedYachts = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/yacht/find/my-yachts`, 'GET', options)
                setListedYachts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListedYachts()
    }, [])

    useEffect(() => {
        const fetchBookmarkedProperties = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/property/find/bookmarked-properties`, 'GET', options)
                setBookmarkedProperties(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedProperties()
    }, [])

    useEffect(() => {
        const fetchBookmarkedYachts = async () => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                }
                const data = await request(`/yacht/find/bookmarked-yachts`, 'GET', options)
                setBookmarkedYachts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookmarkedYachts()
    }, [])

    const handleDeleteProfile = async () => {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Replace '/api/delete-account' with the actual endpoint for deleting the user's account
            console.log(user?._id)
            const response = await request(`/user/${user?._id}`, 'DELETE', { 'Authorization': `Bearer ${token}` })
            console.log(response)

            if (response.msg==="Successfully deleted User") {
                // User's account has been successfully deleted, perform any necessary cleanup
                dispatch(logout());
                navigate('/signin');
            } else {
                // Handle the case where the server returned an error response
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 2500);
            }
        } catch (error) {
            // Handle any network errors
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2500);
        }
    };



    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.profile}>


                    <img className={classes.userProfileImg} src={user?.profileImg ? `https://backbone-of-homzspot.onrender.com/images/${user?.profileImg}` : person} />
                    <div className={classes.userData}>
                        <h3><i class="bi bi-person"></i> &nbsp;&nbsp;{user?.username}</h3>
                        <h4><i class="bi bi-envelope"></i> &nbsp;&nbsp;{user?.email}</h4>
                        <br />

                    </div>
                    <div className={classes.updateDeleteControls}>
                        <Link className={classes.updateBtn} to={`/update-profile`}><i class="bi bi-person-gear"></i> Update Profile</Link>
                        {deleteModal && (
                            <div className={classes.deleteModal}>
                                <button onClick={handleDeleteProfile}>Yes</button>
                                <button onClick={() => setDeleteModal(prev => !prev)}>No</button>
                            </div>
                        )}
                        <button onClick={() => setDeleteModal(prev => !prev)} className={classes.deleteBtn}> <i class="bi bi-trash"></i> &nbsp; Delete Profile</button>

                    </div>
                </div>
                <div className={classes.buttons}>
                    <button className={`${classes.button} ${activeBtn === 0 && classes.active}`} onClick={() => setActiveBtn(prev => 0)}>
                        <i class="bi bi-list"></i> Listed properties
                    </button>
                    {/* <button className={`${classes.button} ${activeBtn === 1 && classes.active}`} onClick={() => setActiveBtn(prev => 1)}>
                        Listed yachts
                    </button> */}
                    <button className={`${classes.button} ${activeBtn === 2 && classes.active}`} onClick={() => setActiveBtn(prev => 2)}>
                        <i class="bi bi-bookmark-fill"></i> Bookmarked properties
                    </button>
                    {/* <button className={`${classes.button} ${activeBtn === 3 && classes.active}`} onClick={() => setActiveBtn(prev => 3)}>
                        Bookmarked yachts
                    </button> */}
                </div>
                <div className={classes.catalog}>
                    {activeBtn === 0 && (
                        <>
                            {listedProperties?.length > 0 && <h2 className={classes.title}> Listed Properties</h2>}
                            <div className={classes.properties}>
                                {listedProperties?.length > 0 ? listedProperties?.map((listedProperty) => (
                                    <div key={listedProperty._id} className={classes.property}>
                                        <Link to={`/propertyDetail/${listedProperty._id}`} className={classes.imgContainer}>
                                            <img src={`https://backbone-of-homzspot.onrender.com/images/${listedProperty?.img}`} alt="" />
                                        </Link>
                                        <div className={classes.details}>
                                            <div className={classes.priceAndOwner}>
                                                <span className={classes.price}>Rs. {listedProperty.price}</span>
                                                <img src={user?.profileImg ? `https://backbone-of-homzspot.onrender.com/images/${user?.profileImg}` : person} className={classes.owner} />
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
                {error && (
                    <div className={classes.error}>
                        There was an error!
                    </div>
                )}
            </div>


        </div>

    )
}

// 0 - Listed Properties
// 1 - Listed Yachts
// 2 - Bookmarked Properties
// 3 - Bookmarked Yachts

export default MyProfile