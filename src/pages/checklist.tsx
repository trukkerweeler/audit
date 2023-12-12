import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { trpc } from '@/utils/trpc';
import Checklist from '@/components/Checklist';

const ChecklistView: React.FC = () => {

  const { data: auditList } = trpc.findAllAudits.useQuery();
  const { data: checklistList } = trpc.findAllChecklists.useQuery();

  return (
    <Layout>
      <Hero title="Checklists"/>
      <section>

      {auditList && <Checklist auditList={auditList} checklistList={checklistList} />}
      </section>
      
    </Layout>
  );
};

export default ChecklistView;

