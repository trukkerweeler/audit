import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { trpc } from '@/utils/trpc';
import Checklist from '@/components/Checklist';

const ChecklistView: React.FC = () => {

  const { data: auditList } = trpc.findAllAudits.useQuery();
  const { data: checklistList, refetch } = trpc.findAllChecklists.useQuery();

  return (
    <Layout>
      <Hero title="Checklists"/>
      <section>
      
      {auditList && <Checklist refetch={refetch} auditList={auditList.map(audit => ({ ...audit, rev: audit.rev || undefined }))} checklistList={checklistList || []} />}
      </section>
      
    </Layout>
  );
};

export default ChecklistView;

