import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { Inertia } from '@inertiajs/inertia';

export default function HusselSpel({ auth, lesson_id, question2 = [] }) {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [correcteZin, setCorrecteZin] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [reset, setReset] = useState(false);
    const [woorden, setWoorden] = useState([]);
    const [dropzones, setDropzones] = useState([]);
    const [clickedWords, setClickedWords] = useState([]);
    const [quizVoltooid, setQuizVoltooid] = useState(false);
    const [resultaten, setResultaten] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [feedbackGegeven, setFeedbackGegeven] = useState(false);

    const huidigeVraag = question2[huidigeIndex] || null;

    useEffect(() => {
        if (huidigeVraag) {
            const sentence = huidigeVraag.sentence; // Neem de zin uit de huidige vraag
            const words = sentence.split(" "); // Split de zin in woorden
            setCorrecteZin(words);
            setDropzones(Array(words.length).fill(null));
            setClickedWords(Array(words.length).fill(false));
            // Log de correcte zin naar de console
            console.log("Correcte zin:", sentence);
        }
    }, [huidigeVraag]);

    useEffect(() => {
        if (correcteZin.length > 0) {
            // Hussel de woorden bij de eerste render of bij reset
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            setWoorden(shuffle([...correcteZin]));
        }
    }, [reset, correcteZin]);

    useEffect(() => {
        if (quizVoltooid) {
            const correctAnswers = resultaten.filter(
                (result) => result.correct
            ).length;
            const totalQuestions = resultaten.length;
            const calculatedPercentage =
                (correctAnswers / totalQuestions) * 100;
            setPercentage(calculatedPercentage);

            console.log("Gegevens die worden verzonden naar de database:", {
                percentage: calculatedPercentage,
                student_id: auth.user.id,
                lesson_id: lesson_id,
            });

            // Sla de gegevens op in de database
            // Inertia.post(route("progress.store"), {
            //     percentage: calculatedPercentage,
            //     student_id: auth.user.id,
            //     lesson_id: lesson_id,
            // });
        }
    }, [quizVoltooid, resultaten, auth.user.id, lesson_id]);

    const geefFeedback = () => {
        const nieuweFeedback = dropzones.map((woord, index) => {
            return woord === correcteZin[index]; // Vergelijk het woord met de correcte zin
        });

        const correct = nieuweFeedback.every((item) => item === true);

        setResultaten((prev) => [
            ...prev,
            {
                vraag: huidigeVraag.sentence,
                correct,
            },
        ]);

        setFeedback(nieuweFeedback);
        setFeedbackGegeven(true);
    };

    const volgendeVraag = () => {
        setFeedbackGegeven(false);
        setFeedback({});
        setDropzones(Array(correcteZin.length).fill(null)); // Reset dropzones to null
        setClickedWords(Array(correcteZin.length).fill(false)); // Reset clicked words
        const volgendeVraag = huidigeIndex + 1;
        if (volgendeVraag < question2.length) {
            setHuidigeIndex(volgendeVraag);
            setReset(!reset);
        } else {
            setQuizVoltooid(true);
        }
    };

    const handleBackClick = () => {
        window.history.back();
    };

    // Klikbare woord-component
    const Woord = ({ woord, index }) => {
        const [isHovered, setIsHovered] = useState(false);

        const handleClick = () => {
            const nieuweClickedWords = [...clickedWords];
            nieuweClickedWords[index] = true; // Markeer als geklikt
            setClickedWords(nieuweClickedWords); // Zoek de eerste lege dropzone

            const legeIndex = dropzones.indexOf(null);

            // Controleer of het woord al in de dropzones zit
            if (dropzones.includes(woord)) {
                return; // Als het woord al in een dropzone zit, doe dan niets
            }

            if (legeIndex !== -1) {
                const nieuweDropzones = [...dropzones];
                nieuweDropzones[legeIndex] = woord;
                setDropzones(nieuweDropzones);
            }
        };

        let backgroundColor;
        let color;
        if (clickedWords[index]) {
            color = "#ffffff";
            backgroundColor = "#2f3e60"; // Afgelopen met klikken
        } else if (isHovered) {
            color = "#333";
            backgroundColor = "#D7DBEA"; // Hovered
        } else {
            color = "#333";
            backgroundColor = "#BBC4DD"; // Standaard
        }

        return (
            <div
                className={`woord ${isHovered ? "hovered" : ""}`}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    backgroundColor,
                    color,
                    padding: "10px",
                    margin: "5px",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                {woord}
            </div>
        );
    };

    const Dropzone = ({ index }) => {
        const isFeedbackGiven = feedback[index] !== undefined;
        const borderColor =
            feedback[index] === false
                ? "#ff0000"
                : feedback[index] === true
                ? "#00cc00"
                : "transparent";

        return (
            <div
                style={{
                    margin: "5px",
                    padding: "15px",
                    backgroundColor:
                        feedback[index] === false
                            ? "#ffcccc"
                            : feedback[index] === true
                            ? "#ccffcc"
                            : "#92A2C9",
                    borderRadius: "6px",
                    textAlign: "center",
                    minHeight: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: isFeedbackGiven ? "#333" : "#ffffff",
                    border: `2px solid ${borderColor}`,
                }}
            >
                {dropzones[index]}
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    fontFamily: "Arial, sans-serif",
                    backgroundColor: "#92A2C9",
                    minHeight: "100vh",
                    position: "relative",
                }}
            >
                {quizVoltooid && (
                    <div
                        className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                        }}
                    >
                        <h1 className="text-lg font-bold text-gray-800 mb-6">
                            Overzicht van je resultaten
                        </h1>
                        <p className="text-lg text-gray-700 mb-4">
                            Je hebt {percentage}% van de woorden correct
                            geplaatst!
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
                                            Correct
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
                        <button
                            onClick={handleBackClick}
                            className="fixed top-5 right-5 px-5 py-2 bg-gray-800 text-white font-bold rounded-md cursor-pointer text-lg hover:bg-button-kleur-hover"
                        >
                            Terug naar het lesoverzicht 🔙
                        </button>
                    </div>
                )}

                <h1>Husselspel</h1>

                {/* Flex-container voor 2 kolommen */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "80%", // Zorg voor responsieve breedte
                        marginTop: "20px",
                        gap: "20px", // Voeg ruimte toe tussen de kolommen
                    }}
                >
                    {/* Linker kolom: Dropzones */}
                    <div
                        style={{
                            flex: 1, // Zorg dat de kolom proportioneel ruimte neemt
                            display: "flex",
                            alignItems: "center", // Centreer de dropzones horizontaal
                            justifyContent: "center", // Centreer de dropzones verticaal
                            backgroundColor: "#f0f4fa", // Optionele styling
                            borderRadius: "8px",
                            padding: "20px",
                            minHeight: "300px", // Zorg dat de dropzones een vaste hoogte hebben
                        }}
                    >
                        {correcteZin.map((_, index) => (
                            <Dropzone key={index} index={index} />
                        ))}
                    </div>

                    {/* Rechter kolom: Woordenlijst */}
                    <div
                        style={{
                            flex: 1, // Zorg dat de kolom proportioneel ruimte neemt
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            justifyContent: "center", // Centreer de woorden in de kolom
                            alignItems: "center",
                            backgroundColor: "#f9faff", // Optionele styling
                            borderRadius: "8px",
                            padding: "20px",
                            minHeight: "300px", // Zorg dat woordenlijst gelijk is met dropzones
                        }}
                    >
                        {woorden.map((woord, index) => (
                            <Woord key={index} woord={woord} index={index} />
                        ))}
                    </div>
                </div>

                {dropzones.every((zone) => zone !== null) &&
                    !feedbackGegeven && (
                        <button
                            onClick={geefFeedback}
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                backgroundColor: "#2f3e60",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "bold",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            Controleer
                        </button>
                    )}

                {feedbackGegeven && (
                    <button
                        onClick={volgendeVraag}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            backgroundColor: "#2f3e60",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Volgende vraag
                    </button>
                )}
            </div>
        </DndProvider>
    );
}
