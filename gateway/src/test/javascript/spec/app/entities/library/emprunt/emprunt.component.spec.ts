/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { EmpruntComponent } from 'app/entities/library/emprunt/emprunt.component';
import { EmpruntService } from 'app/entities/library/emprunt/emprunt.service';
import { Emprunt } from 'app/shared/model/library/emprunt.model';

describe('Component Tests', () => {
    describe('Emprunt Management Component', () => {
        let comp: EmpruntComponent;
        let fixture: ComponentFixture<EmpruntComponent>;
        let service: EmpruntService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EmpruntComponent],
                providers: [EmpruntService]
            })
                .overrideTemplate(EmpruntComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmpruntComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmpruntService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Emprunt(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.emprunts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
