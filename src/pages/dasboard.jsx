import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { Spinner, Card, Alert } from "flowbite-react";
import { configs } from "../config";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${configs.baseUrl}/dashboard`);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }
        const { ok, payLoad } = await response.json();
        if (ok) {
          setDashboardData(payLoad);
        } else {
          throw new Error("Failed to fetch dashboard data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <h1 className="text-3xl font-extrabold text-indigo-800 mb-8 text-center">
          Library Management Dashboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Spinner size="xl" color="indigo" />
          </div>
        ) : error ? (
          <Alert color="failure">
            <span>{error}</span>
          </Alert>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Users */}
              <Card className="bg-indigo-50 shadow-lg border border-indigo-200">
                <h2 className="text-xl font-semibold text-indigo-700">Total Users</h2>
                <p className="text-4xl font-bold text-indigo-900">
                  {dashboardData.totalUsers}
                </p>
              </Card>

              {/* Total Books */}
              <Card className="bg-green-50 shadow-lg border border-green-200">
                <h2 className="text-xl font-semibold text-green-700">Total Books</h2>
                <p className="text-4xl font-bold text-green-900">
                  {dashboardData.totalBooks}
                </p>
              </Card>

              {/* Borrowed Books */}
              <Card className="bg-yellow-50 shadow-lg border border-yellow-200">
                <h2 className="text-xl font-semibold text-yellow-700">Borrowed Books</h2>
                <p className="text-4xl font-bold text-yellow-900">
                  {dashboardData.borrowedBooks}
                </p>
              </Card>

              {/* Overdue Books */}
              <Card className="bg-red-50 shadow-lg border border-red-200">
                <h2 className="text-xl font-semibold text-red-700">Overdue Books</h2>
                <p className="text-4xl font-bold text-red-900">
                  {dashboardData.overdueBooks}
                </p>
              </Card>
            </div>

            {/* Popular Books */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                Popular Books
              </h2>
              <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="table-auto w-full text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-indigo-100 border-b border-gray-200 text-indigo-800">
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Author</th>
                      <th className="px-4 py-3">Borrowed Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.popularBooks.map((book) => (
                      <tr
                        key={book._id}
                        className="hover:bg-indigo-50 border-b border-gray-200"
                      >
                        <td className="px-4 py-3 text-gray-700">{book.title}</td>
                        <td className="px-4 py-3 text-gray-700">{book.author}</td>
                        <td className="px-4 py-3 text-gray-700">
                          {book.borrowedCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
