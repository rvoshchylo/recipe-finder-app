import { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black text-left flex justify-between items-center hover:border-blue-500 focus:ring-2 focus:ring-blue-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? "text-black" : "text-gray-400"}`}>
          {value || placeholder}
        </span>
        <span
          className={`transition-transform transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 max-h-60"
            : "opacity-0 scale-95 max-h-0"
        }`}
      >
        <ul className="py-2">
          {options.map((option, index) => (
            <li
              key={`${option}-${index}`}
              className="p-3 text-black hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
