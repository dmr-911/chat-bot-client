import React, { useEffect, useRef, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ProfileLayout from "../ProfileLayout";
import Bot from "../../images/bot.png";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";

const Profile = () => {
  const { user, logOut } = useAuth();

  // image states
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState({
    selectedFile: null,
  });

  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  // File ref
  const fileRef = useRef();

  // image handler
  const handleImageChange = (e) => {
    setFile({ selectedFile: e.target.files[0] });
    setImage(e.target.files[0]);
  };

  const handleProfileClick = () => {
    fileRef.current.click();
  };

  const handleUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    console.log(image);

    // Update the formData object
    formData.append("myFile", file.selectedFile, file.selectedFile.name);
    formData.append("title", "Profile image");
    formData.append("body", "body");

    // Details of the uploaded file
    // console.log(file.selectedFile);
    // console.log("form data", ...formData);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    axios
      .put(
        `users/${user.id}/`,
        {
          profile_picture: formData,
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // image effect
  useEffect(() => {
    if (!image?.name) return;

    const newUrl = URL.createObjectURL(image);
    setImageUrl(newUrl);
  }, [image]);

  return (
    <ProfileLayout>
      {/* details section */}
      <section className="flex flex-col text-left px-4 md:px-32 my-24">
        <div className="w-full flex justify-between">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <div
                className="border-4 cursor-pointer border-black
             hover:border-gray-800 hover:bg-gray-200 p-2 rounded-full transition-all duration-150"
                onClick={handleProfileClick}
              >
                <img
                  src={imageUrl ? imageUrl : Bot}
                  alt="My profile"
                  className="w-14 h-14 rounded-full cursor-pointer"
                />
              </div>
              <p className="text-3xl">{user?.first_name}</p>
            </div>
            <div>
              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                onChange={handleImageChange}
                ref={fileRef}
                className="hidden"
              />
              {file.selectedFile && (
                <button
                  type="button"
                  onClick={handleUpload}
                  className="border-2 bg-[#3E8A5F] text-white px-4 py-2 hover:bg-green-800 transition-all duration-150"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
          <Link to="/edit-profile">
            <div className="h-[56px] w-[158px] bg-[#3E8A5F] text-white cursor-pointer flex justify-center items-center gap-2 rounded-md">
              <FaEdit className="text-2xl" />
              <span>Edit Profile</span>
            </div>
          </Link>
        </div>

        {/* name,email,phone part  */}

        <div className="my-3">
          <span className="text-[#716A7D] text-sm">First Name</span>
          <p className="text-[#142330] font-medium">{user?.first_name}</p>
        </div>
        <div className="my-3">
          <span className="text-[#716A7D] text-sm">Last Name</span>
          <p className="text-[#142330] font-medium">{user?.last_name}</p>
        </div>
        <div className="my-3">
          <span className="text-[#716A7D] text-sm">Email</span>
          <p className="text-[#142330] font-medium">{user?.username}</p>
        </div>
        <div className="my-3">
          <span className="text-[#716A7D] text-sm">Phone</span>
          <p className="text-[#142330] font-medium">{user?.phone_number}</p>
        </div>
        <div className="my-3">
          <span className="text-[#716A7D] text-sm">Address</span>
          <p className="text-[#142330] font-medium">Dhaka</p>
        </div>
        {/* logout button */}
        <div className="text-xl font-bold flex items-center text-red-600 mt-4">
          <HiOutlineLogout
            className="text-2xl cursor-pointer"
            onClick={() => logOut()}
          />
          <span className="cursor-pointer pl-2" onClick={() => logOut()}>
            Log Out
          </span>
        </div>
      </section>
    </ProfileLayout>
  );
};

export default Profile;
