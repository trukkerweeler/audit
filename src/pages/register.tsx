import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Register from '../components/Register';

const RegistrationPage: React.FC = () => {
  return (
    <Layout>
      <Hero title="Account Registration" />
      <Register />
    </Layout>
  );
};

export default RegistrationPage;