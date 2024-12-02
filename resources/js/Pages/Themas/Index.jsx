import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('Themas.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Themas maken</h2>}
        >
            
            <Head title="Themas" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.name}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('name', e.target.value)}
                    ></textarea>
                    <InputError message={errors.name} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Post Thema</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}