import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import HealthConnectLogo from "./HealthConnectLogo";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { HashLink } from "react-router-hash-link";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };


  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">
          Home
        </NavLink>
      </li>


      <li>
        <HashLink smooth to="/#about" className="hover:text-primary">
          About
        </HashLink>
      </li>

      <li>
        <HashLink smooth to="/#contact" className="hover:text-primary">
          Contact Us
        </HashLink>
      </li>


      {user && (
        <>
          <li>
            <NavLink to="/available-camps" className="hover:text-primary">
              Available Camps
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className="hover:text-primary">
              Blogs
            </NavLink>
          </li>
        </>
      )}


      {!user && (
        <li>
          <NavLink to="/login" className="hover:text-primary">
            Join Us
          </NavLink>
        </li>
      )}
    </>
  );

  const desktopProfileDropdown = (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border"
      >
        <img
          src={user?.photoURL || "https://i.ibb.co/2y8P4Qp/default-avatar.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </button>
      {dropdownOpen && user && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-3 z-50">
          <p className="font-medium mb-2">
            {user?.displayName || user?.email?.split("@")[0]}
          </p>
          <Link
            to="/dashboard"
            className="block px-3 py-1 hover:bg-gray-100 rounded"
            onClick={() => setDropdownOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-1 hover:bg-gray-100 rounded mt-1"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  const mobileProfileDropdown = (
    <div className="w-full border rounded-md shadow-lg p-3 mt-1">
      <span className="font-medium">
        {user?.displayName || user?.email?.split("@")[0] || "Guest"}
      </span>
      {user && (
        <>
          <Link
            to="/dashboard"
            className="block px-3 py-1 hover:bg-gray-100 rounded mb-1"
            onClick={() => setDropdownOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-1 hover:bg-gray-100 rounded"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <HealthConnectLogo />


          <ul className="hidden md:flex gap-6 items-center font-medium ml-auto">
            {navLinks}
            {user && desktopProfileDropdown}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md border border-gray-300"
            >
              ☰
            </button>
          </div>
        </div>


        {isOpen && (
          <ul className="md:hidden flex flex-col gap-4 mt-3 pb-4 font-medium border-t pt-3">
            {user && (
              <li className="flex flex-col gap-2">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/2y8P4Qp/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full border"
                  />
                </div>
                {dropdownOpen && mobileProfileDropdown}
              </li>
            )}
            {navLinks}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
