import { Modal, Table, Button, Checkbox, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiOutlineExclamationCircle,
  HiOutlineTrash,
  HiCheck,
  HiOutlineX,
} from "react-icons/hi";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState("");
  // State for controlling modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserStatusChangeModal, setIsUserStatusChangeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingIds, setLoadingIds] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers/`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 5) {
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
  }, []);

  // Functions to open and close modals
  const openDeleteUsersModal = () => setIsDeleteModalOpen(true);

  const openStatusChangeModal = (uid, currentStatus) => {
    setUserId(uid);
    setUserStatus(currentStatus);
    setIsUserStatusChangeModal(true);
  };

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
    setIsDeleteModalOpen(false);
    try {
      const res = await fetch(`/api/user/deleteUsers/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedRows }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) =>
          prev.filter((post) => !selectedRows.includes(post._id))
        );
        setSelectedRows([]);
      }
    } catch (error) {
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

  const handleUserStatusChnage = async () => {
    setIsUserStatusChangeModal(false);
    setLoading(true);
    setLoadingIds((prev) => [...prev, userId]);
    try {
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !userStatus }),
      });
      const data = await res.json();
      console.log("updated user >>", data);
      if (!res.ok) {
        setLoading(false);
        console.log("Something went wrong while status update >", data.message);
      } else {
        setTimeout(() => {
          setLoading(false);
          setLoadingIds((prev) => prev.filter((id) => id !== userId));
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, isAdmin: !userStatus } : user
            )
          );
        }, 3000);
        console.log("user status update successfully!");
      }
    } catch (error) {
      console.log(
        "something went wrong while update user status ",
        error.message
      );
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
                    {selectedRows.length === 1 ? "user" : "users"} marked for
                    deletion &nbsp;
                  </span>
                  <HiOutlineTrash
                    className="w-6 h-6 text-[red] transition-transform duration-200 ease-in-out hover:scale-125 mt-2"
                    size="23"
                    onClick={() => {
                      openDeleteUsersModal(true);
                    }}
                  />
                </div>
              </>
            ) : (
              <span className="text-xl text-[#ff5360] font-bold">
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
                  className="text-[#ff5360] focus:ring-[#ff5360] ml-4"
                  onChange={handleSelectAllClick}
                  indeterminate={
                    selectedRows.length > 0 &&
                    selectedRows.length < users.length
                  }
                />
              </Table.HeadCell>
              <Table.HeadCell> Created At </Table.HeadCell>
              <Table.HeadCell> Profile Image</Table.HeadCell>
              <Table.HeadCell> Username</Table.HeadCell>
              <Table.HeadCell> Email Id</Table.HeadCell>
              <Table.HeadCell> Admin Status </Table.HeadCell>
              <Table.HeadCell> Actions </Table.HeadCell>
            </Table.Head>
            {users.map((row) => (
              <Table.Body className="divide-y" key={row._id}>
                <Table.Row className="bg-white dark:border-gray-100 dark:bg-gray-800">
                  <Table.Cell className="">
                    <Checkbox
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                      className="text-[#ff5360] focus:text-[#ff5360]"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={row.profilePicture}
                      alt={row.username}
                      className="w-5 h-5 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {row.username}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {row.email}
                  </Table.Cell>
                  <Table.Cell>
                    {row.isAdmin ? (
                      <HiCheck className="text-green-400" size="25" />
                    ) : (
                      <HiOutlineX className="text-red-500" size="25" />
                    )}
                  </Table.Cell>

                  {/* admin acces enable or disable */}
                  <Table.Cell>
                    {row?.isAdmin ? (
                      <Button
                        className="w-35"
                        color="success"
                        onClick={() =>
                          openStatusChangeModal(row._id, row.isAdmin)
                        }
                      >
                        {loadingIds.includes(row._id) ? (
                          <>
                            <Spinner size="sm" />
                            <span className="pl-3">Loading...</span>
                          </>
                        ) : (
                          "Revoke Admin"
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="w-35 px-2"
                        color="failure"
                        onClick={() =>
                          openStatusChangeModal(row._id, row.isAdmin)
                        }
                      >
                        {loadingIds.includes(row._id) ? (
                          <>
                            <Spinner size="sm" />
                            <span className="pl-3">Loading...</span>
                          </>
                        ) : (
                          "Grant Admin"
                        )}
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-[#ff5360] self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-xl">You have no users yet!</p>
      )}
      {/* delete modal */}
      <Modal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        popup
        size="sm"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-5 w-5 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-3 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button gradientMonochrome="failure" onClick={handleDeletePost}>
                Yes, I`m sure
              </Button>
              <Button color="gray" onClick={() => setIsDeleteModalOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* user status modal */}
      <Modal
        show={isUserStatusChangeModal}
        onClose={() => setIsUserStatusChangeModal(false)}
        popup
        size="sm"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-5 w-5 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-3 text-lg text-gray-500 dark:text-gray-400">
              Do You want change the user status ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                gradientMonochrome="failure"
                onClick={handleUserStatusChnage}
              >
                Yes, I`m sure
              </Button>
              <Button
                color="gray"
                onClick={() => setIsUserStatusChangeModal(false)}
              >
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
