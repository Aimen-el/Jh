import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMissions } from 'app/shared/model/InfoConsultant/missions.model';

type EntityResponseType = HttpResponse<IMissions>;
type EntityArrayResponseType = HttpResponse<IMissions[]>;

@Injectable()
export class MissionsService {
    private resourceUrl = SERVER_API_URL + 'infoconsultant/api/missions';

    constructor(private http: HttpClient) {}

    create(missions: IMissions): Observable<EntityResponseType> {
        return this.http.post<IMissions>(this.resourceUrl, missions, { observe: 'response' });
    }

    update(missions: IMissions): Observable<EntityResponseType> {
        return this.http.put<IMissions>(this.resourceUrl, missions, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMissions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMissions[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
