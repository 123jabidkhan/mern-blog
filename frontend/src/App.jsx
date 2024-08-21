import { useLocation, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import SigIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import FooterCom from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import PageNotFound from "./pages/PageNotFound";
import Search from "./pages/Search";
import ScrollToTop from "./components/ScrollToTop";
import ToastNotification from "./components/ToastNotification";

const App = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/sign-up' || location.pathname === '/sign-in';
  return (
    <>
      
      <ScrollToTop/>
      {!hideHeaderFooter && <ToastNotification/>}
      {!hideHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:postSlug" element={<PostPage/>} />
          <Route path="/search" element={<Search/>} />
          {/* Dashboard private */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost/>}></Route>
          <Route path="/sign-in" element={<SigIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* page not found route */}
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
        <br />
        {!hideHeaderFooter && <FooterCom />}
    </>
  );
};

export default App;
