import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // input on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/auth/signup", formData);
      if (res.data.success === false) {
        return setErrorMessage(res.data.message);
      }
      setLoading(false);
      if (res.statusText) {
        navigate("/sign-in");
      }
      console.log(res.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
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
                Sign up
              </h1>
              <p className="text-[14px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>

            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit}>
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                  />
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
                    placeholder="Password"
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
                        "Sign Up"
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
                  <p className="mt-6 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="text-blue-500">
                      Sign In
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
export default SignUp;
