import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profiel Informatie
                </h2>
            </header>

            <form className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Naam" />

                    {/* Naam wordt weergegeven als tekst, niet bewerkbaar */}
                    <div className="mt-1 p-2 border bg-gray-100 rounded-md">
                        {user.name}
                    </div>

                    <InputError className="mt-2" message={""} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="E-mail" />

                    {/* E-mail wordt weergegeven als tekst, niet bewerkbaar */}
                    <div className="mt-1 p-2 border bg-gray-100 rounded-md">
                        {user.email}
                    </div>

                    <InputError className="mt-2" message={""} />
                </div>

                <div>
                    <InputLabel htmlFor="class" value="Klas" />

                    {/* Klas wordt weergegeven als tekst, niet bewerkbaar */}
                    <div className="mt-1 p-2 border bg-gray-100 rounded-md">
                        {user.class}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Transition
                        show={status === "saved"} // Controleer als de gegevens zijn opgeslagen
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
