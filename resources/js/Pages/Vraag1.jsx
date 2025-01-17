import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function SleepSpel() {
    const [huidigeVraagIndex, setHuidigeVraagIndex] = useState(0);
    const [feedback, setFeedback] = useState({});
    const [reset, setReset] = useState(false);
    const [resultaten, setResultaten] = useState([]);
    const [spelVoltooid, setSpelVoltooid] = useState(false);

    const vragen = [
        {
            woorden: ["KAT", "HOND", "AUTO", "BOOM"],
            plaatjes: [
                { id: 1, woord: "KAT", image: "/images/kat.jpg" },
                { id: 2, woord: "HOND", image: "/images/hond.jpg" },
                { id: 3, woord: "AUTO", image: "/images/auto.jpg" },
                { id: 4, woord: "BOOM", image: "/images/boom.jpg" },
            ],
        },
        {
            woorden: ["VIS", "VOGEL", "TREIN", "HUIS"],
            plaatjes: [
                { id: 5, woord: "VIS", image: "/images/vis.jpg" },
                { id: 6, woord: "VOGEL", image: "/images/vogel.jpg" },
                { id: 7, woord: "TREIN", image: "/images/trein.jpg" },
                { id: 8, woord: "HUIS", image: "/images/huis.jpg" },
            ],
        },
    ];

    const resetSpel = () => {
        setFeedback({});
        setReset(!reset);
    };

    const isVraagVoltooid = () => {
        const huidigeVraag = vragen[huidigeVraagIndex];
        return huidigeVraag.plaatjes.every(
            (plaatje) => feedback[plaatje.id] === true
        );
    };

    const volgendeVraag = () => {
        const huidigeVraag = vragen[huidigeVraagIndex];
        const correcteAntwoorden = huidigeVraag.plaatjes.filter(
            (plaatje) => feedback[plaatje.id] === true
        ).length;

        setResultaten((prev) => [
            ...prev,
            {
                vraagIndex: huidigeVraagIndex + 1,
                totaal: huidigeVraag.plaatjes.length,
                correct: correcteAntwoorden,
                fout: huidigeVraag.plaatjes.length - correcteAntwoorden,
            },
        ]);

        if (huidigeVraagIndex < vragen.length - 1) {
            setHuidigeVraagIndex(huidigeVraagIndex + 1);
            setFeedback({});
        } else {
            setSpelVoltooid(true);
        }
    };

    const Woord = ({ woord }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "WORD",
            item: { woord },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <div
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    marginBottom: "30px",
                    padding: "20px",
                    backgroundColor: "#c8cfe4",
                    color: "#333",
                    textAlign: "center",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "move",
                    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
                {woord}
            </div>
        );
    };

    const PlaatjeMetSlot = ({ plaatje }) => {
        const [{ isOver }, drop] = useDrop(() => ({
            accept: "WORD",
            drop: (item) => {
                const correct = item.woord === plaatje.woord;
                setFeedback((prev) => ({ ...prev, [plaatje.id]: correct }));
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }));

        return (
            <div
                ref={drop}
                style={{
                    margin: "10px",
                    padding: "20px",
                    backgroundColor: "#edeff6",
                    borderRadius: "8px",
                    textAlign: "center",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "150px",
                }}
            >
                <img
                    src={plaatje.image}
                    alt={plaatje.woord}
                    style={{
                        maxWidth: "80px",
                        marginBottom: "80px",
                    }}
                />
                <div
                    style={{
                        marginTop: "10px",
                        height: "40px",
                        lineHeight: "40px",
                        backgroundColor:
                            feedback[plaatje.id] === false
                                ? "#FFCCCC"
                                : feedback[plaatje.id] === true
                                ? "#CCFFCC"
                                : "#e9ecef",
                        borderRadius: "6px",
                        width: "100%",
                        textAlign: "center",
                        color: "#333",
                        fontWeight: "bold",
                    }}
                >
                    {feedback[plaatje.id] === true
                        ? "✅ Correct!"
                        : feedback[plaatje.id] === false
                        ? "❌ Fout!"
                        : "Sleep hier het woord"}
                </div>
            </div>
        );
    };

    const Overzicht = () => {
        return (
            <div
                style={{
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "15px",
                    backgroundColor: "#edeff6",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    margin: "80px auto",
                    width: "90%",
                    maxWidth: "600px",
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
                            <th style={thStyle}>Totaal</th>
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
                                <td style={tdStyle}>{resultaat.totaal}</td>
                                <td style={tdStyle}>{resultaat.correct}</td>
                                <td style={tdStyle}>{resultaat.fout}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() =>
                        (window.location.href = "/lessons_dashboard")
                    }
                    className="fixed top-5 right-5 px-5 py-2 bg-gray-800 text-white font-bold rounded-md cursor-pointer text-lg hover:bg-button-kleur-hover"
                >
                    <span>Terug naar het lesoverzicht 🔙</span>
                </button>
            </div>
        );
    };

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

    const huidigeVraag = vragen[huidigeVraagIndex];

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    backgroundColor: "#EFF6FF",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {!spelVoltooid ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "20px",
                        }}
                    >
                        {/* Linker Sectie met de Plaatjes */}
                        <div style={{ flex: "3", marginRight: "20px" }}>
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        "/lessons_dashboard")
                                }
                                style={{
                                    marginBottom: "20px",
                                    padding: "10px 20px",
                                    backgroundColor: "#b6c0db",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                }}
                            >
                                ← Terug
                            </button>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "20px",
                                }}
                            >
                                {huidigeVraag.plaatjes.map((plaatje) => (
                                    <PlaatjeMetSlot
                                        key={plaatje.id}
                                        plaatje={plaatje}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Rechter Sectie met de Woorden en Knoppen */}
                        <div
                            style={{
                                flex: "1",
                                display: "flex",
                                flexDirection: "column",
                                padding: "20px",
                                backgroundColor: "#edeff6",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                position: "sticky",
                            }}
                        >
                            {huidigeVraag.woorden.map((woord, index) => (
                                <Woord key={index} woord={woord} />
                            ))}

                            <button
                                onClick={volgendeVraag}
                                disabled={!isVraagVoltooid()}
                                style={{
                                    marginTop: "20px",
                                    backgroundColor: "#1f2936",
                                    padding: "10px 20px",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    opacity: isVraagVoltooid() ? 1 : 0.5,
                                }}
                            >
                                Volgende Vraag
                            </button>

                            {/* Groene knop verschijnt pas als je alle vragen hebt beantwoord */}
                            {spelVoltooid && (
                                <button
                                    onClick={() =>
                                        alert("Bekijk je resultaten!")
                                    }
                                    style={{
                                        marginTop: "20px",
                                        backgroundColor: "#4CAF50",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Bekijk Resultaten
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <Overzicht />
                )}
            </div>
        </DndProvider>
    );
}
