import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function HusselSpel({ question2 }) {
    const [correcteZin, setCorrecteZin] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [reset, setReset] = useState(false);
    const [woorden, setWoorden] = useState([]);
    const [dropzones, setDropzones] = useState([]);
    const [clickedWords, setClickedWords] = useState([]);

    useEffect(() => {
        if (question2 && question2.length > 0) {
            const sentence = question2[0].sentence; // Neem de eerste zin uit de database
            const words = sentence.split(" "); // Split de zin in woorden
            setCorrecteZin(words);
            setDropzones(Array(words.length).fill(null));
            setClickedWords(Array(words.length).fill(false));
            // Log de correcte zin naar de console
            console.log("Correcte zin:", sentence);
        }
    }, [question2]);

    useEffect(() => {
        if (correcteZin.length > 0) {
            // Hussel de woorden bij de eerste render of bij reset
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            setWoorden(shuffle([...correcteZin]));
        }
    }, [reset, correcteZin]);

    const geefFeedback = () => {
        const nieuweFeedback = dropzones.map((woord, index) => {
            return woord === correcteZin[index]; // Vergelijk het woord met de correcte zin
        });
        setFeedback(nieuweFeedback);
    };

    useEffect(() => {
        if (dropzones.every((zone) => zone !== null)) {
            geefFeedback(); // Geef feedback wanneer alle dropzones gevuld zijn
        }
    }, [dropzones]);

    // Reset functie
    const resetSpel = () => {
        setDropzones(Array(correcteZin.length).fill(null));
        setFeedback({});
        setClickedWords(Array(correcteZin.length).fill(false));
        setReset(!reset);
    };

    


       // Klikbare woord-component
       const Woord = ({ woord, index }) => {
        const [isHovered, setIsHovered] = useState(false);

        const handleClick = () => {
            const nieuweClickedWords = [...clickedWords];
            nieuweClickedWords[index] = true; // Markeer als geklikt
            setClickedWords(nieuweClickedWords);          // Zoek de eerste lege dropzone
            
            const legeIndex = dropzones.indexOf(null);

            // Controleer of het woord al in de dropzones zit
            if (dropzones.includes(woord)) {
                return; // Als het woord al in een dropzone zit, doe dan niets
            }

            if (legeIndex !== -1) {
                const nieuweDropzones = [...dropzones];
                nieuweDropzones[legeIndex] = woord; // Plaats het woord in de lege dropzone
                setDropzones(nieuweDropzones);

            };
        };

        const handleMouseEnter = () => {
            setIsHovered(true); // Zet hover status aan
        };

        const handleMouseLeave = () => {
            setIsHovered(false); // Zet hover status uit
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
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    marginBottom: "10px",
                    padding: "10px 20px",
                    backgroundColor: backgroundColor,
                    color: color,
                    textAlign: "center",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
                {woord}
            </div>
        );
    };


     // Dropzone component
     const Dropzone = ({ index }) => {
        const isFeedbackGiven = feedback[index] !== undefined;
        const borderColor =
        feedback[index] === false
            ? "#ff0000" // Rood voor fout
            : feedback[index] === true
            ? "#00cc00" // Groen voor correct
            : "transparent"; // Geen border als er geen feedback is
        
        return (
            <div
                style={{
                    margin: "5px",
                    padding: "15px",
                    backgroundColor:
                        feedback[index] === false
                            ? "#ffcccc" // Rood voor fout
                            : feedback[index] === true
                            ? "#ccffcc" // Groen voor correct
                            : "#92A2C9", // Standaard kleur
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
                }}
            >
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

                {/* Reset-knop */}
                <button
                    onClick={resetSpel}
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
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    Reset
                </button>
            </div>
        </DndProvider>
    );
}