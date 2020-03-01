import fs from "fs";
import mergeFiles from 'merge-files';
const path = require('path');

export class MergeService{
    async  mergeDataFiles() {
        let files = fs.readdirSync(`../data`);
        let dataPath = path.join(__dirname,`../../data/`);
        let filesWithPath: string[] = files.map(file =>{
            return path.join(dataPath,file);
        } );
        console.log(filesWithPath);
        const status = await mergeFiles(filesWithPath, path.join(dataPath,'result.csv'));
    }
}
 
 