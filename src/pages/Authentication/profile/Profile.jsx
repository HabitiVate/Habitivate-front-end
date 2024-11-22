import React, { useEffect, useState } from "react";
import { apiGetProfile } from "../../../services/profile";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import placeholderImg from "../../../assets/Images/placeholder-img.png";
import Modal from "react-modal";
import EditProfile from "./EditProfile";

Modal.setAppElement("#root");

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(placeholderImg);

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

  // Update imgSrc whenever userData.avatar changes
  useEffect(() => {
    if (userData.avatar) {
      setImgSrc(`https://savefiles.org/${userData.avatar}?shareable_link=471`);
    }
  }, [userData]);

  return (
    <div className="h-screen flex items-center">
      <div className="flex flex-col gap-4 p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <img
            src={imgSrc} // Dynamically set profile picture URL
            alt="Profile Picture"
            onError={() => setImgSrc(placeholderImg)}
            className="w-1/2 rounded max-w-full max-h-full"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-user"></i>
              <h1 className="text-2xl font-bold">
                {userData.firstName} {userData.lastName}
              </h1>
            </div>
            <p className="text-sm text-gray-600">@{userData.userName}</p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <i className="fa-regular fa-envelope"></i>
              {userData.email || "Your personal habit tracker"}
            </p>
            <p className="text-sm text-gray-600">
              Date Created:{" "}
              {userData.createdAt
                ? new Date(userData.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZoneName: "short",
                  })
                : "Your personal habit tracker"}
            </p>
            <p className="text-sm text-gray-600">
              Date Updated:{" "}
              {userData.updatedAt
                ? new Date(userData.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZoneName: "short",
                  })
                : "Your personal habit tracker"}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Link onClick={() => setIsProfileEditOpen(true)} className="mt-6">
          <Button text="Edit Profile" />
        </Link>

        <Modal
          isOpen={isProfileEditOpen}
          onRequestClose={() => setIsProfileEditOpen(false)}
          className="p-6 rounded shadow-lg max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-6"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <EditProfile
            onClose={() => {
              getUserAccount();
              setIsProfileEditOpen(false);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
