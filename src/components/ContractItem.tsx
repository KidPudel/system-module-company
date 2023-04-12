import Contract from "../types/Contract";

import { Card, Button } from "@mui/material";

interface Props {
  contract: Contract;
  onDelete: (id: string) => void;
  onEdit: (contract: Contract) => void;
}

const ContractItem = ({ contract, onDelete, onEdit }: Props) => {
  const { title, description, startDate, endDate, id } = contract;

  const handleDeleteClick = () => {
    onDelete(title);
  };

  const handleEditClick = () => {
    onEdit(contract);
  };

  return (
    <Card className="Card" elevation={5} sx={{ boxShadow: "5px 5px 0px" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Start date: {new Date(startDate).toLocaleDateString()}</p>
      <p>End date: {new Date(endDate).toLocaleDateString()}</p>
      <hr></hr>
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleEditClick}>Edit</button>
    </Card>
  );
};

export default ContractItem;
