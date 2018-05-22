import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExtra } from '../../shared/model/extra.model';
import { Principal } from 'app/core';
import { ExtraService } from './extra.service';

@Component({
    selector: 'jhi-extra',
    templateUrl: './extra.component.html'
})
export class ExtraComponent implements OnInit, OnDestroy {
    extras: IExtra[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private extraService: ExtraService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.extraService.query().subscribe(
            (res: HttpResponse<IExtra[]>) => {
                this.extras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExtras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExtra) {
        return item.id;
    }

    registerChangeInExtras() {
        this.eventSubscriber = this.eventManager.subscribe('extraListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
