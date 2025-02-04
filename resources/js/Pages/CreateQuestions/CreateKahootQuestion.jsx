import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function CreateKahootQuestion({ auth, lesson_id, questions = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        question: "",
        answers: ["", "", "", ""],
        correct: "",
        lesson_id: lesson_id,
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
            console.log("Selecteer alstublieft een correct antwoord");
            return;
        }

        console.log("Formuliergegevens:", data);
        post(route("storeKahoot"), {
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
            }
        >
            <div className="hidden sm:flex sm:items-center sm:ms-20"></div>
            <form onSubmit={submit} encType="multipart/form-data">
                <h1>Maak je vraag aan:</h1>
                <input
                    id="question"
                    value={data.question}
                    placeholder="Vul hier de vraag in"
                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                    onChange={(e) => setData("question", e.target.value)}
                />

                {data.answers.map((answer, index) => (
                    <div
                        key={index}
                        className="mb-4 flex items-center space-x-2"
                    >
                        <input
                            value={answer}
                            placeholder={
                                index === 0
                                    ? "Correct antwoord"
                                    : `Foute optie ${index}`
                            }
                            className="block flex-grow border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) =>
                                handleAnswerChange(index, e.target.value)
                            }
                        />
                    </div>
                ))}

                <PrimaryButton disabled={processing}>Opslaan</PrimaryButton>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
                    {questions.map((question) => (
                        <div key={question.id}
                            className="bg-button-kleur text-white rounded-md hover:bg-button-kleur-hover focus:outline-none focus:ring-2 focus:ring-button-kleur-hover focus:ring-offset-2 transition duration-200 p-3 flex flex-col justify-center items-center"
                        >
                            <p>vraag: {question.question}</p>
                            <p>antwoord: {question.correct}</p>
                            <p>opties: {question.answers}</p>
                        </div>
                    ))}
            </div>
        </AuthenticatedLayout>
    );
}
