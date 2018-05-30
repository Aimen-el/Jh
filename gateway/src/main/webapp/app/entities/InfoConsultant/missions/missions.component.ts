import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMissions } from 'app/shared/model/InfoConsultant/missions.model';
import { Principal } from 'app/core';
import { MissionsService } from './missions.service';

@Component({
    selector: 'jhi-missions',
    templateUrl: './missions.component.html'
})
export class MissionsComponent implements OnInit, OnDestroy {
    missions: IMissions[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private missionsService: MissionsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.missionsService.query().subscribe(
            (res: HttpResponse<IMissions[]>) => {
                this.missions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMissions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMissions) {
        return item.id;
    }

    registerChangeInMissions() {
        this.eventSubscriber = this.eventManager.subscribe('missionsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
