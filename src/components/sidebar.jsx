"use client";

import { Sidebar } from "flowbite-react";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBook, FaHome, FaPlusCircle, FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdAdminPanelSettings } from "react-icons/md";

export default function SideBar() {
   

    return (
        <Sidebar aria-label="Library Management Sidebar">
            <div className="flex flex-col h-[95vh] justify-between">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        {/* Library Dashboard */}
                        <Sidebar.Item as="div" icon={TbLayoutDashboardFilled}>
                            <Link to="/dashboard">Dashboard</Link>
                        </Sidebar.Item>

                        {/* User Home */}
                        <Sidebar.Item as="div" icon={FaHome}>
                            <Link to="/">Home</Link>
                        </Sidebar.Item>

                        {/* Admin Page */}
                        <Sidebar.Item as="div" icon={MdAdminPanelSettings}>
                            <Link to="/admin">Admin</Link>
                        </Sidebar.Item>

                        {/* View All Books */}
                        <Sidebar.Item as="div" icon={FaBook}>
                            <Link to="/books">Books</Link>
                        </Sidebar.Item>

                        {/* Register New Books */}
                        <Sidebar.Item as="div" icon={FaPlusCircle}>
                            <Link to="/books/register">Register Books</Link>
                        </Sidebar.Item>

                        {/* Borrow/Return Books */}
                        <Sidebar.Item as="div" icon={FaBookReader}>
                            <Link to="/books/borrow">Borrow/Return Books</Link>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>

                {/* Logout Button at the bottom */}
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        as="button"
                        className="bg-red-600 text-white w-full"
                        // onClick={handleLogout}
                        icon={IoLogOutOutline}
                    >
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </div>
        </Sidebar>
    );
}
