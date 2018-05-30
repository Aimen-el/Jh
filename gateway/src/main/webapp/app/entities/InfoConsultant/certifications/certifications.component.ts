import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICertifications } from 'app/shared/model/InfoConsultant/certifications.model';
import { Principal } from 'app/core';
import { CertificationsService } from './certifications.service';

@Component({
    selector: 'jhi-certifications',
    templateUrl: './certifications.component.html'
})
export class CertificationsComponent implements OnInit, OnDestroy {
    certifications: ICertifications[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private certificationsService: CertificationsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.certificationsService.query().subscribe(
            (res: HttpResponse<ICertifications[]>) => {
                this.certifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCertifications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICertifications) {
        return item.id;
    }

    registerChangeInCertifications() {
        this.eventSubscriber = this.eventManager.subscribe('certificationsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
