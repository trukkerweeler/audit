"use client"
import React, { useState, useContext, useEffect } from 'react';
import {trpc } from '../utils/trpc';
import useCookie from '@/utils/useCookie';
import { UserContext } from '@/context/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const {user, setUser} = useContext(UserContext);
  const [cookie, setCookie] = useCookie('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginQuery = trpc.login.useQuery({username: username, password: password});
  if (cookie) {
    const user = JSON.parse(cookie);
    // console.log({user});
  }


  const handleLogin = async () => {
    const loggedInUser = await loginQuery.data;
    // console.log({loggedInUser});

    if (loggedInUser) {
      // let salt = bcrypt.genSaltSync(10);
      // let hash = bcrypt.hashSync(loggedInUser.password, salt);
      console.log('logged in');
      setCookie(JSON.stringify(loggedInUser));
      // console.log(loggedInUser.username);
      setUser(loggedInUser)
      // perform client-side redirect
      router.push('/');

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
          className="text-sm left-0 top-0 bg-slate-200 mt-1 ml-1.5 rounded-xl border-green-500 border-solid border-2 px-1 min-w-[120px] h-16"
        >
          Login
        </button>
        <Link href="/register"
          className="ml-4 text-green-500">
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
