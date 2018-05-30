export interface IMission {
    id?: number;
    client?: string;
    projet?: string;
}

export class Mission implements IMission {
    constructor(public id?: number, public client?: string, public projet?: string) {}
}
