import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import ProfileLayout from "../ProfileLayout";

const Profile = () => {
 const {user, logOut} = useAuth();


  return (
    <ProfileLayout>
        {/* details section */}
        <section className="flex flex-col text-left px-4 md:px-32 mt-24">
          <div className="w-full flex justify-between">
            <p className="text-3xl">{user?.first_name}</p>
            <Link to="/edit-profile">
            <div className="h-[56px] w-[158px] bg-[#3E8A5F] text-white cursor-pointer flex justify-center items-center gap-2 rounded-md">
              <FaEdit className="text-2xl" />
              <span>Edit Profile</span>
            </div>
            </Link>
          </div>
          <div className="my-6">
            <span className="text-[#716A7D] text-sm">Email</span>
            <p className="text-[#142330] font-medium">
              {user?.username}
            </p>
          </div>
          <div className="my-6">
            <span className="text-[#716A7D] text-sm">Phone</span>
            <p className="text-[#142330] font-medium">{user?.phone_number}</p>
          </div>
          <div className="my-6">
            <span className="text-[#716A7D] text-sm">Address</span>
            <p className="text-[#142330] font-medium">Dhaka</p>
          </div>

          {/* logout button */}
          <div className="text-xl font-bold flex items-center pb-8">
            <HiOutlineLogout className="text-2xl cursor-pointer" onClick={()=> logOut()}/>
            <span className="cursor-pointer pl-2" onClick={()=> logOut()}>Log Out</span>
          </div>
        </section>
        </ProfileLayout>
  );
};

export default Profile;
