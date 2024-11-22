import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import { apiGetProfile, apiUpdateProfile } from "../../../services/profile";
import { useParams } from "react-router-dom";

const EditProfile = ({ onClose }) => {
  const { profileId } = useParams();
  const [userName, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Fetch user profile
  const getUserAccount = async () => {
    try {
      const response = await apiGetProfile(profileId);
      const { userName, avatar } = response.data;
      setUsername(userName);
      setAvatarPreview(avatar);
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
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName); 
    if (avatar instanceof File) {
      formData.append("avatar", avatar); 
    }

    try {
      await apiUpdateProfile(profileId, formData);
      console.log("api res",apiUpdateProfile)
      toast.success("Profile Updated");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Profile");
    }
  };

  return (
    <div className="flex max-w-md mx-auto h-screen items-center bg-transparent p-6 rounded-lg sm:max-w-lg md:max-w-xl lg:max-w-2xl">
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
            name="userName" 
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
            placeholder="Enter new username"
            required
          />
        </div>

        <div className="mb-4">
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
          )}
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
          />
        </div>

        <Button text="Save Changes" />
      </form>
    </div>
  );
};

export default EditProfile;