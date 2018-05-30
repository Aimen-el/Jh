/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { MissionsDetailComponent } from 'app/entities/InfoConsultant/missions/missions-detail.component';
import { Missions } from 'app/shared/model/InfoConsultant/missions.model';

describe('Component Tests', () => {
    describe('Missions Management Detail Component', () => {
        let comp: MissionsDetailComponent;
        let fixture: ComponentFixture<MissionsDetailComponent>;
        const route = ({ data: of({ missions: new Missions(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MissionsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MissionsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MissionsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.missions).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
