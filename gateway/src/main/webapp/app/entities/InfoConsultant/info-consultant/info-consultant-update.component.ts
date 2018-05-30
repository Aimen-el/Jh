import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IInfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';
import { InfoConsultantService } from './info-consultant.service';
import { IMissions } from 'app/shared/model/InfoConsultant/missions.model';
import { MissionsService } from 'app/entities/InfoConsultant/missions';
import { ICertifications } from 'app/shared/model/InfoConsultant/certifications.model';
import { CertificationsService } from 'app/entities/InfoConsultant/certifications';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-info-consultant-update',
    templateUrl: './info-consultant-update.component.html'
})
export class InfoConsultantUpdateComponent implements OnInit {
    private _infoConsultant: IInfoConsultant;
    isSaving: boolean;
    users: IUser[];    

    missions: IMissions[];

    certifications: ICertifications[];
    dateEntreeDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private infoConsultantService: InfoConsultantService,
        private missionsService: MissionsService,
        private certificationsService: CertificationsService,
        private userService: UserService,         
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ infoConsultant }) => {
            this.infoConsultant = infoConsultant.body ? infoConsultant.body : infoConsultant;
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
        this.userService.query().subscribe(
           (res: HttpResponse<IUser[]>) => {
               this.users = res.body;
           }
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.infoConsultant.id !== undefined) {
            this.subscribeToSaveResponse(this.infoConsultantService.update(this.infoConsultant));
        } else {
            this.subscribeToSaveResponse(this.infoConsultantService.create(this.infoConsultant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInfoConsultant>>) {
        result.subscribe((res: HttpResponse<IInfoConsultant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get infoConsultant() {
        return this._infoConsultant;
    }

    set infoConsultant(infoConsultant: IInfoConsultant) {
        this._infoConsultant = infoConsultant;
    }
}
