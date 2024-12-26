import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/layout";

export default function RegisterBooks() {
  // Initial form values
  const initialValues = {
    title: "",
    author: "",
    genre: "",
    category: "",
    publicationYear: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
    category: Yup.string().required("Category is required"),
    publicationYear: Yup.number()
      .required("Publication year is required")
      .min(1000, "Enter a valid year")
      .max(new Date().getFullYear(), "Publication year cannot be in the future"),
  });

  // Form submission handler
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Data:", values);
    alert("Book registered successfully!");
    resetForm();
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Register Book</h1>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    id="title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <Field
                    name="author"
                    type="text"
                    id="author"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                    Genre
                  </label>
                  <Field
                    name="genre"
                    type="text"
                    id="genre"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="genre"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <Field
                    name="category"
                    type="text"
                    id="category"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700">
                    Publication Year
                  </label>
                  <Field
                    name="publicationYear"
                    type="number"
                    id="publicationYear"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="publicationYear"
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
                    {isSubmitting ? "Registering..." : "Register Book"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
