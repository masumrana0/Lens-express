import { BaseService } from "@src/lib/core/baseService";
import { attendanceTable } from "./attendance.schema";
import AttendanceRepository from "./attendance.repository";
import { injectable } from "tsyringe";

@injectable()
class AttendanceService extends BaseService<
  typeof attendanceTable,
  AttendanceRepository
> {
  constructor(readonly Repository: AttendanceRepository) {
    super(Repository);
  }
}

export default AttendanceService;
