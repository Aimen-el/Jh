import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBibleo } from 'app/shared/model/bibleo/bibleo.model';
import { Principal } from 'app/core';
import { BibleoService } from './bibleo.service';

@Component({
    selector: 'jhi-bibleo',
    templateUrl: './bibleo.component.html'
})
export class BibleoComponent implements OnInit, OnDestroy {
    bibleos: IBibleo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bibleoService: BibleoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.bibleoService.query().subscribe(
            (res: HttpResponse<IBibleo[]>) => {
                this.bibleos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBibleos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBibleo) {
        return item.id;
    }

    registerChangeInBibleos() {
        this.eventSubscriber = this.eventManager.subscribe('bibleoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
