import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function HusselSpel({ question2 = [] }) {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [spelVoltooid, setSpelVoltooid] = useState(false);
    const [correcteZin, setCorrecteZin] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [woorden, setWoorden] = useState([]);
    const [dropzones, setDropzones] = useState([]);
    const [clickedWords, setClickedWords] = useState([]);

    const huidigeVraag = question2[huidigeIndex] || null;

    useEffect(() => {
        if (question2.length > 0) {
            const huidigeVraag = question2[huidigeIndex];
            if (huidigeVraag) {
                console.log("Nieuwe vraag geladen:", huidigeVraag);
                const sentence = huidigeVraag.sentence;
                const words = sentence.split(" ");
                console.log("Correcte zin woorden:", words);

                const shuffle = (array) => array.sort(() => Math.random() - 0.5);
                const shuffledWords = shuffle([...words]);

    
                console.log("Gehusselde woorden:", shuffledWords);
        
                const nieuweDropzones = Array(words.length).fill(null);
                console.log("Dropzones geïnitialiseerd:", nieuweDropzones);
    
                // Gebruik lokale variabelen om state synchronisatie te vermijden
                setWoorden(shuffledWords); 
                setCorrecteZin(words);
                setDropzones(nieuweDropzones);
                setClickedWords(Array(words.length).fill(false));
                setFeedback({});
            }
        }
    }, [huidigeIndex, question2]);
    
    
      

    useEffect(() => {
        if (correcteZin.length > 0) {
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            const shuffledWords = shuffle([...correcteZin]);
            console.log("Gehusselde woorden:", shuffledWords);
            setWoorden(shuffledWords);
        }
    }, [correcteZin]);

    const geefFeedback = () => {
        console.log("Dropzones bij feedback:", dropzones);
        console.log("Correcte zin bij feedback:", correcteZin);

        const nieuweFeedback = dropzones.map((woord, index) => woord === correcteZin[index]);
        console.log("Feedback per woord:", nieuweFeedback);

        const alleAntwoordenCorrect = nieuweFeedback.every((isCorrect) => isCorrect);
        console.log("Alle antwoorden correct:", alleAntwoordenCorrect);

        setFeedback(nieuweFeedback);

        if (alleAntwoordenCorrect) {
            console.log("Antwoorden zijn correct, ga naar volgende vraag.");
            setScore(score + 1);
            setTimeout(() => {
                if (huidigeIndex + 1 < question2.length) {
                    setHuidigeIndex((prevIndex) => prevIndex + 1);
                } else {
                    setSpelVoltooid(true);
                    console.log("Spel voltooid!");
                }
            }, 1500);
        } else {
            console.log("Antwoorden zijn fout, reset dropzones.");
            setTimeout(() => {
                setDropzones(new Array(dropzones.length).fill(null));
                setFeedback({});
                setClickedWords(Array(correcteZin.length).fill(false));
            }, 1500);
        }
    };

    useEffect(() => {
        console.log("Dropzones status bij wijziging:", dropzones);
    
        // Controleer dat de lengte van dropzones overeenkomt met correcteZin
        if (dropzones.length === correcteZin.length && dropzones.every((zone) => zone !== null)) {
            console.log("Alle dropzones gevuld, geef feedback.");
            geefFeedback();
        } else {
            console.log("Niet alle dropzones zijn gevuld of dropzones hebben onjuiste lengte.");
        }
    }, [dropzones, correcteZin.length]);
     // Deze useEffect reageert alleen wanneer de dropzones worden gewijzigd
    
    const Woord = ({ woord, index }) => {
        const [isHovered, setIsHovered] = useState(false);

        const handleClick = () => {
            console.log(`Klik op woord: ${woord}`);
            const nieuweClickedWords = [...clickedWords];
            nieuweClickedWords[index] = true;
            setClickedWords(nieuweClickedWords);

            const legeIndex = dropzones.indexOf(null);
            console.log("Eerste lege dropzone:", legeIndex);
            console.log("Huidige dropzones:", dropzones);

            if (dropzones.includes(woord)) {
                console.log("Woord zit al in dropzones:", woord);
                return;
            }

            if (legeIndex !== -1) {
                const nieuweDropzones = [...dropzones];
                nieuweDropzones[legeIndex] = woord;
                console.log("Woord toegevoegd aan dropzone:", nieuweDropzones);
                setDropzones(nieuweDropzones);
            }
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
        };

        let backgroundColor;
        let color;
        if (clickedWords[index]) {
            color = "#ffffff";
            backgroundColor = "#2f3e60";
        } else if (isHovered) {
            color = "#333";
            backgroundColor = "#D7DBEA";
        } else {
            color = "#333";
            backgroundColor = "#BBC4DD";
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
                    backgroundColor: "rgba(239, 246, 255, 1)",
                    minHeight: "100vh",
                }}
            >
                <h1>Husselspel</h1>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "80%",
                        marginTop: "20px",
                        gap: "20px",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#F3F4F6",
                            borderRadius: "8px",
                            padding: "20px",
                            minHeight: "300px",
                            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        {correcteZin.map((_, index) => (
                            <Dropzone key={index} index={index} />
                        ))}
                    </div>

                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#F3F4F6",
                            borderRadius: "8px",
                            padding: "20px",
                            minHeight: "300px",
                            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
                        }}
                    >
                        {woorden.map((woord, index) => (
                            <Woord key={index} woord={woord} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}
