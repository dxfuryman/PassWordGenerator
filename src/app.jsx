import React, { useState, useCallback, useEffect } from 'react';
import './App.css'; // Make sure to have an App.css file for styling

function App() {
    // State variables to store password settings
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [Password, setPassword] = useState("");

    // Password generation logic (executed whenever dependencies change)
    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*(){}:;?/,<.>`~";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword]);

    // Generate password on load and when settings change
    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed, passwordGenerator]);

    return (
        <>
            <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 border-2 border-white align-middle'>
                <h1 className='text-4xl text-center text-white my-3S mb-2'>Password generator</h1>
                <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                    <input
                        type="text"
                        value={Password}
                        className="outline-none w-full py-1 px-3"
                        placeholder="Password"
                        readOnly={true}
                    />
                    <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 flex align-middle'>Copy</button>
                </div>
                <div className='flex text-sm gap-x-2 pb-4'>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="range"
                            min={6}
                            max={100}
                            value={length}
                            className="cursor-pointer"
                            onChange={(e) => {setLength(e.target.value)}}
                        />
                        <label>Length: {length}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={numberAllowed}
                            id="numberInput"
                            onChange={() => {
                                setNumberAllowed((prev) => !prev);
                            }}
                        />
                        <label htmlFor="numberInput">Numbers</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            defaultChecked={charAllowed}
                            id="characterInput"
                            onChange={() => {
                                setCharAllowed((prev) => !prev);
                            }}
                        />
                        <label htmlFor="numberInput">Characters</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
