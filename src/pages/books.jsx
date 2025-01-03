import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/layout";
import { configs } from "../config";
import { useSelector } from 'react-redux';


const Books = () => {

  const { user } = useSelector((state) => state.user)


  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    genre: "",
    category: "",
  });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${configs.baseUrl}/book`);
      const data = await response.json();
      if (data.ok) {
        setBooks(data.payLoad);
        setFilteredBooks(data.payLoad);
      } else {
        console.error("Failed to fetch books:", data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
        book.genre.toLowerCase().includes(filters.genre.toLowerCase()) &&
        book.category.toLowerCase().includes(filters.category.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [filters, books]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
    category: Yup.string().required("Category is required"),
    publicationYear: Yup.number()
      .required("Publication year is required")
      .min(0, "Year must be positive"),
    totalCopies: Yup.number()
      .required("Total copies are required")
      .min(1, "Must have at least 1 copy"),
  });

  const handleRegisterSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(`${configs.baseUrl}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.ok) {
        alert("Book added successfully");
        fetchBooks();
        setShowRegisterModal(false);
        resetForm();
      } else {
        alert("Failed to add the book. Please try again.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleEditSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(`${configs.baseUrl}/book/${editingBook._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.ok) {
        alert("Book updated successfully");
        fetchBooks();
        setShowEditModal(false);
        setEditingBook(null);
        resetForm();
      } else {
        alert("Failed to update the book. Please try again.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Books</h1>
        {/* userType: 'Admin', */}
        {user.userType === "Admin" && <Button
          color="blue"
          className="my-4"
          onClick={() => setShowRegisterModal(true)}
        >
          Register Book
        </Button>}

        {/* Filters */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          {["title", "author", "genre", "category"].map((filter) => (
            <TextInput
              key={filter}
              placeholder={`Filter by ${filter}`}
              value={filters[filter]}
              onChange={(e) =>
                setFilters({ ...filters, [filter]: e.target.value })
              }
            />
          ))}
        </div>

        {/* Book List */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Author</th>
                <th className="border border-gray-300 px-4 py-2">Genre</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
                <th className="border border-gray-300 px-4 py-2">Copies</th>
                {user.userType === "Admin" && <th className="border border-gray-300 px-4 py-2">Actions</th>}

              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.genre}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.category}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.publicationYear}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {book.copiesAvailable}/{book.totalCopies}
                  </td>

                  {user.userType === "Admin" && <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <Button
                      className="bg-blue-700"
                      onClick={() => {
                        setEditingBook(book);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>}

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Register Modal */}
        <Modal show={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
          <Modal.Header>Register Book</Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                title: "",
                author: "",
                genre: "",
                category: "",
                publicationYear: "",
                totalCopies: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleRegisterSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {["title", "author", "genre", "category"].map((field) => (
                    <div key={field} className="mb-4">
                      <Label htmlFor={field} value={field} />
                      <Field
                        id={field}
                        name={field}
                        as={TextInput}
                        placeholder={field}
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                  <div className="mb-4">
                    <Label htmlFor="publicationYear" value="Year" />
                    <Field
                      id="publicationYear"
                      name="publicationYear"
                      type="number"
                      as={TextInput}
                      placeholder="Year"
                    />
                    <ErrorMessage
                      name="publicationYear"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="totalCopies" value="Total Copies" />
                    <Field
                      id="totalCopies"
                      name="totalCopies"
                      type="number"
                      as={TextInput}
                      placeholder="Total Copies"
                    />
                    <ErrorMessage
                      name="totalCopies"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-bgDArk"
                    disabled={isSubmitting}
                  >
                    Register Book
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          <Modal.Header>Edit Book</Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                title: editingBook?.title || "",
                author: editingBook?.author || "",
                genre: editingBook?.genre || "",
                category: editingBook?.category || "",
                publicationYear: editingBook?.publicationYear || "",
                totalCopies: editingBook?.totalCopies || 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleEditSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  {["title", "author", "genre", "category"].map((field) => (
                    <div key={field} className="mb-4">
                      <Label htmlFor={field} value={field} />
                      <Field
                        id={field}
                        name={field}
                        as={TextInput}
                        placeholder={field}
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                  <div className="mb-4">
                    <Label htmlFor="publicationYear" value="Year" />
                    <Field
                      id="publicationYear"
                      name="publicationYear"
                      type="number"
                      as={TextInput}
                      placeholder="Year"
                    />
                    <ErrorMessage
                      name="publicationYear"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="totalCopies" value="Total Copies" />
                    <Field
                      id="totalCopies"
                      name="totalCopies"
                      type="number"
                      as={TextInput}
                      placeholder="Total Copies"
                    />
                    <ErrorMessage
                      name="totalCopies"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-bgDArk"
                    disabled={isSubmitting}
                  >
                    Update Book
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default Books;
