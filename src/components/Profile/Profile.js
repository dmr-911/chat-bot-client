import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  return (
    <section className="bg-body md:py-16 h-[92.3vh] relative">
      {/* main chat section */}
      <div className="xl:w-[860px] h-full bg-white mx-auto rounded-xl flex flex-col">
        <div className="h-[180px] bg-green-800" />
        {/* details section */}
        <section className="flex flex-col text-left px-32 mt-24">
          <div className="w-full flex justify-between">
            <p className="text-3xl">K.M. Waliullah</p>
            <div className="h-[56px] w-[158px] bg-[#3E8A5F] text-white cursor-pointer flex justify-center items-center gap-2 rounded-md">
              <FaEdit className="text-2xl" />
              <span>Edit Profile</span>
            </div>
          </div>
          <div className="my-6">
            <span className="text-[#716A7D] text-sm">Email</span>
            <p className="text-[#142330] font-medium">
              kmwaliullah27@gmail.com
            </p>
          </div>
          <div className="my-6">
            <span className="text-[#716A7D] text-sm">Phone</span>
            <p className="text-[#142330] font-medium">000000000002020</p>
          </div>
          <div className="my-6">
            <span className="text-[#716A7D] text-sm">Address</span>
            <p className="text-[#142330] font-medium">Dhaka</p>
          </div>

          {/* logout button */}
          <div className="text-xl font-bold flex items-center gap-4 cursor-pointer">
            <HiOutlineLogout className="text-2xl" />
            <span>Log Out</span>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Profile;
