# Application Insights Bulk Data Exporter 

```
new BulkDataExportService("{AppID}","{AuthKey}")
    .setQueryData("{KQL query}",{LookBack Increment}, {TimeIncrement})
    .getData()
      .then(result =>
              result.mergeResults());

```


## Azure App Insights Settings 
There are two settings required to connect to the App insights api
`AppId` and `AuthKey` Both can be found by going to the AI instance in portal

## Look Back
This is how far you would like to look back, the service will pull data between the look back
and a decrement of 1

## TimeIncrementType enum
There are three lookback increment types
Days, Hours, Minutes