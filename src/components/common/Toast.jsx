function Toast({ children }) {
  return (
    <div
      id="toast-simple"
      className="transition z-20 fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse font-medium text-blue-800 bg-blue-300 divide-x rtl:divide-x-reverse divide-blue-800 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
      role="alert"
    >
      {children}
    </div>
  );
}
export default Toast;
