import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({auth}) {
    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vragen maken 3
                </h2>
        }>
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
            <h1>hoi</h1>
        </AuthenticatedLayout>
    );
}