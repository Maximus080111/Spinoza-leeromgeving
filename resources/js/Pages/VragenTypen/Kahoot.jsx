import { useState, useEffect } from "react";
// import { Inertia } from '@inertiajs/inertia';

export default function Vraag1({ auth, lesson_id, Question1 = [] }) {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizVoltooid, setQuizVoltooid] = useState(false);
    const [geselecteerd, setGeselecteerd] = useState(null);
    const [resultaten, setResultaten] = useState([]);
    const [gerandomiseerdeOpties, setGerandomiseerdeOpties] = useState([]);
    const [percentage, setPercentage] = useState(0);

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

    useEffect(() => {
        if (quizVoltooid) {
            const correctAnswers = resultaten.filter(resultaat => resultaat.correct).length;
            const totalQuestions = resultaten.length;
            const calculatedPercentage = (correctAnswers / totalQuestions) * 100;

            setPercentage(calculatedPercentage);

            console.log('Gegevens die worden verzonden naar de database:', {
                percentage: calculatedPercentage,
                student_id: auth.user.id,
                lesson_id: lesson_id,
            });

            // Sla de gegevens op in de database
            // Inertia.post(route('progress.store'), {
            //     percentage: calculatedPercentage,
            //     student_id: auth.user.id,
            //     lesson_id: lesson_id,
            // });
        }
    }, [quizVoltooid, resultaten, auth.user.id, lesson_id]);

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

    const handleBackClick = () => {
        window.history.back();
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
                                    {gerandomiseerdeOpties.map(
                                        (optie, index) => {
                                            let buttonClass =
                                                "bg-button-kleur text-white text-2xl font-semibold py-4 px-6 rounded-lg shadow-md transition-all duration-300";

                                            if (geselecteerd) {
                                                if (
                                                    optie ===
                                                    huidigeVraag.correct
                                                ) {
                                                    buttonClass =
                                                        "bg-green-500 text-white py-4 px-6 rounded-lg shadow-md";
                                                } else if (
                                                    optie === geselecteerd
                                                ) {
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
                                                        controleerAntwoord(
                                                            optie
                                                        )
                                                    }
                                                    className={buttonClass}
                                                    disabled={geselecteerd}
                                                >
                                                    {optie}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>

                                {/* Vraag index */}
                                <p className="mt-6 text-lg text-gray-600">
                                    Vraag {huidigeIndex + 1} van{" "}
                                    {Question1.length}
                                </p>
                            </>
                        ) : (
                            <p>Geen vragen beschikbaar.</p>
                        )}
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full">
                        <h1 className="text-lg font-bold text-gray-800 mb-6">
                            Overzicht van je resultaten
                        </h1>
                        <p className="text-lg text-gray-700 mb-4">
                            Je hebt {score} van de {Question1.length} vragen
                            goed!
                        </p>

                        <div
                            style={{
                                padding: "20px",
                                textAlign: "center",
                                borderRadius: "15px",
                                backgroundColor: "#edeff6",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                margin: "70px auto",
                                width: "90%",
                                maxWidth: "800px",
                            }}
                        >
                            <h2 style={{ marginBottom: "20px", color: "#333" }}>
                                Overzicht van je resultaten
                            </h2>
                            <table
                                style={{
                                    margin: "20px auto",
                                    borderCollapse: "collapse",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }}
                            >
                                <thead>
                                    <tr style={{ backgroundColor: "#c8cfe4" }}>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: "#333",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Vraag
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: "#333",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Correct antwoord
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                textAlign: "center",
                                                color: "#555",
                                                fontSize: "14px",
                                            }}
                                        >
                                            ✅
                                        </th>
                                        <th
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "10px",
                                                textAlign: "center",
                                                color: "#555",
                                                fontSize: "14px",
                                            }}
                                        >
                                            ❌
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultaten.map((resultaat, index) => (
                                        <tr
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    index % 2 === 0
                                                        ? "#f1f8ff"
                                                        : "#ffffff",
                                            }}
                                        >
                                            <td
                                                style={{
                                                    border: "1px solid #ddd",
                                                    padding: "10px",
                                                    textAlign: "center",
                                                    color: "#555",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Vraag {index + 1}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #ddd",
                                                    padding: "10px",
                                                    textAlign: "center",
                                                    color: "#555",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {resultaat.correctAntwoord}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #ddd",
                                                    padding: "10px",
                                                    textAlign: "center",
                                                    color: "#555",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {resultaat.correct ? "✅" : ""}
                                            </td>
                                            <td
                                                style={{
                                                    border: "1px solid #ddd",
                                                    padding: "10px",
                                                    textAlign: "center",
                                                    color: "#555",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {resultaat.correct ? "" : "❌"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* <button
                            onClick={herstartQuiz}
                            className="fixed top-5 left-5 px-5 py-2 bg-gray-800 text-white font-bold rounded-md cursor-pointer text-lg hover:bg-button-kleur-hover"
                        >
                            Opnieuw proberen ⟳
                        </button> */}
                        <button
                            onClick={handleBackClick}
                            className="fixed top-5 right-5 px-5 py-2 bg-gray-800 text-white font-bold rounded-md cursor-pointer text-lg hover:bg-button-kleur-hover"
                        >
                            Terug naar het lesoverzicht 🔙
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
