import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/layout";
import { configs } from "../config";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${configs.baseUrl}/user`);
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            console.log("Fetched users:", data);  // Log the data to check its structure
            // Ensure 'payLoad' is an array and update 'users' state
            setUsers(Array.isArray(data.payLoad) ? data.payLoad : []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle editing of a user
    const handleEditClick = (user) => {
        setCurrentUser(user);  // Set the current user for the modal
        setShowModal(true);     // Show the modal
    };

    // Handle user update
    const handleUpdate = async (values, { resetForm }) => {
        try {
            // Make the PUT request to update the user
            const response = await fetch(`${configs.baseUrl}/user/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), // Send form values as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            // Update local state only after the request succeeds
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === currentUser._id ? { ...user, ...values } : user
                )
            );

            // Close the modal and reset the form
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error updating user:', error);
            // Optionally show an error message to the user
        }
    };
    // Handle user registration
    const handleRegister = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${configs.baseUrl}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            const newUser = await response.json();
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setShowRegisterModal(false);
            resetForm();
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    // Validation schema for the form
    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        phone: Yup.string().required("Phone number is required"),
        userType: Yup.string().required("User type is required"),
        gender: Yup.string().required("Gender is required"),
        status: Yup.string().required("Status is required"),
    });

    // Validation schema for user registration
    const registerValidationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        ID: Yup.string().required("ID is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        phone: Yup.string().required("Phone number is required"),
        userType: Yup.string().required("User type is required"),
        gender: Yup.string().required("Gender is required"),
        status: Yup.string().required("Status is required"),
    });
    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">Admin Page</h1>
                <Button
                    className="mb-4 bg-bgDArk text-white"
                    onClick={() => setShowRegisterModal(true)}
                >
                    Register User
                </Button>
                <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">First Name</th>
                            <th className="border border-gray-300 px-4 py-2">Last Name</th>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                            <th className="border border-gray-300 px-4 py-2">User Type</th>
                            <th className="border border-gray-300 px-4 py-2">Gender</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.ID}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.userType}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.gender}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Button
                                        size="lg"
                                        color="blue"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Register User Modal */}
                <Modal show={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
                    <Modal.Header>Register User</Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                ID: "",
                                email: "",
                                password: "",
                                phone: "",
                                userType: "Student",
                                gender: "Male",
                                status: "Active",
                            }}
                            validationSchema={registerValidationSchema}
                            onSubmit={handleRegister}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <Label htmlFor="firstName" value="First Name" />
                                        <Field
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            as={TextInput}
                                            placeholder="First Name"
                                        />
                                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="lastName" value="Last Name" />
                                        <Field
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            as={TextInput}
                                            placeholder="Last Name"
                                        />
                                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="ID" value="ID" />
                                        <Field
                                            type="text"
                                            id="ID"
                                            name="ID"
                                            as={TextInput}
                                            placeholder="ID"
                                        />
                                        <ErrorMessage name="ID" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="email" value="Email" />
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            as={TextInput}
                                            placeholder="Email"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="password" value="Password" />
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            as={TextInput}
                                            placeholder="Password"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="phone" value="Phone" />
                                        <Field
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            as={TextInput}
                                            placeholder="Phone"
                                        />
                                        <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="userType" value="User Type" />
                                        <Field as="select" name="userType" id="userType" className="block w-full">
                                            <option value="Student">Student</option>
                                            <option value="Admin">Admin</option>
                                        </Field>
                                        <ErrorMessage name="userType" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="gender" value="Gender" />
                                        <Field as="select" name="gender" id="gender" className="block w-full">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="status" value="Status" />
                                        <Field as="select" name="status" id="status" className="block w-full">
                                            <option value="Active">Active</option>
                                            <option value="Disabled">Disabled</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="flex space-x-4 justify-end">
                                        <Button type="button" color="gray" onClick={() => setShowRegisterModal(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-bgDArk" disabled={isSubmitting}>
                                            Register
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Header>Edit User</Modal.Header>
                    <Modal.Body>
                        {currentUser && (
                            <Formik
                                initialValues={{
                                    firstName: currentUser.firstName,
                                    lastName: currentUser.lastName,
                                    email: currentUser.email,
                                    phone: currentUser.phone,
                                    userType: currentUser.userType,
                                    gender: currentUser.gender,
                                    status: currentUser.status,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleUpdate}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <Label htmlFor="firstName" value="First Name" />
                                            <Field
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                as={TextInput}
                                                placeholder="First Name"
                                            />
                                            <ErrorMessage
                                                name="firstName"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="lastName" value="Last Name" />
                                            <Field
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                as={TextInput}
                                                placeholder="Last Name"
                                            />
                                            <ErrorMessage
                                                name="lastName"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="email" value="Email" />
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                as={TextInput}
                                                placeholder="Email"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="phone" value="Phone" />
                                            <Field
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                as={TextInput}
                                                placeholder="Phone"
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="userType" value="User Type" />
                                            <Field
                                                as="select"
                                                name="userType"
                                                id="userType"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="Student">Student</option>
                                                <option value="Admin">Admin</option>
                                            </Field>
                                            <ErrorMessage
                                                name="userType"
                                                component="div"
                                                className="mt-1 text-sm text-red-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="gender" value="Gender" />
                                            <Field
                                                as="select"
                                                name="gender"
                                                id="gender"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Field>
                                            <ErrorMessage
                                                name="gender"
                                                component="div"
                                                className="mt-1 text-sm text-red-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Label htmlFor="status" value="Status" />
                                            <Field
                                                as="select"
                                                name="status"
                                                id="status"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </Field>
                                            <ErrorMessage
                                                name="status"
                                                component="div"
                                                className="mt-1 text-sm text-red-500"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <Button
                                                type="button"
                                                color="gray"
                                                className="bg-red-500"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="bg-bgDArk" disabled={isSubmitting}>
                                                Save Changes
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </Layout>
    );
};

export default AdminPage;
