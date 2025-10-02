import { type User } from "@/api/user";
import { type User as TelegramUser } from "@telegram-apps/sdk";
import { createContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);
export const TelegramUserContext = createContext<TelegramUser | undefined>(
    undefined,
);
