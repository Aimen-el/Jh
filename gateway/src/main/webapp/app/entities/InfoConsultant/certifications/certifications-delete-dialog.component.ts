import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICertifications } from 'app/shared/model/InfoConsultant/certifications.model';
import { CertificationsService } from './certifications.service';

@Component({
    selector: 'jhi-certifications-delete-dialog',
    templateUrl: './certifications-delete-dialog.component.html'
})
export class CertificationsDeleteDialogComponent {
    certifications: ICertifications;

    constructor(
        private certificationsService: CertificationsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.certificationsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'certificationsListModification',
                content: 'Deleted an certifications'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-certifications-delete-popup',
    template: ''
})
export class CertificationsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ certifications }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CertificationsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.certifications = certifications.body;
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
