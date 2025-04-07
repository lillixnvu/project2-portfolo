'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validCredentials = {
    username: 'test',
    password: 'password',
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    if (username === validCredentials.username && password === validCredentials.password) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login'); 
  };

  return (
  
    <div className="min-h-screen flex items-center justify-center">
      {!localStorage.getItem('isLoggedIn') ? (
        <form onSubmit={handleLogin} className="p-5 border rounded" suppressHydrationWarning>
          <h1 className="text-2xl mb-4">Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full mb-4 dark:text-black"
            suppressHydrationWarning
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4 dark:text-black"
            suppressHydrationWarning
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-purple-900 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <div className="p-5 border rounded">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
