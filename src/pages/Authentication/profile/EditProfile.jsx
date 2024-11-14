import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/Button";


const EditProfile = () => {

    



  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update profile here
    toast.success("Profile updated successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 font-semibold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter new username"
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
  );
};

export default EditProfile;
