/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { MissionsUpdateComponent } from 'app/entities/InfoConsultant/missions/missions-update.component';
import { MissionsService } from 'app/entities/InfoConsultant/missions/missions.service';
import { Missions } from 'app/shared/model/InfoConsultant/missions.model';

describe('Component Tests', () => {
    describe('Missions Management Update Component', () => {
        let comp: MissionsUpdateComponent;
        let fixture: ComponentFixture<MissionsUpdateComponent>;
        let service: MissionsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MissionsUpdateComponent],
                providers: [MissionsService]
            })
                .overrideTemplate(MissionsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MissionsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MissionsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Missions(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.missions = entity;
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
                    const entity = new Missions();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.missions = entity;
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
