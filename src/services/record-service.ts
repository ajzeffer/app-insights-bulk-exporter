import { Table } from "../models/AiData";

export class RecordService{
    buildRecords(table: Table) : any[]{
       return table.rows.map((row: string[]) => {
            let columns = table.columns;
            let data: any = {};
            columns.forEach(prop =>
              Object.defineProperty(data, prop.name, {
                value: "",
                writable: true,
                enumerable: true,
                configurable: true
              })
            );
            for (let i = 0; i < columns.length; i++) {
              data[columns[i].name] = row[i];
            }
            return data;
          });
    }
}