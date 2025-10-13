import type { ParsedUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { openTelegramLink } from "@telegram-apps/sdk";

export default function PersonEntry(props: { user: ParsedUser }) {
    const user = props.user;

    return (
        <div className="p-3 bg-slate-700 rounded-2xl w-fit flex items-baseline gap-5">
            <div className="md:text-xl flex justify-around items-baseline gap-3">
                <p className="font-bold">{user.name}</p>
                <p className="text-muted-foreground">
                    {user.birthdate.toLocaleDateString("ru-RU")}
                </p>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    openTelegramLink(`https://t.me/${user.username}`)
                }
            >
                Связаться <Send />
            </Button>
        </div>
    );
}
