import React, { useEffect, useState } from "react";
import { apiGetProfile } from "../../../services/profile";
import Button from "../../../components/Button";

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
          src={userData.avatar} // Ensure user data contains profile picture URL
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
        </div>
      </div>

      {/* Statistics Overview */}
      {/* <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold">Total Habits</h2>
          <p className="text-2xl font-bold">{userData.totalHabits}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold">Streaks</h2>
          <p className="text-2xl font-bold">{userData.streaks} Days</p>
        </div>
      </div> */}

      {/* Recent Activity */}
      {/* <div className="mt-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <ul className="mt-4 space-y-3">
          {userData.recentActivity.map((activity, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg shadow">
              <span className="font-bold">Completed:</span> {activity.title}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Edit Profile Button */}
      <div className="mt-6">
        <Button text="Edit Profile" />
      </div>
    </div>
  );
};

export default Profile;
