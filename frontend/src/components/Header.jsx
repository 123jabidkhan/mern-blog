import { Button, TextInput, Navbar, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
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
        <span className="px-2 py-1 bg-gradient-to-r from-pink-500  to-orange-500 rounded-lg text-white">
          Blog &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        Hub
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
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

          
            <Link  to="/" className="hover:text-pink-500 lg:hidden md:hidden">
            <Dropdown.Item>Home</Dropdown.Item>
          </Link>
          <Link  to="/about" className="hover:text-pink-500 lg:hidden md:hidden">
            <Dropdown.Item>About</Dropdown.Item>
          </Link>
          <Link  to="/projects" className="hover:text-pink-500 lg:hidden md:hidden">
            <Dropdown.Item>Projects</Dropdown.Item>
          </Link>
            
            <Dropdown.Item icon={HiLogout} onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="pinkToOrange" outline>
              Sign In
            </Button>
          </Link>
        )}

        {/* <Navbar.Toggle /> */}
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="hover:text-pink-500">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="hover:text-pink-500">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects" className="hover:text-pink-500">
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse> 
    </Navbar>
  );
};

export default Header;
