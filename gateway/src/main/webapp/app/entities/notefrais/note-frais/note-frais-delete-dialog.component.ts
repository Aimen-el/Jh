import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INoteFrais } from 'app/shared/model/notefrais/note-frais.model';
import { NoteFraisService } from './note-frais.service';

@Component({
    selector: 'jhi-note-frais-delete-dialog',
    templateUrl: './note-frais-delete-dialog.component.html'
})
export class NoteFraisDeleteDialogComponent {
    noteFrais: INoteFrais;

    constructor(private noteFraisService: NoteFraisService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.noteFraisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'noteFraisListModification',
                content: 'Deleted an noteFrais'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-note-frais-delete-popup',
    template: ''
})
export class NoteFraisDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ noteFrais }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NoteFraisDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.noteFrais = noteFrais.body;
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
