import ObjectsToCsv from 'objects-to-csv';
export class CsvService{
    async WriteCsvFile(records: any[], dataFolder: string, i: number){
        const csv = new ObjectsToCsv(records);
        // Save to file:
        let fileName = `${dataFolder}/data-${i}.csv`;
        await csv.toDisk(fileName);
        console.log(`${records.length} records written to ${fileName}`);
    }
}