import { Moment } from 'moment';
import { IMissions } from './missions.model';
import { ICertifications } from './certifications.model';

export interface IInfoconsultant {
    id?: number;
    dateEntree?: Moment;
    phone?: string;
    fonction?: string;
    numSecSoc?: string;
    missions?: IMissions;
    certifications?: ICertifications;
}

export class Infoconsultant implements IInfoconsultant {
    constructor(
        public id?: number,
        public dateEntree?: Moment,
        public phone?: string,
        public fonction?: string,
        public numSecSoc?: string,
        public missions?: IMissions,
        public certifications?: ICertifications
    ) {}
}
