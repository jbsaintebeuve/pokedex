import { useEffect } from "react";
import { usePokedexData } from "../providers/GenContext";
import ButtonPrimary from "./common/ButtonPrimary";
import { Link } from "react-router-dom";

function NoPage() {

    const { setLoading } = usePokedexData();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 overflow-hidden">
            <div className="md:w-1/2 w-10/12 mx-auto flex flex-col items-center gap-4 text-center">
                <h1 className="dark:text-yellow-400 text-yellow-600 text-4xl font-extrabold">
                    404 - Page not found
                </h1>
                <Link to={"/"} className="md:w-1/2 w-10/12 mx-auto">
                    <ButtonPrimary>Go back home</ButtonPrimary>
                </Link>
            </div>
            <img src="./img/404.jpg" alt="pikachu ko" className="md:w-1/2 w-10/12 h-auto" />
        </div>
    );
}
export default NoPage;