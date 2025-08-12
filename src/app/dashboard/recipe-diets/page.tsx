"use client";

import { CrudPage } from "@/components/shared/crud/crudPage";
import { RecipeDiet } from "@/lib/types/recipe";
import {
  getRecipeDietsAction,
  createRecipeDietAction,
  updateRecipeDietAction,
  deleteRecipeDietAction,
} from "@/lib/actions/recipeDiet";

export default function RecipeDietsPage() {
  return (
    <CrudPage<RecipeDiet>
      title="Dietas de Receita"
      description="Gerencie as dietas de receitas cadastradas."
      entityName="Dieta"
      actions={{
        fetch: getRecipeDietsAction,
        create: createRecipeDietAction,
        update: updateRecipeDietAction,
        delete: deleteRecipeDietAction,
      }}
      validationRules={{
        minLength: 3,
        maxLength: 100,
      }}
    />
  );
}