import { Moment } from 'moment';

export interface ILivre {
    id?: number;
    titre?: string;
    auteur?: string;
    edition?: string;
    isbn?: string;
    disponibilite?: boolean;
    dateAchat?: Moment;
}

export class Livre implements ILivre {
    constructor(
        public id?: number,
        public titre?: string,
        public auteur?: string,
        public edition?: string,
        public isbn?: string,
        public disponibilite?: boolean,
        public dateAchat?: Moment
    ) {
        this.disponibilite = false;
    }
}
