import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from "react-router-dom";
import axios from "axios";

function SecondPage({ isLoggedIn, isGuest, username, score }) {
    const [showImage, setShowImage] = useState(false);
    const [inputValues, setInputValues] = useState(Array(30).fill(""));
    const [solved, setSolved] = useState(false);
    const [word, setWord] = useState("");
    const inputRefs = useRef([]);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [swit, setSwit] = useState("");
    const [user] = useState(username);
    const [scor, setScore] = useState(score);

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getword?name=${user}`);
                setWord(response.data.word.toUpperCase()); // Ensure data is in uppercase if needed
            } catch (error) {
                console.error("Error fetching word:", error);
            }
        };

        fetchWord();
    }, [user, solved, swit]);

    useEffect(() => {
        if (solved) {           
            const handleSolved = async () => {
                try {
                    await axios.post(`http://localhost:3000/users/${user}/solved`, { word });
                    
                    // Fetch updated score after marking word as solved
                    const scoreResponse = await axios.get(`http://localhost:3000/getscore?name=${user}`);
                    setScore(scoreResponse.data.score);
                } catch (error) {
                    console.error("Error during adding word or fetching score", error.response ? error.response.data : error.message);
                }
            };

            handleSolved();
            
            setInputValues(Array(30).fill(""));
            inputRefs.current.forEach((input) => {
                if (input) input.style.backgroundColor = 'white';
            });

            setSolved(false); // Reset solved state after handling
        }
    }, [solved, user, word]);

    useEffect(() => {
        if (showImage) {
            setInputValues(Array(30).fill(""));
            inputRefs.current.forEach((input) => {
                if (input) input.style.backgroundColor = 'white';
            });
        }
    }, [showImage]);

    const handleButtonClick = () => {
        setShowImage(!showImage);
    };

    function onSubmit() {
        if (focusedIndex === null) {
            console.log("No input is currently focused.");
            return;
        }

        const row = Math.floor((focusedIndex - 1) / 5);
        let rowFilled = true;

        for (let col = 0; col < 5; col++) {
            const inputIndex = row * 5 + col + 1;
            const input = inputRefs.current[inputIndex];
            if (!input || input.value.trim() === "") {
                rowFilled = false;
                break;
            }
        }

        if (rowFilled) {
            let start = row * 5 + 1;
            let end = (row + 1) * 5;
            let correctCount = 0;

            for (let i = start; i <= end; i++) {
                const input = inputRefs.current[i];
                if (word.includes(input.value)) {
                    if (word[i - start] === input.value) {
                        input.style.backgroundColor = 'green';
                        correctCount++;
                    } else {
                        input.style.backgroundColor = 'yellow';
                    }
                } else {
                    input.style.backgroundColor = 'grey';
                }
            }

            if (correctCount === 5) {
                setSolved(true);
                alert("You have successfully guessed the word");
            } else if (correctCount !== 5 && end === 30) {
                setTimeout(() => {
                    setInputValues(Array(30).fill(""));
                    inputRefs.current.forEach((input) => {
                        if (input) input.style.backgroundColor = 'white';
                    });

                    alert("Better Luck next time!! The word was " + word);
                    setSwit(!swit);
                }, 2000);
            }

            if (end + 5 < inputRefs.current.length) {
                inputRefs.current[end + 1].focus();
            }
        } else {
            alert(`Row ${row + 1} is not filled.`);
        }
    }

    function handleKeyDown(e, index) {
        if (e.key.length === 1) {
            e.preventDefault();
            const newValues = [...inputValues];
            newValues[index - 1] = e.key.toUpperCase();
            setInputValues(newValues);

            const nextIndex = index + 1;
            if (index % 5 !== 0 && nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex]?.focus();
                setFocusedIndex(nextIndex);
            }
        } else if (e.key === "Backspace") {
            e.preventDefault();
            const newValues = [...inputValues];
            newValues[index - 1] = "";
            setInputValues(newValues);

            const prevIndex = index - 1;
            if (prevIndex >= 0 && prevIndex % 5 !== 0) {
                inputRefs.current[prevIndex]?.focus();
                setFocusedIndex(prevIndex);
            }
        }
    }

    const inputs = [];
    for (let i = 1; i <= 30; i++) {
        inputs.push(
            <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                value={inputValues[i - 1]}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onFocus={() => setFocusedIndex(i)}
                style={{ width: '60px', height: '60px', margin: '0', textAlign: 'center', border: '1px solid black' }}
            />
        );
    }

    return ((isLoggedIn || isGuest) &&
        <div className="container text-center">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Wordle</a>

                    {/* Username and score section */}
                    <div className="d-flex align-items-center">
                        <span className="navbar-text mx-3">Username: {user}</span>
                        <span className="navbar-text">Score: {scor}</span>
                    </div>

                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="btn btn-outline-primary mx-2" onClick={handleButtonClick}>?</button>
                            </li>
                            <li className="nav-item">
                                <Link to='/leaderboard'>
                                    <button className="btn btn-outline-secondary mx-2">
                                        Leaderboard
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '93vh' }}>
                {showImage && (
                    <div className="mb-4">
                        <img 
                            src={require("../images/HowtoPlay.PNG")}
                            alt="Placeholder" 
                            className="img-fluid" 
                        />
                    </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: '10px' }}>
                    {!showImage && inputs}
                </div>
                <div className="mt-3">
                    {!showImage && <button 
                        className="btn btn-success" 
                        onClick={onSubmit}
                    >
                        Submit
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default SecondPage;
