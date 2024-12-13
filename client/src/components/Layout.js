import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = ({ currentUser, setCurrentUser, cartCount }) => {
  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} cartCount={cartCount} />
      <Outlet />
    </div>
  );
};

export default Layout;