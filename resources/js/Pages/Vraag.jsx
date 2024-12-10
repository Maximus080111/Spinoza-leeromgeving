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

    const huidigeVraag = vragen[huidigeIndex];

    const controleerAntwoord = (optie) => {
        if (optie === huidigeVraag.antwoord) {
            setScore(score + 1);
        }

        const volgendeVraag = huidigeIndex + 1;
        if (volgendeVraag < vragen.length) {
            setHuidigeIndex(volgendeVraag);
        } else {
            setQuizVoltooid(true);
        }
    };

    const herstartQuiz = () => {
        setHuidigeIndex(0);
        setScore(0);
        setQuizVoltooid(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full text-center">
                {!quizVoltooid ? (
                    <div>
                        {/* Afbeelding boven de vraag */}
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

                        {/* Opties */}
                        <div className="grid grid-cols-2 gap-6">
                            {huidigeVraag.opties.map((optie, index) => (
                                <button
                                    key={index}
                                    onClick={() => controleerAntwoord(optie)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-semibold py-4 px-6 rounded-lg shadow-md transition-all duration-300"
                                >
                                    {optie}
                                </button>
                            ))}
                        </div>

                        {/* Vraag index */}
                        <p className="mt-6 text-lg text-gray-600">
                            Vraag {huidigeIndex + 1} van {vragen.length}
                        </p>
                    </div>
                ) : (
                    // Quiz resultaat
                    <div>
                        <h1 className="text-5xl font-bold text-gray-800 mb-6">
                            Quiz Voltooid!
                        </h1>
                        <p className="text-2xl text-gray-700 mb-4">
                            Je hebt {score} van de {vragen.length} vragen goed!
                        </p>
                        <button
                            onClick={herstartQuiz}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Opnieuw proberen
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
