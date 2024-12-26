import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/layout";

export default function BorrowingRecords() {
  // Mock data for users and books (replace with actual data from your API)
  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ];
  const books = [
    { id: "1", title: "Book One" },
    { id: "2", title: "Book Two" },
  ];

  // Borrow Book initial values
  const initialBorrowValues = {
    user: "",
    book: "",
    dueDate: "",
  };

  // Return Book initial values
  const initialReturnValues = {
    borrowingId: "",
  };

  // Borrow Book validation schema
  const borrowValidationSchema = Yup.object({
    user: Yup.string().required("User is required"),
    book: Yup.string().required("Book is required"),
    dueDate: Yup.date()
      .required("Due date is required")
      .min(new Date(), "Due date must be in the future"),
  });

  // Return Book validation schema
  const returnValidationSchema = Yup.object({
    borrowingId: Yup.string().required("Borrowing record ID is required"),
  });

  // Handlers
  const handleBorrowSubmit = (values, { resetForm }) => {
    console.log("Borrow Record:", values);
    alert("Book borrowed successfully!");
    resetForm();
  };

  const handleReturnSubmit = (values, { resetForm }) => {
    console.log("Return Record:", values);
    alert("Book returned successfully!");
    resetForm();
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Borrowing and Returning Books</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Borrow Book Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Borrow a Book</h2>
            <Formik
              initialValues={initialBorrowValues}
              validationSchema={borrowValidationSchema}
              onSubmit={handleBorrowSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                      User
                    </label>
                    <Field
                      as="select"
                      name="user"
                      id="user"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a user</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="user"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="book" className="block text-sm font-medium text-gray-700">
                      Book
                    </label>
                    <Field
                      as="select"
                      name="book"
                      id="book"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a book</option>
                      {books.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.title}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="book"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                      Due Date
                    </label>
                    <Field
                      name="dueDate"
                      type="date"
                      id="dueDate"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="dueDate"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSubmitting ? "Processing..." : "Borrow Book"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Return Book Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Return a Book</h2>
            <Formik
              initialValues={initialReturnValues}
              validationSchema={returnValidationSchema}
              onSubmit={handleReturnSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="borrowingId" className="block text-sm font-medium text-gray-700">
                      Book Name
                    </label>
                    <Field
                      name="borrowingId"
                      type="text"
                      id="borrowingId"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="borrowingId"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSubmitting ? "Processing..." : "Return Book"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
}
