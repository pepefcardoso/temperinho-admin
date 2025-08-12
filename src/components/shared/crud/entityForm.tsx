"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ActionState } from "@/lib/types/api";

export interface BaseEntity {
    id: number;
    name: string;
}

interface EntityFormProps<T extends BaseEntity> {
    isOpen: boolean;
    onClose: (shouldRefetch: boolean) => void;
    entity?: T | null;
    entityName: string;
    createAction: (
        prevState: ActionState | undefined,
        formData: FormData
    ) => Promise<ActionState>;
    updateAction: (
        id: number,
        prevState: ActionState | undefined,
        formData: FormData
    ) => Promise<ActionState>;
    renderAdditionalFields?: (entity?: T | null) => React.ReactNode;
    schema: z.Schema<any>;
}

export function EntityForm<T extends BaseEntity>({
    isOpen,
    onClose,
    entity,
    entityName,
    createAction,
    updateAction,
    schema,
    renderAdditionalFields,
}: EntityFormProps<T>) {
    const isEditing = !!entity;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: entity || { name: "" },
    });

    useEffect(() => {
        if (isOpen) {
            reset(entity ?? { name: "" });
        }
    }, [isOpen, entity, reset]);

    const processForm = async (data: z.infer<typeof schema>) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        const action = isEditing
            ? updateAction.bind(null, entity.id)
            : createAction;

        const state = await action(undefined, formData);

        if (state.success) {
            toast.success(state.message || "Operação realizada com sucesso!");
            onClose(true);
        } else {
            toast.error(state.message || "Ocorreu um erro ao processar a solicitação.");
        }
    };

    const entityGenderSuffix = entityName.endsWith('a') ? 'a' : 'o';
    const entityArticle = entityName.endsWith('a') ? 'a' : 'o';
    const entityArticleUpper = entityName.endsWith('a') ? 'a' : '';


    return (
        <Dialog open={isOpen} onOpenChange={() => onClose(false)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? `Editar ${entityName}` : `Nov${entityGenderSuffix} ${entityName}`}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? `Faça alterações n${entityArticle} ${entityName.toLowerCase()} aqui.`
                            : `Adicione um${entityArticleUpper} nov${entityGenderSuffix} ${entityName.toLowerCase()} à lista.`}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(processForm)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            {...register("name")}
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {`${errors.name.message}`}
                            </p>
                        )}
                    </div>

                    {renderAdditionalFields && renderAdditionalFields(entity)}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting
                                ? "Salvando..."
                                : isEditing
                                    ? "Salvar Alterações"
                                    : `Criar ${entityName}`}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}