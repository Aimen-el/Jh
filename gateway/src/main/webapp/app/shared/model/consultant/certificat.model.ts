export interface ICertificat {
    id?: number;
    certification?: string;
}

export class Certificat implements ICertificat {
    constructor(public id?: number, public certification?: string) {}
}
