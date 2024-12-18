import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar Navigatie with right rounded edges and shadow */}
            <nav
                style={{ backgroundColor: "#92A2C9" }}
                className=" w-60 max-h-screen mt-4 mb-4  border-r border-gray-100 flex flex-col ml-4 rounded-r-xl rounded-l-xl shadow-2xl drop-shadow-2xl"
            >
                {/* Navigatie Links */}
                <div className="flex-1 p-6 flex flex-col space-y-4">
                    <h1 className="font-roboto text-2xl font-bold text-gray-800 mb-2">
                        Menu
                    </h1>

                    {/* Gebruikersprofiel bovenaan */}
                    <div className="p-6 border-b-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="font-roboto inline-flex items-center cursor-pointer">
                                    <img
                                        src={user.avatar}
                                        alt="google_img"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="ml-3 text-gray-800 text-sm">
                                        {user.name}
                                    </span>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content className="w-64 bg-white rounded-lg shadow-lg p-4 font-roboto text-gray-700">
                                <Dropdown.Link
                                    href={route("profile.edit")}
                                    className="block py-2.5 px-4 hover:bg-[#2f3e60] rounded-md text-lg"
                                >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block py-2.5 px-4 hover:bg-[#c5d3d4] rounded-md text-lg"
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
                                className=" font-roboto block pt-6 py-8 px-5 rounded-lg text-3xl text-gray-800 transition duration-200 ease-in-out hover:bg-[#D7DBEA] hover:text-gray-900"
                            >
                                Leerlingen
                            </NavLink>

                            <NavLink
                                href={route("Themas.index")}
                                active={route().current("Themas.index")}
                                className=" font-roboto block pt-6 py-8 px-5 rounded-lg text-3xl text-gray-800 transition duration-200 ease-in-out hover:bg-[#D7DBEA] hover:text-gray-900"
                            >
                                Thema's
                            </NavLink>
                        </>
                    ) : (
                        <NavLink
                            href={route("Student_Dashboard")}
                            active={route().current("Student_Dashboard")}
                            className="font-roboto block pt-6 py-8 px-5 rounded-lg text-3xl text-gray-800 transition duration-200 ease-in-out hover:bg-[#D7DBEA] hover:text-gray-900"
                        >
                            Thema's
                        </NavLink>
                    )}

                    <NavLink
                        href={route("Achievements")}
                        active={route().current("Achievements")}
                        className="font-roboto block pt-6 py-8 px-5 rounded-lg text-3xl text-gray-800 transition duration-200 ease-in-out hover:bg-[#D7DBEA] hover:text-gray-900"
                    >
                        Achievements
                    </NavLink>
                    <NavLink
                        href={route("Vraag")}
                        active={route().current("Vraag")}
                        className="font-roboto block pt-6 py-8 px-5 rounded-lg text-3xl text-gray-800 transition duration-200 ease-in-out hover:bg-[#D7DBEA] hover:text-gray-900"
                    >
                        Quiz vraag
                    </NavLink>
                    <NavLink
                        href={route("Vraag1")}
                        active={route().current("Vraag1")}
                        className="font-roboto block pt-6 py-8 px-5 rounded-lg text-3xl text-gray-800 transition duration-200 ease-in-out hover:bg-[#D7DBEA] hover:text-gray-900"
                    >
                        Sleep vraag
                    </NavLink>
                    <NavLink
                        href={route("LessonsMaken.index")}
                        active={route().current("LessonsMaken.index")}
                        className="font-roboto block pt-6 py-8 px-5 rounded-lg text-3xl text-gray-800 transition duration-200 ease-in-out hover:bg-[#D7DBEA] hover:text-gray-900"
                    >
                        Les Maken
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

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
