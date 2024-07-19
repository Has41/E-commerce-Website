import React,{ useState, useEffect } from 'react'
import NavBar1 from './NavBar1'
import Footer2 from './Footer2'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const [photo, setPhoto] = useState('')
    const [user, setUser] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        bio: ''
    })

    const navigate = useNavigate()

    const apiURL = process.env.REACT_APP_API_URL
    
    const fetchData = async () => {
        try {
            const res = await fetch(`${apiURL}/api/users/me`, {
                method: "GET",
                credentials: "include"
            })
            if(res.ok) {
                const data = await res.json()
                setUser(data)
            } else {
                console.error(`Failed to fetch`)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0])
    }

    const updateUserInfo = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${apiURL}/api/users/me`,{
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if(res.ok){
                const data = await res.json()
                setUser(data)
                navigate(`/`)
                await handlePhotoUpdate()
            } else {
                console.error(`Failed to update!`)
            }
        } catch (err) {
            console.error(err.Message)
        }
    }

    const handlePhotoUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('profilePhoto', photo);
    
            const res = await fetch(`${apiURL}/api/users/me/profilePic`, {
                method: 'PUT',
                body: formData
            });
    
            if (res.ok) {
                console.log('Photo updated successfully');
            } else {
                console.error('Error updating photo!');
            }
        } catch (err) {
            console.error('Error updating photo:', err);
        }
    };
    

    const handlePhoneChange = (e) => {
        let formattedNumber = e.target.value.replace(/\D/g, '')
        formattedNumber = formattedNumber.slice(0, 10)
        formattedNumber = formattedNumber.replace(/^(\d{3})(\d{0,7})/, '$1-$2')
        setUser({ ...user, phone: formattedNumber })
    }

    useEffect(() => {
        fetchData()
    },[])

    if(!user) {
        return <div>Loading....</div>
    }

  return (
    <>
    <NavBar1 />
    <section className='bg-slate-50 py-8 lg:py-28 max-w-full'>
        <div className='text-center bg-white py-8 lg:py-24 w-[90%] ml-4 sm:ml-8 sm:space-y-8 lg:ml-[360px] rounded-sm shadow-sm lg:w-[45%]'>
            <p className='uppercase font-mont lg:font-poppins lg:tracking-wider font-semibold text-black/80 text-2xl lg:text-4xl lg:mb-8 lg:-mt-4'>Edit Profile</p>
            <form onSubmit={updateProfile}>
                <div className='space-y-5 mt-4 lg:ml-0 sm:flex sm:flex-col sm:items-center sm:justify-center lg:flex lg:flex-col lg:items-center lg:justify-center'>
                  <input onChange={updateUserInfo} value={user.name} className='py-2 lg:py-3 rounded-sm border border-slate-300 w-[90%] lg:w-[80%] sm:w-[80%]' type="text" />
                  <input onChange={updateUserInfo} value={user.email} className='py-2 lg:py-3 rounded-sm border border-slate-300 w-[90%] lg:w-[80%] sm:w-[80%]' type="email" />
                  <input onChange={updateUserInfo} value={user.address} className='py-2 lg:py-3 rounded-sm border border-slate-300 w-[90%] lg:w-[80%] sm:w-[80%]' type="text" />
                  <input onChange={(e) => { handlePhoneChange(e); updateUserInfo(e) }} value={user.phone} className='py-2 pl-4 lg:py-3 rounded-sm border border-slate-300 w-[90%] lg:w-[80%] sm:w-[80%]' type="phone" />
                  <input onChange={updateUserInfo} value={user.bio} name='bio' className='py-2 lg:py-3 rounded-sm border border-slate-300 w-[90%] lg:w-[80%] sm:w-[80%]' type="text" />
                  <input className="w-[90%] lg:w-[80%] sm:w-[80%] text-sm border cursor-pointer bg-gray-50 focus:outline-none rounded-sm border-slate-300" onChange={(e) => { handlePhotoChange(e); handlePhotoUpdate() }} type="file" />
                </div>
                <button type='submit' className='border-2 w-[90%] border-black/80 text-black/80 font-mont mt-5 sm:w-[80%] lg:w-[80%] hover:bg-black/80 hover:border hover:border-black/80 hover:text-white transition-all duration-500 py-1 lg:py-2 text-lg lg:text-xl lg:font-semibold rounded-sm uppercase'>Save</button>
            </form>
        </div>
    </section>
    <Footer2 />
    </>
  )
}

export default EditProfile