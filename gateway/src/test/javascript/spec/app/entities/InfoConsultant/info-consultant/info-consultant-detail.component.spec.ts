/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { InfoConsultantDetailComponent } from 'app/entities/InfoConsultant/info-consultant/info-consultant-detail.component';
import { InfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';

describe('Component Tests', () => {
    describe('InfoConsultant Management Detail Component', () => {
        let comp: InfoConsultantDetailComponent;
        let fixture: ComponentFixture<InfoConsultantDetailComponent>;
        const route = ({ data: of({ infoConsultant: new InfoConsultant(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoConsultantDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InfoConsultantDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InfoConsultantDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.infoConsultant).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
