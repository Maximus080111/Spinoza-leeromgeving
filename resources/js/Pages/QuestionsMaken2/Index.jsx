import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const QuestionsMaken2 = () => {
  // Gebruik het 'useForm' hook van Inertia voor het beheren van formulierdata
  const { data, setData, post, errors } = useForm({
    sentence: '',
  });

  // Functie om het formulier te versturen
  const handleSubmit = (e) => {
    e.preventDefault();

    // Stuur het formulier naar de Laravel route 'QuestionsMaken2.store'
    post(route('QuestionsMaken2.store'), {
      onSuccess: () => {
        // Resetten van het formulier na een succesvolle submit
        setData('sentence', '');
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-5">Voeg een nieuwe vraag toe</h1>

      <form onSubmit={handleSubmit}>
        {/* Inputveld voor de zin */}
        <div className="mb-4">
          <label htmlFor="sentence" className="block text-sm font-medium text-gray-700 mb-2">
            Zin
          </label>
          <input
            id="sentence"
            type="text"
            value={data.sentence}
            onChange={(e) => setData('sentence', e.target.value)}
            className={`w-full px-3 py-2 border ${
              errors.sentence ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Typ hier je vraag..."
          />
          {/* Foutmelding voor het invoerveld */}
          {errors.sentence && (
            <p className="mt-2 text-sm text-red-600">{errors.sentence}</p>
          )}
        </div>

        {/* Verstuur knop */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Vraag opslaan
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionsMaken2;
