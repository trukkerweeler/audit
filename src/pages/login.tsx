import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Login from '../components/Login';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <Hero title="Login" />
      <Login />
    </Layout>
  );
};

export default LoginPage;