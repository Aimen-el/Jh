import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';
import { Principal } from 'app/core';
import { InfoConsultantService } from './info-consultant.service';

@Component({
    selector: 'jhi-info-consultant',
    templateUrl: './info-consultant.component.html'
})
export class InfoConsultantComponent implements OnInit, OnDestroy {
    infoConsultants: IInfoConsultant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private infoConsultantService: InfoConsultantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.infoConsultantService.query().subscribe(
            (res: HttpResponse<IInfoConsultant[]>) => {
                this.infoConsultants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInfoConsultants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInfoConsultant) {
        return item.id;
    }

    registerChangeInInfoConsultants() {
        this.eventSubscriber = this.eventManager.subscribe('infoConsultantListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
