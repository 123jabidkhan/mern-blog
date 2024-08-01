import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
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

    </div>
  );
};

export default Dashboard;
