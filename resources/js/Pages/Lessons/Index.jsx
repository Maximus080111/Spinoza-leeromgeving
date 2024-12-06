import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function Index({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Lessen
                </h2>
            }>
                <div>
                    <h1>hoi</h1>
                </div>
            </AuthenticatedLayout>
    );
}