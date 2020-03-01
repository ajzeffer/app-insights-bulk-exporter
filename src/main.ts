import { BulkDataExportService } from './services/bulk-data-service';
import { TimeIncrementType } from './models/TimeIncrementType';

new BulkDataExportService("","")
    .setQueryData("customEvents | where timestamp >= ago({{start}}) | where timestamp <= ago({{end}}) ",30, TimeIncrementType.Hour)
    .getData()
      .then(result => 
              result.mergeResults());
 