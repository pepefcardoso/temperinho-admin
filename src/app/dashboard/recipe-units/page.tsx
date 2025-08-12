"use client";

import { CrudPage } from "@/components/shared/crud/crudPage";
import { RecipeUnit } from "@/lib/types/recipe";
import {
  getRecipeUnitsAction,
  createRecipeUnitAction,
  updateRecipeUnitAction,
  deleteRecipeUnitAction,
} from "@/lib/actions/recipeUnit";
import { recipeUnitSchema } from "@/lib/schemas/recipes";

export default function RecipeUnitsPage() {
  return (
    <CrudPage<RecipeUnit>
      title="Unitas de Receita"
      description="Gerencie as unidades de receitas cadastradas."
      entityName="Unita"
      actions={{
        fetch: getRecipeUnitsAction,
        create: createRecipeUnitAction,
        update: updateRecipeUnitAction,
        delete: deleteRecipeUnitAction,
      }}
      schema={recipeUnitSchema} 
    />
  );
}