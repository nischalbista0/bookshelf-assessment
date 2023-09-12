import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  IoAddCircleSharp,
  IoChevronForward,
  IoRemoveCircleSharp,
} from "react-icons/io5";
import SearchIllustration from "../assets/images/search.png";

const SearchBody = ({
  isLoading,
  setIsLoading,
  existingBooks,
  handleBookshelf,
  handleTabClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const apiUrl = `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`;

    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        const bookData = response.data.docs;

        setSearchResults(bookData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [searchQuery, setIsLoading]);

  return (
    <div className="mt-5 mb-16 flex flex-col gap-8 md:mb-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 bg-dark-slate-85 dark:bg-black-75 flex items-center justify-between gap-2 px-4 py-2 rounded-full vsm:gap-4">
          <input
            type="text"
            placeholder="Search books by title"
            className="w-full bg-dark-slate-85 dark:bg-black-75 outline-none placeholder:font-light"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="focus:outline-none">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>

        <div className="w-[2px] h-[2.5rem] bg-purple-lighter"></div>

        <button
          className="self-end w-fit text-black text-sm flex items-center gap-0.5 bg-purple-lighter px-1 py-1.5 border border-black font-semibold transition duration-200 ease-linear hover:bg-purple-lighter-hover"
          onClick={() => handleTabClick("bookshelf")}
        >
          <IoChevronForward className="w-4 h-4" />
          <p className="font-bold">Bookshelf</p>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-purple-lighter"></div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 lg:col-span-2 2xl:col-span-3">
              <img
                src={SearchIllustration}
                alt=""
                className="w-[70vw] max-w-[300px]"
              />
              <p className="font-medium md-2:text-lg">
                No search results found.
              </p>
            </div>
          ) : (
            searchResults.map((book, index) => (
              <div
                key={index}
                className="bg-white p-4 flex flex-col gap-4 shadow-md rounded-md dark:bg-black-75"
              >
                <div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600">
                    <span className="text-purple-lighter font-medium">
                      Author:
                    </span>{" "}
                    {book.author_name}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-purple-lighter font-medium">
                      Edition Count:
                    </span>{" "}
                    {book.edition_count}
                  </p>
                </div>

                <button
                  onClick={() => handleBookshelf(book)}
                  className="w-fit self-center text-black text-sm flex items-center gap-0.5 bg-purple-lighter px-2 py-1.5 border border-black font-semibold transition duration-200 ease-linear hover:bg-purple-lighter-hover"
                >
                  {existingBooks.some((b) => b.key === book.key) ? (
                    <>
                      <IoRemoveCircleSharp className="w-4 h-4" />
                      <p className="font-bold">Remove from Bookshelf</p>
                    </>
                  ) : (
                    <>
                      <IoAddCircleSharp className="w-4 h-4" />
                      <p className="font-bold">Add to Bookshelf</p>
                    </>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBody;
