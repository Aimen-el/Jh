/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { NoteFraisDeleteDialogComponent } from 'app/entities/notefrais/note-frais/note-frais-delete-dialog.component';
import { NoteFraisService } from 'app/entities/notefrais/note-frais/note-frais.service';

describe('Component Tests', () => {
    describe('NoteFrais Management Delete Component', () => {
        let comp: NoteFraisDeleteDialogComponent;
        let fixture: ComponentFixture<NoteFraisDeleteDialogComponent>;
        let service: NoteFraisService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NoteFraisDeleteDialogComponent],
                providers: [NoteFraisService]
            })
                .overrideTemplate(NoteFraisDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NoteFraisDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteFraisService);
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
