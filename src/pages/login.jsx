import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'flowbite-react';
import { loginUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state) => state.user);
    const loginStatus = useSelector((state) => state.user.isLoggedIn);

    const handleLogin = (values) => {
        dispatch(loginUser(values));
    };
    useEffect(() => {
        console.log("loginStatus", loginStatus);
        if (loginStatus === 'succeeded') {
            const timer = setTimeout(() => {
                navigate('/home');
            }, 3000);
            return () => clearTimeout(timer);

        }
    })
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-full max-w-sm p-4 border border-gray-200 bg-white shadow">
                <h2 className="text-lg font-semibold text-center mb-4 text-teal-600 ">Library Management System</h2>
                <h2 className="text-lg font-semibold text-center mb-4">Login</h2>

                {/* Alert for success or error */}
                {error && <Alert color="failure" className="mb-4">{error}</Alert>}
                {user && (
                    <Alert color="success" className="mb-4">
                        Welcome, {user.firstName} {user.lastName}!
                    </Alert>
                )}

                {/* Formik Form */}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => handleLogin(values)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            {/* Email Field */}
                            <div className="flex flex-col mb-4">
                                <label
                                    htmlFor="email"
                                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                >
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    className={`text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:outline-none py-2 pr-2 pl-4 ${errors.email && touched.email
                                        ? 'border-red-500'
                                        : 'focus:border-indigo-400'
                                        }`}
                                />
                                {errors.email && touched.email && (
                                    <span className="text-red-500 text-xs mt-1 ml-1">{errors.email}</span>
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
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className={`text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:outline-none py-2 pr-2 pl-4 ${errors.password && touched.password
                                        ? 'border-red-500'
                                        : 'focus:border-indigo-400'
                                        }`}
                                />
                                {errors.password && touched.password && (
                                    <span className="text-red-500 text-xs mt-1 ml-1">{errors.password}</span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-indigo-600 focus:outline-none"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
