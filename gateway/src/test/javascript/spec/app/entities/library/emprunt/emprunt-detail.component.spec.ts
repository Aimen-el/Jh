/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { EmpruntDetailComponent } from 'app/entities/library/emprunt/emprunt-detail.component';
import { Emprunt } from 'app/shared/model/library/emprunt.model';

describe('Component Tests', () => {
    describe('Emprunt Management Detail Component', () => {
        let comp: EmpruntDetailComponent;
        let fixture: ComponentFixture<EmpruntDetailComponent>;
        const route = ({ data: of({ emprunt: new Emprunt(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EmpruntDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmpruntDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmpruntDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.emprunt).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
