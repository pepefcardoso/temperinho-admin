"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RecipeCategory } from "@/lib/types/recipe";
import {
  createRecipeCategoryAction,
  updateRecipeCategoryAction,
} from "@/lib/actions/recipeCategory";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface RecipeCategoryFormProps {
  isOpen: boolean;
  onClose: (shouldRefetch: boolean) => void;
  category?: RecipeCategory | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending
        ? "Salvando..."
        : isEditing
        ? "Salvar Alterações"
        : "Criar Categoria"}
    </Button>
  );
}

export function RecipeCategoryForm({
  isOpen,
  onClose,
  category,
}: RecipeCategoryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = !!category;

  const action = isEditing
    ? updateRecipeCategoryAction.bind(null, category.id)
    : createRecipeCategoryAction;
  const [state, dispatch] = useActionState(action, { success: false });

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Operação realizada com sucesso!");
      onClose(true);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onClose]);

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Faça alterações na categoria aqui."
              : "Adicione uma nova categoria à lista."}
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              defaultValue={category?.name ?? ""}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
