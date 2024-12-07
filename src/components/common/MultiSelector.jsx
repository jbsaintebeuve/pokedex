import { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

function MultiSelector({ selectedValues, onSelectValue, options, name, langValue }) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleSelectChange = (value) => {
    selectedValues.includes(value)
      ? onSelectValue(
        selectedValues.filter((selectedValue) => selectedValue !== value)
      )
      : onSelectValue([...selectedValues, value]);
  };

  return (
    <div className="relative inline-block text-left w-full" onMouseLeave={() => setIsSelectorOpen(false)}>
      <div className="w-full">
        <button
          type="button"
          className="border-blue-700 border-2 rounded-md py-3 w-full"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsSelectorOpen(!isSelectorOpen)}
        >
          <div className="flex flex-row justify-between items-center mx-4">
            <p className="font-bold">
              {name}
              {selectedValues.length > 0 && (
                <span className="ml-2 text-xs font-semibold">
                  ({selectedValues.length}{" "}
                  {selectedValues.length > 1 ? "sélectionnés" : "sélectionné"})
                </span>
              )}
            </p>
            <IoMdArrowDropdown />
          </div>
        </button>
      </div>

      {isSelectorOpen && (
        <div
          className="origin-top-right absolute right-0 z-10 w-full max-h-64 overflow-y-auto rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <div
                key={option[0]}
                className={`${selectedValues.includes(option[0]) ? "bg-gray-100 dark:bg-blue-800" : ""
                  } flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-blue-900 dark:hover:text-white w-full hover:cursor-pointer`}
                onClick={() => handleSelectChange(option[0])}
                role="menuitem"
              >
                {selectedValues.includes(option[0]) ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                <label>{option[1][langValue]}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default MultiSelector;
