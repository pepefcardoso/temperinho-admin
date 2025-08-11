"use client";

import { useCallback, useState } from "react";
import { EntityPage } from "@/components/shared/entityPage";
import { DataTable } from "@/components/shared/dataTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { RecipeCategory } from "@/lib/types/recipe";
import { getColumns } from "./columns";
import { Toaster } from "sonner";
import { RecipeCategoryForm } from "@/components/recipes/recipeCategoriesForm";
import { getRecipeCategoriesAction } from "@/lib/actions/recipeCategory";
import { useDataTable } from "@/hooks/useDataTable";
import { FetchParams } from "@/lib/types/api";

export function RecipeCategoriesClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<RecipeCategory | null>(null);

  const fetchCategories = useCallback(async (params: FetchParams) => {
    const result = await getRecipeCategoriesAction(params);
    return {
      data: result.data,
      pageCount: result.meta.last_page,
    };
  }, []);

  const { data, pageCount, isLoading, tableState, tableHandlers, refetch } =
    useDataTable<RecipeCategory>({
      fetchData: fetchCategories,
      pageSize: 10,
    });

  const handleNew = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = useCallback((category: RecipeCategory) => {
    setSelectedCategory(category);
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
        title="Categorias de Receita"
        description="Gerencie as categorias de receitas cadastradas."
        isLoading={isLoading}
        actions={
          <Button onClick={handleNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Categoria
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

      <RecipeCategoryForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        category={selectedCategory}
      />
    </>
  );
}
