# Application Insights CSV Data Exporter 

App insights has a limitation of 10k records returned via the log UI. When dealing with larger datasets and not having a process in place to push the data downstream, we realized we needed a process to pull down data via the API and then pump it into a CSV so that we could run some local analysis on it.

# Azure App Insights Settings 
There are two settings required to connect to the App insights api
`AppId` and `AuthKey` Both can be found by going to the AI instance in portal

# Paging

We have a loop in place that will run the query output to a csv based on your loopback and timeIncrementType

```
| where timestamp >= ago({{start}})
| where timestamp <= ago({{end}})
```

# src/main.ts

```
new BulkDataExportService("{AppID}","{AuthKey}")
    .setQueryData("{KQL query}",{LookBack Increment}, {TimeIncrement})
    .getData()
      .then(result =>
              result.mergeResults());

```

This will output all data files to the `/data` folder and then merge all the files into a final `result.csv` file


## Look Back
This is how far you would like to look back, the service will pull data between the look back
and a decrement of 1

## TimeIncrementType enum
There are three lookback increment types
Days, Hours, Minutes

## Running the App

```
npm run start 
```