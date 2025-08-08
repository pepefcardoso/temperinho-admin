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
import { RecipeDiet } from "@/lib/types/recipe";
import { createDietAction, updateDietAction } from "@/lib/actions/recipeDiet";

interface RecipeDietFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  diet?: RecipeDiet | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Dieta"}
    </Button>
  );
}

export function RecipeDietForm({ isOpen, onOpenChange, diet }: RecipeDietFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = !!diet;
  
  const action = isEditing ? updateDietAction.bind(null, diet.id) : createDietAction;
  const [state, dispatch] = useActionState(action, { success: false });

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Dieta" : "Nova Dieta"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Faça alterações na dieta aqui." : "Adicione uma nova dieta à lista."}
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" defaultValue={diet?.name ?? ""} required />
          </div>
          {state?.message && !state.success && (
            <p className="text-sm text-red-600">{state.message}</p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}