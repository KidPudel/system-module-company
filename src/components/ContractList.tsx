import Contract from "../types/Contract";
import ContractItem from "./ContractItem";

interface Props {
  contracts: Contract[];
  onEdit: (data: Contract) => void;
  onDelete: (title: string) => void;
}

export default function ContractList({ contracts, onEdit, onDelete }: Props) {
  return (
    <div>
      {contracts.map((contract) => (
        <ContractItem
          key={contract.id}
          contract={contract}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
