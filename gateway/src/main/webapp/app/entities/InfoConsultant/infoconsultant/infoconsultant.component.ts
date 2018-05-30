import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInfoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';
import { Principal } from 'app/core';
import { InfoconsultantService } from './infoconsultant.service';

@Component({
    selector: 'jhi-infoconsultant',
    templateUrl: './infoconsultant.component.html'
})
export class InfoconsultantComponent implements OnInit, OnDestroy {
    infoconsultants: IInfoconsultant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private infoconsultantService: InfoconsultantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.infoconsultantService.query().subscribe(
            (res: HttpResponse<IInfoconsultant[]>) => {
                this.infoconsultants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInfoconsultants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInfoconsultant) {
        return item.id;
    }

    registerChangeInInfoconsultants() {
        this.eventSubscriber = this.eventManager.subscribe('infoconsultantListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
