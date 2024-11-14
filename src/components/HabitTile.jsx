import { useState, useEffect, useRef } from "react";

const HabitTile = ({
  habit,
  onDelete,
  onEdit,
  onMoveToTop,
  onMoveToBottom,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

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

  return (
    <div
      className="relative bg-transparent border rounded-lg shadow-lg hover:border-[#95af00] hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg overflow-hidden">
        <div className="tile flex justify-center h-20">
          <span className="p-4 bg-[#F2BE02] text-white">
            <i className="fa-solid fa-plus"></i>
          </span>

          <p className="w-full px-2 py-1 bg-white">{habit.title}</p>

          <span className="p-4 bg-[#f2be02] text-white">
            <i className="fa-solid fa-minus"></i>
          </span>
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
              onClick={() => {
                onEdit();
                setShowOptions(false);
              }}
            >
              <i className="fa-solid fa-pen mr-2 text-gray-500"></i>Edit
            </li>
            <li
              className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => {
                onDelete(habit.id);
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
              <i class="fa-solid fa-arrow-up mr-2 text-gray-500"></i> Move up
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
    </div>
  );
};

export default HabitTile;
