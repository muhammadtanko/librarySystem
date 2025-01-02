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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Library Management Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Spinner size="xl" />
          </div>
        ) : error ? (
          <Alert color="failure">
            <span>{error}</span>
          </Alert>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Total Users */}
              <Card>
                <h2 className="text-xl font-bold">Total Users</h2>
                <p className="text-3xl">{dashboardData.totalUsers}</p>
              </Card>

              {/* Total Books */}
              <Card>
                <h2 className="text-xl font-bold">Total Books</h2>
                <p className="text-3xl">{dashboardData.totalBooks}</p>
              </Card>

              {/* Borrowed Books */}
              <Card>
                <h2 className="text-xl font-bold">Borrowed Books</h2>
                <p className="text-3xl">{dashboardData.borrowedBooks}</p>
              </Card>

              {/* Overdue Books */}
              <Card>
                <h2 className="text-xl font-bold">Overdue Books</h2>
                <p className="text-3xl">{dashboardData.overdueBooks}</p>
              </Card>
            </div>

            {/* Popular Books */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Popular Books</h2>
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-4 py-2">Title</th>
                      <th className="px-4 py-2">Author</th>
                      <th className="px-4 py-2">Borrowed Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.popularBooks.map((book) => (
                      <tr
                        key={book._id}
                        className="hover:bg-gray-50 border-b border-gray-200"
                      >
                        <td className="px-4 py-2">{book.title}</td>
                        <td className="px-4 py-2">{book.author}</td>
                        <td className="px-4 py-2">{book.borrowedCount}</td>
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
