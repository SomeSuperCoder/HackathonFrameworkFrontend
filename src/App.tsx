import { init, initData, viewport, type User } from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { TelegramUserContext, UserContext } from "./lib/context";
import { useQuery } from "@tanstack/react-query";
import { userDriver } from "./api/user";
import Participant from "./pages/Participant";

init();
await viewport.mount();
initData.restore();
// viewport.expand();
await viewport.requestFullscreen();

export default function App() {
    const [tgUser, setTgUser] = useState<User | undefined>(undefined);
    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: userDriver.getMe,
    });

    useEffect(() => {
        setTgUser(initData.user());
    }, []);

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
