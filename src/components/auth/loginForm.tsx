"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Carregando..." : "Entrar"}
        </Button>
    );
}

export function LoginForm() {
    const initialState = { message: "", success: false };
    const [state, dispatch] = useFormState(login, initialState);

    return (
        <form action={dispatch} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" required />
            </div>
            {state.message && (
                <p className="text-sm text-red-600">{state.message}</p>
            )}
            <LoginButton />
        </form>
    );
}