import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmprunt } from 'app/shared/model/library/emprunt.model';

@Component({
    selector: 'jhi-emprunt-detail',
    templateUrl: './emprunt-detail.component.html'
})
export class EmpruntDetailComponent implements OnInit {
    emprunt: IEmprunt;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ emprunt }) => {
            this.emprunt = emprunt.body ? emprunt.body : emprunt;
        });
    }

    previousState() {
        window.history.back();
    }
}
