import { useState } from "react";
import User from "../types/User";

import { Card, Button, Input } from "@mui/material";

interface Props {
  user: User;
  onSubmit: (data: User) => void;
}

export default function EditUserForm({ user, onSubmit }: Props) {
  const [name, setName] = useState(user.name);
  const [status, setStatus] = useState(user.status);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      name,
      status,
      id: user.id,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="Card" elevation={5} sx={{ boxShadow: "5px 5px 0px" }}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button type="submit">Save</Button>
      </Card>
    </form>
  );
}
export {};
