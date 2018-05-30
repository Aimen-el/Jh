import { Moment } from 'moment';

export interface IConsultant {
    id?: number;
    dateEntree?: Moment;
    telephone?: string;
    congePaye?: number;
    mission?: string;
    fonction?: string;
}

export class Consultant implements IConsultant {
    constructor(
        public id?: number,
        public dateEntree?: Moment,
        public telephone?: string,
        public congePaye?: number,
        public mission?: string,
        public fonction?: string
    ) {}
}
