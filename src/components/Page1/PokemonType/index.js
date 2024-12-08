import { useEffect, useState } from "react";
import { useLang } from "../../../providers/LangContext";

function luminance(r, g, b) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getTextColor(backgroundColor) {
    const rgb = backgroundColor.match(/\w\w/g).map(x => parseInt(x, 16));
    return luminance(...rgb) > 0.5 ? 'text-black' : 'text-white';
}

function PokemonType({ name, types}) {

    const { langValue } = useLang();
    const [type, setType] = useState(null);
    useEffect(() => {
        if(types.length > 0) {
            setType(types.find(([key]) => key === name));
        }
    }, [types, name]);
    if (!type) return null;

    const backgroundColor = type[1].backgroundColor;
    const textColorClass = getTextColor(backgroundColor);

    return (
        type && (
            <div
                style={{ backgroundColor }}
                className={`
                    ${textColorClass}
                    rounded-xl 
                    text-center 
                    uppercase 
                    font-semibold
                    px-5
                    py-1
                    text-xs
                    min-w-16
                `}>
                {type[1][langValue]}
            </div>
        )
    );
}

export default PokemonType;