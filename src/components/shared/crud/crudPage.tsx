"use client";

import { ReactNode } from "react";
import { EntityPage } from "@/components/shared/entityPage";
import { DataTable } from "@/components/shared/dataTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Toaster } from "sonner";
import { EntityForm, BaseEntity } from "./entityForm";
import { getBaseColumns } from "./crudColumns";
import { useEntityCrud, EntityCrudActions } from "@/hooks/useEntityCrud";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

interface CrudPageProps<T extends BaseEntity> {
    title: string;
    description: string;
    entityName: string;
    actions: EntityCrudActions<T>;
    pageSize?: number;
    additionalColumns?: ColumnDef<T>[];
    renderAdditionalFormFields?: (entity?: T | null) => ReactNode;
    schema: z.Schema<any>;
}

export function CrudPage<T extends BaseEntity>({
    title,
    description,
    entityName,
    actions,
    pageSize = 10,
    additionalColumns = [],
    renderAdditionalFormFields,
    schema,
}: CrudPageProps<T>) {
    const {
        data,
        pageCount,
        isLoading,
        isFormOpen,
        selectedEntity,
        isDeletingId,
        tableState,
        tableHandlers,
        handleNew,
        handleEdit,
        handleDelete,
        handleFormClose,
    } = useEntityCrud<T>({
        actions,
        pageSize,
        entityName,
    });

    const columns = getBaseColumns<T>({
        entityName,
        onEdit: handleEdit,
        onDelete: handleDelete,
        isDeletingId,
        additionalColumns,
    });

    return (
        <>
            <Toaster richColors position="top-right" />
            <EntityPage
                title={title}
                description={description}
                isLoading={isLoading}
                actions={
                    <Button onClick={handleNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nov{entityName.endsWith('a') ? 'a' : 'o'} {entityName}
                    </Button>
                }
            >
                <DataTable
                    columns={columns}
                    data={data}
                    pageCount={pageCount}
                    state={{
                        pagination: tableState.pagination,
                        sorting: tableState.sorting,
                        globalFilter: tableState.globalFilter,
                        rowSelection: tableState.rowSelection,
                    }}
                    onPaginationChange={tableHandlers.onPaginationChange}
                    onSortingChange={tableHandlers.onSortingChange}
                    onGlobalFilterChange={tableHandlers.onGlobalFilterChange}
                    onRowSelectionChange={tableHandlers.onRowSelectionChange}
                    manualPagination
                    manualSorting
                    manualFiltering
                />
            </EntityPage>

            <EntityForm<T>
                isOpen={isFormOpen}
                onClose={handleFormClose}
                entity={selectedEntity}
                entityName={entityName}
                createAction={actions.create}
                updateAction={actions.update}
                renderAdditionalFields={renderAdditionalFormFields}
                schema={schema}
            />
        </>
    );
}