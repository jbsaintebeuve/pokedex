import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { usePokedexData } from '../../providers/GenContext';
import { useLang } from '../../providers/LangContext';

function GenSelector({ selectedValue, onChange, options, icon: Icon }) {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false)

    const { setLoading } = usePokedexData();
    const { langValue } = useLang();

    const handleSelectChange = (value) => {
        onChange(value)
        setLoading(true);
        setIsSelectorOpen(false)
    }


    return (
        <div className="relative inline-block text-left" onMouseLeave={() => setIsSelectorOpen(false)}>
            <div>
                <button
                    type="button"
                    className="border-blue-700 border-2 rounded-md py-3 w-full"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                >
                    <div className="flex flex-row justify-between items-center mx-4">
                        {Icon && <Icon />}
                        <p className="font-bold">
                            Pokédex
                        </p>
                        <span className="ml-2 text-xs font-semibold text-ellipsis text-nowrap overflow-hidden ... ">
                            {selectedValue.pokemon_v2_generationnames ? selectedValue.pokemon_v2_generationnames.find(name => name.pokemon_v2_language.name === langValue)?.name : "Génération I"}
                        </span>
                        <IoMdArrowDropdown />
                    </div>
                </button>
            </div>

            {isSelectorOpen && (
                <div
                    className="origin-top-right absolute right-0  w-full rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                className={`${selectedValue.name === option.name ? 'bg-gray-100 dark:bg-blue-800' : ''
                                    } flex items- px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 hover:text-gray-900 w-full dark:hover:bg-blue-900 dark:hover:text-white`}
                                onClick={() => handleSelectChange(option)}
                                role="menuitem"
                            >
                                {option.pokemon_v2_generationnames.find(name => name.pokemon_v2_language.name === langValue)?.name || option.pokemon_v2_generationnames.find(name => name.pokemon_v2_language.name === 'en').name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GenSelector;
