import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function AlgorithmVisualizer() {
    const [arr, setArr] = useState([]);
    const [N] = useState(8); // Adjusted array size to 8
    const [inputValue, setInputValue] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [instructionSpoken, setInstructionSpoken] = useState(false);
    const { speak } = useSpeechSynthesis();

    useEffect(() => {
        if (!instructionSpoken) {
            const timeoutId = setTimeout(() => {
                speak({ text: "Tap the generate array button to create a new array", queue: false });
                setInstructionSpoken(true);
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [speak, instructionSpoken]);

    const genArray = () => {
        const newArray = [];
        for (let i = 0; i < N; i++) {
            newArray.push({ value: Math.floor(Math.random() * 100 + 1), color: '#40E0D0' });
        }
        setArr(newArray);
        speak({ text: "Enter the number you want to search:", queue: false });
    };

    const linearSearch = async () => {
        const val = parseInt(inputValue);
        setResultMessage('');
        let foundIndex = -1;
        let delay = 1500; // milliseconds

        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];

            // Perform the search operation synchronously
            // eslint-disable-next-line no-loop-func
            await new Promise(resolve => {
                setTimeout(() => {
                    speak({ text: `Searching index ${i}`, queue: false });
                    changeColor(i, 'red');
                    setTimeout(() => {
                        resetPopOut();
                        if (item.value === val && foundIndex === -1) {
                            foundIndex = i;
                            speak({ text: `Element ${val} found at index ${i}`, queue: false });
                        } else if (i === arr.length - 1) {
                            speak({ text: `Element ${val} not found`, queue: false });
                        } else {
                            speak({ text: `Element ${item.value} not equal`, queue: false });
                        }
                        // Move to the next iteration after all operations are done
                        resolve();
                    }, 950); // Adjust this timeout as needed
                }, i * delay); // Delay between each iteration
            });

            // Break the loop if the element is found
            if (foundIndex !== -1) {
                break;
            }
        }

        // Perform any UI updates or actions after the search is complete
        if (foundIndex !== -1) {
            blinkBox(foundIndex);
            setResultMessage(`Element ${val} found at index: ${foundIndex}`);
        } else {
            setResultMessage(`Element ${val} does not exist!`);
        }
    };

    const handleSearch = () => {
        if (inputValue === "") {
            setResultMessage('Please enter an element first');
            speak({ text: 'Please enter an element first', queue: false });
            return;
        }
        linearSearch();
    };

    const changeColor = (idx, color) => {
        const updatedArr = [...arr];
        updatedArr[idx] = { ...updatedArr[idx], color, popOut: true };
        setArr(updatedArr);
    };

    const resetPopOut = () => {
        const updatedArr = arr.map(item => ({ ...item, popOut: false }));
        setArr(updatedArr);
    };

    const blinkBox = (idx) => {
        const interval = setInterval(() => {
            changeColor(idx, 'green');
            setTimeout(() => {
                changeColor(idx, '#40E0D0');
            }, 500);
        }, 1000);
        setTimeout(() => clearInterval(interval), 3000);
    };

    const explanationText = [
        "The algorithm would start at the beginning of the array and compare the 0th index to the target value. ",
        "If it is not equal, the algorithm would move on to the next index. ",
        "The algorithm would continue comparing each element in the array to the target value until it either finds a match or reaches the end of the array."
    ];

    const speakExplanation = () => {
        explanationText.forEach(text => {
            speak({ text, queue: true });
        });
    };

    const speakLaymansExplanation = () => {
        const laymansExplanation = "Here is a simple explanation of the linear search algorithm: " +
            "Imagine you are looking for a specific book in a library. You start at the beginning of the bookshelf " +
            "and look at each book one by one until you find the book you are looking for. If you reach the end of " +
            "the bookshelf without finding the book, then the book is not in the library. This is essentially how " +
            "the linear search algorithm works. It starts at the beginning of an array and compares each element " +
            "in the array to the target value. If a match is found, the algorithm returns the index of the element. " +
            "If no match is found, the algorithm returns -1 or not found message.";
        speak({ text: laymansExplanation, queue: false });
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '70%', textAlign: 'center' }}>
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
                <label htmlFor="texty" style={{ fontSize: '2em', fontWeight: 'bold', color: 'white' }}>Enter the number you want to search:</label>
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
                    marginTop: '20px',
                }}>Linear Search</button>
                <div style={{
                    fontSize: '2em',
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: '20px',
                }}>{resultMessage}</div>
            </div>
            <div style={{ width: '33%', backgroundColor: '#343a40', color: 'white', padding: '20px', textAlign: 'center', minHeight: 'fit-content' }}>
                <button onClick={speakExplanation} style={{
                    padding: '10px',
                    fontSize: '1.5em',
                    borderRadius: '5px',
                    border: '2px solid #28a745',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    cursor: 'pointer',
                    marginBottom: '20px',
                }}>Explanation</button>
                <p style={{fontWeight: 'bold', fontSize: '1.2em', lineHeight: '1.6' }}>{explanationText}</p> 
            </div>
        </div>
        
    );
}

export default AlgorithmVisualizer;
