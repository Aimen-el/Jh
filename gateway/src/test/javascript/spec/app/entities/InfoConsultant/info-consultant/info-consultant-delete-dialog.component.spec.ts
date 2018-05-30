/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { InfoConsultantDeleteDialogComponent } from 'app/entities/InfoConsultant/info-consultant/info-consultant-delete-dialog.component';
import { InfoConsultantService } from 'app/entities/InfoConsultant/info-consultant/info-consultant.service';

describe('Component Tests', () => {
    describe('InfoConsultant Management Delete Component', () => {
        let comp: InfoConsultantDeleteDialogComponent;
        let fixture: ComponentFixture<InfoConsultantDeleteDialogComponent>;
        let service: InfoConsultantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoConsultantDeleteDialogComponent],
                providers: [InfoConsultantService]
            })
                .overrideTemplate(InfoConsultantDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InfoConsultantDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfoConsultantService);
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
