import { Modal, Table, Button, Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineExclamationCircle,
  HiOutlineTrash,
  HiCheck,
  HiOutlineX
} from "react-icons/hi";
// import { set } from 'mongoose';

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
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
      const newSelectedRows = users.map((row) => row._id);
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };

//   Delete posts byIDS
    const handleDeletePost = async () => {
      setShowModal(false);
      try{
        const res = await fetch(`/api/user/deleteUsers/`, {
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
          setUsers((prev) =>
            prev.filter((post) => !selectedRows.includes(post._id)));
          setSelectedRows([])
        }
      }
      catch(error){
        console.log(error.message);
      }

    };

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
          const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
          const data = await res.json();
          if (res.ok) {
            setUsers((prev) => [...prev, ...data.users]);
            if (data.users.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <div className="p-4 flex justify-between ">
            {selectedRows && selectedRows?.length > 0 ? (
              <>
                <div className="display flex justify-content-center">
                  <span className="text-xl py-1">
                    {selectedRows.length}{" "}
                    {selectedRows.length === 1 ? "post" : "posts"} marked for
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
                All Users : ( {users.length} )
              </span>
            )}
           
          </div>
          <Table hoverable className="shadow-xl h-['100vh']">
            <Table.Head>
              <Table.HeadCell className="p-2">
                <Checkbox
                  checked={
                    selectedRows.length === users.length &&
                    selectedRows.length > 0
                  }
                  className="text-pink-600 focus:ring-pink-500"
                  onChange={handleSelectAllClick}
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < users.length
                  }
                />
              </Table.HeadCell>
              <Table.HeadCell> Created At </Table.HeadCell>
              <Table.HeadCell>  Profile Image</Table.HeadCell>
              <Table.HeadCell> Username</Table.HeadCell>
              <Table.HeadCell> Email Id</Table.HeadCell>
              <Table.HeadCell> Admin </Table.HeadCell>
            </Table.Head>
            {users.map((row) => (
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
                      <img
                        src={row.profilePicture}
                        alt={row.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {row.username}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {/* <Link
                      className="font-medium text-gray-900 dark:text-white"
                    > */}
                      {row.email}
                    {/* </Link> */}
                  </Table.Cell>
                  <Table.Cell>
                  {row.isAdmin ? <HiCheck className='text-green-500' size='25' /> : <HiOutlineX className='text-red-500' size='25'  />}
                  </Table.Cell>
                 
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full text-pink-500 self-center text-sm py-7">
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

export default DashUsers;
