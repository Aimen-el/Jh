import { Moment } from 'moment';

export interface INoteFrais {
    id?: number;
    name?: string;
    dateupload?: Moment;
    etat?: boolean;
    motif?: string;
    fichierContentType?: string;
    fichier?: any;
}

export class NoteFrais implements INoteFrais {
    constructor(
        public id?: number,
        public name?: string,
        public dateupload?: Moment,
        public etat?: boolean,
        public motif?: string,
        public fichierContentType?: string,
        public fichier?: any
    ) {
        this.etat = false;
    }
}
