import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./box.css"

const Box = ({ color, heading }) => {

    const [hide, sethide] = useState(true);
    const [hide2, sethide2] = useState(false);
    const [hide3, sethide3] = useState(true);
    const [inputValue, setinputValue] = useState("");
    const [todos, settodo] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [editValue, setEditValue] = useState("");
    const [old, setold] = useState("")



    const addclick = () => {
        sethide(!hide);
    };

    const handlechange = (e) => {
        const value = e.target.value;
        setinputValue(value);
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (inputValue) {
            settodo([...todos, inputValue]);
            setinputValue("");
        }
    };

    const handleCheckboxChange = (event) => {
        const { value } = event.target; // Get the value of the checkbox input
        const isChecked = event.target.checked; // Get the checked state of the checkbox

        setCheckedItems(prevCheckedItems => {
            if (isChecked) {
                return [...prevCheckedItems, value]; // Add the value to the checkedItems array if checked
            } else {
                return prevCheckedItems.filter(item => item !== value); // Remove the value from the checkedItems array if unchecked
            }
        });

        console.log(checkedItems); // Log the updated checkedItems
    };


    const deltask = () => {
        sethide2(!hide2);
        if (checkedItems.length > 0) {
            const filteredTodos = todos.filter(item => !checkedItems.includes(item));
            settodo(filteredTodos); // Update todos state with filtered items
        }
        setCheckedItems([]); // Clear checkedItems state
    };

    const handleedit = (item) => {
        sethide3(!hide3);
        setold(item)
        setEditValue(item);

    };
    const submitedit = (e) => {
        e.preventDefault();
        settodo(prevTodos => {
            const elementIndex = prevTodos.indexOf(old);
            if (elementIndex !== -1) {
                const updatedTodos = [...prevTodos];
                updatedTodos[elementIndex] = editValue;
                return updatedTodos;
            }
            return prevTodos;
        });

    };


    useEffect(() => {
        const storedTodos = (localStorage.getItem(`todos_${heading}_${color}`));
        if (storedTodos) {
            settodo(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        // Check if todos array is not empty before saving to local storage
        if (todos.length > 0) {

            localStorage.setItem(`todos_${heading}_${color}`, JSON.stringify(todos));
        } else {
            localStorage.setItem(`todos_${heading}_${color}`, JSON.stringify(todos));

        }


    }, [todos]);
    return (
        <div className={`box ${color} w-5/6 h-96 relative rounded-xl flex box-shadow`}>
            <div className="bg-slate-900 absolute h-20 w-full rounded-t-xl text-cyan-50 flex items-center justify-center">
                <div className="buttons bg-emerald-900 h-12 w-4/5 rounded-full flex justify-evenly items-center border-2 ">
                    <form id='add' className={`${hide ? "hidden" : ""} ${hide3 ? "" : "hidden"}  flex w-full justify-evenly`} onSubmit={handlesubmit}>
                        <input className="h- w-4/5 rounded-l-full text-white p-2 rounded-lg bg-inherit border-slate-800" type="text" id='add' value={inputValue} onChange={handlechange} />
                        <button className="h-12 w-1/5 rounded-r-full bg-inherit border-2 hover:bg-slate-800" type="submit" onClick={addclick}>Add</button>
                        {/* <button onClick={addclick}>X</button> */}
                    </form>
                    <form id='edit' className={`${hide3 ? "hidden" : ""} flex w-full justify-evenly`} onSubmit={submitedit}>
                        <input className="h- w-4/5 rounded-l-full text-white p-2 rounded-lg bg-inherit border-slate-800" id='edit' type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                        <button className='h-12 w-1/5 rounded-r-full bg-inherit border-2 hover:bg-slate-800' type="submit" onClick={() => { sethide(true); sethide3(true) }}>Edit</button>
                        {/* <button onClick={() => {sethide(true); sethide3(true)}} >X</button> */}
                    </form>
                    <div className={`${hide ? "" : "hidden"} ${hide2 ? "hidden" : ""} ${hide3 ? "" : "hidden"} h-full flex w-full justify-evenly`}>
                        <button className="border-2 w-1/2 h-full rounded-l-full hover:bg-slate-800" onClick={addclick}>ADD TASK</button>
                        <button className="border-2 w-1/2 h-full rounded-r-full hover:bg-slate-800" onClick={() => sethide2(!hide2)}>DELETE TASK</button>
                    </div>
                    <button className={`${hide2 ? "" : "hidden"} h-full w-full rounded-full hover:bg-slate-800`} onClick={deltask}>DELETE</button>
                </div>
            </div>
            <div className="text-white absolute top-20 w-full flex flex-col items-center h-full gap-1 p-1">
                <div className="heading h-1/5 flex items-center font-sans">
                    <h1 className='font-bold text-2xl underline'>{heading}</h1>
                </div>
                <ul className={`${hide2 ? "hidden" : ""} h-1/2 w-full flex flex-col items-center gap-3 overflow-auto`}>
                    {todos.map((item, index) => (
                        <li className='flex justify-between w-5/6' key={index}>
                            <p className='w-2/3 font-semibold text-lg'>{`${index+1 + ". " + item}`}</p>
                            <button className='h-10 w-14 rounded-lg bg-sky-900 hover:bg-sky-500' onClick={() => handleedit(item)}>Edit</button>
                        </li>
                    ))}
                </ul>
                <ul className={`${hide2 ? "" : "hidden"} w-3/4 flex flex-col items-start`}>
                    {todos.map((item, index) => (
                        <li key={index}>
                            <input type="checkbox" id={uuidv4()} value={item} onChange={handleCheckboxChange} />
                            <label htmlFor={item}>{item}</label>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default Box;
