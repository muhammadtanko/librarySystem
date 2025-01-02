import React, { useState, useEffect } from "react";
import Layout from "../layout/layout";
import { configs } from "../config";

export default function ReturnBooks() {
  const [borrowingRecords, setBorrowingRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    const fetchBorrowingRecords = async () => {
      try {
        const response = await fetch(`${configs.baseUrl}/record`);
        if (!response.ok) {
          throw new Error("Failed to fetch borrowing records");
        }

        const data = await response.json();
        if (data.ok && Array.isArray(data.payLoad)) {
          setBorrowingRecords(data.payLoad);
          setFilteredRecords(data.payLoad); // Initialize filtered records
        } else {
          alert("Failed to fetch borrowing records");
        }
      } catch (error) {
        console.error("Error fetching borrowing records:", error);
      }
    };

    const fetchUsersAndBooks = async () => {
      try {
        const [usersResponse, booksResponse] = await Promise.all([
          fetch(`${configs.baseUrl}/user`),
          fetch(`${configs.baseUrl}/book`),
        ]);

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData.payLoad || []);
        }

        if (booksResponse.ok) {
          const booksData = await booksResponse.json();
          setBooks(booksData.payLoad || []);
        }
      } catch (error) {
        console.error("Error fetching users and books:", error);
      }
    };

    fetchBorrowingRecords();
    fetchUsersAndBooks();
  }, []);

  const handleFilter = () => {
    const filtered = borrowingRecords.filter(
      (record) =>
        (selectedUser ? record.user?._id === selectedUser : true) &&
        (selectedBook ? record.book?._id === selectedBook : true)
    );
    setFilteredRecords(filtered);
  };

  const handleReturnBook = async (recordId) => {
    setLoading(true);
    try {
      const response = await fetch(`${configs.baseUrl}/record/return`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({recordId}),
      });

      const data = await response.json();
      console.log("data", data);
      if (data.ok) {
        alert("Book returned successfully");
        setFilteredRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== recordId)
        );
        setBorrowingRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== recordId)
        );
      } else {
        alert(data.message || "Failed to return the book");
      }
    } catch (error) {
      console.error("Error returning the book:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Return Books</h1>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Filter by User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>

            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Filter by Book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleFilter}
            className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Apply Filters
          </button>
        </div>

        {filteredRecords.length === 0 ? (
          <p className="text-gray-600">No borrowing records found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecords.map((record) => (
              <div
                key={record._id}
                className={`p-6 rounded-lg shadow flex flex-col justify-between ${record.returnedAt ? "bg-green-100" : "bg-white"
                  }`}
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-700">
                    {record.book?.title} by {record.book?.author}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Borrowed by: {record.user?.firstName} {record.user?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Borrowed At: {new Date(record.borrowedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Due Date: {new Date(record.dueDate).toLocaleDateString()}
                  </p>
                  {record.isOverdue && (
                    <p className="text-sm text-red-500 mt-1">Overdue! Fine: ${record.fineAmount}</p>
                  )}
                  {record.returnedAt && (
                    <p className="text-sm text-green-600 mt-1">
                      Returned At: {new Date(record.returnedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleReturnBook(record._id)}
                  disabled={!!record.returnedAt || loading}
                  className={`mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm ${record.returnedAt
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 focus:ring focus:ring-indigo-200"
                    }`}
                >
                  {record.returnedAt ? "Already Returned" : loading ? "Processing..." : "Return Book"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
