/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { InfoConsultantComponent } from 'app/entities/InfoConsultant/info-consultant/info-consultant.component';
import { InfoConsultantService } from 'app/entities/InfoConsultant/info-consultant/info-consultant.service';
import { InfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';

describe('Component Tests', () => {
    describe('InfoConsultant Management Component', () => {
        let comp: InfoConsultantComponent;
        let fixture: ComponentFixture<InfoConsultantComponent>;
        let service: InfoConsultantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InfoConsultantComponent],
                providers: [InfoConsultantService]
            })
                .overrideTemplate(InfoConsultantComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InfoConsultantComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InfoConsultantService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                Observable.of(
                    new HttpResponse({
                        body: [new InfoConsultant(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.infoConsultants[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
