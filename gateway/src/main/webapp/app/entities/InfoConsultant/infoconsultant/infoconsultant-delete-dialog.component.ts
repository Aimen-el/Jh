import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInfoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';
import { InfoconsultantService } from './infoconsultant.service';

@Component({
    selector: 'jhi-infoconsultant-delete-dialog',
    templateUrl: './infoconsultant-delete-dialog.component.html'
})
export class InfoconsultantDeleteDialogComponent {
    infoconsultant: IInfoconsultant;

    constructor(
        private infoconsultantService: InfoconsultantService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.infoconsultantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'infoconsultantListModification',
                content: 'Deleted an infoconsultant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-infoconsultant-delete-popup',
    template: ''
})
export class InfoconsultantDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ infoconsultant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InfoconsultantDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.infoconsultant = infoconsultant.body;
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
