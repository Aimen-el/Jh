/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { CertificationsUpdateComponent } from 'app/entities/InfoConsultant/certifications/certifications-update.component';
import { CertificationsService } from 'app/entities/InfoConsultant/certifications/certifications.service';
import { Certifications } from 'app/shared/model/InfoConsultant/certifications.model';

describe('Component Tests', () => {
    describe('Certifications Management Update Component', () => {
        let comp: CertificationsUpdateComponent;
        let fixture: ComponentFixture<CertificationsUpdateComponent>;
        let service: CertificationsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CertificationsUpdateComponent],
                providers: [CertificationsService]
            })
                .overrideTemplate(CertificationsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CertificationsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CertificationsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Certifications(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.certifications = entity;
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
                    const entity = new Certifications();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.certifications = entity;
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
