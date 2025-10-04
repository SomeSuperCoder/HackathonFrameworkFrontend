import PersonEntry from "@/components/PersonEntry";
import { UserContext } from "@/lib/context";
import { NullObjectID } from "@/lib/null_object_id";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import CreateTeamDialog from "@/components/CreateTeamDialog";
import { useQuery } from "@tanstack/react-query";
import { ParseTeam, teamDriver } from "@/api/team";
import { ParseUser } from "@/api/user";
import InfoAlert from "@/components/InfoAlert";
import ErrorAlert from "@/components/ErrorAlert";
import UploadSolution from "@/components/UploadSolution";
import EditTeamNameDialog from "@/components/EditTeamNameDialog";
import { ButtonGroup } from "@/components/ui/button-group";
import DeleteTeamDialog from "@/components/DeleteTeamDialog";

export default function MyTeam() {
    const user = useContext(UserContext)!;

    const {
        data: team,
        isLoading: teamIsLoading,
        isError: teamIsError,
    } = useQuery({
        queryKey: ["team", user.team.toHexString()],
        queryFn: async () => ParseTeam(await teamDriver.getTeamByID(user.team)),
    });
    const {
        data: members,
        isLoading: membersAreLoading,
        isError: membersIsError,
    } = useQuery({
        queryKey: ["members", user.team.toHexString()],
        queryFn: async () =>
            (await teamDriver.getTeamMembers(user.team)).map((user) =>
                ParseUser(user),
            ),
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

    if (teamIsLoading || membersAreLoading) {
        return <InfoAlert message="Загрузка..." />;
    }

    if (teamIsError || membersIsError) {
        return <ErrorAlert message="Ошибка загрузки" />;
    }

    return (
        <div className="flex flex-col items-center mt-4 gap-4">
            <h1 className="flex gap-3 items-baseline scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                {team?.name}
                <ButtonGroup>
                    <EditTeamNameDialog team={team!} />
                    <DeleteTeamDialog team={team!} />
                </ButtonGroup>
            </h1>
            {team?.leader.equals(user._id) && <UploadSolution team={team} />}
            <div className="flex flex-col items-center gap-1">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Участники
                </h3>
                <div className="flex flex-col gap-1">
                    {members?.map((member, i) => (
                        <PersonEntry key={i} user={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}
