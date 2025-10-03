import PersonEntry from "@/components/PersonEntry";
import { UserContext } from "@/lib/context";
import { NullObjectID } from "@/lib/null_object_id";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import CreateTeamDialog from "@/components/CreateTeamDialog";
import { useQuery } from "@tanstack/react-query";
import { teamDriver } from "@/api/team";
import { ParseUser } from "@/api/user";
import InfoAlert from "@/components/InfoAlert";
import ErrorAlert from "@/components/ErrorAlert";

export default function MyTeam() {
    const user = useContext(UserContext)!;

    const {
        data: members,
        isLoading,
        isError,
    } = useQuery({
        queryFn: async () =>
            (await teamDriver.getTeamMembers(user.team)).map((user) =>
                ParseUser(user),
            ),
        queryKey: ["members"],
    });

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

    if (isLoading) {
        return <InfoAlert className="Загрузка..." />;
    }

    if (isError) {
        return <ErrorAlert className="Ошибка загрузки" />;
    }

    return (
        <div>
            {members!.map((member) => (
                <PersonEntry user={member} />
            ))}
        </div>
    );
}
