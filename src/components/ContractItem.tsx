import React from 'react';
import Contract from '../types/Contract';

interface Props {
    contract: Contract;
    onDelete: (id: string) => void;
    onEdit: (contract: Contract) => void;
}

const ContractItem = ({ contract, onDelete, onEdit }: Props) => {
    const { title, description, startDate, endDate, id } = contract;

    const handleDeleteClick = () => {
        onDelete(id);
    };

    const handleEditClick = () => {
        onEdit(contract);
    };

    return (
        <li>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Start date: {new Date(startDate).toLocaleDateString()}</p>
            <p>End date: {new Date(endDate).toLocaleDateString()}</p>
            <button onClick={handleDeleteClick}>Delete</button>
            <button onClick={handleEditClick}>Edit</button>
        </li>
    );
};

export default ContractItem;
