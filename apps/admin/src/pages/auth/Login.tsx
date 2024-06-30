import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from 'common/src/supabase';

type props = {
  setView: (view: 'login' | 'register') => void;
};

export default function Login({ setView }: props) {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-200'>
      <div className='w-full max-w-[400px] rounded-lg bg-white p-8 shadow'>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          showLinks={false}
        />
        <p className=' mt-4  text-center'>
          Don't have an account?{' '}
          <button className='text-blue-500' onClick={() => setView('register')}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
