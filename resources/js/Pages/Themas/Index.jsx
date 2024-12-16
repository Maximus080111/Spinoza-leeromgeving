import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth, themas = [] }) {
    const [showPopup, setShowPopup] = useState(false); // State voor popup zichtbaar maken
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("Themas.store"), {
            onSuccess: () => {
                reset();
                setShowPopup(false); // Sluit popup na submit
            },
        });
    };

    const handleFileChange = (e) => {
        setData("image", e.target.files[0]);
    };

    // Thema's sorteren op nieuwste eerst
    const sortedThemas = [...themas].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Themas maken
                </h2>
            }
        >
            <Head title="Themas" />

            {/* Popup Formulier */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            Nieuw Thema
                        </h3>
                        <form onSubmit={submit} encType="multipart/form-data">
                            <input
                                id="name"
                                value={data.name}
                                placeholder="Naam van het thema"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <input
                                type="file"
                                id="photo"
                                name="image"
                                accept="image/jpeg, image/png, image/jpg, image/gif"
                                onChange={handleFileChange}
                                className="block w-full text-gray-800 mb-4"
                            />
                            <InputError
                                message={errors.name}
                                className="mb-2"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Annuleren
                                </button>
                                <PrimaryButton disabled={processing}>
                                    Opslaan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Thema's Grid */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Knop om een nieuw thema aan te maken */}
                    <button
                        onClick={() => setShowPopup(true)}
                        className="flex items-center justify-center p-4 rounded shadow-lg hover:bg-opacity-90 transition duration-200"
                        style={{
                            backgroundColor: "#e4e7f1", // Transparante kleur
                        }}
                    >
                        <span className="text-4xl font-bold text-gray-700">
                            +
                        </span>
                    </button>

                    {/* Thema's tonen */}
                    {sortedThemas.length > 0 ? (
                        sortedThemas.map((thema, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-200 rounded shadow-lg"
                                style={{ backgroundColor: "#bbc4dd" }}
                            >
                                <p className="font-semibold text-xl text-center">
                                    {thema.name}
                                </p>
                                <img
                                    src={`/storage/images/${thema.image}`}
                                    alt={`Afbeelding van thema ${thema.name}`}
                                    className="w-full h-40 object-cover rounded mt-2"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No thema's found.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
