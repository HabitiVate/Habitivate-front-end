import { toast } from "react-toastify";
import { apiPostHabits } from "../../services/habits";
import Button from "../../components/Button";
import formPic from "../../assets/Images/habit-stick.jpg";

const HabitsPost = ({ onClose }) => {
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
        duration: formData.get("duration"),
      };

      const response = await apiPostHabits(data);
      console.log(response.data);
      toast.success("Successful");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create habit");
    }
  };

  return (
    <div className=" flex w-[80%] justify-center mx-auto bg-transparent">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-4 shadow-lg rounded-lg ">
        <div className="w-full">
          <img
            src={formPic}
            alt="Habit Creation"
            className="max-w-full max-h-full rounded mb-4"
          />
        </div>
        <h2 className="text-xl font-semibold">Create Habit</h2>

        {/* Title Input */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Drink Water"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            type=""
            name="description"
            placeholder=""
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Reset Counter</label>
          <select
            name="duration"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#95af00]"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="w-full">
          <Button text="Create" />
        </div>
      </form>
    </div>
  );
};

export default HabitsPost;
