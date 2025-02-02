import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Achievements({ auth, achievements, students = [] }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Achievements</h2>}
        >
            <Head title="Dashboard" />
{/* 
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Achievements</div>
                    </div>
                </div>
            </div>

            {achievements.map((achievement, index) => (
                <div key={achievement.id} className="py-12">
                    <p>id = {achievement.id}</p>
                    <p>percentage = {achievement.percentage}</p>
                </div>
            ))} */}
            <div className="p-6 text-gray-900">
                            {auth.user.is_teacher === 1 ? (
                                <div>
                                    <h3 className="text-lg font-semibold">Teacher's Achievements</h3>
                                    {students.length > 0 ? (
                                        students.map((student, index) => (
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
                                                            ? student.avatar
                                                            : "https://via.placeholder.com/150"
                                                    }
                                                    alt={student.name}
                                                    className="w-24 h-24 rounded-full object-cover mb-4"
                                                />
                                                {/* Naam */}
                                                <p className="text-lg font-semibold text-gray-700">
                                                    {student.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {student.class}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 col-span-full">
                                            No students found.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold">Student's Achievements</h3>
                                    {achievements.map((achievement, index) => (
                                        <div key={achievement.id} className="py-4">
                                            <p>ID: {achievement.id}</p>
                                            <p>Percentage: {achievement.percentage}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
            </div>

        </AuthenticatedLayout>
    );
}
