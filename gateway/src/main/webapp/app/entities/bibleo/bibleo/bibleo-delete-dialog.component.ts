import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBibleo } from 'app/shared/model/bibleo/bibleo.model';
import { BibleoService } from './bibleo.service';

@Component({
    selector: 'jhi-bibleo-delete-dialog',
    templateUrl: './bibleo-delete-dialog.component.html'
})
export class BibleoDeleteDialogComponent {
    bibleo: IBibleo;

    constructor(private bibleoService: BibleoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bibleoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bibleoListModification',
                content: 'Deleted an bibleo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bibleo-delete-popup',
    template: ''
})
export class BibleoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ bibleo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BibleoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.bibleo = bibleo.body;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
