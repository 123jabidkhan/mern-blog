import { useEffect ,useState} from "react";
import {Link} from 'react-router-dom';
function PostCard({ post }) {

  const [user, setUser] = useState({});

  useEffect(()=>{
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${post.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  },[])
  return (
    
    <div className="m-2 max-w-sm w-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-blue-100 to-pink-200 hover:bg-gradient-to-b hover:from-[#f5e0e0] hover:to-[#ffc2c7f3] transition-all duration-300 ease-in-out transform hover:scale-105">
    <Link  to={`/post/${post.slug}`}>
      <img
        className="w-full h-48 object-cover object-center"
        src={post.image}
        alt="Flight"
      />
      <div className="p-6">

        <div className="pt-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.category}</p>
          <p className="text-sm text-gray-500 mt-2">Posted : 
          {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
               month: "long",
             })}</p>
        </div>
        <div className="flex items-center pt-2">
          <img src={post.image} alt="Ixigo" className="w-10 h-10 rounded-full " />&nbsp; @ {user.username ? user.username : 'John Due'}
        </div>
      </div>
    </Link>
    </div>

  );
}

export default PostCard;