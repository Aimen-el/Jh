export interface IMissions {
    id?: number;
    client?: string;
    projet?: string;
}

export class Missions implements IMissions {
    constructor(public id?: number, public client?: string, public projet?: string) {}
}
