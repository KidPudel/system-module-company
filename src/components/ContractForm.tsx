import { useState } from 'react';
import Contract from '../types/Contract';

interface Props {
  onSubmit: (data: Contract) => void;
}

export default function ContractForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      id: ''
    });
    setTitle('');
    setDescription('');
    setStartDate(new Date());
    setEndDate(new Date());
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
      <button type="submit">Submit</button>
    </form>
  );
}

export { };
