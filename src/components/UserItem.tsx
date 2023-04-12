import React from 'react';
import Contract from '../types/Contract';
import User from '../types/User';

interface Props {
    user: User;
    onDelete: (id: string) => void;
    onEdit: (user: User) => void;
}

const UserItem = ({ user, onDelete, onEdit }: Props) => {
    const { id, name, status } = user

    const handleOnDelete = () => {
        onDelete(id);
    }

    const handleOnEdit = () => {
        onEdit(user)
    }

    return (
        <li>
            <h3>{name}</h3>
            <p>{status}</p>
            <button onClick={handleOnDelete}>Delete</button>
            <button onClick={handleOnDelete}>Edit</button>
        </li>
    );

}

export default UserItem;