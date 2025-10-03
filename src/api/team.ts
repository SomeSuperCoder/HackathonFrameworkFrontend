import type ObjectID from "bson-objectid";
import { axiosInstance } from "./axios";
import type { ISearchable } from "./searchable";

export interface TeamsPaged {
    teams: Team[];
    count: number;
}

export interface Team extends ISearchable {
    leader: string;
    repos: string[];
    presentation_uri: string;
    grades: Map<string, Map<string, number>>;
}

export interface TeamParsed extends Omit<Team, "leader"> {
    leader: ObjectID;
}

export const teamDriver = {
    getTeams: async (page: number, limit: number): Promise<TeamsPaged> => {
        return (
            await axiosInstance.get(`/api/teams/?page=${page}&limit=${limit}`)
        ).data as TeamsPaged;
    },
    createTeam: async (name: string) => {
        await axiosInstance.post("/api/teams/", {
            name: name,
        });
    },
};
