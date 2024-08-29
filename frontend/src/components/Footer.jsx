import React from 'react';
import {Link} from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 bg-white dark:bg-[#12153157]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-[#ff5360] mb-4">Jabid's Blog</h2>
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <li>
                <Link to='/' >
                  Home
                </Link>
              </li>
              <li>
                <Link to='/about' >
                  About
                </Link>
              </li>
              <li>
                <a href="https://jabid-portfolio.netlify.app"  target="_blank" >
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.675 0h-21.35C.601 0 0 .601 0 1.341v21.318C0 23.399.601 24 1.325 24h11.482v-9.294H9.691v-3.624h3.116v-2.672c0-3.1 1.892-4.788 4.657-4.788 1.325 0 2.462.098 2.794.142v3.24l-1.917.001c-1.504 0-1.796.715-1.796 1.763v2.314h3.588l-.467 3.624h-3.12V24h6.116c.724 0 1.325-.601 1.325-1.341V1.341C24 .601 23.399 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.61 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.558-3.594-1.558-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.125-4.09-.205-7.719-2.165-10.141-5.144-.425.722-.666 1.561-.666 2.455 0 1.69.86 3.18 2.168 4.055-.799-.025-1.554-.245-2.213-.613v.061c0 2.364 1.68 4.337 3.909 4.782-.409.111-.838.171-1.282.171-.314 0-.615-.031-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.808 2.105-6.102 2.105-.396 0-.79-.023-1.175-.067 2.179 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.497 14-13.985 0-.21 0-.423-.015-.635.961-.689 1.8-1.56 2.463-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163C6.504 2.163 2.16 6.507 2.16 12c0 4.794 3.448 8.767 7.938 9.635-.108-.799-.203-2.024.042-2.89.239-.841 1.538-5.348 1.538-5.348s-.391-.783-.391-1.94c0-1.816 1.052-3.176 2.36-3.176 1.113 0 1.651.835 1.651 1.835 0 1.119-.711 2.796-1.079 4.345-.309 1.3.652 2.362 1.938 2.362 2.324 0 3.94-2.451 3.94-5.98 0-2.504-1.804-4.292-4.891-4.292-3.541 0-5.624 2.646-5.624 5.618 0 1.09.424 2.262.955 2.897.105.125.119.235.087.363-.096.362-.318 1.154-.362 1.313-.055.202-.174.245-.402.148-1.504-.615-2.442-2.545-2.442-4.1 0-3.337 2.42-6.407 7.001-6.407 3.676 0 6.521 2.617 6.521 5.974 0 3.635-2.289 6.559-5.464 6.559-1.065 0-2.064-.553-2.409-1.184l-.655 2.498c-.238.906-.885 2.046-1.324 2.742C9.816 23.338 10.891 23.75 12 23.75c5.497 0 9.841-4.344 9.841-9.841 0-5.497-4.344-9.841-9.841-9.841z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex justify-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} BlogHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

