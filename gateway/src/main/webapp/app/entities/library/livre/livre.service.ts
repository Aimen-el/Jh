import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILivre } from 'app/shared/model/library/livre.model';

type EntityResponseType = HttpResponse<ILivre>;
type EntityArrayResponseType = HttpResponse<ILivre[]>;

@Injectable()
export class LivreService {
    private resourceUrl = SERVER_API_URL + 'library/api/livres';

    constructor(private http: HttpClient) {}

    create(livre: ILivre): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(livre);
        return this.http
            .post<ILivre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(livre: ILivre): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(livre);
        return this.http
            .put<ILivre>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILivre>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILivre[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(livre: ILivre): ILivre {
        const copy: ILivre = Object.assign({}, livre, {
            dateAchat: livre.dateAchat != null && livre.dateAchat.isValid() ? livre.dateAchat.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateAchat = res.body.dateAchat != null ? moment(res.body.dateAchat) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((livre: ILivre) => {
            livre.dateAchat = livre.dateAchat != null ? moment(livre.dateAchat) : null;
        });
        return res;
    }
}
