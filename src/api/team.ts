import ObjectID from "bson-objectid";
import type { ISearchable } from "./searchable";
import { ApiPaged } from "./generic";
import { axiosInstance } from "./axios";
import { ParseUser, type ParsedUser, type User } from "./user";

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

function parseTeam(team: Team) {
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

export interface TeamCreate {
  name: string;
}

class TeamsApi extends ApiPaged<Team, ParsedTeam, TeamCreate, TeamUpdate> {
  constructor() {
    super("teams", parseTeam);
  }

  public async getMembers(id: ObjectID): Promise<ParsedUser[]> {
    return (
      await axiosInstance.get<User[]>(`${this.withID(id)}/members`)
    ).data.map((v) => ParseUser(v));
  }
}

export const teamDriver = new TeamsApi();
