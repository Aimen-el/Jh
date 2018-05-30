/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { BibleoUpdateComponent } from 'app/entities/bibleo/bibleo/bibleo-update.component';
import { BibleoService } from 'app/entities/bibleo/bibleo/bibleo.service';
import { Bibleo } from 'app/shared/model/bibleo/bibleo.model';

describe('Component Tests', () => {
    describe('Bibleo Management Update Component', () => {
        let comp: BibleoUpdateComponent;
        let fixture: ComponentFixture<BibleoUpdateComponent>;
        let service: BibleoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [BibleoUpdateComponent],
                providers: [BibleoService]
            })
                .overrideTemplate(BibleoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BibleoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BibleoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Bibleo(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.bibleo = entity;
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
                    const entity = new Bibleo();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.bibleo = entity;
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
