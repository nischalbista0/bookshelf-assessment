import React, { useState } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";

const Header = (props) => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleAddBookClick = () => {
    props.openModal();
  };

  return (
    <header className="relative flex justify-between md:py-4 md:items-center md:after:bg-black md:after:dark:bg-white md:after:h-[1px] md:after:w-[100vw] md:after:absolute md:after:-left-10 md:after:bottom-0">
      <div className="flex flex-col">
        <p className="text-purple-lighter font-medium md:hidden">
          {props.pageInfo}
        </p>
        <h2 className="leading-tight text-2xl font-bold lg:text-3xl">
          {props.currentPage}
        </h2>
      </div>

      <div>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <div className="flex border border-black">
            <button
              className={`p-2 ${
                theme === "light" ? "bg-purple-lighter" : "dark:bg-dark-bg"
              } text-black dark:text-white`}
              onClick={handleThemeChange}
              data-testid="theme-sun-button"
            >
              <BsFillSunFill className="w-3.5 h-3.5" />
            </button>
            <button
              className={`p-2 ${
                theme === "light" ? "bg-light-bg" : "bg-purple-lighter"
              } text-black dark:text-white`}
              onClick={handleThemeChange}
              data-testid="theme-moon-button"
            >
              <BsMoonFill className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
