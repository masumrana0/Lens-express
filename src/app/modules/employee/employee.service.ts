import { BaseService } from "@src/lib/core/baseService";
import EmployeeRepository from "./employee.repository";
import { employeeTable } from "./employee.schema";
import { injectable } from "tsyringe";

@injectable()
class EmployeeService extends BaseService<
  typeof employeeTable,
  EmployeeRepository
> {
  constructor(Repository: EmployeeRepository) {
    super(Repository);
  }
}

export default EmployeeService;
