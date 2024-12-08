function ButtonSecondary({ children }) {
  return (
    <button className="text-blue-700 font-bold text-sm w-full py-3 rounded-md hover:bg-blue-700 hover:text-white border-blue-700 border-2 hover:cursor-pointer">
      {children}
    </button>
  );
}
export default ButtonSecondary;
