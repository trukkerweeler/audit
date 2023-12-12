import React, { useRef, useContext } from 'react';
import { trpc } from '@/utils/trpc';
import { UserContext } from '@/context/user';
import Link from 'next/link';


interface AuditHolderProps {
    auditList: {
    id: number;
    title: string;
    qmsref: string;
    active?: boolean;
    rev?: string | null;

}[];

}

const AuditHolder: React.FC<AuditHolderProps> = ({ auditList }) => {
    // const { id, setId } = useRef();
    const { user, setUser } = useContext(UserContext);

    
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
        const dialog = document.querySelector('dialog');
        console.log( 'id: ', id);
        try {
            await auditMutation.mutateAsync({
                id: Number(id),
            });
            // console.log('Delete audit confirmed');
        } catch (error) {
            console.error(error);
        }
        if (!dialog) {
            return;
        }
        dialog.close();
        // refresh page
        window.location.reload();
        // router.push('/audit');
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
        <div className='relative'>
            <h2 className='m-auto text-center bg-slate-500 col-span-1 my-1'>Audit Listing</h2>
            {auditList.map(({ id, title, qmsref, active, rev }) => (
                <div  className=' grid grid-cols-2 mx-2 border-black border-solid border-2 rounded-md my-8' key={id}>
                    <p className='mx-2 row-start-1'>Audit ID: {id}</p>
                    <p className='mx-2 row-start-2'>Title: {title}</p>
                    <p className='mx-2 row-start-3'>QMS Ref: {qmsref}</p>
                    {/* <p className='mx-2'>Active: {active}</p>
                    <p className='mx-2'>Revision: {rev}</p> */}
                    {user && <button onClick={handleAuditDeleteConfirm} type='button' value={id} className='bg-red-500 text-white w-24 rounded row-span-3 place-self-end'>Delete</button>
                    }
                    <dialog className='border-2 border-black rounded-md'>
                        <p>Are you sure you want to delete this record?</p>
                        <button onClick={() => handleAuditDelete(id)} className='bg-red-500 text-white w-24 rounded'>Yes</button>
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
            {/* <button id="addaudititem" className="absolute text-sm left-0 top-0 bg-slate-200 mt-1 ml-1.5 rounded-xl border-green-500 border-solid border-2 px-1 min-w-[120px]">Add Audit</button> */}
            <Link id="addaudititem" href='/addaudit' className='row-start-1 grid-cols-2'>
            <button  className="absolute text-sm left-0 top-0 bg-slate-200 mt-1 ml-1.5 rounded-xl border-green-500 border-solid border-2 px-1 min-w-[120px]">
              Add Audit
            </button>
          </Link>
        </div>
    );
};


export default AuditHolder;
