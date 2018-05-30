/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { LivreComponent } from 'app/entities/library/livre/livre.component';
import { LivreService } from 'app/entities/library/livre/livre.service';
import { Livre } from 'app/shared/model/library/livre.model';

describe('Component Tests', () => {
    describe('Livre Management Component', () => {
        let comp: LivreComponent;
        let fixture: ComponentFixture<LivreComponent>;
        let service: LivreService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LivreComponent],
                providers: [LivreService]
            })
                .overrideTemplate(LivreComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LivreComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LivreService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Livre(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.livres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
