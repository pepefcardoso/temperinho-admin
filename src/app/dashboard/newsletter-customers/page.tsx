"use client";

import { CrudPage } from "@/components/shared/crud/crudPage";
import { NewsletterCustomer } from "@/lib/types/customer";
import {
    getNewsletterCustomersAction,
    createNewsletterCustomerAction,
    updateNewsletterCustomerAction,
    deleteNewsletterCustomerAction,
} from "@/lib/actions/newsletterCustomer";
import { newsletterCustomerSchema } from "@/lib/schemas/customers";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/dataTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const columns: ColumnDef<NewsletterCustomer>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="E-mail" />
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Inscrito em" />
        ),
        cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString("pt-BR"),
    },
];

const renderAdditionalFormFields = (entity?: NewsletterCustomer | null) => (
    <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
            id="email"
            name="email"
            type="email"
            defaultValue={entity?.email ?? ""}
            required
        />
    </div>
);


export default function NewsletterPage() {
    return (
        <CrudPage<NewsletterCustomer>
            title="Inscritos na Newsletter"
            description="Gerencie os clientes inscritos na sua newsletter."
            entityName="Inscrito"
            actions={{
                fetch: getNewsletterCustomersAction,
                create: createNewsletterCustomerAction,
                update: updateNewsletterCustomerAction,
                delete: deleteNewsletterCustomerAction,
            }}
            schema={newsletterCustomerSchema}
            additionalColumns={columns}
            renderAdditionalFormFields={renderAdditionalFormFields}
        />
    );
}