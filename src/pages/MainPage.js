import axios from "axios";
import React, { useEffect, useState } from "react";
import BookshelfBody from "../components/BookshelfBody";
import Header from "../components/Header";
import HomepageBody from "../components/HomepageBody";
import SearchBody from "../components/SearchBody";
import Sidebar from "../components/Sidebar";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [existingBooks, setExistingBooks] = useState([]);

  useEffect(() => {
    const apiUrl =
      "https://openlibrary.org/search.json?q=YOUR_QUERY&limit=10&page=1";

    axios
      .get(apiUrl)
      .then((response) => {
        const bookData = response.data.docs.slice(0, 10);

        setBooks(bookData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });

    const existingBookshelf =
      JSON.parse(localStorage.getItem("bookshelf")) || [];
    setExistingBooks(existingBookshelf);
  }, []);

  const handleBookshelf = (book) => {
    const isBookInBookshelf = existingBooks.some((b) => b.key === book.key);

    if (!isBookInBookshelf) {
      const updatedBookshelf = [...existingBooks, book];
      setExistingBooks(updatedBookshelf);

      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    } else {
      const updatedBookshelf = existingBooks.filter((b) => b.key !== book.key);
      setExistingBooks(updatedBookshelf);

      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const tabConfig = {
    home: {
      header: "Homepage",
      pageInfo: "Some books for you",
      body: (
        <HomepageBody
          books={books}
          isLoading={isLoading}
          existingBooks={existingBooks}
          handleBookshelf={handleBookshelf}
        />
      ),
    },
    search: {
      header: "Search Books",
      pageInfo: "Search for books",
      body: (
        <SearchBody
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          existingBooks={existingBooks}
          handleBookshelf={handleBookshelf}
          handleTabClick={handleTabClick}
        />
      ),
    },
    bookshelf: {
      header: "Your Bookshelf",
      pageInfo: "View your books",
      body: (
        <BookshelfBody
          existingBooks={existingBooks}
          handleBookshelf={handleBookshelf}
        />
      ),
    },
  };

  const { header, pageInfo, body } = tabConfig[activeTab];

  return (
    <div className="flex w-screen overflow-x-hidden min-h-[100vh] bg-light-bg dark:bg-dark-bg">
      <Sidebar activeTab={activeTab} handleTabClick={handleTabClick} />

      <div className="flex flex-col justify-between text-black dark:text-white p-6 w-full md:ml-[280px] md:flex-1 md:relative md:px-6 md:py-0 lg:px-10">
        <div>
          <Header
            currentPage={header}
            pageInfo={pageInfo}
            handleTabClick={handleTabClick}
          />

          {body}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
