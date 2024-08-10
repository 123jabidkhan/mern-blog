import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "flowbite-react";

// import { images, stables } from "../constants";
import { Link } from "react-router-dom";

const PostCard = ({ post, className }) => {
  return (
    <div className="group relative w-full shadow-md shadow-[#ff7b86]  overflow-hidden rounded-lg sm:w-[430px] transition-all">
      {/* <Link to={`/blog/${post.slug}`}> */}
      <img
        src={post.image}
        alt="title"
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
      />
      {/* </Link> */}
      <div className="p-5">
        {/* <Link to={`/blog/${post.slug}`}> */}
        <h2 className=" font-roboto font-bold text-dark-soft md:text-2xl lg:text-[28px] h-20">
          {post.title}
        </h2>
        {/* </Link> */}
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={post.image}
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base text-[#ff5360]">
                jabidkhan
              </h4>
              <div className="flex items-center gap-x-2"></div>
            </div>
          </div>
          <span className="font-bold text-[#ff5360] italic text-sm md:text-base">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </span>
        </div>
        <Link to={`/post/${post.slug}`}>
          <Button className="w-full my-5" outline gradientMonochrome="success">
            View article
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
