import { useState } from 'react'
import './App.css'
import type { IFinanceData, IInputFinance } from './constants/interface'

function App() {
  const [isIncome, setIsIncome] = useState<boolean>(false)
  const [value, setValue] = useState<IInputFinance | null>(null)
  const [data, setData] = useState<IFinanceData[]>([])


  const valueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [e.target.id]: e.target.value})
  }
  const saveHandler = () => {
    if(value?.amount && value?.category && value.date){
        setData(old => [...old, {...value, type: isIncome? 'income': 'outcome'}])
    }
  }
    return (
      <div className='flex w-screen h-screen flex-col justify-center items-center'>
        <div className='flex gap-5 sm:flex-row flex-wrap flex-col mb-5'>
          <button onClick={() => setIsIncome((old) => !old)} className={`cursor-pointer ${isIncome ? 'bg-blue-700': 'bg-red-700'} text-white px-4 py-2 rounded-sm`}>{isIncome? 'income' : 'outcome'}</button>
          <input onChange={(e) => valueHandler(e)} id='category' placeholder='category' type="text" className='w-[200px] border-blue-800 border-[1px] outline-none rounded-sm px-4 py-2'/>
          <input onChange={(e) => valueHandler(e)} id='amount' placeholder='amount' type="number" className='w-[200px] border-blue-800 border-[1px] outline-none rounded-sm px-4 py-2'/>
          <input onChange={(e) => valueHandler(e)} id='date' placeholder='date' type="date" className='w-[200px] border-blue-800 border-[1px] outline-none rounded-sm px-4 py-2'/>
          <button className='cursor-pointer bg-green-700 text-white px-4 py-2 rounded-sm' onClick={() => saveHandler()}>Submit</button>
        </div>
        {/* TABLE */}
        <div className='overflow-x-auto w-[80vw]  rounded-lg border border-gray-200'>
          <table className='min-w-full w-[500px] divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr >
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((financeRow: IFinanceData) => (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">{financeRow.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{financeRow.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{financeRow.date}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${financeRow.type === 'outcome' ? 'text-red-800' : 'text-green-800'}`}>{financeRow.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        
      </div>
    )
}

export default App
