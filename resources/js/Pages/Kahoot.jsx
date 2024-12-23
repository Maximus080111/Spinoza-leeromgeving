import { useState, useEffect } from "react";

export default function Vraag1({ Question1 = [] }) {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizVoltooid, setQuizVoltooid] = useState(false);
    const [geselecteerd, setGeselecteerd] = useState(null);
    const [resultaten, setResultaten] = useState([]);
    const [gerandomiseerdeOpties, setGerandomiseerdeOpties] = useState([]);

    const huidigeVraag = Question1[huidigeIndex] || null;

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        if (huidigeVraag) {
            const nieuweOpties = shuffleArray(
                huidigeVraag.answers.split(", ").map((optie, index) => {
                    let bewerkteOptie = optie.replace(/"/g, "");

                    if (index === 0) {
                        bewerkteOptie = bewerkteOptie.replace(/^\[/, "");
                    }
                    if (index === huidigeVraag.answers.split(", ").length - 1) {
                        bewerkteOptie = bewerkteOptie.replace(/\]$/, "");
                    }
                    return bewerkteOptie;
                })
            );
            setGerandomiseerdeOpties(nieuweOpties);
        }
    }, [huidigeVraag]);

    const controleerAntwoord = (optie) => {
        if (!huidigeVraag) return;

        setGeselecteerd(optie);

        const correct = optie === huidigeVraag.correct;

        if (correct) {
            setScore(score + 1);
        }

        setResultaten((prev) => [
            ...prev,
            {
                vraag: huidigeVraag.question,
                gekozenAntwoord: optie,
                correctAntwoord: huidigeVraag.correct,
                correct,
            },
        ]);

        setTimeout(() => {
            const volgendeVraag = huidigeIndex + 1;
            if (volgendeVraag < Question1.length) {
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
        setGerandomiseerdeOpties([]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full text-center">
                {!quizVoltooid ? (
                    <div>
                        {huidigeVraag ? (
                            <>
                                {/* Vraag */}
                                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                                    {huidigeVraag.question}
                                </h1>

                                {/* Opties met Feedback */}
                                <div className="grid grid-cols-2 gap-6">
                                    {gerandomiseerdeOpties.map((optie, index) => {
                                        let buttonClass =
                                            "bg-blue-500 text-white text-2xl font-semibold py-4 px-6 rounded-lg shadow-md transition-all duration-300";

                                        if (geselecteerd) {
                                            if (optie === huidigeVraag.correct) {
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
                                    Vraag {huidigeIndex + 1} van {Question1.length}
                                </p>
                            </>
                        ) : (
                            <p>Geen vragen beschikbaar.</p>
                        )}
                    </div>
                ) : (
                    // Quiz Resultaat met Overzicht
                    <div>
                        <h1 className="text-5xl font-bold text-gray-800 mb-6">
                            Resultaat
                        </h1>
                        <p className="text-2xl text-gray-700 mb-4">
                            Je hebt {score} van de {Question1.length} vragen goed!
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
                                    <p>
                                        Jouw antwoord: {" "}
                                        <span className="font-bold">
                                            {resultaat.gekozenAntwoord}
                                        </span>
                                    </p>
                                    <p>
                                        Correct antwoord: {" "}
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