import { SQLWrapper } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { ITable } from "./databaseclient.interface";

export type ID = string | number;
export type OrderDirection = "asc" | "desc";

export type FindOptionsSQL = {
  where?: SQLWrapper | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  orderBy?:
    | {
        column: PgColumn;
        direction: OrderDirection;
      }[]
    | undefined;
};

export interface IBaseRepository<TTable extends ITable> {
  // Queries
  findAll(options?: FindOptionsSQL): Promise<TTable["$inferSelect"][]>;
  findById(id: ID): Promise<TTable["$inferSelect"] | null>;
  findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null>;
  findAndCount(
    options?: FindOptionsSQL,
  ): Promise<[TTable["$inferSelect"][], number]>;

  count(where?: SQLWrapper): Promise<number>;
  checkExists(where: SQLWrapper): Promise<boolean>;

  // Mutations: Create
  create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]>;
  createMany(data: TTable["$inferInsert"][]): Promise<TTable["$inferSelect"][]>;

  // Mutations: Update
  update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>,
  ): Promise<TTable["$inferSelect"] | null>;
  updateMany(
    data: (Partial<TTable["$inferInsert"]> & { id: ID })[],
  ): Promise<TTable["$inferSelect"][]>;

  // Mutations: Delete
  delete(id: ID): Promise<void>;
  deleteMany(ids: ID[]): Promise<void>;
}
