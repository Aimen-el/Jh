/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { CertificationsDetailComponent } from 'app/entities/InfoConsultant/certifications/certifications-detail.component';
import { Certifications } from 'app/shared/model/InfoConsultant/certifications.model';

describe('Component Tests', () => {
    describe('Certifications Management Detail Component', () => {
        let comp: CertificationsDetailComponent;
        let fixture: ComponentFixture<CertificationsDetailComponent>;
        const route = ({ data: of({ certifications: new Certifications(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CertificationsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CertificationsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CertificationsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.certifications).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
