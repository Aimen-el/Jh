/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MissionsDeleteDialogComponent } from 'app/entities/InfoConsultant/missions/missions-delete-dialog.component';
import { MissionsService } from 'app/entities/InfoConsultant/missions/missions.service';

describe('Component Tests', () => {
    describe('Missions Management Delete Component', () => {
        let comp: MissionsDeleteDialogComponent;
        let fixture: ComponentFixture<MissionsDeleteDialogComponent>;
        let service: MissionsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MissionsDeleteDialogComponent],
                providers: [MissionsService]
            })
                .overrideTemplate(MissionsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MissionsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissionsService);
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
