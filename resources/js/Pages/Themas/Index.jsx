import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, themas = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        image: null, 
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('Themas.store'), { onSuccess: () => reset() });
    };

    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Themas maken</h2>}
        >
            <Head title="Themas" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} encType="multipart/form-data">
                    <input
                        value={data.name}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('name', e.target.value)}
                    />
                    <input
                        type="file"
                        id="photo"
                        name="image"
                        accept="image/jpeg, image/png, image/jpg, image/gif"
                        onChange={handleFileChange}
                    />
                    <InputError message={errors.name} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Post Thema
                    </PrimaryButton>
                </form>
            </div>
            {themas.length > 0 ? (
                                    themas.map((thema, index) => (
                                        <div key={index} className="p-4 bg-gray-400 mt-2 rounded">
                                            <p>Name: {thema.name}</p>
                                            <img
                                        src={`/storage/images/${thema.image}`}
                                        alt={`Afbeelding van thema ${thema.name}`}
                                        className="w-20 h-full object-cover"
                                    />
                                        </div>
                                    ))
                                ) : (
                                    <p>No students found.</p>
                                )}
        </AuthenticatedLayout>
    );
}
