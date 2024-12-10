import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dropdown from '@/Components/Dropdown';
import { data } from 'autoprefixer';

export default function Index({auth, themas = []}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        thema: '', 
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('L.store'), { onSuccess: () => reset() });
    };

    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
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
                            <div className="ms-3 relative">
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
                                        {/* <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link> */}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
            </AuthenticatedLayout>
    );
}