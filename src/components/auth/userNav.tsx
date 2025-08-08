"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { User } from "@/lib/types/user";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
}

export function UserNav({ user, isCollapsed }: { user: User; isCollapsed: boolean }) {
    if (!user) {
        return null;
    }

    const { name, email } = user;
    const initials = getInitials(name);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full flex justify-start items-center gap-3 p-2 cursor-pointer",
                        isCollapsed && "justify-center p-0"
                    )}
                >
                    <Avatar className="h-8 w-8 transition-all ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2">
                        <AvatarImage src="/images/avatar.png" alt={`@${name}`} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>

                    <div className={cn("flex flex-col items-start", isCollapsed && "hidden")}>
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <form action={logout} className="w-full">
                    <button type="submit" className="w-full text-left">
                        <DropdownMenuItem>
                            Sair
                        </DropdownMenuItem>
                    </button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}