import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IMissions } from 'app/shared/model/InfoConsultant/missions.model';
import { MissionsService } from './missions.service';

@Component({
    selector: 'jhi-missions-update',
    templateUrl: './missions-update.component.html'
})
export class MissionsUpdateComponent implements OnInit {
    private _missions: IMissions;
    isSaving: boolean;

    constructor(private missionsService: MissionsService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ missions }) => {
            this.missions = missions.body ? missions.body : missions;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.missions.id !== undefined) {
            this.subscribeToSaveResponse(this.missionsService.update(this.missions));
        } else {
            this.subscribeToSaveResponse(this.missionsService.create(this.missions));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMissions>>) {
        result.subscribe((res: HttpResponse<IMissions>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get missions() {
        return this._missions;
    }

    set missions(missions: IMissions) {
        this._missions = missions;
    }
}
