import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { INoteFrais } from 'app/shared/model/notefrais/note-frais.model';

@Component({
    selector: 'jhi-note-frais-detail',
    templateUrl: './note-frais-detail.component.html'
})
export class NoteFraisDetailComponent implements OnInit {
    noteFrais: INoteFrais;

    constructor(private dataUtils: JhiDataUtils, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ noteFrais }) => {
            this.noteFrais = noteFrais.body ? noteFrais.body : noteFrais;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
