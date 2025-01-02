import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { configs } from "../config";

export default function Home() {
  // State for borrowed books, statistics, and modal visibility
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [statistics, setStatistics] = useState({
    totalBorrowed: 0,
    notReturned: 0,
    overdue: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch borrowed books and statistics from API
    const fetchBooks = async () => {
      try {
        const userId = "6775850a543ad6edf4304ebc"; // example user ID
        const response = await fetch(`${configs.baseUrl}/record/user/${userId}`);
        const data = await response.json();
        console.log(data);
        if (data.ok) {
          const books = data.payLoad;
          setBorrowedBooks(books);

          // Calculate statistics
          const totalBorrowed = books.length;
          const notReturned = books.filter(book => !book.returnedAt).length;
          const overdue = books.filter(book => book.isOverdue).length;

          setStatistics({ totalBorrowed, notReturned, overdue });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBooks();
  }, []);

  const handlePayFine = (book) => {
    // Open the modal and set the selected book to populate the modal
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handlePay = () => {
    // Handle the logic to pay the fine, e.g., making an API request to update fine status
    console.log(`Pay fine for book ${selectedBook._id}`);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => (
                  <tr key={book._id}>
                    <td className="border border-gray-200 px-4 py-2">{book.book?.title}</td>
                    <td className="border border-gray-200 px-4 py-2">{book.book?.author}</td>
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
                    <td className="border border-gray-200 px-4 py-2">
                      {book.fineAmount > 0 && !book.finePaid ? (
                        <button
                          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                          onClick={() => handlePayFine(book)}
                        >
                          Pay Fine
                        </button>
                      ) : (
                        "No Fine"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for paying fine */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pay Fine for {selectedBook.book?.title}</h2>
            <div className="mb-4">
              <p className="text-gray-600">Fine Amount: ${selectedBook.fineAmount}</p>
              <p className="text-gray-600">Due Date: {new Date(selectedBook.dueDate).toLocaleDateString()}</p>
              <p className="text-gray-600">Returned At: {selectedBook.returnedAt ? new Date(selectedBook.returnedAt).toLocaleDateString() : "Not Returned"}</p>
            </div>
            <div className="flex justify-between">
              <button
                className="text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={handlePay}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
