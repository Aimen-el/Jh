import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsultant } from 'app/shared/model/msconsultant/consultant.model';
import { Principal } from 'app/core';
import { ConsultantService } from './consultant.service';

@Component({
    selector: 'jhi-consultant',
    templateUrl: './consultant.component.html'
})
export class ConsultantComponent implements OnInit, OnDestroy {
    consultants: IConsultant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private consultantService: ConsultantService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.consultantService.query().subscribe(
            (res: HttpResponse<IConsultant[]>) => {
                this.consultants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConsultants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConsultant) {
        return item.id;
    }

    registerChangeInConsultants() {
        this.eventSubscriber = this.eventManager.subscribe('consultantListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
