export type columnName = 'id' | 'title' | 'body';
export type directionType = 'asc' | 'desc';

export interface sortInfoType {
    direction: directionType;
    column: columnName
}

export interface tableDataType {
    id: number;
    title: string;
    body: string;

}