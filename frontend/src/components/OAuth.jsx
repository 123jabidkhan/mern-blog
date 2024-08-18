import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
                const data = await res.json()
                if (res.ok){
                    dispatch(signInSuccess(data))
                    navigate('/')
                }
        } catch (error) {
            console.log('Error while google login >>',error);
        }
    } 
  return (
    // <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
    //     <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
    //     Continue with Google
    // </Button>
    <div className="px-4 pb-2">
    <button onClick={handleGoogleClick} className="flex items-center justify-center w-full p-3 text-lg font-medium rounded-full bg-white text-gray-700 border border-gray-300 shadow-md hover:bg-gray-100 focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        className="mr-2"
      >
        <path
          fill="#4285F4"
          d="M 23.5 12.7 c 2.1 0 3.9 0.7 5.4 1.9 l 4-4 c -2.7 -2.4 -6.3 -3.9 -10.4 -3.9 c -5.9 0 -10.8 3.4 -13.2 8.4 l 4.9 3.8 c 1.3 -3.6 4.7 -6.2 8.3 -6.2 Z"
        />
        <path
          fill="#34A853"
          d="M 12.1 25.3 c -0.4 -1.1 -0.7 -2.2 -0.7 -3.3 c 0 -1.2 0.3 -2.3 0.7 -3.3 l -4.9 -3.8 c -1.3 2.4 -2.1 5.1 -2.1 8.1 c 0 3 0.8 5.7 2.1 8.1 Z"
        />
        <path
          fill="#FBBC05"
          d="M 23.5 35.3 c -3.7 0 -7 -2.1 -8.7 -5.2 l -4.9 3.8 c 2.4 5 7.3 8.4 13.2 8.4 c 3.8 0 7.2 -1.3 9.9 -3.5 l -4.8 -3.8 c -1.3 0.9 -3 1.5 -4.7 1.5 Z"
        />
        <path
          fill="#EA4335"
          d="M 44 24.5 c 0 -1.5 -0.2 -2.9 -0.5 -4.3 H 23.5 v 8.1 h 11.6 c -0.5 2.2 -1.8 4.1 -3.7 5.4 l 4.8 3.8 c 2.8 -2.6 4.5 -6.5 4.5 -11 Z"
        />
      </svg>
      Sign in with Google
    </button>
  </div>
  )
}