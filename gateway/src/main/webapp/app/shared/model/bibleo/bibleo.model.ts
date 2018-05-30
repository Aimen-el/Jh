import { Moment } from 'moment';

export interface IBibleo {
    id?: number;
    titre?: string;
    auteur?: string;
    edition?: string;
    isbn?: string;
    dateachat?: Moment;
    diponbilite?: boolean;
    dateEmprunt?: Moment;
    emprunteur?: string;
    dateRetour?: Moment;
    
}

export class Bibleo implements IBibleo {
    constructor(
        public id?: number,
        public titre?: string,
        public auteur?: string,
        public edition?: string,
        public isbn?: string,
        public dateachat?: Moment,
        public diponibilite?: boolean
        public dateEmprunt?: Moment,        
        public emprunteur?: string,
        public dateRetour?: Moment,
    ) {
        this.diponibilite = false;
    }
}
