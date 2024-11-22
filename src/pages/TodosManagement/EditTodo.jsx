import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { apiGetSingleTodo, apiUpdateTodo } from "../../services/todos";

const EditTodo = ({ todoId, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState();
  const [reminder, setReminder] = useState();
  // const [completed, setCompleted] = useState("")

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const fetchTodo = async () => {
    try {
      const response = await apiGetSingleTodo(todoId);
      const { title, description, category, dueDate, reminder } = response.data;
      setTitle(title);
      setDescription(description);
      setCategory(category);
      setDueDate(dueDate);
      setReminder(reminder);
    } catch (error) {
      console.log("Error fetching todo", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [todoId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await apiUpdateTodo(todoId, formData);
      toast.success("Todo updated successfully");
      closeModal(); // Close modal after save
    } catch (error) {
      console.log("Error updating todo", error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            defaultValue={title}
            name="title"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            required
            defaultValue={description}
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Repeat</label>
          <select
            value={category}
            onChange={handleChange}
            name="category"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
          >
            <option value="Education">Education</option>
            <option value="Fitness">Fitness</option>
            <option value="Task">Task</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Due Date
          </label>
          <input
            defaultValue={dueDate}
            name="dueDate"
            type="date"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Reminder
          </label>
          <input
            defaultValue={reminder}
            name="reminder"
            type="date"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
          />
        </div>

        <div className="flex justify-end">
          <Button text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
