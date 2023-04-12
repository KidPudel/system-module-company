import User from "../types/User";

import { Card, Button } from "@mui/material";

interface Props {
  user: User;
  onDelete: (name: string) => void;
  onEdit: (user: User) => void;
}

const UserItem = ({ user, onDelete, onEdit }: Props) => {
  const { id, name, status } = user;

  const handleOnDelete = () => {
    onDelete(name);
  };

  const handleOnEdit = () => {
    onEdit(user);
  };

  return (
    <Card className="Card" elevation={5} sx={{ boxShadow: "5px 5px 0px" }}>
      <h3>{name}</h3>
      <p>{status}</p>
      <hr></hr>
      <Button onClick={handleOnDelete}>Delete</Button>
      <Button onClick={handleOnEdit}>Edit</Button>
    </Card>
  );
};

export default UserItem;
