function PokemonCardSkeleton() {
    return (
        <div className="rounded-md border-blue-600 border-2 p-4 flex flex-col gap-5 relative md:w-60">
            <div className="cover h-36 flex justify-center">
                <div className="h-full w-full" >
                    <span className="animate-pulse bg-blue-200 rounded-md dark:bg-blue-700 h-36 w-11/12 block mx-auto"></span>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-xl">
                            <span className="animate-pulse bg-blue-200 dark:bg-blue-700 h-6 w-28 block rounded-md"></span>
                        </p>
                        <div className="flex gap-4">
                            <span className="animate-pulse bg-blue-200 dark:bg-blue-700 h-5 w-5 block rounded-full"></span>
                            <span className="animate-pulse bg-blue-200 dark:bg-blue-700 h-5 w-5 block rounded-full"></span>
                        </div>
                    </div>
                    <span className="w-full text-xs text-gray-600 dark:text-blue-500 font-semibold flex gap-1 items-center">
                        <span className="animate-pulse bg-blue-200 dark:bg-blue-700 h-3 w-10 block"></span>
                    </span>
                </div>
                <div className="flex flex-row w-full gap-4">
                    <span className="animate-pulse bg-blue-200 dark:bg-blue-700 h-5 w-1/2 block rounded-md"></span>
                    <span className="animate-pulse bg-blue-200 dark:bg-blue-700 h-5 w-1/2 block rounded-md"></span>
                </div>
            </div>
        </div>
    )
}
export default PokemonCardSkeleton;