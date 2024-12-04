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
            style={{ backgroundColor: "#fdfef8" }}
        >
            <Head title="Log in" />

            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
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
                    <h2 className="text-2xl font-bold text-gray-700 text-center">
                        Welkom terug!
                    </h2>
                    <p className="text-gray-500 text-center mb-4">
                        Log in op je Google account.
                    </p>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="flex items-center justify-between">
                            {/* <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label> */}
                        </div>

                        <div className="mt-4 text-center">
                            <a
                                href={route("auth.google")}
                                className="inline-flex items-center px-4 py-2 bg-[#7734e7] text-white rounded-lg shadow-md text-sm font-medium hover:bg-indigo-700"
                            >
                                Login met Google
                            </a>
                        </div>

                        {canResetPassword && (
                            <div className="mt-2 text-center">
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Wachtwoord vergeten?
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
