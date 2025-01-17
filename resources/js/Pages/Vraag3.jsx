import React, { useState } from "react";

const App = () => {
    const questions = [
        { image: "/images/boom.jpg", correctAnswer: "Boom" },
        { image: "/images/kat.jpg", correctAnswer: "Kat" },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false); // Controleer of het overzicht moet worden getoond

    const handleSubmit = () => {
        const isCorrect =
            userAnswer.trim().toLowerCase() ===
            questions[currentQuestion].correctAnswer.toLowerCase();

        // Feedback instellen
        setFeedback(isCorrect ? "✅ Correct!" : "❌ Fout!");

        // Resultaten bijwerken
        setResults((prevResults) => [
            ...prevResults,
            {
                vraagIndex: currentQuestion + 1,
                correctAnswer: questions[currentQuestion].correctAnswer,
                correct: isCorrect ? 1 : 0,
                fout: isCorrect ? 0 : 1,
            },
        ]);

        // Tijdelijk feedback tonen en daarna actie ondernemen
        setTimeout(() => {
            setFeedback(""); // Feedback resetten

            if (isCorrect) {
                if (currentQuestion < questions.length - 1) {
                    // Naar de volgende vraag
                    setCurrentQuestion(currentQuestion + 1);
                    setUserAnswer("");
                } else {
                    // Laat resultaten zien als alle vragen klaar zijn
                    setShowResults(true);
                }
            } else {
                // Reset inputveld voor fout antwoord
                setUserAnswer("");
            }
        }, 2000); // 2 seconden vertraging
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    // Berekeningen voor de resultaten
    const totalCorrect = results.reduce(
        (sum, result) => sum + result.correct,
        0
    );
    const totalFout = results.reduce((sum, result) => sum + result.fout, 0);

    return (
        <div
            style={{
                backgroundColor: "#EFF6FF",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                position: "relative",
            }}
        >
            <button
                onClick={() => (window.location.href = "/lessons_dashboard")}
                className="fixed top-5 right-5 px-5 py-2 bg-gray-800 text-white font-bold rounded-md cursor-pointer text-lg hover:bg-button-kleur-hover"
            >
                Terug naar het lesoverzicht 🔙
            </button>

            {!showResults ? (
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "15px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        margin: "70px auto",
                        width: "90%",
                        maxWidth: "600px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <img
                            src={questions[currentQuestion].image}
                            alt="Vraag"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "300px",
                                borderRadius: "10px",
                                marginBottom: "20px",
                            }}
                        />
                    </div>

                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Typ je antwoord hier"
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                            textAlign: "center",
                            backgroundColor: feedback.includes("Fout")
                                ? "#FFCCCC"
                                : feedback.includes("Correct")
                                ? "#CCFFCC"
                                : "#fff",
                            color: "#333",
                            fontWeight: feedback ? "bold" : "normal",
                        }}
                        disabled={feedback !== ""}
                    />

                    {feedback && (
                        <div
                            style={{
                                marginBottom: "10px",
                                color: feedback.includes("Fout")
                                    ? "#e74c3c"
                                    : "#2ecc71",
                                fontWeight: "bold",
                            }}
                        >
                            {feedback}
                        </div>
                    )}
                </div>
            ) : (
                <Overzicht
                    resultaten={results}
                    totalCorrect={totalCorrect}
                    totalFout={totalFout}
                />
            )}

            {/* Dit gedeelte is alleen zichtbaar tijdens het maken van de vragen */}
            {!showResults && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "15px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "10px",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#333",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    Typ het woord dat hoort bij de afbeelding
                </div>
            )}
        </div>
    );
};

const Overzicht = ({ resultaten, totalCorrect, totalFout }) => {
    const thStyle = {
        border: "1px solid #ddd",
        padding: "10px",
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        fontSize: "16px",
    };

    const tdStyle = {
        border: "1px solid #ddd",
        padding: "10px",
        textAlign: "center",
        color: "#555",
        fontSize: "14px",
    };

    return (
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
            <h2
                style={{
                    marginBottom: "20px",
                    color: "#333",
                    fontWeight: "bold",
                }}
            >
                Overzicht van je resultaten
            </h2>
            <p
                style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "10px",
                }}
            >
                Correct: {totalCorrect} | Fout: {totalFout}
            </p>
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
                        <th style={thStyle}>Vraag</th>
                        <th style={thStyle}>Correct antwoord</th>
                        <th style={thStyle}>✅</th>
                        <th style={thStyle}>❌</th>
                    </tr>
                </thead>
                <tbody>
                    {resultaten.map((resultaat, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor:
                                    index % 2 === 0 ? "#f1f8ff" : "#ffffff",
                            }}
                        >
                            <td style={tdStyle}>
                                Vraag {resultaat.vraagIndex}
                            </td>
                            <td style={tdStyle}>{resultaat.correctAnswer}</td>
                            <td style={tdStyle}>{resultaat.correct}</td>
                            <td style={tdStyle}>{resultaat.fout}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
