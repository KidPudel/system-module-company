import User from "../types/User";
import UserItem from "./UserItem";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (name: string) => void;
}

export default function UserList({ users, onEdit, onDelete }: Props) {
  return (
    <div>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
