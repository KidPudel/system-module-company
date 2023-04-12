import { useState } from 'react';
import Contract from '../types/Contract';

interface Props {
    contract: Contract;
    onSubmit: (data: Contract) => void;
}

export default function EditContractForm({ contract, onSubmit }: Props) {
    const [title, setTitle] = useState(contract.title);
    const [description, setDescription] = useState(contract.description);
    const [startDate, setStartDate] = useState(new Date(contract.startDate));
    const [endDate, setEndDate] = useState(new Date(contract.endDate));

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit({
            title,
            description,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            id: contract.id,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="start-date">Start date:</label>
            <input
                id="start-date"
                type="date"
                value={startDate.toISOString().substr(0, 10)}
                onChange={(e) => setStartDate(new Date(e.target.value))}
            />
            <label htmlFor="end-date">End date:</label>
            <input
                id="end-date"
                type="date"
                value={endDate.toISOString().substr(0, 10)}
                onChange={(e) => setEndDate(new Date(e.target.value))}
            />
            <button type="submit">Save</button>
        </form>
    );
}

export { };
