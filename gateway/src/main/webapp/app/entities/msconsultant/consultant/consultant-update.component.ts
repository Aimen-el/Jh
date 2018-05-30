import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';


import { IConsultant } from 'app/shared/model/msconsultant/consultant.model';
import { ConsultantService } from './consultant.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-consultant-update',
    templateUrl: './consultant-update.component.html'
})
export class ConsultantUpdateComponent implements OnInit {
    private _consultant: IConsultant;
    isSaving: boolean;
    
    users: IUser[];    
    dateEntreeDp: any;

    constructor(
        private jhiAlertService: JhiAlertService, 
        private consultantService: ConsultantService, 
        private userService: UserService, 
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ consultant }) => {
            this.consultant = consultant.body ? consultant.body : consultant;
        });
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
        if (this.consultant.id !== undefined) {
            this.subscribeToSaveResponse(this.consultantService.update(this.consultant));
        } else {
            this.subscribeToSaveResponse(this.consultantService.create(this.consultant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsultant>>) {
        result.subscribe((res: HttpResponse<IConsultant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get consultant() {
        return this._consultant;
    }

    set consultant(consultant: IConsultant) {
        this._consultant = consultant;
    }
}
