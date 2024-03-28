import { useState } from 'react'
import Box from './components/box'
import './App.css'
import "./assets/pexels-breakingpic-3299.jpg"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full h-screen relative flex flex-col overflow-hidden'>

        <div className="image h-1/3 w-full bg-green-900 flex items-start absolute top-0">
          <img className='w-full h-full object-cover overflow-hidden' src="https://blog.teamup.com/wp-content/uploads/2021/12/todo-header.png" alt="" />
           {/* <div className="absolute w-full h-full z-10 opacity-50 bg-lime-950"></div> */}
        </div>
        <div className="h-3/4 grid grid-cols-4 absolute top-60 w-full bg-black z-20 rounded-t-3xl">


          <div className="grid-item flex justify-center items-center"><Box color = "bg-indigo-800" heading= "TODAY"/></div>
          <div className="grid-item flex justify-center items-center"><Box color = "bg-rose-800" heading="THIS WEEK" /></div>
          <div className="grid-item flex justify-center items-center"><Box color = "bg-fuchsia-800" heading="THIS YEAR" /></div>
          <div className="grid-item flex justify-center items-center"><Box color= "bg-green-800" heading="LONG TERM" /></div>

 

        </div>  
      </div>
    </>
  )
}

export default App
