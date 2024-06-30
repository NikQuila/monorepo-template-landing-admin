import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RoutesConfig from './routes';
import AuthPage from './pages/auth';
import useAuthState from './hooks/useAuthState';
import SidebarLayout from './components/layouts/sidebars';

const App = () => {
  const { session, loading } = useAuthState();
  return loading ? null : !session ? (
    <AuthPage />
  ) : (
    <>
      <ToastContainer />
      <SidebarLayout>
        <RoutesConfig />
      </SidebarLayout>
    </>
  );
};

export default App;
