import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

export default function Index({ auth, themas = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("Themas.store"), { onSuccess: () => reset() });
    };

    const handleFileChange = (e) => {
        setData("image", e.target.files[0]);
    };

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

            {/* Formulier achtergrond */}
            <div
                className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 rounded-lg shadow-md"
                style={{ backgroundColor: "#c2d2db" }}
            >
                <form onSubmit={submit} encType="multipart/form-data">
                    {/* Titel "Thema" */}
                    <div className="mb-4">
                        <label htmlFor="name" className="text-lg font-semibold">
                            Thema
                        </label>
                    </div>

                    {/* Naam van het thema */}
                    <input
                        id="name"
                        value={data.name}
                        placeholder="Naam van het thema"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                        onChange={(e) => setData("name", e.target.value)}
                    />

                    {/* Knop voor afbeelding uploaden */}
                    <div className="mb-4">
                        <input
                            type="file"
                            id="photo"
                            name="image"
                            accept="image/jpeg, image/png, image/jpg, image/gif"
                            onChange={handleFileChange}
                            className="block w-full text-gray-800"
                        />
                    </div>

                    {/* Foutmelding voor naam */}
                    <InputError message={errors.name} className="mt-2" />

                    {/* Post Thema knop, rechtsonder */}
                    <div className="flex justify-end">
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Post Thema
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* Grid voor de thema's */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {themas.length > 0 ? (
                        themas.map((thema, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-200 rounded shadow-lg"
                                style={{ backgroundColor: "#c2d2db" }}
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
