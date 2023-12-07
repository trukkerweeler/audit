import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';

const About: React.FC = () => {
  return (
    <Layout>
      <Hero title="Checklists"/>
      <section className='grid border-solid border-black-400 border-2 bg-gray-100'>
        <h2 className='row-start-1 grid-cols-1'>Audit Checklists</h2>
        <select id="selectedchecklist" className='border-solid border-green-400 border-2 row-start-1 grid-cols-2 w-96 mx-auto'>
          <option value=""></option>
          <option value="checklist2">Checklist 2</option>
          <option value="checklist3">Checklist 3</option>
        </select>
      </section>
      <section className='checklistitems'>

      </section>
      
    </Layout>
  );
};

export default About;

