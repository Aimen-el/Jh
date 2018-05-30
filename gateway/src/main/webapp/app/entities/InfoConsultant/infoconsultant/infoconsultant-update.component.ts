import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IInfoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';
import { InfoconsultantService } from './infoconsultant.service';
import { IMissions } from 'app/shared/model/InfoConsultant/missions.model';
import { MissionsService } from 'app/entities/InfoConsultant/missions';
import { ICertifications } from 'app/shared/model/InfoConsultant/certifications.model';
import { CertificationsService } from 'app/entities/InfoConsultant/certifications';

@Component({
    selector: 'jhi-infoconsultant-update',
    templateUrl: './infoconsultant-update.component.html'
})
export class InfoconsultantUpdateComponent implements OnInit {
    private _infoconsultant: IInfoconsultant;
    isSaving: boolean;

    missions: IMissions[];

    certifications: ICertifications[];
    dateEntreeDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private infoconsultantService: InfoconsultantService,
        private missionsService: MissionsService,
        private certificationsService: CertificationsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ infoconsultant }) => {
            this.infoconsultant = infoconsultant.body ? infoconsultant.body : infoconsultant;
        });
        this.missionsService.query().subscribe(
            (res: HttpResponse<IMissions[]>) => {
                this.missions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.certificationsService.query().subscribe(
            (res: HttpResponse<ICertifications[]>) => {
                this.certifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.infoconsultant.id !== undefined) {
            this.subscribeToSaveResponse(this.infoconsultantService.update(this.infoconsultant));
        } else {
            this.subscribeToSaveResponse(this.infoconsultantService.create(this.infoconsultant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInfoconsultant>>) {
        result.subscribe((res: HttpResponse<IInfoconsultant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMissionsById(index: number, item: IMissions) {
        return item.id;
    }

    trackCertificationsById(index: number, item: ICertifications) {
        return item.id;
    }
    get infoconsultant() {
        return this._infoconsultant;
    }

    set infoconsultant(infoconsultant: IInfoconsultant) {
        this._infoconsultant = infoconsultant;
    }
}
