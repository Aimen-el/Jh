import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBibleo } from 'app/shared/model/bibleo/bibleo.model';

@Component({
    selector: 'jhi-bibleo-detail',
    templateUrl: './bibleo-detail.component.html'
})
export class BibleoDetailComponent implements OnInit {
    bibleo: IBibleo;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ bibleo }) => {
            this.bibleo = bibleo.body ? bibleo.body : bibleo;
        });
    }

    previousState() {
        window.history.back();
    }
}
