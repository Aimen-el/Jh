import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';
import { InfoConsultantService } from './info-consultant.service';

@Component({
    selector: 'jhi-info-consultant-delete-dialog',
    templateUrl: './info-consultant-delete-dialog.component.html'
})
export class InfoConsultantDeleteDialogComponent {
    infoConsultant: IInfoConsultant;

    constructor(
        private infoConsultantService: InfoConsultantService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.infoConsultantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'infoConsultantListModification',
                content: 'Deleted an infoConsultant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-info-consultant-delete-popup',
    template: ''
})
export class InfoConsultantDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ infoConsultant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InfoConsultantDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.infoConsultant = infoConsultant.body;
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
