/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { NoteFraisUpdateComponent } from 'app/entities/notefrais/note-frais/note-frais-update.component';
import { NoteFraisService } from 'app/entities/notefrais/note-frais/note-frais.service';
import { NoteFrais } from 'app/shared/model/notefrais/note-frais.model';

describe('Component Tests', () => {
    describe('NoteFrais Management Update Component', () => {
        let comp: NoteFraisUpdateComponent;
        let fixture: ComponentFixture<NoteFraisUpdateComponent>;
        let service: NoteFraisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NoteFraisUpdateComponent],
                providers: [NoteFraisService]
            })
                .overrideTemplate(NoteFraisUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NoteFraisUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteFraisService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NoteFrais(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.noteFrais = entity;
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
                    const entity = new NoteFrais();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.noteFrais = entity;
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
