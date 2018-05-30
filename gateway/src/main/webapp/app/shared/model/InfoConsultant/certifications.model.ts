export interface ICertifications {
    id?: number;
    certification?: string;
}

export class Certifications implements ICertifications {
    constructor(public id?: number, public certification?: string) {}
}
