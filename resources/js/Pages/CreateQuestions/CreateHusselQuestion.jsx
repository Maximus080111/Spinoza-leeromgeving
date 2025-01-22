import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function CreateHusselQuestion({ auth, lesson_id, questions }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        sentence: '',
        lesson_id: lesson_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('storeHussel'), {
            onSuccess: () => {
                setData('sentence', '');
            },
        });
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
                    <label htmlFor="sentence" className="block text-sm font-medium text-gray-700 mb-2">
                        Zin
                    </label>
                    <input
                        id="sentence"
                        type="text"
                        value={data.sentence}
                        onChange={(e) => setData('sentence', e.target.value)}
                        className={`w-full px-3 py-2 border ${errors.sentence ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Typ hier je vraag..."
                    />
                    {errors.sentence && (
                        <p className="mt-2 text-sm text-red-600">{errors.sentence}</p>
                    )}
                </div>
                <PrimaryButton disabled={processing}>Opslaan</PrimaryButton>
            </form>
            {questions.map((question) => (
                <div key={question.id}>
                    <p>{question.question}</p>
                </div>
            ))}
        </AuthenticatedLayout>
    );
}
