import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Achievements({ auth, achievements, students = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Achievements
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-6 text-gray-900">
                {auth.user.is_teacher === 1 ? (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Teacher's Achievements
                        </h3>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center p-4 rounded-lg shadow-md"
                                    style={{ backgroundColor: "#baaead" }}
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
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-lg font-semibold mb-4">
                            Student's Achievements
                        </h3>
                        {achievements.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {achievements.map((achievement) => {
                                    // Bepaal de medaille op basis van het percentage
                                    let medal, medalColor, progressColor;
                                    if (achievement.percentage === 100) {
                                        medal = "🥇"; // Gouden medaille
                                        medalColor = "bg-yellow-400 text-white";
                                        progressColor = "bg-yellow-500";
                                    } else if (achievement.percentage >= 80) {
                                        medal = "🥈"; // Zilveren medaille
                                        medalColor = "bg-gray-400 text-white";
                                        progressColor = "bg-gray-500";
                                    } else {
                                        medal = "🥉"; // Bronzen medaille
                                        medalColor = "bg-orange-500 text-white";
                                        progressColor = "bg-orange-600";
                                    }

                                    return (
                                        <div
                                            key={achievement.id}
                                            className="p-4 bg-[#bbc4dd] shadow-lg rounded-lg border border-gray-300"
                                        >
                                            {/* Achievement Info */}
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <p className="text-lg font-semibold text-gray-800">
                                                        ID: {achievement.id}
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        Percentage:{" "}
                                                        {achievement.percentage}
                                                        %
                                                    </p>
                                                </div>
                                                {/* Medaille in een cirkel */}
                                                <div
                                                    className={`w-16 h-16 flex items-center justify-center rounded-full ${medalColor} text-4xl`}
                                                >
                                                    {medal}
                                                </div>
                                            </div>

                                            {/* Voortgangsbalk */}
                                            <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${progressColor}`}
                                                    style={{
                                                        width: `${achievement.percentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No achievements found.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
