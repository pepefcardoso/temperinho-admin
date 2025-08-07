import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

type AuthCardProps = CardProps & {
    cardTitle: string;
    cardDescription: string;
    children: React.ReactNode;
    footer: React.ReactNode;
};

export function AuthCard({
    cardTitle,
    cardDescription,
    children,
    footer,
    ...props
}: AuthCardProps) {
    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    );
}