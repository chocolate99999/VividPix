import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </div>
  );
};

export default Layout;