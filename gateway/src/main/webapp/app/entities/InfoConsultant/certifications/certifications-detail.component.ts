import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICertifications } from 'app/shared/model/InfoConsultant/certifications.model';

@Component({
    selector: 'jhi-certifications-detail',
    templateUrl: './certifications-detail.component.html'
})
export class CertificationsDetailComponent implements OnInit {
    certifications: ICertifications;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ certifications }) => {
            this.certifications = certifications.body ? certifications.body : certifications;
        });
    }

    previousState() {
        window.history.back();
    }
}
