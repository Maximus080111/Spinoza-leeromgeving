import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, student = [] }) {
    if (!auth || !auth.user) {
        return <h1>Unauthorized</h1>;
    }

    return (
        <>
            {auth.user.is_teacher ? (
                <AuthenticatedLayout
                    user={auth.user}
                    header={
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Dashboard
                        </h2>
                    }
                >
                    <Head title="Dashboard" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {student.length > 0 ? (
                                        student.map((student, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center p-4  rounded-lg shadow-md"
                                                style={{
                                                    backgroundColor: "#baaead",
                                                }}
                                            >
                                                {/* Ronde Avatar */}
                                                <img
                                                    src={
                                                        student.avatar
                                                            ? `/storage/images/${student.avatar}`
                                                            : "https://via.placeholder.com/150"
                                                    }
                                                    alt={student.name}
                                                    className="w-24 h-24 rounded-full object-cover mb-4"
                                                />
                                                {/* Naam */}
                                                <p className="text-lg font-semibold text-gray-700">
                                                    {student.name ||
                                                        "Naam onbekend"}
                                                </p>
                                                {/* Klas */}
                                                <p className="text-sm text-gray-500">
                                                    {student.class ||
                                                        "Geen klas opgegeven"}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 col-span-full">
                                            No students found.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            ) : (
                <Link
                    href={route("Student_Dashboard")}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    Ga terug
                </Link>
            )}
        </>
    );
}
