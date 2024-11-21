import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import { apiGetProfile, apiUpdateProfile } from "../../../services/profile";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const { profileId } = useParams();
  const [userName, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Fetch user profile
  const getUserAccount = async () => {
    try {
      const response = await apiGetProfile(profileId);
      const { userName, avatar } = response.data;
      setUsername(userName);
      setAvatar(avatar);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserAccount();
  }, [profileId]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await apiUpdateProfile(profileId, formData);
      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Profile");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username
          </label>
          <input
            id="userName"
            type="text"
            defaultValue={userName}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new userName"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="avatar"
            className="block text-gray-700 font-semibold mb-2"
          >
            Avatar
          </label>

          <div defaultValue={avatar}>

          </div>


          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <Button text="Save Changes" />
      </form>
    </div>
  );
};

export default EditProfile;
