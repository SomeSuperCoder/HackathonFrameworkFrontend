import type { ParsedTeam } from "@/api/team";
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

export default function UploadSolution(props: { team: ParsedTeam }) {
    const [repos, setRepos] = useState<string[]>([]);

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

    if (props.team.repos.length || props.team.presentation_uri) {
        return (
            <Button variant="secondary" size="sm">
                Редактировать решение
                <SquarePen />
            </Button>
        );
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <Button size="sm">
                    Загрузить решение
                    <Upload />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>
                        Заполните информацию о вашем решении
                    </DrawerTitle>
                    <DrawerDescription className="flex justify-center items-center">
                        <div className="max-w-3/4">
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
                                        <div className="flex">
                                            <Input
                                                type="url"
                                                key={i}
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
                            <br />
                            <Input
                                id="presentation_uri"
                                name="presentation_uri"
                                type="url"
                                placeholder="Ссылка на презентацию"
                            />
                        </div>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="flex flex-row justify-center items-center">
                    <DrawerClose>
                        <Button variant="outline">Отмена</Button>
                    </DrawerClose>
                    <Button className="w-fit">Загрузить</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
