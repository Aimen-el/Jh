import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IExtra } from '../../shared/model/extra.model';
import { ExtraService } from './extra.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-extra-update',
    templateUrl: './extra-update.component.html'
})
export class ExtraUpdateComponent implements OnInit {
    private _extra: IExtra;
    isSaving: boolean;

    users: IUser[];
    dateEntreeDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private extraService: ExtraService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ extra }) => {
            this.extra = extra.body ? extra.body : extra;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.extra.id !== undefined) {
            this.subscribeToSaveResponse(this.extraService.update(this.extra));
        } else {
            this.subscribeToSaveResponse(this.extraService.create(this.extra));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IExtra>>) {
        result.subscribe((res: HttpResponse<IExtra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get extra() {
        return this._extra;
    }

    set extra(extra: IExtra) {
        this._extra = extra;
    }
}
