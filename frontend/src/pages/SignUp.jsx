import { useState } from "react";
import { Spinner, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import loginBg from "../assets/images/loginBg.jpg";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  //   // input on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required."));
    }
    try {
      // ..without Redux..
      // setLoading(true);
      // setErrorMessage(null);

      // wih Redux, loading start and error value set null:
      dispatch(signInStart());
      const res = await axios.post("/api/auth/signup", formData);
      if (res.data.success === false) {
        return dispatch(signInFailure(res.data.message));
      }
      // if response ok
      if (res.statusText) {
        dispatch(signInSuccess(res.data.message));
        navigate("/sign-in");
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
              Sign up to share your thoughts, follow your favorite authors, and never miss an update.
            </p>
            <Link to='/'>
            <Button color='failure'>Latest article</Button>
            </Link>
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
                Sign Up
              </h1><br />

            <p className="text-gray-100 text-sm text-black dark:text-white">
              Hey enter your details to create your account
            </p>
            <form
              action=""
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="pb-2 pt-4 p-3">
                <input
                  className="w-full px-5 text-[black] py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
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
                      "Sign Up"
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
                <Link to="/sign-in" className="text-black font-bold">
                  Sign In
                </Link>
              </p>
              <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden "></div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
