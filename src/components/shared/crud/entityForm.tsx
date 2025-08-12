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
    validationRules?: {
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        patternMessage?: string;
    };
}

function SubmitButton({ isEditing, entityName }: { isEditing: boolean; entityName: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending
                ? "Salvando..."
                : isEditing
                    ? "Salvar Alterações"
                    : `Criar ${entityName}`}
        </Button>
    );
}

export function EntityForm<T extends BaseEntity>({
    isOpen,
    onClose,
    entity,
    entityName,
    createAction,
    updateAction,
    renderAdditionalFields,
    validationRules = { minLength: 3 },
}: EntityFormProps<T>) {
    const formRef = useRef<HTMLFormElement>(null);
    const isEditing = !!entity;

    const action = isEditing
        ? updateAction.bind(null, entity.id)
        : createAction;

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
                        {isEditing ? `Editar ${entityName}` : `Nov${entityName.endsWith('a') ? 'a' : 'o'} ${entityName}`}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? `Faça alterações n${entityName.endsWith('a') ? 'a' : 'o'} ${entityName.toLowerCase()} aqui.`
                            : `Adicione um${entityName.endsWith('a') ? 'a' : ''} nov${entityName.endsWith('a') ? 'a' : 'o'} ${entityName.toLowerCase()} à lista.`}
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef} action={dispatch} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={entity?.name ?? ""}
                            required
                            minLength={validationRules.minLength}
                            maxLength={validationRules.maxLength}
                            pattern={validationRules.pattern}
                            title={validationRules.patternMessage}
                        />
                    </div>

                    {renderAdditionalFields && renderAdditionalFields(entity)}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <SubmitButton isEditing={isEditing} entityName={entityName} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}