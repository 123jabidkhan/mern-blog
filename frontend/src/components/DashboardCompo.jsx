import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Table } from "flowbite-react";
import {Link} from 'react-router-dom';
import {
  HiDocumentText,
  HiAnnotation,
  HiOutlineUserGroup,
  HiArrowNarrowUp
} from "react-icons/hi";

const DashboardCompo = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch('/api/user/getusers?limit=5');
            const data = await res.json();
            if (res.ok) {
              setUsers(data.users);
              setTotalUsers(data.totalUsers);
              setLastMonthUsers(data.lastMonthUsers);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        const fetchPosts = async () => {
          try {
            const res = await fetch('/api/post/getposts?limit=5');
            const data = await res.json();
            if (res.ok) {
              setPosts(data.posts);
              setTotalPosts(data.totalPosts);
              setLastMonthPosts(data.lastMonthPosts);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        const fetchComments = async () => {
          try {
            const res = await fetch('/api/comment/getcomments?limit=5');
            const data = await res.json();
            if (res.ok) {
              setComments(data.comments);
              setTotalComments(data.totalComments);
              setLastMonthComments(data.lastMonthComments);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchUsers();
          fetchPosts();
          fetchComments();
        }
      }, [currentUser]);
      console.log(comments)
      return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-[#ff5360] mb-2 ml-4 tracking-wider">
          Dashboard
        </h1>

        <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <Card className="flex flex-row items-center space-x-4 shadow-lg bg-blue-400 bg-opacity-40 backdrop-blur-lg">
            <HiOutlineUserGroup className="text-blue-500 text-3xl" />
            <div>
              <h5 className="text-xl font-semibold">Total Users <span className='text-2xl'>{totalUsers}</span></h5>
              <p className="text-gray-500 flex items-center"> <span className='text-green-500'><HiArrowNarrowUp /></span>Last month {lastMonthUsers}
              </p>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="flex flex-row items-center space-x-4 shadow-lg bg-green-400 bg-opacity-40 backdrop-blur-lg">
            <HiAnnotation className="text-green-500 text-3xl" />
            <div>
              <h5 className="text-xl font-semibold">Total Comments <span className='text-2xl'>{totalComments}</span></h5>
              <p className="text-gray-500 flex items-center"> <span className='text-green-500'><HiArrowNarrowUp /></span>Last month {lastMonthComments}
              </p>
            </div>
          </Card>

          {/* Card 3 */}
          <Card className="flex flex-row items-center space-x-4 shadow-lg bg-orange-400 bg-opacity-40 backdrop-blur-lg">
            <HiDocumentText className="text-red-500 text-3xl" />
            <div>
              <h5 className="text-xl font-semibold">Total Posts <span className='text-2xl'>{totalPosts}</span></h5>
              <p className="text-gray-500 flex items-center"> <span className='text-green-500'><HiArrowNarrowUp /></span>Last month {lastMonthPosts}
              </p>
            </div>
          </Card>

         
         
        </div>

        {/* tables row */}
        <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2  gap-6">
          {/* Users Table */}
          <div className="overflow-x-auto w-full">
            <Card className="overflow-x-auto w-full">
            <div className="flex justify-between text-lg font-bold">
            <h1 className='text-center p-2'>Recent users</h1>
            <Button outline style={{background:"#ff5360"}}>
              <Link to={'/dashboard?tab=users'}>Show all</Link>
            </Button>
            </div>
              <Table className="min-w-full divide-y ">
                <Table.Head>
                  <Table.HeadCell>Profile</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                </Table.Head>
                {users &&
               users.map((user) => (
                 <Table.Body key={user._id} className='divide-y'>
                   <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                     <Table.Cell>
                       <img
                         src={user.profilePicture}
                         alt='user'
                         className='w-10 h-10 rounded-full bg-gray-500'
                       />
                     </Table.Cell>
                     <Table.Cell>{user.username}</Table.Cell>
                     <Table.Cell>{user.email}</Table.Cell> 
                     <Table.Cell>
                     {
                      user.isAdmin ?<span className='text-green-100 bg-green-400 rounded-sm px-1'>Admin</span>: <span className='text-orange-100 bg-orange-400 rounded-sm px-1'>&nbsp;User&nbsp;&nbsp;</span>
                     }
                     </Table.Cell>
                   </Table.Row>
                 </Table.Body>
               ))}
               
              </Table>
            </Card>
          </div>
           {/* Comments table */}
           <div className="overflow-x-auto w-full">
            <Card className="overflow-x-auto w-full">
            <div className="flex justify-between text-lg font-bold">
            <h1 className='text-center p-2'>Recent comments</h1>
            <Button outline style={{background:"#ff5360"}}>
              <Link to={'/dashboard?tab=comments'}>Show all</Link>
            </Button>
            </div>
              <Table className="min-w-full divide-y ">
                <Table.Head>
                  <Table.HeadCell>Comment</Table.HeadCell>
                  <Table.HeadCell>likes</Table.HeadCell>
                  <Table.HeadCell>Created</Table.HeadCell>
                </Table.Head>
                {comments &&
               comments.map((comment) => (
                 <Table.Body key={comment._id} className='divide-y'>
                   <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                     <Table.Cell>
                       {comment.content}
                     </Table.Cell>
                     <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                     <Table.Cell>{comment.createdAt}</Table.Cell> 
                    
                   </Table.Row>
                 </Table.Body>
               ))}
              </Table>
            </Card>
          </div>
           {/* posts Table */}
           <div className="overflow-x-auto w-full">
            <Card className="overflow-x-auto w-full">
            <div className="flex justify-between text-lg font-bold">
            <h1 className='text-center p-2'>Recent posts</h1>
            <Button outline style={{background:"#ff5360"}}>
              <Link to={'/dashboard?tab=posts'}>Show all</Link>
            </Button>
            </div>
              <Table className="min-w-full divide-y ">
                <Table.Head>
                  <Table.HeadCell>Post Image</Table.HeadCell>
                  <Table.HeadCell>Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                </Table.Head>
                {posts &&
               posts.map((post) => (
                 <Table.Body key={post._id} className='divide-y'>
                   <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                     <Table.Cell>
                     <img
                        src={post.image}
                        alt='user'
                        className='w-14 h-10  bg-gray-500'
                      />
                     </Table.Cell>
                     <Table.Cell>{post.title}</Table.Cell>
                     <Table.Cell>{post.category}</Table.Cell> 
                    
                   </Table.Row>
                 </Table.Body> 
               ))}
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCompo;
