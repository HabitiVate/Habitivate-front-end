import { toast } from "react-toastify";
import Button from "../../components/Button";
import formPic from "../../assets/Images/habit-stick.jpg";
import { apiPostDaily } from "../../services/dailies";


const DailyPost = ({ onClose }) => {


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
        tags: formData.get("tags"),
        streak: formData.get("streak"),
      };

      const response = await apiPostDaily(data);
      console.log(response.data);
      toast.success("Successful");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create Daily");
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
      <h2 className="text-xl font-semibold">Create Daily</h2>

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
        <label className="block font-medium">Tag</label>
        <input
          type="text"
          name="tags"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium">Streak</label>
        <input
          type="number"
          name="streak"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      <div className="w-full">
        <Button text="Create" />
      </div>
    </form>
  );
};

export default DailyPost;
