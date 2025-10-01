import React, { useState } from "react";
import { NavLink, Outlet } from "react-router"; 
import { Menu, X } from 'lucide-react'; 

const OrganizerDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
     
      <div className="md:hidden p-4 bg-gray-800 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Organizer Dashboard</h2>
        <button onClick={toggleSidebar} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      <aside
        
        className={`fixed inset-y-0 left-0 z-30 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:w-64 bg-gray-800 text-white p-4 w-64 flex-shrink-0`}
      >
        
        <div className="flex justify-end mb-4 md:hidden">
            <button onClick={closeSidebar} className="p-1 text-white">
                <X size={24} />
            </button>
        </div>

        <h2 className="text-xl font-bold mb-6 hidden md:block">Organizer Dashboard</h2>
        <nav className="flex flex-col gap-3">
          
          <NavLink 
            to="profile" 
            onClick={closeSidebar}
            className={({ isActive }) => isActive ? 'text-indigo-400 font-semibold' : 'hover:text-gray-300'}
          >
            Profile
          </NavLink>
          <NavLink 
            to="add-camp" 
            onClick={closeSidebar}
            className={({ isActive }) => isActive ? 'text-indigo-400 font-semibold' : 'hover:text-gray-300'}
          >
            Add Camp
          </NavLink>
          <NavLink 
            to="manage-camps" 
            onClick={closeSidebar}
            className={({ isActive }) => isActive ? 'text-indigo-400 font-semibold' : 'hover:text-gray-300'}
          >
            Manage Camps
          </NavLink>
          <NavLink 
            to="registered-camps" 
            onClick={closeSidebar}
            className={({ isActive }) => isActive ? 'text-indigo-400 font-semibold' : 'hover:text-gray-300'}
          >
            Registered Camps
          </NavLink>
        </nav>
      </aside>

      
      <main className="flex-1 p-6 bg-gray-100 mt-16 md:mt-0">
        <Outlet />
      </main>

     
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default OrganizerDashboardLayout;