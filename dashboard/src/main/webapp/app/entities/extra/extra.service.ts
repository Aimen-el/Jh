import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExtra } from '../../shared/model/extra.model';

type EntityResponseType = HttpResponse<IExtra>;
type EntityArrayResponseType = HttpResponse<IExtra[]>;

@Injectable()
export class ExtraService {
    private resourceUrl = SERVER_API_URL + 'api/extras';

    constructor(private http: HttpClient) {}

    create(extra: IExtra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(extra);
        return this.http
            .post<IExtra>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(extra: IExtra): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(extra);
        return this.http
            .put<IExtra>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExtra>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExtra[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(extra: IExtra): IExtra {
        const copy: IExtra = Object.assign({}, extra, {
            dateEntree: extra.dateEntree != null && extra.dateEntree.isValid() ? extra.dateEntree.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateEntree = res.body.dateEntree != null ? moment(res.body.dateEntree) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((extra: IExtra) => {
            extra.dateEntree = extra.dateEntree != null ? moment(extra.dateEntree) : null;
        });
        return res;
    }
}
