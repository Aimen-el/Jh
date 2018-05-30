import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInfoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';

type EntityResponseType = HttpResponse<IInfoconsultant>;
type EntityArrayResponseType = HttpResponse<IInfoconsultant[]>;

@Injectable()
export class InfoconsultantService {
    private resourceUrl = SERVER_API_URL + 'infoconsultant/api/infoconsultants';

    constructor(private http: HttpClient) {}

    create(infoconsultant: IInfoconsultant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(infoconsultant);
        return this.http
            .post<IInfoconsultant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(infoconsultant: IInfoconsultant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(infoconsultant);
        return this.http
            .put<IInfoconsultant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInfoconsultant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInfoconsultant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(infoconsultant: IInfoconsultant): IInfoconsultant {
        const copy: IInfoconsultant = Object.assign({}, infoconsultant, {
            dateEntree: infoconsultant.dateEntree != null && infoconsultant.dateEntree.isValid() ? infoconsultant.dateEntree.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateEntree = res.body.dateEntree != null ? moment(res.body.dateEntree) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((infoconsultant: IInfoconsultant) => {
            infoconsultant.dateEntree = infoconsultant.dateEntree != null ? moment(infoconsultant.dateEntree) : null;
        });
        return res;
    }
}
