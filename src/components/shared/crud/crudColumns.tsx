"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DataTableColumnHeader } from "@/components/shared/dataTable";

export interface BaseEntity {
    id: number;
    name: string;
}

interface ActionCellProps<T extends BaseEntity> {
    entity: T;
    entityName: string;
    onEdit: (entity: T) => void;
    onDelete: (entity: T) => void;
    isDeleting: boolean;
}

export function ActionCell<T extends BaseEntity>({
    entity,
    entityName,
    onEdit,
    onDelete,
    isDeleting,
}: ActionCellProps<T>) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = () => {
        setShowDeleteDialog(false);
        onDelete(entity);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
                        <span className="sr-only">Abrir menu</span>
                        {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <MoreHorizontal className="h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit(entity)}>
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-destructive focus:text-destructive"
                    >
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir {entityName.toLowerCase()} {entity.name}?
                            Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Excluindo..." : "Excluir"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

interface GetColumnsOptions<T extends BaseEntity> {
    entityName: string;
    onEdit: (entity: T) => void;
    onDelete: (entity: T) => void;
    isDeletingId: number | null;
    additionalColumns?: ColumnDef<T>[];
}

export function getBaseColumns<T extends BaseEntity>({
    entityName,
    onEdit,
    onDelete,
    isDeletingId,
    additionalColumns = [],
}: GetColumnsOptions<T>): ColumnDef<T>[] {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Nome" />
            ),
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("name")}</div>
            ),
        },
        ...additionalColumns,
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => (
                <div className="text-right">
                    <ActionCell
                        entity={row.original}
                        entityName={entityName}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        isDeleting={isDeletingId === row.original.id}
                    />
                </div>
            ),
        },
    ];
}