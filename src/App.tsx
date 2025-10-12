import { useState } from 'react'
import './App.css'
import NumericKeyboard from './components/NumericKeyboard'

function App() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleInput = (key: string) => {
      if (key === "OK") return setOpen(false);
      if (key === "←") return setValue((v) => v.slice(0, -1));
      setValue((v) => v + key);
    };

    const onSave = () => {
      setValue("")
      setCategory("")
    }
    return (
      <div className="container relative p-4 h-screen bg-gray-100">
        <div className='w-full h-12 border-b border-gray-300'>
          <p onClick={() => setOpen(true)} className="text-2xl mb-4">{value && '€'}{value || "Expance"}</p>
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full text-2xl outline-none h-12 border-b border-gray-300'>
          <option value={''}>Category</option>
          <option value={'Market'}>Market</option>
          <option value={'Clothes'}>Clothes</option>
          <option value={'Eat outside'}>Eat outside</option>
          <option value={'Subscription'}>Subscription</option>
        </select>
        

        <NumericKeyboard
          isOpen={open}
          onClose={() => setOpen(false)}
          onInput={handleInput}
        />
        <div className='w-full flex justify-center mt-50'>
          <button onClick={() => onSave()} className="px-4 py-2 rounded-full text-2xl min-w-[150px] bg-green-600 text-white font-medium">
            Save
          </button>
        </div>
        
        {/* <CameraComponent/> */}
        <nav>

        </nav>  
      </div>
    )
}

export default App
