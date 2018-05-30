import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';

type EntityResponseType = HttpResponse<IInfoConsultant>;
type EntityArrayResponseType = HttpResponse<IInfoConsultant[]>;

@Injectable()
export class InfoConsultantService {
    private resourceUrl = SERVER_API_URL + 'infoconsultant/api/info-consultants';

    constructor(private http: HttpClient) {}

    create(infoConsultant: IInfoConsultant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(infoConsultant);
        return this.http
            .post<IInfoConsultant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(infoConsultant: IInfoConsultant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(infoConsultant);
        return this.http
            .put<IInfoConsultant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInfoConsultant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInfoConsultant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(infoConsultant: IInfoConsultant): IInfoConsultant {
        const copy: IInfoConsultant = Object.assign({}, infoConsultant, {
            dateEntree: infoConsultant.dateEntree != null && infoConsultant.dateEntree.isValid() ? infoConsultant.dateEntree.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateEntree = res.body.dateEntree != null ? moment(res.body.dateEntree) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((infoConsultant: IInfoConsultant) => {
            infoConsultant.dateEntree = infoConsultant.dateEntree != null ? moment(infoConsultant.dateEntree) : null;
        });
        return res;
    }
}
