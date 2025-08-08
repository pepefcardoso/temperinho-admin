"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dashboardConfig } from "@/config/dashboard";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/components/ui/icon";
import { UserNav } from "@/components/auth/userNav";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { User } from "@/lib/types/user";

export function Sidebar({ user }: { user: User }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={cn(
                "relative hidden min-h-screen border-r md:block transition-all duration-300",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex h-16 items-center justify-between border-b px-4">
                <h1
                    className={cn(
                        "text-lg font-bold",
                        isCollapsed && "hidden"
                    )}
                >
                    Temperinho
                </h1>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {isCollapsed ? (
                        <PanelRightClose className="h-4 w-4" />
                    ) : (
                        <PanelLeftClose className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle Sidebar</span>
                </Button>
            </div>
            <nav className="flex-grow space-y-2 p-2">
                <TooltipProvider delayDuration={0}>
                    {dashboardConfig.navItems.map((item) => (
                        <Tooltip key={item.href}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href={item.href}>
                                        <Icon name={item.icon} className="mr-2 h-4 w-4" />
                                        <span className={cn(isCollapsed && "hidden")}>
                                            {item.title}
                                        </span>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    <p>{item.title}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>
            <div className="absolute bottom-0 w-full border-t p-2">
                <UserNav user={user} />
            </div>
        </div>
    );
}