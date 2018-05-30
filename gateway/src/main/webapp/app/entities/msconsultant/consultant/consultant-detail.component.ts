import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultant } from 'app/shared/model/msconsultant/consultant.model';

@Component({
    selector: 'jhi-consultant-detail',
    templateUrl: './consultant-detail.component.html'
})
export class ConsultantDetailComponent implements OnInit {
    consultant: IConsultant;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ consultant }) => {
            this.consultant = consultant.body ? consultant.body : consultant;
        });
    }

    previousState() {
        window.history.back();
    }
}
