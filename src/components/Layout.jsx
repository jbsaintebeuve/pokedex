import { Outlet } from 'react-router-dom';
import Header from './common/Header';

function Layout({ langAvailable, pokeballs, setPokeballs }) {

  return (
    <>
      <Header langAvailable={langAvailable} pokeballs={pokeballs} setPokeballs={setPokeballs} />
      <Outlet />
    </>
  );
}
export default Layout;