import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { INoteFrais } from 'app/shared/model/notefrais/note-frais.model';
import { Principal } from 'app/core';
import { NoteFraisService } from './note-frais.service';

@Component({
    selector: 'jhi-note-frais',
    templateUrl: './note-frais.component.html'
})
export class NoteFraisComponent implements OnInit, OnDestroy {
    noteFrais: INoteFrais[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private noteFraisService: NoteFraisService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.noteFraisService.query().subscribe(
            (res: HttpResponse<INoteFrais[]>) => {
                this.noteFrais = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNoteFrais();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INoteFrais) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInNoteFrais() {
        this.eventSubscriber = this.eventManager.subscribe('noteFraisListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
