import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmprunt } from 'app/shared/model/library/emprunt.model';
import { Principal } from 'app/core';
import { EmpruntService } from './emprunt.service';

@Component({
    selector: 'jhi-emprunt',
    templateUrl: './emprunt.component.html'
})
export class EmpruntComponent implements OnInit, OnDestroy {
    emprunts: IEmprunt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private empruntService: EmpruntService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.empruntService.query().subscribe(
            (res: HttpResponse<IEmprunt[]>) => {
                this.emprunts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmprunts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmprunt) {
        return item.id;
    }

    registerChangeInEmprunts() {
        this.eventSubscriber = this.eventManager.subscribe('empruntListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
