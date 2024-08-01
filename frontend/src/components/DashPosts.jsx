import { Modal, Table, Button, Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineExclamationCircle,
  HiOutlineTrash ,
} from "react-icons/hi";
// import { set } from 'mongoose';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  //   row selected
  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  // all rows selected
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedRows = userPosts.map((row) => row._id);
      setSelectedRows(newSelectedRows);
      console.log(
        selectedRows.length === userPosts.length && selectedRows.length > 0
      );
      return;
    }
    setSelectedRows([]);
  };
  const handleDeletePost =()=>{
    console.log('Deleted!');
    setShowModal(false);
  }
  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <div className="p-4">
            {selectedRows.length > 0 ? (
              <>
                <div className="display flex justify-content-center">
                  <span className="text-xl py-1">
                    {selectedRows.length} Posts Selected To Delete &nbsp;
                  </span>
                  <Button
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(`row._id`);
                    }}
                    size='xs'
                    outline
                    pill
                    gradientMonochrome="failure"
                  >
                    <HiOutlineTrash  className="h-6 w-6" />
                  </Button>
                </div>
              </>
            ) : (
              <span className="text-xl text-pink-500">All Posts : ({userPosts.length})</span>
            )}
          </div>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox
                  checked={
                    selectedRows.length === userPosts.length &&
                    selectedRows.length > 0
                  }
                  className="text-pink-600 focus:ring-pink-500"
                  onChange={handleSelectAllClick}
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < userPosts.length
                  }
                />
              </Table.HeadCell>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((row, i) => (
              <Table.Body className="divide-y" key={i}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(row.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${row.slug}`}>
                      <img
                        src={row.image}
                        alt={row.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${row.slug}`}
                    >
                      {row.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{row.category}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${row._id}`}>
                      <Button
                        className="rounded"
                        size="xs"
                        gradientMonochrome="pink"
                      >
                        Edit
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button className="w-full text-teal-500 self-center text-sm py-7">
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-xl">You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4" >
              <Button gradientMonochrome="failure" onClick={handleDeletePost}>Yes, I`m sure</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPosts;
