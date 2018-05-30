import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';

@Component({
    selector: 'jhi-info-consultant-detail',
    templateUrl: './info-consultant-detail.component.html'
})
export class InfoConsultantDetailComponent implements OnInit {
    infoConsultant: IInfoConsultant;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ infoConsultant }) => {
            this.infoConsultant = infoConsultant.body ? infoConsultant.body : infoConsultant;
        });
    }

    previousState() {
        window.history.back();
    }
}
