import { SQLWrapper } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { IBaseRepository } from "./baserepository.interface";

export interface IBaseService<
  TTable extends PgTable & { id: SQLWrapper },
  TRepository extends IBaseRepository<TTable>
> {
  // Queries
  findAll(
    options?: Parameters<TRepository["findAll"]>[0]
  ): Promise<ReturnType<TRepository["findAll"]>>;

  findById(
    id: Parameters<TRepository["findById"]>[0]
  ): Promise<ReturnType<TRepository["findById"]>>;
  findOne(
    where: Parameters<TRepository["findOne"]>[0]
  ): Promise<ReturnType<TRepository["findOne"]>>;
  findAndCount(
    options?: Parameters<TRepository["findAndCount"]>[0]
  ): Promise<ReturnType<TRepository["findAndCount"]>>;
  count(
    where?: Parameters<TRepository["count"]>[0]
  ): Promise<ReturnType<TRepository["count"]>>;
  checkExists(
    where: Parameters<TRepository["checkExists"]>[0]
  ): Promise<ReturnType<TRepository["checkExists"]>>;

  //   Mutations: Create
  create(
    data: Parameters<TRepository["create"]>[0]
  ): Promise<ReturnType<TRepository["create"]>>;
  createMany(
    data: Parameters<TRepository["createMany"]>[0]
  ): Promise<ReturnType<TRepository["createMany"]>>;

  //   Mutations: Update
  update(
    id: Parameters<TRepository["update"]>[0],
    data: Parameters<TRepository["update"]>[1]
  ): Promise<ReturnType<TRepository["update"]>>;
  updateMany(
    data: Parameters<TRepository["updateMany"]>[0]
  ): Promise<ReturnType<TRepository["updateMany"]>>;

  //   Mutations: Delete
  delete(
    id: Parameters<TRepository["delete"]>[0]
  ): Promise<ReturnType<TRepository["delete"]>>;
  deleteMany(
    ids: Parameters<TRepository["deleteMany"]>[0]
  ): Promise<ReturnType<TRepository["deleteMany"]>>;
}
