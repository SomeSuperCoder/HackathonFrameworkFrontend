import PersonEntry from "@/components/team/PersonEntry";
import { UserContext } from "@/lib/context";
import { UndefinedObjectID } from "@/lib/null_object_id";
import { useContext } from "react";
import CreateTeamDialog from "@/components/team/dialogs/CreateTeamDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamDriver } from "@/api/team";
import { userDriver } from "@/api/user";
import InfoAlert from "@/components/alerts/InfoAlert";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import UploadSolution from "@/components/team/drawers/UploadSolution";
import EditTeamNameDialog from "@/components/team/dialogs/EditTeamNameDialog";
import { ButtonGroup } from "@/components/ui/button-group";
import DeleteTeamDialog from "@/components/team/dialogs/DeleteTeamDialog";
import JoinTeam from "@/components/team/JoinTeam";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function MyTeam() {
    const queryClient = useQueryClient();

    const user = useContext(UserContext)!;

    const {
        data: team,
        isLoading: teamIsLoading,
        isError: teamIsError,
    } = useQuery({
        queryKey: ["team", user.team.toHexString()],
        queryFn: async () => teamDriver.getByID(user.team),
    });
    const {
        data: members,
        isLoading: membersAreLoading,
        isError: membersIsError,
    } = useQuery({
        queryKey: ["members", user.team.toHexString()],
        queryFn: async () => teamDriver.getMembers(user.team),
    });

    const leaveTeam = useMutation({
        mutationFn: async () => {
            await userDriver.updateUser(user._id, {
                team: UndefinedObjectID.toHexString(),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });

    if (user.team.equals(UndefinedObjectID)) {
        return (
            <div className="h-full flex flex-col justify-center items-center gap-2">
                <h1 className="scroll-m-20 text-center sm:w-[70%] text-xl lg:text-2xl font-extrabold tracking-tight text-balance">
                    К сожалению, вы пока что не состоите в команде,
                    <br />
                    но вы можете:
                </h1>
                <div className="flex flex-col md:flex-row gap-3">
                    <CreateTeamDialog />
                    <JoinTeam />
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
                {team?.leader.equals(user._id) ? (
                    <ButtonGroup>
                        <EditTeamNameDialog team={team!} />
                        <DeleteTeamDialog team={team!} />
                    </ButtonGroup>
                ) : (
                    <Button
                        onClick={() => leaveTeam.mutate()}
                        variant="destructive"
                        size="icon"
                    >
                        <LogOut />
                    </Button>
                )}
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
