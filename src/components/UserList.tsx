import Contract from '../types/Contract';
import User from '../types/User';
import UserItem from './UserItem';

interface Props {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function ContractList({ users, onEdit, onDelete }: Props) {
    return (
        <div>
            {users.map((user) => (
                <UserItem
                    key={user.id}
                />
            ))}
        </div>
    );
}
