/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { InfoconsultantDetailComponent } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant-detail.component';
import { Infoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';

describe('Component Tests', () => {
    describe('Infoconsultant Management Detail Component', () => {
        let comp: InfoconsultantDetailComponent;
        let fixture: ComponentFixture<InfoconsultantDetailComponent>;
        const route = ({ data: of({ infoconsultant: new Infoconsultant(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoconsultantDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InfoconsultantDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InfoconsultantDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.infoconsultant).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
