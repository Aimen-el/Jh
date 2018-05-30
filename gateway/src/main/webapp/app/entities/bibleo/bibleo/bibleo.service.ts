import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBibleo } from 'app/shared/model/bibleo/bibleo.model';

type EntityResponseType = HttpResponse<IBibleo>;
type EntityArrayResponseType = HttpResponse<IBibleo[]>;

@Injectable()
export class BibleoService {
    private resourceUrl = SERVER_API_URL + 'bibleo/api/bibleos';

    constructor(private http: HttpClient) {}

    create(bibleo: IBibleo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bibleo);
        return this.http
            .post<IBibleo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(bibleo: IBibleo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bibleo);
        return this.http
            .put<IBibleo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBibleo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBibleo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(bibleo: IBibleo): IBibleo {
        const copy: IBibleo = Object.assign({}, bibleo, {
            dateachat: bibleo.dateachat != null && bibleo.dateachat.isValid() ? bibleo.dateachat.toJSON() : null
            dateEmprunt: bibleo.dateEmprunt != null && bibleo.dateEmprunt.isValid() ? bibleo.dateEmprunt.toJSON() : null
            dateRetour: bibleo.dateRetour != null && bibleo.dateRetour.isValid() ? bibleo.dateRetour.toJSON() : null            
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateachat = res.body.dateachat != null ? moment(res.body.dateachat) : null;
        res.body.dateEmprunt = res.body.dateEmprunt != null ? moment(res.body.dateEmprunt) : null;
        res.body.dateRetour = res.body.dateRetour != null ? moment(res.body.dateRetour) : null;
        
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((bibleo: IBibleo) => {
            bibleo.dateachat = bibleo.dateachat != null ? moment(bibleo.dateachat) : null;
            bibleo.dateEmprunt = bibleo.dateEmprunt != null ? moment(bibleo.dateEmprunt) : null;
            bibleo.dateRetour = bibleo.dateRetour != null ? moment(bibleo.dateRetour) : null;
        });
        return res;
    }
}
