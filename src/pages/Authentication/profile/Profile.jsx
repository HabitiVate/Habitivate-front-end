import React, { useEffect, useState } from "react";
import { apiGetProfile } from "../../../services/profile";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState([]);

  const getUserAccount = async () => {
    try {
      const response = await apiGetProfile();
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAccount();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <img
          src={`https://savefiles.org/${userData.avatar}?shareable_link=471`} // Ensure user data contains profile picture URL
          alt="Profile Picture"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="text-sm text-gray-600">@{userData.userName}</p>
          <p className="text-sm text-gray-600">
            {userData.email || "Your personal habit tracker"}
          </p>
          <p className="text-sm text-gray-600">Date Created:{" "}
            {userData.createdAt || "Your personal habit tracker"}
          </p>
          <p className="text-sm text-gray-600">Date updated:{" "}
            {userData.updatedAt || "Your personal habit tracker"}
          </p>
          
        </div>
      </div>

     
      {/* Edit Profile Button */}
      <Link to={`/edit-profile/${userData._id}`} className="mt-6">
        <Button text="Edit Profile" />
      </Link>
    </div>
  );
};

export default Profile;
