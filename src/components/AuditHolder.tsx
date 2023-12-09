
import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';


interface AuditHolderProps {
    auditList: {
    id: number;
    title: string;
    qmsref: string;
    active?: boolean;
    rev?: string;

}[];

}

const AuditHolder: React.FC<AuditHolderProps> = ({ auditList }) => {
    const [id, setId] = useState('');

    
    const handleAuditDeleteConfirm = () => {
        // confirm deletion of selected record
        const dialog = document.querySelector('dialog');
        if (!dialog) {
            return;
        }
        dialog.showModal();

        // handleAuditDelete();
    }


    const auditMutation = trpc.deleteAudit.useMutation({
        onSuccess: () => {
            console.log('delete audit success');
            
        },
        onError: (error) => {
            console.error('Error: ', error);
        },
    }
    );
    
    const handleAuditDelete = async (id: number) => {
        // const dialog = document.querySelector('dialog');
        console.log( 'id: ', id);
        try {
            await auditMutation.mutateAsync({
                id: Number(id),
            });
            // console.log('Delete audit confirmed');
        } catch (error) {
            console.error(error);
        }
        // if (!dialog) {
        //     return;
        // }
        // dialog.close();
    };

    const handleAuditDeleteCancel = () => {
        const dialog = document.querySelector('dialog');
        // alert('Delete audit cancelled');
        if (!dialog) {
            return;
        }
        dialog.close();
    }
    

    return (
        <div>
            {auditList.map(({ id, title, qmsref, active, rev }) => (
                <div  className=' grid grid-cols-2 mx-2 border-black border-solid border-2 rounded-md my-8' key={id}>
                    <p className='mx-2 row-start-1'>Audit ID: {id}</p>
                    <p className='mx-2 row-start-2'>Title: {title}</p>
                    <p className='mx-2 row-start-3'>QMS Ref: {qmsref}</p>
                    {/* <p className='mx-2'>Active: {active}</p>
                    <p className='mx-2'>Revision: {rev}</p> */}
                    
                    <button onClick={() => handleAuditDelete(id)} type='button' className='bg-red-500 text-white w-24 rounded row-span-3 place-self-end'>Delete</button>
                    {/* Create dialog to confirm deletion of selected record */}
                    <dialog className='border-2 border-black rounded-md'>
                        <p>Are you sure you want to delete this record?</p>
                        <button className='bg-red-500 text-white w-24 rounded'>Yes</button>
                        <button onClick={handleAuditDeleteCancel} className='bg-green-500 text-white w-24 rounded'>No</button>
                        <button onClick={handleAuditDeleteCancel} className='bg-blue-500 text-white w-24 rounded'>Cancel</button>
                    </dialog>
                </div>
            ))}
            {auditList.length === 0 && (
                <div>
                    <p>No audits found</p>
                </div>
            )}
        </div>
    );
};


export default AuditHolder;
