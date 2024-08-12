// import { useState } from "react";
// import { Button, Spinner } from "flowbite-react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch,useSelector } from "react-redux";
// import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";

// const SignIn = () => {
//   const [formData, setFormData] = useState({});
//   // const [loading, setLoading] = useState(false);
//   // const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const  {loading, error:errorMessage} = useSelector((state)=>state.user);

//   // input on change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // form submit SignIn
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       return dispatch(signInFailure("All fields are required."));
//     }
//     try {
//       // without Redux
//       // setLoading(true);
//       // setErrorMessage(null);

//        // wih Redux, loading start and error value set null:
//        dispatch(signInStart());

//       const res = await axios.post("/api/auth/signin", formData);
//       if (res.data.success === false) {
//         return dispatch(signInFailure(res.data.message));
//       }

//       // if response ok
//       if (res.statusText) {
//         dispatch(signInSuccess(res.data));
//         navigate("/");
//       }
//       console.log(res.data);
//     } catch (error) {
//       dispatch(signInFailure(error.response.data.message));
//     }
//   };

//   return (
//     <div className="h-[100vh] items-center flex justify-center lg:px-0">
//       <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
//         <div className="flex-1 bg-gradient-to-r from-pink-500  text-center hidden md:flex">
//           <div
//             className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
//             style={{
//               backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
//             }}
//           ></div>
//         </div>
//         <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white dark:bg-gray-800 ">
//           <div className=" flex flex-col items-center">
//             <div className="text-center">
//               <h1 className="text-2xl xl:text-4xl font-extrabold bg-gradient-to-r from-pink-400  to-orange-500 bg-clip-text text-transparent">
//                 Sign In
//               </h1>
//               <p className="text-[14px] text-gray-500">
//                 This is a demo project. You can sign in with your email and
//                 password or with Google.
//               </p>
//             </div>

//             <div className="w-full flex-1 mt-8">
//               <form onSubmit={handleSubmit}>
//                 <div className="mx-auto max-w-xs flex flex-col gap-4">
//                   <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="email"
//                     placeholder="name@company.com"
//                     name="email"
//                     onChange={handleChange}
//                     value={formData.email}
//                   />
//                   <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="password"
//                     placeholder="***********"
//                     name="password"
//                     onChange={handleChange}
//                     value={formData.password}
//                   />
//                   <Button
//                     type="submit"
//                     gradientDuoTone="pinkToOrange"
//                     className="text-white focus:shadow-outline focus:outline-none"
//                   >
//                     <span className="ml-3 text-light-100">
//                       {loading ? (
//                         <>
//                           <Spinner size="sm" />
//                           <span className="pl-3">Loading...</span>
//                         </>
//                       ) : (
//                         "Sign In"
//                       )}
//                     </span>
//                   </Button>
//                   <div>
//                     {errorMessage && (
//                       <span className="text-red-500 text-sm">
//                         {errorMessage}
//                       </span>
//                     )}
//                   </div>
//                   {/* signin with google button */}
//                  <OAuth/>
                 
//                   <p className="mt-6 text-sm text-gray-600 text-center">
//                     Already have an account?{" "}
//                     <Link to="/sign-up" className="text-blue-500">
//                       Sign Up
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SignIn;

// ========================== NEW SIGN IN DESIGN ============================

// new signin design..
import loginBg from "../assets/images/loginBg.jpg";
import { useState } from "react";
import {  Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  {loading, error:errorMessage} = useSelector((state)=>state.user);

  // input on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // form submit SignIn
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required."));
    }
    try {
      // without Redux
      // setLoading(true);
      // setErrorMessage(null);

       // wih Redux, loading start and error value set null:
       dispatch(signInStart());

      const res = await axios.post("/api/auth/signin", formData);
      if (res.data.success === false) {
        return dispatch(signInFailure(res.data.message));
      }

      // if response ok
      if (res.statusText) {
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
      console.log(res.data);
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };
  const backgroundImage = {
    backgroundImage: `url(${loginBg})`,
  };
  return (
    <>
 <section className="min-h-screen flex items-stretch text-white p-5 ">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={backgroundImage}
        >
          <div className="absolute bg-[#008a008f] opacity-90 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-extrabold text-left tracking-wide">
              Welcome To BlogHub
            </h1>
            <p className="text-xl  font-bold my-4">
              Access your personalized content, save your favorite posts, and join the conversation by Signing in
            </p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex  dark:bg-[#008a007d]  items-center justify-center text-center md:px-16 px-0 z-0"
         
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={backgroundImage}
          >
            <div className="absolute bg-[#28ee49b0] opacity-80 inset-0 z-0"></div>
          </div>
          <div className="w-full py-4 z-20">
              <h1 className="text-4xl font-bold text-black">
                Sign In
              </h1><br />

            <p className="text-gray-100 text-sm text-black dark:text-white">
           You can sign in with your email and password or with Google.
            </p>
            <form
              action=""
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleSubmit}
            >
             
              <div className="pb-2 pt-4 p-3">
                <input
                  className="w-full px-5 py-3 text-[black] rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="name@company.com"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="pb-2 pt-4 p-3">
                <input
                  className="w-full px-5 py-3 text-[black] rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              <div className=" pb-2 pt-4 p-3">
                <button
                  type="submit"
                  className="uppercase block w-full p-3 text-md rounded-full bg-[#d30617] hover:bg-[#eb3f4d] focus:outline-none"
                >
                  <span className="ml-3 text-light-100">
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </span>
                </button>
              </div>
              <div>
                {errorMessage && (
                  <span className="text-red-500 text-sm">{errorMessage}</span>
                )}
              </div>
              {/* signup wih google button */}
              <div className=" pb-2 pt-4">
                <OAuth />
              </div>
              <p className="mt-6 text-sm  text-black text-center">
                Already have an account?{" "}
                <Link to="/sign-up" className="text-black font-bold">
                  Sign Up
                </Link>
              </p>
              <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden "></div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignIn;
