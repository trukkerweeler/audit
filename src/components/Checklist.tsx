import React, { useContext, useState, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { UserContext } from "@/context/user";

interface AuditHolderProps {
  auditList: {
    id: number;
    title: string;
    qmsref: string;
    active?: boolean;
    rev?: string | undefined;
  }[];
  checklistList: {
    id: number;
    auditid: number;
    sql: number
    cltext: string;
    process: string;
}[];
};

const ChecklistPicker: React.FC<AuditHolderProps> = ({ auditList, checklistList }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAddChecklistDialog = () => {
        const dialog = document.querySelector('#addchecklistitemdialog') as HTMLDialogElement;
        if (!dialog) {
            return;
        }
        dialog.showModal();

        // handleAuditDelete();
    }

    const insertChecklist = trpc.insertChecklist.useMutation({
        onSuccess: () => {
            console.log('insert checklist success');
            
        },
        onError: (error) => {
            console.error('Error: ', error);
        },
    }
    );  
    
    const handleAddChecklist = async () => {
        const dialog = document.querySelector('#addchecklistitemdialog') as HTMLDialogElement;
        const auditid = document.querySelector('#auditid') as HTMLInputElement;
        const sql = document.querySelector('#sql') as HTMLInputElement;
        const cltext = document.querySelector('#cltext') as HTMLInputElement;
        const process = document.querySelector('#process') as HTMLInputElement;
        
        try {
            await trpc.insertChecklist.mutateAsync({
                auditid: Number(auditid.value),
                sql: Number(sql.value),
                cltext: cltext.value,
                process: process.value,
            });
        } catch (error) {
            console.error(error);
        }
        if (!dialog) {
            return;
        }
        dialog.close();
    }
    
    const checklistMutation = trpc.deleteChecklist.useMutation({
        onSuccess: () => {
            console.log('delete checklist success');
            
        },
        onError: (error) => {
            console.error('Error: ', error);
        },
    }
    );
    const handleChecklistDelete = async (id: number) => {
        const dialog = document.querySelector('dialog');
        console.log( 'id: ', id);
        try {
            await checklistMutation.mutateAsync({
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
    }


    return (
        <>
            <div className="items-center content-center min-w-2xl">
                <h2 className='m-auto text-center bg-slate-500 col-span-1'>Select Audit</h2>
                <div className="flex">
                    <select 
                    className="border-solid border-black border-2 rounded-md m-auto w-1/2 h-10 text-center text-lg my-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value=""></option>
                        {auditList.map((audit) => (                    
                            <option key={audit.id} value={audit.id}>
                                {audit.title}
                            </option>
                        ))}
                        
                    </select>
                </div>
            </div>
            <div>
                {auditList.filter((audit) => audit.id === Number(selectedCategory)).map((audit) => (
                    <div key={audit.id} className="flex">
                        <h3 className="text-center m-auto italic text-2xl" >{audit.title} - {audit.qmsref} ({audit.id})</h3>
                    </div>
                ))}

            </div>
            <div className="relative">
                <h2 className='m-auto text-center bg-slate-500 col-span-1 my-1'>Audit Checklist Detail</h2>
                <div className="grid grid-cols-8 max-w-2xl border-solid border-black border-2 rounded-md m-auto">

                {checklistList.filter((checklist) => checklist.auditid === Number(selectedCategory)).map((checklist) => (
                    <><div key={checklist.id} className="border-solid border-gray border-2 rounded-md col-span-6 mb-1">
                        <div>
                        <p className="color-black ml-1">{checklist.cltext}</p>
                        <p className="text-sm ml-2">{checklist.process}</p>
                        </div>
                    </div>
                        <button className="text-sm">Edit</button>
                        <button 
                        className="text-sm text-red-500"
                        

                        // ...

                        onClick={() => window.confirm("Are you sure you wish to delete this item?") && handleChecklistDelete(checklist.id)}

                        >
                            Delete</button>
                        </>
                ))}
                </div>
                <button onClick={handleAddChecklistDialog} id="addchecklistitem" className="absolute text-sm left-0 top-0 bg-slate-200 mt-1 ml-1.5 rounded-xl border-green-500 border-solid border-2 px-1">Add Checklist Item</button>
            </div>
            <dialog id="addchecklistitemdialog" className="bg-white rounded-md border-solid border-2 border-black">
                    <form action="submit" className="grid grid-cols-2">
                        <h4 className="col-span-2 mx-auto">Add Checklist item</h4>
                        <label className="ml-2" htmlFor="auditid">Audit ID</label>
                        <input type="text" name="auditid" id="auditid" className="border-solid border-2 border-black rounded-md mr-2" />
                        <label className="ml-2"htmlFor="sql">Sequence</label>
                        <input type="text" name="sql" id="sql" className="border-solid border-2 border-black rounded-md mr-2" />
                        <label className="ml-2"htmlFor="cltext">Checklist Item</label>
                        <input type="text" name="cltext" id="cltext" className="border-solid border-2 border-black rounded-md mr-2" />
                        <label className="ml-2"htmlFor="process">Process</label>
                        <input type="text" name="process" id="process" className="border-solid border-2 border-black rounded-md mr-2" />
                        <button onClick={handleAddChecklist} type="button" className="col-span-2 text-sm bg-slate-200 my-1 rounded-xl border-green-500 border-solid border-2 px-1 w-1/2 mx-auto">Add</button>
                        <p className="text-base col-span-2 mx-auto">Escape key to cancel</p>
                    </form>
            </dialog>
            {/* <dialog id="editchecklistitemdialog" className="bg-white rounded-md border-solid border-2 border-black">
                <form className="grid grid-cols-2 gap-2">
                    <label className="col-span-2">Checklist Item</label>
                    <input type="text" className="col-span-2 border-solid border-2 border-black rounded-md" />
                    <label>Process</label>
                    <input type="text" className="border-solid border-2 border-black rounded-md" />
                    <button  type="submit" className="col-span-2 bg-slate-200 rounded-md border-solid border-2 border-black">Update</button>
                </form>
            </dialog> */}
        </>
        
    );
}

export default ChecklistPicker;