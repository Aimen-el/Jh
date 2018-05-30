import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ICertifications } from 'app/shared/model/InfoConsultant/certifications.model';
import { CertificationsService } from './certifications.service';

@Component({
    selector: 'jhi-certifications-update',
    templateUrl: './certifications-update.component.html'
})
export class CertificationsUpdateComponent implements OnInit {
    private _certifications: ICertifications;
    isSaving: boolean;

    constructor(private certificationsService: CertificationsService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ certifications }) => {
            this.certifications = certifications.body ? certifications.body : certifications;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.certifications.id !== undefined) {
            this.subscribeToSaveResponse(this.certificationsService.update(this.certifications));
        } else {
            this.subscribeToSaveResponse(this.certificationsService.create(this.certifications));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICertifications>>) {
        result.subscribe((res: HttpResponse<ICertifications>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get certifications() {
        return this._certifications;
    }

    set certifications(certifications: ICertifications) {
        this._certifications = certifications;
    }
}
