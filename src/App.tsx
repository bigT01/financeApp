import { useEffect, useState } from 'react'
import './App.css'
import NumericKeyboard from './components/NumericKeyboard'
import type { IState } from './constants/interface';
import { useStore } from './store/useStore';

function App() {
    const categories = useStore((state: IState) => state.categories);
    const loading = useStore((state: IState) => state.loading);

    const getAllCategories = useStore((state: IState) => state.getAllCategories);
    const createTransaction = useStore((state: IState) => state.createTransaction);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("");

    const handleInput = (input: string) => {
    switch (input) {
      case "←":
        // Удалить последний символ
        setValue(prev => prev.slice(0, -1));
        break;
      case "OK":
        // Подтвердить ввод и закрыть клавиатуру
        setOpen(false);
        // onClose(); // Вызвать закрытие, если бы оно было доступно здесь
        break;
      default:
        // Добавить цифру или точку
        // Можно добавить здесь логику, чтобы не допустить две точки
        if (input === '.' && value.includes('.')) {
          return; 
        }
        setValue(prev => prev + input);
        break;
    }
  };

    const onSave = () => {
      if(Number(category) && Number(value) > 0) {
        createTransaction({
          amount: Number(value),
          category: categories.find((item) => item.id === Number(category)),
          description: '',
        })
      }
      
      setValue("")
      setCategory("")
    }

    useEffect(() => {
      getAllCategories()
    },[])
    return (
      <div className="container relative p-4 h-screen bg-gray-100">
        <div className='w-full h-12 border-b border-gray-300'>
          <p onClick={() => setOpen(true)} className="text-2xl mb-4">{value && '€'}{value || "Expance"}</p>
        </div>

        {categories.length > 0 && (
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full text-2xl outline-none h-12 border-b border-gray-300'>
            <option value={''}>Category</option>
            {categories.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        )}
        
        

        <NumericKeyboard
          isOpen={open}
          onClose={() => setOpen(false)}
          onInput={handleInput}
        />
        <div className='w-full flex justify-center mt-50'>
          <button onClick={() => onSave()} className="px-4 py-2 rounded-full text-2xl min-w-[150px] bg-green-600 text-white font-medium">
            {loading.status && loading.name === "CREATE_TRANSACTION" ? "Saving" : "Save"}
          </button>
        </div>
        
        {/* <CameraComponent/> */}
        <nav>

        </nav>  
      </div>
    )
}

export default App
