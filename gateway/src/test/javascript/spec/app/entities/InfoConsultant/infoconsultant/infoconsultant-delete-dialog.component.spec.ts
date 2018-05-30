/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { InfoconsultantDeleteDialogComponent } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant-delete-dialog.component';
import { InfoconsultantService } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant.service';

describe('Component Tests', () => {
    describe('Infoconsultant Management Delete Component', () => {
        let comp: InfoconsultantDeleteDialogComponent;
        let fixture: ComponentFixture<InfoconsultantDeleteDialogComponent>;
        let service: InfoconsultantService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoconsultantDeleteDialogComponent],
                providers: [InfoconsultantService]
            })
                .overrideTemplate(InfoconsultantDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InfoconsultantDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfoconsultantService);
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
