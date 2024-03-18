// Generated by Xata Codegen 0.29.2. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "tasks",
    columns: [
      { name: "name", type: "string", unique: true },
      { name: "completed", type: "bool", notNull: true, defaultValue: "false" },
      { name: "userId", type: "string", notNull: true, defaultValue: "null" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Tasks = InferredTypes["tasks"];
export type TasksRecord = Tasks & XataRecord;

export type DatabaseSchema = {
  tasks: TasksRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Josh-Maguire-s-workspace-fiueoq.eu-west-1.xata.sh/db/my-tasks-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
