/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { BibleoComponent } from 'app/entities/bibleo/bibleo/bibleo.component';
import { BibleoService } from 'app/entities/bibleo/bibleo/bibleo.service';
import { Bibleo } from 'app/shared/model/bibleo/bibleo.model';

describe('Component Tests', () => {
    describe('Bibleo Management Component', () => {
        let comp: BibleoComponent;
        let fixture: ComponentFixture<BibleoComponent>;
        let service: BibleoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [BibleoComponent],
                providers: [BibleoService]
            })
                .overrideTemplate(BibleoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BibleoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BibleoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Bibleo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bibleos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
