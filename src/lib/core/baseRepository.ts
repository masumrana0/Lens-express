import { FindOptionsSQL, IBaseRepository } from "@src/interface/baserepository.interface";
import { SQLWrapper } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

 class BaseRepository<TTable extends PgTable & { id: SQLWrapper }>  implements IBaseRepository<TTable> {

        // findAll(options?: FindOptionsSQL): Promise<TTable["$inferSelect"][]> {
            
        // }

 }





 export default BaseRepository;