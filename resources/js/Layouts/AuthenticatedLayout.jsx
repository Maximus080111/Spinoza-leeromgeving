import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar Navigatie with right rounded edges and shadow */}
            <nav className="bg-blue-200 w-64 min-h-screen border-r border-gray-100 flex flex-col rounded-r-xl shadow-2xl">
                {/* Navigatie Links */}
                <div className="flex-1 p-6 flex flex-col space-y-4">
                    <h1 className="text-xl font-bold text-gray-800 mb-2">
                        Menu
                    </h1>

                    {/* Gebruikersprofiel bovenaan */}
                    <div className="p-6 border-b">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex items-center cursor-pointer">
                                    <img
                                        src={user.avatar}
                                        alt="google_img"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="ml-3 text-gray-800 font-medium">
                                        {user.name}
                                    </span>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    {user.is_teacher == true ? (
                        <>
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="block py-3 px-5 rounded-lg text-xl text-gray-800 transition duration-200 ease-in-out hover:bg-blue-300 hover:text-gray-900"
                            >
                                Leerlingen
                            </NavLink>
                            <NavLink
                                href={route("Themas.index")}
                                active={route().current("Themas.index")}
                                className="block py-3 px-5 rounded-lg text-xl text-gray-800 transition duration-200 ease-in-out hover:bg-blue-300 hover:text-gray-900"
                            >
                                Thema's
                            </NavLink>
                        </>
                    ) : (
                        <NavLink
                            href={route("Student_Dashboard")}
                            active={route().current("Student_Dashboard")}
                            className="block py-3 px-5 rounded-lg text-xl text-gray-800 transition duration-200 ease-in-out hover:bg-blue-300 hover:text-gray-900"
                        >
                            Thema's
                        </NavLink>
                    )}

                    <NavLink
                        href={route("Achievements")}
                        active={route().current("Achievements")}
                        className="block py-3 px-5 rounded-lg text-xl text-gray-800 transition duration-200 ease-in-out hover:bg-blue-300 hover:text-gray-900"
                    >
                        Achievements
                    </NavLink>
                </div>
            </nav>

            {/* Hoofdinhoud */}
            <div className="flex-1">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}
