import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { teamDriver, type ParsedTeam } from "@/api/team";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";

export default function DeleteTeamDialog(props: { team: ParsedTeam }) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    const deleteTeam = useMutation({
        mutationFn: async () => {
            setOpen(false);
            await teamDriver.delete(props.team._id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Вы точно хотите удалить команду?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя будет отменить!!!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            className="text-white font-semibold"
                            onClick={() => deleteTeam.mutate()}
                        >
                            УДАЛИТЬ
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
