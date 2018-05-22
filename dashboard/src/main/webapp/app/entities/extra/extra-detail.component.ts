import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExtra } from '../../shared/model/extra.model';

@Component({
    selector: 'jhi-extra-detail',
    templateUrl: './extra-detail.component.html'
})
export class ExtraDetailComponent implements OnInit {
    extra: IExtra;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ extra }) => {
            this.extra = extra.body ? extra.body : extra;
        });
    }

    previousState() {
        window.history.back();
    }
}
