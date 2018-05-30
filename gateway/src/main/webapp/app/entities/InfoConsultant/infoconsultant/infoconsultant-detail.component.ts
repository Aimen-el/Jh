import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInfoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';

@Component({
    selector: 'jhi-infoconsultant-detail',
    templateUrl: './infoconsultant-detail.component.html'
})
export class InfoconsultantDetailComponent implements OnInit {
    infoconsultant: IInfoconsultant;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ infoconsultant }) => {
            this.infoconsultant = infoconsultant.body ? infoconsultant.body : infoconsultant;
        });
    }

    previousState() {
        window.history.back();
    }
}
