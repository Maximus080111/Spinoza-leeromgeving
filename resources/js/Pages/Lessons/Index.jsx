import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect } from "react";

export default function Index({ auth, progress, lessons = [], thema_id }) {
    const getProgressForLesson = (lessonId) => {
        return progress[lessonId] || 0;
    };

    useEffect(() => {
        console.log("Progress", progress);
    }, [progress]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#b6c0db",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "16px",
                            position: "absolute",
                            marginTop: "70px",
                        }}
                    >
                        ←
                    </button>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Lessen
                    </h2>
                </div>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {lessons.length > 0 ? (
                                <ul>
                                    {lessons.map((lesson, index) => {
                                        const progressValue =
                                            getProgressForLesson(lesson.id);

                                        // Kleur van de voortgangsbalk bepalen
                                        let progressColor = "bg-gray-400"; // Standaard grijs
                                        if (progressValue === 100) {
                                            progressColor = "bg-green-500"; // Groen bij 100%
                                        } else if (progressValue >= 50) {
                                            progressColor = "bg-blue-500"; // Blauw bij 50%+
                                        }

                                        return (
                                            <li
                                                key={index}
                                                className="mb-4 cursor-pointer bg-[#bbc4dd] p-4 rounded-md shadow-md hover:bg-[#7885a4] hover:shadow-lg hover:border-2 transition-all "
                                            >
                                                <a
                                                    href={route(
                                                        "redirectToVraag",
                                                        {
                                                            Les_Type:
                                                                lesson.les_type,
                                                            thema_id:
                                                                lesson.thema_id,
                                                            lesson_id:
                                                                lesson.id,
                                                        }
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-xl font-semibold">
                                                            {lesson.les_name}
                                                        </h3>
                                                        {/* <p className="text-sm text-gray-700 ml-2">
                                                            {progressValue}%
                                                        </p> */}
                                                    </div>

                                                    {/* Voortgangsbalk met percentage achter de naam */}
                                                    <div className="relative mt-2">
                                                        <div className="w-full bg-gray-300 h-6 rounded-full">
                                                            <div
                                                                className={`h-full ${progressColor}`}
                                                                style={{
                                                                    width: `${progressValue}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                                            {progressValue}%
                                                            voltooid
                                                        </span>
                                                    </div>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p>Geen lessen gevonden voor dit thema.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
