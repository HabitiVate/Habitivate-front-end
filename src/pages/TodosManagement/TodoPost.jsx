import { toast } from "react-toastify";
import Button from "../../components/Button";
import formPic from "../../assets/Images/habit-stick.jpg";
import { apiPostTodos } from "../../services/todos";

const TodoPost = ({ onClose }) => {
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
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create Todo");
    }
  };

  return (
    <div className=" flex justify-center py-4  shadow-lg  max-w-md mx-auto space-y-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 flex flex-col gap-1 w-[64%] rounded-lg"
      >
        <div className="w-full">
          <img src={formPic} alt="" className="max-w-full max-h-full" />
        </div>
        <h2 className="text-xl font-semibold">Create Todo</h2>

        {/* Title Input */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Drink Water"
            className="w-full text-sm p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            type=""
            name="description"
            placeholder=""
            className="w-full text-sm p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Reset Counter</label>
          <select
            name="category"
            className="text-sm w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
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
            className=" text-sm w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
          />
        </div>

        <div>
          <label className="block font-medium">Reminder</label>
          <input
            type="date"
            name="reminder"
            className="text-sm w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
          />
        </div>

        <div className="w-full">
          <Button text="Create" />
        </div>
      </form>
    </div>
  );
};

export default TodoPost;
