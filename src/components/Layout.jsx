import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import { useTheme } from '../providers/ThemeContext';
import { useEffect } from 'react';

function Layout({ langAvailable, pokeballs, setPokeballs }) {

  const { darkMode } = useTheme();

  useEffect(() => {
    console.log("Dark mode:", darkMode);
  }, [darkMode]);

  return (
    <main className={`bg-slate-50 dark:bg-gray-900 dark:text-white ${darkMode ? "dark" : ""}`}>
      <Header langAvailable={langAvailable} pokeballs={pokeballs} setPokeballs={setPokeballs} />
      <Outlet />
    </main>
  );
}
export default Layout;