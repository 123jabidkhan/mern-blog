import { Modal, Table, Button, Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiOutlineExclamationCircle,
  HiOutlineTrash
} from "react-icons/hi";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.users.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
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
      const newSelectedRows = comments.map((row) => row._id);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };

//   Delete posts byIDS
    const handleDeletePost = async () => {
      setShowModal(false);
      try{
        const res = await fetch(`/api/comment/deleteComments/`, {
          method: "DELETE",
          headers: {
                'Content-Type': 'application/json',
              },
          body: JSON.stringify({ ids: selectedRows }),
        });
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }else{
          setComments((prev) =>
            prev.filter((post) => !selectedRows.includes(post._id)));
          setSelectedRows([])
        }
      }
      catch(error){
        console.log(error.message);
      }

    };

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
          const res = await fetch(`/api/comment/getComments?startIndex=${startIndex}`);
          const data = await res.json();
          if (res.ok) {
            setComments((prev) => [...prev, ...data.comments]);
            if (data.comments.length < 5) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     
      {(currentUser.isAdmin && comments.length > 0) ? (
        <>
          <div className="p-4 flex justify-between ">
            {selectedRows && selectedRows?.length > 0 ? (
              <>
                <div className="display flex justify-content-center">
                  <span className="text-xl py-1">
                    {selectedRows.length}{" "}
                    {selectedRows.length === 1 ? "comment" : "comments"} marked for
                    deletion &nbsp;
                  </span>
                  <HiOutlineTrash
                    className="w-6 h-6 text-pink-600 transition-transform duration-200 ease-in-out hover:scale-125 mt-2"
                    size="23"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                </div>
              </>
            ) : (
              <span className="text-xl text-pink-500">
                All Comments : ( {comments.length} )
              </span>
            )}
           
          </div>
          <Table hoverable className="shadow-xl h-['100vh']">
            <Table.Head>
              <Table.HeadCell className="p-2">
                <Checkbox
                  checked={
                    selectedRows.length === comments.length &&
                    selectedRows.length > 0
                  }
                  className="text-pink-600 focus:ring-pink-500"
                  onChange={handleSelectAllClick}
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < comments.length
                  }
                />
              </Table.HeadCell>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
            </Table.Head>
            {comments.map((row) => (
              <Table.Body className="divide-y" key={row._id}>
                <Table.Row className="bg-white dark:border-gray-100 dark:bg-gray-800">
                  <Table.Cell className="p-3">
                    <Checkbox
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                     {row.content}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {row.numberOfLikes}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    
                      {row.postId}
                  </Table.Cell>
                  <Table.Cell>
                  {row.userId}
                  </Table.Cell>
                 
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore.length > 5 && (
            <button onClick={handleShowMore} className="w-full text-pink-500 self-center text-sm py-7">
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-xl">You have no comments yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="sm"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-5 w-5 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-3 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button gradientMonochrome="failure" onClick={handleDeletePost}>
                Yes, I`m sure
              </Button>
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

export default DashComments;
