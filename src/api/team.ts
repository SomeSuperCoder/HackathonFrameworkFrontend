import ObjectID from "bson-objectid";
import { axiosInstance } from "./axios";
import type { ISearchable } from "./searchable";
import type { User } from "./user";

export interface TeamsPaged {
    teams: Team[];
    count: number;
}

export interface ParsedTeamsPaged {
    teams: ParsedTeam[];
    count: number;
}

export function ParseTeamsPaged(teamsPaged: TeamsPaged) {
    return {
        teams: teamsPaged.teams.map((team) => ParseTeam(team)),
        count: teamsPaged.count,
    } as ParsedTeamsPaged;
}

export interface Team extends ISearchable {
    _id: string;
    leader: string;
    repos: string[];
    presentation_uri: string;
    grades: Map<string, Map<string, number>>;
}

export interface ParsedTeam extends Omit<Team, "_id" | "leader"> {
    _id: ObjectID;
    leader: ObjectID;
}

export function ParseTeam(team: Team) {
    return {
        ...team,
        _id: ObjectID(team._id),
        leader: ObjectID(team.leader),
    } as ParsedTeam;
}

export interface TeamUpdate {
    name?: string;
    repos?: string[];
    presentation_uri?: string;
}

export const teamDriver = {
    getTeams: async (
        page: number,
        limit: number,
    ): Promise<ParsedTeamsPaged> => {
        return ParseTeamsPaged(
            (
                await axiosInstance.get<TeamsPaged>(
                    `/api/teams/?page=${page}&limit=${limit}`,
                )
            ).data,
        );
    },
    getTeamByID: async (id: ObjectID): Promise<Team> => {
        return (await axiosInstance.get(`/api/teams/${id}`)).data as Team;
    },
    getTeamMembers: async (id: ObjectID): Promise<User[]> => {
        return (await axiosInstance.get(`/api/teams/${id}/members`))
            .data as User[];
    },
    createTeam: async (name: string) => {
        await axiosInstance.post("/api/teams/", {
            name: name,
        });
    },
    updateTeam: async (id: ObjectID, update: TeamUpdate) => {
        await axiosInstance.patch(`/api/teams/${id}`, update);
    },
    deleteTeam: async (id: ObjectID) => {
        await axiosInstance.delete(`/api/teams/${id}`);
    },
};
