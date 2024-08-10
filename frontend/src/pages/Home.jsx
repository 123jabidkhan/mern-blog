import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import heroImg from "../assets/images/hero.svg";

export default function Home() {
  const [posts, setPosts] = useState([]);

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
            <span className="text-green-500 text-[22px] ">
              Where Ideas Come to Life
            </span>
          </p>
          <p className="msg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nihil
            rerum itaque quisquam! Natus repudiandae nesciunt tempora odio amet.
            Saepe?
          </p>

          <span className="inline-block mr-2 mb-2">
            <a
              href=""
              className="px-8 py-3 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block py-4 px-4 animate-bounce focus:animate-none hover:animate-none bg-[#ff5360] "
            >
              Create Post
            </a>
          </span>
          <span className="inline-block mr-2 mb-2">
            <a
              href=""
              className="px-10 py-3 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block py-4 px-8 animate-bounce focus:animate-none hover:animate-none bg-green-400 "
            >
              All Posts
            </a>
          </span>
        </section>

        <section className="right">
          <img src={heroImg} alt="Langing image" />
        </section>
      </section>

      {/* ................ */}
      <div>
        <div className="max-w mx-auto px-5 flex flex-col gap-4">
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-3 sm:mx-auto">
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
