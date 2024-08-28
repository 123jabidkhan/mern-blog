import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import heroImg from "../assets/images/hero.svg";
import { useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import { Card } from "flowbite-react";
import { FaInfoCircle } from "react-icons/fa";

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
  const scrollToSection = () => {
    document
      .getElementById("target-section")
      .scrollIntoView({ behavior: "smooth" });
  };

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
                      "Discover the latest trends in tech...",
                      "Read inspiring stories from developers...",
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
            Welcome to BlogHub—your source for inspiring articles and fresh
            ideas. Explore, learn, and enjoy!
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
 {/* note dont not create unuseful content or post */}
        <div className="flex flex-wrap justify-center mx-auto max-w-full py-5 p-5" >
          <Card className="flex flex-row items-center space-x-4 shadow-lg bg-orange-400 bg-opacity-40 backdrop-blur-lg">
            <FaInfoCircle className="text-orange-400 text-3xl" />
            <div>
              <h5 className="text-xl font-semibold">
                Please focus on creating valuable and meaningful content. Avoid
                posting irrelevant or redundant information.{" "}
              </h5>
              <p className="mt-2 font-semibold text-yellow-800">
                Let’s focus on content that educates, inspires, and engages!
              </p>
            </div>
          </Card>
        </div>
      <div id="target-section">
        <div className="flex flex-col max-w mx-auto">
          {posts && posts.length > 0 && (
            <div className="flex flex-col sm:mx-auto">
              <h2 className="text-2xl font-semibold text-center my-5">
                Recent Posts
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mx-auto max-w-full">
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
