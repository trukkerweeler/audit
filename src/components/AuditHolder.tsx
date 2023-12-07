
import React from 'react';

interface AuditHolderProps {
    auditList: {
    id: string;
    title: string;
    qmsref: string;
    active?: boolean;
    rev?: string;

}[];

}

const AuditHolder: React.FC<AuditHolderProps> = ({ auditList }) => {
    return (
        <div>
            {auditList.map(({ id, title, qmsref, active, rev }) => (
                <div  className='mx-2 border-black border-solid border-2 rounded-md my-8' key={id}>
                    <p className='mx-2'>Audit ID: {id}</p>
                    <p className='mx-2'>Title: {title}</p>
                    <p className='mx-2'>QMS Ref: {qmsref}</p>
                    {/* <p className='mx-2'>Active: {active}</p>
                    <p className='mx-2'>Revision: {rev}</p> */}
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
