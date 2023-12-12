
import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';



const AddAudit: React.FC = () => {
  const [title, setTitle] = useState('');
  const [qmsref, setQmsref] = useState('');
  const router = useRouter();  

 const auditMutation = trpc.insertAudit.useMutation({
  onSuccess: () => {
    console.log('add audit success');
    // Invalidate and refetch    
  },
  onError: (error) => {
    console.error('Error: ', error);
  },
}
);

  const handleSubmit = async () => {
    try {
      await auditMutation.mutateAsync({
        title,
        qmsref,
      })
    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div className='border-2 max-w-xl mb-10'>
      {/* <h2>Add Audit</h2> */}
      <form className='grid grid-cols-3 gap-4 mr-4 my-4'>
        <label className='text-right'>
          title:
          </label>        
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='rounded border-2 border-slate col-span-2 px-2'
          />
        
        <label className='text-right'>
          qmsref:
          </label>
          <input
            type="text"
            name="qmsref"
            value={qmsref}
            onChange={(e) => setQmsref(e.target.value)}
            className='rounded border-2 border-slate col-span-2 px-2'
          />
        <br />
        <button onClick={handleSubmit} type="button" className="text-sm left-0 top-0 bg-slate-200 mt-1 ml-1.5 rounded-xl border-green-500 border-solid border-2 px-1 min-w-[120px] h-16"
			>Add Audit</button>
      </form>
    </div>
  );
};

export default AddAudit;
