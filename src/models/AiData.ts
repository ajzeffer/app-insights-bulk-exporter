export interface AiDataStructure{
    rows: []
}
export interface AiResult {
    tables: Table[];
}

export interface Column {
    name: string;
    type: string;
}

export interface Table {
    name: string;
    columns: Column[];
    rows: any[][];
}