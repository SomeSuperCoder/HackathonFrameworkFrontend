import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamDriver } from "@/api/team";
import { userDriver } from "@/api/user";
import { UserContext } from "@/lib/context";
import ObjectID from "bson-objectid";

export default function JoinTeam() {
    const user = useContext(UserContext)!;

    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    const {
        data: teamsPaged,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["teams"],
        queryFn: async () => await teamDriver.findPaged(1, 1_000_000_000),
    });

    const joinTeam = useMutation({
        mutationFn: async (team: ObjectID) => {
            setOpen(false);
            await userDriver.updateUser(user._id, {
                team: team.toHexString(),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });

    if (isLoading) {
        return <Button variant="secondary">Загрузка команд...</Button>;
    }

    if (isError) {
        return <Button variant="destructive">Ошибка загрузки команд!</Button>;
    }

    const teams = teamsPaged!.values;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    Присоедениться к существующей
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput
                        placeholder="Найдите свою команду..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {teams.map((team) => (
                                <CommandItem
                                    key={team._id.toHexString()}
                                    value={team._id.toHexString()}
                                    onSelect={(currentValue) =>
                                        joinTeam.mutate(ObjectID(currentValue))
                                    }
                                >
                                    {team.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
