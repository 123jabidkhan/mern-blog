import { Button, TextInput, Navbar, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { HiLockClosed } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {signoutSuccess} from '../redux/user/userSlice';

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
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
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-[#ff5360]  to-green-400 rounded-lg text-white">
          Blog Hub
          &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      {/* <Button  color="gray" pill> */}
        <AiOutlineSearch className="w-8 h-8 mr-10 text-[#ff5360] transition-transform duration-200 ease-in-out hover:scale-125 lg:hidden" />
      {/* </Button> */}

      <div className="flex gap-2 md:order-1">
        <Button
          className="w-12 h-10 hover:text-[#ff5360]"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun  className="hover:text-[#ff5360]"/> : <FaMoon className="hover:text-[#ff5360]" />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={true}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
            
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />

          
            <Link  to="/" className="hover:text-[#ff5360] lg:hidden md:hidden">
            <Dropdown.Item>Home</Dropdown.Item>
          </Link>
          <Link  to="/about" className="hover:text-[#ff5360] lg:hidden md:hidden">
            <Dropdown.Item>About</Dropdown.Item>
          </Link>
          <Link  to="/projects" className="hover:text-[#ff5360] lg:hidden md:hidden">
            <Dropdown.Item>Projects</Dropdown.Item>
          </Link>
            <Dropdown.Item icon={HiLockClosed} onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button style={{background:"#ff5360"}} outline>
              Sign In
            </Button>
          </Link>
        )}

        {/* <Navbar.Toggle /> */}
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="hover:text-[#ff5360]">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="hover:text-[#ff5360]">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects" className="hover:text-[#ff5360]">
            Projects
          </Link>
        </Navbar.Link>
        {
          ( currentUser && currentUser?.isAdmin) && (
            <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/dashboard?tab=dash" className="hover:text-[#ff5360]">
            Dashboard
          </Link>
        </Navbar.Link>
          )
        }
        
      </Navbar.Collapse> 
    </Navbar>
  );
};

export default Header;
