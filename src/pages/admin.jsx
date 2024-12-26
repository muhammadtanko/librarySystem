import React, { useState } from "react";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/layout";

const AdminPage = () => {
    const [users, setUsers] = useState([
        // Dummy user data
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            ID: "12345",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            userType: "Admin",
            gender: "Male",
            status: "Active",
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            ID: "54321",
            email: "jane.smith@example.com",
            phone: "987-654-3210",
            userType: "Student",
            gender: "Female",
            status: "Active",
        },
    ]);

    const [showModal, setShowModal] = useState(false);

    const initialValues = {
        firstName: "",
        lastName: "",
        ID: "",
        email: "",
        password: "",
        phone: "",
        userType: "Student",
        gender: "",
        status: "Active",
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        ID: Yup.string().required("ID is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        phone: Yup.string().required("Phone number is required"),
        userType: Yup.string().required("User type is required"),
        gender: Yup.string().required("Gender is required"),
    });

    const handleRegister = (values, { resetForm }) => {
        const newUser = { id: users.length + 1, ...values };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setShowModal(false);
        resetForm();
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">Admin Page</h1>
                <Button color="blue" onClick={() => setShowModal(true)}>Register User</Button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.ID}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.userType}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.gender}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Header>Register New User</Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
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
                                        <Label htmlFor="ID" value="ID" />
                                        <Field type="text" id="ID" name="ID" as={TextInput} placeholder="ID" />
                                        <ErrorMessage
                                            name="ID"
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
                                        <Label htmlFor="password" value="Password" />
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            as={TextInput}
                                            placeholder="Password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="phone" value="Phone" />
                                        <Field type="text" id="phone" name="phone" as={TextInput} placeholder="Phone" />
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="userType" value="User Type" />
                                        <Field as="select" name="userType" id="userType" className="form-select">
                                            <option value="Student">Student</option>
                                            <option value="Admin">Admin</option>
                                        </Field>
                                        <ErrorMessage
                                            name="userType"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="gender" value="Gender" />
                                        <Field as="select" name="gender" id="gender" className="form-select">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                        <ErrorMessage
                                            name="gender"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="status" value="Status" />
                                        <Field as="select" name="status" id="status" className="form-select">
                                            <option value="Active">Active</option>
                                            <option value="Disabled">Disabled</option>
                                        </Field>
                                    </div>
                                    <div className="mt-4">
                                        <Button className="bg-bgDArk" type="submit" disabled={isSubmitting}>
                                            Register
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </div >
        </Layout>
    );
};

export default AdminPage;
