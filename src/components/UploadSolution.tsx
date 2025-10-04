import { teamDriver, type ParsedTeam } from "@/api/team";
import { Button } from "./ui/button";
import { Upload, SquarePen, CirclePlus, Trash2 } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "./ui/input";
import { useQueryClient } from "@tanstack/react-query";
import UnrwappedErrorAlert from "./UnwrappedErrorAlert";

export default function UploadSolution(props: { team: ParsedTeam }) {
    const queryClient = useQueryClient();

    const [repos, setRepos] = useState<string[]>([]);
    const [presentationURI, setPresentationURI] = useState("");

    const [isError, setIsError] = useState(false);

    const addRepo = () => {
        setRepos([...repos, ""]);
    };
    const removeRepo = (target: number) => {
        setRepos(repos.filter((_, i) => i != target));
    };
    const setRepoByIndex = (target: number, value: string) => {
        setRepos(
            repos.map((repo, i) => {
                return i == target ? value : repo;
            }),
        );
    };
    const upload = async () => {
        try {
            await teamDriver.updateTeam(props.team._id, {
                repos: repos,
                presentation_uri: presentationURI,
            });
        } catch {
            setIsError(true);
        }

        queryClient.invalidateQueries({
            queryKey: ["team", props.team._id.toHexString()],
        });
    };

    const editMode = props.team.repos.length || props.team.presentation_uri;

    return (
        <Drawer>
            <DrawerTrigger>
                {editMode ? (
                    <Button variant="secondary" size="sm">
                        Редактировать решение
                        <SquarePen />
                    </Button>
                ) : (
                    <Button size="sm">
                        Загрузить решение
                        <Upload />
                    </Button>
                )}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        Заполните информацию о вашем решении
                    </DrawerTitle>
                    <DrawerDescription className="flex justify-center items-center">
                        <div className="flex flex-col gap-3 max-w-3/4">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Git репозитории{" "}
                                <Button
                                    onClick={addRepo}
                                    variant="secondary"
                                    size="icon"
                                >
                                    <CirclePlus />
                                </Button>
                            </h4>
                            {repos.length ? (
                                repos.map((repo, i) => {
                                    return (
                                        <div key={i} className="flex">
                                            <Input
                                                type="url"
                                                value={repo}
                                                onChange={(e) =>
                                                    setRepoByIndex(
                                                        i,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <Button
                                                onClick={() => removeRepo(i)}
                                                variant="secondary"
                                                size="icon"
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Отсутствуют, добавьте минимум 1</p>
                            )}
                            <Input
                                id="presentation_uri"
                                name="presentation_uri"
                                type="url"
                                placeholder="Ссылка на презентацию"
                                value={presentationURI}
                                onChange={(e) =>
                                    setPresentationURI(e.target.value)
                                }
                            />{" "}
                            {isError && (
                                <UnrwappedErrorAlert message="Введены некорректные ссылки" />
                            )}
                        </div>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="flex flex-row justify-center items-center">
                    <DrawerClose>
                        <Button variant="outline">Отмена</Button>
                    </DrawerClose>
                    <Button onClick={upload} className="w-fit">
                        {editMode ? "Обновить" : "Загрузить"}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
