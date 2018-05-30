/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CertificationsComponent } from 'app/entities/InfoConsultant/certifications/certifications.component';
import { CertificationsService } from 'app/entities/InfoConsultant/certifications/certifications.service';
import { Certifications } from 'app/shared/model/InfoConsultant/certifications.model';

describe('Component Tests', () => {
    describe('Certifications Management Component', () => {
        let comp: CertificationsComponent;
        let fixture: ComponentFixture<CertificationsComponent>;
        let service: CertificationsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CertificationsComponent],
                providers: [CertificationsService]
            })
                .overrideTemplate(CertificationsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CertificationsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CertificationsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Certifications(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.certifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
