
import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';



const AddAudit: React.FC = () => {
  const [title, setTitle] = useState('');
  const [qmsref, setQmsref] = useState('');
  

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
          Title:
          </label>        
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='rounded border-2 border-green-500 col-span-2 px-2'
          />
        
        <label className='text-right'>
          qmsref:
          </label>
          <input
            type="text"
            name="qmsref"
            value={qmsref}
            onChange={(e) => setQmsref(e.target.value)}
            className='rounded border-2 border-green-500 col-span-2 px-2'
          />
        <br />
        <button onClick={handleSubmit} type="button" className='bg-blue-500 text-white p-2 rounded-md'>Submit</button>
      </form>
    </div>
  );
};

export default AddAudit;
