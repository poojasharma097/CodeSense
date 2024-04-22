import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function AlgorithmVisualizer() {
    const [arr, setArr] = useState([]);
    const [sortedArr, setSortedArr] = useState([]);
    const [N] = useState(13);
    const [inputValue, setInputValue] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [instructionSpoken, setInstructionSpoken] = useState(false);
    const { speak } = useSpeechSynthesis(); // Using the speech synthesis hook

    useEffect(() => {
        if (!instructionSpoken) {
            const timeoutId = setTimeout(() => {
                speak({ text: "Tap the generate array button to create a new unsorted array", queue: false });
                setInstructionSpoken(true);
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [speak, instructionSpoken]);

    const genArray = () => {
        setResultMessage(''); // Clear result message
        const newArray = [];
        for (let i = 0; i < N; i++) {
            newArray.push({ value: Math.floor(Math.random() * 100 + 1), color: '#40E0D0' });
        }
        setArr(newArray);
        speak({ text: "Unsorted array generated", queue: false });
        displayAndSortArray(newArray);
    };

    const displayAndSortArray = (array) => {
        setTimeout(() => {
            const sortedArray = [...array].sort((a, b) => a.value - b.value);
            setSortedArr(sortedArray);
            speak({ text: "Sorting the generated array", queue: false });
            setTimeout(() => {
                speak({ text: "Array sorted", queue: false });
                speak({ text: "Enter the number you want to search:", queue: false });
            }, 3000); // Delay for sorting visualization
        }, 3000); // Delay for unsorted array display
    };

    const binarySearch = async () => {
        const val = parseInt(inputValue);
        let low = 0;
        let high = sortedArr.length - 1;
        let foundIndex = -1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midVal = sortedArr[mid].value;

            await new Promise(resolve => {
                setTimeout(() => {
                    speak({ text: `Checking ${midVal}.`, queue: false });
                    changeColor(mid, 'red'); // Change color to red
                    setSortedArr([...sortedArr]); // Update the state to re-render

                    if (midVal === val) {
                        foundIndex = mid;
                        resolve();
                    } else if (midVal < val) {
                        low = mid + 1;
                        resolve();
                    } else {
                        high = mid - 1;
                        resolve();
                    }
                }, 1000); // Delay for visualization
            });

            changeColor(mid, '#40E0D0'); // Resetting box color after check
            setSortedArr([...sortedArr]); // Update the state to re-render

            if (foundIndex !== -1) {
                break;
            }
        }

        if (foundIndex !== -1) {
            blinkBox(foundIndex);
            setResultMessage(`Element ${val} found at index: ${foundIndex}`);
            speak({ text: `Element ${val} found at index: ${foundIndex}`, queue: false });
        } else {
            setResultMessage(`Element ${val} does not exist!`);
            speak({ text: `Element ${val} does not exist!`, queue: false });
        }
    };

    const handleSearch = () => {
        if (inputValue === "") {
            setResultMessage('Please enter an element first');
            speak({ text: 'Please enter an element first', queue: false });
            return;
        }
        binarySearch();
    };

    // Function to change color of box
    const changeColor = (idx, color) => {
        const updatedArr = [...sortedArr];
        updatedArr[idx] = { ...updatedArr[idx], color };
        setSortedArr(updatedArr);
    };

    // Function to make box blink
    const blinkBox = (idx) => {
        const interval = setInterval(() => {
            changeColor(idx, 'green');
            setTimeout(() => {
                changeColor(idx, '#40E0D0');
            }, 250);
        }, 500);
        setTimeout(() => clearInterval(interval), 3000);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <button onClick={genArray} style={{
                padding: '10px',
                fontSize: '1.5em',
                borderRadius: '5px',
                border: '2px solid #28a745',
                backgroundColor: '#28a745',
                color: '#fff',
                cursor: 'pointer',
                marginBottom: '20px',
            }}>Generate Array</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {arr.map((item, idx) => (
                    <div key={idx} style={{
                        margin: '10px',
                        width: '70px',
                        height: '70px',
                        backgroundColor: item.color,
                        textAlign: 'center',
                        lineHeight: '70px',
                        fontSize: '2.5em',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
                    }}>{item.value}</div>
                ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
                {sortedArr.map((item, idx) => (
                    <div key={idx} style={{
                        margin: '10px',
                        width: '70px',
                        height: '70px',
                        backgroundColor: item.color,
                        textAlign: 'center',
                        lineHeight: '70px',
                        fontSize: '2.5em',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
                    }}>{item.value}</div>
                ))}
            </div>
            <label htmlFor="texty" style={{ fontSize: '2em', fontWeight: 'bold', color: 'white', marginTop: '20px' }}>Enter the number you want to search:</label>
            <br />
            <input type="text" id="texty" value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{
                padding: '10px',
                fontSize: '2em',
                borderRadius: '10px',
                border: '3px solid #ccc',
                marginBottom: '20px',
            }} />
            <br />
            <button onClick={handleSearch} style={{
                padding: '15px',
                fontSize: '2em',
                borderRadius: '10px',
                border: '3px solid #007bff',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
            }}>Binary Search</button>
            <div style={{
                fontSize: '2em',
                fontWeight: 'bold',
                color: 'white',
                marginTop: '20px',
            }}>{resultMessage}</div>
        </div>
    );
}

export default AlgorithmVisualizer;
