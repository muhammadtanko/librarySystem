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
    const { user } = useSelector((state) => state.user)
    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/";
    };


    // user.userType === "Admin" &&
    return (
        <Sidebar aria-label="Library Management Sidebar">
            <div className="flex flex-col h-[95vh] justify-between">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>


                        {user.userType === "Admin" && <Sidebar.Item as="div" icon={TbLayoutDashboardFilled}>
                            <Link to="/dashboard">Dashboard</Link>
                        </Sidebar.Item>}
                        {user.userType === "Admin" && <Sidebar.Item as="div" icon={MdAdminPanelSettings}>
                            <Link to="/admin">Admin</Link>
                        </Sidebar.Item>}
                        {user.userType === "Admin" && <Sidebar.Item as="div" icon={FaPlusCircle}>
                            <Link to="/books/return">Return Books</Link>
                        </Sidebar.Item>}

                        {user.userType === "Admin" && <Sidebar.Item as="div" icon={FaBookReader}>
                            <Link to="/books/borrow">Borrow Books</Link>
                        </Sidebar.Item>}

                        <Sidebar.Item as="div" icon={FaBook}>
                            <Link to="/books">Books</Link>
                        </Sidebar.Item>
                        <Sidebar.Item as="div" icon={FaHome}>
                            <Link to="/home">Home</Link>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>

                {/* Logout Button at the bottom */}
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as="button"
                        className="bg-red-600 text-white w-full"
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



// const userRole = "Admin"; // Replace with actual user role from Redux store
// {userRole === "Admin" && (
//     <Sidebar.Item as="div" icon={MdAdminPanelSettings}>
//         <Link to="/admin">Admin</Link>
//     </Sidebar.Item>
// )}