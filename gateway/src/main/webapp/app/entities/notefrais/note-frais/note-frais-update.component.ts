import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiDataUtils } from 'ng-jhipster';

import { INoteFrais } from 'app/shared/model/notefrais/note-frais.model';
import { NoteFraisService } from './note-frais.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-note-frais-update',
    templateUrl: './note-frais-update.component.html'
})
export class NoteFraisUpdateComponent implements OnInit {
    private _noteFrais: INoteFrais;
    isSaving: boolean;
    users: IUser[];
    dateuploadDp: any;

    constructor(
    	private dataUtils: JhiDataUtils, 
    	private noteFraisService: NoteFraisService,
    	private userService: UserService, 
    	private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ noteFrais }) => {
            this.noteFrais = noteFrais.body ? noteFrais.body : noteFrais;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            }
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.noteFrais.id !== undefined) {
            this.subscribeToSaveResponse(this.noteFraisService.update(this.noteFrais));
        } else {
            this.subscribeToSaveResponse(this.noteFraisService.create(this.noteFrais));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INoteFrais>>) {
        result.subscribe((res: HttpResponse<INoteFrais>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get noteFrais() {
        return this._noteFrais;
    }

    set noteFrais(noteFrais: INoteFrais) {
        this._noteFrais = noteFrais;
    }
}
