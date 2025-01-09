import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, questions = [] }) {
    const [errorMessage, setErrorMessage] = useState("");
    const { data, setData, post, processing, reset } = useForm({
        questions: Array(10).fill({ word: "", image: null }),
    });

    const [openDropdowns, setOpenDropdowns] = useState(Array(10).fill(false));

    const handleInputChange = (index, field, value) => {
        const updatedQuestions = data.questions.map((question, i) => 
            i === index ? { ...question, [field]: value } : question
        );
        setData("questions", updatedQuestions);
    };

    const handleFileChange = (index, e) => {
        handleInputChange(index, "image", e.target.files[0]);
    };

    const toggleDropdown = (index) => {
        const updatedDropdowns = openDropdowns.map((isOpen, i) => 
            i === index ? !isOpen : isOpen
        );
        setOpenDropdowns(updatedDropdowns);
    };

    const submit = (e) => {
        e.preventDefault();
        const hasEmptyFields = data.questions.some(
            (question) => !question.word || !question.image
        );
        if (hasEmptyFields) {
            setErrorMessage("Please fill out all fields for each question.");
            return;
        }
        setErrorMessage("");
        post(route("QuestionMaken3.store"), {
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
                    Vragen maken 3
                </h2>
            }
        >
            <form onSubmit={submit} encType="multipart/form-data" className="p-6 max-w-3xl mx-auto">
                {errorMessage && (
                    <div className="mb-4 text-red-600">{errorMessage}</div>
                )}
                {data.questions.map((question, index) => (
                    <div key={index} className="mb-6">
                        <div
                            className="cursor-pointer bg-gray-200 p-4 rounded-md shadow-md"
                            onClick={() => toggleDropdown(index)}
                        >
                            <h3 className="font-semibold text-lg">Question {index + 1}</h3>
                        </div>
                        {openDropdowns[index] && (
                            <div className="mt-4 p-4 border rounded-md shadow-md">
                                <input
                                    type="text"
                                    value={question.word}
                                    placeholder="Word"
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                    onChange={(e) => handleInputChange(index, "word", e.target.value)}
                                />
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg, image/gif"
                                    className="block w-full text-gray-800 mb-4"
                                    onChange={(e) => handleFileChange(index, e)}
                                />
                            </div>
                        )}
                    </div>
                ))}
                <PrimaryButton disabled={processing}>Opslaan</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}