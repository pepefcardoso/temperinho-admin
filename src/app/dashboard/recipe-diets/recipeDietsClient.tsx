"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { EntityPage } from "@/components/shared/entityPage";
import { DataTable } from "@/components/shared/dataTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { RecipeDiet } from "@/lib/types/recipe";
import { getColumns } from "./columns";
import { Toaster, toast } from "sonner";
import { RecipeDietForm } from "@/components/recipeDiets/recipeDietsForm";
import { getDietsAction } from "@/lib/actions/recipeDiet";

export function RecipeDietsClient() {
    const [data, setData] = useState<RecipeDiet[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedDiet, setSelectedDiet] = useState<RecipeDiet | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [rowSelection, setRowSelection] = useState({});

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await getDietsAction({
                pageIndex,
                pageSize,
                sorting,
                searchTerm: globalFilter,
            });
            setData(result.data);
            setPageCount(result.meta.last_page);
        } catch (error) {
            console.error("Erro ao buscar dados das dietas:", error);
            toast.error("Falha ao buscar dados das dietas.");
        } finally {
            setIsLoading(false);
        }
    }, [pageIndex, pageSize, sorting, globalFilter]);

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

    return (
        <>
            <Toaster richColors position="top-right" />
            <EntityPage
                title="Dietas de Receita"
                description="Gerencie as dietas de receitas cadastradas."
                isLoading={isLoading}
                actions={
                    <Button onClick={handleNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nova Dieta
                    </Button>
                }
            >
                <DataTable
                    columns={columns}
                    data={data}
                    pageCount={pageCount}
                    state={{
                        pagination: { pageIndex, pageSize },
                        sorting,
                        globalFilter,
                        rowSelection,
                    }}
                    onPaginationChange={setPagination}
                    onSortingChange={setSorting}
                    onGlobalFilterChange={setGlobalFilter}
                    onRowSelectionChange={setRowSelection}
                    manualPagination
                    manualSorting
                    manualFiltering
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