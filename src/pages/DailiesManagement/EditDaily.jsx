import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { apiGetSingleDaily, apiUpdateDaily } from "../../services/dailies";

const EditDaily = ({ dailyId, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [streak, setDueDate] = useState();
//   const [completed, setCompleted] = useState();


  const handleChange = (e) => {
    setTags(e.target.value);
  };

  const fetcDaily = async () => {
    try {
      const response = await apiGetSingleDaily(dailyId);
      const { title, description, tags, streak } = response.data;
      setTitle(title);
      setDescription(description);
      setTags(tags);
      setDueDate(streak);
    //   setCompleted(completed)
    } catch (error) {
      console.log("Error fetching daily", error);
    }
  };

  useEffect(() => {
    fetcDaily();
  }, [dailyId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await apiUpdateDaily(dailyId, formData);
      toast.success("Daily updated successfully");
      closeModal(); // Close modal after save
    } catch (error) {
      console.log("Error updating Daily", error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Daily</h2>
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
          <label className="block text-gray-700 font-medium mb-2">
            Tag
          </label>
          <input
            defaultValue={tags}
            name="tags"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Streak
          </label>
          <input
            defaultValue={streak}
            name="streak"
            type="number"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            completed
          </label>
          <input
            defaultValue={completed}
            name="completed"
            type="checkbox"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div> */}




        <div className="flex justify-end">
          <Button text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditDaily;
