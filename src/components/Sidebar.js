import React from "react";
import { FiBook, FiHome, FiSearch } from "react-icons/fi";

const Sidebar = ({ activeTab, handleTabClick }) => {
  return (
    <div className="fixed z-20 bg-white dark:bg-black bottom-0 w-full md:bg-black md:w-[280px] md:min-h-[100vh] md:flex md:flex-col md:justify-between md:py-0">
      <div className="md:mt-10 md:flex md:flex-col md:gap-10">
        <nav className="w-full md:px-4">
          <p className="hidden text-white opacity-75 mb-2 md:block md:ml-4">
            Navigation
          </p>

          <ul className="flex items-center justify-between px-6 py-4 border-t md:flex-col md:gap-2 md:items-start md:border-none md:p-0">
            <li
              className={`relative hover:text-purple-lighter hover:dark:text-purple-lighter cursor-pointer transition duration-200 ease-linear md:flex md:items-center md:gap-3 md:w-full md:px-4 md:py-2.5 md:rounded-md md:hover:bg-dark-bg ${
                activeTab === "home"
                  ? "text-purple-lighter dark:text-purple-lighter md:text-purple-lighter md:bg-dark-bg"
                  : "text-black md:text-white dark:text-white"
              }`}
              onClick={() => handleTabClick("home")}
            >
              <FiHome className="w-5 h-5" />
              <p className="hidden font-semibold md:block">Homepage</p>

              {activeTab === "home" && (
                <div className="md:bg-purple-lighter h-full w-[2px] absolute left-0"></div>
              )}
            </li>

            <li
              className={`relative hover:text-purple-lighter hover:dark:text-purple-lighter cursor-pointer transition duration-200 ease-linear md:flex md:items-center md:gap-3 md:w-full md:px-4 md:py-2.5 md:rounded-md md:hover:bg-dark-bg ${
                activeTab === "search"
                  ? "text-purple-lighter dark:text-purple-lighter md:text-purple-lighter md:bg-dark-bg"
                  : "text-black md:text-white dark:text-white"
              }`}
              onClick={() => handleTabClick("search")}
            >
              <FiSearch className="w-5 h-5" />
              <p className="hidden font-semibold md:block">Search Books</p>

              {activeTab === "search" && (
                <div className="md:bg-purple-lighter h-full w-[2px] absolute left-0"></div>
              )}
            </li>

            <li
              className={`relative hover:text-purple-lighter hover:dark:text-purple-lighter cursor-pointer transition duration-200 ease-linear md:flex md:items-center md:gap-3 md:w-full md:px-4 md:py-2.5 md:rounded-md md:hover:bg-dark-bg ${
                activeTab === "bookshelf"
                  ? "text-purple-lighter dark:text-purple-lighter md:text-purple-lighter md:bg-dark-bg"
                  : "text-black md:text-white dark:text-white"
              }`}
              onClick={() => handleTabClick("bookshelf")}
            >
              <FiBook className="w-5 h-5" />
              <p className="hidden font-semibold md:block">Your Bookshelf</p>

              {activeTab === "bookshelf" && (
                <div className="md:bg-purple-lighter h-full w-[2px] absolute left-0"></div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
