/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { InfoConsultantUpdateComponent } from 'app/entities/InfoConsultant/info-consultant/info-consultant-update.component';
import { InfoConsultantService } from 'app/entities/InfoConsultant/info-consultant/info-consultant.service';
import { InfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';

import { MissionsService } from 'app/entities/InfoConsultant/missions';
import { CertificationsService } from 'app/entities/InfoConsultant/certifications';

describe('Component Tests', () => {
    describe('InfoConsultant Management Update Component', () => {
        let comp: InfoConsultantUpdateComponent;
        let fixture: ComponentFixture<InfoConsultantUpdateComponent>;
        let service: InfoConsultantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoConsultantUpdateComponent],
                providers: [MissionsService, CertificationsService, InfoConsultantService]
            })
                .overrideTemplate(InfoConsultantUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InfoConsultantUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfoConsultantService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InfoConsultant(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.infoConsultant = entity;
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
                    const entity = new InfoConsultant();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.infoConsultant = entity;
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
