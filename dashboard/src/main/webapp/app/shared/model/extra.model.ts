import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IExtra {
    id?: number;
    dateEntree?: Moment;
    telephone?: string;
    congePaye?: number;
    mission?: string;
    fonction?: string;
    user?: IUser;
}

export class Extra implements IExtra {
    constructor(
        public id?: number,
        public dateEntree?: Moment,
        public telephone?: string,
        public congePaye?: number,
        public mission?: string,
        public fonction?: string,
        public user?: IUser
    ) {}
}
