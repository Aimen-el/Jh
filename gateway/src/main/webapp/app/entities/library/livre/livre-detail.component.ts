import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILivre } from 'app/shared/model/library/livre.model';

@Component({
    selector: 'jhi-livre-detail',
    templateUrl: './livre-detail.component.html'
})
export class LivreDetailComponent implements OnInit {
    livre: ILivre;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ livre }) => {
            this.livre = livre.body ? livre.body : livre;
        });
    }

    previousState() {
        window.history.back();
    }
}
