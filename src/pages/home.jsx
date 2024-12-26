import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";

export default function Home() {
  // State for borrowed books, statistics
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [statistics, setStatistics] = useState({
    totalBorrowed: 0,
    notReturned: 0,
    overdue: 0,
  });

  useEffect(() => {
    // Fetch borrowed books and statistics (Replace with API call)
    const mockBorrowedBooks = [
      {
        id: "1",
        title: "Book One",
        author: "Author One",
        borrowedAt: "2024-12-01",
        dueDate: "2024-12-10",
        returnedAt: null,
        isOverdue: false,
      },
      {
        id: "2",
        title: "Book Two",
        author: "Author Two",
        borrowedAt: "2024-11-20",
        dueDate: "2024-11-30",
        returnedAt: "2024-12-02",
        isOverdue: true,
      },
      {
        id: "3",
        title: "Book Three",
        author: "Author Three",
        borrowedAt: "2024-12-05",
        dueDate: "2024-12-15",
        returnedAt: null,
        isOverdue: false,
      },
    ];

    const mockStatistics = {
      totalBorrowed: 3,
      notReturned: 2,
      overdue: 1,
    };

    setBorrowedBooks(mockBorrowedBooks);
    setStatistics(mockStatistics);
  }, []);

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Welcome to Your Dashboard</h1>

        {/* General Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Total Borrowed Books</h2>
            <p className="text-2xl font-bold text-indigo-600">{statistics.totalBorrowed}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Books Not Returned</h2>
            <p className="text-2xl font-bold text-red-600">{statistics.notReturned}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Overdue Books</h2>
            <p className="text-2xl font-bold text-orange-600">{statistics.overdue}</p>
          </div>
        </div>

        {/* Borrowed Books History */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Borrowed Books History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Title</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Author</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Borrowed At</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Due Date</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Returned</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Overdue</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="border border-gray-200 px-4 py-2">{book.title}</td>
                    <td className="border border-gray-200 px-4 py-2">{book.author}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {new Date(book.borrowedAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {new Date(book.dueDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {book.returnedAt
                        ? new Date(book.returnedAt).toLocaleDateString()
                        : "Not Returned"}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {book.isOverdue ? (
                        <span className="text-red-600 font-semibold">Yes</span>
                      ) : (
                        "No"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
