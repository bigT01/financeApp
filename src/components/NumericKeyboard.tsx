import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CategorySelect from "./select/categorySelect";
import type { IState } from "../constants/interface";
import { useStore } from "../store/useStore";

interface NumericKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NumericKeyboard({
  isOpen,
  onClose,
}: NumericKeyboardProps) {
  const categories = useStore((state: IState) => state.categories);
  const createTransaction = useStore((state: IState) => state.createTransaction);

  const [value, setValue] = useState("")
  const [category, setCategory] = useState("")
  // Новая раскладка: 1-9, '.', '0', '←', 'OK' (12 кнопок)
  // Кнопка '.' добавлена на место '0'. '0' теперь на месте '←'.
  // ← и OK остались, как были.
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "←", "Save"];

  const onSave = () => {
      if(Number(category) && Number(value) > 0) {
        createTransaction({
          amount: Number(value),
          category: categories.find((item) => item.id === Number(category)),
          description: "",
        })
      }
      
      setValue("")
      setCategory("")
      onClose();
    }
  // Логика обработки нажатий
  const handleInput = (input: string) => {
    switch (input) {
      case "←":
        // Удалить последний символ
        setValue(prev => prev.slice(0, -1));
        break;
      case "Save":
        onSave();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* затемнение фона */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* сама клавиатура */}
          <motion.div
            id="keyboard-container"
            className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50 rounded-t-3xl p-4 pb-6"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <CategorySelect onHandleChange={e => setCategory(e)}/>
            <p className="text-center mb-2 opacity-40">Expenses</p>
            <p className="bg-gray-800 w-full text-center p-4 text-4xl rounded-2xl mb-4"><span className={value ? "opacity-100" : "opacity-50"}>€</span>{value}</p>

            <div className="grid grid-cols-3 gap-3">
              {/* Используем кнопку "." вместо "0" в третьем ряду. 
                  Перемещаем "0" и "←" в нижний ряд.
              */}
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleInput(btn)}
                  className={`py-4 text-xl font-semibold rounded-2xl ${
                    btn === "Save"
                      ? "bg-green-500 text-white w-full col-span-3"
                      : btn === "←"
                      ? "bg-gray-700"
                      : btn === "." || btn === "0"
                      ? "bg-gray-800" // Одинаковый стиль для '.' и '0'
                      : "bg-gray-800" // Стиль для 1-9
                  }`}
                >
                  {/* Заменяем ← на более понятный символ backspace */}
                  {btn === "←" ? "⌫" : btn}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}