import { type ParsedUser } from "@/api/user";
import { type User as TelegramUser } from "@telegram-apps/sdk";
import { createContext } from "react";

export const UserContext = createContext<ParsedUser | undefined>(undefined);
export const TelegramUserContext = createContext<TelegramUser | undefined>(
    undefined,
);
