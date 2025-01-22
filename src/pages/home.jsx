import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { configs } from "../config";
import { useSelector } from "react-redux";

export default function Home() {
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = useSelector((state) => state.user.user._id);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [statistics, setStatistics] = useState({
    totalBorrowed: 0,
    notReturned: 0,
    overdue: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${configs.baseUrl}/record/user/${currentUserId}`);
        const data = await response.json();
        if (data.ok) {
          const books = data.payLoad;
          setBorrowedBooks(books);
          const totalBorrowed = books.length;
          const notReturned = books.filter((book) => !book.returnedAt).length;
          const overdue = books.filter((book) => book.isOverdue).length;
          setStatistics({ totalBorrowed, notReturned, overdue });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBooks();
  }, []);

  const handlePayFine = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handlePay = async () => {
    try {
      const response = await fetch(`${configs.baseUrl}/record/pay-fine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId: selectedBook._id, userId: currentUserId }),
      });

      const result = await response.json();
      if (response.ok) {
        setBorrowedBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === selectedBook._id ? { ...book, finePaid: true } : book
          )
        );
        setIsModalOpen(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome to Your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Borrowed Books", value: statistics.totalBorrowed, color: "indigo-600" },
            { label: "Books Not Returned", value: statistics.notReturned, color: "red-600" },
            { label: "Overdue Books", value: statistics.overdue, color: "orange-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-600">{stat.label}</h2>
              <p className={`text-3xl font-extrabold text-${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Borrowed Books History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  {["Title", "Author", "Borrowed At", "Due Date", "Returned", "Overdue", "Action"].map(
                    (header) => (
                      <th
                        key={header}
                        className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{book.book?.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{book.book?.author}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(book.borrowedAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(book.dueDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {book.returnedAt
                        ? new Date(book.returnedAt).toLocaleDateString()
                        : "Not Returned"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {book.isOverdue ? (
                        <span className="text-red-600 font-semibold">Yes</span>
                      ) : (
                        "No"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {book.fineAmount > 0 && !book.finePaid ? (
                        <button
                          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
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

      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pay Fine for {selectedBook.book?.title}
            </h2>
            <p className="text-gray-600 mb-2">Fine Amount: ${selectedBook.fineAmount}</p>
            <p className="text-gray-600 mb-2">
              Due Date: {new Date(selectedBook.dueDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-4">
              Returned At:{" "}
              {selectedBook.returnedAt
                ? new Date(selectedBook.returnedAt).toLocaleDateString()
                : "Not Returned"}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
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
