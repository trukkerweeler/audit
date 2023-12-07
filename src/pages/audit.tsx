import React from 'react'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import { useRouter } from 'next/router'
import { trpc } from '@/utils/trpc';
import AuditHolder from '@/components/AuditHolder';

const Audit: React.FC = () => {
  const router = useRouter()
  const { data: auditList } = trpc.findAllAudits.useQuery();
  
  return (
    <Layout>
      <Hero title="Audits"/>
      <section className='grid border-solid border-black-400 border-2 bg-gray-100'>
        <h2 className='row-start-1 grid-cols-1'>Add Audit</h2>
        <button className='border-solid border-green-400 border-2 row-start-1 grid-cols-2 w-48 mx-auto'>Add</button>
      </section>
      <section>
        {auditList && <AuditHolder auditList={auditList} />}
      </section>
    </Layout>
  );
};

export default Audit;
