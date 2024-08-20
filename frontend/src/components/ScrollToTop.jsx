import {
  HiArrowNarrowUp 
} from "react-icons/hi";
import { useState, useEffect } from "react";
const ScrollToTp = () => {
  const [showButton, setShowButton] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) { // Adjust this value as needed
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 z-10 right-4 p-3 rounded-full bg-black dark:bg-white dark:text-black shadow-lg  transition-transform transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <HiArrowNarrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTp;
