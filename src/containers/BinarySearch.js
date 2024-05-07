import React, { useState, useEffect, useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useNavigate } from "react-router-dom";

function AlgorithmVisualizer() {
    const navigate = useNavigate();
    const [arr, setArr] = useState([]);
    const [sortedArr, setSortedArr] = useState([]);
    const [N] = useState(8);
    const [inputValue, setInputValue] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [instructionSpoken, setInstructionSpoken] = useState(false);
    const { speak, stop } = useSpeechSynthesis(); // Using the speech synthesis hook

    useEffect(() => {
        if (!instructionSpoken) {
            const timeoutId = setTimeout(() => {
                speak({ text: "Tap the generate array button to create a new unsorted array", queue: false });
                setInstructionSpoken(true);
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [speak, instructionSpoken]);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'q') {
          console.log(`Key pressed: ${event.key}`);
          navigate("/assessment/quiz");
          stop();
        }
        else if (event.key === 'g') {
          console.log(`Key pressed: ${event.key}`);
          navigate("/assessment/board");
          stop();
        }
        else if (event.key === 'c') {
          console.log(`Key pressed: ${event.key}`);
          navigate("/CodeSense");
          stop();
        }
        else if (event.key === 'h') {
          console.log(`Key pressed: ${event.key}`);
          navigate("/");
          stop();
        }
        else if (event.key === 's') {
          console.log(`Key pressed: ${event.key}`);
          genArray();
        }
        else {
          speak({
            text: "Invalid key! Try again. ",
          });
        }
      }, []);
    
      useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);
    
        // remove the event listener
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);

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
            let s = "The elements of array are ";
            for (var i=0;i<sortedArray.length;i++) {
                s += sortedArray[i].value;
                s += " ";
            } 
            s += ". Enter the number you want to search:";
            setTimeout(() => {
                // speak({ text: "Array sorted", queue: false });
                speak({ text: s, queue: false });
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

        // Highlight the search space
        const searchSpaceStart = low;
        const searchSpaceEnd = high;
        await new Promise(resolve => {
            setTimeout(() => {
                speak({ text: `Searching from index ${searchSpaceStart} to ${searchSpaceEnd}.`, queue: false });
                let currentIndex = searchSpaceStart;
                const colorChangeInterval = setInterval(() => {
                    if (currentIndex > searchSpaceEnd) {
                        clearInterval(colorChangeInterval);
                        resolve();
                    } else {
                        changeColor(currentIndex, 'yellow'); // Highlight search space in yellow
                        currentIndex++;
                    }
                }, 550); // Delay between color changes
            }, 1500); // Delay for visualization
        });

            await new Promise(resolve => {
                setTimeout(() => {
                    speak({ text: `Comparing the target with middle element ${midVal}.`, queue: false });
                    changeColor(mid, 'yellow'); 
                    resolve();
                }, 1200); // Delay for visualization
            });
    
            if (midVal === val) {
                foundIndex = mid;
                break;
            } else if (midVal < val) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
    
            // Reset color after each check
            changeColor(mid, 'defaultColor');
        }
    
        if (foundIndex !== -1) {
            blinkBox(foundIndex);
            speak({ text: `Element ${val} found at index: ${foundIndex}`, queue: false });
            setResultMessage(`Element ${val} found at index: ${foundIndex}`);
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


    // Explanation text for binary search
    const explanationText = [
        "The binary search algorithm works on a sorted array by repeatedly dividing the search interval in half. ",
        "It compares the target value with the middle element of the array. ",
        "If they match, its position is returned. ",
        "If the target value is less than the middle element, the search continues in the lower half. ",
        "If the target value is greater than the middle element, the search continues in the upper half. ",
        "The process continues until the target value is found or the search interval is empty."
    ];

    // Function to speak out the binary search explanation
    const speakExplanation = () => {
        explanationText.forEach(text => {
            speak({ text, queue: true });
        });
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