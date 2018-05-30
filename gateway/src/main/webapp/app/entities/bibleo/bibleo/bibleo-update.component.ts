import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';


import { IBibleo } from 'app/shared/model/bibleo/bibleo.model';
import { BibleoService } from './bibleo.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-bibleo-update',
    templateUrl: './bibleo-update.component.html'
})
export class BibleoUpdateComponent implements OnInit {
    private _bibleo: IBibleo;
    isSaving: boolean;
    
    users: IUser[];
    dateachatDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,    
    	private bibleoService: BibleoService, 
    	private userService: UserService,
    	private route: ActivatedRoute) {}
	
	ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ bibleo }) => {
            this.bibleo = bibleo.body ? bibleo.body : bibleo;
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
        if (this.bibleo.id !== undefined) {
            this.subscribeToSaveResponse(this.bibleoService.update(this.bibleo));
        } else {
            this.subscribeToSaveResponse(this.bibleoService.create(this.bibleo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBibleo>>) {
        result.subscribe((res: HttpResponse<IBibleo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    
    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    
    get bibleo() {
        return this._bibleo;
    }

    set bibleo(bibleo: IBibleo) {
        this._bibleo = bibleo;
    }
}
