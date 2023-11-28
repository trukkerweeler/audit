import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const About: React.FC = () => {
  return (
    <Layout>
      <Hero title="Checklists"/>
      <p className='text-center'>Checklist page goes here.</p>
    </Layout>
  );
};

export default About;

