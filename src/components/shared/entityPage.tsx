import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface EntityPageProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function EntityPage({
    title,
    description,
    children
}: EntityPageProps): React.ReactElement {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
                            <CardDescription className="text-gray-500 mt-1">
                                {description}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}