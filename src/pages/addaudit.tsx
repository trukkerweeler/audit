import React from 'react'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import { useRouter } from 'next/router'
import { trpc } from '@/utils/trpc';
import InputForm from '@/components/InputForm';

const Audit: React.FC = () => {
  const router = useRouter()
  const { data: auditList } = trpc.findAllAudits.useQuery();
  
  return (
    <Layout>
      <Hero title="Add Audit"/>
      <div className='flex justify-center'>
      <InputForm />
      </div>      
    </Layout>
  );
};

export default Audit;
