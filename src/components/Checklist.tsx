import React, { useContext, useState } from "react";
import { trpc } from "@/utils/trpc";
import { UserContext } from "@/context/user";

interface AuditHolderProps {
  auditList: {
    id: number;
    title: string;
    qmsref: string;
    active?: boolean;
    rev?: string;
  }[];
}



const ChecklistPicker: React.FC<AuditHolderProps> = ({ auditList }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <>
            <div className="bg-slate-500">
                <h2 className=''>Select Audit</h2>
                <select 
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
            <div>
                {auditList.filter((audit) => audit.id === Number(selectedCategory)).map((audit) => (
                    <div key={audit.id}>
                        <h3>{audit.title}</h3>
                        <p>{audit.qmsref}</p>
                    </div>
                ))}

            </div>
        </>
        
    );
}

export default ChecklistPicker;