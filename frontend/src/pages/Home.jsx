import { Link } from 'react-router-dom';
// import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      {/* <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you`ll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-pink-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div> */}
      <div className='max-w-[1640px] mx-auto '>
        <div className='max-h-[500px] relative'>
            {/* Overlay */}
            <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>The <span className='text-pink-800'>Best</span></h1>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-pink-800'>Foods</span> Devlivered</h1>
            </div>
            <img className='w-full max-h-[500px] object-cover' src="https://img.freepik.com/free-photo/beautiful-office-space-cartoon-style_23-2151043299.jpg?t=st=1722943770~exp=1722947370~hmac=99e0bda52aa324624f00801fe256a968fc99041ca4f0a841ed47e509f2c77440&w=740" alt="/" />
        </div>
    </div>

      <div className='max-w mx-auto px-5 flex flex-col gap-4'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-3'>
            <h2 className='text-2xl font-semibold text-center my-5'>Recent Posts</h2>
            <div className='flex flex-wrap gap-2'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-pink-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
