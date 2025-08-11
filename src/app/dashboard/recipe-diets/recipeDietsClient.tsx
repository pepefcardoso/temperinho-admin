"use client";

import { useCallback, useState } from "react";
import { EntityPage } from "@/components/shared/entityPage";
import { DataTable } from "@/components/shared/dataTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { RecipeDiet } from "@/lib/types/recipe";
import { getColumns } from "./columns";
import { Toaster } from "sonner";
import { RecipeDietForm } from "@/components/recipeDiets/recipeDietsForm";
import { getDietsAction } from "@/lib/actions/recipeDiet";
import { useDataTable } from "@/hooks/useDataTable";
import { FetchParams } from "@/lib/types/api";

export function RecipeDietsClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<RecipeDiet | null>(null);

  const fetchDiets = useCallback(async (params: FetchParams) => {
    const result = await getDietsAction(params);
    return {
      data: result.data,
      pageCount: result.meta.last_page,
    };
  }, []);

  const { data, pageCount, isLoading, tableState, tableHandlers, refetch } =
    useDataTable<RecipeDiet>({
      fetchData: fetchDiets,
      pageSize: 10,
    });

  const handleNew = () => {
    setSelectedDiet(null);
    setIsFormOpen(true);
  };

  const handleEdit = useCallback((diet: RecipeDiet) => {
    setSelectedDiet(diet);
    setIsFormOpen(true);
  }, []);

  const handleFormClose = useCallback(
    (shouldRefetch: boolean) => {
      setIsFormOpen(false);
      if (shouldRefetch) {
        refetch();
      }
    },
    [refetch]
  );

  const columns = getColumns(handleEdit, refetch);

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

      <RecipeDietForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        diet={selectedDiet}
      />
    </>
  );
}
