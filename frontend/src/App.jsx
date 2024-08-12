import { useLocation,BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import SigIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
const App = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/sign-up' || location.pathname === '/sign-in';
  return (
    <>
      
      <ScrollToTop/>
      {!hideHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage/>} />
          {/* Dashboard private */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* admin private routes */}
          {/* <Route element={<AdminPrivateRoute />}> */}
            <Route path="/create-post" element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost/>}></Route>
          {/* </Route> */}
          <Route path="/sign-in" element={<SigIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <br />
        {!hideHeaderFooter && <FooterCom />}
    </>
  );
};

export default App;
