import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RoutesConfig from './routes';
import AuthPage from './pages/auth';
import useAuthState from './hooks/useAuthState';
import SidebarLayout from './components/layouts/sidebars';
import { DotLoader } from 'react-spinners';

const App = () => {
  const { session, loadingProfile } = useAuthState();

  if (loadingProfile) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <DotLoader color='#BE123C' size={50} />
      </div>
    );
  }

  return !session ? (
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
