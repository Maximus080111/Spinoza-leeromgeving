import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Account pagina
                </h2>
            }
        >
            <Head title="Profiel" />

            {/* Achtergrond afbeelding toegevoegd */}
            <div
                className="py-12"
                style={{
                    backgroundColor: "#fdfef8", // Achtergrondkleur
                    // Achtergrondafbeelding
                    backgroundSize: "cover", // Zorgt ervoor dat de afbeelding de gehele pagina bedekt
                    backgroundPosition: "center", // Zet de afbeelding in het midden
                    // Zorgt ervoor dat de achtergrond de volledige hoogte van het scherm bedekt
                }}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                        {/* Linker sectie: Profielfoto en naam */}
                        <div className="md:w-1/3 bg-gray-100 p-6 flex flex-col items-center justify-start">
                            <div className="mt-2">
                                {/* Kleinere margin-top, naar boven verplaatst */}

                                <img
                                    src={auth.user.avatar}
                                    alt="google_img"
                                    className="w-24 h-24 rounded-full mb-4 mt-20"
                                />
                                <h2 className="text-lg font-bold text-gray-800">
                                    {auth.user.name}
                                </h2>
                            </div>
                        </div>

                        {/* Rechter sectie: Formulieren */}
                        <div className="md:w-2/3 p-6 space-y-4">
                            <div className="p-4 bg-white shadow sm:rounded-lg backdrop-blur-lg">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl mx-auto" // Input fields breedte aangepast
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
