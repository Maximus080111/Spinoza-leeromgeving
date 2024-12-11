import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Student_Dashboard({ auth, themas = [] }) {
    const [currentSection, setCurrentSection] = useState(1);

    // Thema's verdelen in delen van 3
    const themasPerSection = 3;
    const totalSections = Math.ceil(themas.length / themasPerSection);
    const sections = Array.from({ length: totalSections }, (_, i) =>
        themas.slice(
            i * themasPerSection,
            i * themasPerSection + themasPerSection
        )
    );

    const handleNextSection = () => {
        setCurrentSection((prevSection) =>
            Math.min(prevSection + 1, totalSections)
        );
    };

    const handlePreviousSection = () => {
        setCurrentSection((prevSection) => Math.max(prevSection - 1, 1));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Thema's
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Navigatie bovenaan */}
            <div className="flex justify-center items-center px-6 space-x-4">
                {/* Pijl naar vorige sectie */}
                <button
                    onClick={handlePreviousSection}
                    disabled={currentSection === 1}
                    style={{ backgroundColor: "#a4c1c2" }}
                    className={`text-white px-4 py-2 rounded-full shadow hover:bg-gray-700 ${
                        currentSection === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    ← Vorige
                </button>

                {/* Huidige sectie */}
                <span className="text-lg font-semibold text-gray-700 mx-2">
                    Deel {currentSection} van {totalSections}
                </span>

                {/* Pijl naar volgende sectie */}
                <button
                    onClick={handleNextSection}
                    disabled={currentSection === totalSections}
                    style={{ backgroundColor: "#a4c1c2" }}
                    className={`text-white px-4 py-2 rounded-full shadow hover:bg-gray-700 ${
                        currentSection === totalSections
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    Volgende →
                </button>
            </div>

            {/* Sectie inhoud */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Dynamisch de thema's voor het huidige deel weergeven */}
                        {sections[currentSection - 1].map((thema, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg shadow-2xl min-h-[75vh] cursor-pointer"
                                style={{ backgroundColor: "#c2d2db" }}
                                onClick={() =>
                                    (window.location.href =
                                        route("lessons_dashboard"))
                                }
                            >
                                <div className="relative w-full h-full rounded overflow-hidden shadow-lg">
                                    <img
                                        src={`/storage/images/${thema.image}`}
                                        alt={`Afbeelding van thema ${thema.name}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Schaduw aan de bovenkant van de afbeelding */}

                                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent shadow-xl to-transparent pointer-events-none"></div>
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <h2 className="text-4xl font-semibold text-black text-center bg-white px-4 py-2 rounded-lg">
                                            {thema.name}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
