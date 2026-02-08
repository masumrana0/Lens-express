import { PgColumn } from "drizzle-orm/pg-core";
import { BaseRepository } from "./baseRepository";
import { FilterBuilder } from "./filterBuilder";
import { ITable } from "@src/interface/app.interface/databaseclient.interface";
import { IBaseService } from "@src/interface/app.interface/baseservice.interface";
import { SQLWrapper } from "drizzle-orm";
import {
  FindOptionsSQL,
  ID,
  OrderDirection,
} from "@src/interface/app.interface/baserepository.interface";

export abstract class BaseService<
  TTable extends ITable,
  TRepository extends BaseRepository<TTable> = BaseRepository<TTable>,
> implements IBaseService<TTable> {
  constructor(protected readonly repository: TRepository) {}

  async findAll(options?: FindOptionsSQL): Promise<TTable["$inferSelect"][]> {
    return this.catchError(async () => {
      const filter = options?.where
        ? FilterBuilder.build(options?.where as any)
        : undefined;

      const findOptions: FindOptionsSQL = {
        limit: options?.limit ?? 10,
        offset: options?.offset ?? 0,
        orderBy: this.transformOrderBy(options?.orderBy),
      };
      if (filter !== undefined) {
        findOptions.where = filter;
      }

      return await this.repository.findAll(findOptions);
    });
  }

  async findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null> {
    return this.catchError(async () => {
      const item = await this.repository.findOne(where);
      return item;
    });
  }

  async findById(id: ID): Promise<TTable["$inferSelect"]> {
    return this.catchError(async () => {
      const item = await this.repository.findById(id);
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    });
  }

  async findAndCount(
    options?: FindOptionsSQL,
  ): Promise<[TTable["$inferSelect"][], number]> {
    return this.catchError(async () => {
      const [items, count] = await this.repository.findAndCount(options);
      return [items, count];
    });
  }

  async count(where?: SQLWrapper): Promise<number> {
    return this.catchError(async () => {
      const count = await this.repository.count(where);
      return count;
    });
  }

  async create(data: TTable["$inferInsert"]) {
    return this.catchError(async () => {
      const item = await this.repository.create(data);
      return item;
    });
  }

  async createMany(
    data: TTable["$inferInsert"][],
  ): Promise<TTable["$inferSelect"][]> {
    return this.catchError(async () => {
      const items = await this.repository.createMany(data);
      return items;
    });
  }

  async update(id: ID, data: Partial<TTable["$inferInsert"]>) {
    return this.catchError(async () => {
      const item = await this.repository.update(id, data);
      if (!item) {
        throw new Error("Item not found");
      }

      return item;
    });
  }

  async updateMany(
    data: (Partial<TTable["$inferInsert"]> & { id: ID })[],
  ): Promise<TTable["$inferSelect"][]> {
    return this.catchError(async () => {
      const items = await this.repository.updateMany(data);
      return items;
    });
  }

  async delete(id: ID) {
    return this.catchError(async () => {
      await this.repository.delete(id);
    });
  }

  async deleteMany(ids: ID[]): Promise<void> {
    return this.catchError(async () => {
      await this.repository.deleteMany(ids);
    });
  }

  async checkExists(where: SQLWrapper) {
    return this.catchError(async () => {
      const result = await this.repository.checkExists(where);
      return result;
    });
  }

  async checkExistById(id: ID) {
    return this.catchError(async () => {
      const result = await this.repository.checkExistsById(id);
      return result;
    });
  }

  // Private method: complete later
  protected handleError(error: unknown): never {
    console.log("Error finding by id", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      typeof error === "string" ? error : "An unexpected error occurred",
    );
  }

  protected async catchError<T>(callback: () => Promise<T>) {
    try {
      return await callback();
    } catch (error) {
      this.handleError(error);
    }
  }

  protected transformOrderBy(orderBy: FindOptionsSQL["orderBy"]) {
    if (!orderBy) return undefined;
    const table = this.repository.getTable();

    return orderBy
      .filter(
        (order) => (order.column as unknown as keyof typeof table) in table,
      )
      .map((order) => ({
        column: table[
          order.column as unknown as keyof typeof table
        ] as PgColumn,
        direction: order.direction as OrderDirection,
      }));
  }
}
