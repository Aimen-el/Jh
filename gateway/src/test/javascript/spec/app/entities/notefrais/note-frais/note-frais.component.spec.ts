/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { NoteFraisComponent } from 'app/entities/notefrais/note-frais/note-frais.component';
import { NoteFraisService } from 'app/entities/notefrais/note-frais/note-frais.service';
import { NoteFrais } from 'app/shared/model/notefrais/note-frais.model';

describe('Component Tests', () => {
    describe('NoteFrais Management Component', () => {
        let comp: NoteFraisComponent;
        let fixture: ComponentFixture<NoteFraisComponent>;
        let service: NoteFraisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NoteFraisComponent],
                providers: [NoteFraisService]
            })
                .overrideTemplate(NoteFraisComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NoteFraisComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NoteFraisService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new NoteFrais(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.noteFrais[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
