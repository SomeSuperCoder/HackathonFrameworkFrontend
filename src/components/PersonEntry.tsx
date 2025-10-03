import type { ParsedUser } from "@/api/user";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function PersonEntry(props: { user: ParsedUser }) {
    const user = props.user;

    return (
        <div className="p-3 bg-slate-700 rounded-2xl w-fit flex items-baseline gap-5">
            <div className="text-xl flex justify-around items-baseline gap-3">
                <p>{user.name}</p>
                <p>{user.birthdate.toLocaleDateString("ru-RU")}</p>
            </div>
            <Button variant="ghost">
                Связаться <Send />
            </Button>
        </div>
    );
}
