import { motion, AnimatePresence } from "framer-motion";

interface NumericKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onInput: (value: string) => void;
}

export default function NumericKeyboard({
  isOpen,
  onClose,
  onInput,
}: NumericKeyboardProps) {
  // Новая раскладка: 1-9, '.', '0', '←', 'OK' (12 кнопок)
  // Кнопка '.' добавлена на место '0'. '0' теперь на месте '←'.
  // ← и OK остались, как были.
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "←", "OK"];

  // Логика обработки нажатий
  const handleButtonClick = (btn: string) => {
    // Используем пропс onInput для всех действий.
    // Это сохраняет исходный интерфейс компонента.
    onInput(btn);
    
    // Внимание: Если вам нужна разная логика (например, закрыть клавиатуру
    // при нажатии OK) в родительском компоненте, вам нужно будет 
    // обрабатывать эти специальные строки ('←', 'OK', '.')
    // в родительском компоненте, используя if/switch.
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
            <div className="grid grid-cols-3 gap-3">
              {/* Используем кнопку "." вместо "0" в третьем ряду. 
                  Перемещаем "0" и "←" в нижний ряд.
              */}
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleButtonClick(btn)}
                  className={`py-4 text-xl font-semibold rounded-2xl ${
                    btn === "OK"
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