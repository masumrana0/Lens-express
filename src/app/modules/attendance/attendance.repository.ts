import { BaseRepository } from "@src/lib/core/baseRepository";
import { attendanceTable } from "./attendance.schema";
import {
  DatabaseClientToken,
  type IDatabaseClient,
} from "@src/interface/app.interface/databaseclient.interface";
import { inject, injectable } from "tsyringe";

@injectable()
class AttendanceRepository extends BaseRepository<typeof attendanceTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, attendanceTable);
  }
}

export default AttendanceRepository;