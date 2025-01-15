import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function SleepSpel() {
    const [feedback, setFeedback] = useState({});
    const [reset, setReset] = useState(false);

    const woorden = ["KAT", "HOND", "AUTO", "BOOM"];

    const plaatjes = [
        { id: 1, woord: "KAT", image: "/images/kat.jpg" },
        { id: 2, woord: "HOND", image: "/images/hond.jpg" },
        { id: 3, woord: "AUTO", image: "/images/auto.jpg" },
        { id: 4, woord: "BOOM", image: "/images/boom.jpg" },
    ];

    const resetSpel = () => {
        setFeedback({});
        setReset(!reset);
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
                    //achtergrondkleur van woord
                    backgroundColor: "#e4e7f1", 
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

        const borderColor =
        feedback[plaatje.id] === false
            ? "#ff0000" // Rood voor fout
            : feedback[plaatje.id] === true
            ? "#00cc00"
            : "transparent"; // Groen voor correct

        return (
            <div
                ref={drop}
                style={{
                    margin: "10px",
                    padding: "20px",
                    //achterrgrondkleur plaatje en sleeptekst
                    backgroundColor: "#e4e7f1",
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
                    //plek waar je naartoe kan slepen
                    style={{
                        marginTop: "10px",
                        height: "40px",
                        lineHeight: "40px",
                        backgroundColor:
                            feedback[plaatje.id] === false
                            ? "#ffcccc" // Rood voor fout
                            : feedback[plaatje.id] === true
                            ? "#ccffcc" // Groen voor correct
                            : "#f4f4f5", 
                        borderRadius: "6px",
                        width: "100%",
                        textAlign: "center",
                        color: "#333",
                        fontWeight: "bold",
                        boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
                        border: `2px solid ${borderColor}`,
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{
                    display: "flex",
                    backgroundColor: "#ffffff",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "20px",
                    fontFamily: "Arial, sans-serif",
                    minHeight: "100vh",
                }}
            >
                {/* Linker Sectie met de Plaatjes */}

                <div style={{ flex: "3", marginRight: "20px" }}>
                    <button
                        onClick={() =>
                            (window.location.href = "/Student_Dashboard")
                        }
                        //terugbutton styling
                        style={{
                            marginBottom: "20px",
                            padding: "10px 20px",
                            backgroundColor: "#2f3e60",
                            color: "#ffffff",
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
                        {plaatjes.map((plaatje) => (
                            <PlaatjeMetSlot
                                key={plaatje.id}
                                plaatje={plaatje}
                            />
                        ))}
                    </div>
                </div>

                {/* Rechter Sectie met de Woorden en Opnieuw Knop */}
                <div
                    style={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                        backgroundColor: "#BBC4DD", // iets lichtere kleur voor de sectie
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // dropschaduw voor visueel effect
                        height: "93vh", // Zorgt ervoor dat de sectie de volledige hoogte van het scherm heeft
                        position: "sticky", // Dit zorgt ervoor dat de sectie vast blijft bij scrollen
                        top: 0, // Maakt dat de sectie bovenaan blijft als je scrollt
                    }}
                >
                    {/* Woorden */}
                    {woorden.map((woord, index) => (
                        <Woord key={index} woord={woord} />
                    ))}

                    {/* Reset button */}
                    <button
                        onClick={resetSpel}
                        style={{
                            marginTop: "30px",
                            padding: "10px 20px",
                            backgroundColor: "#2f3e60",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Schaduw voor de knop
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </DndProvider>
    );
}
