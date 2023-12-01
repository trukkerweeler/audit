"use client"
import React, { useState } from 'react';
import {trpc } from '../utils/trpc';
import useCookie from '@/utils/useCookie';

const Login: React.FC = () => {
  const [cookie, setCookie] = useCookie('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginQuery = trpc.login.useQuery({username: username, password: password});
  if (cookie) {
    const user = JSON.parse(cookie);
    console.log(user);
  }


  const handleLogin = async () => {
    const loggedInUser = await loginQuery.data;
    console.log({loggedInUser});

    if (loggedInUser) {
      console.log('logged in');
      setCookie(JSON.stringify(loggedInUser));
      // redirect to home page
      // window.location.href = '/';
      // window.location.reload();
    } else {
        alert('Invalid username or password');
      }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      {/* <h2 className="text-2xl font-bold mb-4">Login</h2> */}
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="bg-blue text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
