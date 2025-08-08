import { getRecipeDiets } from "@/lib/api/recipeDiets";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RecipeDietsClient } from "./recipeDietsClient";

export default async function RecipeDietsPage() {
    const session = await getSession();

    if (!session) {
        redirect("/auth/login?error=invalid_session");
    }

    const initialData = await getRecipeDiets(session.token, {
        pageIndex: 0,
        pageSize: 10,
        sorting: [],
        searchTerm: '',
    });

    return <RecipeDietsClient initialData={initialData} token={session.token} />;
}