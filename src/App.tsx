import {
    init,
    initData,
    retrieveLaunchParams,
    viewport,
    type User,
} from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { TelegramUserContext, UserContext } from "./lib/context";
import { useQuery } from "@tanstack/react-query";
import { userDriver } from "./api/user";
import Participant from "./pages/Participant";
import ErrorAlert from "./components/ErrorAlert";
import InfoAlert from "./components/InfoAlert";

init();
const isDesktop = ["macos", "tdesktop", "unigram"].includes(
    retrieveLaunchParams().tgWebAppPlatform,
);
await viewport.mount();
initData.restore();
// viewport.expand();
if (isDesktop) {
    await viewport.requestFullscreen();
}

export default function App() {
    const [tgUser, setTgUser] = useState<User | undefined>(undefined);
    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: userDriver.getMe,
    });

    useEffect(() => {
        setTgUser(initData.user());
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <InfoAlert className="w-fit" message="Загрузка..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-screen flex items-center justify-center">
                <ErrorAlert className="w-fit" message="Ошибка загрузки" />
            </div>
        );
    }

    return (
        <TelegramUserContext.Provider value={tgUser}>
            <UserContext.Provider value={user}>
                <Routes>
                    <Route index element={<Participant />} />
                </Routes>
            </UserContext.Provider>
        </TelegramUserContext.Provider>
    );
}
