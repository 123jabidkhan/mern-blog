import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';
const ToastNotification = () => {
    const names = ["Devin", "Priya", "Rahul", "Sneha", "Vikram"];



  // Function to get a random time ago string
  const getRandomTimeAgo = () => {
    const minutes = [10, 20, 30, 45, 60]; // Example times in minutes
    const randomIndex = Math.floor(Math.random() * minutes.length);
    return `${minutes[randomIndex]} minutes ago`;
  };

  const messages = names.map(name => `${name} joined in Bloghub! ${getRandomTimeAgo()}`);

  useEffect(() => {
    let messageIndex = 0;

    const showToast = () => {
      if (messageIndex < messages.length) {
        toast.success(messages[messageIndex], {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          progressStyle: { backgroundColor: 'green' },
          icon: <FaCheckCircle color="white" />,
          style: {
            width: '250px',
            backgroundColor:'rgb(45 231 110 / 79%)',
            color:'white'
          }
        });

        messageIndex++;
      } else {
        clearInterval(interval); // Clear interval after the last message
      }
    };

    // Trigger a toast every 10 seconds
    const interval = setInterval(showToast, 15000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default ToastNotification;
