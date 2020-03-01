
import { AiQueryService } from './ai-query-service';
import { CsvService} from './csv-service';
import { MergeService } from './merge-data-service';
import { RecordService} from './record-service';

import { Table } from '../models/AiData';
import { TimeIncrementType } from '../models/TimeIncrementType';

export class BulkDataExportService{
    
    private dataFolder = '../data/';
    private  _aiService: AiQueryService;
    private _mergeService = new MergeService();
    private _recordService = new RecordService();
    private _csvService = new CsvService();
    private _rawQuery: string = ""; 
    private _lookback: number = 0;

    private _timeIncrement: TimeIncrementType = TimeIncrementType.Day;
    constructor(private appId: string, private apiKey: string){
        this._aiService = new AiQueryService("449aba09-8a0b-4a67-a75c-78203bf9f598", "au3qwguz2an6c3ie6yphbss1y7bdn7z7hy5v55am");
    }
    
    setQueryData( rawQuery: string, lookback: number, timeIncrement: TimeIncrementType){
        this._rawQuery = rawQuery;
        this._lookback = lookback;
        this._timeIncrement = timeIncrement;
        return this;
    }
    
    async getData() : Promise<BulkDataExportService>{
        for (let i = this._lookback; i >= 0; i--) {
            let start = i;
            let end = i - 1;
            let query = this._rawQuery; 
            let aiQuery = this._aiService.buildQuery(query , start.toString(), end.toString(), this._timeIncrement);
            console.log(`Retrieving Records > between ${start}${this._timeIncrement} & ${end}${this._timeIncrement} ago`);
            let table: Table  = await this._aiService.GetAiData(aiQuery);
            let records = this._recordService.buildRecords(table);
            await this._csvService.WriteCsvFile(records, this.dataFolder,i);
          }
          return this;
    }
    mergeResults(){
        this._mergeService.mergeDataFiles();
    }
}

