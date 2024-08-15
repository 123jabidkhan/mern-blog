// PageNotFound.jsx
import { Button } from "flowbite-react";
import {Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark dark:text-gray-400">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mb-8">
          Oops! The page you're looking for isn't here.
        </p>
        <p className="text-lg mb-8">
          You might have the wrong address, or the page may have moved.
        </p>
        <div className="flex items-center justify-center">

       <Link to='/'>
        <Button gradientMonochrome='success'>Go To Home</Button>
       </Link>
        </div>
      </div>
     
    </div>
  );
};

export default PageNotFound;
