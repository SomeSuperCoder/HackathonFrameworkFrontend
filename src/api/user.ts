import { axiosInstance } from "./axios";

export interface User {
    name: string;
    birthdate: string;
    role: number;
    username: string;
    chat_id: string;
    team: string;
}

export const userDriver = {
    getMe: async (): Promise<User> => {
        return (await axiosInstance.get<User>("/api/me")).data;
    },
};
