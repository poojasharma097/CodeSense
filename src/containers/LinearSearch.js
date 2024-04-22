import React, { useState, useEffect  } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

function AlgorithmVisualizer() {
    const [arr, setArr] = useState([]);
    const [N] = useState(13);
    const [inputValue, setInputValue] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [instructionSpoken, setInstructionSpoken] = useState(false);
    const { speak } = useSpeechSynthesis(); // Using the speech synthesis hook

    useEffect(() => {
        if (!instructionSpoken) {
            const timeoutId = setTimeout(() => {
                speak({ text: "Tap the generate array button to create a new array", queue: false });
                setInstructionSpoken(true);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [speak, instructionSpoken]);

    // Function to generate array
    const genArray = () => {
        const newArray = [];
        for (let i = 0; i < N; i++) {
            newArray.push({ value: Math.floor(Math.random() * 100 + 1), color: '#40E0D0' });
        }
        setArr(newArray);
        speak({ text: "Enter the number you want to search:", queue: false });
    };

    // Function to perform linear search
const linearSearch = async () => {
    const val = parseInt(inputValue);
    setResultMessage('');
    let foundIndex = -1;
    // Calculate a fixed delay for each iteration
    let delay = 500; // milliseconds

    // Iterate over each element in the array
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        // Await a Promise with a fixed delay for each iteration
        // eslint-disable-next-line no-loop-func
        await new Promise(resolve => {
            setTimeout(() => {
                // Perform actions for each element
                speak({ text: item.value.toString(), queue: false }); // Say the element being checked
                changeColor(i, 'red'); // Change color to red
                setTimeout(() => {
                    resetPopOut(); // Reset pop-out effect
                    if (item.value === val && foundIndex === -1) {
                        // If element is found, update foundIndex and resolve the Promise
                        foundIndex = i;
                        resolve();
                    } else if (i === arr.length - 1) {
                        // If last element and not found, update foundIndex and resolve the Promise
                        foundIndex = -1;
                        resolve();
                    } else {
                        // If not last element and not found, continue traversal
                        resolve();
                    }
                }, 250);
            }, i * delay); // Delay based on index for constant traversal speed
        });
        // If element is found, break out of the loop
        if (foundIndex !== -1) {
            break;
        }
    }

    // Display result message based on foundIndex
    if (foundIndex !== -1) {
        blinkBox(foundIndex);
        setResultMessage(`Element ${val} found at index: ${foundIndex}`);
        speak({ text: `Element ${val} found at index: ${foundIndex}`, queue: false });
    } else {
        setResultMessage(`Element ${val} does not exist!`);
        speak({ text: `Element ${val} does not exist!`, queue: false });
    }
};


    // Function to handle search
    const handleSearch = () => {
        if (inputValue === "") {
            setResultMessage('Please enter an element first');
            speak({ text: 'Please enter an element first', queue: false });
            return;
        }
        linearSearch();
    };

    // Function to change color of box
    const changeColor = (idx, color) => {
        const updatedArr = [...arr];
        updatedArr[idx] = { ...updatedArr[idx], color, popOut: true };
        setArr(updatedArr);
    };

    // Function to reset the pop-out effect
    const resetPopOut = () => {
        const updatedArr = arr.map(item => ({ ...item, popOut: false }));
        setArr(updatedArr);
};

    // Function to make box blink
    const blinkBox = (idx) => {
        const interval = setInterval(() => {
            changeColor(idx, 'green', '100px');
            setTimeout(() => {
                changeColor(idx, '#40E0D0', '70px');
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
    );
}

export default AlgorithmVisualizer;
