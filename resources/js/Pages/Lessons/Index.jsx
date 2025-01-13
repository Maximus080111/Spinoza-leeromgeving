import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useEffect } from "react";

export default function Index({auth, lessons = [], thema_id}) {
    useEffect(() => {
        // Log the lessons data to the console
        console.log('Lessons:', lessons);
        console.log('thema_id:', thema_id)
    }, [lessons, thema_id]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Lessen
                </h2>
            }>
                 <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="mt-8 text-2xl">
                                Lessen
                            </div>
                            <div className="mt-6 text-gray-500">
                                {lessons.length > 0 ? (
                                    <ul>
                                        {lessons.map((lesson, index) => (
                                            <li
                                                key={index}
                                                className="mb-4 cursor-pointer"
                                            >
                                                <a href={route('redirectToVraag', {Les_Type: lesson.les_type, thema_id: lesson.thema_id, lesson_id: lesson.id})}>
                                                    <h3 className="text-lg font-semibold">{lesson.les_name}</h3>
                                                    <p>Les Nummer: {lesson.les_number}</p>
                                                    <p>Thema ID: {lesson.thema_id}</p>
                                                    <p>Les Type: {lesson.les_type}</p>
                                                    <p>Les id: {lesson.id}</p>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Geen lessen gevonden voor dit thema.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </AuthenticatedLayout>
    );
}