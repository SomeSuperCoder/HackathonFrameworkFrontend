import { axiosInstance } from "./axios";

export interface TeamsPaged {
    teams: Team[];
    count: number;
}

export interface Team {
    name: string;
    leader: string;
    repos: string[];
    presentation_uri: string;
    grades: Map<string, Map<string, number>>;
}

export const teamDriver = {
    getTeams: async (page: number, limit: number): Promise<TeamsPaged> => {
        return (
            await axiosInstance.get(`/api/teams/?page=${page}&limit=${limit}`)
        ).data as TeamsPaged;
    },
};
