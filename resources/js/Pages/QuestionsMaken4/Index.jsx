import React, { useRef } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        word: '',
        image: null,
    });

    const imageInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('word', data.word);
        formData.append('image', data.image);

        post(route('QuestionsMaken4.store'), {
            data: formData,
            onSuccess: () => {
                reset();
                if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                }
            },
        });
    };

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vragen maken
                </h2>
            }>
            <div className="hidden sm:flex sm:items-center sm:ms-20"></div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h1>Voeg een nieuwe vraag toe</h1>
                <div className="mb-4">
                    <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-2">
                        Woord
                    </label>
                    <input
                        id="word"
                        type="text"
                        value={data.word}
                        onChange={(e) => setData('word', e.target.value)}
                        className={`w-full px-3 py-2 border ${errors.word ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Typ hier je woord..."
                    />
                    {errors.word && (
                        <p className="mt-2 text-sm text-red-600">{errors.word}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Afbeelding
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/jpeg, image/png, image/jpg, image/gif"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        ref={imageInputRef}
                    />
                    {errors.image && (
                        <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                    )}
                </div>
                <PrimaryButton disabled={processing}>Opslaan</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}
