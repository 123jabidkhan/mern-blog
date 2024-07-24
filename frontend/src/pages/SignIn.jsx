import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

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
        dispatch(signInSuccess(res.data.message));
        navigate("/");
      }
      console.log(res.data);
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };

  return (
    <div className="h-[90vh] items-center flex justify-center lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-gradient-to-r from-pink-400  to-orange-400 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold bg-gradient-to-r from-pink-400  to-orange-500 bg-clip-text text-transparent">
                Sign In
              </h1>
              <p className="text-[14px] text-gray-500">
                This is a demo project. You can sign in with your email and
                password or with Google.
              </p>
            </div>

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit}>
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="name@company.com"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="***********"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <Button
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                    className="text-white focus:shadow-outline focus:outline-none"
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
                  </Button>
                  <div>
                    {errorMessage && (
                      <span className="text-red-500 text-sm">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                  {/* signin with google button */}
                  <Button gradientDuoTone="pinkToOrange" outline className="dark:text-white">
                    <svg
                      className="w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 19"
                    >
                      <path
                        d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      />
                    </svg>
                    Sign In With Google
                  </Button>
                  {/* <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Pink to orange
                    </span>
                  </button> */}
                  <p className="mt-6 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/sign-up" className="text-blue-500">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
