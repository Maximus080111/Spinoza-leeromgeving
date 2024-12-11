import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundColor: "#fdfef8", // Achtergrondkleur
                backgroundImage: "url('/images/achtergrondje.jpeg')", // Achtergrondafbeelding
                backgroundSize: "cover", // Zorgt ervoor dat de afbeelding de gehele pagina bedekt
                backgroundPosition: "center", // Zet de afbeelding in het midden
                minHeight: "100vh", // Zorgt ervoor dat de achtergrond de volledige hoogte van het scherm bedekt
            }}
        >
            <Head title="Log in" />

            <div
                className="
        flex flex-col md:flex-row bg-black rounded-lg shadow-lg 
        bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 
        border border-gray-100 overflow-hidden max-w-4xl w-full
    "
            >
                {/* Left Section: Image */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="/images/inlogpagina_foto.jpg"
                        alt="Login Illustration"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Section: Form */}
                <div className="flex flex-col justify-center p-8 md:w-1/2">
                    <h2 className="text-2xl font-bold text-black text-center">
                        Welkom terug!
                    </h2>
                    <p className="text-black text-center mb-4">
                        Log in op je Google account.
                    </p>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex items-center justify-between"></div>

                        <div className="mt-4 text-center">
                            <a
                                href={route("auth.google")}
                                className="inline-flex items-center px-4 py-2 bg-[#7734e7] text-white rounded-lg shadow-md text-sm font-medium hover:bg-indigo-700"
                            >
                                Login met Google
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
