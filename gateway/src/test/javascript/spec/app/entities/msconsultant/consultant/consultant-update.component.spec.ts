/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { ConsultantUpdateComponent } from 'app/entities/msconsultant/consultant/consultant-update.component';
import { ConsultantService } from 'app/entities/msconsultant/consultant/consultant.service';
import { Consultant } from 'app/shared/model/msconsultant/consultant.model';

describe('Component Tests', () => {
    describe('Consultant Management Update Component', () => {
        let comp: ConsultantUpdateComponent;
        let fixture: ComponentFixture<ConsultantUpdateComponent>;
        let service: ConsultantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ConsultantUpdateComponent],
                providers: [ConsultantService]
            })
                .overrideTemplate(ConsultantUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsultantUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultantService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consultant(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.consultant = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consultant();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.consultant = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
