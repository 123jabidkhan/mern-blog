import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import heroImg from "../assets/images/hero.svg";
import { useSelector } from 'react-redux';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
    
  }, []);
 
  return (
    <>
      {/* langing page */}
      <section className="main">
        <section className="left">
          <p className="title">
            Welcome to Blog Hub <br />{" "}
            
          </p>
          <span className="text-green-500 text-[20px]">
              Where Ideas Come To Life
            </span>
          <p className="msg">
          you`ll discover a variety of content that speaks to your
           interests. Join us on this journey of exploration and connection.
          </p>

          <span className="inline-block mr-2 mb-2">
            <Link
              to={!currentUser ? '/sign-in' : '/create-post'}
              className="px-8 py-3 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block py-4 px-4 animate-bounce focus:animate-none hover:animate-none bg-[#ff5360] "
            >
              Create Post
            </Link>
          </span>
          <span className="inline-block mr-2 mb-2">
            <Link
              to={!currentUser ? '/sign-in' : 'dashboard?tab=posts'}
              className="px-10 py-3 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block py-4 px-8 animate-bounce focus:animate-none hover:animate-none bg-green-400 "
            >
              All Posts
            </Link>
          </span>
        </section>

        <section className="right">
          <img src={heroImg} alt="Langing image" />
        </section>
      </section>

      {/* ................ */}
      <div>
        <div className="max-w mx-auto px-5 flex flex-col">
          {posts && posts.length > 0 && (
            <div className="flex flex-col sm:mx-auto">
              <h2 className="text-2xl font-semibold text-center my-5">
                Recent Posts
              </h2>
              <div className="flex flex-wrap gap-2">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to={"/search"}
                className="text-lg text-pink-500 hover:underline text-center"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
