/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { InfoconsultantUpdateComponent } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant-update.component';
import { InfoconsultantService } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant.service';
import { Infoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';

import { MissionsService } from 'app/entities/InfoConsultant/missions';
import { CertificationsService } from 'app/entities/InfoConsultant/certifications';

describe('Component Tests', () => {
    describe('Infoconsultant Management Update Component', () => {
        let comp: InfoconsultantUpdateComponent;
        let fixture: ComponentFixture<InfoconsultantUpdateComponent>;
        let service: InfoconsultantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoconsultantUpdateComponent],
                providers: [MissionsService, CertificationsService, InfoconsultantService]
            })
                .overrideTemplate(InfoconsultantUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InfoconsultantUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfoconsultantService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Infoconsultant(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.infoconsultant = entity;
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
                    const entity = new Infoconsultant();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.infoconsultant = entity;
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
