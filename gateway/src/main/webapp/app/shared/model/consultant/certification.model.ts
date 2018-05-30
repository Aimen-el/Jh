export interface ICertification {
    id?: number;
    certification?: string;
}

export class Certification implements ICertification {
    constructor(public id?: number, public certification?: string) {}
}
