import { useState } from "react";

export default function Vraag() {
    const vragen = [
        {
            vraag: "Wat is de hoofdstad van Nederland?",
            opties: ["Amsterdam", "Rotterdam", "Utrecht", "Den Haag"],
            antwoord: "Amsterdam",
            image: "/images/nederlanddjpg.jpg",
        },
        {
            vraag: "Wie heeft de zwaartekracht ontdekt?",
            opties: [
                "Isaac Newton",
                "Albert Einstein",
                "Galileo Galilei",
                "Nikola Tesla",
            ],
            antwoord: "Isaac Newton",
            image: "/images/isaacnewton.jpg",
        },
        {
            vraag: "Wat is de grootste planeet in ons zonnestelsel?",
            opties: ["Mars", "Aarde", "Jupiter", "Saturnus"],
            antwoord: "Jupiter",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
        },
    ];

    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizVoltooid, setQuizVoltooid] = useState(false);
    const [geselecteerd, setGeselecteerd] = useState(null);
    const [resultaten, setResultaten] = useState([]);

    const huidigeVraag = vragen[huidigeIndex];

    const controleerAntwoord = (optie) => {
        setGeselecteerd(optie);

        const correct = optie === huidigeVraag.antwoord;

        if (correct) {
            setScore(score + 1);
        }

        setResultaten((prev) => [
            ...prev,
            {
                vraag: huidigeVraag.vraag,
                gekozenAntwoord: optie,
                correctAntwoord: huidigeVraag.antwoord,
                correct,
                image: huidigeVraag.image,
            },
        ]);

        setTimeout(() => {
            const volgendeVraag = huidigeIndex + 1;
            if (volgendeVraag < vragen.length) {
                setHuidigeIndex(volgendeVraag);
                setGeselecteerd(null);
            } else {
                setQuizVoltooid(true);
            }
        }, 1500); // 1.5 seconden wachten voor feedback
    };

    const herstartQuiz = () => {
        setHuidigeIndex(0);
        setScore(0);
        setQuizVoltooid(false);
        setGeselecteerd(null);
        setResultaten([]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full text-center">
                {!quizVoltooid ? (
                    <div>
                        {/* Afbeelding */}
                        {huidigeVraag.image && (
                            <img
                                src={huidigeVraag.image}
                                alt="Vraag afbeelding"
                                className="w-full max-h-64 object-contain mb-6 rounded-lg shadow-lg"
                            />
                        )}

                        {/* Vraag */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">
                            {huidigeVraag.vraag}
                        </h1>

                        {/* Opties met Feedback */}
                        <div className="grid grid-cols-2 gap-6">
                            {huidigeVraag.opties.map((optie, index) => {
                                let buttonClass =
                                    "bg-[#2f3e60] text-white text-2xl font-semibold py-4 px-6 rounded-lg shadow-md transition-all duration-300";

                                if (geselecteerd) {
                                    if (optie === huidigeVraag.antwoord) {
                                        buttonClass =
                                            "bg-green-500 text-white py-4 px-6 rounded-lg shadow-md";
                                    } else if (optie === geselecteerd) {
                                        buttonClass =
                                            "bg-red-500 text-white py-4 px-6 rounded-lg shadow-md";
                                    } else {
                                        buttonClass =
                                            "bg-gray-300 text-gray-600 py-4 px-6 rounded-lg";
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            controleerAntwoord(optie)
                                        }
                                        className={buttonClass}
                                        disabled={geselecteerd}
                                    >
                                        {optie}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Vraag index */}
                        <p className="mt-6 text-lg text-gray-600">
                            Vraag {huidigeIndex + 1} van {vragen.length}
                        </p>
                    </div>
                ) : (
                    // Quiz Resultaat met Overzicht
                    <div>
                        <h1 className="text-5xl font-bold text-gray-800 mb-6">
                            Resultaat
                        </h1>
                        <p className="text-2xl text-gray-700 mb-4">
                            Je hebt {score} van de {vragen.length} vragen goed!
                        </p>

                        <div className="text-left mt-8">
                            {resultaten.map((resultaat, index) => (
                                <div
                                    key={index}
                                    className={`p-4 mb-4 rounded-lg shadow-md ${
                                        resultaat.correct
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    }`}
                                >
                                    <p className="text-lg font-semibold">
                                        Vraag {index + 1}: {resultaat.vraag}
                                    </p>
                                    <img
                                        src={resultaat.image}
                                        alt="Vraag afbeelding"
                                        className="w-32 h-20 object-contain my-2 rounded-md"
                                    />
                                    <p>
                                        Jouw antwoord:{" "}
                                        <span className="font-bold">
                                            {resultaat.gekozenAntwoord}
                                        </span>
                                    </p>
                                    <p>
                                        Correct antwoord:{" "}
                                        <span className="font-bold">
                                            {resultaat.correctAntwoord}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={herstartQuiz}
                            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Opnieuw proberen
                        </button>
                        <button
                            onClick={() =>
                                (window.location.href = "/lessons_dashboard")
                            }
                            className="mt-6 bg-blue-500 hover:bg-blue-700  text-white font-semibold py-4 px-8 ml-10 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Ga terug
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
