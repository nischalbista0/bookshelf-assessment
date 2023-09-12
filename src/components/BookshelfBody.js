import React from "react";
import { IoRemoveCircleSharp } from "react-icons/io5";

const BookshelfBody = ({ existingBooks, handleBookshelf }) => {
  return (
    <div className="mt-5 mb-16 flex flex-col gap-6 md:mb-5">
      <div className="grid gap-6 lg:grid-cols-2 md:gap-6 2xl:grid-cols-3">
        {existingBooks.length === 0 ? (
          <div>
            <p className="font-medium">
              Your <span className="text-purple-lighter">bookshelf</span> is
              empty. 😟
            </p>
          </div>
        ) : (
          existingBooks.map((book, index) => (
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
                <IoRemoveCircleSharp className="w-4 h-4" />
                <p className="font-bold">Remove from Bookshelf</p>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookshelfBody;
