"use client";

import { PlusCircle, Download } from "lucide-react";
import { Payment } from "@/lib/types/payment";
import { columns } from "./columns";
import { EntityPage } from "@/components/shared/entityPage";
import { Button } from "@/components/ui/button";

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
  const handleNovoPagamento = () => {
    //
  };

  const handleExportar = () => {
    //
  };

  return (
    <EntityPage
      title="Pagamentos"
      description="Visualize e gerencie todos os pagamentos registrados."
      columns={columns}
      data={payments}
      filterColumn="status"
      filterPlaceholder="Filtrar por status..."
      actionButton1={
        <Button onClick={handleNovoPagamento}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Pagamento
        </Button>
      }
      actionButton2={
        <Button variant="outline" onClick={handleExportar}>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      }
    />
  );
}