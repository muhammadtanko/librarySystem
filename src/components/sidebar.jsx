"use client";

import { Sidebar } from "flowbite-react";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBook, FaHome, FaPlusCircle, FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function SideBar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/";
    };

    return (
        <Sidebar aria-label="Library Management Sidebar" className="bg-gray-800 text-white">
            <div className="flex flex-col h-[95vh] justify-between w-64">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        {/* User Info */}
                        <div className="p-4 text-center text-lg font-semibold text-3xl">
                            <div className="text-teal-500 capitalize">{`${user.firstName}- ${user.lastName}`}</div>
                            <div className=" text-green-600 capitalize">{user.userType}</div>
                        </div>

                        {/* Admin-specific Links */}
                        {user.userType === "Admin" && (
                            <Sidebar.Item as="div" icon={TbLayoutDashboardFilled} className="hover:bg-gray-700">
                                <Link to="/dashboard">Dashboard</Link>
                            </Sidebar.Item>
                        )}
                        {user.userType === "Admin" && (
                            <Sidebar.Item as="div" icon={MdAdminPanelSettings} className="hover:bg-gray-700">
                                <Link to="/admin">Admin</Link>
                            </Sidebar.Item>
                        )}
                        {user.userType === "Admin" && (
                            <Sidebar.Item as="div" icon={FaPlusCircle} className="hover:bg-gray-700">
                                <Link to="/books/return">Return Books</Link>
                            </Sidebar.Item>
                        )}
                        {user.userType === "Admin" && (
                            <Sidebar.Item as="div" icon={FaBookReader} className="hover:bg-gray-700">
                                <Link to="/books/borrow">Borrow Books</Link>
                            </Sidebar.Item>
                        )}

                        {/* Common Links */}
                        <Sidebar.Item as="div" icon={FaBook} className="hover:bg-gray-700">
                            <Link to="/books">Books</Link>
                        </Sidebar.Item>
                        <Sidebar.Item as="div" icon={FaHome} className="hover:bg-gray-700">
                            <Link to="/home">Home</Link>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>

                {/* Logout Button */}
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as="button"
                        className="bg-red-600 text-white w-full hover:bg-red-700"
                        onClick={handleLogout}
                        icon={IoLogOutOutline}
                    >
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </div>
        </Sidebar>
    );
}
