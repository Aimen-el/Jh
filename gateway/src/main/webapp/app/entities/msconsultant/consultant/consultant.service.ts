import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsultant } from 'app/shared/model/msconsultant/consultant.model';

type EntityResponseType = HttpResponse<IConsultant>;
type EntityArrayResponseType = HttpResponse<IConsultant[]>;

@Injectable()
export class ConsultantService {
    private resourceUrl = SERVER_API_URL + 'msconsultant/api/consultants';

    constructor(private http: HttpClient) {}

    create(consultant: IConsultant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consultant);
        return this.http
            .post<IConsultant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(consultant: IConsultant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consultant);
        return this.http
            .put<IConsultant>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConsultant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConsultant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(consultant: IConsultant): IConsultant {
        const copy: IConsultant = Object.assign({}, consultant, {
            dateEntree: consultant.dateEntree != null && consultant.dateEntree.isValid() ? consultant.dateEntree.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateEntree = res.body.dateEntree != null ? moment(res.body.dateEntree) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((consultant: IConsultant) => {
            consultant.dateEntree = consultant.dateEntree != null ? moment(consultant.dateEntree) : null;
        });
        return res;
    }
}
