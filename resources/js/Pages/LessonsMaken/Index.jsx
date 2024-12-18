import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function Index({ auth, lessons = [], thema_id }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        les_name: "",
        les_number: lessons.length > 0 ? lessons[lessons.length - 1].les_number + 1 : 1,
        thema_id: thema_id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("LessonsMakenStore"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Lessen Maken
                </h2>
            }
        >
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="p-6 max-w-3xl mx-auto"
            >
                <div
                    className="p-4 rounded mb-4"
                    style={{ backgroundColor: "#bbc4dd" }}
                >
                    <h1 className="mb-2 font-semibold">Naam van de les</h1>
                    <input
                        id="les_name"
                        value={data.les_name}
                        placeholder="Naam van de Les"
                        className="block w-full bg-white border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2"
                        onChange={(e) => setData("les_name", e.target.value)}
                    />
                </div>
                <div className="text-right">
                    <PrimaryButton disabled={processing}>Opslaan</PrimaryButton>
                </div>
            </form>
            {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                    <div
                        key={index}
                        className="p-4 bg-gray-200 rounded shadow-lg"
                        style={{ backgroundColor: "#bbc4dd" }}
                    >
                        <h1 className="font-semibold text-lg text-gray-800">
                            {lesson.les_name}
                        </h1>
                        <p className="text-gray-700">Lesnummer: {lesson.les_number}</p>
                    </div>
                ))
            ) : (
                <p>Er zijn geen lessen gevonden</p>
            )}
        </AuthenticatedLayout>
    );
}
