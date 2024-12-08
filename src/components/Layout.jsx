import { Outlet } from 'react-router-dom';
import { useTheme } from '../providers/ThemeContext';
import Header from './common/Header';

function Layout({ pokeballs, setPokeballs }) {

  const { darkMode } = useTheme();

  return (
    <main className={`min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white ${darkMode ? "dark" : ""}`}>
      <Header pokeballs={pokeballs} setPokeballs={setPokeballs} />
      <Outlet />
    </main>
  );
}
export default Layout;