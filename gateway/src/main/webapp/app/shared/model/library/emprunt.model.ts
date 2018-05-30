import { Moment } from 'moment';
import { ILivre } from './livre.model';

export interface IEmprunt {
    id?: number;
    dateEmprunt?: Moment;
    dateRetour?: Moment;
    livre?: ILivre;
}

export class Emprunt implements IEmprunt {
    constructor(public id?: number, public dateEmprunt?: Moment, public dateRetour?: Moment, public livre?: ILivre) {}
}
