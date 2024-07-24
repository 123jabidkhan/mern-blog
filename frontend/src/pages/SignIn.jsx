import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
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

  return (
    <div className="h-[100vh] items-center flex justify-center lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-gradient-to-r from-pink-500  text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white dark:bg-gray-800 ">
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
                 <OAuth/>
                 
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
