
import { Payment } from "@/lib/types/payment";
import { columns } from "./columns";
import { DataTable } from "@/components/dataTable";

const payments: Payment[] = [
  {
    id: 1,
    amount: 100,
    status: "pago",
    due_date: "2024-08-01",
    created_at: "2024-07-25",
  },
  {
    id: 2,
    amount: 250,
    status: "pendente",
    due_date: "2024-08-05",
    created_at: "2024-07-28",
  },
  {
    id: 3,
    amount: 75,
    status: "atrasado",
    due_date: "2024-07-20",
    created_at: "2024-07-15",
  },
];

export default function PaymentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Pagamentos</h2>
      <DataTable 
        columns={columns} 
        data={payments} 
        filterColumn="status"
        filterPlaceholder="Filtrar por status..."
      />
    </div>
  );
}