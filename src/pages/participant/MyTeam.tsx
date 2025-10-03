import PersonEntry from "@/components/PersonEntry";
import { UserContext } from "@/lib/context";
import { useContext } from "react";

export default function MyTeam() {
    const user = useContext(UserContext)!;

    return <PersonEntry user={user} />;
}
