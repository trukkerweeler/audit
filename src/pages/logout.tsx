import React, { useContext } from 'react'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import { useRouter } from 'next/router'
import { trpc } from '@/utils/trpc';
import { UserContext } from '@/context/user';

const Audit: React.FC = () => {
  const router = useRouter()
  const { data: auditList } = trpc.findAllAudits.useQuery();
    // set context to null
    const {user, setUser} = useContext(UserContext);
    setUser(null);
  
  return (
    <Layout>
      <Hero title="Logged Out"/>
      <div className='flex justify-center'>
      You are now logged out.
      </div>
      
    </Layout>
  );
};

export default Audit;