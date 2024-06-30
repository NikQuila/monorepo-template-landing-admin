import '../../index.css';
import { useState } from 'react';
import {
  registerWithEmailAndPassword,
  createUserProfile,
} from 'common/src/api/auth';

type Props = {
  setView: (view: 'login' | 'register') => void;
};

export default function Register({ setView }: Props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    setError('');
    setLoading(true);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const user = await registerWithEmailAndPassword(email, password);
      if (user) {
        await createUserProfile({ ...user });
      }
    } catch (error) {
      setError('Error registering user');
    }
    setLoading(false);
  };

  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-200'>
      <div className='w-full max-w-[400px] rounded-lg bg-white p-8 shadow'>
        <h2 className='text-center text-2xl font-bold'>Register</h2>
        <div className='mt-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-2 w-full rounded border border-gray-300 p-2'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-2 w-full rounded border border-gray-300 p-2'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='mt-2 w-full rounded border border-gray-300 p-2'
          />
          {error && <p className='mt-2 text-red-500'>{error}</p>}
          <button
            onClick={handleRegister}
            className='mt-4 w-full rounded bg-blue-500 p-2 text-white'
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p className='mt-4 text-center'>
            Already have an account?{' '}
            <button className='text-blue-500' onClick={() => setView('login')}>
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
