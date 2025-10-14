import type ObjectID from "bson-objectid";
import { axiosInstance } from "./axios";

export interface Paged<T> {
  values: T[];
  count: number;
}

class Api<Normal, Parsed, CreateRequest, UpdateRequest> {
  protected route: string;
  protected routeFull: string;
  protected parserFunc: (normal: Normal) => Parsed;

  constructor(route: string, parserFunc: (normal: Normal) => Parsed) {
    this.route = `/api/${route}`;
    this.routeFull = `${route}/`;
    this.parserFunc = parserFunc;
  }

  public async getByID(id: ObjectID): Promise<Parsed> {
    return this.parserFunc(
      (await axiosInstance.get<Normal>(this.withID(id))).data,
    );
  }

  public async create(request: CreateRequest) {
    await axiosInstance.post(this.routeFull, request);
  }

  public async update(id: ObjectID, request: UpdateRequest) {
    await axiosInstance.patch(this.withID(id), request);
  }

  public async delete(id: ObjectID) {
    await axiosInstance.delete(this.withID(id));
  }

  protected withID(id: ObjectID): string {
    return `${this.route}/${id}`;
  }
}

export class ApiPaged<Normal, Parsed, CreateRequest, UpdateRequest> extends Api<
  Normal,
  Parsed,
  CreateRequest,
  UpdateRequest
> {
  constructor(route: string, parserFunc: (normal: Normal) => Parsed) {
    super(route, parserFunc);
  }

  public async findPaged(page: number, limit: number): Promise<Paged<Parsed>> {
    const data = (
      await axiosInstance.get<Paged<Normal>>(
        `${this.routeFull}?page=${page}&limit=${limit}`,
      )
    ).data;

    return {
      values: data.values.map((v) => this.parserFunc(v)),
      count: data.count,
    };
  }
}

export class ApiClassic<
  Normal,
  Parsed,
  CreateRequest,
  UpdateRequest,
> extends Api<Normal, Parsed, CreateRequest, UpdateRequest> {
  constructor(route: string, parserFunc: (normal: Normal) => Parsed) {
    super(route, parserFunc);
  }

  public async find(): Promise<Parsed[]> {
    return (await axiosInstance.get<Normal[]>(this.routeFull)).data.map((v) =>
      this.parserFunc(v),
    );
  }
}
