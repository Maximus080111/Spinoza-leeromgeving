import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, lessons = [], thema_id }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        les_name: "",
        les_number:
            lessons.length > 0 ? lessons[lessons.length - 1].les_number + 1 : 1,
        thema_id: thema_id,
        les_type: "",
    });

    const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleDropdownSelect = (value) => {
        let displayText;
        switch (value) {
            case 1:
                displayText = "Kahoot";
                break;
            case 2:
                displayText = "Woorden hussel";
                break;
            case 3:
                displayText = "Typ woord bij plaatje";
                break;
            default:
                displayText = "onbekend les type";
        }
        setSelectedDropdownValue(displayText);
        setData("les_type", parseInt(value, 10)); // Update the useForm state
    };

    const submit = (e) => {
        e.preventDefault();
        if (!data.les_name) {
            setErrorMessage("Please enter a name for the lesson.");
            return;
        }
        if (!data.les_type) {
            setErrorMessage("Please select a lesson type.");
            return;
        }
        setErrorMessage("");
        post(route("LessonsMakenStore"), {
            onSuccess: () => {
                reset();
                setSelectedDropdownValue("");
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
                {errorMessage && (
                    <div className="mb-4 text-red-600">{errorMessage}</div>
                )}
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
                <div
                    className="p-4 rounded mb-4"
                    style={{ backgroundColor: "#bbc4dd" }}
                >
                    <h1 className="mb-2 font-semibold">Type les</h1>
                    <h2 className="block w-full bg-white border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2">
                        {selectedDropdownValue || "Type les"}
                    </h2>
                    <Dropdown>
                        <div className="relative">
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="mt-4 px-4 py-2 bg-button-kleur text-white rounded-md font-semibold hover:bg-button-kleur-hover focus:outline-none focus:ring-2 focus:ring-button-kleur-hover focus:ring-offset-2 transition duration-200"
                                >
                                    Selecteer les type
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="left" width="48">
                                <ul className=" bg-white shadow-lg rounded-md overflow-hidden border border-gray-200">
                                    <li
                                        onClick={() => handleDropdownSelect(1)}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200"
                                    >
                                        Kahoot
                                    </li>
                                    <li
                                        onClick={() => handleDropdownSelect(2)}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200"
                                    >
                                        Woorden hussel
                                    </li>
                                    <li
                                        onClick={() => handleDropdownSelect(3)}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-200"
                                    >
                                        Typ woord bij plaatje
                                    </li>
                                </ul>
                            </Dropdown.Content>
                        </div>
                    </Dropdown>
                </div>
                <div className="text-right">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-button-kleur text-white rounded-md font-semibold hover:bg-button-kleur-hover focus:outline-none focus:ring-2 focus:ring-button-kleur-hover focus:ring-offset-2 transition duration-200"
                    >
                        Opslaan
                    </PrimaryButton>
                </div>
            </form>

            {/* Grid van lessen onder het formulier */}
            <div className="p-6 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                    {lessons.length > 0 ? (
                        lessons
                            .sort(
                                (a, b) =>
                                    new Date(b.created_at) -
                                    new Date(a.created_at)
                            ) // Sorteren op de nieuwste les
                            .map((lesson, index) => (
                                <a
                                    href={route("CreateQuestions", {
                                        lesson_id: lesson.id,
                                        Les_Type: lesson.les_type,
                                    })}
                                    key={index}
                                    className="bg-button-kleur text-white rounded-md font-semibold hover:bg-button-kleur-hover focus:outline-none focus:ring-2 focus:ring-button-kleur-hover focus:ring-offset-2 transition duration-200 p-3 flex flex-col justify-center items-center"
                                >
                                    <h1 className="font-semibold text-lg text-white">
                                        {lesson.les_name}
                                    </h1>
                                    <p className="text-white">
                                        Lesnummer: {lesson.les_number}
                                    </p>
                                    <p className="text-white">
                                        Les type: {lesson.les_type}
                                    </p>
                                </a>
                            ))
                    ) : (
                        <p>Er zijn geen lessen gevonden</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
