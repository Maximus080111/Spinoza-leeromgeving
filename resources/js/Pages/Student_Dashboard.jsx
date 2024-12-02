import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Student_Dashboard({ auth, themas = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Thema's</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Thema's</div>
                    </div>
                    {themas.map((themas, index) => (
                            <div key={index} className="p-4 bg-gray-400 mt-2 rounded">
                                <p>name: {themas.name}</p>
                                <p>image: {themas.image}</p>
                            </div>
                        ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
