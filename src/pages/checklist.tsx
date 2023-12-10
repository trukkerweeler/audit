import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { trpc } from '@/utils/trpc';
import Checklist from '@/components/Checklist';

const ChecklistView: React.FC = () => {

  const { data: auditList } = trpc.findAllAudits.useQuery();
  // const { data: checklistList } = trpc.findAllChecklists.useQuery();

  return (
    <Layout>
      <Hero title="Checklists"/>
      <section>

      {auditList && <Checklist auditList={auditList} />}
      </section>
      {/* <section className='grid border-solid border-black-400 border-2 bg-gray-100'>
        <h2 className='row-start-1 grid-cols-1'>Audit Checklists</h2>
        <select id="selectedchecklist" className='border-solid border-green-400 border-2 row-start-1 grid-cols-2 w-96 mx-auto'>
          <option value=""></option>
          <option value="checklist2">Checklist 2</option>
          <option value="checklist3">Checklist 3</option>
        </select>
      </section>
      <section className='checklistitems'>

      </section> */}
      
    </Layout>
  );
};

export default ChecklistView;

