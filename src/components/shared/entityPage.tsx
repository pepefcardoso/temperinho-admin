import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/shared/dataTable";

interface EntityPageProps<TData, TValue> {
    title: string;
    description: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterColumn: string;
    filterPlaceholder?: string;
    actionButton1?: React.ReactNode;
    actionButton2?: React.ReactNode;
}

export function EntityPage<TData, TValue>({
    title,
    description,
    columns,
    data,
    filterColumn,
    filterPlaceholder,
    actionButton1,
    actionButton2,
}: EntityPageProps<TData, TValue>): React.ReactElement {
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
                        <div className="flex items-center gap-2">
                            {actionButton1}
                            {actionButton2}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data}
                        filterColumn={filterColumn}
                        filterPlaceholder={filterPlaceholder}
                    />
                </CardContent>
            </Card>
        </div>
    );
}