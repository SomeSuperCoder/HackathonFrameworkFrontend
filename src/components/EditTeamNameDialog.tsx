import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { teamDriver, type ParsedTeam } from "@/api/team";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleAlert, Pencil } from "lucide-react";

export default function EditTeamNameDialog(props: { team: ParsedTeam }) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const updateTeam = useMutation({
        mutationFn: async (name: string) => {
            await teamDriver.updateTeam(props.team._id, {
                name: name,
            });
        },
        onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["team", props.team._id.toHexString()],
            });
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="icon">
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Переименование команды</DialogTitle>
                    <DialogDescription>
                        <p className="flex gap-1">
                            <CircleAlert /> НЕ МЕНЯЙТЕ НАЗВАНИЕ КОМНДЫ ЕСЛИ
                            КОНКУРС УЖЕ НАЧАЛСЯ
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Название</Label>
                        <Input
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button onClick={() => updateTeam.mutate(name)}>
                        Переименовать
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
