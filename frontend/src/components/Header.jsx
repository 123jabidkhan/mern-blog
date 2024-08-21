import { Button, TextInput, Navbar, Avatar } from "flowbite-react";
import {useState, useEffect} from 'react';
import { Link, useLocation , useNavigate} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {signoutSuccess} from '../redux/user/userSlice';

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
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
  // when user keydown "enter" event call handleSubmit()
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };
  // when user click on search button handleSubmit() call
  const handleSubmit = () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
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
      <form className="flex xs:hidden">
        <TextInput
          type="text"
          placeholder="Search..."
          className="hidden lg:inline"
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AiOutlineSearch onClick={handleSubmit} className="w-8 h-8 mt-1 -ml-10 z-10 cursor-pointer text-[#ff5360] transition-transform duration-200 ease-in-out hover:scale-125 xs:hidden" />
      </form>
      {/* <Button  color="gray" pill> */}
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
            arrowIcon={false}
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

            <Link  to="/dashboard?tab=dash" className="hover:text-[#ff5360] lg:hidden md:hidden">
            <Dropdown.Item>Dashboard</Dropdown.Item>
          </Link>
            <Dropdown.Divider />
            <Link  to="/" className="hover:text-[#ff5360] lg:hidden md:hidden">
            <Dropdown.Item>Home</Dropdown.Item>
          </Link>
          <Link  to="/about" className="hover:text-[#ff5360] lg:hidden md:hidden">
            <Dropdown.Item>About</Dropdown.Item>
          </Link>
         
            <Dropdown.Item icon={MdLogout} onClick={handleSignout}>Sign out</Dropdown.Item>
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
