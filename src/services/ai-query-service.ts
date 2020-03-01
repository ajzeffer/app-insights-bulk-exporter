import { AiQuery } from '../models/AiQuery';
import * as axios from "axios";
import { AiResult, Table } from '../models/AiData';
import { TimeIncrementType } from '../models/TimeIncrementType';


export class AiQueryService{
    restClient = axios.default;
    constructor(private appID, private authKey){ }
     buildQuery (query:string, start: string, end: string, type: TimeIncrementType):  AiQuery {
        query =  query.replace('{{start}}', `${start}${type.toString()}`)
        query =   query.replace('{{end}}', `${end}${type.toString()}`)
        return { 
            query:  query
        };
    }

    async GetAiData(aiQuery: AiQuery): Promise<Table>  {
        let json = await this.restClient.post(
            `https://api.applicationinsights.io/v1/apps/${this.appID}/query`,
            aiQuery,
            {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": this.authKey
              }
            }
          );
          let aiResult: AiResult = json.data;
          return aiResult.tables[0];  
    }
}
