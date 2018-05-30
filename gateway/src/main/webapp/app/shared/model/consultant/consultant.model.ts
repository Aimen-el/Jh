import { Moment } from 'moment';
import { IMission } from './mission.model';
import { ICertificat } from './certificat.model';

export interface IConsultant {
    id?: number;
    dateEntree?: Moment;
    telephone?: number;
    fonction?: string;
    numSecuriteSocial?: string;
    manyToOne?: IMission;
    many?: ICertificat;
}

export class Consultant implements IConsultant {
    constructor(
        public id?: number,
        public dateEntree?: Moment,
        public telephone?: number,
        public fonction?: string,
        public numSecuriteSocial?: string,
        public manyToOne?: IMission,
        public many?: ICertificat
    ) {}
}
