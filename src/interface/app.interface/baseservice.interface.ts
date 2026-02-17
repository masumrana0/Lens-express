import { SQLWrapper } from "drizzle-orm";
import { FindOptionsSQL, ID } from "./baserepository.interface";
import { ITable } from "./databaseclient.interface";

export interface IBaseService<TTable extends ITable> {
  findAll(options?: FindOptionsSQL): Promise<{
    data: TTable["$inferSelect"][];
    meta?: FindOptionsSQL & { total: number };
  }>;
  findById(id: ID): Promise<TTable["$inferSelect"] | null>;
  findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null>;
  findAndCount(
    options?: FindOptionsSQL,
  ): Promise<[TTable["$inferSelect"][], number]>;
  count(where?: SQLWrapper): Promise<number>;
  checkExists(where: SQLWrapper): Promise<boolean>;

  create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]>;
  createMany(data: TTable["$inferInsert"][]): Promise<TTable["$inferSelect"][]>;

  update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>,
  ): Promise<TTable["$inferSelect"] | null>;

  updateMany(
    data: (Partial<TTable["$inferInsert"]> & { id: ID })[],
  ): Promise<TTable["$inferSelect"][]>;

  delete(id: ID): Promise<void>;
  deleteMany(ids: ID[]): Promise<void>;
}
