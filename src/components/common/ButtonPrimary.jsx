function ButtonPrimary({children}) {
  return (
    <button className="font-bold text-sm w-full py-3 border-2 border-yellow-400 rounded-md text-blue-700 bg-yellow-400 hover:bg-white hover:border-yellow-400 hover:text-yellow-400">
      {children}
    </button>
  );
}
export default ButtonPrimary;
