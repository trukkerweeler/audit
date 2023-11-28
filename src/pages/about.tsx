import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const About: React.FC = () => {
  return (
    <Layout>
      <Hero title="About Us"/>
      <p className='text-center'>About page goes here.</p>
    </Layout>
  );
};

export default About;