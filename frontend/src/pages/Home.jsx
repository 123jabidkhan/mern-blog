import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import heroImg from "../assets/images/hero.svg";
import { useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
const Home = () => {
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
  const scrollToSection = ()=>{
    document.getElementById('target-section').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {/* langing page */}
      <section className="main">
        <section className="left">
          <p className="title">Welcome to BlogHub </p>
          <div className="typingEffect h-20">
            <div className="typeWriter">
              <h1
                style={{
                  margin: "auto 0",
                  fontWeight: "normal",
                  fontSize: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={[
                      "Transform your knowledge and skills with our insightful articles.",
                      "Innovation starts here—let’s explore the future together!",
                      "Your journey to mastering tech begins now!",
                    ]}
                    loop={10}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={10}
                    delaySpeed={1000}
                  />
                </span>
              </h1>
            </div>
          </div>
          <p className="msg">
            Welcome to our bloghub! Dive into the latest trends, tutorials,
            and expert insights. Discover how technology is shaping the future
            and stay ahead in the field.
          </p>

          <span className="inline mr-2">
            <Link
              to={!currentUser ? "/sign-in" : "/create-post"}
              className="px-8 py-3 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block px-4 animate-bounce focus:animate-none hover:animate-none bg-[#ff5360] "
            >
              Create Post
            </Link>
          </span>
          <span className="inline mr-2">
            <button
             onClick={scrollToSection}
              className="px-10 py-3 text-white uppercase tracking-wide no-underline text-sm font-semibold rounded shadow inline-block px-8 animate-bounce focus:animate-none hover:animate-none bg-green-400 "
            >
              Recent Posts
            </button>
          </span>
        </section>

        <section className="right">
          <img src={heroImg} alt="Langing image" />
        </section>
      </section>

      {/* ................ */}
      <div id='target-section'>
        <div className="flex flex-col max-w mx-10 ">
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
                className="text-lg text-[#ff5360] mt-10 hover:underline text-center"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
