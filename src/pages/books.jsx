import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Label, Table } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/layout";
import { configs } from "../config";
import { useSelector } from "react-redux";

const Books = () => {
  const { user } = useSelector((state) => state.user);

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
        <h1 className="text-3xl font-bold mb-6">Books Management</h1>

        {user.userType === "Admin" && (
          <Button
            color="success"
            className="mb-6"
            onClick={() => setShowRegisterModal(true)}
          >
            Register New Book
          </Button>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
        <Table hoverable={true} className="mb-6">
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Genre</Table.HeadCell>
            <Table.HeadCell>ISBN</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Year</Table.HeadCell>
            <Table.HeadCell>Copies</Table.HeadCell>
            {user.userType === "Admin" && <Table.HeadCell>Actions</Table.HeadCell>}
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredBooks.map((book) => (
              <Table.Row key={book._id} className="hover:bg-gray-50">
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.genre}</Table.Cell>
                <Table.Cell>{book.isbn}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>{book.publicationYear}</Table.Cell>
                <Table.Cell>
                  {book.copiesAvailable}/{book.totalCopies}
                </Table.Cell>
                {user.userType === "Admin" && (
                  <Table.Cell>
                    <Button
                      color="info"
                      className="bg-bgDArk"
                      onClick={() => {
                        setEditingBook(book);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {/* Register Modal */}
        <Modal
          show={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
        >
          <Modal.Header>Register New Book</Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                title: "",
                author: "",
                genre: "",
                category: "",
                isbn: "",
                publicationYear: "",
                totalCopies: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleRegisterSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {["title", "author", "genre", "category","isbn"].map((field) => (
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
                    <Label htmlFor="publicationYear" value="Publication Year" />
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
                      placeholder="Copies"
                    />
                    <ErrorMessage
                      name="totalCopies"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <Button
                    type="submit"
                    color="success"

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
          <Modal.Header>Edit Book Details</Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                title: editingBook?.title || "",
                author: editingBook?.author || "",
                genre: editingBook?.genre || "",
                category: editingBook?.category || "",
                isbn: editingBook?.isbn || "",
                publicationYear: editingBook?.publicationYear || "",
                totalCopies: editingBook?.totalCopies || 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleEditSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  {["title", "author", "genre", "category","isbn"].map((field) => (
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
                    <Label htmlFor="publicationYear" value="Publication Year" />
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
                      placeholder="Copies"
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
                    color="info"
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
