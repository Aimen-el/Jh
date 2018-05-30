import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ILivre } from 'app/shared/model/library/livre.model';
import { LivreService } from './livre.service';

@Component({
    selector: 'jhi-livre-update',
    templateUrl: './livre-update.component.html'
})
export class LivreUpdateComponent implements OnInit {
    private _livre: ILivre;
    isSaving: boolean;
    dateAchatDp: any;

    constructor(private livreService: LivreService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ livre }) => {
            this.livre = livre.body ? livre.body : livre;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.livre.id !== undefined) {
            this.subscribeToSaveResponse(this.livreService.update(this.livre));
        } else {
            this.subscribeToSaveResponse(this.livreService.create(this.livre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILivre>>) {
        result.subscribe((res: HttpResponse<ILivre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get livre() {
        return this._livre;
    }

    set livre(livre: ILivre) {
        this._livre = livre;
    }
}
