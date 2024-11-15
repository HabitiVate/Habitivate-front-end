import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import formPic from "../../assets/Images/habit-stick.jpg"
import { apiPostTodos } from "../../services/todos";

const TodoPost = () => {
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Log each form field to confirm they are being captured
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        dueDate: formData.get("dueDate"),
        reminder: formData.get("reminder"),
      };

      const response = await apiPostTodos(data);
      console.log(response.data);
      toast.success("Successful");
      Navigate("/habits-dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create Todo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto space-y-4"
    >
      <div className="w-full">
        <img src={formPic} alt="" className="max-w-full max-h-full" />
      </div>
      <h2 className="text-xl font-semibold">Create Habit</h2>

      {/* Title Input */}
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g., Drink Water"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          type=""
          name="description"
          placeholder=""
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Reset Counter</label>
        <select
          name="category"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Education">Education</option>
          <option value="Fitness">Fitness</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Due Date</label>
        <input
          type="date"
          name="dueDate"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium">Reminder</label>
        <input
          type="date"
          name="reminder"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full">
        <Button text="Create" />
      </div>
    </form>
  );
};

export default TodoPost;
