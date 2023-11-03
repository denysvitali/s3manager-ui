export type Config = {
    endpoint: string;
}

export type Bucket = {
    name: string;
    creationDate: Date;
};

export type ListEntry = {
    isDir: boolean;
    name: string;
    size: number;
};