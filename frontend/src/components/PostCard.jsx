import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Button } from 'flowbite-react';
const PostCard = ({ post }) =>{
    const [user, setUser] = useState([]);
    useEffect(() => {
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
      }, [post.userId]);
  return (
   /* From Uiverse.io by akshat-patel28 */ 

<div classNameName="flex min-h-screen items-center justify-center bg-light-800">
  {/* <div classNameName="grid grid-cols-1 gap-5 md:grid-cols-2"> */}
    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      <div className="h-96 w-72">
        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={post.image} alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[42%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className="font-dmserif text-3xl font-bold text-white">{post.title}</h1>
      <div className='flex items-center gap-1 text-gray-500 text-sm my-5'>
          {/* <p>Signed in as:</p> */}
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={user.profilePicture}
            alt=''
          />
          {/* <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-white hover:underline'
          > */}
          <span>

            @{user.username}
          </span>
          {/* </Link> */}
        </div>
        {/* <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p> */}
        <Button className='my-5' size='sm'
        color='pink'>Show article</Button>
      </div>
    </div>
   
  

    
  </div>
// </div>

   
  );
}
export default PostCard;