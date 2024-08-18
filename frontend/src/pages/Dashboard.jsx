import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashComments from "../components/DashComments";
import DashUsers from "../components/DashUsers";
import DashboardCompo from "../components/DashboardCompo";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    if(!tab){
      navigate('/dashboard?tab=profile');
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex gap-6 flex-row md:flex-row">
      <div>
        {/* DashSidebar */}
        <DashSidebar/>
      </div>
      {/* Dashboard Profile */}
     {tab === 'profile' && <DashProfile />}
     {/* Dashboard Posts */}
     {tab === 'posts' && <DashPosts />}
     {/* Dashboard Comments */}
{tab === 'comments' && <DashComments/>}
 {/* Dashboard Comments */}
 {tab === 'users' && <DashUsers/>}
  {/* Dashboard component */}
  {tab === 'dash' && <DashboardCompo/>}
    </div>
  );
};

export default Dashboard;
