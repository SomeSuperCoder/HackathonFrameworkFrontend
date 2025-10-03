import ObjectID from "bson-objectid";
import { axiosInstance } from "./axios";

export interface User {
    _id: string;
    name: string;
    birthdate: string;
    role: number;
    username: string;
    chat_id: string;
    team: string;
}

export interface ParsedUser extends Omit<User, "_id" | "team" | "birthdate"> {
    _id: ObjectID;
    team: ObjectID;
    birthdate: Date;
}

function ParseUser(user: User) {
    return {
        ...user,
        _id: ObjectID(user._id),
        team: ObjectID(user.team),
        birthdate: new Date(user.birthdate),
    } as ParsedUser;
}

export const userDriver = {
    getMe: async (): Promise<ParsedUser> => {
        return ParseUser((await axiosInstance.get<User>("/api/me")).data);
    },
};
