"use client";

import { CrudPage } from "@/components/shared/crud/crudPage";
import { RecipeCategory } from "@/lib/types/recipe";
import {
  getRecipeCategoriesAction,
  createRecipeCategoryAction,
  updateRecipeCategoryAction,
  deleteRecipeCategoryAction,
} from "@/lib/actions/recipeCategory";
import { recipeCategorySchema } from "@/lib/schemas/recipes";

export default function RecipeCategoriesPage() {
  return (
    <CrudPage<RecipeCategory>
      title="Categorias de Receita"
      description="Gerencie as categorias de receitas cadastradas."
      entityName="Categoria"
      actions={{
        fetch: getRecipeCategoriesAction,
        create: createRecipeCategoryAction,
        update: updateRecipeCategoryAction,
        delete: deleteRecipeCategoryAction,
      }}
      schema={recipeCategorySchema} 
    />
  );
}