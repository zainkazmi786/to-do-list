import React, { useState, useEffect } from 'react';

const Box = ({color , heading }) => {

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
        const isChecked = event.target.checked;
        if (isChecked) {
            setCheckedItems([...checkedItems, value]);
        } else {
            setCheckedItems(checkedItems.filter(item => item !== value));
        }
    };

    const deltask = () => {
        sethide2(!hide2);
        settodo(todos.filter(item => !checkedItems.includes(item)));
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
        }
    }, [todos]);
    return (
        <div className={`${color} w-5/6 h-96 relative rounded-xl flex`}>
            <div className="bg-slate-950 absolute h-20 w-full rounded-t-xl text-cyan-50 flex items-center justify-center">
                <div className="buttons bg-slate-700 h-12 w-4/5 rounded-lg flex justify-evenly items-center border-2 ">
                    <form id='add' className={`${hide ? "hidden" : ""} ${hide3 ? "" : "hidden"}  flex w-full justify-evenly`} onSubmit={handlesubmit}>
                        <input className="h-3/4 w-2/3 text-black" type="text" id='add' value={inputValue} onChange={handlechange} />
                        <button type="submit">Add</button>
                        <button onClick={addclick}>X</button>
                    </form>
                    <form id='edit' className={`${hide3 ? "hidden" : ""} flex w-full justify-evenly`} onSubmit={submitedit}>
                        <input className="h-3/4 w-2/3 text-black" id='edit' type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                        <button type="submit">Edit</button>
                        <button onClick={() => {sethide(true); sethide3(true)}} >X</button>
                    </form>
                    <div className={`${hide ? "" : "hidden"} ${hide2 ? "hidden" : ""} ${hide3 ? "" : "hidden"} flex w-full justify-evenly`}>
                        <button className="" onClick={addclick}>ADD TASK</button>
                        <button className="" onClick={() => sethide2(!hide2)}>DELETE TASK</button>
                    </div>
                    <button className={`${hide2 ? "" : "hidden"}`} onClick={deltask}>DELETE</button>
                </div>
            </div>
            <div className="text-white absolute top-20 w-full flex flex-col items-center h-full">
                <div className="heading h-1/5 flex items-center">
                <h1 className='border-2'>{heading}</h1>
                </div>
                <ul className={`${hide2 ? "hidden" : ""} w-full flex flex-col items-center h-4/5`}>
                    {todos.map((item, index) => (
                        <li className='flex justify-between w-5/6 border-2' key={index}>
                            <p>{item}</p>
                            <button onClick={() => handleedit(item)}>Edit</button>
                        </li>
                    ))}
                </ul>
                <ul className={`${hide2 ? "" : "hidden"} w-3/4 flex flex-col items-start`}>
                    {todos.map((item, index) => (
                        <li key={index}>
                            <input type="checkbox" id={`${color+index}`} value={item} onChange={handleCheckboxChange} />
                            <label htmlFor={item}>{item}</label>
                        </li>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}

export default Box;
