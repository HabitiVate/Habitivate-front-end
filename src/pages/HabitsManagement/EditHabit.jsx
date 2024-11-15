import { useEffect, useState } from "react";
import { apiGetSingleHabit, apiUpdateHabit } from "../../services/habits";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const EditHabit = ({ habitId, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const navigate = useNavigate()

  const handleChange = (e) => {
    setDuration(e.target.value);
  };

  const fetchHabit = async () => {
    try {
      const response = await apiGetSingleHabit(habitId);
      const { title, description, duration } = response.data;
      setTitle(title);
      setDescription(description);
      setDuration(duration);
    } catch (error) {
      console.log("Error fetching habit", error);
    }
  };

  useEffect(() => {
    fetchHabit();
  }, [habitId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await apiUpdateHabit(habitId, formData);
      toast.success("Habit updated successfully");
      closeModal(); // Close modal after save
      navigate("/habits-dashboard")

    } catch (error) {
      console.log("Error updating habit", error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Habit</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            defaultValue={title}
            name="title"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
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
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Repeat</label>
          <select
            value={duration}
            onChange={handleChange}
            name="duration"
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div className="flex justify-end">
          <Button text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditHabit;
