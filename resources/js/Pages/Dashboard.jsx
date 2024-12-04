import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, student = [] }) {
    if (!auth || !auth.user) {
        return <h1>Unauthorized</h1>;
    }

    return (
        <>
            {auth.user.is_teacher ? (
                <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Teacher</h2>}
                >
                    <Head title="Dashboard" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            </div>
                            <div>
                                {student.length > 0 ? (
                                    student.map((student, index) => (
                                        <div key={index} className="p-4 bg-gray-400 mt-2 rounded">
                                            <p>Name: {student.name}</p>
                                            <p>Class: {student.class}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No students found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            ) : (
                <Link
                href={route('Student_Dashboard')}
                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    Ga terug
                </Link>
            )}
        </>
    );
}
