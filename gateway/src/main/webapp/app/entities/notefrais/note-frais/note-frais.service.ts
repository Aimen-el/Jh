import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INoteFrais } from 'app/shared/model/notefrais/note-frais.model';

type EntityResponseType = HttpResponse<INoteFrais>;
type EntityArrayResponseType = HttpResponse<INoteFrais[]>;

@Injectable()
export class NoteFraisService {
    private resourceUrl = SERVER_API_URL + 'notefrais/api/note-frais';

    constructor(private http: HttpClient) {}

    create(noteFrais: INoteFrais): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(noteFrais);
        return this.http
            .post<INoteFrais>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(noteFrais: INoteFrais): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(noteFrais);
        return this.http
            .put<INoteFrais>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INoteFrais>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INoteFrais[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(noteFrais: INoteFrais): INoteFrais {
        const copy: INoteFrais = Object.assign({}, noteFrais, {
            dateupload: noteFrais.dateupload != null && noteFrais.dateupload.isValid() ? noteFrais.dateupload.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateupload = res.body.dateupload != null ? moment(res.body.dateupload) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((noteFrais: INoteFrais) => {
            noteFrais.dateupload = noteFrais.dateupload != null ? moment(noteFrais.dateupload) : null;
        });
        return res;
    }
}
