import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { IEmprunt } from 'app/shared/model/library/emprunt.model';
import { EmpruntService } from './emprunt.service';
import { ILivre } from 'app/shared/model/library/livre.model';
import { LivreService } from 'app/entities/library/livre';
import { IUser, UserService } from 'app/core';


@Component({
    selector: 'jhi-emprunt-update',
    templateUrl: './emprunt-update.component.html'
})
export class EmpruntUpdateComponent implements OnInit {
    private _emprunt: IEmprunt;
    isSaving: boolean;
	users: IUser[];
    livres: ILivre[];
    dateEmpruntDp: any;
    dateRetourDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private empruntService: EmpruntService,
        private livreService: LivreService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ emprunt }) => {
            this.emprunt = emprunt.body ? emprunt.body : emprunt;
        });
        this.livreService.query().subscribe(
            (res: HttpResponse<ILivre[]>) => {
                this.livres = res.body;
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
        if (this.emprunt.id !== undefined) {
            this.subscribeToSaveResponse(this.empruntService.update(this.emprunt));
        } else {
            this.subscribeToSaveResponse(this.empruntService.create(this.emprunt));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmprunt>>) {
        result.subscribe((res: HttpResponse<IEmprunt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLivreById(index: number, item: ILivre) {
        return item.id;
    }
    get emprunt() {
        return this._emprunt;
    }

    set emprunt(emprunt: IEmprunt) {
        this._emprunt = emprunt;
    }
}
