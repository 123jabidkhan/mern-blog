// const  About = () =>{
//   return (
//     <div className='min-h-screen flex items-center justify-center'>
//       <div className='max-w-2xl mx-auto p-3 text-center'>
//         <div>
//           <h1 className='text-3xl font font-semibold text-center my-7'>
//             About Jabid`s Blog
//           </h1>
//           <div className='text-md text-gray-500 flex flex-col gap-6'>
//             <p>
//             Welcome to Jabid`s BlogHub`, where we believe that you`ll find weekly articles and
//              tutorials on topics such as web development, software engineering, and programming languages. 
//              Whether you`re here to learn, get inspired,
//              or simply enjoy some well-crafted content, you`ve come to the right 
//              place.
//             </p>

//             <p>
//             Our Mission
//             At BlogHub, our mission is to 
//             We encourage you to leave comments on our posts and engage with
//             other readers. We strive to provide that is 
//              informative, entertaining, insightful
//             to help our readers grow in their careers , find inspiration, stay informed.
//             </p>

//             <p>
//             We are constantly updating our content to ensure that it remains fresh,
//              relevant, and valuable to our readers. Whether you’re a tech enthusiast, food lover, small business owner,
//               there’s something here for everyone.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;

// new about page design
import React from "react";
import { Card, Avatar, Button } from "flowbite-react";

const About = () => {
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
        <Card className="text-center p-6 bg-green-200 bg-opacity-40 backdrop-blur-lg">
          <Avatar
            img="https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_1280.jpg"
            rounded={true}
            size="xl"
            alt="Member 1"
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">Jabid Khan</h3>
          <p className="text-gray-600">Lead Writer</p>
          <p className="mt-2 text-gray-500 text-sm">
            John specializes in technology and innovation. He loves to write about the latest trends and how they impact our daily lives.
          </p>
        </Card>

        {/* Team Member 2 */}
        <Card className="text-center p-6 bg-[#f5cce770] bg-opacity-40 backdrop-blur-lg">
          <Avatar
            img="https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_1280.jpg"
            rounded={true}
            size="xl"
            alt="Member 2"
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">Rupesh</h3>
          <p className="text-gray-600">Content Strategist</p>
          <p className="mt-2 text-gray-500 text-sm">
            Jane is a master of content strategy. She ensures that our articles are well-researched and align with our audience's interests.
          </p>
        </Card>

        {/* Team Member 3 */}
        <Card className="text-center p-6 bg-[#e0b15e9a] bg-opacity-40 backdrop-blur-lg">
          <Avatar
            img="https://cdn.pixabay.com/photo/2020/05/23/05/57/man-5208156_1280.jpg"
            rounded={true}
            size="xl"
            alt="Member 3"
            className="mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">Manivel</h3>
          <p className="text-gray-600">SEO Expert</p>
          <p className="mt-2 text-gray-500 text-sm">
            Emily focuses on optimizing our content to reach a wider audience. She is passionate about making sure our blog ranks high in search engines.
          </p>
        </Card>
      </div>

      {/* Call to Action Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
        <p className="text-gray-600 mb-6">
          Interested in what we do? Subscribe to our newsletter to stay updated with the latest posts and exclusive content.
        </p>
        <Button href='/sign-in' color="primary" className="px-6 py-2 text-lg">
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default About;