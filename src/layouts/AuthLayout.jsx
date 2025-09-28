import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/authImg.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center">
      {/* Left side - Login/Register Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <Outlet />
      </div>

      {/* Right side - Image (on top in mobile) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <img
          src={authImg}
          alt="Auth Banner"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
