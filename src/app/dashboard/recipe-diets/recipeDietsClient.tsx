"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
    useReactTable,
    getCoreRowModel,
    PaginationState,
    SortingState,
    ColumnFiltersState,
} from "@tanstack/react-table";
import { EntityPage } from "@/components/shared/entityPage";
import { DataTable } from "@/components/shared/dataTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { RecipeDiet } from "@/lib/types/recipe";
import { getColumns } from "./columns";
import { Toaster, toast } from "sonner";
import { RecipeDietForm } from "@/components/recipeDiets/recipeDietsForm";
import { getDietsAction } from "@/lib/actions/recipeDiet"; // Importe a nova action

// Removido initialData e token das props
export function RecipeDietsClient() {
    const [data, setData] = useState<RecipeDiet[]>([]);
    const [pageCount, setPageCount] = useState(0);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedDiet, setSelectedDiet] = useState<RecipeDiet | null>(null);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const searchTerm = useMemo(
        () =>
            (columnFilters.find((f) => f.id === "name")?.value as string) || "",
        [columnFilters]
    );

    const fetchData = useCallback(async () => {
        try {
            const result = await getDietsAction({
                pageIndex,
                pageSize,
                sorting,
                searchTerm,
            });
            setData(result.data);
            setPageCount(result.meta.last_page);
        } catch (error) {
            console.error("Erro ao buscar dados das dietas:", error);
            toast.error("Falha ao buscar dados das dietas.");
        }
    }, [pageIndex, pageSize, sorting, searchTerm]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleNew = () => {
        setSelectedDiet(null);
        setIsFormOpen(true);
    };

    const handleEdit = (diet: RecipeDiet) => {
        setSelectedDiet(diet);
        setIsFormOpen(true);
    };

    const columns = useMemo(() => getColumns(handleEdit), []);

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );

    const table = useReactTable({
        data,
        columns,
        pageCount,
        state: {
            pagination,
            sorting,
            columnFilters,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
    });

    return (
        <>
            <Toaster richColors position="top-right" />
            <EntityPage
                title="Dietas de Receita"
                description="Gerencie as dietas de receitas cadastradas."
            >
                <div className="flex justify-end mb-4">
                    <Button onClick={handleNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Dieta
                    </Button>
                </div>
                <DataTable
                    table={table}
                    columns={columns}
                    filterColumn="name"
                    filterPlaceholder="Filtrar por nome da dieta..."
                />
            </EntityPage>

            <RecipeDietForm
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                diet={selectedDiet}
            />
        </>
    );
}