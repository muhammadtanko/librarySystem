import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'flowbite-react';

// Validation Schema
const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const [alert, setAlert] = useState({ type: '', message: '' });

    const handleLogin = (values) => {
        // Simulate login process
        if (values.username === 'admin' && values.password === 'password') {
            setAlert({ type: 'success', message: 'Login successful!' });
        } else {
            setAlert({ type: 'error', message: 'Invalid username or password.' });
        }
    };

    return (

        <div className="w-screen h-screen flex items-center justify-center">
            <div className=" w-full max-w-sm  p-4 border border-gray-200 bg-white shadow">
                <h2 className="text-lg font-semibold text-center mb-4">Login</h2>

                {/* Alert for success or error */}
                {alert.message && (
                    <Alert
                        color={alert.type === 'success' ? 'success' : 'failure'}
                        className="mb-4"
                    >
                        {alert.message}
                    </Alert>
                )}

                {/* Formik Form */}
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {/* Username Field */}
                            <div className="flex flex-col mb-4">
                                <label
                                    htmlFor="username"
                                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                >
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                                        <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-5 w-5"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                    </div>
                                    <Field
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        className={`text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:outline-none py-2 pr-2 pl-12 ${errors.username && touched.username
                                            ? 'border-red-500'
                                            : 'focus:border-indigo-400'
                                            }`}
                                    />
                                </div>
                                {errors.username && touched.username && (
                                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {errors.username}
                                    </span>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col mb-4">
                                <label
                                    htmlFor="password"
                                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
                                        <div className="flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full">
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-5 w-5"
                                            >
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className={`text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:outline-none py-2 pr-2 pl-12 ${errors.password && touched.password
                                            ? 'border-red-500'
                                            : 'focus:border-indigo-400'
                                            }`}
                                    />
                                </div>
                                {errors.password && touched.password && (
                                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
