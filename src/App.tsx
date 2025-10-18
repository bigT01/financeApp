import { useEffect, useState } from 'react'
import './App.css'
import NumericKeyboard from './components/NumericKeyboard'
import { IoMdAddCircleOutline } from 'react-icons/io';
import type { IState } from './constants/interface';
import { useStore } from './store/useStore';


function App() {
    const transactions = useStore((state: IState) => state.transactions);
    const getAllTransactions = useStore((state: IState) => state.getAllTransactions);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      getAllTransactions();
    }, [])

    return (
      <div className="container relative p-4 h-screen bg-gray-100">
        <table className='w-full mb-20'>
          <thead>
            <tr className='border-b border-gray-300'>
              <th className='text-left p-2'>Category</th>
              <th className='text-right p-2'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions && transactions.map(transaction => (
              <tr key={transaction.id} className='border-b border-gray-200'>
                <td className='p-2'>{transaction.category ? transaction.category.name : "No Category"}</td>
                <td className='p-2 text-right'>€{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <NumericKeyboard
          isOpen={open}
          onClose={() => setOpen(false)}
        />
        {/* <CameraComponent/> */}
        <nav className='fixed bottom-10 w-[90%] rounded-2xl bg-gray-900 flex items-center px-2 justify-center h-[48px]'>
          <button onClick={() => setOpen(true)}><IoMdAddCircleOutline size={40} color='#FFFFFF'/></button>
        </nav>  
      </div>
    )
}

export default App
