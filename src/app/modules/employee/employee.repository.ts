import { BaseRepository } from "@src/lib/core/baseRepository";
import { employeeTable } from "./employee.schema";
import {
  DatabaseClientToken,
  type IDatabaseClient,
} from "@src/interface/app.interface/databaseclient.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class EmployeeRepository extends BaseRepository<typeof employeeTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, employeeTable);
  }
}

export default EmployeeRepository;
