import { useState, useEffect } from 'react';
import Box from './components/box';
import './App.css';
import './assets/pexels-breakingpic-3299.jpg';

function App() {
  const todo = ["T", "o", "-", "D", "o", " ", "L", "i", "s", "t"];
  const [renderedTodo, setRenderedTodo] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {
      if (index < todo.length) {
        setRenderedTodo(prevRenderedTodo => prevRenderedTodo + todo[index]);
        setIndex(index + 1);
      } else {
        clearInterval(timer);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [todo]);

  return (
    <>
      <div className='w-full h-screen relative flex flex-col overflow-hidden bg-black gap-20'>

        <div className=" w-full flex items-center justify-center">
          <div className="textblock flex justify-center items-center w-full">
            <span className="head tracking-widest font-extrabold font-sans text-with-shadow h-1/3"> {renderedTodo} </span>

            <span className='head font-extrabold font-mono text-with-shadow'>_</span>
          </div>
        </div>

        <div className="h-3/4 grid lg:grid-cols-4 grid-cols-1 gap-10 w-full rounded-t-3xl overflow-auto">
          <div className="grid-item flex justify-center items-center p-3"><Box color="bg-indigo-800" heading="TODAY" /></div>
          <div className="grid-item flex justify-center items-center p-3"><Box color="bg-rose-800" heading="THIS WEEK" /></div>
          <div className="grid-item flex justify-center items-center p-3"><Box color="bg-fuchsia-800" heading="THIS YEAR" /></div>
          <div className="grid-item flex justify-center items-center p-3"><Box color="bg-green-800" heading="LONG TERM" /></div>
        </div>
      </div>
    </>
  )
}

export default App;
