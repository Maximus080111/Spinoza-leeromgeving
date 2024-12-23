import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        question: '',
        answers: ['', '', '', ''],
        correct: '', 
    });

    const handleAnswerChange = (index, value) => {
        setData((prevData) => {
            const updatedAnswers = [...prevData.answers];
            updatedAnswers[index] = value;

            return {
                ...prevData,
                answers: updatedAnswers,
                correct: index === 0 ? value : prevData.correct,
            };
        });
    };

    const submit = (e) => {
        e.preventDefault();
    
        if (!data.correct) {
            console.log('Selecteer alstublieft een correct antwoord');
            return;
        }

        console.log("Formuliergegevens:", data); 
        post(route('QuestionsMaken.store'), {
            onError: (errors) => console.log(errors),
            onSuccess: () => reset(),
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
            <form onSubmit={submit} encType="multipart/form-data">
                <h1>Maak je vraag aan</h1>
                <input
                    id="question"
                    value={data.question}
                    placeholder="Vraag"
                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                    onChange={(e) => setData("question", e.target.value)}
                />

                {data.answers.map((answer, index) => (
                    <div key={index} className="mb-4 flex items-center space-x-2">
                        <input
                            value={answer}
                            placeholder={index === 0 ? 'Correct antwoord' : `Foute optie ${index}`}
                            className="block flex-grow border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                    </div>
                ))}

                <PrimaryButton disabled={processing}>Opslaan</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}
