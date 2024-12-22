import React, {useState, useEffect} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dropdown from '@/Components/Dropdown';
import { data } from 'autoprefixer';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function Index({auth, question1 = []}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        question: '',
        correct: '',
        answers: '',
    });

    const submit = (e) => {
        e.preventDefault();
        const formData = {
            ...data,
            question: parseInt(data.question, 10),
            correct: parseInt(data.correct, 10),
            answers: parseInt(data.answers, 10),
        };
        post(route('QuestionsMaken.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vragen maken
                </h2>
            }>
                <div className="hidden sm:flex sm:items-center sm:ms-20">
                    </div>
                        <form onSubmit={submit} encType='multipart/form-data'>
                            <h1>naam van de les</h1>
                            <input
                                id="question"
                                value={data.question}
                                placeholder="Vraag"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                onChange={(e) =>
                                    setData("question", e.target.value)
                                }
                            />
                            <input
                                id="correct"
                                value={data.correct}
                                placeholder="Goede antwoord"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                onChange={(e) =>
                                    setData("correct", e.target.value)
                                }
                            />
                            <input
                                id="answers"
                                value={data.answers}
                                placeholder="Antwoord mogenlijkheden"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                onChange={(e) =>
                                    setData("answers", e.target.value)
                                }
                            />
                            <PrimaryButton disabled={processing}>
                                    Opslaan
                                </PrimaryButton>
                        </form>
            </AuthenticatedLayout>
    );
}