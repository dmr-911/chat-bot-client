import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
 const {user, logOut} = useAuth();


  return (
    <section className="bg-body md:py-16 relative">
    {/* <section className="bg-body md:py-16 h-[92.3vh] relative"> */}
      {/* main chat section */}
      <div className="xl:w-[860px] h-full bg-white mx-auto rounded-xl flex flex-col">
        <div className="h-[180px] bg-green-800" />
        {/* details section */}
        <section className="flex flex-col text-left px-32 mt-24">
          <div className="w-full flex justify-between">
            <p className="text-3xl">{user?.first_name}</p>
            <div className="h-[56px] w-[158px] bg-[#3E8A5F] text-white cursor-pointer flex justify-center items-center gap-2 rounded-md">
              <FaEdit className="text-2xl" />
              <span>Edit Profile</span>
            </div>
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
            <span className="cursor-pointer" onClick={()=> logOut()}>Log Out</span>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Profile;
