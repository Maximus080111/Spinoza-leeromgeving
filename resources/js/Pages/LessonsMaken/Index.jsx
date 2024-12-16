import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dropdown from '@/Components/Dropdown';
import { data } from 'autoprefixer';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function Index({auth, themas = []}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        les_name: '',
        les_number: '',
        thema_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        const formData = {
            ...data,
            les_number: parseInt(data.les_number, 10),
            thema_id: parseInt(data.thema_id, 10),
        };
        post(route('LessonsMaken.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Lessen Maken
                </h2>
            }>
                <div className="hidden sm:flex sm:items-center sm:ms-20">
                            {/* <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                Alle themas

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                    {themas.map((thema, index) => (
                                        <h1 onClick={data.thema} key={index}>{thema.name}</h1>
                                    ))}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div> */}
                        </div>
                        <form onSubmit={submit} encType='multipart/form-data'>
                            <h1>naam van de les</h1>
                            <input
                                    id="les_name"
                                    value={data.les_name}
                                    placeholder="Naam van de Les"
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                    onChange={(e) =>
                                        setData("les_name", e.target.value)
                                    }
                                />
                            <input
                                    id="les_name"
                                    value={data.les_number}
                                    placeholder="les nummer"
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                    onChange={(e) =>
                                        setData("les_number", e.target.value)
                                    }
                                />
                             <input
                                    id="thema_id"
                                    value={data.thema_id}
                                    placeholder="thema id"
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                    onChange={(e) =>
                                        setData("thema_id", e.target.value)
                                    }
                                />
                            {/* <h1>id van de thema</h1>
                            <input
                                    id="thema"
                                    value={data.thema}
                                    placeholder="thema waar aan het gelinkt moet zijn"
                                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                                    onChange={(e) =>
                                        setData("thema", e.target.value)
                                    }
                                /> */}
                            <PrimaryButton disabled={processing}>
                                    Opslaan
                                </PrimaryButton>
                        </form>
            </AuthenticatedLayout>
    );
}