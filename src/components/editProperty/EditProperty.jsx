import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { request } from '../../util/fetchAPI'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import classes from './editProperty.module.css'

const EditProperty = () => {
    const { id } = useParams()
    const { token } = useSelector((state) => state.auth)
    const [propertyDetails, setPropertyDetails] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [initialPhoto, setInitialPhoto] = useState(null)
    const [error, setError] = useState(false)
    const [emptyFields, setEmptyFields] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const data = await request(`/property/find/${id}`, 'GET')
                setPropertyDetails(data)
                setPhoto(data.img)
                setInitialPhoto(data.img)
            } catch (error) {
                console.error(error)
            }
        }
        fetchPropertyDetails()
    }, [id])

    const handleState = (e) => {
        setPropertyDetails(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        let filename = initialPhoto
        if (photo && photo !== initialPhoto) {
            const formData = new FormData()
            filename = crypto.randomUUID() + photo.name
            formData.append('filename', filename)
            formData.append('image', photo)

            const options = {
                "Authorization": `Bearer ${token}`,
            }

            await request("/upload/image", 'POST', options, formData, true)
        }


        try {
            if (Object.values(propertyDetails).some((v) => v === '')) {
                setEmptyFields(true)
                setTimeout(() => {
                    setEmptyFields(false)
                }, 2500)
                return
            }


            const options = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json'
            }

            await request(`/property/${id}`, 'PUT', options, { ...propertyDetails, img: filename })
            navigate(`/propertyDetail/${id}`)

        } catch (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 2500);
        }
    }



    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Edit Property</h2>
                <form onSubmit={handleUpdate}>
                    <input value={propertyDetails?.title} type="text" placeholder='Title' name="title" onChange={handleState} />
                    <select required name='type' onChange={handleState}>
                        <option disabled>Select Type</option>
                        <option value='apartment'>Apartment</option>
                        <option value='individual'>Individual</option>
                        <option value='industrial'>Industrial</option>
                        <option value='mansion'>Mansion</option>
                        <option value='rent'>Rent</option>
                        <option value='land'>land</option>
                    </select>
                    <input value={propertyDetails?.desc} type="text" placeholder='Desc' name="desc" onChange={handleState} />
                    <input value={propertyDetails?.add} type="text" placeholder='add' name="add" onChange={handleState} />
                    <select required name='continent' onChange={handleState}>
                        <option disabled>Select Continent</option>
                        <option value='Andhra Pradesh'>Andhra Pradesh</option>
                        <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                        <option value='Assam'>Assam</option>
                        <option value='Bihar'>Bihar</option>
                        <option value='Chhattisgarh'>Chhattisgarh</option>
                        <option value='Goa'>Goa</option>
                        <option value='Gujarat'>Gujarat</option>
                        <option value='Haryana'>Haryana</option>
                        <option value='Himachal Pradesh'>Himachal Pradesh</option>
                        <option value='Jharkhand'>Jharkhand</option>
                        <option value='Karnataka'>Karnataka</option>
                        <option value='Kerala'>Kerala</option>
                        <option value='Madhya Pradesh'>Madhya Pradesh</option>
                        <option value='Maharashtra'>Maharashtra</option>
                        <option value='Manipur'>Manipur</option>
                        <option value='Meghalaya'>Meghalaya</option>
                        <option value='Mizoram'>Mizoram</option>
                        <option value='Nagaland'>Nagaland</option>
                        <option value='Odisha'>Odisha</option>
                        <option value='Punjab'>Punjab</option>
                        <option value='Rajasthan'>Rajasthan</option>
                        <option value='Sikkim'>Sikkim</option>
                        <option value='Tamil Nadu'>Tamil Nadu</option>
                        <option value='Telangana'>Telangana</option>
                        <option value='Tripura'>Tripura</option>
                        <option value='Uttar Pradesh'>Uttar Pradesh</option>
                        <option value='Uttarakhand'>Uttarakhand</option>
                        <option value='West Bengal'>West Bengal</option>



                        <option value='Asia'>Asia</option>
                        <option value='South America'>South America</option>
                        <option value='North America'>North America</option>
                        <option value='Australia'>Australia</option>
                        <option value='Africa'>Africa</option>
                    </select>
                    <input value={propertyDetails?.price} type="number" placeholder='Price' name="price" onChange={handleState} />
                    <input value={propertyDetails?.sqmeters} type="number" placeholder='Sq. meters' name="sqmeters" onChange={handleState} />
                    <input value={propertyDetails?.beds} type="number" placeholder='Beds' name="beds" onChange={handleState} />
                    <input value={propertyDetails?.rooms} type="number" placeholder='rooms' name="rooms" onChange={handleState} />
                    <input value={propertyDetails?.bath} type="number" placeholder='bath' name="bath" onChange={handleState} />
                    <input value={propertyDetails?.parking} type="string" placeholder='parking' name="parking" onChange={handleState} />
                    <input value={propertyDetails?.furnished} type="string" placeholder='furnished' name="furnished" onChange={handleState} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                        <label htmlFor='photo'>Property picture <AiOutlineFileImage /></label>
                        <input
                            type="file"
                            id='photo'
                            style={{ display: 'none' }}
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {photo && <p>{photo.name}</p>}
                    </div>
                    <button type='submit' style={{ marginBottom: "20px" }}>Edit</button>
                </form>
                {error && (
                    <div className={classes.error}>
                        There was an error editing the listing! Try again.
                    </div>
                )}
                {emptyFields && (
                    <div className={classes.error}>
                        All fields must be filled!
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditProperty