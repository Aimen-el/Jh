import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICertifications } from 'app/shared/model/InfoConsultant/certifications.model';

type EntityResponseType = HttpResponse<ICertifications>;
type EntityArrayResponseType = HttpResponse<ICertifications[]>;

@Injectable()
export class CertificationsService {
    private resourceUrl = SERVER_API_URL + 'infoconsultant/api/certifications';

    constructor(private http: HttpClient) {}

    create(certifications: ICertifications): Observable<EntityResponseType> {
        return this.http.post<ICertifications>(this.resourceUrl, certifications, { observe: 'response' });
    }

    update(certifications: ICertifications): Observable<EntityResponseType> {
        return this.http.put<ICertifications>(this.resourceUrl, certifications, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICertifications>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICertifications[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
