import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-camps" className="hover:text-primary">Available Camps</NavLink>
      </li>
      <li>
        <NavLink to="/join-us" className="hover:text-primary">Join Us</NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky py-2 top-0 z-50">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo + Website name */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="MCMS Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">HealthConnect</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center font-medium">{navLinks}</ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md border border-gray-300"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <ul className="md:hidden flex flex-col gap-4 mt-3 pb-4 font-medium border-t pt-3">
            {navLinks}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
