import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function SleepSpel() {
    const [huidigeVraagIndex, setHuidigeVraagIndex] = useState(0); // Huidige vraag bijhouden
    const [feedback, setFeedback] = useState({});
    const [reset, setReset] = useState(false);
    const [resultaten, setResultaten] = useState([]); // Resultaten bijhouden
    const [spelVoltooid, setSpelVoltooid] = useState(false); // Spel voltooid?

    // Vragen met woorden en plaatjes
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

    // Reset de huidige vraag
    const resetSpel = () => {
        setFeedback({});
        setReset(!reset);
    };

    // Controleer of alle koppelingen correct zijn
    const isVraagVoltooid = () => {
        const huidigeVraag = vragen[huidigeVraagIndex];
        return huidigeVraag.plaatjes.every(
            (plaatje) => feedback[plaatje.id] === true
        );
    };

    // Ga naar de volgende vraag of toon overzicht
    const volgendeVraag = () => {
        const huidigeVraag = vragen[huidigeVraagIndex];
        const correcteAntwoorden = huidigeVraag.plaatjes.filter(
            (plaatje) => feedback[plaatje.id] === true
        ).length;

        // Voeg resultaat toe aan de resultatenlijst
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
            // Ga naar de volgende vraag
            setHuidigeVraagIndex(huidigeVraagIndex + 1);
            setFeedback({}); // Reset feedback voor de nieuwe vraag
        } else {
            // Toon het overzicht als alle vragen zijn voltooid
            setSpelVoltooid(true);
        }
    };

    // Woord component
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
                    backgroundColor: "#cde1f5",
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

    // Plaatje met drop-slot
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
                    backgroundColor: "#f5f5f5",
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

    // Overzichtsscherm
    const Overzicht = () => {
        return (
            <div
                style={{
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "15px", // Ronde hoeken
                    backgroundColor: "#e3f2fd", // Lichtblauwe achtergrond
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    margin: "20px auto",
                    width: "90%", // Maak het overzicht responsief
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
                        width: "100%", // Volledige breedte
                        backgroundColor: "#fff",
                        borderRadius: "10px", // Ronde hoeken op de tabel
                        overflow: "hidden", // Zorg dat de hoeken niet buiten de rand komen
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#bbdefb" }}>
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
                                        index % 2 === 0 ? "#f1f8ff" : "#ffffff", // Alternatieve rijen kleuren
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
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "flex", // Flexbox voor knop en icoon
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px", // Ruimte tussen tekst en icoon
                    }}
                >
                    <span>Opnieuw spelen</span>
                    <span
                        style={{
                            display: "inline-block",
                            transform: "rotate(0deg)", // Standaard draaiing
                            transition: "transform 0.2s", // Animatie bij hover
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.transform = "rotate(360deg)")
                        }
                    >
                        🔄 {/* Icoon voor herladen */}
                    </span>
                </button>
            </div>
        );
    };

    // Stijlen voor tabelcellen en kopteksten
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

    // Render de huidige vraag of het overzicht
    const huidigeVraag = vragen[huidigeVraagIndex];

    return (
        <DndProvider backend={HTML5Backend}>
            {!spelVoltooid ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "20px",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    {/* Linker Sectie met de Plaatjes */}
                    <div style={{ flex: "3", marginRight: "20px" }}>
                        <button
                            onClick={() =>
                                (window.location.href = "/Student_Dashboard")
                            }
                            style={{
                                marginBottom: "20px",
                                padding: "10px 20px",
                                backgroundColor: "#ddd",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Terug
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
                            backgroundColor: "#f7f7f7",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            height: "93vh",
                            position: "sticky",
                            top: 0,
                        }}
                    >
                        {huidigeVraag.woorden.map((woord, index) => (
                            <Woord key={index} woord={woord} />
                        ))}

                        {/* Reset Button */}
                        <button
                            onClick={resetSpel}
                            style={{
                                marginTop: "30px",
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "bold",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            Reset
                        </button>

                        {/* Volgende Vraag Button */}
                        {isVraagVoltooid() && (
                            <button
                                onClick={volgendeVraag}
                                style={{
                                    marginTop: "20px",
                                    padding: "10px 20px",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {huidigeVraagIndex === vragen.length - 1
                                    ? "Toon Overzicht"
                                    : "Volgende Vraag"}
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <Overzicht />
            )}
        </DndProvider>
    );
}
