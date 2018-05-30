/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { InfoconsultantComponent } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant.component';
import { InfoconsultantService } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant.service';
import { Infoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';

describe('Component Tests', () => {
    describe('Infoconsultant Management Component', () => {
        let comp: InfoconsultantComponent;
        let fixture: ComponentFixture<InfoconsultantComponent>;
        let service: InfoconsultantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoconsultantComponent],
                providers: [InfoconsultantService]
            })
                .overrideTemplate(InfoconsultantComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InfoconsultantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfoconsultantService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new Infoconsultant(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.infoconsultants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
