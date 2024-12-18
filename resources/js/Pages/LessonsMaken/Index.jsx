import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function Index({ auth, themas = [], lessons = [], thema_id }) {
        useEffect(() => {
            console.log('thema_id:', thema_id)
            console.log('lessons:', lessons)
            console.log('lessons higest les_number', lessons[lessons.length - 1].les_number)
        }, [thema_id]);

    const { data, setData, post, processing, reset, errors } = useForm({
        les_name: "",
        les_number: lessons.length > 0 ? lessons[lessons.length - 1].les_number + 1 : 1,
        thema_id: thema_id,
    });
    const [selectedThema, setSelectedThema] = useState(
        thema_id
            ? themas.find((thema) => thema.id === thema_id)?.name || ""
            : themas.length > 0
            ? themas[0].name
            : ""
    );
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Succesmelding state
    const [successThemaId, setSuccessThemaId] = useState(null); // Geselecteerde thema_id voor succesmelding

    useEffect(() => {
        // Update het geselecteerde thema wanneer data.thema_id verandert
        const selected = themas.find((thema) => thema.id === data.thema_id);
        if (selected) {
            setSelectedThema(selected.name);
        }
    }, [data.thema_id, themas]);

    const submit = (e) => {
        e.preventDefault();
        const formData = {
            ...data,
            les_number: parseInt(data.les_number, 10),
            thema_id: parseInt(data.thema_id, 10),
        };
        post(route("LessonsMakenStore"), {
            onSuccess: () => {
                reset();
                setShowSuccessMessage(true); // Toon succesmelding
                setSuccessThemaId(formData.thema_id); // Sla thema_id op voor melding
                setTimeout(() => setShowSuccessMessage(false), 3000); // Verberg na 3 seconden
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
            {/* Formulier */}
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="p-6 max-w-3xl mx-auto"
            >
                {/* Wrapper voor achtergrondvlak */}
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
                <p>no Thema's found</p>
            )}
        </AuthenticatedLayout>
    );
}
