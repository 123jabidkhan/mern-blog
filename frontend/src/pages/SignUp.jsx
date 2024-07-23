import { Button } from "flowbite-react";
import {Link} from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="h-[90vh] items-center flex justify-center lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-gradient-to-r from-pink-400  to-orange-400 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:  `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
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
            <form>
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter username"
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="name@company.com"
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                />
                <Button gradientDuoTone="pinkToOrange" className="text-white focus:shadow-outline focus:outline-none">
                  <span className="ml-3 text-light-100">Sign Up</span>
                </Button>
                <p className="mt-6 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to='/sign-in' className='text-blue-500'>
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
