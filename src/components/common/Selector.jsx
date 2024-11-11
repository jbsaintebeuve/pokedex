import { useState } from 'react'

function Selector({ selectedValue, onChange, options, icon: Icon }) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  const handleSelectChange = (value) => {
    onChange(value)
    setIsSelectorOpen(false)
  }

  return (
    <div className="relative inline-block text-left" onMouseLeave={() => setIsSelectorOpen(false)}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsSelectorOpen(!isSelectorOpen)}
        >
          {Icon && <Icon />}
          <span className="ml-2">
            {selectedValue}
          </span>
        </button>
      </div>

      {isSelectorOpen && (
        <div
          className="origin-top-right absolute right-0  w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option}
                className={`${
                  selectedValue === option ? 'bg-gray-100' : ''
                } flex items- px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full`}
                onClick={() => handleSelectChange(option)}
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Selector;
