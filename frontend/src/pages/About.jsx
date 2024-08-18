import { useSelector } from "react-redux";
import jabidImage from '../assets/images/jabid.jpg'
import { Card, Avatar, Button } from "flowbite-react";

const About = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Introduction Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg">
          Welcome to our blog! We are passionate about sharing knowledge and insights on various topics. Our goal is to inspire, educate, and engage our readers with high-quality content.
        </p>
      </div>

      {/* Team Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Team Member 1 */}
        <Card className="text-center p-6 bg-green-200 bg-opacity-40 ">
          <Avatar
            img="https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_1280.jpg"
            rounded={true}
            size="xl"
            alt="Member 1"
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Rupesh</h3>
          <p className="text-gray-600">Lead Writer</p>
          <p className="mt-2 text-gray-500 text-sm">
          Rupesh is a talented Lead Writer with a flair for crafting compelling and engaging content. His ability to capture the essence of a message and convey it in a clear
          </p>
        </Card>

        {/* Team Member 2 */}
        <Card className="text-center p-6 bg-[#f5cce770] bg-opacity-40">
          <Avatar
            img={jabidImage}
            rounded={true}
            size="xl"
            alt="Member 2"
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Jabid</h3>
          <p className="text-gray-600">Software Developer</p>
          <p className="mt-2 text-gray-500 text-sm">
          Jabid is a passionate software developer with a strong focus on creating efficient and scalable web applications. With a deep understanding of modern technologies,
          </p>
        </Card>

        {/* Team Member 3 */}
        <Card className="text-center p-6 bg-[#d4abfa9a] bg-opacity-40 ">
          <Avatar
            img="https://cdn.pixabay.com/photo/2020/05/23/05/57/man-5208156_1280.jpg"
            rounded={true}
            size="xl"
            alt="Member 3"
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Manivel</h3>
          <p className="text-gray-600">SEO Expert</p>
          <p className="mt-2 text-gray-500 text-sm">
          Manivel is an experienced SEO expert with a proven track record in optimizing websites for search engines. His expertise in keyword research, on-page optimization, 
          </p>
        </Card>
      </div>

      {/* Call to Action Section */}
      {
        !currentUser && 

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-6">
          Interested in what we do? Subscribe to our newsletter to stay updated with the latest posts and exclusive content.
        </p>
        <div  className="flex justify-center">
        <Link to="/sign-in">
            <Button style={{background:"#ff5360"}} outline>
              Join In
            </Button>
          </Link>
        </div>
          
      </div>
      }
    </div>
  );
};

export default About;