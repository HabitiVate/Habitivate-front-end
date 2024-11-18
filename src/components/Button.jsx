import { useState, useEffect, useRef } from "react";

const Button = ({ icon, text, options = [], onOptionSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={buttonRef}>
      <button
        type="submit"
        className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white bg-[#95af00] rounded hover:bg-[#adc03efb] focus:outline-none"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        {icon}
        {text}
      </button>
      {menuOpen && options.length > 0 && (
        <div
          className="absolute left-0 mt-2 bg-white border rounded shadow z-10 w-48 sm:w-56 md:w-64"
          role="menu"
          aria-label="Dropdown options"
        >
          {options.map((option, index) => (
            <div
              key={index}
              role="menuitem"
              tabIndex={0}
              className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onOptionSelect(option.value);
                setMenuOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onOptionSelect(option.value);
                  setMenuOpen(false);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Button;
