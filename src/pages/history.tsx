import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const About: React.FC = () => {
  return (
    <Layout>
      <Hero title="History"/>
      <p className='text-center'>History page goes here.</p>
    </Layout>
  );
};

export default About;