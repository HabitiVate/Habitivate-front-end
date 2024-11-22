import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { apiUpdateDaily } from "../services/dailies";
import EditDaily from "../pages/DailiesManagement/EditDaily";



Modal.setAppElement("#root"); // Set this to the root element of your app

const DailyTile = ({
  action,
  onDelete,
  onMoveToTop,
  onMoveToBottom,
  onRefresh,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const optionsRef = useRef(null);

  const handleToggleComplete = async () => {
    // Simulate an API call or update the state to toggle completion

    action.completed = !action.completed;
    const res = await apiUpdateDaily(action.id, { completed: action.completed });
    // console.log(res.data);
    // // if(res.status)
    onRefresh(); // Refresh todos to reflect changes
  };

  // Handle clicks outside the options menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
    setShowOptions(false); // Close options after clicking edit
  };

  // Function to close the modal
  const closeModal = () => {
    onRefresh();
    setIsModalOpen(false);
  };

  return action ? (
    <div
      className={`relative bg-transparent border rounded-lg shadow-lg hover:border-[#95af00] hover:shadow-xl transition-shadow duration-300 ${
        action.completed ? "bg-gray-200" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg overflow-hidden">
        <div className="tile flex justify-center h-20">
          <span className={` ${
              action.completed ? "bg-[#8a8a89]" : "bg-[#F2BE02]"}  p-4  text-white`}>
            <input
              checked={action.completed}
              onChange={handleToggleComplete}
              type="checkbox"
            />
          </span>

          <p
            className={`text-sm ${
              action.completed ? "line-through text-gray-500" : "text-black"
            } w-full px-2 py-1 bg-white flex flex-col`}
          >
            {action?.title || "Untitled"}
            <p className="text-xs text-end px-7 mr-10">Description: {action.description}</p>
        <p className="text-xs text-end px-7 mr-10 text-gray-400 font-bold flex justify-end items-center gap-4"><i className="fa-solid fa-forward"></i>{action.streak} {" "} <p className="italic bg-slate-100 px-2 rounded">#{action.tags}</p></p>
            
          </p>
        </div>
      </div>

      {/* Ellipsis Button */}
      {isHovered && (
        <div className="absolute top-2 right-16">
          <button onClick={() => setShowOptions(!showOptions)}>
            <i className="fa-solid fa-ellipsis-vertical text-gray-600 hover:text-gray-800 "></i>
          </button>
        </div>
      )}

      {/* Options Overlay */}
      {showOptions && (
        <div
          ref={optionsRef}
          className="absolute top-10 z-50 right-2 bg-white border rounded-md shadow-lg w-40"
        >
          <ul className="p-2 space-y-2">
            <li
              className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={openModal} // Open modal on edit
            >
              <i className="fa-solid fa-pen mr-2 text-gray-500"></i>Edit
            </li>

            <li
              className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => {
                onDelete(action.id);
                setShowOptions(false);
              }}
            >
              <i className="fa-solid fa-trash-can mr-2 text-red-500"></i>Delete
            </li>
            <li
              className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => {
                onMoveToTop();
                setShowOptions(false);
              }}
            >
              <i className="fa-solid fa-arrow-up mr-2 text-gray-500"></i> Move
              up
            </li>
            <li
              className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => {
                onMoveToBottom();
                setShowOptions(false);
              }}
            >
              <i className="fa-solid fa-arrow-down mr-2 text-gray-500"></i>Move
              Down
            </li>
          </ul>
        </div>
      )}

      {/* Edit Todo Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Todo"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-10"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        {/* Render the EditTodo component with the Todo ID */}
        <EditDaily dailyId={action.id} closeModal={closeModal} />
      </Modal>
    </div>
  ) : null;
};

export default DailyTile;
