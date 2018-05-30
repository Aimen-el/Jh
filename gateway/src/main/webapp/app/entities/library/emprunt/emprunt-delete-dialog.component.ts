import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmprunt } from 'app/shared/model/library/emprunt.model';
import { EmpruntService } from './emprunt.service';

@Component({
    selector: 'jhi-emprunt-delete-dialog',
    templateUrl: './emprunt-delete-dialog.component.html'
})
export class EmpruntDeleteDialogComponent {
    emprunt: IEmprunt;

    constructor(private empruntService: EmpruntService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.empruntService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'empruntListModification',
                content: 'Deleted an emprunt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-emprunt-delete-popup',
    template: ''
})
export class EmpruntDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ emprunt }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmpruntDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.emprunt = emprunt.body;
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
