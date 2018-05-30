/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { MissionsComponent } from 'app/entities/InfoConsultant/missions/missions.component';
import { MissionsService } from 'app/entities/InfoConsultant/missions/missions.service';
import { Missions } from 'app/shared/model/InfoConsultant/missions.model';

describe('Component Tests', () => {
    describe('Missions Management Component', () => {
        let comp: MissionsComponent;
        let fixture: ComponentFixture<MissionsComponent>;
        let service: MissionsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MissionsComponent],
                providers: [MissionsService]
            })
                .overrideTemplate(MissionsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MissionsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissionsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Missions(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.missions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
