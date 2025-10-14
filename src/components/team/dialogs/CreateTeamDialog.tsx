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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { teamDriver } from "@/api/team";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateTeamDialog() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const createTeam = useMutation({
        mutationFn: async (name: string) => {
            setOpen(false);
            await teamDriver.create({
                name: name,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Создать свою</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Создание команды</DialogTitle>
                    <DialogDescription>
                        Придумайте креативное название своей команды и нажмите
                        Cоздать
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
                    <Button onClick={() => createTeam.mutate(name)}>
                        Создать
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
