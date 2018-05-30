import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMissions } from 'app/shared/model/InfoConsultant/missions.model';

@Component({
    selector: 'jhi-missions-detail',
    templateUrl: './missions-detail.component.html'
})
export class MissionsDetailComponent implements OnInit {
    missions: IMissions;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ missions }) => {
            this.missions = missions.body ? missions.body : missions;
        });
    }

    previousState() {
        window.history.back();
    }
}
