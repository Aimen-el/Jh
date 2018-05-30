/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { BibleoDetailComponent } from 'app/entities/bibleo/bibleo/bibleo-detail.component';
import { Bibleo } from 'app/shared/model/bibleo/bibleo.model';

describe('Component Tests', () => {
    describe('Bibleo Management Detail Component', () => {
        let comp: BibleoDetailComponent;
        let fixture: ComponentFixture<BibleoDetailComponent>;
        const route = ({ data: of({ bibleo: new Bibleo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [BibleoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BibleoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BibleoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bibleo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
