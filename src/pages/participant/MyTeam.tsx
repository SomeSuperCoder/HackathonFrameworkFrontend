import PersonEntry from "@/components/PersonEntry";
import { UserContext } from "@/lib/context";
import { NullObjectID } from "@/lib/null_object_id";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import CreateTeamDialog from "@/components/CreateTeamDialog";

export default function MyTeam() {
    const user = useContext(UserContext)!;

    if (user.team.equals(NullObjectID)) {
        return (
            <div className="h-full flex flex-col justify-center items-center gap-2">
                <h1 className="scroll-m-20 text-center sm:w-[70%] text-xl lg:text-2xl font-extrabold tracking-tight text-balance">
                    К сожалению, вы пока что не состоите в команде,
                    <br />
                    но вы можете:
                </h1>
                <div className="flex flex-col md:flex-row gap-3">
                    <CreateTeamDialog />
                    <Button variant="outline">
                        Присоедениться к существующей
                    </Button>
                </div>
            </div>
        );
    }

    return <PersonEntry user={user} />;
}
