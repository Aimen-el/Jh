/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CertificationsDeleteDialogComponent } from 'app/entities/InfoConsultant/certifications/certifications-delete-dialog.component';
import { CertificationsService } from 'app/entities/InfoConsultant/certifications/certifications.service';

describe('Component Tests', () => {
    describe('Certifications Management Delete Component', () => {
        let comp: CertificationsDeleteDialogComponent;
        let fixture: ComponentFixture<CertificationsDeleteDialogComponent>;
        let service: CertificationsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CertificationsDeleteDialogComponent],
                providers: [CertificationsService]
            })
                .overrideTemplate(CertificationsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CertificationsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CertificationsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
