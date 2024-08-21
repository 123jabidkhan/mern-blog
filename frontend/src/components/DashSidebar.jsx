import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {signoutSuccess} from '../redux/user/userSlice';
import { MdLogout } from "react-icons/md";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const menus = [
    {
      name: currentUser?.isAdmin ? "dashboard" : null,
      link: "/dashboard?tab=dash",
      icon: HiChartPie,
      activeLink: "dash",
    },
    {
      name: "profile",
      link: "/dashboard?tab=profile",
      icon: HiUser,
      activeLink: "profile",
    },
    {
      name:"posts",
      link: "/dashboard?tab=posts",
      icon: HiDocumentText,
      activeLink: "posts",
    },
    {
      name: currentUser?.isAdmin ? "users" : null,
      link: "/dashboard?tab=users",
      icon: HiOutlineUserGroup,
      activeLink: "users",
    },
    {
      name: currentUser.isAdmin ? "comments" : null,
      link: "/dashboard?tab=comments",
      icon: HiAnnotation,
      activeLink: "comments",
    },
  ];
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {

    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="flex gap-6">
      <div
        className={`bg-dark min-h-screen border-r-2 border-red-100 border-line ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-600 dark:text-white px-4 `}
      >
        <div className="py-3 flex justify-end">
          <HiOutlineArrowRight
            size={26}
            onClick={() => setOpen(!open)}
            className={`cursor-pointer ${open && 'hidden'}`}
          />
          <RxCross2 
            size={26}
            onClick={() => setOpen(!open)}
            className={`cursor-pointer ${!open && 'hidden'}`}
          />
          {/* for admin */}
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus
            ?.filter((navLink) => navLink?.name)
            ?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${tab === menu?.activeLink ? `border-l-4 bg-[#f1bcbf]` : ""} ${
                  menu?.margin && "mt-5"
                }   group flex items-center text-sm  gap-3.5 font-medium p-2  hover:border-l-4 border-[#ff5360] hover:bg-[#f1bcbf] rounded-md`}
              >
                <div className="">{React.createElement(menu?.icon, { size: "17" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={` z-10 ${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}

          <Link 
            className={` "mt-5" group flex items-center text-sm  gap-3.5 font-medium p-2  hover:border-l-4 border-[#ff5360] hover:bg-[#f1bcbf] rounded-md`}
            onClick={()=>handleSignout()}
          >
            <div>
              {React.createElement(
                'button',
                null,
                React.createElement(MdLogout, { size: 20, color: "grey" })
              )}
            </div>
            <h2
              style={{
                transitionDelay: `${5 + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Sign Out
            </h2>
            <h2
              className={`z-10 ${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              
            >
              Sign Out
            </h2>
          </Link>
        </div>
      </div>
      {/* <div className="m-3 text-xl text-light-900 font-semibold">
        REACT TAILWIND
      </div> */}
    </section>
  );
};

export default DashSidebar;
