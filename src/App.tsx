import { useState } from 'react'
import './App.css'
import NumericKeyboard from './components/NumericKeyboard'

function App() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const handleInput = (key: string) => {
      if (key === "OK") return setOpen(false);
      if (key === "←") return setValue((v) => v.slice(0, -1));
      setValue((v) => v + key);
    };
    return (
      <div className="container p-4 h-screen bg-gray-100">
        <div className='w-full h-12 border-b border-gray-300'>
          <p onClick={() => setOpen(true)} className="text-2xl mb-4">{value && '€'}{value || "Expance"}</p>
        </div>
        

        <NumericKeyboard
          isOpen={open}
          onClose={() => setOpen(false)}
          onInput={handleInput}
        />
      </div>
    )
}

export default App
