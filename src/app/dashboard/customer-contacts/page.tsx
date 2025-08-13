"use client";

import { CrudPage } from "@/components/shared/crud/crudPage";
import { CustomerContact } from "@/lib/types/customer";
import {
    getCustomerContactsAction,
    createCustomerContactAction,
    updateCustomerContactAction,
    deleteCustomerContactAction,
} from "@/lib/actions/customerContact";
import { customerContactSchema } from "@/lib/schemas/customers";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/dataTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const columns: ColumnDef<CustomerContact>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    },
    {
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="E-mail" />,
    },
    {
        accessorKey: "phone",
        header: "Telefone",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge>{row.getValue("status")}</Badge>,
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Enviado em" />,
        cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString("pt-BR"),
    },
];

const renderAdditionalFormFields = (entity?: CustomerContact | null) => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" defaultValue={entity?.name ?? ""} required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" defaultValue={entity?.email ?? ""} required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" name="phone" defaultValue={entity?.phone ?? ""} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" name="message" defaultValue={entity?.message ?? ""} required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input id="status" name="status" defaultValue={entity?.status ?? "new"} required />
        </div>
    </div>
);

export default function CustomerContactsPage() {
    return (
        <CrudPage<CustomerContact>
            title="Contatos de Clientes"
            description="Gerencie os contatos recebidos através do site."
            entityName="Contato"
            actions={{
                fetch: getCustomerContactsAction,
                create: createCustomerContactAction,
                update: updateCustomerContactAction,
                delete: deleteCustomerContactAction,
            }}
            schema={customerContactSchema}
            additionalColumns={columns}
            renderAdditionalFormFields={renderAdditionalFormFields}
        />
    );
}