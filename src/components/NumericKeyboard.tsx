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
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←", "OK"];

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
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => onInput(btn)}
                  className={`py-4 text-xl font-semibold rounded-2xl ${
                    btn === "OK"
                      ? "bg-green-500 text-white"
                      : btn === "←"
                      ? "bg-gray-700"
                      : "bg-gray-800"
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
