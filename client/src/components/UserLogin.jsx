import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'

const UserLogin = () => {
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(false)
    
    // Step to handle uploading image in Register phase
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)

    const { setShowUserLogin, backendUrl, setUserToken, setUserData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state === "Sign Up" && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true)
        }

        try {
            if (state === "Login") {
                const { data } = await axios.post(backendUrl + '/api/users/login', { email, password })

                if (data.success) {
                    setUserData(data.user)
                    setUserToken(data.token)
                    localStorage.setItem('userToken', data.token)
                    setShowUserLogin(false)
                    toast.success(`Welcome back, ${data.user.name}!`)
                } else {
                    toast.error(data.message)
                }
            } else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                if (image) {
                    formData.append('image', image)
                }

                const { data } = await axios.post(backendUrl + '/api/users/register', formData)

                if (data.success) {
                    setUserData(data.user)
                    setUserToken(data.token)
                    localStorage.setItem('userToken', data.token)
                    setShowUserLogin(false)
                    toast.success(`Account created! Welcome, ${data.user.name}`)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/users/google-auth', {
                tokenId: credentialResponse.credential
            })

            if (data.success) {
                setUserData(data.user)
                setUserToken(data.token)
                localStorage.setItem('userToken', data.token)
                setShowUserLogin(false)
                toast.success(`Logged in with Google as ${data.user.name}`)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleGoogleError = () => {
        toast.error("Google Sign In Failed. Please try again.")
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-md bg-black/40 flex justify-center items-center p-4 transition-all duration-300 animate-fadeIn'>
            <div className='relative bg-white max-w-md w-full p-8 sm:p-10 rounded-2xl shadow-2xl text-slate-500 border border-slate-100 transform scale-100 transition-all duration-300 animate-slideUp'>
                
                {/* Header */}
                <h1 className='text-center text-3xl text-neutral-800 font-semibold tracking-tight'>
                    Candidate {state}
                </h1>
                <p className='text-center text-sm text-gray-500 mt-2 mb-6'>
                    {state === 'Login' ? 'Access your dashboard & apply to premium jobs.' : 'Create an account to jumpstart your career.'}
                </p>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className='space-y-4'>
                    {state === "Sign Up" && isTextDataSubmitted ? (
                        <div className='flex flex-col items-center justify-center my-6 py-4 border border-dashed border-gray-200 rounded-xl bg-gray-50 animate-fadeIn'>
                            <label htmlFor="user-image" className='cursor-pointer group flex flex-col items-center gap-2'>
                                <div className='relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 group-hover:border-blue-600 transition-all duration-300 shadow-md'>
                                    <img 
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                                        src={image ? URL.createObjectURL(image) : assets.upload_area} 
                                        alt="Avatar Preview" 
                                    />
                                </div>
                                <input 
                                    onChange={e => setImage(e.target.files[0])} 
                                    type="file" 
                                    id='user-image' 
                                    accept='image/*' 
                                    hidden 
                                />
                                <span className='text-xs text-blue-600 font-medium group-hover:text-blue-700 transition-colors mt-1'>
                                    Upload Profile Picture
                                </span>
                            </label>
                            <p className='text-[11px] text-gray-400 mt-2 text-center px-4'>
                                Recommended: Square JPG/PNG image
                            </p>
                        </div>
                    ) : (
                        <>
                            {state === 'Sign Up' && (
                                <div className='border border-gray-200 px-4 py-3 flex items-center gap-3 rounded-full hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200'>
                                    <img className='opacity-70 w-5' src={assets.person_icon} alt="" />
                                    <input 
                                        className='outline-none w-full text-sm text-neutral-800 placeholder-gray-400' 
                                        onChange={e => setName(e.target.value)} 
                                        value={name} 
                                        type="text" 
                                        placeholder='Full Name' 
                                        required 
                                    />
                                </div>
                            )}

                            <div className='border border-gray-200 px-4 py-3 flex items-center gap-3 rounded-full hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200'>
                                <img className='opacity-70 w-4' src={assets.email_icon} alt="" />
                                <input 
                                    className='outline-none w-full text-sm text-neutral-800 placeholder-gray-400' 
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email} 
                                    type="email" 
                                    placeholder='Email Address' 
                                    required 
                                />
                            </div>

                            <div className='border border-gray-200 px-4 py-3 flex items-center gap-3 rounded-full hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200'>
                                <img className='opacity-70 w-4' src={assets.lock_icon} alt="" />
                                <input 
                                    className='outline-none w-full text-sm text-neutral-800 placeholder-gray-400' 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password} 
                                    type="password" 
                                    placeholder='Password' 
                                    required 
                                />
                            </div>
                        </>
                    )}

                    <button 
                        type='submit' 
                        className='bg-blue-600 w-full text-white font-medium py-3 rounded-full mt-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-200 uppercase tracking-wider text-xs'
                    >
                        {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                    </button>
                </form>

                {/* Social Login Divider */}
                {(!isTextDataSubmitted || state === 'Login') && (
                    <>
                        <div className='flex items-center my-6'>
                            <div className='flex-1 border-t border-gray-200'></div>
                            <span className='px-3 text-xs text-gray-400 uppercase tracking-widest'>or continue with</span>
                            <div className='flex-1 border-t border-gray-200'></div>
                        </div>

                        {/* Google Auth Container */}
                        <div className='flex justify-center w-full transform hover:scale-[1.01] transition-transform duration-200'>
                            <GoogleLogin 
                                onSuccess={handleGoogleSuccess} 
                                onError={handleGoogleError} 
                                shape="circle"
                                size="large"
                                width="100%"
                            />
                        </div>
                    </>
                )}

                {/* Footer Switch State */}
                <div className='mt-8 text-center text-sm'>
                    {state === 'Login' ? (
                        <p>Don't have an account? <span className='text-blue-600 font-semibold cursor-pointer hover:underline transition' onClick={() => { setState("Sign Up"); setIsTextDataSubmitted(false); }}>Sign Up</span></p>
                    ) : (
                        <p>Already have an account? <span className='text-blue-600 font-semibold cursor-pointer hover:underline transition' onClick={() => { setState("Login"); setIsTextDataSubmitted(false); }}>Login</span></p>
                    )}
                </div>

                {/* Close Button */}
                <button 
                    onClick={() => setShowUserLogin(false)} 
                    className='absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-200 border border-gray-100 shadow-sm'
                >
                    <img className='w-3 opacity-70' src={assets.cross_icon} alt="Close" />
                </button>
            </div>
        </div>
    )
}

export default UserLogin
