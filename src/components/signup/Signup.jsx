import React from 'react'
import { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch, Provider } from 'react-redux'
import classes from './signup.module.css'
import { register } from '../../redux/authSlice'
import { request } from '../../util/fetchAPI'


const Signup = () => {
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const [error, setError] = useState(false)
  const [emptyFields, setEmptyFields] = useState(false)

  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    // how to check if ONLY ONE of the values of an object is empty
    if (Object.values(state).some((v) => v === '')) {
      setEmptyFields(true)
      setTimeout(() => {
        setEmptyFields(false)
      }, 2500)
    }

    try {
      let filename = null
      if (photo) {
        const formData = new FormData()
        filename = crypto.randomUUID() + photo.name
        formData.append('filename', filename)
        formData.append('image', photo)

        await fetch(`https://backbone-of-homzspot.onrender.com/upload/image`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'POST',
          body: formData
        })
      } else {
        setEmptyFields(true)
        setTimeout(() => {
          setEmptyFields(false)
        }, 2500)
        return
      }

      const headers = {
        "Content-Type": "application/json",
      }

      const data = await request(`/auth/register`, "POST", headers, { ...state, profileImg: filename })


      dispatch(register(data))
      navigate("/")
    } catch (error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2><b>SIGN UP</b></h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="username" placeholder='Username...' onChange={handleState}  />
          <input type="text" name="email" placeholder='Email...' onChange={handleState} />
          <label htmlFor='photo'>Upload photo <AiOutlineFileImage /></label>
          <input style={{ display: 'none' }} id='photo' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          <input type="password" name="password" placeholder='Password...' onChange={handleState} />
          <button type="submit">Register</button>
          <p>Already have an account? <Link to='/signin'>Login</Link></p>
        </form>
        {error && (
          <div className={classes.error}>
            There was an error signing up! Try again.
          </div>
        )}
        {emptyFields && (
          <div className={classes.error}>
            Fill all fields!
          </div>
        )}
      </div>
    </div>
  )
}

export default Signup

// import React from 'react'
// import classes from './signup.module.css'
// import { useState } from 'react'
// import { AiOutlineFileImage } from 'react-icons/ai'
// import { useNavigate, Link } from 'react-router-dom'
// import { request } from '../../util/fetchAPI'

// const Signup = () => {
//   const [state, setState] = useState({})
//   const [photo, setPhoto] = useState("")
//   // const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleState = (e) => {
//     setState(prev => {
//       return { ...prev, [e.target.name]: e.target.value }
//     })

//   }

//   const handleSubmit = async (e) => {

//     try {
//       let filename = null
//       if (photo) {
//         const formData = new FormData()
//         filename = crypto.randomUUID() + photo.name
//         formData.append("filename", filename)
//         formData.append("image", photo)


//         await request('/upload/image', "POST", {}, formData, true)

//       } else {
//         return
//       }
//       const headers = {
//         "Content-Type": "application/json",
//       }
//       const data = await request('/auth/register', "POST",{...state,profileImg:filename})

//       console.log(data)
//       navigate('/')

//     } catch (error) {
//       console.error(error)

//     }

//   }



//   return (
//     <div className={classes.container}>
//       <div className={classes.wrapper}>
//         <h2>Sign Up</h2>

//         <form onSubmit={handleSubmit}>
//           <input type="text" name="username" placeholder='Username...' onChange={handleState} />
//           <input type="text" name="email" placeholder='Email...' onChange={handleState} />
//           <label htmlFor='photo'>Upload photo <AiOutlineFileImage /></label>
//           <input style={{ display: 'none' }} id='photo' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
//           <input type="password" name="password" placeholder='Password...' onChange={handleState} />
//           <button type="submit">Register</button>
//           <p>Already have an account? <Link to='/signin'>Login</Link><br></br></p>
          
//         </form>
//       </div>

//     </div>
//   )
// }

// export default Signup