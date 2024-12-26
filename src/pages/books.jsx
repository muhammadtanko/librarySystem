import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";

const Books = () => {
  const [books, setBooks] = useState([]);

  // Dummy data for books
  useEffect(() => {
    const fetchBooks = () => {
      const dummyBooks = [
        {
          id: 1,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Fiction",
          category: "Classic",
          publicationYear: 1925,
          borrowedCount: 15,
        },
        {
          id: 2,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
          category: "Classic",
          publicationYear: 1960,
          borrowedCount: 10,
        },
        {
          id: 3,
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
          category: "Science Fiction",
          publicationYear: 1949,
          borrowedCount: 25,
        },
      ];
      setBooks(dummyBooks);
    };
    fetchBooks();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Book List</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Genre</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Borrowed Count</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.genre}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.category}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.publicationYear}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.borrowedCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No books available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Books;
