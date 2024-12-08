import ButtonPrimary from "./common/ButtonPrimary";
import { Link } from "react-router-dom";

function NoPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 overflow-hidden">
            <div className="w-1/2 flex flex-col items-center gap-4">
                <h1 className="dark:text-yellow-400 text-yellow-600 text-4xl font-extrabold">
                    404 - Page not found
                </h1>
                <Link to={"/"} className="w-1/2">
                    <ButtonPrimary>Go back home</ButtonPrimary>
                </Link>
            </div>
            <img src="./img/404.jpg" alt="pikachu ko" className="w-1/2 h-auto" />
        </div>
    );
}
export default NoPage;