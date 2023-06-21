export class DataTableHeader {
    key: string = "";
    title: string = "";
    value?: any;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end' | 'center';
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: any;
    constructor(key: string, title: string, value: (item: any) => any) {
        this.key = key;
        this.title = title;
        this.value = value;
    }
};